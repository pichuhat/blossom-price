import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';

import "./multi-item-view.js";

export class SearchView extends LitElement {
  static properties = {
    items: {type: Array},
    loading: {type: Boolean},
    servers: {type: Array},
    selectedServer: {type: Number}
  }

  constructor() {
    super()
    this.loading = true
    this.servers = ["cherry", "spirit", "lotus", "tulip"]
    this.selectedServer = null
    this.formatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'})
    this.searchBox = null
    this.truncated = false;
  }

  connectedCallback() {
    super.connectedCallback()
    this.searchBox = this.shadowRoot.querySelector('#search')
    this._fetchItems()
    this._onAppSearch = (e) => {
      // URL is already updated by the navbar; just re-fetch based on window.location.search
      this.loading = true
      this._fetchItems()
    }
    window.addEventListener('app-search', this._onAppSearch)
  }

  disconnectedCallback() {
    window.removeEventListener('app-search', this._onAppSearch)
    super.disconnectedCallback()
  }

  _decodeEscapedUnicode(value) {
    if (typeof value !== 'string') return value
    return value.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
  }

  _handleEnter(e) {
    if (e.key == "Enter") {
      e.preventDefault()
      this._search()
    }
  }

  async _fetchItems() {
    const params = new URLSearchParams(window.location.search)
    const query = params.get('query')
    this.shadowRoot.querySelector("#search").value = query
    this.loading = true;
    const fetchURL = `/api/search/simple?query=${query}${this.selectedServer != null ? `&selectedServer=${this.selectedServer}` : ""}`
    console.log(fetchURL)
    try {
      const response = await fetch(fetchURL, {
        method: "GET",
        credentials: 'include'
      })

      if (!response.ok) throw new Error("Server fetch issue")

      const result = await response.json()
      this.items = result.result
      this.truncated = result.truncated
    } catch(err) {
      console.error("Error loading allitems: " + err)
    } finally {
      this.loading = false
    }
  }

  _routeToItemPage(id) {
    console.log("received")
    const response = this.servers[this.selectedServer] || window.prompt("Enter a server name:")
    if (!this.servers.includes(response.toLowerCase())) return window.alert("That server does not exist!")
    this.dispatchEvent(new CustomEvent('nav-requested', {
    bubbles: true,
    composed: true,
    detail: { path: `/~/server/${this.servers.indexOf(response.toLowerCase())}/item/${id}` }
  }));
  }

  static styles = [sharedStyles, css`
  `]

    _search() {
        const inputEl = this.shadowRoot.querySelector('#search').value
        if (!inputEl) return window.alert("You're supposed to... type something in the search box...")
        const path = `/~/search?query=${inputEl}`
        this.dispatchEvent(new CustomEvent('nav-requested', {
        detail: { path },
        bubbles: true,
        composed: true
        }));
        this._fetchItems()
    }

    updated(changedProperties) {
  if (changedProperties.has('selectedServer')) {
    this._fetchItems()
  }
}

  render() {

    return html`
    <div class="center">
    <h1>Search${this.items && this.items.length > 0 && !this.loading ? " Results" : ""}</h1>
    <div class="outerbox">
    <div class="innerbox">
    ${this.truncated && !this.loading ? html`<wa-callout variant="warning"><wa-icon slot="icon" name="triangle-exclamation"></wa-icon><strong>Search Results Limited</strong><br>This search was limited to 150 items. Don't worry, this is a temporary fix!</wa-callout><br>` : ''}
     <wa-input id="search" placeholder="Search..." ?disabled=${this.loading} @keydown=${(e) => this._handleEnter(e)} value=${new URLSearchParams(window.location.search).get('query')} class="" with-clear size="s" autocomplete="off"><wa-icon name="search" label="search" slot="end" @click=${this._search}></wa-icon></wa-input> 
     </div>
      </div>
      </div>
      ${this.loading ? html`<div class="grid"><wa-spinner></wa-spinner></div>` : 
        this.items && this.items.length > 0 ? html`<items-display .selectedServer=${this.selectedServer} .items=${this.items}></items-display>` : html`<div class="grid">Search results will appear here!</div>`}
    `;
  }
}
customElements.define('search-view', SearchView);
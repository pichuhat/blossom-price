import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';

export class ASView extends LitElement {
  static properties = {
    items: {type: Object},
    loading: {type: Boolean},
    servers: {type: Array},
    selectedServer: {type: Number},
    crates: {type: Array}
  }

  constructor() {
    super()
    this.loading = true
    this.servers = ["cherry", "spirit", "lotus", "tulip"]
    this.selectedServer = null
    this.formatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'})
    this.crates = []
    this.tags = []
    this.selectedCrate = null
    this.selectedTags = []
    this.truncated = false
  }

  connectedCallback() {
    super.connectedCallback()
    this._fetchAll()
  }

  _decodeEscapedUnicode(value) {
    if (typeof value !== 'string') return value
    return value.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
  }

  async _fetchAll() {
    this.loading = true;
    await this._fetchTags()
    await this._fetchCrates()
    this.loading = false;
  }

  async _fetchTags() {
    const fetchURL = `/api/taglist`
    try {
      const response = await fetch(fetchURL, {
        method: "GET",
        credentials: 'include'
      })
      if (!response.ok) return window.alert("An error occurred.")
      const result = await response.json()
      this.tags = result
    } catch(e) {
      window.alert("A crate fetch error occurred.")
    }
  }

  async _fetchCrates() {
    const fetchURL = `/api/cratelist`
    try {
      const response = await fetch(fetchURL, {
        method: "GET",
        credentials: 'include'
      })
      if (!response.ok) return window.alert("An error occurred.")
      const result = await response.json()
      this.crates = result.result
    } catch(e) {
      window.alert("A crate fetch error occurred.")
    }
  }

  async _fetchItems() {
    const params = new URLSearchParams(window.location.search)
    const query = params.get('query')
    this.selectedCrate = params.get('crate') || false
    this.selectedTags = params.getAll('tags') || []
    const fetchURL = `/api/search/advanced?query=${query}${this.selectedServer != null ? `&selectedServer=${this.selectedServer}` : ""}${this.selectedCrate ? `&crate=${this.selectedCrate}` : ""}${this.selectedTags ? this.selectedTags.map(tag => `&tags=${tag}`).join('') : ""}`
    console.log(fetchURL)
    try {
      const response = await fetch(fetchURL, {
        method: "GET",
        credentials: 'include'
      })

      if (!response.ok) throw new Error("Server fetch issue")

      const result = await response.json()
      this.truncated = result.truncated
      this.items = result.result
    } catch(err) {
      console.error("Error loading advanced search: " + err)
    }
  }

  _routeToItemPage(id) {
    const response = this.servers[this.selectedServer] || window.prompt("Enter a server name:")
    if (!response) return;
    if (!this.servers.includes(response.toLowerCase())) return window.alert("That server does not exist!")
    this.dispatchEvent(new CustomEvent('nav-requested', {
    bubbles: true,
    composed: true,
    detail: { path: `/~/server/${this.servers.indexOf(response.toLowerCase())}/item/${id}` }
  }));
  }

  _formatStr(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

  static styles = [sharedStyles, css`
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
      justify-content: center;
    }
    .center {
    text-align: center;
    }
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: fit-content;
      max-width: 100%;
      background-color: #2a2a2a;
      border: 1px solid #444;
      border-radius: 8px;
      padding: 16px;
      color: white;
      box-sizing: border-box;
      overflow: hidden;
      transition: ease 0.3s;
    }

    .card:hover {
    transform: scale(1.05);
    }

    .card img {
      display: block;
      width: auto;
      max-width: 100%;
      height: auto;
      border-radius: 6px;
      margin-top: 12px;
    }
    .priceAdd {
        font-size: 100%;
    }
    .price {
        color: #00ffcc;
        font-weight: bold;
        font-size: 130%;
    }
    .tags {
      margin-top: 10px;
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .tag {
      background-color: #bc4bc2;
      color: white;
      font-size: 80%;
      padding: 2px 8px;
      border-radius: 4px;
      text-transform: uppercase;
    }
  `]

  _formatPrice(unformatted) {
        return Number(unformatted).toLocaleString()
    }

     _formatDate(unformatted) {
        const date = new Date(unformatted)
        return this.formatter.format(date)
    }

    _search() {
        const inputEl = this.shadowRoot.querySelector('#search').value
        const selectedCrate = this.shadowRoot.querySelector('#crate').value
        let selectedTags = this.shadowRoot.querySelector('#tags').value ? this.shadowRoot.querySelector('#tags').value.map(tag => tag.replaceAll("_", " ")) : []
        console.log(selectedTags)
        if (selectedTags) {
        const e = selectedTags.map(tag => `&tags=${tag}`)
        selectedTags = e.join("")
        console.log(e, selectedTags)
        }
        const path = `/~/advancedsearch?query=${inputEl}${selectedCrate ? `&crate=${selectedCrate}` : ""}${selectedTags ? selectedTags : ""}`
        this.dispatchEvent(new CustomEvent('nav-requested', {
        detail: { path },
        bubbles: true,
        composed: true
        }));
        this.loading = true;
        this._fetchItems().finally(() => this.loading = false)
    }

    updated(changedProperties) {
  if (changedProperties.has('selectedServer')) {
    this._fetchItems()
  }
}

  render() {

    return html`
    <div class="center outerbox">
    <h1>Advanced Search${this.items && this.items.length > 0 ? " Results" : ""} (BETA)</h1>
    <div class="ASparams">
    ${this.truncated && !this.loading ? html`<wa-callout variant="warning"><wa-icon slot="icon" name="triangle-exclamation"></wa-icon><strong>Search Results Limited</strong><br>This search was limited to 150 items. Don't worry, this is a temporary fix!</wa-callout><br>` : ''}
    <wa-input label="Search Term" id="search" placeholder="Search..." autocomplete="off" ?disabled=${this.loading} value=${new URLSearchParams(window.location.search).get('query')}></wa-input>
    <br><wa-select label="Crate" id="crate" value=${this.selectedCrate || ""} ?disabled=${this.loading}>
      <wa-option value="" ?selected=${!this.selectedCrate}>All</wa-option>
      ${this.crates.map(crate => html`<wa-option value=${crate.id} ?selected=${this.selectedCrate == crate.id}>${crate.CrateName}</wa-option>`)}
      </wa-select>
      <br><wa-select label="Tags" id="tags" value=${this.selectedTags.join(' ')} placeholder="Select tags..." multiple with-clear ?disabled=${this.loading}>
      ${this.tags.map(tag => html`<wa-option value=${tag.replaceAll(" ", "_")} ?selected=${this.selectedTags.includes(tag)}>${tag}</wa-option>`)}
      </wa-select>
      <br><wa-button @click=${this._search} variant="brand" ?disabled=${this.loading} ?loading=${this.loading}>Search</wa-button>
      </div>
      </div>
      ${this.loading ? html`<div class="grid"><wa-spinner></wa-spinner></div>` : html`
        ${this.items && this.items.length > 0 ? html`
          <items-display .selectedServer=${this.selectedServer} .items=${this.items}></items-display>
          ` : html`<div class="grid">Search results will appear here!</div>`}
      `}
    `;
  }
}
customElements.define('advanced-search-view', ASView);

import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';

export class AllItemView extends LitElement {
  static properties = {
    items: {type: Object},
    loading: {type: Boolean},
    page: {type: Number},
    maxPages: {type: Number},
    servers: {type: Array},
    selectedServer: {type: Number}
  }

  constructor() {
    super()
    this.loading = true
    this.maxPages = 1
    this.servers = ["cherry", "spirit", "lotus", "tulip"]
    this.selectedServer = undefined
    this.formatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'})
  }

  connectedCallback() {
    super.connectedCallback()
    this._fetchAll()
  }

  async _fetchAll() {
    await this._getMaxPages()
    this._getSelectedPage()
    await this._fetchItems()
  }

  _getSelectedPage() {
    const params = new URLSearchParams(window.location.search)
    const selectedPage = Number(params.get('page'))
    if (isNaN(selectedPage) || Math.round(selectedPage) != selectedPage || selectedPage > this.maxPages || selectedPage < 1) {
      this.page = 1;
      return
    }
    this.page = selectedPage;
  }

  _decodeEscapedUnicode(value) {
    if (typeof value !== 'string') return value
    return value.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
  }

  async _getMaxPages() {
    try {
      const response = await fetch("/api/pagecount")

      if (!response.ok) throw new Error("Server fetch issue")
      
      const result = await response.json()
      this.maxPages = result.count
    } catch(error) {
      console.error("Error loading max page count: " + error)
    }
  }

  async _fetchItems() {
    this.loading = true;
    const fetchURL = `/api/allitems?page=${this.page}${this.selectedServer != null ? `&selectedServer=${this.selectedServer}` : ""}`
    console.log(fetchURL)
    try {
      const response = await fetch(fetchURL, {
        method: "GET",
        credentials: 'include'
      })

      if (!response.ok) throw new Error("Server fetch issue")

      const result = await response.json()
      this.items = result.items
    } catch(err) {
      console.error("Error loading allitems: " + err)
    } finally {
      this.loading = false
    }
  }

  updated(changedProperties) {
  if (changedProperties.has('selectedServer') && this.page) {
    this._fetchItems()
  }
}

  _updateURL() {
    const url = new URL(window.location)
    url.searchParams.set('page', this.page)
    window.history.replaceState({}, '', url);
  }

  _nextPage() {
    this.page++
    this._updateURL()
    this._fetchItems()
  }

  _previousPage() {
    this.page--
    this._updateURL()
    this._fetchItems()
  }

  _customPage() {
    const input = window.prompt("Enter page number 1-" + this.maxPages)
    if (input === null) return;
    if (/^\d+$/.test(input.trim()) && input > 0 && input <= this.maxPages) {
    this.page = Number(input)
    this._updateURL()
    this._fetchItems()
} else {
  window.alert("Invalid input")
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
      object-fit: contain;
      min-width: 50%;
      min-height: 50%;
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
    .minibutton {
    color: white;
    background-color: #bc2bc4;
    padding: 7px;
    border: none;
    transition: background-color 0.2s ease;
    }
    .minibutton:disabled {
    background-color: #aaaaaa;
    }
    .minibutton:hover {
    background-color: #831889;
    }
    .minibutton:hover:disabled {
    background-color: #aaaaaa;
    }
    .leftbutton {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    margin-right: 1px;
    }
    .rightbutton {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-left: 1px;
    }
  `]

  _formatPrice(unformatted) {
        return Number(unformatted).toLocaleString()
    }

     _formatDate(unformatted) {
        const date = new Date(unformatted)
        return this.formatter.format(date)
    }

  render() {
    const previousDisabled = this.page == 1 ? true : false
    const nextDisabled = this.page == this.maxPages ? true : false

    return html`
    <div class="center">
      <h1>All Items</h1>
      <span>Page ${this.page}/${this.maxPages}</span><br>
      <wa-button-group size="xxs" orientation="horizontal"><wa-button @click=${this._previousPage} ?disabled=${previousDisabled || this.loading} variant="brand"><<<</wa-button><wa-button @click=${this._customPage} ?disabled=${this.loading} variant="brand">...</wa-button><wa-button @click=${this._nextPage} ?disabled=${nextDisabled || this.loading} variant="brand">>>></wa-button></wa-button-group>
      </div>
      ${this.loading ? html`<div class="grid"><wa-spinner></wa-spinner></div>` : html`<items-display .selectedServer=${this.selectedServer} .items=${this.items}></items-display>`}
    `;
  }
}
customElements.define('all-item-view', AllItemView);
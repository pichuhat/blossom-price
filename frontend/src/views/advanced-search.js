import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles.js';

import "../components/advanced-params.js"

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
    this.loading = false
    this.servers = ["cherry", "spirit", "lotus", "tulip"]
    this.selectedServer = null
    this.formatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'})
    this.crates = []
    this.tags = []
    this.selectedCrate = null
    this.selectedTags = []
    this.minPrice = 0
    this.maxPrice = 0
    this.pricedOnly = false;
    this.inputValue = new URLSearchParams(window.location.search).get('query')
    this.truncated = false
  }

  connectedCallback() {
    super.connectedCallback()
    //this._fetchAll()

    this.addEventListener('trigger-advanced-search', this._fetchItems)
  }

  disconnectedCallback() {
    this.removeEventListener('trigger-advanced-search', this._fetchItems)
  }

  async _fetchItems(e) {
    this.loading = true

    const params = e?.detail?.params || new URLSearchParams(window.location.search)
    if ([0,1,2,3].includes(Number(this.selectedServer))) params.append('selectedServer', this.selectedServer)
    console.log(`${params}`)
    const fetchURL = `/api/search/advanced?${params}`
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
    } finally {
      this.loading = false;
    }
  }

  static styles = [sharedStyles, css`
    .center {
    text-align: center;
    }
  `]

  _formatPrice(unformatted) {
        if (isNaN(Number(unformatted))) return
        return Number(unformatted).toLocaleString()
    }

     _formatDate(unformatted) {
        const date = new Date(unformatted)
        return this.formatter.format(date)
    }

    updated(changedProperties) {
      const params = new URLSearchParams(window.location.search)
  if (changedProperties.has('selectedServer') && ['query', 'crate', 'tags', 'minPrice', 'maxPrice', 'pricedOnly'].some(key => params.has(key))) {
    this._fetchItems()
  }
}

_getReadValue(price) {
  if (price === 0) return 0
  if (!price) return '-'
  if (!isNaN(price)) return Math.max(0, Number(price))
  const suffix = price.at(-1).toLowerCase()
  const base = Number(price.slice(0, -1))
  if (isNaN(base) || !['k','m'].includes(suffix)) return '-'
  return base * (suffix === 'k' ? 1000 : 1000000)
  }

  render() {

    return html`
    <div class="center outerbox">
    <h1>Advanced Search${this.items && this.items.length > 0 ? " Results" : ""} (BETA)</h1>

    <advanced-search-params .selectedServer=${this.selectedServer} .truncated=${this.truncated} .loading=${this.loading}></advanced-search-params>

      ${this.loading ? html`<div class="grid"><wa-spinner></wa-spinner></div>` : html`
        ${this.items && this.items.length > 0 ? html`
          <items-display .selectedServer=${this.selectedServer} .items=${this.items}></items-display>
          ` : html`<div class="grid">Search results will appear here!</div>`}
      `}
    `;
  }
}
customElements.define('advanced-search-view', ASView);

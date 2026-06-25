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
    await this._fetchItems()
  }

  async _fetchTags() {
    this.loading = true;
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
    this.loading = true;
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
    this.loading = true;
    const fetchURL = `/api/search/advanced?query=${query}${this.selectedServer != null ? `&selectedServer=${this.selectedServer}` : ""}${this.selectedCrate ? `&crate=${this.selectedCrate}` : ""}${this.selectedTags ? this.selectedTags.map(tag => `&tags=${tag}`).join('') : ""}`
    console.log(fetchURL)
    try {
      const response = await fetch(fetchURL, {
        method: "GET",
        credentials: 'include'
      })

      if (!response.ok) throw new Error("Server fetch issue")

      const result = await response.json()
      this.items = result.result
    } catch(err) {
      console.error("Error loading advanced search: " + err)
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
        this._fetchItems()
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
    <wa-input label="Search Term" id="search" placeholder="Search..." ?disabled=${this.loading} value=${new URLSearchParams(window.location.search).get('query')}></wa-input>
    <br><wa-select label="Crate" id="crate" ?disabled=${this.loading}>
      <wa-option value="" ?selected=${!this.selectedCrate}>All</wa-option>
      ${this.crates.map(crate => html`<wa-option value=${crate.id} ?selected=${this.selectedCrate == crate.id}>${crate.CrateName}</wa-option>`)}
      </wa-select>
      <br><wa-select label="Tags" id="tags" placeholder="Select tags..." multiple with-clear ?disabled=${this.loading}>
      ${this.tags.map(tag => html`<wa-option value=${tag.replaceAll(" ", "_")} ?selected=${this.selectedTags.includes(tag)}>${tag}</wa-option>`)}
      </wa-select>
      <br><wa-button @click=${this._search} variant="brand" ?disabled=${this.loading} ?loading=${this.loading}>Search</wa-button>
      </div>
      </div>
      <div class="grid">
      ${this.loading ? html`<wa-spinner></wa-spinner>` : html`
        ${this.items && this.items.length > 0 ? this.items.map(item => html`
          <div class="card" @click="${() => this._routeToItemPage(item.id)}">
            <h3>${this._decodeEscapedUnicode(item.item_name)}</h3>
            ${this.selectedServer && item.price && item.recom_timestamp && item.username ? html`<div class="center">
            <span class="priceAdd">${this._formatStr(this.servers[this.selectedServer])} Price: </span><br><span class="price">$${this._formatPrice(item.price)}</span><br><sub>-${item.username}<br>${this._formatDate(item.recom_timestamp)}</sub>
            </div>` : html`<sub>No price available :(</sub>`}
            <div class="tags">
              ${item.tags ? item.tags.map(tag => html`
                <span class="tag">${this._decodeEscapedUnicode(tag)}</span>
              `) : ''}
            </div>
            <img
              src=${item.tags.includes('spawner') ? "https://minecraft.wiki/images/Monster_Spawner_JE4.png" : `https://www.blossom.atn.gg/static/images/BlossomCraft_Descriptions/${item.id}.png`}
              alt="${this._decodeEscapedUnicode(item.item_name)}"
            />
          </div>
        `) : "Search results will appear here!"}
      `}
      </div>
    `;
  }
}
customElements.define('advanced-search-view', ASView);
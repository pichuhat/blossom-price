import { LitElement, html, css } from 'https://esm.sh/lit@3';

export class SearchView extends LitElement {
  static properties = {
    items: {type: Object},
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
  }

  connectedCallback() {
    super.connectedCallback()
    this._fetchItems()
  }

  _decodeEscapedUnicode(value) {
    if (typeof value !== 'string') return value
    return value.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
  }

  async _fetchItems() {
    const params = new URLSearchParams(window.location.search)
    const query = params.get('query')
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

  _formatStr(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

  static styles = css`
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
  `;

  _formatPrice(unformatted) {
        return Number(unformatted).toLocaleString()
    }

     _formatDate(unformatted) {
        const date = new Date(unformatted)
        return this.formatter.format(date)
    }

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

  render() {
    if (this.loading) return html`
    <div class="center">
    <h1>Search</h1>
    <input type="text" id="search" placeholder="Search..." ?disabled=disabled value=${new URLSearchParams(window.location.search).get('query')}> <button ?disabled=disabled>Search</button>
    </div>
    Please wait...
    `

    return html`
    <div class="center">
    <h1>Search${this.items && this.items.length > 0 ? " Results" : ""}</h1>
      <input type="text" id="search" placeholder="Search..." ?disabled=${this.loading} value=${new URLSearchParams(window.location.search).get('query')}> <button @click=${this._search} ?disabled=${this.loading}>Search</button>
      </div>
      <div class="grid">
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
      </div>
    `;
  }
}
customElements.define('search-view', SearchView);
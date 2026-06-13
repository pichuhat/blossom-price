import { LitElement, html, css } from 'https://esm.sh/lit@3';

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
    this.page = 1
    this.maxPages = 1
    this.servers = ["cherry", "spirit", "lotus", "tulip"]
    this.selectedServer = null
    this.formatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'})
  }

  connectedCallback() {
    super.connectedCallback()
    this._getMaxPages()
    this._fetchItems()
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

  _nextPage() {
    this.page++
    this._fetchItems()
  }

  _previousPage() {
    this.page--
    this._fetchItems()
  }

  _customPage() {
    const input = window.prompt("Enter page number 1-" + this.maxPages)
    if (input === null) return;
    if (/^\d+$/.test(input.trim()) && input > 0 && input <= this.maxPages) {
    this.page = parseInt(input, 10);
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
  `;

  _formatPrice(unformatted) {
        return Number(unformatted).toLocaleString()
    }

     _formatDate(unformatted) {
        const date = new Date(unformatted)
        return this.formatter.format(date)
    }

  render() {
    if (this.loading) return html`
    <div class="center">
    <h1>All Items</h1>
    <span>Page ${this.page}/${this.maxPages}</span><br><button disabled>Previous</button><button disabled>...</button><button disabled>Next</button>
    </div>
    Please wait...
    `
    const previousDisabled = this.page == 1 ? "disabled" : ""
    const nextDisabled = this.page == this.maxPages ? "disabled" : ""

    return html`
    <div class="center">
      <h1>All Items</h1>
      <span>Page ${this.page}/${this.maxPages}</span><br><button ?disabled=${previousDisabled} @click="${this._previousPage}" class="minibutton leftbutton"><<<</button><button @click="${this._customPage}" class="minibutton">...</button><button ?disabled=${nextDisabled} @click="${this._nextPage}" class="minibutton rightbutton">>>></button>
      </div>
      <div class="grid">
        ${this.items.map(item => html`
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
        `)}
      </div>
    `;
  }
}
customElements.define('all-item-view', AllItemView);
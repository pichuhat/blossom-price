import { LitElement, html, css } from 'https://esm.sh/lit@3';

export class AllItemView extends LitElement {
  static properties = {
    items: {type: Object},
    loading: {type: Boolean},
    page: {type: Number},
    maxPages: {type: Number},
    servers: {type: Array}
  }

  constructor() {
    super()
    this.loading = true
    this.page = 1
    this.maxPages = 1
    this.servers = ["cherry", "spirit", "lotus", "tulip"]
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
      const response = await fetch("https://blossom-price.onrender.com/api/pagecount")

      if (!response.ok) throw new Error("Server fetch issue")
      
      const result = await response.json()
      this.maxPages = result.count
    } catch(error) {
      console.error("Error loading max page count: " + error)
    }
  }

  async _fetchItems() {
    this.loading = true;
    try {
      const response = await fetch("https://blossom-price.onrender.com/api/allitems?page=" + this.page, {
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
    const response = window.prompt("Enter a server name:")
    if (!this.servers.includes(response.toLowerCase())) return window.alert("That server does not exist!")
    this.dispatchEvent(new CustomEvent('nav-requested', {
    bubbles: true,
    composed: true,
    detail: { path: `/server/${this.servers.indexOf(response.toLowerCase())}/item/${id}` }
  }));
  }

  static styles = css`
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
      justify-content: center;
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
    .price {
      color: #00ffcc;
      font-weight: bold;
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

  render() {
    if (this.loading) return html`
    <h1>All Items</h1>
    <span>Page ${this.page}/${this.maxPages}</span> <button disabled>Previous</button><button disabled>Next</button><button disabled>...</button>
<br><br>
    Please wait...
    `

    const previousDisabled = this.page == 1 ? "disabled" : ""
    const nextDisabled = this.page == this.maxPages ? "disabled" : ""
    console.log(previousDisabled + " gap " + nextDisabled)

    return html`
      <h1>All Items</h1>
      <span>Page ${this.page}/${this.maxPages}</span> <button ?disabled=${previousDisabled} @click="${this._previousPage}">Previous</button><button ?disabled=${nextDisabled} @click="${this._nextPage}">Next</button><button @click="${this._customPage}">...</button>
      <div class="grid">
        ${this.items.map(item => html`
          <div class="card" @click="${() => this._routeToItemPage(item.id)}">
            <h3>${this._decodeEscapedUnicode(item.item_name)}</h3>
            
            <div class="tags">
              ${item.tags ? item.tags.map(tag => html`
                <span class="tag">${this._decodeEscapedUnicode(tag)}</span>
              `) : ''}
            </div>
            <img
              src="https://www.blossom.atn.gg/static/images/BlossomCraft_Descriptions/${item.id}.png"
              alt="${this._decodeEscapedUnicode(item.item_name)}"
            />
          </div>
        `)}
      </div>
    `;
  }
}
customElements.define('all-item-view', AllItemView);
import { LitElement, html, css } from 'https://esm.sh/lit@3';

export class AllItemView extends LitElement {
  static properties = {
    items: {type: Object},
    loading: {type: Boolean},
    page: {type: Number},
    maxPages: {type: Number}
  }

  constructor() {
    super()
    this.loading = true
    this.page = 1
    this.maxPages = 1
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
    }
  }

  async _fetchItems() {
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
  }

  _previousPage() {
    this.page--
  }

  _customPage() {
    const input = window.prompt("Enter page number 1-" + this.maxPages)
    if (input === null) return;
    if (/^\d+$/.test(input.trim()) && input > 0 && input <= this.maxPages) {
    this.page = parseInt(input, 10);
} else {
  window.alert("Invalid input")
}
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

    return html`
      <h1>All Items</h1>
      <span>Page ${this.page}/${this.maxPages}</span> <button ${previousDisabled} onclick="this._previousPage()">Previous</button><button ${nextDisabled} onclick="this._nextPage()">Next</button><button onclick="this._customPage()">...</button>
      <div class="grid">
        ${this.items.map(item => html`
          <div class="card">
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
import { LitElement, html, css } from 'https://esm.sh/lit@3';

export class AllItemView extends LitElement {
  static properties = {
    items: {type: Object},
    loading: {type: Boolean}
  }

  constructor() {
    super()
    this.loading = true
  }

  connectedCallback() {
    super.connectedCallback()
    this._fetchItems()
  }

  async _fetchItems() {
    try {
      const response = await fetch("https://blossom-price.onrender.com/api/allitems", {
        method: "GET",
        credentials: 'include'
      })

      if (!response.ok) throw new Error("Server fetch issue")

      this.items = await response.json()
    } catch(err) {
      console.error("Error loading allitems: " + err)
    } finally {
      this.loading = false
    }
  }

  static styles = css`
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      padding: 20px;
    }
    .card {
      background-color: #2a2a2a;
      border: 1px solid #444;
      border-radius: 8px;
      padding: 16px;
      color: white;
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
    if (this.loading) return html`Please wait...`

    return html`
      <h1>All Items</h1>
      <div class="grid">
        ${this.items.map(item => html`
          <div class="card">
            <h3>${item.name}</h3>
            <p class="price">Base Price: ${item.base_price} coins</p>
            
            <div class="tags">
              ${item.categories ? item.categories.map(tag => html`
                <span class="tag">${tag}</span>
              `) : ''}
            </div>
          </div>
        `)}
    `;
  }
}
customElements.define('all-item-view', AllItemView);
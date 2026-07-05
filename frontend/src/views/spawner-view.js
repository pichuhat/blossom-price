import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';

export class SpawnerView extends LitElement {
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
    this.items = null
    this.formatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'})
  }

  connectedCallback() {
    super.connectedCallback()
    this._fetchItems()
  }

  updated(hasChanged) {
    if (hasChanged.has("selectedServer")) {
      this._fetchItems()
    }
  }

  _decodeEscapedUnicode(value) {
    if (typeof value !== 'string') return value
    return value.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
  }

  async _fetchItems() {
    this.loading = true;
    try {
      const response = await fetch(`/api/spawners${this.selectedServer != null ? `?selectedServer=${this.selectedServer}` : ""}`, {
        method: "GET",
        credentials: 'include'
      })

      if (!response.ok) throw new Error("Server fetch issue")

      const result = await response.json()
      this.items = result.items
    } catch(err) {
      console.error("Error loading spawners: " + err)
    } finally {
      this.loading = false
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
  `]

    _formatStr(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

_formatPrice(unformatted) {
        return Number(unformatted).toLocaleString()
    }

     _formatDate(unformatted) {
        const date = new Date(unformatted)
        return this.formatter.format(date)
    }

  render() {
    if (this.loading) return html`
    <h1>Spawners</h1>
    Please wait...
    `

    return html`
    <div class="center">
      <h1>Spawners (BETA)</h1>
      </div>
        <items-display .selectedServer=${this.selectedServer} .items=${this.items}></items-display>
    `;
  }
}
customElements.define('spawner-view', SpawnerView);
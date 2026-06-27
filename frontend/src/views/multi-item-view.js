import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';

export class BoxView extends LitElement {
    static properties = {
        selectedServer: {type: Number},
        items: {type: Array}
    }

    constructor() {
        super()
        this.selectedServer = undefined
        this.servers = ["cherry", "spirit", "lotus", "tulip"]
        this.items = []
        this.formatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'})
    }

    static styles = [sharedStyles, css`

        `]

    _decodeEscapedUnicode(value) {
    if (typeof value !== 'string') return value
    return value.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
  }

  _routeToItemPage(id) {
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

_formatPrice(unformatted) {
        return Number(unformatted).toLocaleString()
    }

     _formatDate(unformatted) {
        const date = new Date(unformatted)
        return this.formatter.format(date)
    }

    render() {
        return html`
        <div class="center">
        <div class="grid">${this.items.map(item => html`
          <div class="card" @click="${() => this._routeToItemPage(item.id)}">
            <h3>${this._decodeEscapedUnicode(item.item_name)}</h3>
            ${this.selectedServer != undefined && this.selectedServer != null && item.price && item.recom_timestamp && item.username ? html`<div class="center">
            <span class="priceAdd">${this._formatStr(this.servers[this.selectedServer])} Price${item.is_range ? ' Range' : ""}: </span><br><span class="price">$${this._formatPrice(item.price)}${item.is_range ? ` to $${this._formatPrice(item.max_price)}` : ''}</span><br><sub>-${item.username}<br>${this._formatDate(item.recom_timestamp)}</sub>
            </div>` : html`<sub>No price available :(</sub>`}
            <div class="tags">
              ${item.tags ? item.tags.map(tag => html`
                <span class="tag">${this._decodeEscapedUnicode(tag)}</span>
              `) : ''}
            </div>
            <img
            src=${item.tags.includes('spawner') ? "https://minecraft.wiki/images/Monster_Spawner_JE4.png" : (item.tags.includes('currency') ? `/src/images/${item.img_src}` : `https://www.blossom.atn.gg/static/images/BlossomCraft_Descriptions/${item.id}.png`)}
            alt="${this._decodeEscapedUnicode(item.item_name)}"
            />
          </div>
        `)}</div></div>`
    }
}

customElements.define('items-display', BoxView)
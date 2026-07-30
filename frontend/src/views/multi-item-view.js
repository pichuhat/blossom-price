import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { unsafeHTML } from 'https://esm.sh/lit@3/directives/unsafe-html.js';
import { sharedStyles } from '../styles.js';

import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.1.6/+esm';

export class BoxView extends LitElement {
    static properties = {
        selectedServer: {type: Number},
        items: {type: Array},
        lowDataMode: {type: Boolean}
    }

    constructor() {
        super()
        this.selectedServer = undefined
        this.servers = ["cherry", "spirit", "lotus", "tulip"]
        this.items = []
        this.lowDataMode = true;
        this.formatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'})
        this.ALLOWED_STYLE_PROPS = {
          color: /^#[0-9a-fA-F]{3,8}$/,
          'font-weight': /^(bold|normal|[1-9]00)$/,
        };
    }

    static styles = [sharedStyles, css`

        `]

    get viewType() {
      return localStorage.getItem('viewType') === null ? 'standard' : localStorage.getItem('viewType')
    }

    connectedCallback() {
      super.connectedCallback()
      this._getLDMStatus()

    DOMPurify.addHook('uponSanitizeAttribute', (node, data) => {
      if (data.attrName !== 'style') return;

        const declarations = data.attrValue
          .split(';')
          .map(d => d.trim())
          .filter(Boolean);

        const safeDeclarations = declarations.filter(decl => {
          const [prop, ...rest] = decl.split(':');
          const value = rest.join(':').trim();
          const propName = prop?.trim().toLowerCase();
          const validator = this.ALLOWED_STYLE_PROPS[propName];
          return validator && validator.test(value);
        });

        if (safeDeclarations.length === 0) {
          data.keepAttr = false;
        } else {
          data.attrValue = safeDeclarations.join('; ');
        }
      });
    }

    _decodeEscapedUnicode(value) {
    if (typeof value !== 'string') return value
    return value.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
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

    _handleLDM(e) {
      this.lowDataMode = e.target.checked
      localStorage.setItem('LDM', this.lowDataMode)
    }

    _getLDMStatus() {
      this.lowDataMode = JSON.parse(localStorage.getItem('LDM') ?? 'true')
    }

    _sanitizeHTML(input) {
      return this._decodeEscapedUnicode(DOMPurify.sanitize(input, {
        ALLOWED_TAGS: ['div', 'span', 'br'],
        ALLOWED_ATTR: ['class', 'style'],
      }));
    }

    _checkDropdownPosition(e) {
      console.log("Ran")
  const dropdown = e.currentTarget;
  const content = dropdown.querySelector('.dropdown-content');
  if (!content) return;

  dropdown.classList.remove('flip-up');

  const dropdownRect = dropdown.getBoundingClientRect();
  const contentHeight = content.offsetHeight;
  const spaceBelow = window.innerHeight - dropdownRect.bottom;

  if (spaceBelow < contentHeight) {
    content.classList.add('flip-up');
    console.log("Flipped")
  }
}

    render() {
        return html`
        <div class="center">
        <div class="forceGap"><wa-switch ?checked=${this.lowDataMode} id="LDMtoggle" @change=${this._handleLDM}>Low Data Mode</wa-switch></div>
        ${this.viewType === 'standard' ? html`
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
            ${this.lowDataMode && !item.tags.includes('spawner') && !item.tags.includes('currency') ? html`
            <div class="give-preview-text-outer">
              <div class="give-preview-text w-100">
                <div class="give-preview-text-inner text-start" style="text-align: left;">
                  ${unsafeHTML(this._sanitizeHTML(item.item_html))}
                </div>
              </div>
            </div>  
            ` : html`
            <img
            src=${item.tags.includes('spawner') ? "https://minecraft.wiki/images/Monster_Spawner_JE4.png" : (item.tags.includes('currency') ? `/src/images/${item.img_src}` : `https://www.blossom.atn.gg/static/images/BlossomCraft_Descriptions/${item.id}.png`)}
            alt="${this._decodeEscapedUnicode(item.item_name)}"
            />
            `}
          </div>
        `)}</div>`
        : html`
        <div class="dashboard"><div class="fullcard">
        <sub>Table View is a BETA feature! If you're running into issues, disable it in the settings menu.</sub>
        <table>
        <thead>
            <tr>
            <th scope="col">Item Name</th>
            <th scope="col">Tags</th>
            ${this.selectedServer != undefined && this.selectedServer != null ? html`<th scope="col">${this._formatStr(this.servers[this.selectedServer])} Price</th><th scope="col">Extra Info</th>` : ''}
            </tr>
        </thead>
        <tbody>
        ${this.items.map(item => html`
          <tr class="itemTable" @click=${() => this._routeToItemPage(item.id)}>
          <td class="dropdown" @mouseenter=${this._checkDropdownPosition}>
          <span class="fake-h3">${this._decodeEscapedUnicode(item.item_name)}</span>
          <div class="dropdown-content">
          ${this.lowDataMode && !item.tags.includes('spawner') && !item.tags.includes('currency') ? html`
            <div class="give-preview-text-outer">
              <div class="give-preview-text w-100">
                <div class="give-preview-text-inner text-start" style="text-align: left;">
                  ${unsafeHTML(this._sanitizeHTML(item.item_html))}
                </div>
              </div>
            </div>  
            ` : html`
            <img
            src=${item.tags.includes('spawner') ? "https://minecraft.wiki/images/Monster_Spawner_JE4.png" : (item.tags.includes('currency') ? `/src/images/${item.img_src}` : `https://www.blossom.atn.gg/static/images/BlossomCraft_Descriptions/${item.id}.png`)}
            alt="${this._decodeEscapedUnicode(item.item_name)}"
            />
            `}
          </div>
          </td>
          <td><div class="tags internal">
              ${item.tags ? item.tags.map(tag => html`
                <span class="tag">${this._decodeEscapedUnicode(tag)}</span>
              `) : 'None :('}
          </div></td>
          ${this.selectedServer != undefined && this.selectedServer != null ? item.price && item.recom_timestamp && item.username ? html`
          <td><span class="price">$${this._formatPrice(item.price)}${item.is_range ? ` to $${this._formatPrice(item.max_price)}` : ''}</span></td><td><sub>-${item.username}<br>${this._formatDate(item.recom_timestamp)}</sub></td>
            ` : html`<td>None :(</td><td>` : ``}
          

          </tr>
          `)}
        </tbody>
        </table>
        </div>
        </div>
        `}
        </div>`
    }
}

customElements.define('items-display', BoxView)
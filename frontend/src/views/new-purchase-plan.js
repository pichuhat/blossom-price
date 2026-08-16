import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';
import { unsafeHTML } from 'https://esm.sh/lit@3/directives/unsafe-html.js';
import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.1.6/+esm';

export class ASView extends LitElement {
  static properties = {
    items: {type: Array},
    loading: {type: Boolean},
    selectedServer: {type: Number},
    crates: {type: Array},
    selectedItems: {type: Array},
    visibleItems: {type: Array},
    lowDataMode: {type: Boolean}
  }

  constructor() {
    super()
    this.loading = true
    this.selectedServer = null
    this.formatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'})
    this.crates = []
    this.tags = []
    this.selectedCrate = null
    this.selectedTags = []
    this.truncated = false
    this.items = []
    this.selectedItems = []
    this.visibleItems = []
    this.lowDataMode = JSON.parse(localStorage.getItem("LDM") ?? true)
    this.servers = ['cherry', 'spirit', 'lotus', 'tulip']
  }

  connectedCallback() {
    super.connectedCallback()
    this._fetchAll()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
  }

  _decodeEscapedUnicode(value) {
    if (typeof value !== 'string') return value
    return value.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
  }

  async _fetchAll() {
    this.loading = true;
    await this._fetchTags()
    await this._fetchCrates()
    this.loading = false;
  }

  async _fetchTags() {
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
    const fetchURL = `/api/search/advanced?query=${query}${this.selectedServer != null ? `&selectedServer=${this.selectedServer}` : ""}${this.selectedCrate ? `&crate=${this.selectedCrate}` : ""}${this.selectedTags ? this.selectedTags.map(tag => `&tags=${tag}`).join('') : ""}`
    console.log(fetchURL)
    try {
      const response = await fetch(fetchURL, {
        method: "GET",
        credentials: 'include'
      })

      if (!response.ok) throw new Error("Server fetch issue")

      const result = await response.json()
      this.truncated = result.truncated
      this.items = result.result
      this._setVisible()
    } catch(err) {
      console.error("Error loading advanced search: " + err)
    }
  }

  _formatStr(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

  static styles = [sharedStyles, css`
    .ASparams {
    position: relative;
    }

    .leftbutton {
    position: absolute;
    top: 20px;
    left: 20px;
    }

    .outerbox {
      width: 100%;
      margin: 12px 0;
      text-align: center;
    }
  `]

  _formatPrice(unformatted) {
        if (!unformatted || isNaN(unformatted) || unformatted === null) return "-"
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
        if (selectedTags) {
        const e = selectedTags.map(tag => `&tags=${tag}`)
        selectedTags = e.join("")
        }
        const path = `/~/purchaseplan/new?query=${inputEl}${selectedCrate ? `&crate=${selectedCrate}` : ""}${selectedTags ? selectedTags : ""}`
        this.dispatchEvent(new CustomEvent('nav-requested', {
        detail: { path },
        bubbles: true,
        composed: true
        }));
        this.loading = true;
        this._fetchItems().finally(() => this.loading = false)
    }

    async updated(changedProperties) {
  if (changedProperties.has('selectedServer')) {
    this.loading = true;
    await this._fetchItems()
    await this._updatePrices()
    this.loading = false;
  }
}

  _handleLDM(e) {
      this.lowDataMode = e.target.checked
      localStorage.setItem('LDM', this.lowDataMode)
      this.requestUpdate()
    }

_setVisible() {
    let toModify = this.items
    const toRemove = new Set(this.selectedItems.map(item => item.id))
    toModify = toModify.filter(item => !toRemove.has(item.id))
    this.visibleItems = toModify
}

_countUp(id) {
  const index = this.selectedItems.findIndex(item => item.id == id)
  if (isNaN(this.selectedItems[index].count) || this.selectedItems[index].count >= 10) return
  this.selectedItems[index].count++
  this.requestUpdate()
}

_countDown(id) {
  const index = this.selectedItems.findIndex(item => item.id == id)
  if (isNaN(this.selectedItems[index].count) || this.selectedItems[index].count <= 1) return
  this.selectedItems[index].count--
  this.requestUpdate()
}

_selectItem(id) {
    const item = this.visibleItems.find(item => item.id == id)
    const index = this.visibleItems.findIndex(item => item.id == id)
    const toPush = {...item, count: 1}
    this.selectedItems.push(toPush)
    this.visibleItems.splice(index, 1)
    this.requestUpdate()
}

_deselectItem(id) {
    const item = this.selectedItems.find(item => item.id == id)
    const index = this.selectedItems.findIndex(item => item.id == id)
    this.selectedItems.splice(index, 1)
    this._setVisible()
    this.requestUpdate()
}

_sanitizeHTML(input) {
      return this._decodeEscapedUnicode(DOMPurify.sanitize(input, {
        ALLOWED_TAGS: ['div', 'span', 'br'],
        ALLOWED_ATTR: ['class', 'style'],
      }));
    }

_getTotalPrice() {
  let min = 0
  let max = 0
  this.selectedItems.forEach(item => {
      min = min + (Number(item.price) * item.count)
    if (item.is_range) {
      max = max + (Number(item.max_price) * item.count)
    } else {
      max = max + (Number(item.price) * item.count)
    }
  })
  return [min, max]
}

async _updatePrices() {
  if (this.selectedItems.length === 0) return
  const ids = this.selectedItems.map(item => item.id)

  try {
    const response = await fetch(`/api/itemset?server=${this.selectedServer}${ids.map(id => `&item=${id}`).join('')}`, {
      method: "GET",
      credentials: "include"
    })

    if (!response.ok) return window.alert("Couldn't update selected item prices for this server.")

    const result = await response.json()

    this.selectedItems.forEach(item => {
      const data = result.result.find(row => row.id === item.id)
      item.price = data.price
      item.recom_timestamp = data.recom_timestamp
      item.recommendation_id = data.recommendation_id
      item.author_id = data.author_id
      item.server = data.server
      item.is_range = data.is_range
      item.max_price = data.max_price || null
      item.username = data.username || null
    })

  } catch(e) {
    console.error(e)
    window.alert("Couldn't update selected item prices for this server.")
  }
}

async _createPlan() {
  this.loading = true;
  try {
  const itemsToUpload = this.selectedItems.map(item => ({id: item.id, count: item.count}))
  const planName = this.shadowRoot.querySelector('#plan-name').value
  const isPublic = this.shadowRoot.querySelector('#public-toggle').checked

  if (!planName) return window.alert('You must name your purchase plan.')
  if (planName.length > 50) return window.alert("This name is too long. It must be 50 characters or less.")
  if (!/^[\w ]+$/.test(planName)) return window.alert("Names cannot have any special characters except underscores.")
  
    const response = await fetch('/api/purchaseplan/new', {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: itemsToUpload,
        server: Number(this.selectedServer),
        name: planName,
        is_public: isPublic
      })
    })

    if (!response.ok) {console.log(response); return window.alert("Failed to upload.")}

    const result = await response.json()
    this._navigateTo(`/~/purchaseplan/view/${result.redirect_id}`)
  } catch(e) {
    window.alert("Failed to upload.")
  } finally {
    this.loading = false;
  }
}

_navigateTo(path, event) {
    if (event) event.preventDefault();
    this.dispatchEvent(new CustomEvent('nav-requested', {
      detail: { path },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const data = this._getTotalPrice()
    const minPrice = data[0]
    const maxPrice = data[1]
    const displayPrice = (minPrice+maxPrice)/2

    return html`

      <div class="center">
        <h1>New Purchase Plan - Selected Items</h1>
        ${this.selectedItems && this.selectedItems.length > 0 ? html`
          <div class="dashboard">
            <div class="fullcard lockWidth">
            <span style="font-size: 125%"><strong>Total Price:</strong></span> <span class="price">$${this._formatPrice(displayPrice)}</span>
            ${minPrice === maxPrice ? `` : html`<br><sub>Actual: $${this._formatPrice(minPrice)} to $${this._formatPrice(maxPrice)}</sub>`}
            <br><br><wa-switch id="public-toggle" ?disabled=${this.loading}>Make This Plan Public</wa-switch>
            <wa-input id="plan-name" label="Name" placeholder="Name your plan..." style="max-width: 70%; margin-left: auto; margin-right: auto;" ?disabled=${this.loading} size="s"></wa-input>
            <br><wa-button variant="brand" @click=${this._createPlan} ?disabled=${this.loading} size="s">Create Purchase Plan</wa-button>
              <table>
              <thead>
              <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Price per Item (${this._formatStr(this.servers[this.selectedServer])})</th>
              <th scope="col">Count</th>
              <th scope="col">Final Price</th>
              <th scope="col">Actions</th>
              </tr>
              </thead>
              <tbody>
              ${this.selectedItems.map(item => html`
                <tr>
                <td><span class="fake-h3">${this._decodeEscapedUnicode(item.item_name)}</span></td>
                <td><span class="priceAdd">$${this._formatPrice(item.price)}${item.is_range ? ` to $${this._formatPrice(item.max_price)}` : ''}</span></td>
                <td><wa-button-group><wa-button variant="brand" square size="s" @click=${() => this._countDown(item.id)} ?disabled=${this.loading || item.count <= 1}>−</wa-button><wa-button size="s" style="pointer-events: none; opacity: 1; tabindex: -1;" variant="brand">${item.count || 1}</wa-button><wa-button size="s" variant="brand" square ?disabled=${this.loading || item.count >= 10} @click=${(e) => this._countUp(item.id)}>+</wa-button></wa-button-group></td>
                <td>${item.is_range ? html `<span class="price">$${(this._formatPrice((Number(item.price) + Number(item.max_price))/2 * (item.count || 1))) || '-'}</span><br><sub>Actual: $${this._formatPrice(Number(item.price) * (item.count || 1))} to $${this._formatPrice(Number(item.max_price) * (item.count || 1))}</sub>`
                : html`<span class="price">$${this._formatPrice(Number(item.price) * (item.count || 1))}</span>`}</td>
                <td><wa-button variant="danger" @click=${() => this._deselectItem(item.id)} ?disabled=${this.loading}><wa-icon name="trash-can"></wa-icon></wa-button></td>
                </tr>
                `)}
              </tbody>
              </table>
            </div>
          </div>
        ` : html`Selected items will appear here!`}
      </div>

      <div class="center outerbox">
        <h1>Find Items</h1>
        <div class="ASparams">
          ${this.truncated && !this.loading ? html`<wa-callout variant="warning"><wa-icon slot="icon" name="triangle-exclamation"></wa-icon><strong>Search Results Limited</strong><br>This search was limited to 150 items. Don't worry, this is a temporary fix!</wa-callout><br>` : ''}
          <wa-input label="Search Term" id="search" placeholder="Search..." autocomplete="off" ?disabled=${this.loading} value=${new URLSearchParams(window.location.search).get('query')}></wa-input>
          <br>
          <wa-select label="Crate" id="crate" value=${this.selectedCrate || ""} ?disabled=${this.loading}>
            <wa-option value="" ?selected=${!this.selectedCrate}>All</wa-option>
            ${this.crates.map(crate => html`<wa-option value=${crate.id} ?selected=${this.selectedCrate == crate.id}>${crate.CrateName}</wa-option>`)}
          </wa-select>
          <br>
          <wa-select label="Tags" id="tags" value=${this.selectedTags.join(' ')} placeholder="Select tags..." multiple with-clear ?disabled=${this.loading}>
            ${this.tags.map(tag => html`<wa-option value=${tag.replaceAll(" ", "_")} ?selected=${this.selectedTags.includes(tag)}>${tag}</wa-option>`)}
          </wa-select>
          <br>
          <wa-button @click=${this._search} variant="brand" ?disabled=${this.loading} ?loading=${this.loading}>Search</wa-button>
        </div>
      </div>

      ${this.loading ? "" : html`
        <div class="center">
          <strong>Click items to select them. Already selected items are hidden.</strong>
        </div>
      `}

      ${this.loading ? html`<div class="grid"><wa-spinner></wa-spinner></div>` : html`
        ${this.visibleItems && this.visibleItems.length > 0 ? html`
          <div class="center">
            <div class="forceGap">
              <wa-switch ?checked=${this.lowDataMode} id="LDMtoggle" @change=${this._handleLDM}>Low Data Mode</wa-switch>
            </div>
            <div class="grid">
              ${this.visibleItems.map(item => html`
                <div class="card" @click="${() => this._selectItem(item.id)}">
                  <h3>${this._decodeEscapedUnicode(item.item_name)}</h3>
                  ${this.selectedServer !== undefined && this.selectedServer !== null && item.price && item.recom_timestamp && item.username ? html`
                    <div class="center">
                      <span class="priceAdd">${this._formatStr(this.servers[this.selectedServer])} Price${item.is_range ? ' Range' : ""}: </span><br>
                      <span class="price">$${this._formatPrice(item.price)}${item.is_range ? ` to $${this._formatPrice(item.max_price)}` : ''}</span><br>
                      <sub>-${item.username}<br>${this._formatDate(item.recom_timestamp)}</sub>
                    </div>
                  ` : html`<sub>No price available :(</sub>`}
                  
                  <div class="tags">
                    ${item.tags ? item.tags.map(tag => html`
                      <span class="tag">${this._decodeEscapedUnicode(tag)}</span>
                    `) : ''}
                  </div>
                  
                  ${this.lowDataMode && !item.tags?.includes('spawner') && !item.tags?.includes('currency') ? html`
                    <div class="give-preview-text-outer">
                      <div class="give-preview-text w-100">
                        <div class="give-preview-text-inner text-start" style="text-align: left;">
                          ${unsafeHTML(this._sanitizeHTML(item.item_html))}
                        </div>
                      </div>
                    </div>  
                  ` : html`
                    <img
                      src=${item.tags?.includes('spawner') ? "https://minecraft.wiki/images/Monster_Spawner_JE4.png" : (item.tags?.includes('currency') ? `/src/images/${item.img_src}` : `https://www.blossom.atn.gg/static/images/BlossomCraft_Descriptions/${item.id}.png`)}
                      alt="${this._decodeEscapedUnicode(item.item_name)}"
                    />
                  `}
                </div>
              `)}
            </div>
          </div>
        ` : html`<div class="grid">Search results will appear here!</div>`}
      `}
    `;
  }
}
customElements.define('new-purchase-plan', ASView);
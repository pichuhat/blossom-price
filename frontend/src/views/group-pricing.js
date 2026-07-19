import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';
import { unsafeHTML } from 'https://esm.sh/lit@3/directives/unsafe-html.js';
import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.1.6/+esm';
import { communicator } from '../cross-communicator.js'

export class ASView extends LitElement {
  static properties = {
    items: {type: Array},
    loading: {type: Boolean},
    selectedServer: {type: Number},
    crates: {type: Array},
    selectedItems: {type: Array},
    visibleItems: {type: Array},
    lowDataMode: {type: Boolean},
    openSubmission: {type: Boolean},
    currentValue: {type: String},
    activeMenu: {type: String},
    currentMaxValue: {type: String}
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
    this.openSubmission = false;
    this.servers = ['cherry', 'spirit', 'lotus', 'tulip']

    this.currentValue = "0";
    this.activeMenu = 'exact'
    this.currentMaxValue = "0"

    this._openModal = this._openModal.bind(this)
    this._closeModal = this._closeModal.bind(this)
  }

  connectedCallback() {
    super.connectedCallback()
    this._fetchAll()

    communicator.addEventListener('open-modal', this._openModal)
    communicator.dispatchEvent(new CustomEvent('set-status', {detail: {visible: false, count: 0}}))
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    communicator.removeEventListener('open-modal', this._openModal)
    communicator.dispatchEvent(new CustomEvent('set-status', {detail: {visible: false}}))
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

  _openModal() {
    this.openSubmission = true;
    this.updateComplete.then(() => {
    this.shadowRoot.querySelector(this.activeMenu == 'range' ? '#newMinPrice' : '#newprice').focus();
  });
  }

  _closeModal() {
    this.openSubmission = false;
  }

  static styles = [sharedStyles, css`
    .ASparams {
    position: relative;
    }

    #newprice, #newMaxPrice, #newMinPrice {
    font-size: 150%;
    text-align: center;
    }

    input {
    width: 100%;
    box-sizing: border-box;
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

    #priceDisplay, #minPriceDisplay, #maxPriceDisplay {
    color: var(--color-text);
    transition: color 0.4s ease;
    }
    #priceDisplay.red, #minPriceDisplay.red, #maxPriceDisplay.red {
    color: red;
    }

    .rangeDisplay {
    display: grid;
    grid-template-columns: 1fr 2px 1fr;
    gap: 20px;
    }

    .divider {
    background-color: var(--color-border);
    height: 100%;
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
        const path = `/~/grouppricing?query=${inputEl}${selectedCrate ? `&crate=${selectedCrate}` : ""}${selectedTags ? selectedTags : ""}`
        this.dispatchEvent(new CustomEvent('nav-requested', {
        detail: { path },
        bubbles: true,
        composed: true
        }));
        this.loading = true;
        this._fetchItems().finally(() => this.loading = false)
    }

    updated(changedProperties) {
  if (changedProperties.has('selectedServer')) {
    this._fetchItems()
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

_selectItem(id) {
    const item = this.visibleItems.find(item => item.id == id)
    const index = this.visibleItems.findIndex(item => item.id == id)
    this.selectedItems.push(item)
    this.visibleItems.splice(index, 1)
    communicator.dispatchEvent(new CustomEvent('set-status', {detail: {visible: true, count: this.selectedItems.length}}))
    this.requestUpdate()
}

_deselectItem(id) {
    const item = this.selectedItems.find(item => item.id == id)
    const index = this.selectedItems.findIndex(item => item.id == id)
    this.selectedItems.splice(index, 1)
    this._setVisible()
    communicator.dispatchEvent(new CustomEvent('set-status', {detail: {visible: true, count: this.selectedItems.length}}))
    this.requestUpdate()
}

_sanitizeHTML(input) {
      return this._decodeEscapedUnicode(DOMPurify.sanitize(input, {
        ALLOWED_TAGS: ['div', 'span', 'br'],
        ALLOWED_ATTR: ['class', 'style'],
      }));
    }

    //PRICE FUNCTIONS
     _handleInput(event) {
    this.currentValue = event.target.value
  }

  _handleAltInput(event) {
    this.currentMaxValue = event.target.value
  }

  _getReadValue(isMaxPrice) {
    const value = isMaxPrice ? this.currentMaxValue : this.currentValue
    if (!value) return 0;
    const original = value
    if (isNaN(original)) {
        if (isNaN(original.slice(0, -1)) || !['k', 'm'].includes(original.at(-1).toLowerCase())) {
            return "-"
        } else {
            const asNumber = Number(original.slice(0, -1))
            if (original.at(-1).toLowerCase() == 'k') {
                return asNumber * 1000
            } else if (original.at(-1).toLowerCase() == 'm') {
                return asNumber * 1000000
            } else {
                return "-"
            }
        }
    } else {
      if (original > 0) {
        return original
      } else {
        return 0
      }
    }
  }

  _handleKeydown(e) {
    const box = this.shadowRoot.querySelector('#newprice')
    const value = box.value
    if (e.key == 'Enter') {
      e.preventDefault()
      this._uploadRecom()
    } else if (e.key == "Escape") {
      this.openSubmission = false;
    } else if (e.key == "ArrowRight" && box.selectionStart === box.selectionEnd && box.selectionStart === value.length) {
      this._handleTabChange(e, 'range')
    }
  }

  _handleAltKeydown(e, doSubmit) {
    const box = doSubmit ? this.shadowRoot.querySelector('#newMaxPrice') : this.shadowRoot.querySelector('#newMinPrice')
    const value = box.value
    if (e.key == 'Enter' || (e.key == 'ArrowRight' && !doSubmit && box.selectionStart === box.selectionEnd && box.selectionStart === value.length)) {
      e.preventDefault()
      if (doSubmit) {
      this._uploadRecom(true)
      } else {
        this.shadowRoot.querySelector('#newMaxPrice').focus()
      }
    } else if (e.key == 'Escape') {
      this.openSubmission = false;
    } else if (e.key == 'ArrowLeft' && doSubmit && box.selectionStart === box.selectionEnd && box.selectionStart == 0) {
      e.preventDefault()
      this.shadowRoot.querySelector('#newMinPrice').focus()
    } else if (e.key == 'ArrowLeft' && box.selectionStart === box.selectionEnd && box.selectionStart == 0) {
      this._handleTabChange(e, 'exact')
    }
  }

  _redFlash(isRange) {
    const toFlash = isRange ? this.shadowRoot.querySelector('#minPriceDisplay') : this.shadowRoot.querySelector("#priceDisplay")
    clearTimeout(this.flashTimeout)
    toFlash.classList.add("red")
    this.flashTimeout = setTimeout(() => {toFlash.classList.remove("red")}, 400)
  }

  _maxRedFlash() {
    const toFlash = this.shadowRoot.querySelector('#maxPriceDisplay')
    clearTimeout(this.maxFlashTimeout)
    toFlash.classList.add("red")
    this.maxFlashTimeout = setTimeout(() => {toFlash.classList.remove("red")}, 400)
  }

  _validatePrice(price) {
   if (!price || isNaN(price) || price <= 0 || price > 50000000 || Math.round(price) != price) return false;
   return true;
  }

  async _uploadRecom(isRange) {
    this.loading = true;
    const price = this._getReadValue()
    let maxPrice = null
    if (!this._validatePrice(price)) {
      this._redFlash(!!isRange)
      this.loading = false
      return
    }
    const data = {
      item_id: [...new Set(this.selectedItems.map(item => item.id))],
      server_id: this.selectedServer,
      price: price,
      is_range: !!isRange
    }
    if (isRange) {
      maxPrice = this._getReadValue(true)
      if (!this._validatePrice(maxPrice)) {
        this._maxRedFlash()
        this.loading = false
        return
      }
      data.max_price = maxPrice
    }

    try {

    const response = await fetch("/api/group-recommend", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    })
    if (!response.ok) return console.log(response);

    const result = await response.json()

    if (result.success) {
      window.alert("Recommendation(s) submitted! Awaiting approval.")
      this.openSubmission = false;
    } else {
      window.alert("An unknown error occurred.")
      console.log(result.message)
    }

  } catch(err) {
    window.alert("An error occurred.")
    console.error(err)
  } finally {
    this.loading = false;
  }
    }

    _handleTabChange(event, tab) {
      event.preventDefault()
      this.activeMenu = tab
      this.updateComplete.then(() => this.shadowRoot.querySelector(this.activeMenu == 'range' ? '#newMinPrice' : '#newprice').focus())
    }

  render() {
    return html`
    <div ?hidden=${!this.openSubmission} class="modal-overlay" @click=${this._closeModal}>
      <div class="modal-content center" @click=${(e) => e.stopPropagation()}>
      <wa-button pill size="xs" class="leftbutton" @click=${(e) => this.openSubmission = false} ?disabled=${this.loading} variant="brand"><wa-icon name="times"></wa-icon></wa-button>
      <span class="bigText bigSubText">Recommend New Price</span>
      <br><sub><b>Price limit: $50,000,000</b></sub>
      <div class="outerbox">
      <wa-button-group class="self-center" orientation="horizontal">
      <wa-button variant="brand" value="exact" size="s" @click=${(e) => this._handleTabChange(e, 'exact')} ?disabled=${this.activeMenu === 'exact'}>Exact Price</wa-button>
      <wa-button variant="brand" value="range" size="s" @click=${(e) => this._handleTabChange(e, 'range')} ?disabled=${this.activeMenu === 'range'}>Price Range</wa-button>
      </wa-button-group></div>
      ${this.activeMenu == 'exact' ? html`
      <span class="bigText" id="priceDisplay">$${this._formatPrice(this._getReadValue()) || '-'}</span>
      <br><input id="newprice" @input=${this._handleInput} @keydown=${(e) => this._handleKeydown(e)} ?disabled=${this.loading}><br><br>
      <wa-button pill variant="brand" @click=${() => this._uploadRecom(false)} ?disabled=${this.loading}>Submit</wa-button>
      ` : html`
      <div class="rangeDisplay">
      <div class="leftItem">
      <span class="bold">Range Minimum</span>
      <br><span class="bigSubText" id="minPriceDisplay">$${this._formatPrice(this._getReadValue())}</span>
      <br><input id="newMinPrice" @input=${this._handleInput} @keydown=${(e) => this._handleAltKeydown(e, false)} ?disabled=${this.loading}><br><br>
      </div>
      <div class="divider"></div>
      <div class="rightItem">
      <span class="bold">Range Maximum</span>
      <br><span class="bigSubText" id="maxPriceDisplay">$${this._formatPrice(this._getReadValue(true))}</span>
      <br><input id="newMaxPrice" @input=${this._handleAltInput} @keydown=${(e) => this._handleAltKeydown(e, true)} ?disabled=${this.loading}><br><br>
      </div>
      </div><br>
      <wa-button pill variant="brand" @click=${() => this._uploadRecom(true)} ?disabled=${this.loading} ?loading=${this.loading}>Submit</wa-button>
      `}
      </div>
    </div>

      <div class="center">
        <h1>Selected Items</h1>
        ${this.selectedItems && this.selectedItems.length > 0 ? html`
          <div class="center">
            <strong>Click items to deselect them.</strong>
            <div class="grid">
              ${this.selectedItems.map(item => html`
                <div class="card" @click="${() => this._deselectItem(item.id)}">
                  <h3>${this._decodeEscapedUnicode(item.item_name)}</h3>
                  <div class="tags">
                    ${item.tags ? item.tags.map(tag => html`
                      <span class="tag">${this._decodeEscapedUnicode(tag)}</span>
                    `) : ''}
                  </div>
                </div>
              `)}
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
customElements.define('group-price-view', ASView);

import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles.js';
import { createToast } from '../toast.js'

export class NewPrice extends LitElement {
    static properties = {
        loading: {type: Boolean},
        selectedServer: {type: Number},
        selectedItem: {type: Number},
        itemData: {type: Object},
        currentValue: {type: String},
        activeMenu: {type: String},
        currentMaxValue: {type: String},
        isHistorical: {type: Boolean},
        effectiveTimestamp: {type: String}
    }

    constructor() {
        super()
        this.loading = false;
        this.selectedServer = null;
        this.selectedItem = null;
        this.itemData = null;
        this.currentValue = "0";
        this.activeMenu = 'exact'
        this.currentMaxValue = "0"
        this.isHistorical = false
        this.effectiveTimestamp = this._toLocalInputValue()
    this._handleShortcutKeydown = this._handleShortcutKeydown.bind(this)
    }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('keydown', this._handleShortcutKeydown)
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this._handleShortcutKeydown)
    super.disconnectedCallback()
  }

  _toLocalInputValue(date = new Date()) {
  const pad = n => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
         `T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

  static styles = [sharedStyles, css`
  .box {
    background-color: #222222;
    border: 1px solid #444444;
    border-radius: 8px;
    padding: 20px;
    color: white;
    text-align: center;
    width: 50%;
    position: relative;
    }

    .ASparams {
    position: relative;
    }

    .newprice-dashboard {
    width: 100%;
    margin-top: 20px;
    text-align: center;
    }

    .box {
      margin: 0 auto;
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

    .historical-controls {
      margin: 0 auto 16px;
      max-width: 420px;
      text-align: center;
    }

    .historical-date {
      display: block;
      margin-top: 10px;
    }

    .historical-date input {
      margin-top: 6px;
      padding: 8px;
      color: var(--color-text);
      background: var(--color-background, #222);
      border: 1px solid var(--color-border);
      border-radius: 4px;
    }

    .historical-help {
      display: block;
      margin-top: 6px;
    }
  `]

  firstUpdated() {
    this.shadowRoot.getElementById("newprice").focus()
  }

  _handleInput(event) {
    this.currentValue = event.target.value
  }

  _handleAltInput(event) {
    this.currentMaxValue = event.target.value
  }

  _handleHistoricalToggle(event) {
    this.isHistorical = event.target.checked
    if (this.isHistorical) this.effectiveTimestamp = this._toLocalInputValue()
  }

  _handleEffectiveTimestampInput(event) {
    this.effectiveTimestamp = event.target.value
  }

  _getMaxEffectiveDateTime() {
    const now = new Date()
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
  }

  _getMinEffectiveDateTime() {
    const minimum = new Date('2025-01-01T00:00:00Z')
    return new Date(minimum.getTime() - minimum.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
  }

  _handleShortcutKeydown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return

    const path = event.composedPath()
    const target = path.find(element => element instanceof HTMLInputElement) || event.target
    const isDateInput = target instanceof HTMLInputElement && target.type === 'datetime-local'
    const priceInput = target instanceof HTMLInputElement && ['newprice', 'newMinPrice', 'newMaxPrice'].includes(target.id)
    const isHistoricalSwitch = path.some(element => element instanceof HTMLElement && element.localName === 'wa-switch')
    const isButton = path.some(element => element instanceof HTMLElement && element.localName === 'wa-button')

    if (event.key === 'Escape') {
      event.preventDefault()
      this._closeMenu(event)
      return
    }

    if (event.key === 'Enter') {
      if (isButton) return
      if (target instanceof HTMLInputElement && !priceInput && !isDateInput && !isHistoricalSwitch) return
      event.preventDefault()
      if (priceInput && target.id === 'newMinPrice') {
        this.shadowRoot.querySelector('#newMaxPrice').focus()
        return
      }
      this._uploadRecom(this.activeMenu === 'range')
      return
    }

    if (event.key === 'h') {
      event.preventDefault()
      this.isHistorical = !this.isHistorical
      if (this.isHistorical) this.effectiveTimestamp = this._toLocalInputValue()
      return
    }

    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    if (isDateInput) return
    if (target instanceof HTMLInputElement && !priceInput && !isHistoricalSwitch) return

    if (priceInput) {
      const atStart = target.selectionStart === target.selectionEnd && target.selectionStart === 0
      const atEnd = target.selectionStart === target.selectionEnd && target.selectionStart === target.value.length

      if (event.key === 'ArrowRight' && target.id === 'newprice' && atEnd) {
        this._handleTabChange(event, 'range')
      } else if (event.key === 'ArrowRight' && target.id === 'newMinPrice' && atEnd) {
        event.preventDefault()
        this.shadowRoot.querySelector('#newMaxPrice').focus()
      } else if (event.key === 'ArrowLeft' && target.id === 'newMaxPrice' && atStart) {
        event.preventDefault()
        this.shadowRoot.querySelector('#newMinPrice').focus()
      } else if (event.key === 'ArrowLeft' && target.id === 'newMinPrice' && atStart) {
        this._handleTabChange(event, 'exact')
      }
      return
    }

    if (isHistoricalSwitch) event.preventDefault()

    if (event.key === 'ArrowRight' && this.activeMenu === 'exact') {
      this._handleTabChange(event, 'range')
    } else if (event.key === 'ArrowLeft' && this.activeMenu === 'range') {
      this._handleTabChange(event, 'exact')
    }
  }

  _formatPrice(unformatted) {
        if (isNaN(unformatted)) return '-'
        return Number(unformatted).toLocaleString()
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

  _closeMenu(event) {
    event.preventDefault()
    this.dispatchEvent(new CustomEvent('close-recom', {
      bubbles: true,
      composed: true
    }));
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

  _validatePrice(price) {return (price && !isNaN(price) && price > 0 && price <= 50000000 && Math.round(price) == price)}

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
      item_id: this.selectedItem,
      server_id: this.selectedServer,
      price: price,
      is_range: !!isRange
    }

    if (this.isHistorical) {
      const dateInput = this.shadowRoot.querySelector('#effectiveTimestamp')
      const effectiveDate = new Date(this.effectiveTimestamp)
      const isBeforeMinimum = effectiveDate.getTime() < Date.parse('2025-01-01T00:00:00Z')
      const isInFuture = effectiveDate.getTime() > Date.now()
      dateInput.setCustomValidity(isBeforeMinimum ? 'Effective timestamp cannot be before 2025.' : isInFuture ? 'Effective timestamp cannot be in the future.' : '')
      if (!this.effectiveTimestamp || Number.isNaN(effectiveDate.getTime()) || isBeforeMinimum || isInFuture) {
        dateInput.reportValidity()
        this.loading = false
        return
      }
      data.effective_timestamp = effectiveDate.toISOString()
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

    const response = await fetch("/api/recommend", {
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
      createToast("<strong>Success</strong><br>Your price recommendation was submitted and is awaiting approval.", {variant: 'success', icon: 'circle-check', allowHtml: true})
      this.dispatchEvent(new CustomEvent('close-recom', {
        bubbles: true,
        composed: true
      }))
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
    <div class="newprice-dashboard">
      <div class="ASparams">
      <wa-button pill size="xs" class="leftbutton" @click=${(e) => this._closeMenu(e)} ?disabled=${this.loading} variant="brand"><wa-icon name="times"></wa-icon></wa-button>
      <span class="bigText bigSubText">Recommend New Price</span>
      <br><sub><b>Price limit: $50,000,000</b></sub>
      <div class="outerbox">
      <wa-button-group class="self-center" orientation="horizontal">
      <wa-button variant="brand" value="exact" size="s" @click=${(e) => this._handleTabChange(e, 'exact')} ?disabled=${this.activeMenu === 'exact'}>Exact Price</wa-button>
      <wa-button variant="brand" value="range" size="s" @click=${(e) => this._handleTabChange(e, 'range')} ?disabled=${this.activeMenu === 'range'}>Price Range</wa-button>
      </wa-button-group></div>
      <div class="historical-controls">
        <wa-switch .checked=${this.isHistorical} @change=${this._handleHistoricalToggle} ?disabled=${this.loading}>Historical Price</wa-switch>
        <br><sub>Tip: press H to toggle.</sub>
        ${this.isHistorical ? html`<label class="historical-date">Effective Timestamp<input id="effectiveTimestamp" type="datetime-local" step="60" min=${this._getMinEffectiveDateTime()} max=${this._getMaxEffectiveDateTime()} .value=${this.effectiveTimestamp} @input=${this._handleEffectiveTimestampInput} ?required=${this.isHistorical} ?disabled=${this.loading}><small class="historical-help">Choose when this price was valid. The submission time will still be recorded separately.</small></label>` : ''}
      </div>
      ${this.activeMenu == 'exact' ? html`
      <span class="bigText" id="priceDisplay">$${this._formatPrice(this._getReadValue()) || '-'}</span>
      <br><input id="newprice" @input=${this._handleInput} ?disabled=${this.loading}><br><br>
      <wa-button pill variant="brand" @click=${() => this._uploadRecom(false)} ?disabled=${this.loading}>Submit</wa-button>
      ` : html`
      <div class="rangeDisplay">
      <div class="leftItem">
      <span class="bold">Range Minimum</span>
      <br><span class="bigSubText" id="minPriceDisplay">$${this._formatPrice(this._getReadValue())}</span>
      <br><input id="newMinPrice" @input=${this._handleInput} ?disabled=${this.loading}><br><br>
      </div>
      <div class="divider"></div>
      <div class="rightItem">
      <span class="bold">Range Maximum</span>
      <br><span class="bigSubText" id="maxPriceDisplay">$${this._formatPrice(this._getReadValue(true))}</span>
      <br><input id="newMaxPrice" @input=${this._handleAltInput} ?disabled=${this.loading}><br><br>
      </div>
      </div><br>
      <wa-button pill variant="brand" @click=${() => this._uploadRecom(true)} ?disabled=${this.loading}>Submit</wa-button>
      `}
      </div>
      </div>
    `;
  }
}
customElements.define('new-price', NewPrice);

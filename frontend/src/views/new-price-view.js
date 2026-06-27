import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';

export class NewPrice extends LitElement {
    static properties = {
        loading: {type: Boolean},
        selectedServer: {type: Number},
        selectedItem: {type: Number},
        itemData: {type: Object},
        currentValue: {type: String},
        activeMenu: {type: String},
        currentMaxValue: {type: String}
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
    #priceDisplay.red, #maxPriceDisplay.red {
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

  firstUpdated() {
    this.shadowRoot.getElementById("newprice").focus()
  }

  _handleInput(event) {
    this.currentValue = event.target.value
  }

  _handleAltInput(event) {
    this.currentMaxValue = event.target.value
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

  _handleKeydown(e) {
    const box = this.shadowRoot.querySelector('#newprice')
    const value = box.value
    if (e.key == 'Enter') {
      e.preventDefault()
      this._uploadRecom()
    } else if (e.key == "Escape") {
      this._closeMenu(e)
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
      this._closeMenu(e)
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
      item_id: this.selectedItem,
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
      window.alert("Recommendation submitted! Awaiting approval.")
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
      <wa-button pill variant="brand" @click=${() => this._uploadRecom(true)} ?disabled=${this.loading}>Submit</wa-button>
      `}
      </div>
      </div>
    `;
  }
}
customElements.define('new-price', NewPrice);
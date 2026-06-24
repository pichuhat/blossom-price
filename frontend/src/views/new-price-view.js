import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';

export class NewPrice extends LitElement {
    static properties = {
        loading: {type: Boolean},
        selectedServer: {type: Number},
        selectedItem: {type: Number},
        itemData: {type: Object},
        currentValue: {type: String}
    }

    constructor() {
        super()
        this.loading = false;
        this.selectedServer = null;
        this.selectedItem = null;
        this.itemData = null;
        this.currentValue = "0";
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

    .newprice-dashboard {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    }

    #newprice {
    font-size: 150%;
    text-align: center;
    }

    .leftbutton {
    position: absolute;
    top: 20px;
    left: 20px;
    }
    #priceDisplay {
    color: white;
    transition: color 0.4s ease;
    }
    #priceDisplay.red {
    color: red;
    }
  `]

  firstUpdated() {
    this.shadowRoot.getElementById("newprice").focus()
  }

  _handleInput(event) {
    this.currentValue = event.target.value
  }

  _formatPrice(unformatted) {
        if (isNaN(unformatted)) return '-'
        return Number(unformatted).toLocaleString()
    }

  _getReadValue() {
    if (!this.currentValue) return 0;
    const original = this.currentValue
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
        return "-"
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
    if (e.key == 'Enter') {
      e.preventDefault()
      this._uploadRecom()
    } else if (e.key == "Escape") {
      this._closeMenu(e)
    }
  }

  _redFlash() {
    const toFlash = this.shadowRoot.querySelector("#priceDisplay")
    clearTimeout(this.flashTimeout)
    toFlash.classList.add("red")
    this.flashTimeout = setTimeout(() => {toFlash.classList.remove("red")}, 400)
  }

  async _uploadRecom() {
    this.loading = true;
    const price = this._getReadValue()
    if (!price || isNaN(price)) {
      this._redFlash()
      this.loading = false
    }
    const data = {
      item_id: this.selectedItem,
      server_id: this.selectedServer,
      price: price  
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

  render() {

    return html`
    <div class="newprice-dashboard">
      <div class="box">
      <wa-button pill size="xs" class="leftbutton" @click=${(e) => this._closeMenu(e)} ?disabled=${this.loading} variant="brand"><wa-icon name="times"></wa-icon></wa-button>
      <span class="bigText bigSubText">Recommend New Price</span>
      <h1 id="priceDisplay">$${this._formatPrice(this._getReadValue()) || '-'}</h1>
      <input id="newprice" @input=${this._handleInput} @keydown=${(e) => this._handleKeydown(e)} ?disabled=${this.loading}><br><br>
      <wa-button pill variant="brand" @click=${this._uploadRecom} ?disabled=${this.loading}>Submit</wa-button>
      </div>
      </div>
    `;
  }
}
customElements.define('new-price', NewPrice);
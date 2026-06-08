import { LitElement, html, css } from 'https://esm.sh/lit@3';

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
        this.loading = true;
        this.selectedServer = null;
        this.selectedItem = null;
        this.itemData = null;
        this.currentValue = "0";
    }

  static styles = css`
  .box {
    background-color: #222222;
    border: 1px solid #444444;
    border-radius: 8px;
    padding: 20px;
    color: white;
    text-align: center;
    width: 50%;
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
    display: block;
    margin-right: auto;
    margin-left: 0;
    }
  `;

  firstUpdated() {
    this.shadowRoot.getElementById("newprice").focus()
  }

  _handleInput(event) {
    this.currentValue = event.target.value
  }

  _formatPrice(unformatted) {
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
                return this._formatPrice(asNumber * 1000)
            } else if (original.at(-1).toLowerCase() == 'm') {
                return this._formatPrice(asNumber * 1000000)
            } else {
                return "Error"
            }
        }
    } else {
        return this._formatPrice(original)
    }
  }

  _closeMenu(event) {
    event.preventDefault()
    this.dispatchEvent(new CustomEvent('close-recom', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
    <div class="newprice-dashboard">
      <div class="box">
      <button class="leftbutton" @click=${(e) => this._closeMenu(e)}>Close</button>
      <h2>Recommend New Price</h2>
      <h1>$${this._getReadValue()}</h1>
      <input type="text" id="newprice" @input="${this._handleInput}"><br><br>
      <button @click=${() => window.alert("Coming soon!")}>Submit</button>
      </div>
      </div>
    `;
  }
}
customElements.define('new-price', NewPrice);
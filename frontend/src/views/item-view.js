import { LitElement, html, css } from 'https://esm.sh/lit@3';
import "../components/price-history.js"
import "./new-price-view.js"
import { sharedStyles } from '../styles.js';

export class ItemView extends LitElement {
    static properties = {
        selectedServer: { type: Number },
        item: {type: Number},
        itemData: {type: Object},
        user: {type: Object},
        loading: {type: Boolean},
        openPriceRecom: {type: Boolean}
    }

    constructor() {
        super()
        this.user = null
        this.itemData = null
        this.selectedServer = null
        this.loading = true;
        this.openPriceRecom = false;
        this.formatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'})
        this.properPricing = true;
    }

    connectedCallback() {
        super.connectedCallback()
        this._getItemData()

        this.addEventListener('close-recom', (event) => {
            this.openPriceRecom = false;
            this.requestUpdate()
  });
    }

    updated(changedProperties) {
        if ((changedProperties.has('item') || changedProperties.has('selectedServer')) && this.selectedServer != null && this.item != null) {
            this.loading = true
            this._getItemData()
        }
    }

    async _getItemData() {
        if (this.selectedServer == null || this.item == null) {
            return
        }

        const toSendUrl = "/api/item/" + this.selectedServer + "/" + this.item

        try {
        const response = await fetch(toSendUrl, {
            method: "GET",
            credentials: "include"
        })
        if (!response.ok) throw new Error("getItemData: bad response")

        const result = await response.json()
        this.itemData = result.item
    } catch(err) {
        console.error("getItemData error: " + err)
    } finally {
        this.loading = false;
    }
    }

  static styles = [sharedStyles, css`
    .center {
    text-align: center;
    }
    
    .dashboard {
        margin-top: 20px;
        display: grid;
        grid-template-columns: max-content 1fr; 
        align-items: stretch; 
        gap: 24px;              
        margin: 20px auto 0 auto;
        width: min(900px, 90%);
        box-sizing: border-box;
    }

    .box {
    background-color: #222222;
    border: 1px solid #444444;
    border-radius: 8px;
    padding: 20px;
    color: white;
    text-align: center;
    }

    .box img {
    object-fit: contain;
      min-width: 50%;
      min-height: 50%;
    }
    
    .profile-column {
        display: block;
        flex-shrink: 0;
    }
    
    .market-column {
        display: flex;
        flex-direction: column;  /* Stack cards vertically down the screen row by row */
        gap: 20px;               /* Clean distribution margins between stacked content elements */
        flex-grow: 1;
        height: 100%;
    }

    .tagbox {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 5px;
    padding-bottom: 10px;
    }

    .tag {
    background-color: #bc2bc4;
    color: white;
    font-size: 80%;
    text-transform: uppercase;
    padding: 4px 8px;
    border-radius: 2px;
    }
    
    h1 {
    text-align: center;
    }
    
    .priceAdd {
        font-size: 150%;
    }
    
    .price {
        color: #00ffcc;
        font-weight: bold;
        font-size: 200%;
    }


    .priceinfo {
        
    }
    
    table, th, td {
        border: 1px white solid;
        padding: 10px;
        text-align: center;
    }
    
    table {
        border-collapse: collapse;
        margin: 0 auto;
        margin-top: 20px;
        width: 100%;
        color: white;
    }
    
    .nogrow {
        flex-grow: 0;
    }
    
    .grow {
        flex-grow: 1;
        flex-direction: column;
        display: flex;
    }
    
    .table-scroll-container {
  flex-grow: 1;
  overflow-y: auto;
  max-height: 100%;
}
  `]

  _formatPrice(unformatted) {
        return Number(unformatted).toLocaleString()
    }

    _formatDate(unformatted) {
        const date = new Date(unformatted)
        return this.formatter.format(date)
    }
    
    _openPrice() {
        this.openPriceRecom = true
        this.requestUpdate()
    }

    _back() {
        this.dispatchEvent(new CustomEvent('nav-requested', {
        bubbles: true,
        composed: true,
        detail: { path: `/~/server/${this.selectedServer}/item/${Number(this.item) - 1}` }
  }));
    }

    _next() {
        this.dispatchEvent(new CustomEvent('nav-requested', {
        bubbles: true,
        composed: true,
        detail: { path: `/~/server/${this.selectedServer}/item/${Number(this.item) + 1}` }
  }));
    }

    _select() {
        const ask = window.prompt(`Enter Spawner ID 1-65:`)
        if (!ask) return;
        if (isNaN(ask) || Number(ask) > 65 || Number(ask) < 1) return window.alert("Invalid input")
        this.dispatchEvent(new CustomEvent('nav-requested', {
        bubbles: true,
        composed: true,
        detail: { path: `/~/server/${this.selectedServer}/item/${999000 + Number(ask)}` }
  }));
    }

  render() {
    const servers = ["Cherry", "Spirit", "Lotus", "Tulip"]

    if (this.loading) return html`Please wait...`

    if (!this.itemData.recom_timestamp || !this.itemData.username) {
        this.properPricing = false;
    } else {
        this.properPricing = true;
    }

    return html`
    ${this.openPriceRecom ? html`
        <new-price .itemData=${this.itemData} .selectedServer=${this.selectedServer} .selectedItem=${this.item}></new-price>
        ` : ""}
    <div class="dashboard">
<div class="profile-column">
    <div class="box">
    ${this.itemData.tags.includes('spawner') && this.user && (this.user.role == 'staff' || this.user.role == 'admin') ? html`<button @click=${this._back} ?disabled=${this.loading || this.item == 999001}>Previous Spawner (beta)</button><button @click=${this._select}>...</button><button @click=${this._next} ?disabled=${this.loading || this.item == 999065}>Next Spawner (beta)</button>` : ""}
    <h1 class="center">${this.itemData.item_name}</h1>
    <div class="tagbox">
        ${this.itemData.tags ? this.itemData.tags.map(tag => {
            return html`<span class="tag">${tag}</span>`
        }) : ""}
    </div>
    <img
    src=${this.itemData.tags.includes('spawner') ? "https://minecraft.wiki/images/Monster_Spawner_JE4.png" : (this.itemData.tags.includes('currency') ? `/src/images/${this.itemData.img_src}` : `https://www.blossom.atn.gg/static/images/BlossomCraft_Descriptions/${this.itemData.id}.png`)}
    alt=${this.itemData.item_name}
    >
    </div>
</div>
<div class="market-column">
    <div class="box nogrow full">
    <span class="priceAdd">${servers[this.selectedServer]} Valuation: </span><br><span class="price priceAdd">$${this.properPricing ? this._formatPrice(this.itemData.price) : "-"}</span><br>
    <sub class="priceinfo">${this.properPricing ? html`- ${this.itemData.username}<br>${this._formatDate(this.itemData.recom_timestamp)}` : "No price available :("}</sub>
    ${this.user && (this.user.role == "staff" || this.user.role == "admin") && !this.openPriceRecom ? html`<br><br><button @click=${this._openPrice}>Recommend New Price</button>` : ""}
</div>
<div class="box nogrow  ">
    <span class="boxheader priceAdd">Price Graph</span><br>
    Coming soon!
</div>
<div class="price-history box grow">
    <span class="priceAdd">Price History</span><br>
    <div class="table-scroll-container">
    <price-history .selectedServer=${this.selectedServer} .itemID=${this.item} .approvedOnly=true></price-history>
    </div>
</div>
</div>
    </div>
    `;
  }
}
customElements.define('item-view', ItemView);
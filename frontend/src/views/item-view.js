import { LitElement, html, css } from 'https://esm.sh/lit@3';

export class ItemView extends LitElement {
    static properties = {
        selectedServer: { type: Number },
        item: {type: Number},
        itemData: {type: Object},
        user: {type: Object},
        loading: {type: Boolean}
    }

    constructor() {
        super()
        this.user = null
        this.itemData = null
        this.selectedServer = null
        this.loading = true;
    }

    connectedCallback() {
        super.connectedCallback()
        this._getItemData()
    }

    async _getItemData() {
        const toSendUrl = "https://blossom-price.onrender.com/api/item/" + this.selectedServer + "/" + this.item

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

  static styles = css`
    .center {
    text-align: center;
    }
    
    .dashboard {
        margin-top: 10px;
        display: grid;
        grid-template-columns: max-content 1fr; 
        align-items: stretch; 
        gap: 24px;              
        width: 50%;
        box-sizing: border-box;
        justify-self: center;
    }

    .box {
    background-color: #222222;
    border: 1px solid #444444;
    border-radius: 8px;
    padding: 20px;
    color: white;
    text-align: center;
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
  `;

  render() {
    const servers = ["Cherry", "Spirit", "Lotus", "Tulip"]

    if (this.loading) return html`Please wait...`

    const timestamp = this.itemData.recom_timestamp
    const date = new Date(timestamp)
    const formatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'})
    const displayTime = formatter.format(date)

    return html`
    <div class="dashboard">
<div class="profile-column">
    <div class="box">
    <h1 class="center">${this.itemData.item_name}</h1>
    <div class="tagbox">
        ${this.itemData.tags ? this.itemData.tags.map(tag => {
            return html`<span class="tag">${tag}</span>`
        }) : ""}
    </div>
    <img src="https://www.blossom.atn.gg/static/images/BlossomCraft_Descriptions/${this.itemData.id}.png">
    </div>
</div>
<div class="market-column">
    <div class="box nogrow">
    <span class="priceAdd">${servers[this.selectedServer]} Valuation: </span><br><span class="price priceAdd">$${this.itemData.price}</span><br>
    <sub class="priceinfo">- ${this.itemData.username}<br>${displayTime}</sub>
    ${this.user && (this.user.role == "staff" || this.user.role == "admin") ? html`<br><br><button onclick="window.alert('coming soon!')">Recommend New Price</button>` : ""}
</div>
<div class="box nogrow  ">
    <span class="boxheader priceAdd">Price Graph</span><br>
    Coming soon!
</div>
<div class="price-history box grow">
    <span class="priceAdd">Price History</span><br>
    <span>Coming Soon! EXAMPLE TABLE</span>
    <div class="table-scroll-container">
    <table>
        <thead>
            <tr>
            <th scope="col">Timestamp</th>
            <th scope="col">User</th>
            <th scope="col">Reported Price</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>June 6, 2026, 3:00 PM</td>
                <td>pichuhat</td>
                <td>$5,000,000</td>
            </tr>
        </tbody>
    </table>
    </div>
</div>
</div>
    </div>
    `;
  }
}
customElements.define('item-view', ItemView);
import { LitElement, html, css } from 'https://esm.sh/lit@3';

export class ItemView extends LitElement {
    static properties = {
        selectedServer: { type: Number },
        item: {type: Number},
        itemData: {type: Object},
        user: {type: Object}
    }

    constructor() {
        super()
        this.user = null
        this.itemData = null
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
    }
    }

  static styles = css`
    .center {
    text-align: center;
    }

    .box {
    background-color: #2a2a2a;
    border-radius: 5px;
    color: white;
    display: flex;
    justify-content: center;
    padding: 10px;
    }

    .tagbox {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    justify-content: center;
    }

    .tag {
    background-color: #bc2bc4;
    color: white;
    font-size: 80%;
    text-transform: uppercase;
    padding: 4px 8px;
    border-radius: 2px;
    }
  `;

  render() {
    const servers = ["Cherry", "Spirit", "Lotus", "Tulip"]

    return html`
    <div class="box">
    <h2>${this.itemData.item_name}</h2>
    <div class="tagbox">
    ${this.itemData.tags ? this.itemData.tags.map(tag => html`
        <span class="tag">${tag}</span>
        `) : ""}
    </div>
    <img src="https://www.blossom.atn.gg/static/images/BlossomCraft_Descriptions/${this.item}.png">

    </div>
    `;
  }
}
customElements.define('item-view', ItemView);
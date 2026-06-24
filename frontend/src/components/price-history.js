import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';

export class PriceHistory extends LitElement {

    static properties = {
        selectedServer: {type: Number},
        itemID: {type: Number},
        approvedOnly: {type: Boolean},
        history: {type: Object},
        loading: {type: Boolean},
    }

    constructor() {
        super()
        this.selectedServer = null
        this.itemID = null
        this.approvedOnly = true
        this.history = null
        this.loading = true;
        this.formatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'})
    }

    connectedCallback() {
        super.connectedCallback()
        this._getHistory()
    }

    static styles = [sharedStyles, css`
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
    }`]

    async _getHistory() {
        const toFetch = this.approvedOnly ? `/api/itemhistory/${this.selectedServer}/${this.itemID}` : `/api/itemrecom/${this.selectedServer}/${this.itemID}`

        try {
        const response = await fetch(toFetch, {
            method: "GET",
            credentials: "include"
        })
        if (!response.ok) return console.error(`ERROR: Failed fetch`, response)
        
        const result = await response.json()
        this.history = result.history
        } catch(error) {
            throw new Error("ERROR: Failed fetch with issue" + error)
        } finally {
            this.loading = false;
        }
    }

    _formatDate(unformatted) {
        const date = new Date(unformatted)
        console.log(date)
        return this.formatter.format(date)
    }

    _formatPrice(unformatted) {
        return Number(unformatted).toLocaleString()
    }

  render() {
    if (this.loading) return html`Loading history...`

    return html`
    ${this.history && this.history.length > 0 ? html`
    <table>
        <thead>
            <tr>
            <th scope="col">Timestamp</th>
            <th scope="col">User</th>
            <th scope="col">Reported Price</th>
            </tr>
        </thead>
        <tbody>
            ${this.history.map(row => {
                console.log(row)
                return html`<tr><td>${this._formatDate(row.recom_timestamp)}</td><td>${row.username}</td><td>$${this._formatPrice(row.price)}</td></tr>`
            })}
        </tbody>
    </table>
    ` : html`No history to display :(`}
    `
  }
}
customElements.define('price-history', PriceHistory);
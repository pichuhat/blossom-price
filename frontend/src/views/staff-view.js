import { LitElement, html, css } from 'https://esm.sh/lit@3';

export class MyRecoms extends LitElement {
    static properties = {
        loading: {type: Boolean},
        toShow: {type: String},
        data: {type: Object}
    }

    constructor() {
        super()
        this.loading = true;
        this.toShow = "all";
        this.data = null;
        this.formatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'});
    }

    connectedCallback() {
        super.connectedCallback()
        this._getRecoms()
    }

    async _getRecoms() {
        try {
            const response = await fetch("/api/listrecoms", {
            method: "GET",
            credentials: 'include'
            })
            if (!response.ok) return console.log("ERROR", response)

            const result = await response.json()
            this.data = result.history
            this.loading = false;
        } catch(err) {
            window.alert("An error occurred, reload to try again.")
            console.error(err)
        }
    }

  static styles = css`
  .dashboard {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  }

  .box {
    background-color: #222222;
    border: 1px solid #444444;
    border-radius: 8px;
    padding: 20px;
    color: white;
    text-align: center;
    width: 50%;
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
  `;

  _formatDate(unformatted) {
        const date = new Date(unformatted)
        console.log(date)
        return this.formatter.format(date)
    }

    _formatPrice(unformatted) {
        return Number(unformatted).toLocaleString()
    }

    _formatStr(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

    _showAll() {
        this.toShow = 'all'
    }

    _showAccepted() {
        this.toShow = 'accepted'
    }
    
    _showPending() {
        this.toShow = 'pending'
    }
    
    _showDenied() {
        this.toShow = 'denied'
    }

  render() {
    const servers = ['Cherry', 'Spirit', 'Lotus', 'Tulip']

    return html`
    <div class="dashboard">
    <div class="box">
    <h1>My Recommendations</h1>
    Show: <button @click=${this._showAll} ?disabled=${this.loading || this.toShow == 'all'}>All</button><button @click=${this._showAccepted} ?disabled=${this.loading || this.toShow == 'accepted'}>Accepted</button><button @click=${this._showPending} ?disabled=${this.loading || this.toShow == 'pending'}>Pending</button><button @click=${this._showDenied} ?disabled=${this.loading || this.toShow == 'denied'}>Denied</button>
    ${this.loading ? html`<br>Please wait...` : html`
        ${this.data && (this.data.some(row => row.status == this.toShow) || this.toShow == 'all') ? html`
    <table>
        <thead>
            <tr>
            <th scope="col">Timestamp</th>
            <th scope="col">Server</th>
            <th scope="col">Item</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            </tr>
        </thead>
        <tbody>
        ${this.data.map(row => {
        if (this.toShow == 'all' || this.toShow == row.status) {
            return html`
            <tr><td>${this._formatDate(row.recom_timestamp)}</td><td>${servers[row.server]}</td><td>${row.item_name}</td><td>$${this._formatPrice(row.price)}</td><td>${this._formatStr(row.status)}</td></tr>
            `
        }
    })}
        </tbody>
    </table>
        ` : html`<br><br>No recommendations to show :(`}
`}
    </div>
    </div>
    `
  }
}
customElements.define('my-recoms', MyRecoms);
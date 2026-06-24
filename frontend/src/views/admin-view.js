import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';

export class AdminView extends LitElement {
    static properties = {
        loading: {type: Boolean},
        toShow: {type: String},
        data: {type: Object},
        disabledList: {type: Array}
    }

    constructor() {
        super()
        this.loading = true;
        this.toShow = "all";
        this.data = null;
        this.formatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'});
        this.disabledList = []
    }

    connectedCallback() {
        super.connectedCallback()
        this._getRecoms()
    }

    async _getRecoms() {
        try {
            const response = await fetch("/api/adminpanel/recoms", {
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

    async _updateStatus(s_id, type) {
        console.log(s_id, type)
        if (!['accepted', 'denied'].includes(type)) return window.alert("Invalid arguments")
        const data = {
            submission_id: s_id,
            type: type
        }
        this.disabledList.push(s_id)
        this.requestUpdate()
        try {
            const response = await fetch('/api/adminpanel/updatestatus', {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) return window.alert("An error occurred.")

            const oindex = this.data.findIndex(item => item.recommendation_id == s_id)
            if (oindex == -1) return console.log("error?")
            this.data[oindex].status = type
        } catch(error) {
            window.alert("An error occurred. Type: 2")
            console.error(error)
        } finally {
            const index = this.disabledList.indexOf(s_id)
            if (index == -1) return console.log("Error?")
            this.disabledList.splice(index, 1)
            this.requestUpdate()
        }
    }

  static styles = [sharedStyles, css`
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
    min-width: 50%;
    width: max-content;
    max-width: 100%;
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
  `]

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
    <h1>Manage Recommendations</h1>
    Show: <button @click=${this._showAll} ?disabled=${this.loading || this.toShow == 'all'}>All</button><button @click=${this._showAccepted} ?disabled=${this.loading || this.toShow == 'accepted'}>Accepted</button><button @click=${this._showPending} ?disabled=${this.loading || this.toShow == 'pending'}>Pending</button><button @click=${this._showDenied} ?disabled=${this.loading || this.toShow == 'denied'}>Denied</button>
    ${this.loading ? html`<br>Please wait...` : html`
        ${this.data && (this.data.some(row => row.status == this.toShow) || this.toShow == 'all') ? html`
    <table>
        <thead>
            <tr>
            <th scope="col">Timestamp</th>
            <th scope="col">Server</th>
            <th scope="col">Item</th>
            <th scope="col">User</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
        ${this.data.map(row => {
        if (this.toShow == 'all' || this.toShow == row.status) {
            console.log(row.status)
            return html`
            <tr><td>${this._formatDate(row.recom_timestamp)}</td><td>${servers[row.server]}</td><td>${row.item_name}</td><td>${row.username}</td><td>$${this._formatPrice(row.price)}</td><td>${this._formatStr(row.status)}</td><td><button @click=${() => this._updateStatus(row.recommendation_id, 'accepted')} ?disabled=${row.status == 'accepted' || this.disabledList.includes(row.submission_id)}>Approve</button><button @click=${() => this._updateStatus(row.recommendation_id, 'denied')} ?disabled=${row.status == 'denied' || this.disabledList.includes(row.submission_id)}>Deny</button></td></tr>
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
customElements.define('admin-view', AdminView);
import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';

export class StaffView extends LitElement {
    static properties = {
        loading: {type: Boolean},
        data: {type: Object},
        page: {type: Number}
    }

    constructor() {
        super()
        this.loading = true;
        this.toShow = "all";
        this.data = null;
        this.formatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'});
        this.page = 1
        this.maxPages = 1
    }

    connectedCallback() {
        super.connectedCallback()
        this._fetchAll()
    }

    updated(changedProperties) {
        if (changedProperties.has('page') || changedProperties.has('toShow')) {
            this._fetchAll()
        }
    }

    async _fetchAll() {
        this.loading = true;
        await this._getPageCount(this.toShow === 'all' ? '' : this.toShow)
        await this._getRecoms(this.toShow === 'all'? '' : this.toShow)
        this.loading = false;
    }

    async _getPageCount(type) {
        const fetchURL = `/api/myrecoms/pagecount${type ? `?type=${type}` : ''}`
        try {
            const response = await fetch(fetchURL, {
                method: "GET",
                credentials: 'include'
            })
            if (!response.ok) return console.log("ERROR", response)

            const result = await response.json()
            this.maxPages = result.count
        } catch(e) {
            window.alert("An error occurred, reload to try again.")
            console.error(e)
        }
    }

    async _getRecoms(type) {
        console.log(type)
        if (type && !['accepted', 'pending', 'denied'].includes(type)) return window.alert("An error occured. ID: GR_BAD_TYPE")
        const fetchURL = `/api/myrecoms/listrecoms/${this.page}${type ? `?type=${type}` : ``}`
        try {
            const response = await fetch(fetchURL, {
            method: "GET",
            credentials: 'include'
            })
            if (!response.ok) return console.log("ERROR", response)

            const result = await response.json()
            this.data = result.history
        } catch(err) {
            window.alert("An error occurred, reload to try again.")
            console.error(err)
        }
    }

    async _getRecomsWrapper(type) {
        this.loading = true
        await this._getRecoms(type)
        this.loading = false
    }

  static styles = [sharedStyles, css`
  .dashboard {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  }

    table, th, td {
        border: 1px var(--color-text) solid;
        padding: 10px;
        text-align: center;
        transition: border ease 0s;
    }
    
    table {
        border-collapse: collapse;
        margin: 0 auto;
        margin-top: 20px;
        width: 100%;
        color: var(--color-text);
    }
  `]

  _formatDate(unformatted) {
        const date = new Date(unformatted)
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
        this.page = 1
        this._fetchAll()
    }

    _showAccepted() {
        this.toShow = 'accepted'
        this.page = 1
        this._fetchAll()
    }
    
   _showPending() {
        this.toShow = 'pending'
        this.page = 1
        this._fetchAll()
    }
    
    _showDenied() {
        this.toShow = 'denied'
        this.page = 1
        this._fetchAll()
    }

     async _nextPage() {
    this.page++
  }

  async _previousPage() {
    this.page--
  }

  async _customPage() {
    console.log(this.maxPages)
    const input = window.prompt("Enter page number 1-" + this.maxPages)
    if (input === null) return;
    if (/^\d+$/.test(input.trim()) && input > 0 && input <= this.maxPages) {
    this.page = Number(input)
} else {
  window.alert("Invalid input")
}
  }

  render() {
    const servers = ['Cherry', 'Spirit', 'Lotus', 'Tulip']
    const previousDisabled = this.page == 1 ? true : false
    const nextDisabled = this.page == this.maxPages ? true : false

    return html`
    <div class="dashboard">
    <div class="fullcard">
    <h1>My Recommendations</h1>
    Show: <wa-button-group orientation="horizontal"><wa-button @click=${this._showAll} ?disabled=${this.loading || this.toShow == 'all'} variant="brand" size="xs">All</wa-button><wa-button @click=${this._showAccepted} ?disabled=${this.loading || this.toShow == 'accepted'} variant="brand" size="xs">Accepted</wa-button><wa-button @click=${this._showPending} ?disabled=${this.loading || this.toShow == 'pending'} variant="brand" size="xs">Pending</wa-button><wa-button @click=${this._showDenied} ?disabled=${this.loading || this.toShow == 'denied'} variant="brand" size="xs">Denied</wa-button></wa-button-group>
    ${this.maxPages > 0 ? html`<br><span>Page ${this.loading ? html`<wa-spinner></wa-spinner>` : `${this.page}/${this.maxPages}`}</span>
    ${this.maxPages > 1 ? html`<br><wa-button-group size="xxs" orientation="horizontal"><wa-button @click=${this._previousPage} ?disabled=${previousDisabled || this.loading} variant="brand"><<<</wa-button><wa-button @click=${this._customPage} ?disabled=${this.loading} variant="brand">...</wa-button><wa-button @click=${this._nextPage} ?disabled=${nextDisabled || this.loading} variant="brand">>>></wa-button></wa-button-group>` : ""}` : ''}
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
            return html`
            <tr><td>${this._formatDate(row.recom_timestamp)}</td><td>${servers[row.server]}</td><td>${row.item_name}</td><td>$${this._formatPrice(row.price)}${row.is_range ? html` <br>to<br>$${this._formatPrice(row.max_price)}` : ""}</td><td>${this._formatStr(row.status)}</td></tr>
            `
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
customElements.define('my-recoms', StaffView);
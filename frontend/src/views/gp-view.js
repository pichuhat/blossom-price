import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';

export class GroupPriceView extends LitElement {
    static properties = {
        loading: {type: Boolean},
        data: {type: Object},
        disabledList: {type: Array},
        page: {type: Number},
        showAdmin: {type: Boolean},
        user: {type: Object},
        openModal: {type: Boolean},
        viewData: {type: Array}
    }

    constructor() {
        super()
        this.loading = true;
        this.toShow = "all";
        this.data = null;
        this.formatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'});
        this.disabledList = []
        this.page = 1
        this.maxPages = 1
        this.user = {}
        this.showAdmin = false;
        this.openModal = false;
        this.viewData = []
    }

    connectedCallback() {
        super.connectedCallback()
        this._fetchAll()

        window.addEventListener('keydown', this._handleKeydown)
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        window.removeEventListener('keydown', this._handleKeydown)
    }

    updated(changedProperties) {
        if (changedProperties.has('page') || changedProperties.has('toShow')) {
            this._fetchAll()
        }
        if (changedProperties.has('user')) {
            if (this.user?.role === 'admin') {
                this.showAdmin = true;
                this._fetchAll()
            }
        }
    }

    _handleKeydown = (e) => {
        if (e.key == 'Escape' && this.openModal) this.openModal = false;
    }

    async _fetchAll() {
        this.loading = true;
        await this._getPageCount()
        await this._getRecoms()
        this.loading = false;
    }

    async _getPageCount() {
        const fetchURL = `/api/pagecount/groups?do_manage=${this.showAdmin}`
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

    async _getRecoms() {
        const fetchURL = `/api/groups/${this.page}?do_manage=${this.showAdmin}`
        try {
            const response = await fetch(fetchURL, {
            method: "GET",
            credentials: 'include'
            })
            if (!response.ok) return console.log("ERROR", response)

            const result = await response.json()
            this.data = result.result
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

    async _updateStatus(s_id, type) {
        console.log(s_id, type)
        if (!['accepted', 'denied'].includes(type)) return window.alert("Invalid arguments")
        const data = {
            submission_id: s_id,
            type: type
        }
        this.requestUpdate()
        try {
            const response = await fetch('/api/updatestatus/groups', {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) return window.alert("An error occurred.")

            const oindex = this.data.findIndex(item => item.group_id == s_id)
            if (oindex == -1) return console.log("error?")
            this.data[oindex].status = type
        } catch(error) {
            window.alert("An error occurred. Type: 2")
            console.error(error)
        } finally {
            this.requestUpdate()
        }
    }

    async _viewItems(e, id) {
        this.viewData = {}
        this.loading = true;
        this.openModal = true;
        e.preventDefault()
        if (!id || isNaN(Number(id))) return window.alert("an error occurred.")
        
        try {
            const response = await fetch(`/api/viewgroup/${id}`, {
                method: "GET",
                credentials: "include"
            })
            if (!response.ok) return window.alert("An error occurred.")
            
            const result = await response.json()
            this.viewData = result.result
            console.log(this.viewData)
        } catch(e) {
            this.openModal = false
            window.alert("An error occurred.")
            console.error(e)
        } finally {
            this.loading = false;
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
    <div ?hidden=${!this.openModal} class="modal-overlay" @click=${(e) => {this.loading ? true : this.openModal = false}}>
      <div class="modal-content center" @click=${(e) => e.stopPropagation()}>
      <div class="forceLeft noGap"><wa-button pill size="xs" class="leftbutton" @click=${(e) => this.openModal = false} ?disabled=${this.loading} variant="brand"><wa-icon name="times"></wa-icon></wa-button></div>
      ${this.loading ? html`<wa-spinner></wa-spinner>` : html`
        <table>
        <thead>
        <tr>
        <th scope="col">Item</th>
        <th scope="col">Crate</th>
        <th scope="col">Win Chance</th>
        <th scope="col">Rarity</th>
        <tr>
        </thead>
        <tbody>
        ${this.viewData && this.viewData.length > 0 ? this.viewData.map(row => {
            return html`
            <tr><td>${row.item_name}</td><td>${row.crate_name}</td><td>${row.win_chance}%</td><td>${row.rarity_human}</td></tr>
            `
        }) : ""}
        </tbody>
        </table>
        `}
      </div>
    </div>

    <div class="dashboard">
    <div class="fullcard">
    ${this.user?.role === "admin" ? html`<div class="forceLeft noGap"><wa-button variant="brand" pill appearance="filled" @click=${() => {this.showAdmin = !this.showAdmin; this._fetchAll()}} ?disabled=${this.loading}><wa-icon name="right-left"></wa-icon></wa-button></div>` : ""}
    <h1>${this.showAdmin ? `Manage` : `My`} Group Prices</h1>
    ${this.maxPages > 0 ? html`<span>Page ${this.loading ? html`<wa-spinner></wa-spinner>` : `${this.page}/${this.maxPages}`}</span>
    ${this.maxPages > 1 ? html`<br><wa-button-group size="xxs" orientation="horizontal"><wa-button @click=${this._previousPage} ?disabled=${previousDisabled || this.loading} variant="brand"><<<</wa-button><wa-button @click=${this._customPage} ?disabled=${this.loading} variant="brand">...</wa-button><wa-button @click=${this._nextPage} ?disabled=${nextDisabled || this.loading} variant="brand">>>></wa-button></wa-button-group>` : ""}` : ''}
    ${this.loading ? html`<br>Please wait...` : html`
        ${this.data ? html`
    <table>
        <thead>
            <tr>
            <th scope="col">Timestamp</th>
            <th scope="col">Server</th>
            <th scope="col">Items</th>
            ${this.showAdmin ? html`<th scope="col">User</th>` : ""}
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            ${this.showAdmin ? html`<th scope="col">Actions</th>` : ""}
            </tr>
        </thead>
        <tbody>
        ${this.data.map(row => {
            return html`
            <tr><td>${this._formatDate(row.timestamp)}</td><td>${servers[row.server_id]}</td><td><wa-button pill size="xs" variant="brand" @click=${(e) => this._viewItems(e, row.group_id)}>View ${row.item_id.length} Items</wa-button></td>${this.showAdmin ? html`<td>${row.username}</td>` : ""}<td>$${this._formatPrice(row.price)}${row.is_range ? html` <br>to<br>$${this._formatPrice(row.max_price)}` : ""}</td><td>${this._formatStr(row.status)}</td>${this.showAdmin ? html`<td><wa-button-group orientation="horizontal"><wa-button @click=${() => this._updateStatus(row.group_id, 'accepted')} ?disabled=${row.status == 'accepted' || this.disabledList.includes(row.group_id)} size="xs" variant="brand">Approve</wa-button><wa-button @click=${() => this._updateStatus(row.group_id, 'denied')} ?disabled=${row.status == 'denied' || this.disabledList.includes(row.group_id)} size="xs" variant="brand">Deny</wa-button></wa-button-group></td>` : ""}</tr>
            `
    })}
        </tbody>
    </table>
        ` : html`<br><br>No groups to show :(`}
`}
    </div>
    </div>
    `
  }
}
customElements.define('manage-gp', GroupPriceView);
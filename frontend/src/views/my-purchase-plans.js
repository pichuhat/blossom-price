import { LitElement, html, css, nothing } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';

export class MyPurchasePlans extends LitElement {
    static properties = {
        loading: {type: Boolean, state: true},
        plans: {type: Array, state: true},
        errorOccurred: {type: Boolean, state: true},
        presets: {type: Array, state: true},
        openSelect: {type: Boolean, state: true}
    }

    constructor() {
        super()
        this.loading = true;
        this.openSelect = false;
        this.plans = []
        this.presets = []
        this.errorOccurred = false;
        this.formatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'})
        this.servers = ['cherry', 'spirit', 'lotus', 'tulip']
    }

    connectedCallback() {
        super.connectedCallback()
        this._getAll()
    }

    async _getAll() {
        this.errorOccurred = false
        this.loading = true
        await this._getMyPlans()
        await this._getPresets()
        this.loading = false;
    }

    async _planHandler() {
        this.errorOccurred = false;
        this.loading = true
        await this._getMyPlans()
        this.loading = false
    }

    async _presetHandler() {
        this.errorOccurred = false;
        this.loading = true
        await this._getPresets()
        this.loading = false
    }

    async _getMyPlans() {
        this.plans = []
        const url = `/api/purchaseplan/my-plans`

        try {
            const response = await fetch(url, {
                method: "GET",
                credentials: 'include'
            })

            if (!response.ok) {console.log(response); return this.errorOccurred = true;}

            const result = await response.json()

            this.plans = result.result
        } catch(e) {
            console.error(e)
            this.errorOccurred = true;
        }
    }

    async _getPresets() {
        this.presets = []
        const url = `/api/purchaseplan/presets`

        try {
           const response = await fetch(url, {
                method: "GET",
                credentials: 'include'
            })

            if (!response.ok) {console.log(response); return this.errorOccurred = true;}

            const result = await response.json()

            this.presets = result.result
        } catch(e) {
            console.error(e)
            this.errorOccurred = true;
        }
    }

    static styles = [sharedStyles, css``]

    _navigateTo(path, event) {
    if (event) event.preventDefault();
    this.dispatchEvent(new CustomEvent('nav-requested', {
      detail: { path },
      bubbles: true,
      composed: true
    }));
  }

  _formatStr(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

 _formatPrice(unformatted) {
        if (!unformatted || isNaN(unformatted) || unformatted === null) return "-"
        return Number(unformatted).toLocaleString()
    }

     _formatDate(unformatted) {
        const date = new Date(unformatted)
        return this.formatter.format(date)
    }

async _createFromPreset(id) {
    const server = Number(this.shadowRoot.querySelector('#modal-server').value)
    const is_public = this.shadowRoot.querySelector('#modal-make-public').checked
    if (!id || ![0,1,2,3].includes(server) || typeof is_public !== 'boolean') return

    try {
    this.loading = true;
    const data = this.presets.find(preset => preset.id === id)
    if (!data) return window.alert("An error occurred.")
    const finalData = {items: data.items, server: server, is_public: is_public, name: data.name}

    const response = await fetch('/api/purchaseplan/new', {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(finalData)
    })

    if (!response.ok) {window.alert("An error occurred.")}

    const result = await response.json()

    this._navigateTo(`/~/purchaseplan/view/${result.redirect_id}`)
    } catch(e) {
        window.alert("An error occurred.")
        console.error(e)
    } finally {
        this.loading = false
    }
}

_handleModal(preset_id, e) {
    console.log("ran")
    if (e) e.stopPropagation()
    this.selectedPreset = preset_id
    this.openSelect = true;
}

    render() {
        return html`
        <div ?hidden=${!this.openSelect} class="modal-overlay" @click=${() => this.openSelect = false}>
      <div class="modal-content center" @click=${(e) => e.stopPropagation()}>
      <wa-button class="forceTopLeft" variant="brand" @click=${() => this.openSelect = false} size="s" pill><wa-icon name="x"></wa-icon></wa-button>
      <h3>Copying Preset</h3>
      <wa-switch id="modal-make-public" ?disabled=${this.loading}>Make This Plan Public</wa-switch><br>
      <div style="min-width: 50%" class="self-center"><wa-select label="Server" hint="This plan will use prices on this server." id="modal-server" ?disabled=${this.loading}>
        <wa-option value="0">Cherry</wa-option>
        <wa-option value="1">Spirit</wa-option>
        <wa-option value="2">Lotus</wa-option>
        <wa-option value="3">Tulip</wa-option>
        </wa-select></div><br>
        <wa-button @click=${() => this._createFromPreset(this.selectedPreset)} ?disabled=${this.loading} variant="brand">Copy Preset</wa-button>
      </div>
    </div>

        <h1 class="center">Purchase Plans - Home</h1>
        <div class="dashboard">
        <div class="fullcard" style="position: relative;">
        ${this.loading ? nothing : html`<wa-button class="forceTopLeft" variant="brand" @click=${this._planHandler}><wa-icon name="rotate"></wa-icon></wa-button><wa-button class="forceTopRight" variant="brand" @click=${(e) => this._navigateTo('/~/purchaseplan/new', e)}><wa-icon name="plus"></wa-icon></wa-button>`}
        <h1>${this.loading ? "Please Wait..." : this.errorOccurred ? "Uh Oh!" : "My Purchase Plans"}</h1>
        ${this.loading ? html`<div class="big-spinner center self-center"><wa-spinner></wa-spinner></div>` : this.errorOccurred ? html`<p>An error occurred while loading your purchase plans.</p>`
            : this.plans.length < 1 ? html`
            <div class="bigIcon"><wa-icon name="clipboard-question"></wa-icon></div>
            <p>You don't have any purchase plans yet.</p>
            ` : html`
            <table>
            <thead>
            <th scope="col">Plan Name</th>
            <th scope="col"># Items Remaining / Total</th>
            <th scope="col">Visibility</th>
            <th scope="col">Server</th>
            <th scope="col">Last Updated</th>
            <th scope="col">Open</th>
            </thead>
            <tbody>
            ${this.plans.map(plan => {
                let totalItems = 0
                let remainingItems = 0
                plan.items.forEach(item => {
                    totalItems = totalItems + item.count
                    remainingItems = remainingItems + item.count - item.obtained
                })

                return html`
                <tr class="clickTable" @click=${(e) => this._navigateTo(`/~/purchaseplan/view/${plan.id}`, e)}>
                <td><span class="fake-h3">${plan.name}</span></td>
                <td>${remainingItems} of ${totalItems}</td>
                <td>${plan.is_public ? "Public" : "Private"}</td>
                <td>${this._formatStr(this.servers[plan.server_id])}</td>
                <td>${this._formatDate(plan.updated_at)}</td>
                <td><wa-button size="s" variant="brand"><wa-icon name="arrow-up-right-from-square"></wa-icon></wa-button></td>
                </tr>
                `
            })}
            </tbody>
            </table>
            `}
        </div>
        </div>
        <div class="dashboard">
        <div class="fullcard" style="position: relative;">
        <wa-button class="forceTopLeft" variant="brand" @click=${this._presetHandler}><wa-icon name="rotate"></wa-icon></wa-button>
        <h1>Presets</h1>
        ${this.errorOccurred ? html`<p>An error occurred, and presets couldn't be loaded.</p>` : this.loading ? html`Please wait...` : this.presets.length < 1 ? html`<div class="bigIcon"><wa-icon name="clipboard-question"></wa-icon></div><p>Couldn't find any presets.</p>` : html`
            <table>
            <thead>
            <th scope="col">Preset Name</th>
            <th scope="col"># Items</th>
            <th scope="col">Creator</th>
            <th scope="col">Last Updated</th>
            <th scope="col">Copy</th>
            </thead>
            <tbody>
            ${this.presets.map(preset => {
                let totalItems = 0
                preset.items.forEach(item => {
                    totalItems = totalItems + item.count
                })

                return html`
                <tr class="clickTable" @click=${(e) => this._navigateTo(`/~/purchaseplan/view/${preset.id}`, e)}>
                <td><span class="fake-h3">${preset.name}</span></td>
                <td>${totalItems}</td>
                <td>${preset.username}</td>
                <td>${this._formatDate(preset.updated_at)}</td>
                <td @click=${(e) => this._handleModal(preset.id, e)}><wa-button variant="brand"><wa-icon name="copy"></wa-icon></wa-button></td>
                </tr>
                `
            })}
            </tbody>
            </table>
        </div>
        `}
        </div>
        `
    }
}

customElements.define('my-purchase-plans', MyPurchasePlans)
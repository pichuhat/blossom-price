import { LitElement, html, css, nothing } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';

export class ViewPurchasePlan extends LitElement {
    static properties = {
        loading: {type: Boolean, state: true},
        plan_id: {type: Number},
        itemData: {type: Array, state: true},
        planData: {type: Object, state: true},
        editMode: {type: Boolean, state: true},
        notPublic: {type: Boolean, state: true},
        notFound: {type: Boolean, state: true},
        visible: {type: Boolean, state: true},
        user: {type: Object},
        openSelect: {type: Boolean, state: true}
    }

    constructor() {
        super()
        this.loading = true;
        this.plan_id = null;
        this.itemData = []
        this.planData = {}
        this.editMode = false
        this.servers = ['cherry', 'spirit', 'lotus', 'tulip']
        this.formatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'})
        this.user = {}
        this.savePlanData = {}
        this.saveItemData = []
        this.selectedServer = undefined
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

    connectedCallback() {
        super.connectedCallback()
        this._fetchPlanData()
    }

    static styles = [sharedStyles, css`

        `]

    async _fetchPlanData() {
        if (!this.plan_id) return;
        this.loading = true;
        this.notPublic = false;
        this.notFound = false;
        this.visible = false;
        const fetchURL = `/api/purchaseplan/view/${this.plan_id}`

        try {
            const response = await fetch(fetchURL, {
                method: "GET",
                credentials: 'include'
            })

            if (!response.ok) {
                if (response.status === 404) return this.notFound = true;
                if (response.status === 403) return this.notPublic = true;
                return window.alert("An error occurred.")
            }

            const result = await response.json()

            this.itemData = result.items
            this.planData = result.plan
            this.visible = true;
        } catch(e) {
            console.error(e)
            window.alert("An error occurred.")
        } finally {
            this.loading = false;
        }
    }

_getTotalPrice() {
  let min = 0
  let max = 0
  this.itemData.forEach(item => {
    const otherItemData = this.planData.items.find(other => other.id === item.id)
      min = min + (Number(item.price) * otherItemData.count)
    if (item.is_range) {
      max = max + (Number(item.max_price) * otherItemData.count)
    } else {
      max = max + (Number(item.price) * otherItemData.count)
    }
  })
  return [min, max]
}

_getRemainingPrice() {
    const e = this._getTotalPrice()
    let min = e[0]
    let max = e[1]
    this.itemData.forEach(item => {
        const otherItemData = this.planData.items.find(other => other.id === item.id)
        min = min - (Number(item.price) * otherItemData.obtained)
        if (item.is_range) {
            max = max - (Number(item.max_price) * otherItemData.obtained)
        } else {
            max = max - (Number(item.price) * otherItemData.obtained)
        }
    })
    return [min, max]
}

async _updatePrices() {
  const ids = this.itemData.map(item => item.id)

  try {
    const response = await fetch(`/api/itemset?server=${this.planData.server_id}${ids.map(id => `&item=${id}`).join('')}`, {
      method: "GET",
      credentials: "include"
    })

    if (!response.ok) return window.alert("Couldn't update selected item prices for this server.")

    const result = await response.json()

    this.itemData.forEach(item => {
      const data = result.result.find(row => row.id === item.id)
      item.price = data.price
      item.recom_timestamp = data.recom_timestamp
      item.recommendation_id = data.recommendation_id
      item.author_id = data.author_id
      item.server = data.server
      item.is_range = data.is_range
      item.max_price = data.max_price || null
      item.username = data.username || null
    })

  } catch(e) {
    console.error(e)
    window.alert("Couldn't update item prices for this server.")
  }
}

_enterEditMode() {
    this.savePlanData = structuredClone(this.planData)
    this.saveItemData = structuredClone(this.itemData)
    this.editMode = true;
}

_exitEditMode() {
    this.planData = structuredClone(this.savePlanData)
    this.itemData = structuredClone(this.saveItemData)
    this.savePlanData = {}
    this.saveItemData = {}
    this.editMode = false;
}

_goalUp(id) {
  const index = this.planData.items.findIndex(item => item.id == id)
  if (isNaN(this.planData.items[index].count) || this.planData.items[index].count >= 10) return
  this.planData.items[index].count++
  this.requestUpdate()
}

_goalDown(id) {
  const index = this.planData.items.findIndex(item => item.id == id)
  if (isNaN(this.planData.items[index].count) || this.planData.items[index].count <= 1 || this.planData.items[index].count <= this.planData.items[index].obtained) return
  this.planData.items[index].count--
  this.requestUpdate()
}

_obtainedUp(id) {
    const index = this.planData.items.findIndex(item => item.id == id)
  if (isNaN(this.planData.items[index].obtained) || this.planData.items[index].obtained >= this.planData.items[index].count) return
  this.planData.items[index].obtained++
  this.requestUpdate()
}

_obtainedDown(id) {
    const index = this.planData.items.findIndex(item => item.id == id)
  if (isNaN(this.planData.items[index].obtained) || this.planData.items[index].obtained <= 0) return
  this.planData.items[index].obtained--
  this.requestUpdate()
}

_togglePublic(e) {
    if (e) e.preventDefault()
    this.planData.is_public = !this.planData.is_public
    this.requestUpdate()
}

_openModal() {
    this.openSelect = true
}

_closeModal() {
    this.openSelect = false;
}

async _setPlanServer(id) {
    if (![0,1,2,3].includes(id) || !this.editMode) return
    this.planData.server_id = id
    this.openSelect = false;
    this.loading = true;
    this.visible = false;
    await this._updatePrices()
    this.loading = false;
    this.visible = true;
}

async _uploadEdits() {
    if (!this.editMode) return
    if (this.planData === this.savePlanData) return
    this.loading = true;
    const input = JSON.stringify({items: this.planData.items, server: Number(this.planData.server_id), is_public: this.planData.is_public})
    try {
        const response = await fetch(`/api/purchaseplan/edit/${this.planData.id}`, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: input
        })

        if (!response.ok) {console.log(response); return window.alert("An error occurred. type: a")}

        this.editMode = false;
        this.saveItemData = []
        this.savePlanData = {}
    } catch(e) {
        console.error(e)
        window.alert("An error occurred.")
    } finally {
        this.loading = false;
    }
}

    render() {
        const data = this._getTotalPrice()
        const minPrice = data[0]
        const maxPrice = data[1]
        const displayPrice = (minPrice+maxPrice)/2

        const data2 = this._getRemainingPrice()
        const minPriceRem = data2[0]
        const maxPriceRem = data2[1]
        const displayPriceRem = (minPriceRem+maxPriceRem)/2

        return html`
        <div ?hidden=${!this.openSelect || this.loading || !this.editMode} class="modal-overlay" @click=${this._closeModal}>
      <div class="modal-content center" @click=${(e) => e.stopPropagation()}>
      <wa-button class="forceTopLeft" @click=${this._closeModal} size="s" pill><wa-icon name="x"></wa-icon></wa-button>
      <h3>Select Plan Server</h3>
      <wa-button-group><wa-button size="s" @click=${() => this._setPlanServer(0)}>Cherry</wa-button><wa-button size="s" @click=${() => this._setPlanServer(1)}>Spirit</wa-button><wa-button size="s" @click=${() => this._setPlanServer(2)}>Lotus</wa-button><wa-button size="s" @click=${() => this._setPlanServer(3)}>Tulip</wa-button></wa-button-group>
      </div>
    </div>

        <div class="center"><h1>${this.editMode ? "Editing" : "Viewing"} Purchase Plan</h1></div>
        <div class="dashboard">
        <div class="fullcard" style="position: relative;">

        ${this.editMode && this.visible && this.planData.user_id === this.user.id ? html`<wa-button class="forceTopLeft" variant="danger" @click=${this._exitEditMode}><wa-icon name="x"></wa-icon></wa-button><wa-button class="forceTopRight" variant="brand" @click=${this._uploadEdits}><wa-icon name="check"></wa-icon></wa-button>`
            : this.visible && this.planData.user_id === this.user?.id ? html`<wa-button class="forceTopLeft" variant="brand" @click=${this._fetchPlanData}><wa-icon name="rotate"></wa-icon></wa-button><wa-button class="forceTopRight" variant="brand" @click=${this._enterEditMode}><wa-icon name="pen-to-square"></wa-icon></wa-button>`
            : this.visible && !this.editMode ? html`<wa-button class="forceTopLeft" variant="brand" @click=${this._fetchPlanData}><wa-icon name="rotate"></wa-icon></wa-button>`
        : nothing}

        <span class="bigText">${this.loading ? 'Please wait...' : this.notFound ? 'Plan Not Found' : this.notPublic ? 'No Access' : this.visible ? `${this.planData?.name}${this.planData?.is_preset ? ' (PRESET)' : ''}` : 'Uh Oh!'}</span>

        ${this.visible ? html`<br><sub>by ${this.planData.username}<br>Created: ${this._formatDate(this.planData.created_at)}<br>Updated: ${this._formatDate(this.planData.updated_at)}</sub>` : ``}
        ${this.loading ? html`<div class="center forceGap big-spinner"><wa-spinner></wa-spinner></div>`
        : this.visible ? `` : html`<div class="bigIcon"><wa-icon name=${this.notFound ? `file-circle-question` : this.notPublic ? `user-lock` : `circle-question`}></wa-icon></div>`}
        ${this.visible || this.loading ? nothing : html`<p>${this.notFound ? `Couldn't find the plan you were looking for. Sorry!` : this.notPublic ? `This purchase plan isn't public. Log in as its creator or ask the creator to make it public.` : `You've reached a weird place. Reload to try again.`}</p>`}
        
        ${this.visible && this.editMode ? html`<p>You are in <strong>Editing Mode.</strong></p>` : nothing}
        
        ${this.visible ? html`
            ${this.editMode ? html`<p style="font-size: 105%;">This purchase plan is <a href="#" @click=${this._togglePublic} style="color: var(--color-text);"><strong>${this.planData?.is_public ? `Public` : `Private`} (<wa-icon style="font-size: 80%;" name="right-left"></wa-icon>)</strong></a> and uses <a href="#" @click=${() => this.openSelect = true} style="color: var(--color-text);"><strong>${this._formatStr(this.servers[this.planData.server_id])}</strong> (<wa-icon style="font-size: 80%" name="right-left"></wa-icon>)</a> prices.</p>`
                : html`<p style="font-size: 105%;">This purchase plan is <strong>${this.planData?.is_public ? `Public` : `Private`}</strong> and uses <strong>${this._formatStr(this.servers[this.planData.server_id])}</strong> prices.</p>`}
            <span style="font-size: 125%"><strong>Total Remaining Cost:</strong></span> <span class="price">$${this._formatPrice(displayPriceRem)} of $${this._formatPrice(displayPrice)}</span>
            ${minPrice === maxPrice && minPriceRem === maxPriceRem ? `` : html`<br><sub>Actual: ${minPriceRem === maxPriceRem ? this._formatPrice(displayPriceRem) : html`$${this._formatPrice(minPriceRem)} to $${this._formatPrice(maxPriceRem)}`} of ${minPrice === maxPrice ? this._formatPrice(displayPrice) : html`$${this._formatPrice(minPrice)} to $${this._formatPrice(maxPrice)}`}</sub>`}
            <table>
            <thead>
            <th scope="col">Item</th>
            <th scope="col">Price per Item (${this._formatStr(this.servers[this.planData.server_id])})</th>
            ${this.editMode ? html`<th scope="col"># Obtained</th><th scope="col"># Goal</th>` : html`<th scope="col"># Obtained / Goal</th>`}
            <th scope="col">Total Price</th>
            <th scope="col">Remaining Price</th>
            </thead>
            <tbody>
            ${this.itemData.map(item => {
                const otherItemData = this.planData.items.find(other => other.id === item.id)

                const itemDisplayPrice = item.is_range ? (Number(item.price) + Number(item.max_price))/2 * otherItemData.count : Number(item.price) * otherItemData.count
                const itemMinPrice = item.is_range ? Number(item.price) * (otherItemData.count) : itemDisplayPrice
                const itemMaxPrice = item.is_range ? Number(item.max_price) * (otherItemData.count) : itemDisplayPrice
                
                const itemDisplayPriceRem = item.is_range ? itemDisplayPrice - ((Number(item.price) + Number(item.max_price))/2 * otherItemData.obtained) : itemDisplayPrice - (Number(item.price) * otherItemData.obtained)
                const itemMinPriceRem = item.is_range ? itemMinPrice - (Number(item.price) * otherItemData.obtained) : itemDisplayPriceRem
                const itemMaxPriceRem = item.is_range ? itemMaxPrice - (Number(item.max_price) * otherItemData.obtained) : itemDisplayPriceRem

                return html`
                <tr>
                <td><span class="fake-h3">${item.item_name}</span></td>
                <td><span class="priceAdd">$${this._formatPrice(item.price)}${item.is_range ? ` to $${this._formatPrice(item.max_price)}` : ''}</span></td>
                ${this.editMode ? html`<td><wa-button-group><wa-button variant="brand" square size="s" @click=${() => this._obtainedDown(item.id)} ?disabled=${otherItemData.obtained <= 0}>−</wa-button><wa-button size="s" style="pointer-events: none; opacity: 1; tabindex: -1;" variant="brand">${otherItemData.obtained}</wa-button><wa-button size="s" variant="brand" square ?disabled=${otherItemData.obtained >= otherItemData.count} @click=${(e) => this._obtainedUp(item.id)}>+</wa-button></wa-button-group></td>
                    <td><wa-button-group><wa-button variant="brand" square size="s" @click=${() => this._goalDown(item.id)} ?disabled=${otherItemData.count <= 1 || otherItemData.count <= otherItemData.obtained}>−</wa-button><wa-button size="s" style="pointer-events: none; opacity: 1; tabindex: -1;" variant="brand">${otherItemData.count}</wa-button><wa-button size="s" variant="brand" square ?disabled=${otherItemData.count >= 10} @click=${(e) => this._goalUp(item.id)}>+</wa-button></wa-button-group></td>`
                    : html`<td><span class="fake-h3" style="font-size: 105%;">${otherItemData.obtained} of ${otherItemData.count}</span></td>`}
                <td><span class="price">$${this._formatPrice(itemDisplayPrice)}</span>${item.is_range ? html`<br><sub>Actual: $${this._formatPrice(itemMinPrice)} to $${this._formatPrice(itemMaxPrice)}</sub>` : ''}</td>
                <td><span class="price">$${this._formatPrice(itemDisplayPriceRem)}</span>${item.is_range ? html`<br><sub>Actual: $${this._formatPrice(itemMinPriceRem)} to $${this._formatPrice(itemMaxPriceRem)}</sub>` : ''}</td>
                </tr>
                `
            })}
            </tbody>
            </table>
        ` : ``}
        </div>
        </div>
        `
    }
}

customElements.define('view-purchase-plan', ViewPurchasePlan)


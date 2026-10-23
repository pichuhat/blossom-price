import { LitElement, html, css, nothing } from 'lit';
import { sharedStyles } from '../styles.js';
import { createToast } from '../toast.js';

export class AdvancedSearchParams extends LitElement {
    static styles = [sharedStyles, css`
      .minMaxGroup {
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
    }

    .minMaxGroup > * {
    flex: 1;
    }

    wa-details::part(details) {
    border: 1px #bc2bc4 solid;
    }
    `]

    static properties = {
        loading: {type: Boolean},
        query: {type: String, state: true},
        selectedCrate: {type: Number, state: true},
        selectedTags: {type: Array, state: true},
        minPrice: {type: String, state: true},
        maxPrice: {type: String, state: true},
        pricedOnly: {type: Boolean, state: true},
        truncated: {type: Boolean},
        crates: {type: Array, state: true},
        tags: {type: Array, state: true},
        additionalsOpen: {type: Boolean, state: true}
    }

    constructor() {
        super()
        this.loading = false;
        this.query = ''
        this.selectedCrate = null
        this.selectedTags = []
        this.minPrice = 0
        this.maxPrice = 0
        this.pricedOnly = false
        this.truncated = false
        this.crates = []
        this.tags = []

        const params = new URLSearchParams(window.location.search)
        this._buildInternalState(params)
        this._hasInitialParams = ['query', 'crate', 'tags', 'minPrice', 'maxPrice', 'pricedOnly'].some(key => params.has(key))
        this._hasInitialExtraParams = ['minPrice', 'maxPrice', 'pricedOnly'].some(key => params.has(key))

        this.additionalsOpen = this._hasInitialExtraParams
    }

    connectedCallback() {
      super.connectedCallback()
      this._init()
    }

    async _init() {
      this.loading = true;
      
      const [tags, crates] = await Promise.all([
        this._fetchTags(),
        this._fetchCrates()
      ])
      this.tags = tags
      this.crates = crates

      if (this._hasInitialParams) {
        this.dispatchEvent(new CustomEvent('trigger-advanced-search', {bubbles: true, composed: true, detail: {params: this._buildSearchParams()}}))
      } else {
        this.loading = false;
      }
    }

    async _fetchTags() {
    const fetchURL = `/api/taglist`
    try {
      const response = await fetch(fetchURL, {
        method: "GET",
        credentials: 'include'
      })
      if (!response.ok) throw new Error(response)
      const result = await response.json()
      return result
    } catch(e) {
      createToast("Something went wrong while fetching tags.", {variant: "warning", icon: "circle-exclamation"})
    }
  }

  async _fetchCrates() {
    const fetchURL = `/api/cratelist`
    try {
      const response = await fetch(fetchURL, {
        method: "GET",
        credentials: 'include'
      })
      if (!response.ok) throw new Error(response)
      const result = await response.json()
      return result.result
    } catch(e) {
      createToast("Something went wrong while fetching crates.", {variant: "warning", icon: "circle-exclamation"})
    }
  }

  _formatPrice(unformatted) {
        if (isNaN(Number(unformatted))) return false
        return Number(unformatted).toLocaleString()
    }

     _formatDate(unformatted) {
        const date = new Date(unformatted)
        return this.formatter.format(date)
    }

  _getReadValue(price) {
  if (price === 0) return 0
  if (!price) return false
  if (!isNaN(price)) return Math.max(0, Number(price))
  const suffix = price.at(-1).toLowerCase()
  const base = Number(price.slice(0, -1))
  if (isNaN(base) || !['k','m'].includes(suffix)) return false
  return base * (suffix === 'k' ? 1000 : 1000000)
  }

    _search() {
      const params = this._buildSearchParams()
      history.pushState(null, '', `?${params}`)
      this.dispatchEvent(new CustomEvent('trigger-advanced-search', {bubbles: true, composed: true, detail: {params}}))
    }

    _buildSearchParams() {
    const params = new URLSearchParams()
    if (this.query) params.set('query', this.query)
    if (this.selectedCrate) params.set('crate', this.selectedCrate)
    this.selectedTags.forEach(tag => params.append('tags', tag))
    if (this.pricedOnly) params.set('pricedOnly', 'true')
    const min = this._getReadValue(this.minPrice)
    const max = this._getReadValue(this.maxPrice)
    if (min && min !== '-') params.set('minPrice', min)
    if (max && max !== '-') params.set('maxPrice', max)

    return params
  }

  _buildInternalState(params) {
    if (params.get('query')) this.query = params.get('query')
    if (params.get('crate')) this.selectedCrate = params.get('crate')
    if (params.get('tags')) this.tags = params.getAll('tags').map(tag => tag.replaceAll(' ', '_'))
    if (params.get('pricedOnly') === 'true') this.pricedOnly = true
    if (params.get('minPrice')) this.minPrice = params.get('minPrice')
    if (params.get('maxPrice')) this.maxPrice = params.get('maxPrice')
  }

  render() {
    console.log(this.minPrice, this.maxPrice)
    return html`
    <div class="ASparams">
    ${this.truncated && !this.loading ? html`<wa-callout variant="warning"><wa-icon slot="icon" name="triangle-exclamation"></wa-icon><strong>Search Results Limited</strong><br>This search was limited to 150 items. Don't worry, this is a temporary fix!</wa-callout><br>` : ''}
    <wa-input label="Search Term" id="search" placeholder="Search..." autocomplete="off" ?disabled=${this.loading} value=${this.query} @input=${(e) => this.query = e.target.value}></wa-input>
    <br><wa-select label="Crate" id="crate" value=${this.selectedCrate || ""} ?disabled=${this.loading} @change=${(e) => this.selectedCrate = e.target.value}>
      <wa-option value="" ?selected=${!this.selectedCrate}>All</wa-option>
      ${this.crates.map(crate => html`<wa-option value=${crate.id} ?selected=${this.selectedCrate == crate.id}>${crate.CrateName}</wa-option>`)}
      </wa-select>
      <br><wa-select label="Tags" id="tags" value=${this.selectedTags.join(' ')} placeholder="Select tags..." multiple with-clear ?disabled=${this.loading} @change=${(e) => this.selectedTags = e.target.value ? e.target.value.map(tag => tag.replaceAll("_", " ")) : []}>
      ${this.tags.map(tag => html`<wa-option value=${tag.replaceAll(" ", "_")} ?selected=${this.selectedTags.includes(tag)}>${tag}</wa-option>`)}
      </wa-select>

      <br><wa-details summary="Additional Options" @wa-show=${() => this.additionalsOpen = true} @wa-hide=${() => this.additionalsOpen = false} .open=${this.additionalsOpen}>
      <div class="minMaxGroup">
      <wa-input label="Min Price" hint=${this._getReadValue(this.minPrice) ? `Parsed Value: $${this._formatPrice(this._getReadValue(this.minPrice))}` : `No Minimum Price Set`} @input=${(e) => this.minPrice = e.target.value} value=${this.minPrice || ""} ?disabled=${this.loading} id="min-price"></wa-input>
      <wa-input label="Max Price" hint=${this._getReadValue(this.maxPrice) ? `Parsed Value: $${this._formatPrice(this._getReadValue(this.maxPrice))}` : `No Maximum Price Set`} @input=${(e) => this.maxPrice = e.target.value} value=${this.maxPrice || ""} ?disabled=${this.loading} id="max-price"></wa-input></div>
      <br><wa-switch @change=${(e) => this.pricedOnly = e.target.checked} .checked=${!!(this.pricedOnly || this._getReadValue(this.minPrice) || this._getReadValue(this.maxPrice))} ?disabled=${this.loading || this._getReadValue(this.minPrice) || this._getReadValue(this.maxPrice)} id="priced-only">Show Priced Items Only</wa-switch><br>
      <sub>${this._getReadValue(this.minPrice) || this._getReadValue(this.maxPrice) ? `You set a min or max price, so this must be enabled.` : `Setting a min or max price forces this to be enabled.`}</sub>
      </wa-details>
      <br><wa-button @click=${this._search} variant="brand" ?disabled=${this.loading} ?loading=${this.loading}>Search</wa-button>
      </div>
      </div>`
  }
}

customElements.define('advanced-search-params', AdvancedSearchParams)
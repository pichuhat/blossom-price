import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { unsafeHTML } from 'https://esm.sh/lit@3/directives/unsafe-html.js';
import { sharedStyles } from '../styles.js';

class UpdatePosts extends LitElement {
    static properties = {
        post: {type: String}
    }

    constructor() {
        super()
        this.post = null;
        this.loading = true;
        this.defaultError = html`<div class="center"><h1>Uh oh!</h1>There was an error fetching that update. It may not exist.</div>`
        this.content = this.defaultError
    }

    connectedCallback() {
        super.connectedCallback()
        this._fetchContent()
    }

    _routeToPage(url, e) {
    e.preventDefault()
    this.dispatchEvent(new CustomEvent('nav-requested', {
    bubbles: true,
    composed: true,
    detail: { path: `/~${url}` }
  }));
  }

static styles = [sharedStyles, css`
  `]

  _formatPrice(unformatted) {
        return Number(unformatted).toLocaleString()
    }

     _formatDate(unformatted) {
        const date = new Date(unformatted)
        return this.formatter.format(date)
    }

    _search() {
        const inputEl = this.shadowRoot.querySelector('#search').value
        const selectedCrate = this.shadowRoot.querySelector('#crate').value
        let selectedTags = this.shadowRoot.querySelector('#tags').value ? this.shadowRoot.querySelector('#tags').value.map(tag => tag.replaceAll("_", " ")) : []
        console.log(selectedTags)
        if (selectedTags) {
        const e = selectedTags.map(tag => `&tags=${tag}`)
        selectedTags = e.join("")
        console.log(e, selectedTags)
        }
        const path = `/~/advancedsearch?query=${inputEl}${selectedCrate ? `&crate=${selectedCrate}` : ""}${selectedTags ? selectedTags : ""}`
        this.dispatchEvent(new CustomEvent('nav-requested', {
        detail: { path },
        bubbles: true,
        composed: true
        }));
        this.loading = true;
        this._fetchItems().finally(() => this.loading = false)
    }

    async _fetchContent() {
        const fetchURL = `/src/updates/${this.post}.html`

        
        try {
        const response = await fetch(fetchURL, {
            method: 'GET',
            credentials: 'include'
        })

        if (!response.ok) return this.content = this.defaultError

        this.content = await response.text()
        } catch(e) {
            console.error(e)
            this.content = this.defaultError
        } finally {
            this.loading = false
            this.requestUpdate()
        }
    }

    render() {
        return html`
        <div class="self-center forceGap fullcard lock-width">
        ${this.loading ? html`<div class="center big-spinner"><wa-spinner></wa-spinner></div>` : html`${unsafeHTML(this.content)}`}
        </div>
        `
    }
}

customElements.define('site-updates', UpdatePosts)
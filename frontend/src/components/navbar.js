import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';
import { communicator } from '../cross-communicator.js'

import "./login-button.js"

export class Navbar extends LitElement {
    static properties = {
      user: {type: Object},
      selectedServer: {type: Number},
      servers: {type: Array},
      openDropdown: {type: String},
      submitVisible: {type: Boolean},
      submitCount: {type: Number}
    }

    constructor() {
      super()
      this.servers = ["Cherry", "Spirit", "Lotus", "Tulip"]
      this.openDropdown = ''
      this.submitVisible = false;
      this.submitCount = 0
      this._updateButton = this._updateButton.bind(this)
    }

    connectedCallback() {
      super.connectedCallback()

      communicator.addEventListener('set-status', this._updateButton)
    }

    disconnectedCallback() {
      super.disconnectedCallback()

      communicator.removeEventListener('set-status', this._updateButton)
    }

    _updateButton(e) {
      if (typeof e.detail?.visible !== 'boolean') return
      this.submitCount = typeof e.detail?.count === 'number' ? e.detail.count : this.submitCount
      this.submitVisible = e.detail.visible
      console.log(this.submitCount, this.submitVisible)
    }
  
  static styles = [sharedStyles, css`
    .navbar {
      background-color: var(--color-navbar);
      color: white;
      position: -webkit-sticky;
      position: sticky;
      z-index: 1000;
      top: 0;
      margin: 0;
      padding: 0;
    }

    .navbar-content {
    border-bottom: 3px solid var(--color-navbar-accent);
    }

    .discord-btn {
    text-align: right;
    }
    
    ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: var(--color-navbar);
  width: 100%;
  display: flex;
  align-items: center;
}

ul li {
  float: left;
}

ul li.rightside {
margin-left: auto;
}

ul li a, ul li.searchContainer {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  transition: background-color 0s ease;
}

ul li discord-login-btn {
display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

ul li a:hover, ul li.searchContainer:hover {
  background-color: var(--color-navbar-hover);
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--color-dropdown-bg);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1001;
  top: 100%;
  right: 0;
  left: auto;
}

.dropdown-content a {
  display: inline-block;
  color: white;
  padding: 8px 0;
  text-decoration: none;
  text-align: center;
  width: 100%;
  transition: background-color 0s ease;
}

.dropdown-content a:hover {
  background-color: var(--color-dropdown-hover);
}

.dropdown:hover .dropdown-content {
  display: block; 
}

.submit-box {
text-align: center;
width: 100%;
border-bottom: 2px solid var(--color-navbar-accent)
}

.submit-box wa-button {
padding: 10px 0px;
}
  `]

  _navigateTo(path, event) {
    if (event) event.preventDefault();
    this.dispatchEvent(new CustomEvent('nav-requested', {
      detail: { path },
      bubbles: true,
      composed: true
    }));
  }

  _dispatchModal() {
    communicator.dispatchEvent(new CustomEvent('open-modal'))
  }

  _search() {
        const inputEl = this.shadowRoot.querySelector('#search').value
        if (!inputEl) return window.alert("You're supposed to... type something in the search box...")
        const encoded = encodeURIComponent(inputEl)
        const path = `/~/search?query=${encoded}`
        // If we're already on the search page, update the URL and notify the view directly
        if (window.location.pathname === '/~/search') {
          const newSearch = `?query=${encoded}`
          if (window.location.search !== newSearch) {
            window.history.pushState({}, '', `${window.location.pathname}${newSearch}`)
          }
          window.dispatchEvent(new CustomEvent('app-search', {
            detail: { query: inputEl }
          }))
          return
        }

        this.dispatchEvent(new CustomEvent('nav-requested', {
        detail: { path },
        bubbles: true,
        composed: true
        }));
    }

    _serverNavigate(id, event) {
      event.preventDefault();
      if (![0, 1, 2, 3].includes(id)) return window.alert("An error occurred.")
        const path = window.location.href.replace(window.location.origin, '');
      document.cookie = `selected_server=${id}; path=/;`
      if (path.startsWith('/~/server/')) {
        const parts = path.slice(1).split('/')
        parts[2] = id.toString()
        const final = "/" + parts.join("/")
        this._navigateTo(final, null)
      } else {
        this._navigateTo(path, null)
      }
      this.selectedServer = id
    }

    updated(hasChanged) {
    if (hasChanged.has("selectedServer")) {
      this.requestUpdate()
    }
    if (hasChanged.has("user")) {
      console.log(this.user)
    }
  }

  _handleEnter(e) {
    if (e.key == "Enter") {
      e.preventDefault()
      this._search()
    }
  }

  _toggleDark() {
    const isDark = localStorage.getItem('theme') == 'dark'
    localStorage.setItem('theme', isDark ? 'light' : 'dark')
    document.documentElement.classList.toggle('wa-dark')
    this.requestUpdate()
  }

  render() {

    const isDark = localStorage.getItem('theme') == "dark"

    if (this.loading) return html``

    return html`
      <header class="navbar">
      <div class="navbar-content">
      <ul><li style="font-size: 150%"><a href='/~/' @click=${(e) => this._navigateTo('/~/', e)}>BCPricer</a></li>
      <li><a href="/~/allitems" @click=${(e) => this._navigateTo('/~/allitems', e)}>All Items</a></li>
      <li><a href="/~/spawners" @click=${(e) => this._navigateTo('/~/spawners', e)}>Spawners</a></li>
      <li><a href="/~/advancedsearch" @click=${(e) => this._navigateTo('/~/advancedsearch', e)}>Advanced Search</a></li>
      ${!this.loading && this.user && (this.user.role === 'staff' || this.user.role == 'admin') ? html`<li><a href="/~/grouppricing" @click=${(e) => this._navigateTo('/~/grouppricing', e)}>Group Pricing</a></li>` : ""}
      <li class="searchContainer"><wa-input pill autocomplete="off" id="search" @keydown=${(e) => this._handleEnter(e)} placeholder="Search..." ?disabled=${this.loading} value=${new URLSearchParams(window.location.search).get('query')} class="" with-clear size="s"><wa-icon name="search" label="search" slot="end" @click=${this._search}></wa-icon></wa-input></li>
      <li class="rightside"><a href="#" class="forceAlign" @click=${this._toggleDark}><wa-icon name=${isDark ? 'moon' : 'sun'}></wa-icon></a></li>
      <li class="dropdown">
      <a href="#">${this.selectedServer !== undefined ? this.servers[this.selectedServer] : "Select Server"}</a>
      <div class="dropdown-content">
      ${this.servers.map(server => html`<a href="#" @click=${(event) => this._serverNavigate(this.servers.indexOf(server), event)}>${server}</a>`)}
      </div></li>
      <li class="${this.user ? "dropdown" : ""}">${this.user ? html`
      <a href="#">${this.user.user}</a>
      <div class="dropdown-content right-dropdown">
      <a href="/~/settings/" @click=${(e) => this._navigateTo('/~/settings/')}>Settings</a>
      ${!this.loading && this.user && (this.user.role == 'staff' || this.user.role == 'admin') ? html`<a href="/~/myrecoms" @click=${(e) => this._navigateTo('/~/myrecoms')}>My Recommendations</a>` : ""}
      ${!this.loading && this.user && (this.user.role == 'admin' || this.user.role == 'staff') ? html`<a href="/~/viewgroups" @click=${(e) => this._navigateTo('/~/viewgroups')}>My Group Prices</a>` : ""}
      ${!this.loading && this.user && this.user.role == 'admin' ? html`<a href="/~/adminpanel" @click=${(e) => this._navigateTo('/~/adminpanel')}>Admin Panel</a>` : ""}
      </div>
      ` : html`<discord-login-btn></discord-login-btn>`}</li></ul>
      </div>
      <div class="submit-box" ?hidden=${!this.submitVisible || this.submitCount < 1}>
      <wa-button variant="brand" pill @click=${this._dispatchModal} size="s">Submit ${this.submitCount} Item Price${this.submitCount > 1 ? 's' : ''}</wa-button>
      </div>
      </header>
    `;
  }
}
customElements.define('top-navbar', Navbar);
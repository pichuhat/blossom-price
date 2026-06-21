import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';

import "./login-button.js"

export class Navbar extends LitElement {
    static properties = {
      user: {type: Object},
      selectedServer: {type: Number},
      servers: {type: Array},
      openDropdown: {type: String}
    }

    constructor() {
      super()
      this.servers = ["Cherry", "Spirit", "Lotus", "Tulip"]
      this.openDropdown = ''
    }
  
  static styles = [sharedStyles, css`
    .navbar {
      background-color: #BC4BC2;
      color: white;
      position: -webkit-sticky;
      position: sticky;
      z-index: 1000;
      top: 0;
      margin: 0;
      padding: 0;
    }

    .discord-btn {
    text-align: right;
    }
    
    ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: #Bc4Bc2;
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
}

ul li discord-login-btn {
display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

ul li a:hover, ul li.searchContainer:hover {
  background-color: #831889;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #831889;
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
}

.dropdown-content a:hover {
  background-color: #6b0d6b;
}

.dropdown:hover .dropdown-content {
  display: block; 
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
  }

  render() {
    const discordLoginUrl = "https://discord.com/oauth2/authorize?client_id=1511812763901759648&response_type=code&redirect_uri=https%3A%2F%2Fblossom-price.onrender.com%2Fapi%2Fauth%2Fcallback&scope=guilds.members.read+identify";
    console.log(this.user)
    console.log("Navbar SelServer: " + this.selectedServer)

    return html`
      <header class="navbar">
      <ul><li style="font-size: 150%"><a href='/~/' @click=${(e) => this._navigateTo('/~/', e)}>BCPricer</a></li>
      <li><a href="/~/allitems" @click=${(e) => this._navigateTo('/~/allitems', e)}>All Items</a></li>
      <li><a href="/~/spawners" @click=${(e) => this._navigateTo('/~/spawners', e)}>Spawners</a></li>
      <li><a href="/~/advancedsearch" @click=${(e) => this._navigateTo('/~/advancedsearch', e)}>Advanced Search</a></li>
      <li class="searchContainer"><div class="searchBox"><input type="text" id="search" placeholder="Search..." ?disabled=${this.loading} value=${new URLSearchParams(window.location.search).get('query')} class="leftbutton rightbutton navsearch"><button @click=${this._search} ?disabled=${this.loading} class="leftbutton rightbutton navbutton">Search</button></div></div></li>
      <li class="rightside dropdown">
      <a href="#">${this.selectedServer !== undefined ? this.servers[this.selectedServer] : "Select Server"}</a>
      <div class="dropdown-content">
      ${this.servers.map(server => html`<a href="#" @click=${(event) => this._serverNavigate(this.servers.indexOf(server), event)}>${server}</a>`)}
      </div></li>
      <li class="${this.user ? "dropdown" : ""}">${this.user ? html`
      <a href="#">${this.user.user}</a>
      <div class="dropdown-content right-dropdown">
      <a href="/~/settings/" @click=${(e) => this._navigateTo('/~/settings/')}>Settings</a>
      ${!this.loading && this.user && (this.user.role == 'staff' || this.user.role == 'admin') ? html`<a href="/~/myrecoms" @click=${(e) => this._navigateTo('/~/myrecoms')}>My Recommendations</a>` : ""}
      ${!this.loading && this.user && this.user.role == 'admin' ? html`<a href="/~/adminpanel" @click=${(e) => this._navigateTo('/~/adminpanel')}>Admin Panel</a>` : ""}
      </div>
      ` : html`<discord-login-btn></discord-login-btn>`}</li></ul>
      </header>
    `;
  }
}
customElements.define('top-navbar', Navbar);
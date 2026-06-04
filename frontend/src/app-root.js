import "./components/login-button.js"
import "./components/navbar.js"

import { LitElement, html, css } from 'https://esm.sh/lit@3';

export class AppView extends LitElement {
    static properties = {
        user: {type: Object},
        loading: {type: Boolean},
        currentPage: { type: String }
    }

    constructor() {
        super()
        this.user = null
        this.loading = false
        this.currentPage = "home"
    }


  static styles = css`
    
  `;

  connectedCallback() {
    super.connectedCallback();
    this.checkLoginStatus();
    
    window.addEventListener('popstate', () => {
      this._routeChanged();
    });
    
    this._routeChanged();
  }

  _routeChanged() {
    const path = window.location.pathname;
    if (path === '/settings') {
      this.currentPage = 'settings';
    } else {
      this.currentPage = 'home';
    }
  }

  _handleNavigation(e) {
    const page = e.detail.page; // 'settings'
    this.currentPage = page;
    
    window.history.pushState({}, '', `/${page}`);
  }

  async checkLoginStatus() {
    try {
        const response = await fetch("https://blossom-price.onrender.com/api/auth/me", {
            method: 'GET',
            credentials: 'include' 
        })

        if (!response.ok) {
            console.log("No valid login found.")
            this.user = null;
            this.loading = false;
            return;
        }

        const result = await response.json()

        if (result.loggedIn && result.role && result.user) {
            this.user = result
        } else {
            window.alert("Unknown authentication error")
            console.error("Server sent invalid user data.")
        }
        this.loading = false
    } catch(error) {
        window.alert("Authentication check failed.")
        console.log(error)
        this.loading = false
    }
  }

  render() {
    if (this.loading) {
        return html`<p>Please Wait...</p>`
    }

    return html`
      <top-navbar .user=${this.user}></top-navbar>
      ${this.user ? "Login success" : "Not logged in"}
    `;
  }
}
customElements.define('app-view', AppView);
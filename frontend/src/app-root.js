import "./components/login-button.js"
import "./components/navbar.js"
import "./views/guest-view.js"
import "./views/home-view.js"

import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { Router } from 'https://esm.sh/@lit-labs/router@0.1';

export class AppView extends LitElement {
    static properties = {
        user: {type: Object},
        loading: {type: Boolean},
        currentPage: { type: String },
        selectedServer: { type: Number }
    }

    constructor() {
        super()
        this.user = null
        this.loading = false
        this.currentPage = "home"
        this.selectedServer = undefined

        this.router = new Router(this, [
      { 
        path: '/', 
        render: () => {
          return html`<home-view .selectedServer=${this.selectedServer}></home-view>`
        }
      },
      { 
        path: '/server/:id', 
        render: (params) => {
          const serverId = parseInt(params.id, 10);
          this.selectedServer = isNaN(serverId) ? undefined : serverId;
          this.requestUpdate()
          return html`<home-view .selectedServer=${this.selectedServer}></home-view>`;
        }
      },
      {
        path: '/settings',
        render: () => html`<h2>User Settings View Coming Soon</h2>`
      }
    ]);
    }


  static styles = css`
    
  `;

  connectedCallback() {
    super.connectedCallback();
    this.checkLoginStatus();

    window.addEventListener('popstate', () => this._syncServerFromURL());
  
  // Sync immediately on initial page boot
  this._syncServerFromURL();
  }

  _syncServerFromURL() {
  const path = window.location.pathname; // Looks like "/server/0"
  
  if (path.startsWith('/server/')) {
    // Extract the number at the end of the URL string
    const idStr = path.split('/').pop();
    const serverId = parseInt(idStr, 10);
    
    // Update the parent's reactive property! 
    // This will instantly force <top-navbar> to re-render with the new value!
    this.selectedServer = isNaN(serverId) ? undefined : serverId;
  } else {
    this.selectedServer = undefined;
  }
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
    if (window.location.pathname.startsWith("/server/"))
    if (this.loading) {
        return html`<p>Please Wait...</p>`
    }

    return html`
      <top-navbar .user=${this.user} .selectedServer=${this.selectedServer}></top-navbar>
      ${this.user ? "" : html`<guest-view></guest-view>`}
      ${this.router.outlet()}
    `;
  }
}
customElements.define('app-view', AppView);
import "./components/login-button.js"
import "./components/navbar.js"
import "./components/footer.js"
import "./views/guest-view.js"
import "./views/home-view.js"
import "./views/allitem-view.js"
import "./views/item-view.js"
import "./views/spawner-view.js"
import "./views/search-view.js"
import "./views/advanced-search.js"
import "./views/updates.js"
import "./views/settings-view.js"
import "./views/new-purchase-plan.js"
import "./views/view-purchase-plan.js"
import "./views/my-purchase-plans.js"

import { createToast } from "./toast.js"

import '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';
import '@awesome.me/webawesome/dist/components/input/input.js'
import '@awesome.me/webawesome/dist/components/button/button.js'
import '@awesome.me/webawesome/dist/components/spinner/spinner.js'
import '@awesome.me/webawesome/dist/components/icon/icon.js'
import '@awesome.me/webawesome/dist/components/switch/switch.js'
import '@awesome.me/webawesome/dist/components/button-group/button-group.js'
import '@awesome.me/webawesome/dist/components/callout/callout.js';
import '@awesome.me/webawesome/dist/components/number-input/number-input.js';
import '@awesome.me/webawesome/dist/components/details/details.js';
import '@awesome.me/webawesome/dist/components/toast/toast.js';
import '@awesome.me/webawesome/dist/components/skeleton/skeleton.js';
import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';

import { setBasePath } from '@awesome.me/webawesome/dist/webawesome.js';
setBasePath('/dist/webawesome');

//Polyfill for old Apple devices
import { URLPattern } from 'urlpattern-polyfill';

import { sharedStyles } from './styles.js';
import { LitElement, html, css, nothing } from 'lit';
import { Router } from '@lit-labs/router';

if (!globalThis.URLPattern) {
    globalThis.URLPattern = URLPattern
}

const lazy = (loader) => async () => {
  await loader();
  return true;
};

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
        path: '/~{/}?', 
        render: () => html`<home-view .selectedServer=${this.selectedServer}></home-view>`
      },
      { 
        path: '/~/server/:id{/}?', 
        render: (params) => {
          const serverId = parseInt(params.id, 10);
          this.selectedServer = isNaN(serverId) ? undefined : serverId;
          this.requestUpdate()
          return html`<home-view .selectedServer=${this.selectedServer}></home-view>`;
        }
      },
      {
        path: '/~/allitems{/}?',
        render: () => html`<all-item-view .selectedServer=${this.selectedServer}></all-item-view>`
      },
      {
        path: '/~/settings{/}?',
        render: () => html`<settings-view .user=${this.user}></settings-view>`
      },
      {
        path: '/~/server/:id/item/:itemid{/}?',
        render: (params) => {
          const serverId = parseInt(params.id, 10)
          const itemId = parseInt(params.itemid, 10)
          this.selectedServer = isNaN(serverId) ? undefined : serverId
          this.requestUpdate()
          return html`<item-view .selectedServer=${this.selectedServer} .item=${itemId} .user=${this.user}></item-view>`
        }
      },
      {
        path: '/~/myrecoms{/}?',
        enter: lazy(() => import('./views/staff-view.js')),
        render: () => {
          if (this.user && (this.user.role == 'staff' || this.user.role == 'admin')) {
          return html`<my-recoms .user=${this.user}></my-recoms>`
          } else {
            return html``
          }
        }
      },
      {
        path: '/~/adminpanel{/}?',
        enter: lazy(() => import('./views/admin-view.js')),
        render: () => {
          if (this.user &&this.user.role == 'admin') {
            return html`<admin-view .user=${this.user}></admin-view>`
          }
        }
      },
      {
        path: '/~/spawners{/}?',
        render: () => html`<spawner-view .selectedServer=${this.selectedServer}></spawner-view>`
      },
      {
        path: '/~/search{/}?',
        render: () => html`<search-view .selectedServer=${this.selectedServer}></search-view>`
      },
      {
        path: '/~/advancedsearch{/}?',
        render: () => html`<advanced-search-view .selectedServer=${this.selectedServer}></advanced-search-view>`
      },
      {
        path: '/~/grouppricing{/}?',
        enter: lazy(() => import('./views/group-pricing.js')),
        render: () => {
          if (this.user && (this.user.role == 'staff' || this.user.role == 'admin')) {
          return html`<group-price-view .selectedServer=${this.selectedServer}></group-price-view>`
          } else {
            return html``
          }
        }
      },
      {
        path: '/~/viewgroups{/}?',
        enter: lazy(() => import('./views/gp-view.js')),
        render: () => {
          if (this.user && (this.user.role == 'staff' || this.user.role == 'admin')) {
            return html`<manage-gp .user=${this.user}></manage-gp>`
          }
        }
      },
      {
        path: '/~/updates/:post{/}?',
        render: ({post}) => html`<site-updates .post=${post}></site-updates>`
      },
      {
        path: '/~/purchaseplan/home{/}?',
        render: () => {
          if (this.user) return html`<my-purchase-plans></my-purchase-plans>`
        }
      },
      {
        path: '/~/purchaseplan/new{/}?',
        render: () => {
          if (this.user) return html`<new-purchase-plan .selectedServer=${this.selectedServer}></new-purchase-plan>`
        }
      },
      {
        path: '/~/purchaseplan/view/:id{/}?',
        render: (id) => html`<view-purchase-plan .plan_id=${id.id} .user=${this.user} .selectedServer=${this.selectedServer}></view-purchase-plan>`
      }
    ]);
    }


  static styles = [sharedStyles, css`
    .main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    min-height: 0;
    display: grid;
    grid-template-rows: 1fr auto;
  }
  `]

  connectedCallback() {
    super.connectedCallback();
    this._checkLinkPopups()
    this.checkLoginStatus(false);
    this._getSelectedServer()

    this.addEventListener('nav-requested', (event) => {
      const destinationPath = event.detail && event.detail.path ? event.detail.path : window.location.pathname + window.location.search;
      this._getSelectedServer()

      const destinationURL = new URL(destinationPath, window.location.origin);
      window.history.pushState({}, '', destinationURL);
      this.router.goto(destinationURL.pathname);

      Promise.resolve().then(() => {
      this._syncServerFromURL();
      this.requestUpdate();
      });
    });

    this.addEventListener('check-login', () => this.checkLoginStatus(true))

  window.addEventListener('popstate', () => this._syncFromPathName());
  
  this._syncFromPathName();
  }

  _checkLinkPopups() {
    const params = new URLSearchParams(window.location.search)
    const popupMessages = {
      "0": {content: "<strong>Success!</strong><br>You are now logged in.", variant: "success", icon: "circle-check", allowHtml: true},
      "1": { content: "<strong>Login Failed</strong><br>You aren't in the BlossomCraft Discord server.", variant: "warning", icon: "circle-exclamation", duration: 10000, allowHtml: true},
      "2": { content: "<strong>Login Failed</strong><br>You haven't linked your Minecraft account in the BlossomCraft Discord server.", variant: "warning", icon: "circle-exclamation", duration: 10000, allowHtml: true}
    }
    const popup = popupMessages[params.get('linkPopup')]
    if (popup) {
      createToast(popup.content, {
        variant: popup.variant,
        icon: popup.icon,
        allowHtml: popup.allowHtml || false,
        duration: popup.duration || 5000
      })
      
      params.delete('linkPopup')
      const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}${window.location.hash}`
      window.history.replaceState({}, '', newUrl)
    }
  }

  _syncFromPathName() {
    const path = window.location.pathname;
    this._getSelectedServer();
    this._syncServerFromURL();
    this.router.goto(path);
    this.requestUpdate();
  }

  _getSelectedServer() {
    this.selectedServer = localStorage.getItem('selectedServer') === null || isNaN(Number(localStorage.getItem('selectedServer'))) ? undefined : Number(localStorage.getItem('selectedServer'))
  }

  _syncServerFromURL() {
    const path = window.location.pathname;
    
    if (path.startsWith('/~/server/')) {
      const idStr = path.split('/')[3];
      const serverId = parseInt(idStr, 10);
      
      this.selectedServer = isNaN(serverId) ? undefined : serverId;
    }
}

  async checkLoginStatus(isExternalCheck) {
    this.loading = true
    try {
        const response = await fetch("/api/auth/me", {
            method: 'GET',
            credentials: 'include' 
        })

        if (!response.ok) {
          if (response.status !== 401) {console.log(response); throw new Error("Force catch")}

          console.log("No valid login found.")
          this.user = null;
          if (isExternalCheck) createToast("Successfully logged out.", {variant: 'success', icon: "right-from-bracket"})
          return;
        }

        const result = await response.json()

        if (result.loggedIn && result.role && result.user) {
            this.user = result
        } else {
            window.alert("Unknown authentication error")
            console.error("Server sent invalid user data.")
        }
    } catch(error) {
        window.alert("Authentication check failed.")
        console.log(error)
    } finally {
      this.loading = false
    }
  }

  render() {
    if (this.loading) {
        return html`<p>Please Wait...</p>`
    }

    return html`
    <div class="main">
      <top-navbar .user=${this.user} .rootSelectedServer=${this.selectedServer}></top-navbar>
      <div class="content">
      ${this.router.outlet()}
      <site-footer></site-footer>
      </div></div>
    `;
  }
}
customElements.define('app-view', AppView);

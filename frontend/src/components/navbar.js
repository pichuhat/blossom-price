import { LitElement, html, css } from 'https://esm.sh/lit@3';

import "./login-button.js"

export class Navbar extends LitElement {
    static properties = {
      user: {type: Object},
      selectedServer: {type: Number},
      servers: {type: Array}
    }

    constructor() {
      super()
      this.servers = ["Cherry", "Spirit", "Lotus", "Tulip"]
    }
  
  static styles = css`
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
  overflow: hidden;
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

ul li a {
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

ul li a:hover {
  background-color: #831889;
}
  `;

  _navigateTo(path, event) {
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('nav-requested', {
      detail: { path },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const discordLoginUrl = "https://discord.com/oauth2/authorize?client_id=1511812763901759648&response_type=code&redirect_uri=https%3A%2F%2Fblossom-price.onrender.com%2Fapi%2Fauth%2Fcallback&scope=guilds.members.read+identify";
    console.log(this.user)

    return html`
      <header class="navbar">
      <ul><li style="font-size: 150%"><a href='/~/' @click=${() => this._navigateTo('/~/', e)}>BCPricer</a></li>
      <li><a href="/allitems" @click=${(e) => this._navigateTo('/~/allitems', e)}>All Items</a></li>
      <li><a href="/search" @click=${(e) => this._navigateTo('/~/search', e)}>Advanced Search</a></li>
      <li><input type="text" id="searchbar" placeholder="Search..."> <button @click=${this._search}>Search</button></li>
      <li class="rightside"><a href="/" @click=${(e) => this._navigateTo('/~/', e)}>${this.selectedServer !== undefined ? this.servers[this.selectedServer] : "Select Server"}</a></li>
      ${!this.loading && this.user && (this.user.role == 'staff' || this.user.role == 'admin') ? html`<li><a href="/~/myrecoms" @click=${(e) => this._navigateTo('/~/myrecoms')}>My Recommendations</a></li>` : ""}
      ${!this.loading && this.user && this.user.role == 'admin' ? html`<li><a href="/~/adminpanel" @click=${(e) => this._navigateTo('/~/adminpanel')}>Admin Panel</a></li>` : ""}
      <li>${this.user ? html`<a href="/settings" @click=${(e) => this._navigateTo('/~/settings', e)}>${this.user.user}</a>` : html`<discord-login-btn></discord-login-btn>`}</li></ul>
      </header>
    `;
  }
}
customElements.define('top-navbar', Navbar);
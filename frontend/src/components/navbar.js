import { LitElement, html, css } from 'https://esm.sh/lit@3';

import "./login-button.js"

export class Navbar extends LitElement {
    static properties = {
      user: {type: Object}
    }
  
  static styles = css`
    .navbar {
      background-color: #BC4BC2;
      color: white;
      position: -webkit-sticky;
      position: sticky;
      z-index: 1000;
      top: 0;
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

  render() {
    const discordLoginUrl = "https://discord.com/oauth2/authorize?client_id=1511812763901759648&response_type=code&redirect_uri=https%3A%2F%2Fblossom-price.onrender.com%2Fapi%2Fauth%2Fcallback&scope=guilds.members.read+identify";

    return html`
      <header class="navbar">
      <ul><li><a href="allitems.html">All Items</a></li>
      <li><a href="search.html">Search</a></li>
      <li class="rightside">${this.user ? html `<a href="settings.html">${this.user.name}</a>` : html `<discord-login-btn></discord-login-btn>`}</li></ul>
      </header>
    `;
  }
}
customElements.define('top-navbar', Navbar);
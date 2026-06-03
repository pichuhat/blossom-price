import { LitElement, html, css } from 'https://esm.sh/lit@3';

export class Navbar extends LitElement {
  
  static styles = css`
    .navbar {
      background-color: #BC4BC2;
      color: white;
      position: -webkit-sticky;
      position: sticky;
      z-index: 1000;
      padding: 15px;
      top: 0;
    }
    
    ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333333;
}

ul li {
  float: left;
}

ul li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

ul li a:hover {
  background-color: #111111;
}
  `;

  render() {
    const discordLoginUrl = "https://discord.com/oauth2/authorize?client_id=1511812763901759648&response_type=code&redirect_uri=https%3A%2F%2Fblossom-price.onrender.com%2Fapi%2Fauth%2Fcallback&scope=guilds.members.read+identify";

    return html`
      <header class="navbar">
      <li><a href="allitems.html">All Items</a></li>
      <li><a href="search.html">Search</a></li>
      </header>
    `;
  }
}
customElements.define('top-navbar', Navbar);
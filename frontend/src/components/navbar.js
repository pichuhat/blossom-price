import { LitElement, html, css } from 'https://esm.sh/lit@3';

import "./login-button.js"

export class Navbar extends LitElement {
  static properties = {
    user: { type: Object },
    selectedServer: { type: Number },
    servers: { type: Array }
  }

  constructor() {
    super()
    this.servers = ["Cherry", "Spirit", "Lotus", "Tulip"]
  }
  
  static styles = css`
    .navbar {
      background-color: #BC4BC2;
      color: white;
      position: sticky;
      top: 0;
      z-index: 1000;
      margin: 0;
      padding: 0;
    }
    
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #BC4BC2;
      width: 100%;
      display: flex;
      align-items: center;
    }

    ul li {
      display: flex;
      align-items: center;
    }

    ul li.rightside {
      margin-left: auto;
    }

    /* Target both your legacy links and new buttons identically */
    ul li button, ul li a {
      display: block;
      background: none;
      border: none;
      font-family: inherit;
      font-size: inherit;
      color: white;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    ul li discord-login-btn {
      display: block;
      color: white;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
    }

    ul li button:hover, ul li a:hover {
      background-color: #831889;
    }
  `;

  render() {
    return html`
      <header class="navbar">
        <ul>
          <li style="font-size: 150%; padding: 0 16px; font-weight: bold;">BCPricer</li>
          
          <li><button @click=${() => this._handleNav('/allitems')}>All Items</button></li>
          <li><button @click=${() => this._handleNav('/search')}>Search</button></li>
          
          <li class="rightside">
            <button @click=${() => this._handleNav('/')}>
              ${this.selectedServer !== undefined ? this.servers[this.selectedServer] : "Select Server"}
            </button>
          </li>
          
          <li>
            ${this.user 
              ? html`<button @click=${() => this._handleNav('/settings')Custom}>${this.user.user}</button>` 
              : html`<discord-login-btn></discord-login-btn>`
            }
          </li>
        </ul>
      </header>
    `;
  }

  // ✅ Fire a navigation request event upward to the parent app-view.js
  _handleNav(path) {
    this.dispatchEvent(new CustomEvent('nav-requested', {
      detail: { path: path },
      bubbles: true,
      composed: true
    }));
  }
}
customElements.define('top-navbar', Navbar);
import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';

import "../components/login-button.js"

export class HomeView extends LitElement {
    static properties = {
        selectedServer: { type: Number },
        servers: {type: Array}
    }

    constructor() {
        super()
        this.servers = ["Cherry", "Spirit", "Lotus", "Tulip"]
        this.selectedServer = undefined
    }

  static styles = [sharedStyles, css`
    .center {
    text-align: center;
    }

    button.select {
    font-size: 200%;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-top: 2%;
    padding-bottom: 2%;
    width: 40%;
    border-radius: 5px;
    display: inline-block;
    text-decoration: none;
    background-color: #bc4bc2;
    color: #ffffff;
    }

    button.select:hover {
    background-color: #831889;
    }

    div.serverbox {
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    height: 50%;
    }
  `]

  render() {
    const isServerRoute = window.location.pathname.startsWith('/~/server/');

    return html`
    <div class="center">
      <h1>BCpricer</h1>
      ${isServerRoute ? html`
        <h3>Featured</h3>
        Coming soon
        ` : html`
        <h3>Select a Subserver</h3>
        <div class="serverbox"><button class="select" @click=${() => this._navigateToServer(0)}>Cherry</button><button class="select" @click=${() => this._navigateToServer(1)}>Spirit</button><button class="select" @click=${() => this._navigateToServer(2)}>Lotus</button><button class="select" @click=${() => this._navigateToServer(3)}>Tulip</button></div>
        `}
      </div>
    `;
  }

  _navigateToServer(id) {
  document.cookie = `selected_server=${id}; path=/;`
  this.selectedServer = id;
  window.history.pushState({}, '', `/~/server/${id}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
}
customElements.define('home-view', HomeView);
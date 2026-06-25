import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';

import "../components/login-button.js"

export class HomeView extends LitElement {
    static properties = {
        selectedServer: { type: Number },
        servers: {type: Array},
        countItems: {type: Number}
    }

    constructor() {
        super()
        this.servers = ["Cherry", "Spirit", "Lotus", "Tulip"]
        this.selectedServer = undefined
        this.countItems = null
        this.countServerItems = null
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

  connectedCallback() {
    super.connectedCallback()
    this._fetchCount()
  }

 async _fetchCount() {
  const fetchURL = `/api/countprices`
  try {
    const response = await fetch(fetchURL)
    if (!response.ok) return window.alert("An error occurred.")
    const result = await response.json()
    this.countItems = result.result
  } catch(e) {
    window.alert("An error occurred.")
    console.error(e)
  }
 }

  render() {

    return html`
    <div class="center">
      <span class="bigText">BlossomPricer</span><br>
      ${this.selectedServer ? html`
        <span class="bigSubText">${this.countItems ? this.countItems : html`<wa-spinner></wa-spinner>`} items priced. <span class="alt">And counting.</span></span>
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
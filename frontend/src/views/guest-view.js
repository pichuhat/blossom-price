import { LitElement, html, css } from 'https://esm.sh/lit@3';

import "../components/login-button.js"

export class GuestView extends LitElement {
    static properties = {
        selectedServer: { type: Number }
    }

  static styles = css`
    .center {
    text-align: center;
    }

    a.select {
    font-size: 200%;
    margin-left: 5%;
    margin-right: 5%;
    width: 40%;
    }
  `;

  render() {
    const discordLoginUrl = "https://discord.com/oauth2/authorize?client_id=1511812763901759648&response_type=code&redirect_uri=https%3A%2F%2Fblossom-price.onrender.com%2Fapi%2Fauth%2Fcallback&scope=guilds.members.read+identify";

    return html`
    <div class="center">
      <h1>BCpricer</h1>
      <discord-login-btn></discord-login-btn>
      <p>Login for Improved Functionality</p>
      </div>
    `;
  }
}
customElements.define('guest-view', GuestView);
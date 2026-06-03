import { LitElement, html, css } from 'https://esm.sh/lit@3';

export class DiscordLoginButton extends LitElement {
  // Scoped CSS styles using standard browser Shadow DOM
  static styles = css`
    .discord-btn {
      background-color: #5865F2;
      color: white;
      padding: 10px 20px;
      border-radius: 4px;
      text-decoration: none;
      font-weight: bold;
      display: inline-block;
    }
  `;

  render() {
    const discordLoginUrl = "https://discord.com/oauth2/authorize?client_id=1511812763901759648&response_type=code&redirect_uri=https%3A%2F%2Fblossom-price.onrender.com%2Fapi%2Fauth%2Fcallback&scope=guilds.members.read+identify";

    return html`
      <a href="${discordLoginUrl}" class="discord-btn">
        Login with Discord
      </a>
    `;
  }
}
customElements.define('discord-login-btn', DiscordLoginButton);
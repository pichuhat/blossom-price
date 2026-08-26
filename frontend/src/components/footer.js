import { LitElement, html, css, nothing } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';

export class SiteFooter extends LitElement {
    static styles = [sharedStyles, css`
        .footer, footer {
        border-top: 1px solid var(--color-navbar-accent);
        margin: 0;
        margin-top: 20px;
        background-color: var(--color-navbar);
        padding: 5px 20px;
        color: white;
        text-align: center;
        }
        
        a {
        color: white;
        }
        `]

        _openInNewTab(url, e) {
            if (e) e.preventDefault()
            window.open(url)
        }

        render() {
            return html`
            <footer>
            <sub>version 1.2.1b (August 26, 2026) &bull; created by pichuhat &bull; <a href="https://github.com/pichuhat/blossom-price" @click=${(e) => this._openInNewTab('https://github.com/pichuhat/blossom-price', e)}>source</a></sub>
            </footer>
            `
        }
}

customElements.define('site-footer', SiteFooter)

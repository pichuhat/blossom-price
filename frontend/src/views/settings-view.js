import { LitElement, html, css } from 'https://esm.sh/lit@3';
import { sharedStyles } from '../styles.js';
import { communicator } from '../cross-communicator.js'

class SettingsView extends LitElement {
    static properties = {
        loading: {type: Boolean}
    }

    constructor() {
        super()
        this.loading = false;
        this._handleSettingChange = this._handleSettingChange.bind(this)
    }

    get darkMode() {
        return localStorage.getItem('theme') === null ? true : localStorage.getItem('theme') === 'dark'
    }

    get lowDetailMode() {
        return localStorage.getItem('LDM') === null ? true : localStorage.getItem('LDM') === 'true'
    }

    get viewType() {
        return localStorage.getItem('viewType') === null ? 'standard' : localStorage.getItem('viewType')
    }

    get selectedServer() {
        return localStorage.getItem('selectedServer') === null || isNaN(Number(localStorage.getItem('selectedServer'))) ? 'undefined' : localStorage.getItem('selectedServer')
    }

    static styles = [sharedStyles, css`
        .settings-box {
            display: flex;
            gap: 15px;
            flex-direction: column;
            align-items: center;
            margin-top: 15px;
        }
        `]

    connectedCallback() {
        super.connectedCallback()

        communicator.addEventListener('setting-changed', this._handleSettingChange)
    }

    disconnectedCallback() {
        super.disconnectedCallback()

        communicator.removeEventListener('setting-changed', this._handleSettingChange)
    }

    _handleSettingChange() {
        //mostly unused for now
        this.requestUpdate()
    }

    _updateSetting(setting, value) {
        if (!setting || !value) return
        localStorage.setItem(setting, value)

        if (setting === 'theme' || setting === 'selectedServer') communicator.dispatchEvent(new CustomEvent('navbar-change'))
    }

    render() {
        console.log('READ SS ' + this.selectedServer)
        console.log(typeof this.selectedServer)

        return html`
        <div class="dashboard">
        <div class="fullcard">
        <span class="bigText">Settings</span>
        <br><sub>This is a new/beta feature! Changes may not be shown immediately.</sub>
        
        <div class="settings-box">
        <wa-switch ?checked=${this.darkMode} id="themeToggle" @change=${(e) => {this._updateSetting('theme', e.target.checked ? 'dark' : 'light'); e.target.checked ? document.documentElement.classList.add('wa-dark') : document.documentElement.classList.remove('wa-dark')}}>Dark Mode</wa-switch>
        <wa-switch ?checked=${this.lowDetailMode} id="LDMToggle" @change=${(e) => {this._updateSetting('LDM', String(e.target.checked))}}>Low Detail Mode</wa-switch>
        
        <div style="min-width: 50%" class="self-center"><wa-select label="Item Display Type" ?disabled=${this.loading} @change=${(e) => this._updateSetting('viewType', e.target.value)}>
        <wa-option value="standard" ?selected=${this.viewType === 'standard'}>Standard View (Full Image)</wa-option>
        <wa-option value="table" ?selected=${this.viewType === 'table'}>Compact View - BETA (Item Table)</wa-option>
        </wa-select>
        <br><wa-select label="Selected Server" ?disabled=${this.loading} @change=${e => {this._updateSetting('selectedServer', e.target.value)}}>
        <wa-option value="undefined" ?selected=${!["0", "1", "2", "3"].includes(this.selectedServer)}>None</wa-option>
        <wa-option value="0" ?selected=${this.selectedServer === '0'}>Cherry</wa-option>
        <wa-option value="1" ?selected=${this.selectedServer === '1'}>Spirit</wa-option>
        <wa-option value="2" ?selected=${this.selectedServer === '2'}>Lotus</wa-option>
        <wa-option value="3" ?selected=${this.selectedServer === '3'}>Tulip</wa-option>
        </wa-select>
        </div>
        
        </div>
        </div>
        </div>
        `
    }
}

customElements.define('settings-view', SettingsView)
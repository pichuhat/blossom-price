import{a as Kt}from"./chunk-PC5URATX.js";import{a as Ct,b as St,c as ke,d as $e,e as kt,f as zo,g as Po,h as wt,i as Gt}from"./chunk-GJZMUBY3.js";import{a as x,b as m,c as it,d as et,e as b,f as w,g as jr,h as Yr,i as c,j as Xr,k as Kr,l as Bt,m as dt,n as Gr,o as L,p as z}from"./chunk-K3YW3SVB.js";var Ao=class extends L{render(){let t=`https://discord.com/oauth2/authorize?client_id=1511812763901759648&response_type=code&redirect_uri=https%3A%2F%2F${window.location.hostname}%2Fapi%2Fauth%2Fcallback&scope=guilds.members.read+identify`;return c`
      <a href="${t}" class="discord-btn">
        Login with Discord
      </a>
    `}};x(Ao,"styles",[z,w`
    .discord-btn {
      background-color: #5865F2;
      color: white;
      padding: 10px 20px;
      border-radius: 4px;
      text-decoration: none;
      font-weight: bold;
      display: inline-block;
      scale: 1;
    }
  `]);customElements.define("discord-login-btn",Ao);var Ye=class extends L{constructor(){super(),this.servers=["Cherry","Spirit","Lotus","Tulip"],this.openDropdown="",this.submitVisible=!1,this.submitCount=0,this._updateButton=this._updateButton.bind(this),this._handleThemeChange=this._handleThemeChange.bind(this)}get selectedServer(){return localStorage.getItem("selectedServer")===null||isNaN(Number(localStorage.getItem("selectedServer")))?void 0:Number(localStorage.getItem("selectedServer"))}connectedCallback(){super.connectedCallback(),Ct.addEventListener("set-status",this._updateButton),Ct.addEventListener("navbar-change",this._handleThemeChange)}disconnectedCallback(){super.disconnectedCallback(),Ct.removeEventListener("set-status",this._updateButton),Ct.removeEventListener("navbar-change",this._handleThemeChange)}_handleThemeChange(){this.requestUpdate()}_updateButton(t){typeof t.detail?.visible=="boolean"&&(this.submitCount=typeof t.detail?.count=="number"?t.detail.count:this.submitCount,this.submitVisible=t.detail.visible,console.log(this.submitCount,this.submitVisible))}_navigateTo(t,o){o&&o.preventDefault(),this.dispatchEvent(new CustomEvent("nav-requested",{detail:{path:t},bubbles:!0,composed:!0}))}_dispatchModal(){Ct.dispatchEvent(new CustomEvent("open-modal"))}_search(){let t=this.shadowRoot.querySelector("#search").value;if(!t)return window.alert("You're supposed to... type something in the search box...");let o=encodeURIComponent(t),r=`/~/search?query=${o}`;if(window.location.pathname==="/~/search"){let i=`?query=${o}`;window.location.search!==i&&window.history.pushState({},"",`${window.location.pathname}${i}`),window.dispatchEvent(new CustomEvent("app-search",{detail:{query:t}}));return}this.dispatchEvent(new CustomEvent("nav-requested",{detail:{path:r},bubbles:!0,composed:!0}))}_serverNavigate(t,o){if(o.preventDefault(),![0,1,2,3].includes(t))return window.alert("An error occurred.");let r=window.location.href.replace(window.location.origin,"");if(localStorage.setItem("selectedServer",String(t)),r.startsWith("/~/server/")){let i=r.slice(1).split("/");i[2]=t.toString();let a="/"+i.join("/");this._navigateTo(a,null)}else this._navigateTo(r,null);this.requestUpdate()}updated(t){t.has("rootSelectedServer")&&this.requestUpdate(),t.has("user")&&console.log(this.user)}_handleEnter(t){t.key=="Enter"&&(t.preventDefault(),this._search())}_toggleDark(){let t=localStorage.getItem("theme")=="dark";localStorage.setItem("theme",t?"light":"dark"),document.documentElement.classList.toggle("wa-dark"),Ct.dispatchEvent(new CustomEvent("setting-changed")),this.requestUpdate()}render(){let t=localStorage.getItem("theme")=="dark";return this.loading?c``:c`
      <header class="navbar">
      <div class="navbar-content">
      <ul><li style="font-size: 150%"><a href='/~/' @click=${o=>this._navigateTo("/~/",o)}><img src="/src/images/brand/transparent-cropped.png" alt="BlossomPricer" length="40" height="40"></a></li>
      <li><a href="/~/allitems" @click=${o=>this._navigateTo("/~/allitems",o)}>All Items</a></li>
      <li><a href="/~/advancedsearch" @click=${o=>this._navigateTo("/~/advancedsearch",o)}>Advanced Search</a></li>
      <li class="dropdown">
      <a href="#">Extras</a>
      <div class="dropdown-content right-dropdown">
      <a href="/~/updates/faq" @click=${o=>this._navigateTo("/~/updates/faq",o)}>FAQ</a>
      <a href="/~/spawners" @click=${o=>this._navigateTo("/~/spawners",o)}>Spawners</a>
      ${this.user?c`<a href="/~/purchaseplan/home" @click=${o=>this._navigateTo("/~/purchaseplan/home",o)}>Purchase Plans</a>`:dt}
      ${this.user&&(this.user.role==="staff"||this.user.role==="admin")?c`<a href="/~/grouppricing" @click=${o=>this._navigateTo("/~/grouppricing",o)}>Group Pricing</a>`:dt}
      </div>
      </li>
      <li class="searchContainer"><wa-input pill autocomplete="off" id="search" @keydown=${o=>this._handleEnter(o)} placeholder="Search..." ?disabled=${this.loading} value=${new URLSearchParams(window.location.search).get("query")} class="" with-clear size="s"><wa-icon name="search" label="search" slot="end" @click=${this._search}></wa-icon></wa-input></li>
      <li class="rightside"><a href="#" class="forceAlign" @click=${this._toggleDark}><wa-icon name=${t?"moon":"sun"}></wa-icon></a></li>
      ${this.user?"":c`<li><a href="#" class="forceAlign" @click=${o=>this._navigateTo("/~/settings")}><wa-icon name="gear"></wa-icon></a></li>`}
      <li class="dropdown">
      <a href="#">${this.selectedServer!==void 0?this.servers[this.selectedServer]:"Select Server"}</a>
      <div class="dropdown-content">
      ${this.servers.map(o=>c`<a href="#" @click=${r=>this._serverNavigate(this.servers.indexOf(o),r)}>${o}</a>`)}
      </div></li>
      <li class="${this.user?"dropdown":""}">${this.user?c`
      <a href="#">${this.user.user}</a>
      <div class="dropdown-content right-dropdown">
      <a href="/~/settings/" @click=${o=>this._navigateTo("/~/settings/")}>Settings</a>
      ${!this.loading&&this.user&&(this.user.role=="staff"||this.user.role=="admin")?c`<a href="/~/myrecoms" @click=${o=>this._navigateTo("/~/myrecoms")}>My Recommendations</a>`:""}
      ${!this.loading&&this.user&&(this.user.role=="admin"||this.user.role=="staff")?c`<a href="/~/viewgroups" @click=${o=>this._navigateTo("/~/viewgroups")}>My Group Prices</a>`:""}
      ${!this.loading&&this.user&&this.user.role=="admin"?c`<a href="/~/adminpanel" @click=${o=>this._navigateTo("/~/adminpanel")}>Admin Panel</a>`:""}
      </div>
      `:c`<discord-login-btn></discord-login-btn>`}</li></ul>
      </div>
      <div class="submit-box" ?hidden=${!this.submitVisible||this.submitCount<1}>
      <wa-button variant="brand" pill @click=${this._dispatchModal} size="s">Submit ${this.submitCount} Item Price${this.submitCount>1?"s":""}</wa-button>
      </div>
      </header>
    `}};x(Ye,"properties",{user:{type:Object},servers:{type:Array},openDropdown:{type:String},submitVisible:{type:Boolean},submitCount:{type:Number},rootSelectedServer:{type:Number}}),x(Ye,"styles",[z,w`
    
    :host {
    display: block;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 12px 24px var(--color-glow);
  }

    .navbar {
      background-color: var(--color-navbar);
      color: white;
      position: -webkit-sticky;
      position: sticky;
      z-index: 1000;
      top: 0;
      margin: 0;
      padding: 0;
    }

    .navbar-content {
    border-bottom: 3px solid var(--color-navbar-accent);
    }

    .discord-btn {
    text-align: right;
    }
    
    ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: var(--color-navbar);
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

ul li a, ul li.searchContainer {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  transition: background-color 0s ease;
}

ul li discord-login-btn {
display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

ul li a:hover, ul li.searchContainer:hover {
  background-color: var(--color-navbar-hover);
}

.submit-box {
text-align: center;
width: 100%;
border-bottom: 2px solid var(--color-navbar-accent)
}

.submit-box wa-button {
padding: 10px 0px;
}
  `]);customElements.define("top-navbar",Ye);var Do=class extends L{_openInNewTab(t,o){o&&o.preventDefault(),window.open(t)}render(){return c`
            <footer>
            <sub>version 1.2.4 (October 17, 2026) &bull; created by pichuhat &bull; <a href="https://github.com/pichuhat/blossom-price" @click=${t=>this._openInNewTab("https://github.com/pichuhat/blossom-price",t)}>source</a></sub>
            </footer>
            `}};x(Do,"styles",[z,w`
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
        `]);customElements.define("site-footer",Do);var Xe=class extends L{render(){let t="https://discord.com/oauth2/authorize?client_id=1511812763901759648&response_type=code&redirect_uri=https%3A%2F%2Fblossom-price.onrender.com%2Fapi%2Fauth%2Fcallback&scope=guilds.members.read+identify";return c`
    <div class="center">
      <h1>BCpricer</h1>
      <discord-login-btn></discord-login-btn>
      <p>Login for Improved Functionality</p>
      </div>
    `}};x(Xe,"properties",{selectedServer:{type:Number}}),x(Xe,"styles",[z,w`
    .center {
    text-align: center;
    }

    a.select {
    font-size: 200%;
    margin-left: 5%;
    margin-right: 5%;
    width: 40%;
    }
  `]);customElements.define("guest-view",Xe);var Ke=class extends L{constructor(){super(),this.servers=["Cherry","Spirit","Lotus","Tulip"],this.selectedServer=void 0,this.countItems=null,this.countServerItems=null,this.recentItems=null,this.loading=!1}connectedCallback(){super.connectedCallback(),this._fetchAll()}async updated(t){t.has("selectedServer")&&this.selectedServer!=null&&(this.loading=!0,await this._fetchRecents(),this.loading=!1)}async _fetchAll(){this.loading=!0,await this._fetchCount(),this.loading=!1}async _fetchRecents(){let t=`/api/recents/${this.selectedServer}`;try{let o=await fetch(t);if(!o.ok)return window.alert("An error occurred. Type: 2");let r=await o.json();this.recentItems=r.result}catch(o){window.alert("An error occurred. Type: 3"),console.error(o)}}async _fetchCount(){let t="/api/countprices";try{let o=await fetch(t);if(!o.ok)return window.alert("An error occurred.");let r=await o.json();this.countItems=r.result}catch(o){window.alert("An error occurred."),console.error(o)}}render(){return c`
    <div class="center">
      <span class="biggerText">BlossomPricer</span><br>
      ${this.selectedServer!=null?c`
        <span class="bigText">${this.countItems?this.countItems:c`<wa-spinner></wa-spinner>`} items priced</span><br><span class="bigSubText">across all servers. </span><span class="bigSubText alt">And counting.</span>
        <h3>Recently Priced Items (${this.servers[this.selectedServer]})</h3>
        ${this.recentItems!=null&&!this.loading?c`<items-display .selectedServer=${this.selectedServer} .items=${this.recentItems}></items-display>`:c`<div class="center self-center"><wa-spinner></wa-spinner></div>`}
        `:c`
        <h3>Select a Subserver</h3>
        <div class="serverbox"><button class="select" @click=${()=>this._navigateToServer(0)}>Cherry</button><button class="select" @click=${()=>this._navigateToServer(1)}>Spirit</button><button class="select" @click=${()=>this._navigateToServer(2)}>Lotus</button><button class="select" @click=${()=>this._navigateToServer(3)}>Tulip</button></div>
        `}
      </div>
    `}_navigateToServer(t){localStorage.setItem("selectedServer",String(t)),this.selectedServer=t,window.history.pushState({},"",`/~/server/${t}`),window.dispatchEvent(new PopStateEvent("popstate"))}};x(Ke,"properties",{selectedServer:{type:Number},servers:{type:Array},countItems:{type:Number},recentItems:{type:Array},loading:{type:Boolean}}),x(Ke,"styles",[z,w`
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
  `]);customElements.define("home-view",Ke);var Ge=class extends L{constructor(){super(),this.loading=!0,this.maxPages=1,this.servers=["cherry","spirit","lotus","tulip"],this.selectedServer=void 0,this.formatter=new Intl.DateTimeFormat("en-US",{dateStyle:"long",timeStyle:"medium"})}connectedCallback(){super.connectedCallback(),this._fetchAll()}async _fetchAll(){await this._getMaxPages(),this._getSelectedPage(),await this._fetchItems()}_getSelectedPage(){let t=new URLSearchParams(window.location.search),o=Number(t.get("page"));if(isNaN(o)||Math.round(o)!=o||o>this.maxPages||o<1){this.page=1;return}this.page=o}_decodeEscapedUnicode(t){return typeof t!="string"?t:t.replace(/\\u([0-9a-fA-F]{4})/g,(o,r)=>String.fromCharCode(parseInt(r,16)))}async _getMaxPages(){try{let t=await fetch("/api/pagecount");if(!t.ok)throw new Error("Server fetch issue");let o=await t.json();this.maxPages=o.count}catch(t){console.error("Error loading max page count: "+t)}}async _fetchItems(){this.loading=!0;let t=`/api/allitems?page=${this.page}${this.selectedServer!=null?`&selectedServer=${this.selectedServer}`:""}`;console.log(t);try{let o=await fetch(t,{method:"GET",credentials:"include"});if(!o.ok)throw new Error("Server fetch issue");let r=await o.json();this.items=r.items}catch(o){console.error("Error loading allitems: "+o)}finally{this.loading=!1}}updated(t){t.has("selectedServer")&&this.page&&this._fetchItems()}_updateURL(){let t=new URL(window.location);t.searchParams.set("page",this.page),window.history.replaceState({},"",t)}_nextPage(){this.page++,this._updateURL(),this._fetchItems()}_previousPage(){this.page--,this._updateURL(),this._fetchItems()}_customPage(){let t=window.prompt("Enter page number 1-"+this.maxPages);t!==null&&(/^\d+$/.test(t.trim())&&t>0&&t<=this.maxPages?(this.page=Number(t),this._updateURL(),this._fetchItems()):window.alert("Invalid input"))}_routeToItemPage(t){let o=this.servers[this.selectedServer]||window.prompt("Enter a server name:");if(o){if(!this.servers.includes(o.toLowerCase()))return window.alert("That server does not exist!");this.dispatchEvent(new CustomEvent("nav-requested",{bubbles:!0,composed:!0,detail:{path:`/~/server/${this.servers.indexOf(o.toLowerCase())}/item/${t}`}}))}}_formatStr(t){return t?t.charAt(0).toUpperCase()+t.slice(1):""}_formatPrice(t){return Number(t).toLocaleString()}_formatDate(t){let o=new Date(t);return this.formatter.format(o)}render(){let t=this.page==1,o=this.page==this.maxPages;return c`
    <div class="center">
      <h1>All Items</h1>
      <span>Page ${this.page}/${this.maxPages}</span><br>
      <wa-button-group size="xxs" orientation="horizontal"><wa-button @click=${this._previousPage} ?disabled=${t||this.loading} variant="brand"><<<</wa-button><wa-button @click=${this._customPage} ?disabled=${this.loading} variant="brand">...</wa-button><wa-button @click=${this._nextPage} ?disabled=${o||this.loading} variant="brand">>>></wa-button></wa-button-group>
      </div>
      ${this.loading?c`<div class="grid"><wa-spinner></wa-spinner></div>`:c`<items-display .selectedServer=${this.selectedServer} .items=${this.items}></items-display>`}
    `}};x(Ge,"properties",{items:{type:Object},loading:{type:Boolean},page:{type:Number},maxPages:{type:Number},servers:{type:Array},selectedServer:{type:Number}}),x(Ge,"styles",[z,w`
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
      justify-content: center;
    }
    .center {
    text-align: center;
    }
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: fit-content;
      max-width: 100%;
      background-color: #2a2a2a;
      border: 1px solid #444;
      border-radius: 8px;
      padding: 16px;
      color: white;
      box-sizing: border-box;
      overflow: hidden;
      transition: ease 0.3s;
    }

    .card:hover {
    transform: scale(1.05);
    }

    .card img {
      display: block;
      width: auto;
      max-width: 100%;
      height: auto;
      border-radius: 6px;
      margin-top: 12px;
      object-fit: contain;
      min-width: 50%;
      min-height: 50%;
    }
    .priceAdd {
        font-size: 100%;
    }
    .price {
        color: #00ffcc;
        font-weight: bold;
        font-size: 130%;
    }
    .tags {
      margin-top: 10px;
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .tag {
      background-color: #bc4bc2;
      color: white;
      font-size: 80%;
      padding: 2px 8px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .minibutton {
    color: white;
    background-color: #bc2bc4;
    padding: 7px;
    border: none;
    transition: background-color 0.2s ease;
    }
    .minibutton:disabled {
    background-color: #aaaaaa;
    }
    .minibutton:hover {
    background-color: #831889;
    }
    .minibutton:hover:disabled {
    background-color: #aaaaaa;
    }
    .leftbutton {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    margin-right: 1px;
    }
    .rightbutton {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-left: 1px;
    }
  `]);customElements.define("all-item-view",Ge);var Je=class extends L{constructor(){super(),this.selectedServer=null,this.itemID=null,this.approvedOnly=!0,this.history=null,this.loading=!0,this.formatter=new Intl.DateTimeFormat("en-US",{dateStyle:"long",timeStyle:"medium"})}connectedCallback(){super.connectedCallback(),this._getHistory()}async _getHistory(){let t=this.approvedOnly?`/api/itemhistory/${this.selectedServer}/${this.itemID}`:`/api/itemrecom/${this.selectedServer}/${this.itemID}`;try{let o=await fetch(t,{method:"GET",credentials:"include"});if(!o.ok)return console.error("ERROR: Failed fetch",o);let r=await o.json();this.history=r.history}catch(o){throw new Error("ERROR: Failed fetch with issue"+o)}finally{this.loading=!1}}_formatDate(t){let o=new Date(t);return this.formatter.format(o)}_formatPrice(t){return Number(t).toLocaleString()}render(){return this.loading?c`Loading history...`:c`
    ${this.history&&this.history.length>0?c`
    <table>
        <thead>
            <tr>
            <th scope="col">Timestamp</th>
            <th scope="col">User</th>
            <th scope="col">Reported Price</th>
            </tr>
        </thead>
        <tbody>
            ${this.history.map(t=>c`<tr><td>${this._formatDate(t.recom_timestamp)}</td><td>${t.username}${wt(t.author_id)}</td><td>$${this._formatPrice(t.price)}${t.is_range?c` to $${this._formatPrice(t.max_price)}`:""}</td></tr>`)}
        </tbody>
    </table>
    `:c`No history to display :(`}
    `}};x(Je,"properties",{selectedServer:{type:Number},itemID:{type:Number},approvedOnly:{type:Boolean},history:{type:Object},loading:{type:Boolean}}),x(Je,"styles",[z,w`
    table, th, td {
        border: 1px var(--color-border) solid;
        padding: 10px;
        text-align: center;
    }
    
    table {
        border-collapse: collapse;
        margin: 0 auto;
        margin-top: 20px;
        width: 100%;
        color: var(--color-text);
    }`]);customElements.define("price-history",Je);var Qe=class extends L{constructor(){super(),this.loading=!1,this.selectedServer=null,this.selectedItem=null,this.itemData=null,this.currentValue="0",this.activeMenu="exact",this.currentMaxValue="0"}firstUpdated(){this.shadowRoot.getElementById("newprice").focus()}_handleInput(t){this.currentValue=t.target.value}_handleAltInput(t){this.currentMaxValue=t.target.value}_formatPrice(t){return isNaN(t)?"-":Number(t).toLocaleString()}_getReadValue(t){let o=t?this.currentMaxValue:this.currentValue;if(!o)return 0;let r=o;if(isNaN(r)){if(isNaN(r.slice(0,-1))||!["k","m"].includes(r.at(-1).toLowerCase()))return"-";{let i=Number(r.slice(0,-1));return r.at(-1).toLowerCase()=="k"?i*1e3:r.at(-1).toLowerCase()=="m"?i*1e6:"-"}}else return r>0?r:0}_closeMenu(t){t.preventDefault(),this.dispatchEvent(new CustomEvent("close-recom",{bubbles:!0,composed:!0}))}_handleKeydown(t){let o=this.shadowRoot.querySelector("#newprice"),r=o.value;t.key=="Enter"?(t.preventDefault(),this._uploadRecom()):t.key=="Escape"?this._closeMenu(t):t.key=="ArrowRight"&&o.selectionStart===o.selectionEnd&&o.selectionStart===r.length&&this._handleTabChange(t,"range")}_handleAltKeydown(t,o){let r=o?this.shadowRoot.querySelector("#newMaxPrice"):this.shadowRoot.querySelector("#newMinPrice"),i=r.value;t.key=="Enter"||t.key=="ArrowRight"&&!o&&r.selectionStart===r.selectionEnd&&r.selectionStart===i.length?(t.preventDefault(),o?this._uploadRecom(!0):this.shadowRoot.querySelector("#newMaxPrice").focus()):t.key=="Escape"?this._closeMenu(t):t.key=="ArrowLeft"&&o&&r.selectionStart===r.selectionEnd&&r.selectionStart==0?(t.preventDefault(),this.shadowRoot.querySelector("#newMinPrice").focus()):t.key=="ArrowLeft"&&r.selectionStart===r.selectionEnd&&r.selectionStart==0&&this._handleTabChange(t,"exact")}_redFlash(t){let o=t?this.shadowRoot.querySelector("#minPriceDisplay"):this.shadowRoot.querySelector("#priceDisplay");clearTimeout(this.flashTimeout),o.classList.add("red"),this.flashTimeout=setTimeout(()=>{o.classList.remove("red")},400)}_maxRedFlash(){let t=this.shadowRoot.querySelector("#maxPriceDisplay");clearTimeout(this.maxFlashTimeout),t.classList.add("red"),this.maxFlashTimeout=setTimeout(()=>{t.classList.remove("red")},400)}_validatePrice(t){return!(!t||isNaN(t)||t<=0||t>5e7||Math.round(t)!=t)}async _uploadRecom(t){this.loading=!0;let o=this._getReadValue(),r=null;if(!this._validatePrice(o)){this._redFlash(!!t),this.loading=!1;return}let i={item_id:this.selectedItem,server_id:this.selectedServer,price:o,is_range:!!t};if(t){if(r=this._getReadValue(!0),!this._validatePrice(r)){this._maxRedFlash(),this.loading=!1;return}i.max_price=r}try{let a=await fetch("/api/recommend",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i),credentials:"include"});if(!a.ok)return console.log(a);let s=await a.json();s.success?(Kt("<strong>Success</strong><br>Your price recommendation was submitted and is awaiting approval.",{variant:"success",icon:"circle-check",allowHtml:!0}),this.dispatchEvent(new CustomEvent("close-recom",{bubbles:!0,composed:!0}))):(window.alert("An unknown error occurred."),console.log(s.message))}catch(a){window.alert("An error occurred."),console.error(a)}finally{this.loading=!1}}_handleTabChange(t,o){t.preventDefault(),this.activeMenu=o,this.updateComplete.then(()=>this.shadowRoot.querySelector(this.activeMenu=="range"?"#newMinPrice":"#newprice").focus())}render(){return c`
    <div class="newprice-dashboard">
      <div class="ASparams">
      <wa-button pill size="xs" class="leftbutton" @click=${t=>this._closeMenu(t)} ?disabled=${this.loading} variant="brand"><wa-icon name="times"></wa-icon></wa-button>
      <span class="bigText bigSubText">Recommend New Price</span>
      <br><sub><b>Price limit: $50,000,000</b></sub>
      <div class="outerbox">
      <wa-button-group class="self-center" orientation="horizontal">
      <wa-button variant="brand" value="exact" size="s" @click=${t=>this._handleTabChange(t,"exact")} ?disabled=${this.activeMenu==="exact"}>Exact Price</wa-button>
      <wa-button variant="brand" value="range" size="s" @click=${t=>this._handleTabChange(t,"range")} ?disabled=${this.activeMenu==="range"}>Price Range</wa-button>
      </wa-button-group></div>
      ${this.activeMenu=="exact"?c`
      <span class="bigText" id="priceDisplay">$${this._formatPrice(this._getReadValue())||"-"}</span>
      <br><input id="newprice" @input=${this._handleInput} @keydown=${t=>this._handleKeydown(t)} ?disabled=${this.loading}><br><br>
      <wa-button pill variant="brand" @click=${()=>this._uploadRecom(!1)} ?disabled=${this.loading}>Submit</wa-button>
      `:c`
      <div class="rangeDisplay">
      <div class="leftItem">
      <span class="bold">Range Minimum</span>
      <br><span class="bigSubText" id="minPriceDisplay">$${this._formatPrice(this._getReadValue())}</span>
      <br><input id="newMinPrice" @input=${this._handleInput} @keydown=${t=>this._handleAltKeydown(t,!1)} ?disabled=${this.loading}><br><br>
      </div>
      <div class="divider"></div>
      <div class="rightItem">
      <span class="bold">Range Maximum</span>
      <br><span class="bigSubText" id="maxPriceDisplay">$${this._formatPrice(this._getReadValue(!0))}</span>
      <br><input id="newMaxPrice" @input=${this._handleAltInput} @keydown=${t=>this._handleAltKeydown(t,!0)} ?disabled=${this.loading}><br><br>
      </div>
      </div><br>
      <wa-button pill variant="brand" @click=${()=>this._uploadRecom(!0)} ?disabled=${this.loading}>Submit</wa-button>
      `}
      </div>
      </div>
    `}};x(Qe,"properties",{loading:{type:Boolean},selectedServer:{type:Number},selectedItem:{type:Number},itemData:{type:Object},currentValue:{type:String},activeMenu:{type:String},currentMaxValue:{type:String}}),x(Qe,"styles",[z,w`
  .box {
    background-color: #222222;
    border: 1px solid #444444;
    border-radius: 8px;
    padding: 20px;
    color: white;
    text-align: center;
    width: 50%;
    position: relative;
    }

    .ASparams {
    position: relative;
    }

    .newprice-dashboard {
    width: 100%;
    margin-top: 20px;
    text-align: center;
    }

    .box {
      margin: 0 auto;
    }

    #newprice, #newMaxPrice, #newMinPrice {
    font-size: 150%;
    text-align: center;
    }

    input {
    width: 100%;
    box-sizing: border-box;
    }

    .leftbutton {
    position: absolute;
    top: 20px;
    left: 20px;
    }

    .outerbox {
      width: 100%;
      margin: 12px 0;
      text-align: center;
    }

    #priceDisplay, #minPriceDisplay, #maxPriceDisplay {
    color: var(--color-text);
    transition: color 0.4s ease;
    }
   #priceDisplay.red, #minPriceDisplay.red, #maxPriceDisplay.red {
    color: red;
    }

    .rangeDisplay {
    display: grid;
    grid-template-columns: 1fr 2px 1fr;
    gap: 20px;
    }

    .divider {
    background-color: var(--color-border);
    height: 100%;
    }
  `]);customElements.define("new-price",Qe);var Ze=class extends L{constructor(){super();x(this,"_handleGlobalKeydown",o=>{!this.openPriceRecom&&o.key=="Enter"&&(this.user.role=="staff"||this.user.role=="admin")&&(this.openPriceRecom=!0)});this.user=null,this.itemData=null,this.selectedServer=null,this.loading=!0,this.openPriceRecom=!1,this.formatter=new Intl.DateTimeFormat("en-US",{dateStyle:"long",timeStyle:"medium"}),this.properPricing=!0,this.hasPending=!1,this.hasUserPending=!1,this.ALLOWED_STYLE_PROPS={color:/^#[0-9a-fA-F]{3,8}$/,"font-weight":/^(bold|normal|[1-9]00)$/}}connectedCallback(){super.connectedCallback(),this.addEventListener("close-recom",o=>{this.openPriceRecom=!1,this.requestUpdate()}),Gt.addHook("uponSanitizeAttribute",(o,r)=>{if(r.attrName!=="style")return;let a=r.attrValue.split(";").map(s=>s.trim()).filter(Boolean).filter(s=>{let[l,...p]=s.split(":"),h=p.join(":").trim(),u=l?.trim().toLowerCase(),g=this.ALLOWED_STYLE_PROPS[u];return g&&g.test(h)});a.length===0?r.keepAttr=!1:r.attrValue=a.join("; ")}),window.addEventListener("keydown",this._handleGlobalKeydown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._handleGlobalKeydown)}async _fetchAll(){await this._getItemData()}async updated(o){let r=o.has("item")||o.has("selectedServer")&&this.item!=null&&this.selectedServer!=null,i=(r||o.has("user")&&this.selectedServer!=null&&this.item!=null)&&(this.user?.role==="staff"||this.user?.role==="admin");!r&&!i||(this.loading=!0,r&&await this._fetchAll(),i&&await this._getPending(),this.loading=!1)}async _getPending(){if(this.selectedServer==null||this.item==null)return;let o=`/api/checkpending/${this.selectedServer}/${this.item}`;try{let r=await fetch(o,{method:"GET",credentials:"include"});if(!r.ok)throw new Error("getPending: bad response");let i=await r.json();this.hasPending=i.isPending,this.hasUserPending=i.isPersonal}catch(r){throw window.alert("An error occurred while fetching pending prices."),new Error(r)}}async _getItemData(){if(this.selectedServer==null||this.item==null)return;let o="/api/item/"+this.selectedServer+"/"+this.item;try{let r=await fetch(o,{method:"GET",credentials:"include"});if(!r.ok)throw new Error("getItemData: bad response");let i=await r.json();this.itemData=i.item}catch(r){console.error("getItemData error: "+r)}finally{this.loading=!1}}get lowDataMode(){return localStorage.getItem("LDM")==="true"}_formatPrice(o){return Number(o).toLocaleString()}_formatDate(o){let r=new Date(o);return this.formatter.format(r)}_openPrice(){this.openPriceRecom=!0,this.requestUpdate()}async _getNextItem(o){let r=`/api/itemorder/${o?"previous":"next"}?id=${this.item}`;try{let i=await fetch(r,{method:"GET",credentials:"include"});if(!i.ok)return!1;let a=await i.json();return Number(a.id)}catch(i){return console.error(i),!1}}async _back(){this.loading=!0;let o=await this._getNextItem(!0);if(!o)return this.loading=!1;this.dispatchEvent(new CustomEvent("nav-requested",{bubbles:!0,composed:!0,detail:{path:`/~/server/${this.selectedServer}/item/${o}`}})),this.loading=!1}async _next(){this.loading=!0;let o=await this._getNextItem(!1);if(!o)return this.loading=!1;this.dispatchEvent(new CustomEvent("nav-requested",{bubbles:!0,composed:!0,detail:{path:`/~/server/${this.selectedServer}/item/${o}`}})),this.loading=!1}async _requestNewPrice(){if(this.user.role==="staff"||this.user.role==="admin"){let r=window.prompt("You're already a staff member. This tool is intended for general users. If you actually meant to do this, type 'confirm'.");if(!r||r.toLowerCase().trim()!=="confirm")return}let o=`/api/requestprice/${this.item}/${this.selectedServer}`;this.loading=!0;try{let r=await fetch(o,{method:"POST",credentials:"include"});if(!r.ok)return console.error(r),window.alert("An error occurred.");this.itemData.has_price_request=!0,Kt("<strong>Success</strong><br>Your price change request was submitted.",{variant:"success",icon:"circle-check",allowHtml:!0})}catch(r){console.error(r),Kt("<strong>Uh Oh!</strong><br>Something went wrong while submitting your price request.",{variant:"danger",icon:"circle-xmark",allowHtml:!0})}finally{this.loading=!1}}_decodeEscapedUnicode(o){return typeof o!="string"?o:o.replace(/\\u([0-9a-fA-F]{4})/g,(r,i)=>String.fromCharCode(parseInt(i,16)))}_sanitizeHTML(o){return this._decodeEscapedUnicode(Gt.sanitize(o,{ALLOWED_TAGS:["div","span","br"],ALLOWED_ATTR:["class","style"]}))}render(){let o=["Cherry","Spirit","Lotus","Tulip"];return this.loading||!this.itemData?c`<div class="center forceGap big-spinner"><wa-spinner></wa-spinner></div>`:(this.properPricing=this.itemData?.recom_timestamp&&this.itemData?.username,c`
    ${this.openPriceRecom?c`
        <new-price .itemData=${this.itemData} .selectedServer=${this.selectedServer} .selectedItem=${this.item}></new-price>
        `:""}
    <div class="dashboard">
<div class="profile-column">
    <div class="box">
    <wa-button-group orientation="horizontal"><wa-button size="s" variant="brand" ?disabled=${this.item===1||this.loading} @click=${this._back}><wa-icon name="angles-left"></wa-icon></wa-button><wa-button size="s" variant="brand" ?disabled=${this.item===999065||this.loading} @click=${this._next}><wa-icon name="angles-right"></wa-icon></wa-button></wa-button-group>
    <h1 class="center">${this.itemData.item_name}</h1>
    <div class="tagbox">
        ${this.itemData.tags?this.itemData.tags.map(r=>c`<span class="tag">${r}</span>`):""}
    </div>
    ${this.lowDataMode&&!this.itemData.tags.includes("spawner")&&!this.itemData.tags.includes("currency")?c`
    <div class="give-preview-text-outer">
        <div class="give-preview-text w-100">
        <div class="give-preview-text-inner text-start" style="text-align: left;">
            ${kt(this._sanitizeHTML(this.itemData.item_html))}
        </div>
        </div>
        </div>  
    `:c`
        <img
        src=${this.itemData.tags.includes("spawner")?"https://minecraft.wiki/images/Monster_Spawner_JE4.png":this.itemData.tags.includes("currency")?`/src/images/${this.itemData.img_src}`:`https://items.blossomcraft.org/static/images/BlossomCraft_Descriptions/${this.itemData.id}.png`}
        alt="${this._decodeEscapedUnicode(this.itemData.item_name)}"
        />
    `}
    </div>
</div>

<div class="market-column">
    <div class="box nogrow full">
    <span class="priceAdd">${o[this.selectedServer]} Price${this.itemData?.is_range?" Range":""}: </span><br><span class="price priceAdd">$${this.properPricing?`${this._formatPrice(this.itemData.price)}${this.itemData.is_range?` to $${this._formatPrice(this.itemData.max_price)}`:""}`:"-"}</span><br>
    <sub class="priceinfo">${this.properPricing?c`- ${this.itemData.username}${wt(this.itemData.author_id)}<br>${this._formatDate(this.itemData.recom_timestamp)}`:"No price available :("}</sub>

    ${this.user&&(this.user.role=="staff"||this.user.role=="admin")&&!this.openPriceRecom?c`<br><br>${this.hasPending?c`<wa-callout variant="warning"><wa-icon slot="icon" name="triangle-exclamation"></wa-icon><strong>${this.hasUserPending?"You already have a pending price submission!":"Another pending price submission already exists!"}</strong><br>Only submit another if you need to submit a different price.</wa-callout><br>`:""}<wa-button ?disabled=${this.loading} pill variant="brand" size="s" @click=${this._openPrice}>Recommend New Price (FOR STAFF)</wa-button>`:""}
    ${this.user?c`
        <br><br><wa-button ?disabled=${this.loading||this.itemData.has_price_request} pill size="xs" variant="brand" @click=${this._requestNewPrice}>${this.itemData.has_price_request?c`<wa-icon slot="start" name="check"></wa-icon>Price Request Submitted`:c`<wa-icon slot="start" name="hand"></wa-icon>Request Price${this.properPricing?" Change":" Set"}`}</wa-button>
        `:""}

</div>

<div class="box nogrow">
    <span class="boxheader priceAdd">Price Graph</span><br>
    Coming soon!
</div>

<div class="price-history box grow">
    <span class="priceAdd">Price History</span><br>
    <div class="table-scroll-container">
    <price-history .selectedServer=${this.selectedServer} .itemID=${this.item} .approvedOnly=true></price-history>
    </div>
</div>

</div>
    </div>

    `)}};x(Ze,"properties",{selectedServer:{type:Number},item:{type:Number},itemData:{type:Object},user:{type:Object},loading:{type:Boolean},openPriceRecom:{type:Boolean},hasPending:{type:Boolean},hasUserPending:{type:Boolean}}),x(Ze,"styles",[z,w`
    .center {
    text-align: center;
    }
    
    .dashboard {
        margin-top: 20px;
        display: grid;
        grid-template-columns: max-content 1fr; 
        align-items: stretch; 
        gap: 24px;
        margin: 20px auto 0 auto;
        width: min(900px, 90%);
        box-sizing: border-box;
    }

    .box {
    background-color: var(--color-surface-raised);
    border: 2px solid var(--color-border);
    border-radius: 8px;
    padding: 20px;
    color: var(--color-text);
    text-align: center;
    box-shadow: 0 0 0 1px var(--color-border), 0 4px 16px var(--color-glow);
    }

    .box img {
    object-fit: contain;
      min-width: 50%;
      min-height: 50%;
    }
    
    .profile-column {
        display: block;
        flex-shrink: 0;
    }
    
    .market-column {
        display: flex;
        flex-direction: column;  /* Stack cards vertically down the screen row by row */
        gap: 20px;               /* Clean distribution margins between stacked content elements */
        flex-grow: 1;
        height: 100%;
    }

    .tagbox {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 5px;
    padding-bottom: 10px;
    }

    .tag {
    background-color: #bc2bc4;
    color: white;
    font-size: 80%;
    text-transform: uppercase;
    padding: 4px 8px;
    border-radius: 2px;
    }
    
    h1 {
    text-align: center;
    }
    
    .priceAdd {
        font-size: 150%;
    }
    
    .price {
        color: var(--color-price);
        font-weight: bold;
        font-size: 200%;
    }


    .priceinfo {
        
    }

    .untrusted-warning {
        color: var(--wa-color-warning-fill-loud, #b7791f);
        cursor: help;
        font-size: 1rem;
        margin-inline-start: 0.2em;
        vertical-align: -0.15em;
    }
    
    table, th, td {
        border: 1px white solid;
        padding: 10px;
        text-align: center;
    }
    
    table {
        border-collapse: collapse;
        margin: 0 auto;
        margin-top: 20px;
        width: 100%;
        color: white;
    }
    
    .nogrow {
        flex-grow: 0;
    }
    
    .grow {
        flex-grow: 1;
        flex-direction: column;
        display: flex;
    }
    
    .table-scroll-container {
  flex-grow: 1;
  overflow-y: auto;
  max-height: 100%;
}
  `]);customElements.define("item-view",Ze);var to=class extends L{constructor(){super(),this.loading=!0,this.servers=["cherry","spirit","lotus","tulip"],this.selectedServer=null,this.items=null,this.formatter=new Intl.DateTimeFormat("en-US",{dateStyle:"long",timeStyle:"medium"})}connectedCallback(){super.connectedCallback(),this._fetchItems()}updated(t){t.has("selectedServer")&&this._fetchItems()}_decodeEscapedUnicode(t){return typeof t!="string"?t:t.replace(/\\u([0-9a-fA-F]{4})/g,(o,r)=>String.fromCharCode(parseInt(r,16)))}async _fetchItems(){this.loading=!0;try{let t=await fetch(`/api/spawners${this.selectedServer!=null?`?selectedServer=${this.selectedServer}`:""}`,{method:"GET",credentials:"include"});if(!t.ok)throw new Error("Server fetch issue");let o=await t.json();this.items=o.items}catch(t){console.error("Error loading spawners: "+t)}finally{this.loading=!1}}_routeToItemPage(t){let o=this.servers[this.selectedServer]||window.prompt("Enter a server name:");if(o){if(!this.servers.includes(o.toLowerCase()))return window.alert("That server does not exist!");this.dispatchEvent(new CustomEvent("nav-requested",{bubbles:!0,composed:!0,detail:{path:`/~/server/${this.servers.indexOf(o.toLowerCase())}/item/${t}`}}))}}_formatStr(t){return t?t.charAt(0).toUpperCase()+t.slice(1):""}_formatPrice(t){return Number(t).toLocaleString()}_formatDate(t){let o=new Date(t);return this.formatter.format(o)}render(){return this.loading?c`
    <h1>Spawners</h1>
    Please wait...
    `:c`
    <div class="center">
      <h1>Spawners (BETA)</h1>
      </div>
        <items-display .selectedServer=${this.selectedServer} .items=${this.items}></items-display>
    `}};x(to,"properties",{items:{type:Object},loading:{type:Boolean},servers:{type:Array},selectedServer:{type:Number}}),x(to,"styles",[z,w`
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
      justify-content: center;
    }
    .center {
    text-align: center;
    }
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: fit-content;
      max-width: 100%;
      background-color: #2a2a2a;
      border: 1px solid #444;
      border-radius: 8px;
      padding: 16px;
      color: white;
      box-sizing: border-box;
      overflow: hidden;
      transition: ease 0.3s;
    }

    .card:hover {
    transform: scale(1.05);
    }

    .card img {
      display: block;
      width: auto;
      max-width: 100%;
      height: auto;
      border-radius: 6px;
      margin-top: 12px;
    }
    .price {
      color: #00ffcc;
      font-weight: bold;
    }
    .tags {
      margin-top: 10px;
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .tag {
      background-color: #bc4bc2;
      color: white;
      font-size: 80%;
      padding: 2px 8px;
      border-radius: 4px;
      text-transform: uppercase;
    }
  `]);customElements.define("spawner-view",to);var eo=class extends L{constructor(){super(),this.selectedServer=void 0,this.servers=["cherry","spirit","lotus","tulip"],this.items=[],this.lowDataMode=!0,this.formatter=new Intl.DateTimeFormat("en-US",{dateStyle:"long",timeStyle:"medium"}),this.ALLOWED_STYLE_PROPS={color:/^#[0-9a-fA-F]{3,8}$/,"font-weight":/^(bold|normal|[1-9]00)$/}}get viewType(){return localStorage.getItem("viewType")===null?"standard":localStorage.getItem("viewType")}connectedCallback(){super.connectedCallback(),this._getLDMStatus(),Gt.addHook("uponSanitizeAttribute",(t,o)=>{if(o.attrName!=="style")return;let i=o.attrValue.split(";").map(a=>a.trim()).filter(Boolean).filter(a=>{let[s,...l]=a.split(":"),p=l.join(":").trim(),h=s?.trim().toLowerCase(),u=this.ALLOWED_STYLE_PROPS[h];return u&&u.test(p)});i.length===0?o.keepAttr=!1:o.attrValue=i.join("; ")})}_decodeEscapedUnicode(t){return typeof t!="string"?t:t.replace(/\\u([0-9a-fA-F]{4})/g,(o,r)=>String.fromCharCode(parseInt(r,16)))}_routeToItemPage(t){let o=this.servers[this.selectedServer]||window.prompt("Enter a server name:");if(o){if(!this.servers.includes(o.toLowerCase()))return window.alert("That server does not exist!");this.dispatchEvent(new CustomEvent("nav-requested",{bubbles:!0,composed:!0,detail:{path:`/~/server/${this.servers.indexOf(o.toLowerCase())}/item/${t}`}}))}}_formatStr(t){return t?t.charAt(0).toUpperCase()+t.slice(1):""}_formatPrice(t){return Number(t).toLocaleString()}_formatDate(t){let o=new Date(t);return this.formatter.format(o)}_handleLDM(t){this.lowDataMode=t.target.checked,localStorage.setItem("LDM",this.lowDataMode)}_getLDMStatus(){this.lowDataMode=JSON.parse(localStorage.getItem("LDM")??"true")}_sanitizeHTML(t){return this._decodeEscapedUnicode(Gt.sanitize(t,{ALLOWED_TAGS:["div","span","br"],ALLOWED_ATTR:["class","style"]}))}_checkDropdownPosition(t){console.log("Ran");let o=t.currentTarget,r=o.querySelector(".dropdown-content");if(!r)return;o.classList.remove("flip-up");let i=o.getBoundingClientRect(),a=r.offsetHeight;window.innerHeight-i.bottom<a&&(r.classList.add("flip-up"),console.log("Flipped"))}render(){return c`
        <div class="center">
        <div class="forceGap"><wa-switch ?checked=${this.lowDataMode} id="LDMtoggle" @change=${this._handleLDM}>Low Data Mode</wa-switch></div>
        ${this.viewType==="standard"?c`
        <div class="grid">${this.items.map(t=>c`
          <div class="card" @click="${()=>this._routeToItemPage(t.id)}">
            <h3>${this._decodeEscapedUnicode(t.item_name)}</h3>
            ${this.selectedServer!=null&&this.selectedServer!=null&&t.price&&t.recom_timestamp&&t.username?c`<div class="center">
            <span class="priceAdd">${this._formatStr(this.servers[this.selectedServer])} Price${t.is_range?" Range":""}: </span><br><span class="price">$${this._formatPrice(t.price)}${t.is_range?` to $${this._formatPrice(t.max_price)}`:""}</span><br><sub>-${t.username}${wt(t.author_id)}<br>${this._formatDate(t.recom_timestamp)}</sub>
            </div>`:c`<sub>No price available :(</sub>`}
            <div class="tags">
              ${t.tags?t.tags.map(o=>c`
                <span class="tag">${this._decodeEscapedUnicode(o)}</span>
              `):""}
            </div>
            ${this.lowDataMode&&!t.tags.includes("spawner")&&!t.tags.includes("currency")?c`
            <div class="give-preview-text-outer">
              <div class="give-preview-text w-100">
                <div class="give-preview-text-inner text-start" style="text-align: left;">
                  ${kt(this._sanitizeHTML(t.item_html))}
                </div>
              </div>
            </div>  
            `:c`
            <img
            src=${t.tags.includes("spawner")?"https://minecraft.wiki/images/Monster_Spawner_JE4.png":t.tags.includes("currency")?`/src/images/${t.img_src}`:`https://items.blossomcraft.org/static/images/BlossomCraft_Descriptions/${t.id}.png`}
            alt="${this._decodeEscapedUnicode(t.item_name)}"
            />
            `}
          </div>
        `)}</div>`:c`
        <div class="dashboard"><div class="fullcard">
        <sub>Table View is a BETA feature! If you're running into issues, disable it in the settings menu.</sub>
        <table>
        <thead>
            <tr>
            <th scope="col">Item Name</th>
            <th scope="col">Tags</th>
            ${this.selectedServer!=null&&this.selectedServer!=null?c`<th scope="col">${this._formatStr(this.servers[this.selectedServer])} Price</th><th scope="col">Extra Info</th>`:""}
            </tr>
        </thead>
        <tbody>
        ${this.items.map(t=>c`
          <tr class="itemTable" @click=${()=>this._routeToItemPage(t.id)}>
          <td class="dropdown" @mouseenter=${this._checkDropdownPosition}>
          <span class="fake-h3">${this._decodeEscapedUnicode(t.item_name)}</span>
          <div class="dropdown-content">
          ${this.lowDataMode&&!t.tags.includes("spawner")&&!t.tags.includes("currency")?c`
            <div class="give-preview-text-outer">
              <div class="give-preview-text w-100">
                <div class="give-preview-text-inner text-start" style="text-align: left;">
                  ${kt(this._sanitizeHTML(t.item_html))}
                </div>
              </div>
            </div>  
            `:c`
            <img
            src=${t.tags.includes("spawner")?"https://minecraft.wiki/images/Monster_Spawner_JE4.png":t.tags.includes("currency")?`/src/images/${t.img_src}`:`https://items.blossomcraft.org/static/images/BlossomCraft_Descriptions/${t.id}.png`}
            alt="${this._decodeEscapedUnicode(t.item_name)}"
            />
            `}
          </div>
          </td>
          <td><div class="tags internal">
              ${t.tags?t.tags.map(o=>c`
                <span class="tag">${this._decodeEscapedUnicode(o)}</span>
              `):"None :("}
          </div></td>
          ${this.selectedServer!=null&&this.selectedServer!=null?t.price&&t.recom_timestamp&&t.username?c`
          <td><span class="price">$${this._formatPrice(t.price)}${t.is_range?` to $${this._formatPrice(t.max_price)}`:""}</span></td><td><sub>-${t.username}${wt(t.author_id)}<br>${this._formatDate(t.recom_timestamp)}</sub></td>
            `:c`<td>None :(</td><td>`:""}
          

          </tr>
          `)}
        </tbody>
        </table>
        </div>
        </div>
        `}
        </div>`}};x(eo,"properties",{selectedServer:{type:Number},items:{type:Array},lowDataMode:{type:Boolean}}),x(eo,"styles",[z,w`

        `]);customElements.define("items-display",eo);var oo=class extends L{constructor(){super(),this.loading=!0,this.servers=["cherry","spirit","lotus","tulip"],this.selectedServer=null,this.formatter=new Intl.DateTimeFormat("en-US",{dateStyle:"long",timeStyle:"medium"}),this.searchBox=null,this.truncated=!1}connectedCallback(){super.connectedCallback(),this._onAppSearch=t=>{this.loading=!0,this._fetchItems()},window.addEventListener("app-search",this._onAppSearch)}disconnectedCallback(){window.removeEventListener("app-search",this._onAppSearch),super.disconnectedCallback()}firstUpdated(){this.searchBox=this.shadowRoot.querySelector("#search"),this._fetchItems()}_decodeEscapedUnicode(t){return typeof t!="string"?t:t.replace(/\\u([0-9a-fA-F]{4})/g,(o,r)=>String.fromCharCode(parseInt(r,16)))}_handleEnter(t){t.key=="Enter"&&(t.preventDefault(),this._search())}async _fetchItems(){let o=new URLSearchParams(window.location.search).get("query");this.searchBox.value=o,this.loading=!0;let r=`/api/search/simple?query=${o}${this.selectedServer!=null?`&selectedServer=${this.selectedServer}`:""}`;console.log(r);try{let i=await fetch(r,{method:"GET",credentials:"include"});if(!i.ok)throw new Error("Server fetch issue");let a=await i.json();this.items=a.result,this.truncated=a.truncated}catch(i){console.error("Error loading allitems: "+i)}finally{this.loading=!1}}_routeToItemPage(t){let o=this.servers[this.selectedServer]||window.prompt("Enter a server name:");if(o){if(!this.servers.includes(o.toLowerCase()))return window.alert("That server does not exist!");this.dispatchEvent(new CustomEvent("nav-requested",{bubbles:!0,composed:!0,detail:{path:`/~/server/${this.servers.indexOf(o.toLowerCase())}/item/${t}`}}))}}_search(){let t=this.shadowRoot.querySelector("#search").value;if(!t)return window.alert("You're supposed to... type something in the search box...");let o=`/~/search?query=${t}`;this.dispatchEvent(new CustomEvent("nav-requested",{detail:{path:o},bubbles:!0,composed:!0})),this._fetchItems()}updated(t){t.has("selectedServer")&&t.get("selectedServer")!==void 0&&this._fetchItems()}render(){return c`
    <div class="center">
    <h1>Search${this.items&&this.items.length>0&&!this.loading?" Results":""}</h1>
    <div class="outerbox">
    <div class="innerbox">
    ${this.truncated&&!this.loading?c`<wa-callout variant="warning"><wa-icon slot="icon" name="triangle-exclamation"></wa-icon><strong>Search Results Limited</strong><br>This search was limited to 150 items. Don't worry, this is a temporary fix!</wa-callout><br>`:""}
     <wa-input id="search" placeholder="Search..." ?disabled=${this.loading} @keydown=${t=>this._handleEnter(t)} value=${new URLSearchParams(window.location.search).get("query")} class="" with-clear size="s" autocomplete="off"><wa-icon name="search" label="search" slot="end" @click=${this._search}></wa-icon></wa-input> 
     </div>
      </div>
      </div>
      ${this.loading?c`<div class="grid"><wa-spinner></wa-spinner></div>`:this.items&&this.items.length>0?c`<items-display .selectedServer=${this.selectedServer} .items=${this.items}></items-display>`:c`<div class="grid">Search results will appear here!</div>`}
    `}};x(oo,"properties",{items:{type:Array},loading:{type:Boolean},servers:{type:Array},selectedServer:{type:Number}}),x(oo,"styles",[z,w`
  `]);customElements.define("search-view",oo);var ro=class extends L{constructor(){super(),this.loading=!1,this.query="",this.selectedCrate=null,this.selectedTags=[],this.minPrice=0,this.maxPrice=0,this.pricedOnly=!1,this.truncated=!1,this.crates=[],this.tags=[];let t=new URLSearchParams(window.location.search);this._buildInternalState(t),this._hasInitialParams=["query","crate","tags","minPrice","maxPrice","pricedOnly"].some(o=>t.has(o)),this._hasInitialExtraParams=["minPrice","maxPrice","pricedOnly"].some(o=>t.has(o)),this.additionalsOpen=this._hasInitialExtraParams}connectedCallback(){super.connectedCallback(),this._init()}async _init(){this.loading=!0;let[t,o]=await Promise.all([this._fetchTags(),this._fetchCrates()]);this.tags=t,this.crates=o,this._hasInitialParams?this.dispatchEvent(new CustomEvent("trigger-advanced-search",{bubbles:!0,composed:!0,detail:{params:this._buildSearchParams()}})):this.loading=!1}async _fetchTags(){let t="/api/taglist";try{let o=await fetch(t,{method:"GET",credentials:"include"});return o.ok?await o.json():window.alert("An error occurred.")}catch{window.alert("A crate fetch error occurred.")}}async _fetchCrates(){let t="/api/cratelist";try{let o=await fetch(t,{method:"GET",credentials:"include"});return o.ok?(await o.json()).result:window.alert("An error occurred.")}catch{window.alert("A crate fetch error occurred.")}}_formatPrice(t){return isNaN(Number(t))?!1:Number(t).toLocaleString()}_formatDate(t){let o=new Date(t);return this.formatter.format(o)}_getReadValue(t){if(t===0)return 0;if(!t)return!1;if(!isNaN(t))return Math.max(0,Number(t));let o=t.at(-1).toLowerCase(),r=Number(t.slice(0,-1));return isNaN(r)||!["k","m"].includes(o)?!1:r*(o==="k"?1e3:1e6)}_search(){let t=this._buildSearchParams();history.pushState(null,"",`?${t}`),this.dispatchEvent(new CustomEvent("trigger-advanced-search",{bubbles:!0,composed:!0,detail:{params:t}}))}_buildSearchParams(){let t=new URLSearchParams;this.query&&t.set("query",this.query),this.selectedCrate&&t.set("crate",this.selectedCrate),this.selectedTags.forEach(i=>t.append("tags",i)),this.pricedOnly&&t.set("pricedOnly","true");let o=this._getReadValue(this.minPrice),r=this._getReadValue(this.maxPrice);return o&&o!=="-"&&t.set("minPrice",o),r&&r!=="-"&&t.set("maxPrice",r),t}_buildInternalState(t){t.get("query")&&(this.query=t.get("query")),t.get("crate")&&(this.selectedCrate=t.get("crate")),t.get("tags")&&(this.tags=t.getAll("tags").map(o=>o.replaceAll(" ","_"))),t.get("pricedOnly")==="true"&&(this.pricedOnly=!0),t.get("minPrice")&&(this.minPrice=t.get("minPrice")),t.get("maxPrice")&&(this.maxPrice=t.get("maxPrice"))}render(){return console.log(this.minPrice,this.maxPrice),c`
    <div class="ASparams">
    ${this.truncated&&!this.loading?c`<wa-callout variant="warning"><wa-icon slot="icon" name="triangle-exclamation"></wa-icon><strong>Search Results Limited</strong><br>This search was limited to 150 items. Don't worry, this is a temporary fix!</wa-callout><br>`:""}
    <wa-input label="Search Term" id="search" placeholder="Search..." autocomplete="off" ?disabled=${this.loading} value=${this.query} @input=${t=>this.query=t.target.value}></wa-input>
    <br><wa-select label="Crate" id="crate" value=${this.selectedCrate||""} ?disabled=${this.loading} @change=${t=>this.selectedCrate=t.target.value}>
      <wa-option value="" ?selected=${!this.selectedCrate}>All</wa-option>
      ${this.crates.map(t=>c`<wa-option value=${t.id} ?selected=${this.selectedCrate==t.id}>${t.CrateName}</wa-option>`)}
      </wa-select>
      <br><wa-select label="Tags" id="tags" value=${this.selectedTags.join(" ")} placeholder="Select tags..." multiple with-clear ?disabled=${this.loading} @change=${t=>this.selectedTags=t.target.value?t.target.value.map(o=>o.replaceAll("_"," ")):[]}>
      ${this.tags.map(t=>c`<wa-option value=${t.replaceAll(" ","_")} ?selected=${this.selectedTags.includes(t)}>${t}</wa-option>`)}
      </wa-select>

      <br><wa-details summary="Additional Options" @wa-show=${()=>this.additionalsOpen=!0} @wa-hide=${()=>this.additionalsOpen=!1} .open=${this.additionalsOpen}>
      <div class="minMaxGroup">
      <wa-input label="Min Price" hint=${this._getReadValue(this.minPrice)?`Parsed Value: $${this._formatPrice(this._getReadValue(this.minPrice))}`:"No Minimum Price Set"} @input=${t=>this.minPrice=t.target.value} value=${this.minPrice||""} ?disabled=${this.loading} id="min-price"></wa-input>
      <wa-input label="Max Price" hint=${this._getReadValue(this.maxPrice)?`Parsed Value: $${this._formatPrice(this._getReadValue(this.maxPrice))}`:"No Maximum Price Set"} @input=${t=>this.maxPrice=t.target.value} value=${this.maxPrice||""} ?disabled=${this.loading} id="max-price"></wa-input></div>
      <br><wa-switch @change=${t=>this.pricedOnly=t.target.checked} .checked=${!!(this.pricedOnly||this._getReadValue(this.minPrice)||this._getReadValue(this.maxPrice))} ?disabled=${this.loading||this._getReadValue(this.minPrice)||this._getReadValue(this.maxPrice)} id="priced-only">Show Priced Items Only</wa-switch><br>
      <sub>${this._getReadValue(this.minPrice)||this._getReadValue(this.maxPrice)?"You set a min or max price, so this must be enabled.":"Setting a min or max price forces this to be enabled."}</sub>
      </wa-details>
      <br><wa-button @click=${this._search} variant="brand" ?disabled=${this.loading} ?loading=${this.loading}>Search</wa-button>
      </div>
      </div>`}};x(ro,"styles",[z,w`
      .minMaxGroup {
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
    }

    .minMaxGroup > * {
    flex: 1;
    }

    wa-details::part(details) {
    border: 1px #bc2bc4 solid;
    }
    `]),x(ro,"properties",{loading:{type:Boolean},query:{type:String,state:!0},selectedCrate:{type:Number,state:!0},selectedTags:{type:Array,state:!0},minPrice:{type:String,state:!0},maxPrice:{type:String,state:!0},pricedOnly:{type:Boolean,state:!0},truncated:{type:Boolean},crates:{type:Array,state:!0},tags:{type:Array,state:!0},additionalsOpen:{type:Boolean,state:!0}});customElements.define("advanced-search-params",ro);var io=class extends L{constructor(){super(),this.loading=!1,this.servers=["cherry","spirit","lotus","tulip"],this.selectedServer=null,this.formatter=new Intl.DateTimeFormat("en-US",{dateStyle:"long",timeStyle:"medium"}),this.crates=[],this.tags=[],this.selectedCrate=null,this.selectedTags=[],this.minPrice=0,this.maxPrice=0,this.pricedOnly=!1,this.inputValue=new URLSearchParams(window.location.search).get("query"),this.truncated=!1}connectedCallback(){super.connectedCallback(),this.addEventListener("trigger-advanced-search",this._fetchItems)}disconnectedCallback(){this.removeEventListener("trigger-advanced-search",this._fetchItems)}async _fetchItems(t){this.loading=!0;let o=t?.detail?.params||new URLSearchParams(window.location.search);[0,1,2,3].includes(Number(this.selectedServer))&&o.append("selectedServer",this.selectedServer),console.log(`${o}`);let r=`/api/search/advanced?${o}`;try{let i=await fetch(r,{method:"GET",credentials:"include"});if(!i.ok)throw new Error("Server fetch issue");let a=await i.json();this.truncated=a.truncated,this.items=a.result}catch(i){console.error("Error loading advanced search: "+i)}finally{this.loading=!1}}_formatPrice(t){if(!isNaN(Number(t)))return Number(t).toLocaleString()}_formatDate(t){let o=new Date(t);return this.formatter.format(o)}updated(t){let o=new URLSearchParams(window.location.search);t.has("selectedServer")&&["query","crate","tags","minPrice","maxPrice","pricedOnly"].some(r=>o.has(r))&&this._fetchItems()}_getReadValue(t){if(t===0)return 0;if(!t)return"-";if(!isNaN(t))return Math.max(0,Number(t));let o=t.at(-1).toLowerCase(),r=Number(t.slice(0,-1));return isNaN(r)||!["k","m"].includes(o)?"-":r*(o==="k"?1e3:1e6)}render(){return c`
    <div class="center outerbox">
    <h1>Advanced Search${this.items&&this.items.length>0?" Results":""} (BETA)</h1>

    <advanced-search-params .selectedServer=${this.selectedServer} .truncated=${this.truncated} .loading=${this.loading}></advanced-search-params>

      ${this.loading?c`<div class="grid"><wa-spinner></wa-spinner></div>`:c`
        ${this.items&&this.items.length>0?c`
          <items-display .selectedServer=${this.selectedServer} .items=${this.items}></items-display>
          `:c`<div class="grid">Search results will appear here!</div>`}
      `}
    `}};x(io,"properties",{items:{type:Object},loading:{type:Boolean},servers:{type:Array},selectedServer:{type:Number},crates:{type:Array}}),x(io,"styles",[z,w`
    .center {
    text-align: center;
    }
  `]);customElements.define("advanced-search-view",io);var ao=class extends L{constructor(){super(),this.post=null,this.loading=!0,this.defaultError=c`<div class="center"><h1>Uh oh!</h1>There was an error fetching that update. It may not exist.</div>`,this.content=this.defaultError}connectedCallback(){super.connectedCallback(),window.addEventListener("popstate",t=>{this._init()})}async _init(){this.loading=!0,await this._fetchContent(),this.loading=!1}willUpdate(t){t.has("post")&&this._fetchContent()}_routeToPage(t,o){o.preventDefault(),this.dispatchEvent(new CustomEvent("nav-requested",{bubbles:!0,composed:!0,detail:{path:`/~${t}`}}))}_formatPrice(t){return Number(t).toLocaleString()}_formatDate(t){let o=new Date(t);return this.formatter.format(o)}async _fetchContent(){let t=`/src/updates/${this.post}.html`;try{let o=await fetch(t,{method:"GET",credentials:"include"});if(!o.ok)return this.content=this.defaultError;this.content=await o.text()}catch(o){console.error(o),this.content=this.defaultError}finally{this.loading=!1,this.requestUpdate()}}render(){return c`
        <div class="self-center forceGap fullcard lock-width">
        ${this.loading?c`<div class="center big-spinner"><wa-spinner></wa-spinner></div>`:c`${kt(this.content)}`}
        </div>
        `}};x(ao,"properties",{post:{type:String}}),x(ao,"styles",[z,w`
  `]);customElements.define("site-updates",ao);var so=class extends L{constructor(){super(),this.loading=!1,this.user=void 0,this.loadLocation="",this._handleSettingChange=this._handleSettingChange.bind(this)}get darkMode(){return localStorage.getItem("theme")===null?!0:localStorage.getItem("theme")==="dark"}get lowDetailMode(){return localStorage.getItem("LDM")===null?!0:localStorage.getItem("LDM")==="true"}get viewType(){return localStorage.getItem("viewType")===null?"standard":localStorage.getItem("viewType")}get selectedServer(){return localStorage.getItem("selectedServer")===null||isNaN(Number(localStorage.getItem("selectedServer")))?"undefined":localStorage.getItem("selectedServer")}get toastPlacement(){return localStorage.getItem("toast-placement")}connectedCallback(){super.connectedCallback(),Ct.addEventListener("setting-changed",this._handleSettingChange)}disconnectedCallback(){super.disconnectedCallback(),Ct.removeEventListener("setting-changed",this._handleSettingChange)}_handleSettingChange(){this.requestUpdate()}_updateSetting(t,o){!t||!o||(localStorage.setItem(t,o),(t==="theme"||t==="selectedServer")&&Ct.dispatchEvent(new CustomEvent("navbar-change")))}async _logout(){this.loading=!0,this.loadingLocation="logout";try{if(!(await fetch("/api/auth/logout",{method:"POST",credentials:"include"})).ok)return window.alert("An error occurred while logging you out.");this.dispatchEvent(new CustomEvent("check-login",{detail:{},bubbles:!0,composed:!0}))}catch(t){console.log(t),window.alert("An error occurred while logging you out (2).")}finally{this.loading=!1,this.loadingLocation=""}}render(){return console.log("READ SS "+this.selectedServer),c`
        <div class="dashboard">
        <div class="fullcard">
        <span class="bigText">Settings</span>
        <br><sub>This is a new/beta feature! Changes may not be shown immediately.</sub>
        
        <div class="settings-box">
        <wa-switch ?disabled=${this.loading} ?checked=${this.darkMode} id="themeToggle" @change=${t=>{this._updateSetting("theme",t.target.checked?"dark":"light"),t.target.checked?document.documentElement.classList.add("wa-dark"):document.documentElement.classList.remove("wa-dark")}}>Dark Mode</wa-switch>
        <wa-switch ?disabled=${this.loading} ?checked=${this.lowDetailMode} id="LDMToggle" @change=${t=>{this._updateSetting("LDM",String(t.target.checked))}}>Low Detail Mode</wa-switch>
        
        <div style="min-width: 50%" class="self-center"><wa-select label="Item Display Type" ?disabled=${this.loading} @change=${t=>this._updateSetting("viewType",t.target.value)}>
        <wa-option value="standard" ?selected=${this.viewType==="standard"}>Standard View (Full Image)</wa-option>
        <wa-option value="table" ?selected=${this.viewType==="table"}>Compact View - BETA (Item Table)</wa-option>
        </wa-select>

        <br><wa-select label="Selected Server" ?disabled=${this.loading} @change=${t=>{this._updateSetting("selectedServer",t.target.value)}}>
        <wa-option value="undefined" ?selected=${!["0","1","2","3"].includes(this.selectedServer)}>None</wa-option>
        <wa-option value="0" ?selected=${this.selectedServer==="0"}>Cherry</wa-option>
        <wa-option value="1" ?selected=${this.selectedServer==="1"}>Spirit</wa-option>
        <wa-option value="2" ?selected=${this.selectedServer==="2"}>Lotus</wa-option>
        <wa-option value="3" ?selected=${this.selectedServer==="3"}>Tulip</wa-option>
        </wa-select>

        <br><wa-select label="Popup Location" ?disabled=${this.loading} @change=${t=>this._updateSetting("toast-placement",t.target.value)}>
        <wa-option value="top-start" ?selected=${this.toastPlacement==="top-start"}>Top Left</wa-option>
        <wa-option value="top-end" ?selected=${this.toastPlacement==="top-end"}>Top Right (Recommended)</wa-option>
        <wa-option value="bottom-start" ?selected=${this.toastPlacement==="bottom-start"}>Bottom Left</wa-option>
        <wa-option value="bottom-end" ?selected=${this.toastPlacement==="bottom-end"}>Bottom Right</wa-option>
        </wa-select>
        </div>

        <div ?hidden=${!this.user}>
        <wa-button ?disabled=${this.loading} ?loading=${this.loading&&this.loadLocation=="logout"} @click=${this._logout} variant="brand"><wa-icon name="right-from-bracket" slot="start"></wa-icon>Log Out</wa-button>   
        <wa-button hidden ?disabled=${this.loading} ?loading=${this.loading&&this.loadLocation=="deleteaccount"} @click=${this._deleteAccount} variant="danger"><wa-icon name="triangle-exclamation" slot="start"></wa-icon>Delete Account</wa-button></div>
        
        </div>
        </div>
        </div>
        `}};x(so,"properties",{loading:{type:Boolean},user:{type:Object}}),x(so,"styles",[z,w`
        .settings-box {
            display: flex;
            gap: 15px;
            flex-direction: column;
            align-items: center;
            margin-top: 15px;
        }
        `]);customElements.define("settings-view",so);var no=class extends L{constructor(){super(),this.loading=!0,this.selectedServer=null,this.formatter=new Intl.DateTimeFormat("en-US",{dateStyle:"long",timeStyle:"medium"}),this.crates=[],this.tags=[],this.selectedCrate=null,this.selectedTags=[],this.truncated=!1,this.items=[],this.selectedItems=[],this.visibleItems=[],this.lowDataMode=JSON.parse(localStorage.getItem("LDM")??!0),this.servers=["cherry","spirit","lotus","tulip"]}connectedCallback(){super.connectedCallback(),this._fetchAll()}disconnectedCallback(){super.disconnectedCallback()}_decodeEscapedUnicode(t){return typeof t!="string"?t:t.replace(/\\u([0-9a-fA-F]{4})/g,(o,r)=>String.fromCharCode(parseInt(r,16)))}async _fetchAll(){this.loading=!0,await this._fetchTags(),await this._fetchCrates(),this.loading=!1}async _fetchTags(){let t="/api/taglist";try{let o=await fetch(t,{method:"GET",credentials:"include"});if(!o.ok)return window.alert("An error occurred.");let r=await o.json();this.tags=r}catch{window.alert("A crate fetch error occurred.")}}async _fetchCrates(){let t="/api/cratelist";try{let o=await fetch(t,{method:"GET",credentials:"include"});if(!o.ok)return window.alert("An error occurred.");let r=await o.json();this.crates=r.result}catch{window.alert("A crate fetch error occurred.")}}async _fetchItems(){let t=new URLSearchParams(window.location.search),o=t.get("query");this.selectedCrate=t.get("crate")||!1,this.selectedTags=t.getAll("tags")||[];let r=`/api/search/advanced?query=${o}${this.selectedServer!=null?`&selectedServer=${this.selectedServer}`:""}${this.selectedCrate?`&crate=${this.selectedCrate}`:""}${this.selectedTags?this.selectedTags.map(i=>`&tags=${i}`).join(""):""}`;console.log(r);try{let i=await fetch(r,{method:"GET",credentials:"include"});if(!i.ok)throw new Error("Server fetch issue");let a=await i.json();this.truncated=a.truncated,this.items=a.result,this._setVisible()}catch(i){console.error("Error loading advanced search: "+i)}}_formatStr(t){return t?t.charAt(0).toUpperCase()+t.slice(1):""}_formatPrice(t){return!t||isNaN(t)||t===null?"-":Number(t).toLocaleString()}_formatDate(t){let o=new Date(t);return this.formatter.format(o)}_search(){let t=this.shadowRoot.querySelector("#search").value,o=this.shadowRoot.querySelector("#crate").value,r=this.shadowRoot.querySelector("#tags").value?this.shadowRoot.querySelector("#tags").value.map(a=>a.replaceAll("_"," ")):[];r&&(r=r.map(s=>`&tags=${s}`).join(""));let i=`/~/purchaseplan/new?query=${t}${o?`&crate=${o}`:""}${r||""}`;this.dispatchEvent(new CustomEvent("nav-requested",{detail:{path:i},bubbles:!0,composed:!0})),this.loading=!0,this._fetchItems().finally(()=>this.loading=!1)}async updated(t){t.has("selectedServer")&&(this.loading=!0,await this._fetchItems(),await this._updatePrices(),this.loading=!1)}_handleLDM(t){this.lowDataMode=t.target.checked,localStorage.setItem("LDM",this.lowDataMode),this.requestUpdate()}_setVisible(){let t=this.items,o=new Set(this.selectedItems.map(r=>r.id));t=t.filter(r=>!o.has(r.id)),this.visibleItems=t}_countUp(t){let o=this.selectedItems.findIndex(r=>r.id==t);isNaN(this.selectedItems[o].count)||this.selectedItems[o].count>=10||(this.selectedItems[o].count++,this.requestUpdate())}_countDown(t){let o=this.selectedItems.findIndex(r=>r.id==t);isNaN(this.selectedItems[o].count)||this.selectedItems[o].count<=1||(this.selectedItems[o].count--,this.requestUpdate())}_selectItem(t){let o=this.visibleItems.find(a=>a.id==t),r=this.visibleItems.findIndex(a=>a.id==t),i={...o,count:1};this.selectedItems.push(i),this.visibleItems.splice(r,1),this.requestUpdate()}_deselectItem(t){let o=this.selectedItems.find(i=>i.id==t),r=this.selectedItems.findIndex(i=>i.id==t);this.selectedItems.splice(r,1),this._setVisible(),this.requestUpdate()}_sanitizeHTML(t){return this._decodeEscapedUnicode(Gt.sanitize(t,{ALLOWED_TAGS:["div","span","br"],ALLOWED_ATTR:["class","style"]}))}_getTotalPrice(){let t=0,o=0;return this.selectedItems.forEach(r=>{t=t+Number(r.price)*r.count,r.is_range?o=o+Number(r.max_price)*r.count:o=o+Number(r.price)*r.count}),[t,o]}async _updatePrices(){if(this.selectedItems.length===0)return;let t=this.selectedItems.map(o=>o.id);try{let o=await fetch(`/api/itemset?server=${this.selectedServer}${t.map(i=>`&item=${i}`).join("")}`,{method:"GET",credentials:"include"});if(!o.ok)return window.alert("Couldn't update selected item prices for this server.");let r=await o.json();this.selectedItems.forEach(i=>{let a=r.result.find(s=>s.id===i.id);i.price=a.price,i.recom_timestamp=a.recom_timestamp,i.recommendation_id=a.recommendation_id,i.author_id=a.author_id,i.server=a.server,i.is_range=a.is_range,i.max_price=a.max_price||null,i.username=a.username||null})}catch(o){console.error(o),window.alert("Couldn't update selected item prices for this server.")}}async _createPlan(){this.loading=!0;try{let t=this.selectedItems.map(s=>({id:s.id,count:s.count})),o=this.shadowRoot.querySelector("#plan-name").value,r=this.shadowRoot.querySelector("#public-toggle").checked;if(!o)return window.alert("You must name your purchase plan.");if(o.length>50)return window.alert("This name is too long. It must be 50 characters or less.");if(!/^[\w ]+$/.test(o))return window.alert("Names cannot have any special characters except underscores.");let i=await fetch("/api/purchaseplan/new",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:t,server:Number(this.selectedServer),name:o,is_public:r})});if(!i.ok)return console.log(i),window.alert("Failed to upload.");let a=await i.json();this._navigateTo(`/~/purchaseplan/view/${a.redirect_id}`)}catch{window.alert("Failed to upload.")}finally{this.loading=!1}}_navigateTo(t,o){o&&o.preventDefault(),this.dispatchEvent(new CustomEvent("nav-requested",{detail:{path:t},bubbles:!0,composed:!0}))}render(){let t=this._getTotalPrice(),o=t[0],r=t[1],i=(o+r)/2,a=this.selectedItems?.some(s=>zo(s.author_id));return c`

      <div class="center">
        <h1>New Purchase Plan - Selected Items</h1>
        ${this.selectedItems&&this.selectedItems.length>0?c`
          <div class="dashboard">
            <div class="fullcard lockWidth">
            <span style="font-size: 125%"><strong>Total Price:</strong></span> <span class="price">$${this._formatPrice(i)}${a?Po(!0):""}</span>
            ${o===r?"":c`<br><sub>Actual: $${this._formatPrice(o)} to $${this._formatPrice(r)}</sub>`}
            <br><br><wa-switch id="public-toggle" ?disabled=${this.loading}>Make This Plan Public</wa-switch>
            <wa-input id="plan-name" label="Name" placeholder="Name your plan..." style="max-width: 70%; margin-left: auto; margin-right: auto;" ?disabled=${this.loading} size="s"></wa-input>
            <br><wa-button variant="brand" @click=${this._createPlan} ?disabled=${this.loading} size="s">Create Purchase Plan</wa-button>
              <table>
              <thead>
              <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Price per Item (${this._formatStr(this.servers[this.selectedServer])})</th>
              <th scope="col">Count</th>
              <th scope="col">Final Price</th>
              <th scope="col">Actions</th>
              </tr>
              </thead>
              <tbody>
              ${this.selectedItems.map(s=>c`
                <tr>
                <td><span class="fake-h3">${this._decodeEscapedUnicode(s.item_name)}</span></td>
                <td><span class="priceAdd">$${this._formatPrice(s.price)}${s.is_range?` to $${this._formatPrice(s.max_price)}`:""}${wt(s.author_id)}</span></td>
                <td><wa-button-group><wa-button variant="brand" square size="s" @click=${()=>this._countDown(s.id)} ?disabled=${this.loading||s.count<=1}>−</wa-button><wa-button size="s" style="pointer-events: none; opacity: 1; tabindex: -1;" variant="brand">${s.count||1}</wa-button><wa-button size="s" variant="brand" square ?disabled=${this.loading||s.count>=10} @click=${l=>this._countUp(s.id)}>+</wa-button></wa-button-group></td>
                <td>${s.is_range?c`<span class="price">$${this._formatPrice((Number(s.price)+Number(s.max_price))/2*(s.count||1))||"-"}</span><br><sub>Actual: $${this._formatPrice(Number(s.price)*(s.count||1))} to $${this._formatPrice(Number(s.max_price)*(s.count||1))}</sub>`:c`<span class="price">$${this._formatPrice(Number(s.price)*(s.count||1))}</span>`}</td>
                <td><wa-button variant="danger" @click=${()=>this._deselectItem(s.id)} ?disabled=${this.loading}><wa-icon name="trash-can"></wa-icon></wa-button></td>
                </tr>
                `)}
              </tbody>
              </table>
            </div>
          </div>
        `:c`Selected items will appear here!`}
      </div>

      <div class="center outerbox">
        <h1>Find Items</h1>
        <div class="ASparams">
          ${this.truncated&&!this.loading?c`<wa-callout variant="warning"><wa-icon slot="icon" name="triangle-exclamation"></wa-icon><strong>Search Results Limited</strong><br>This search was limited to 150 items. Don't worry, this is a temporary fix!</wa-callout><br>`:""}
          <wa-input label="Search Term" id="search" placeholder="Search..." autocomplete="off" ?disabled=${this.loading} value=${new URLSearchParams(window.location.search).get("query")}></wa-input>
          <br>
          <wa-select label="Crate" id="crate" value=${this.selectedCrate||""} ?disabled=${this.loading}>
            <wa-option value="" ?selected=${!this.selectedCrate}>All</wa-option>
            ${this.crates.map(s=>c`<wa-option value=${s.id} ?selected=${this.selectedCrate==s.id}>${s.CrateName}</wa-option>`)}
          </wa-select>
          <br>
          <wa-select label="Tags" id="tags" value=${this.selectedTags.join(" ")} placeholder="Select tags..." multiple with-clear ?disabled=${this.loading}>
            ${this.tags.map(s=>c`<wa-option value=${s.replaceAll(" ","_")} ?selected=${this.selectedTags.includes(s)}>${s}</wa-option>`)}
          </wa-select>
          <br>
          <wa-button @click=${this._search} variant="brand" ?disabled=${this.loading} ?loading=${this.loading}>Search</wa-button>
        </div>
      </div>

      ${this.loading?"":c`
        <div class="center">
          <strong>Click items to select them. Already selected items are hidden.</strong>
        </div>
      `}

      ${this.loading?c`<div class="grid"><wa-spinner></wa-spinner></div>`:c`
        ${this.visibleItems&&this.visibleItems.length>0?c`
          <div class="center">
            <div class="forceGap">
              <wa-switch ?checked=${this.lowDataMode} id="LDMtoggle" @change=${this._handleLDM}>Low Data Mode</wa-switch>
            </div>
            <div class="grid">
              ${this.visibleItems.map(s=>c`
                <div class="card" @click="${()=>this._selectItem(s.id)}">
                  <h3>${this._decodeEscapedUnicode(s.item_name)}</h3>
                  ${this.selectedServer!==void 0&&this.selectedServer!==null&&s.price&&s.recom_timestamp&&s.username?c`
                    <div class="center">
                      <span class="priceAdd">${this._formatStr(this.servers[this.selectedServer])} Price${s.is_range?" Range":""}: </span><br>
                      <span class="price">$${this._formatPrice(s.price)}${s.is_range?` to $${this._formatPrice(s.max_price)}`:""}</span><br>
                      <sub>-${s.username}${wt(s.author_id)}<br>${this._formatDate(s.recom_timestamp)}</sub>
                    </div>
                  `:c`<sub>No price available :(</sub>`}
                  
                  <div class="tags">
                    ${s.tags?s.tags.map(l=>c`
                      <span class="tag">${this._decodeEscapedUnicode(l)}</span>
                    `):""}
                  </div>
                  
                  ${this.lowDataMode&&!s.tags?.includes("spawner")&&!s.tags?.includes("currency")?c`
                    <div class="give-preview-text-outer">
                      <div class="give-preview-text w-100">
                        <div class="give-preview-text-inner text-start" style="text-align: left;">
                          ${kt(this._sanitizeHTML(s.item_html))}
                        </div>
                      </div>
                    </div>  
                  `:c`
                    <img
                      src=${s.tags?.includes("spawner")?"https://minecraft.wiki/images/Monster_Spawner_JE4.png":s.tags?.includes("currency")?`/src/images/${s.img_src}`:`https://items.blossomcraft.org/static/images/BlossomCraft_Descriptions/${s.id}.png`}
                      alt="${this._decodeEscapedUnicode(s.item_name)}"
                    />
                  `}
                </div>
              `)}
            </div>
          </div>
        `:c`<div class="grid">Search results will appear here!</div>`}
      `}
    `}};x(no,"properties",{items:{type:Array},loading:{type:Boolean},selectedServer:{type:Number},crates:{type:Array},selectedItems:{type:Array},visibleItems:{type:Array},lowDataMode:{type:Boolean}}),x(no,"styles",[z,w`
    .ASparams {
    position: relative;
    }

    .leftbutton {
    position: absolute;
    top: 20px;
    left: 20px;
    }

    .outerbox {
      width: 100%;
      margin: 12px 0;
      text-align: center;
    }
  `]);customElements.define("new-purchase-plan",no);var lo=class extends L{constructor(){super(),this.loading=!0,this.plan_id=null,this.itemData=[],this.planData={},this.editMode=!1,this.servers=["cherry","spirit","lotus","tulip"],this.formatter=new Intl.DateTimeFormat("en-US",{dateStyle:"long",timeStyle:"medium"}),this.user={},this.savePlanData={},this.saveItemData=[],this.selectedServer=void 0}_formatStr(t){return t?t.charAt(0).toUpperCase()+t.slice(1):""}_formatPrice(t){return!t||isNaN(t)||t===null?"-":Number(t).toLocaleString()}_formatDate(t){let o=new Date(t);return this.formatter.format(o)}connectedCallback(){super.connectedCallback(),this._fetchPlanData()}async _fetchPlanData(){if(!this.plan_id)return;this.loading=!0,this.notPublic=!1,this.notFound=!1,this.visible=!1;let t=`/api/purchaseplan/view/${this.plan_id}`;try{let o=await fetch(t,{method:"GET",credentials:"include"});if(!o.ok)return o.status===404?this.notFound=!0:o.status===403?this.notPublic=!0:window.alert("An error occurred.");let r=await o.json();this.itemData=r.items,this.planData=r.plan,this.visible=!0}catch(o){console.error(o),window.alert("An error occurred.")}finally{this.loading=!1}}_getTotalPrice(){let t=0,o=0;return this.itemData.forEach(r=>{let i=this.planData.items.find(a=>a.id===r.id);t=t+Number(r.price)*i.count,r.is_range?o=o+Number(r.max_price)*i.count:o=o+Number(r.price)*i.count}),[t,o]}_getRemainingPrice(){let t=this._getTotalPrice(),o=t[0],r=t[1];return this.itemData.forEach(i=>{let a=this.planData.items.find(s=>s.id===i.id);o=o-Number(i.price)*a.obtained,i.is_range?r=r-Number(i.max_price)*a.obtained:r=r-Number(i.price)*a.obtained}),[o,r]}async _updatePrices(){let t=this.itemData.map(o=>o.id);try{let o=await fetch(`/api/itemset?server=${this.planData.server_id}${t.map(i=>`&item=${i}`).join("")}`,{method:"GET",credentials:"include"});if(!o.ok)return window.alert("Couldn't update selected item prices for this server.");let r=await o.json();this.itemData.forEach(i=>{let a=r.result.find(s=>s.id===i.id);i.price=a.price,i.recom_timestamp=a.recom_timestamp,i.recommendation_id=a.recommendation_id,i.author_id=a.author_id,i.server=a.server,i.is_range=a.is_range,i.max_price=a.max_price||null,i.username=a.username||null})}catch(o){console.error(o),window.alert("Couldn't update item prices for this server.")}}_enterEditMode(){this.savePlanData=structuredClone(this.planData),this.saveItemData=structuredClone(this.itemData),this.editMode=!0}_exitEditMode(){this.planData=structuredClone(this.savePlanData),this.itemData=structuredClone(this.saveItemData),this.savePlanData={},this.saveItemData={},this.editMode=!1}_goalUp(t){let o=this.planData.items.findIndex(r=>r.id==t);isNaN(this.planData.items[o].count)||this.planData.items[o].count>=10||(this.planData.items[o].count++,this.requestUpdate())}_goalDown(t){let o=this.planData.items.findIndex(r=>r.id==t);isNaN(this.planData.items[o].count)||this.planData.items[o].count<=1||this.planData.items[o].count<=this.planData.items[o].obtained||(this.planData.items[o].count--,this.requestUpdate())}_obtainedUp(t){let o=this.planData.items.findIndex(r=>r.id==t);isNaN(this.planData.items[o].obtained)||this.planData.items[o].obtained>=this.planData.items[o].count||(this.planData.items[o].obtained++,this.requestUpdate())}_obtainedDown(t){let o=this.planData.items.findIndex(r=>r.id==t);isNaN(this.planData.items[o].obtained)||this.planData.items[o].obtained<=0||(this.planData.items[o].obtained--,this.requestUpdate())}_togglePublic(t){t&&t.preventDefault(),this.planData.is_public=!this.planData.is_public,this.requestUpdate()}_openModal(){this.openSelect=!0}_closeModal(){this.openSelect=!1}async _setPlanServer(t){![0,1,2,3].includes(t)||!this.editMode||(this.planData.server_id=t,this.openSelect=!1,this.loading=!0,this.visible=!1,await this._updatePrices(),this.loading=!1,this.visible=!0)}async _uploadEdits(){if(!this.editMode||this.planData===this.savePlanData)return;this.loading=!0;let t=JSON.stringify({items:this.planData.items,server:Number(this.planData.server_id),is_public:this.planData.is_public});try{let o=await fetch(`/api/purchaseplan/edit/${this.planData.id}`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:t});if(!o.ok)return console.log(o),window.alert("An error occurred. type: a");this.editMode=!1,this.saveItemData=[],this.savePlanData={}}catch(o){console.error(o),window.alert("An error occurred.")}finally{this.loading=!1}}render(){let t=this._getTotalPrice(),o=t[0],r=t[1],i=(o+r)/2,a=this._getRemainingPrice(),s=a[0],l=a[1],p=(s+l)/2;return c`
        <div ?hidden=${!this.openSelect||this.loading||!this.editMode} class="modal-overlay" @click=${this._closeModal}>
      <div class="modal-content center" @click=${h=>h.stopPropagation()}>
      <wa-button class="forceTopLeft" @click=${this._closeModal} size="s" pill><wa-icon name="x"></wa-icon></wa-button>
      <h3>Select Plan Server</h3>
      <wa-button-group><wa-button size="s" @click=${()=>this._setPlanServer(0)}>Cherry</wa-button><wa-button size="s" @click=${()=>this._setPlanServer(1)}>Spirit</wa-button><wa-button size="s" @click=${()=>this._setPlanServer(2)}>Lotus</wa-button><wa-button size="s" @click=${()=>this._setPlanServer(3)}>Tulip</wa-button></wa-button-group>
      </div>
    </div>

        <div class="center"><h1>${this.editMode?"Editing":"Viewing"} Purchase Plan</h1></div>
        <div class="dashboard">
        <div class="fullcard" style="position: relative;">

        ${this.editMode&&this.visible&&this.planData.user_id===this.user.id?c`<wa-button class="forceTopLeft" variant="danger" @click=${this._exitEditMode}><wa-icon name="x"></wa-icon></wa-button><wa-button class="forceTopRight" variant="brand" @click=${this._uploadEdits}><wa-icon name="check"></wa-icon></wa-button>`:this.visible&&this.planData.user_id===this.user?.id?c`<wa-button class="forceTopLeft" variant="brand" @click=${this._fetchPlanData}><wa-icon name="rotate"></wa-icon></wa-button><wa-button class="forceTopRight" variant="brand" @click=${this._enterEditMode}><wa-icon name="pen-to-square"></wa-icon></wa-button>`:this.visible&&!this.editMode?c`<wa-button class="forceTopLeft" variant="brand" @click=${this._fetchPlanData}><wa-icon name="rotate"></wa-icon></wa-button>`:dt}

        <span class="bigText">${this.loading?"Please wait...":this.notFound?"Plan Not Found":this.notPublic?"No Access":this.visible?`${this.planData?.name}${this.planData?.is_preset?" (PRESET)":""}`:"Uh Oh!"}</span>

        ${this.visible?c`<br><sub>by ${this.planData.username}<br>Created: ${this._formatDate(this.planData.created_at)}<br>Updated: ${this._formatDate(this.planData.updated_at)}</sub>`:""}
        ${this.loading?c`<div class="center forceGap big-spinner"><wa-spinner></wa-spinner></div>`:this.visible?"":c`<div class="bigIcon"><wa-icon name=${this.notFound?"file-circle-question":this.notPublic?"user-lock":"circle-question"}></wa-icon></div>`}
        ${this.visible||this.loading?dt:c`<p>${this.notFound?"Couldn't find the plan you were looking for. Sorry!":this.notPublic?"This purchase plan isn't public. Log in as its creator or ask the creator to make it public.":"You've reached a weird place. Reload to try again."}</p>`}
        
        ${this.visible&&this.editMode?c`<p>You are in <strong>Editing Mode.</strong></p>`:dt}
        
        ${this.visible?c`
            ${this.editMode?c`<p style="font-size: 105%;">This purchase plan is <a href="#" @click=${this._togglePublic} style="color: var(--color-text);"><strong>${this.planData?.is_public?"Public":"Private"} (<wa-icon style="font-size: 80%;" name="right-left"></wa-icon>)</strong></a> and uses <a href="#" @click=${()=>this.openSelect=!0} style="color: var(--color-text);"><strong>${this._formatStr(this.servers[this.planData.server_id])}</strong> (<wa-icon style="font-size: 80%" name="right-left"></wa-icon>)</a> prices.</p>`:c`<p style="font-size: 105%;">This purchase plan is <strong>${this.planData?.is_public?"Public":"Private"}</strong> and uses <strong>${this._formatStr(this.servers[this.planData.server_id])}</strong> prices.</p>`}
            <span style="font-size: 125%"><strong>Total Remaining Cost:</strong></span> <span class="price">$${this._formatPrice(p)} of $${this._formatPrice(i)}${this.itemData.some(h=>zo(h.author_id))?Po(!0):""}</span>
            ${o===r&&s===l?"":c`<br><sub>Actual: ${s===l?this._formatPrice(p):c`$${this._formatPrice(s)} to $${this._formatPrice(l)}`} of ${o===r?this._formatPrice(i):c`$${this._formatPrice(o)} to $${this._formatPrice(r)}`}</sub>`}
            <table>
            <thead>
            <th scope="col">Item</th>
            <th scope="col">Price per Item (${this._formatStr(this.servers[this.planData.server_id])})</th>
            ${this.editMode?c`<th scope="col"># Obtained</th><th scope="col"># Goal</th>`:c`<th scope="col"># Obtained / Goal</th>`}
            <th scope="col">Total Price</th>
            <th scope="col">Remaining Price</th>
            </thead>
            <tbody>
            ${this.itemData.map(h=>{let u=this.planData.items.find(_=>_.id===h.id),g=h.is_range?(Number(h.price)+Number(h.max_price))/2*u.count:Number(h.price)*u.count,y=h.is_range?Number(h.price)*u.count:g,v=h.is_range?Number(h.max_price)*u.count:g,C=h.is_range?g-(Number(h.price)+Number(h.max_price))/2*u.obtained:g-Number(h.price)*u.obtained,S=h.is_range?y-Number(h.price)*u.obtained:C,E=h.is_range?v-Number(h.max_price)*u.obtained:C;return c`
                <tr>
                <td><span class="fake-h3">${h.item_name}</span></td>
                <td><span class="priceAdd">$${this._formatPrice(h.price)}${h.is_range?` to $${this._formatPrice(h.max_price)}`:""}${wt(h.author_id)}</span></td>
                ${this.editMode?c`<td><wa-button-group><wa-button variant="brand" square size="s" @click=${()=>this._obtainedDown(h.id)} ?disabled=${u.obtained<=0}>−</wa-button><wa-button size="s" style="pointer-events: none; opacity: 1; tabindex: -1;" variant="brand">${u.obtained}</wa-button><wa-button size="s" variant="brand" square ?disabled=${u.obtained>=u.count} @click=${_=>this._obtainedUp(h.id)}>+</wa-button></wa-button-group></td>
                    <td><wa-button-group><wa-button variant="brand" square size="s" @click=${()=>this._goalDown(h.id)} ?disabled=${u.count<=1||u.count<=u.obtained}>−</wa-button><wa-button size="s" style="pointer-events: none; opacity: 1; tabindex: -1;" variant="brand">${u.count}</wa-button><wa-button size="s" variant="brand" square ?disabled=${u.count>=10} @click=${_=>this._goalUp(h.id)}>+</wa-button></wa-button-group></td>`:c`<td><span class="fake-h3" style="font-size: 105%;">${u.obtained} of ${u.count}</span></td>`}
                <td><span class="price">$${this._formatPrice(g)}</span>${h.is_range?c`<br><sub>Actual: $${this._formatPrice(y)} to $${this._formatPrice(v)}</sub>`:""}</td>
                <td><span class="price">$${this._formatPrice(C)}</span>${h.is_range?c`<br><sub>Actual: $${this._formatPrice(S)} to $${this._formatPrice(E)}</sub>`:""}</td>
                </tr>
                `})}
            </tbody>
            </table>
        `:""}
        </div>
        </div>
        `}};x(lo,"properties",{loading:{type:Boolean,state:!0},plan_id:{type:Number},itemData:{type:Array,state:!0},planData:{type:Object,state:!0},editMode:{type:Boolean,state:!0},notPublic:{type:Boolean,state:!0},notFound:{type:Boolean,state:!0},visible:{type:Boolean,state:!0},user:{type:Object},openSelect:{type:Boolean,state:!0}}),x(lo,"styles",[z,w`

        `]);customElements.define("view-purchase-plan",lo);var co=class extends L{constructor(){super(),this.loading=!0,this.openSelect=!1,this.plans=[],this.presets=[],this.errorOccurred=!1,this.formatter=new Intl.DateTimeFormat("en-US",{dateStyle:"long",timeStyle:"medium"}),this.servers=["cherry","spirit","lotus","tulip"]}connectedCallback(){super.connectedCallback(),this._getAll()}async _getAll(){this.errorOccurred=!1,this.loading=!0,await this._getMyPlans(),await this._getPresets(),this.loading=!1}async _planHandler(){this.errorOccurred=!1,this.loading=!0,await this._getMyPlans(),this.loading=!1}async _presetHandler(){this.errorOccurred=!1,this.loading=!0,await this._getPresets(),this.loading=!1}async _getMyPlans(){this.plans=[];let t="/api/purchaseplan/my-plans";try{let o=await fetch(t,{method:"GET",credentials:"include"});if(!o.ok)return console.log(o),this.errorOccurred=!0;let r=await o.json();this.plans=r.result}catch(o){console.error(o),this.errorOccurred=!0}}async _getPresets(){this.presets=[];let t="/api/purchaseplan/presets";try{let o=await fetch(t,{method:"GET",credentials:"include"});if(!o.ok)return console.log(o),this.errorOccurred=!0;let r=await o.json();this.presets=r.result}catch(o){console.error(o),this.errorOccurred=!0}}_navigateTo(t,o){o&&o.preventDefault(),this.dispatchEvent(new CustomEvent("nav-requested",{detail:{path:t},bubbles:!0,composed:!0}))}_formatStr(t){return t?t.charAt(0).toUpperCase()+t.slice(1):""}_formatPrice(t){return!t||isNaN(t)||t===null?"-":Number(t).toLocaleString()}_formatDate(t){let o=new Date(t);return this.formatter.format(o)}async _createFromPreset(t){let o=Number(this.shadowRoot.querySelector("#modal-server").value),r=this.shadowRoot.querySelector("#modal-make-public").checked;if(!(!t||![0,1,2,3].includes(o)||typeof r!="boolean"))try{this.loading=!0;let i=this.presets.find(p=>p.id===t);if(!i)return window.alert("An error occurred.");let a={items:i.items,server:o,is_public:r,name:i.name},s=await fetch("/api/purchaseplan/new",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});s.ok||window.alert("An error occurred.");let l=await s.json();this._navigateTo(`/~/purchaseplan/view/${l.redirect_id}`)}catch(i){window.alert("An error occurred."),console.error(i)}finally{this.loading=!1}}_handleModal(t,o){console.log("ran"),o&&o.stopPropagation(),this.selectedPreset=t,this.openSelect=!0}render(){return c`
        <div ?hidden=${!this.openSelect} class="modal-overlay" @click=${()=>this.openSelect=!1}>
      <div class="modal-content center" @click=${t=>t.stopPropagation()}>
      <wa-button class="forceTopLeft" variant="brand" @click=${()=>this.openSelect=!1} size="s" pill><wa-icon name="x"></wa-icon></wa-button>
      <h3>Copying Preset</h3>
      <wa-switch id="modal-make-public" ?disabled=${this.loading}>Make This Plan Public</wa-switch><br>
      <div style="min-width: 50%" class="self-center"><wa-select label="Server" hint="This plan will use prices on this server." id="modal-server" ?disabled=${this.loading}>
        <wa-option value="0">Cherry</wa-option>
        <wa-option value="1">Spirit</wa-option>
        <wa-option value="2">Lotus</wa-option>
        <wa-option value="3">Tulip</wa-option>
        </wa-select></div><br>
        <wa-button @click=${()=>this._createFromPreset(this.selectedPreset)} ?disabled=${this.loading} variant="brand">Copy Preset</wa-button>
      </div>
    </div>

        <h1 class="center">Purchase Plans - Home</h1>
        <div class="dashboard">
        <div class="fullcard" style="position: relative;">
        ${this.loading?dt:c`<wa-button class="forceTopLeft" variant="brand" @click=${this._planHandler}><wa-icon name="rotate"></wa-icon></wa-button><wa-button class="forceTopRight" variant="brand" @click=${t=>this._navigateTo("/~/purchaseplan/new",t)}><wa-icon name="plus"></wa-icon></wa-button>`}
        <h1>${this.loading?"Please Wait...":this.errorOccurred?"Uh Oh!":"My Purchase Plans"}</h1>
        ${this.loading?c`<div class="big-spinner center self-center"><wa-spinner></wa-spinner></div>`:this.errorOccurred?c`<p>An error occurred while loading your purchase plans.</p>`:this.plans.length<1?c`
            <div class="bigIcon"><wa-icon name="clipboard-question"></wa-icon></div>
            <p>You don't have any purchase plans yet.</p>
            `:c`
            <table>
            <thead>
            <th scope="col">Plan Name</th>
            <th scope="col"># Items Remaining / Total</th>
            <th scope="col">Visibility</th>
            <th scope="col">Server</th>
            <th scope="col">Last Updated</th>
            <th scope="col">Open</th>
            </thead>
            <tbody>
            ${this.plans.map(t=>{let o=0,r=0;return t.items.forEach(i=>{o=o+i.count,r=r+i.count-i.obtained}),c`
                <tr class="clickTable" @click=${i=>this._navigateTo(`/~/purchaseplan/view/${t.id}`,i)}>
                <td><span class="fake-h3">${t.name}</span></td>
                <td>${r} of ${o}</td>
                <td>${t.is_public?"Public":"Private"}</td>
                <td>${this._formatStr(this.servers[t.server_id])}</td>
                <td>${this._formatDate(t.updated_at)}</td>
                <td><wa-button size="s" variant="brand"><wa-icon name="arrow-up-right-from-square"></wa-icon></wa-button></td>
                </tr>
                `})}
            </tbody>
            </table>
            `}
        </div>
        </div>
        <div class="dashboard">
        <div class="fullcard" style="position: relative;">
        <wa-button class="forceTopLeft" variant="brand" @click=${this._presetHandler}><wa-icon name="rotate"></wa-icon></wa-button>
        <h1>Presets</h1>
        ${this.errorOccurred?c`<p>An error occurred, and presets couldn't be loaded.</p>`:this.loading?c`Please wait...`:this.presets.length<1?c`<div class="bigIcon"><wa-icon name="clipboard-question"></wa-icon></div><p>Couldn't find any presets.</p>`:c`
            <table>
            <thead>
            <th scope="col">Preset Name</th>
            <th scope="col"># Items</th>
            <th scope="col">Creator</th>
            <th scope="col">Last Updated</th>
            <th scope="col">Copy</th>
            </thead>
            <tbody>
            ${this.presets.map(t=>{let o=0;return t.items.forEach(r=>{o=o+r.count}),c`
                <tr class="clickTable" @click=${r=>this._navigateTo(`/~/purchaseplan/view/${t.id}`,r)}>
                <td><span class="fake-h3">${t.name}</span></td>
                <td>${o}</td>
                <td>${t.username}</td>
                <td>${this._formatDate(t.updated_at)}</td>
                <td @click=${r=>this._handleModal(t.id,r)}><wa-button variant="brand"><wa-icon name="copy"></wa-icon></wa-button></td>
                </tr>
                `})}
            </tbody>
            </table>
        </div>
        `}
        </div>
        `}};x(co,"properties",{loading:{type:Boolean,state:!0},plans:{type:Array,state:!0},errorOccurred:{type:Boolean,state:!0},presets:{type:Array,state:!0},openSelect:{type:Boolean,state:!0}}),x(co,"styles",[z,w``]);customElements.define("my-purchase-plans",co);var Jr=w`
  :host {
    --tag-max-size: 10ch;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);
  }

  /* Add ellipses to multi select options */
  :host wa-tag::part(content) {
    display: initial;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: var(--tag-max-size);
  }

  :host .disabled [part~='combobox'] {
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  :host .enabled:is(.open, :focus-within) [part~='combobox'] {
    outline-color: var(--wa-color-focus);
  }

  /** The popup */
  .select {
    flex: 1 1 auto;
    display: inline-flex;
    width: 100%;
    position: relative;
    vertical-align: middle;

    /* Pass through from select to the popup */
    --show-duration: inherit;
    --hide-duration: inherit;

    &::part(popup) {
      z-index: 900;
    }

    &[data-current-placement^='top']::part(popup) {
      transform-origin: bottom;
    }

    &[data-current-placement^='bottom']::part(popup) {
      transform-origin: top;
    }
  }

  /* Combobox */
  .combobox {
    flex: 1;
    display: flex;
    width: 100%;
    min-width: 0;
    align-items: center;
    justify-content: start;

    min-height: var(--wa-form-control-height);

    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    color: var(--wa-form-control-value-color);
    cursor: pointer;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    overflow: hidden;
    padding: 0 var(--wa-form-control-padding-inline);
    position: relative;
    vertical-align: middle;
    transition:
      background-color var(--wa-transition-normal),
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    /* Pills */
    :host([pill]) & {
      border-radius: var(--wa-border-radius-pill);
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .combobox {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .combobox {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  .display-input {
    position: relative;
    width: 100%;
    font: inherit;
    border: none;
    background: none;
    line-height: var(--wa-form-control-value-line-height);
    color: var(--wa-form-control-value-color);
    cursor: inherit;
    overflow: hidden;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
    }
  }

  /* Manage spacing when tags are present */
  :host([multiple]) {
    --_padding-with-tags: calc(var(--wa-form-control-height) * 0.1 - var(--wa-form-control-border-width));

    & .combobox:has(.tags wa-tag) {
      padding-block: var(--_padding-with-tags);
      padding-inline-start: var(--_padding-with-tags);
    }
  }

  /* Visually hide the display input when multiple is enabled */
  :host([multiple]) .combobox:has(.tags wa-tag) .display-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .value-input {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    padding: 0;
    margin: 0;
  }

  .tags {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.25em;

    /* Nested inside the box, so a step down from the box's radius */
    & wa-tag:not([pill]) {
      border-radius: var(--wa-border-radius-s);
    }

    .disabled & {
      cursor: not-allowed !important;
    }
  }

  /* Start and End */

  .start,
  .end {
    flex: 0;
    display: inline-flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
  }

  .end::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  .start::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  :host([multiple]) .combobox:has(.tags wa-tag) .start::slotted(*) {
    margin-inline-start: calc(var(--wa-form-control-padding-inline) - var(--_padding-with-tags));
  }

  /* Clear button */
  [part~='clear-button'] {
    flex: 0 0 auto;
    display: inline-flex;
    align-self: stretch;
    align-items: center;
    justify-content: center;
    inline-size: 1.5em;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    background: none;
    padding: 0;
    transition: color var(--wa-transition-normal);
    cursor: pointer;
    /* The box is wider than the glyph, so overhang half that growth on each side. Keeps the glyph
       on the same trailing axis as the segmented-field pickers' clear buttons. */
    margin-inline-start: calc(var(--wa-form-control-padding-inline) - 0.125em);
    margin-inline-end: -0.125em;

    &:focus {
      outline: none;
    }

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }
  }

  /* Expand icon */
  .expand-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-neutral-on-quiet);
    transition: rotate var(--wa-transition-slow) var(--wa-transition-easing);
    rotate: 0deg;
    margin-inline-start: var(--wa-form-control-padding-inline);

    .open & {
      rotate: -180deg;
    }
  }

  /* Listbox */
  .listbox {
    display: block;
    position: relative;
    font: inherit;
    box-shadow: var(--wa-shadow-m);
    background: var(--wa-color-surface-raised);
    border-color: var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    border-style: var(--wa-border-style);
    border-width: var(--wa-border-width-s);
    padding: 0.25em;
    overflow: auto;
    overscroll-behavior: none;

    /* Make sure it adheres to the popup's auto size */
    max-width: var(--auto-size-available-width);
    max-height: var(--auto-size-available-height);

    &::slotted(wa-divider) {
      --spacing: 0.5em;
    }
  }

  /* Space options with half the listbox's padding */
  .listbox slot:not([name]) {
    display: flex;
    flex-direction: column;
    gap: 0.125em;
  }

  slot:not([name])::slotted(small) {
    display: block;
    font-size: var(--wa-font-size-smaller);
    font-weight: var(--wa-font-weight-semibold);
    color: var(--wa-color-text-quiet);
    padding-block: 0.5em;
    padding-inline: 2.25em;
  }
`;function us(e,t){return{top:Math.round(e.getBoundingClientRect().top-t.getBoundingClientRect().top),left:Math.round(e.getBoundingClientRect().left-t.getBoundingClientRect().left)}}function ar(e,t,o="vertical",r="smooth"){let i=us(e,t),a=i.top+t.scrollTop,s=i.left+t.scrollLeft,l=t.scrollLeft,p=t.scrollLeft+t.offsetWidth,h=t.scrollTop,u=t.scrollTop+t.offsetHeight;(o==="horizontal"||o==="both")&&(s<l?t.scrollTo({left:s,behavior:r}):s+e.clientWidth>p&&t.scrollTo({left:s-t.offsetWidth+e.clientWidth,behavior:r})),(o==="vertical"||o==="both")&&(a<h?t.scrollTo({top:a,behavior:r}):a+e.clientHeight>u&&t.scrollTo({top:a-t.offsetHeight+e.clientHeight,behavior:r}))}var Jt=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};var Qt=class extends Event{constructor(e){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}};var Zt=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}};var te=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}};var To=class extends Event{constructor(){super("wa-clear",{bubbles:!0,cancelable:!1,composed:!0})}};var pe=[];function Io(e){_e(e),pe.push(e)}function _e(e){for(let t=pe.length-1;t>=0;t--)if(pe[t]===e){pe.splice(t,1);break}}function Ro(e){return pe.length>0&&pe[pe.length-1]===e}var Qr=(e={})=>{let{validationElement:t,validationProperty:o}=e;t||typeof document<"u"&&"createElement"in document&&(t=Object.assign(document.createElement("input"),{required:!0})),o||(o="value");let r={observedAttributes:["required"],message:t?.validationMessage,checkValidity(i){let a={message:"",isValid:!0,invalidKeys:[]};return(i.required??i.hasAttribute("required"))&&!i[o]&&(a.message=typeof r.message=="function"?r.message(i):r.message||"",a.isValid=!1,a.invalidKeys.push("valueMissing")),a}};return r};var ee=w`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* Treat wrapped labels, inputs, and hints as direct children of the host element */
  [part~='form-control'] {
    display: contents;
  }

  /* Label */
  :is([part~='form-control-label'], [part~='label']):has(*:not(:empty)),
  :is([part~='form-control-label'], [part~='label']).has-label {
    display: inline-flex;
    color: var(--wa-form-control-label-color);
    font-weight: var(--wa-form-control-label-font-weight);
    line-height: var(--wa-form-control-label-line-height);
    margin-block-end: 0.5em;
  }

  :host([required]) :is([part~='form-control-label'], [part~='label'])::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
    color: var(--wa-form-control-required-content-color);
  }

  /* Help text */
  [part~='hint'] {
    display: block;
    color: var(--wa-form-control-hint-color);
    font-weight: var(--wa-form-control-hint-font-weight);
    line-height: var(--wa-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--wa-font-size-smaller);

    &:not(.has-slotted, .has-hint, .has-count) {
      display: none;
    }
  }
`;var Oo=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}};var ms=Object.defineProperty,fs=Object.getOwnPropertyDescriptor,Zr=e=>{throw TypeError(e)},n=(e,t,o,r)=>{for(var i=r>1?void 0:r?fs(t,o):t,a=e.length-1,s;a>=0;a--)(s=e[a])&&(i=(r?s(t,o,i):s(i))||i);return r&&i&&ms(t,o,i),i},ti=(e,t,o)=>t.has(e)||Zr("Cannot "+o),ei=(e,t,o)=>(ti(e,t,"read from private field"),o?o.call(e):t.get(e)),oi=(e,t,o)=>t.has(e)?Zr("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o),ri=(e,t,o,r)=>(ti(e,t,"write to private field"),r?r.call(e,o):t.set(e,o),o);var I=e=>(t,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};var gs={attribute:!0,type:String,converter:jr,reflect:!1,hasChanged:Yr},ws=(e=gs,t,o)=>{let{kind:r,metadata:i}=o,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r==="setter"&&((e=Object.create(e)).wrapped=!0),a.set(o.name,e),r==="accessor"){let{name:s}=o;return{set(l){let p=t.get.call(this);t.set.call(this,l),this.requestUpdate(s,p,e,!0,l)},init(l){return l!==void 0&&this.C(s,void 0,e,l),l}}}if(r==="setter"){let{name:s}=o;return function(l){let p=this[s];t.call(this,l),this.requestUpdate(s,p,e,!0,l)}}throw Error("Unsupported decorator location: "+r)};function d(e){return(t,o)=>typeof o=="object"?ws(e,t,o):((r,i,a)=>{let s=i.hasOwnProperty(a);return i.constructor.createProperty(a,r),s?Object.getOwnPropertyDescriptor(i,a):void 0})(e,t,o)}function W(e){return d({...e,state:!0,attribute:!1})}var ue=(e,t,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,o),o);function D(e,t){return(o,r,i)=>{let a=s=>s.renderRoot?.querySelector(e)??null;if(t){let{get:s,set:l}=typeof r=="object"?o:i??(()=>{let p=Symbol();return{get(){return this[p]},set(h){this[p]=h}}})();return ue(o,r,{get(){let p=s.call(this);return p===void 0&&(p=a(this),(p!==null||this.hasUpdated)&&l.call(this,p)),p}})}return ue(o,r,{get(){return a(this)}})}}var bs=w`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden],
  :host([hidden]) {
    display: none !important;
  }
`,vs=/;\s+$/;function ys(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function ii(e){let{property:t,value:o,element:r}=e;if(o){let i=r.getAttribute("style")||"";i&&(i.match(vs)||(i+=";"),i+=" ");let a=`${t}: ${o}`;return i.includes(a)?void 0:`${i}${a};`}return null}var Mo,N=class extends L{constructor(){super(),oi(this,Mo,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(t,o)=>{if(this.internals?.states)try{o?this.internals.states.add(t):this.internals.states.delete(t)}catch(r){if(String(r).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw r}},has:t=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(t)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let e=this.constructor;for(let[t,o]of e.elementProperties)o.default==="inherit"&&o.initial!==void 0&&typeof t=="string"&&this.customStates.set(`initial-${t}-${o.initial}`,!0)}static get styles(){let e=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[bs,...e]}connectedCallback(){super.connectedCallback(),this.didSSR||this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `)),this.didSSR&&this.updateComplete.then(()=>{this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `))})}attributeChangedCallback(e,t,o){ei(this,Mo)||(this.constructor.elementProperties.forEach((r,i)=>{r.reflect&&this[i]!=null&&this.initialReflectedProperties.set(i,this[i])}),ri(this,Mo,!0)),super.attributeChangedCallback(e,t,o)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,o)=>{e.has(o)&&this[o]==null&&(this[o]=t)})}firstUpdated(e){super.firstUpdated(e),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(t=>{t.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(e){try{super.update(e)}catch(t){if(this.didSSR&&!this.hasUpdated){let o=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});o.error=t,this.dispatchEvent(o)}throw t}}setStyle(e,t){if(!this.style){let o=ii({property:ys(e),value:t,element:this});o&&this.setAttribute("style",o);return}this.style[e]=t}setStyleProperty(e,t){if(!this.style){let o=ii({property:e,value:t,element:this});o&&this.setAttribute("style",o);return}this.style.setProperty(e,t)}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,{...e,...t}))}};Mo=new WeakMap;n([d()],N.prototype,"dir",2);n([d()],N.prototype,"lang",2);n([d({type:Boolean,reflect:!0,attribute:"did-ssr"})],N.prototype,"didSSR",2);var xs=()=>({observedAttributes:["custom-error"],checkValidity(e){let t={message:"",isValid:!0,invalidKeys:[]};return e.customError&&(t.message=e.customError,t.isValid=!1,t.invalidKeys=["customError"]),t}}),J=class extends N{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=e=>{e.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new Oo))},this.handleInteraction=e=>{let t=this.emittedEvents;t.includes(e.type)||t.push(e.type),t.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},"addEventListener"in this&&this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[xs()]}static get observedAttributes(){let e=new Set(super.observedAttributes||[]);for(let t of this.validators)if(t.observedAttributes)for(let o of t.observedAttributes)e.add(o);return[...e]}connectedCallback(){super.connectedCallback(),this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>{this.updateValidity()}):this.updateValidity(),this.assumeInteractionOn.forEach(e=>{this.addEventListener?.(e,this.handleInteraction)})}firstUpdated(...e){super.firstUpdated(...e),this.updateValidity()}willUpdate(e){if(!!1&&e.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),e.has("value")||e.has("disabled")||e.has("defaultValue")){let t=this.value;this.updateFormValue(t)}e.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!!1&&!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),super.willUpdate(e),this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>this.updateValidity()):this.updateValidity()}updateFormValue(e){if(Array.isArray(e)){if(this.name){let t=new FormData;for(let o of e)t.append(this.name,o);this.setValue(t,t)}}else this.setValue(e,e)}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(e){e?this.setAttribute("form",e):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...e){let t=e[0],o=e[1],r=e[2];r||(r=this.validationTarget),this.internals.setValidity(t,o,r||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){let e=!!this.required,t=this.internals.validity.valid,o=this.hasInteracted;this.customStates.set("required",e),this.customStates.set("optional",!e),this.customStates.set("invalid",!t),this.customStates.set("valid",t),this.customStates.set("user-invalid",!t&&o),this.customStates.set("user-valid",t&&o)}setCustomValidity(e){if(!e){this.customError=null,this.setValidity({});return}this.customError=e,this.setValidity({customError:!0},e,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(e){this.disabled=e,this.updateValidity()}formStateRestoreCallback(e,t){this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>{this.value=e,t==="restore"&&this.resetValidity(),this.updateValidity()}):(this.value=e,t==="restore"&&this.resetValidity(),this.updateValidity())}setValue(...e){let[t,o]=e;this.internals.setFormValue(t,o)}get allValidators(){let e=this.constructor.validators||[],t=this.validators||[];return[...e,...t]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}let e=this.allValidators;if(!e?.length)return;let t={customError:!!this.customError},o=this.validationTarget||this.input||void 0,r="";for(let i of e){let{isValid:a,message:s,invalidKeys:l}=i.checkValidity(this);a||(r||(r=s),l?.length>=0&&l.forEach(p=>t[p]=!0))}r||(r=this.validationMessage),this.setValidity(t,r,o)}};J.formAssociated=!0;n([d({reflect:!0})],J.prototype,"name",2);n([d({type:Boolean})],J.prototype,"disabled",2);n([d({state:!0,attribute:!1})],J.prototype,"valueHasChanged",2);n([d({state:!0,attribute:!1})],J.prototype,"hasInteracted",2);n([d({attribute:"custom-error",reflect:!0})],J.prototype,"customError",2);n([d({attribute:!1,state:!0,type:Object})],J.prototype,"validity",1);var ai={small:"s",medium:"m",large:"l"},si=new Set;function nt(e,t){t in ai&&!si.has(`${e}:${t}`)&&(si.add(`${e}:${t}`),console.warn(`[${e}] size="${t}" is deprecated. Use size="${ai[t]}" instead. The long-form value will be removed in the next major version.`))}var bt=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=o=>{let r=o.target;(this.slotNames.includes("[default]")&&!r.name||r.name&&this.slotNames.includes(r.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return this.host.childNodes?[...this.host.childNodes].some(e=>{if(e.nodeType===Node.TEXT_NODE&&e.textContent.trim()!=="")return!0;if(e.nodeType===Node.ELEMENT_NODE){let t=e;if(t.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!t.hasAttribute("slot"))return!0}return!1}):!1}hasNamedSlot(e){return this.host.querySelector?.(`:scope > [slot="${e}"]`)!==null}test(e,t){return t&&this.host.didSSR&&!this.host.hasUpdated?!!this.host[t]:e==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){let e=this.host.shadowRoot;e&&"addEventListener"in e&&e.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){let e=this.host.shadowRoot;e&&"removeEventListener"in e&&e.removeEventListener("slotchange",this.handleSlotChange)}};var lt=w`
  :host([size='xs']) {
    font-size: var(--wa-font-size-xs);
  }

  :host([size='s']),
  :host([size='small']) {
    font-size: var(--wa-font-size-s);
  }

  :host([size='m']),
  :host([size='medium']) {
    font-size: var(--wa-font-size-m);
  }

  :host([size='l']),
  :host([size='large']) {
    font-size: var(--wa-font-size-l);
  }

  :host([size='xl']) {
    font-size: var(--wa-font-size-xl);
  }
`;function qt(e,t){return new Promise(o=>{function r(i){i.target===e&&(e.removeEventListener(t,r),o())}e.addEventListener(t,r)})}async function ho(e,t,o){return e.animate(t,o).finished.catch(()=>{})}function Ut(e,t){return new Promise(o=>{let r=new AbortController,{signal:i}=r;if(e.classList.contains(t))return;e.classList.add(t);let a=!1,s=()=>{a||(a=!0,e.classList.remove(t),o(),r.abort())};e.addEventListener("animationend",s,{once:!0,signal:i}),e.addEventListener("animationcancel",s,{once:!0,signal:i}),requestAnimationFrame(()=>{!a&&e.getAnimations().length===0&&s()})})}function sr(e){return e=e.toString().toLowerCase(),e.indexOf("ms")>-1?parseFloat(e)||0:e.indexOf("s")>-1?(parseFloat(e)||0)*1e3:parseFloat(e)||0}function ni(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function R(e,t){let o={waitUntilFirstUpdate:!1,...t};return(r,i)=>{let{update:a}=r,s=Array.isArray(e)?e:[e];r.update=function(l){s.forEach(p=>{let h=p;if(l.has(h)){let u=l.get(h),g=this[h];u!==g&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[i](u,g)}}),a.call(this,l)}}}var nr=new Set,Le=new Map,Vt,lr="ltr",cr="en",li=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(li){let e=new MutationObserver(ci);lr=document.documentElement.dir||"ltr",cr=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function Ee(...e){e.map(t=>{let o=t.$code.toLowerCase();Le.has(o)?Le.set(o,Object.assign(Object.assign({},Le.get(o)),t)):Le.set(o,t),Vt||(Vt=t)}),ci()}function ci(){li&&(lr=document.documentElement.dir||"ltr",cr=document.documentElement.lang||navigator.language),[...nr.keys()].map(e=>{typeof e.requestUpdate=="function"&&e.requestUpdate()})}var Fo=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){nr.add(this.host)}hostDisconnected(){nr.delete(this.host)}dir(){return`${this.host.dir||lr}`.toLowerCase()}lang(){let t=`${this.host.lang||cr}`.toLowerCase().replace(/_/g,"-");try{return new Intl.Locale(t),t}catch{return Vt?Vt.$code.toLowerCase():"en"}}getTranslationData(t){var o,r;let i;try{i=new Intl.Locale(t.replace(/_/g,"-"))}catch{return{locale:void 0,language:"",region:"",primary:void 0,secondary:void 0}}let a=i.language.toLowerCase(),s=(r=(o=i.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&r!==void 0?r:"",l=Le.get(`${a}-${s}`),p=Le.get(a);return{locale:i,language:a,region:s,primary:l,secondary:p}}exists(t,o){var r;let{primary:i,secondary:a}=this.getTranslationData((r=o.lang)!==null&&r!==void 0?r:this.lang());return o=Object.assign({includeFallback:!1},o),!!(i&&i[t]||a&&a[t]||o.includeFallback&&Vt&&Vt[t])}term(t,...o){let{primary:r,secondary:i}=this.getTranslationData(this.lang()),a;if(r&&r[t])a=r[t];else if(i&&i[t])a=i[t];else if(Vt&&Vt[t])a=Vt[t];else return console.error(`No translation found for: ${String(t)}`),String(t);return typeof a=="function"?a(...o):a}date(t,o){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),o).format(t)}number(t,o){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),o).format(t)}relativeTime(t,o,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(t,o)}};var di={$code:"en",$name:"English",$dir:"ltr",allTagsRemoved:"All tags removed",am:"AM",autosizeColumn:"Autosize column",captions:"Captions",carousel:"Carousel",chooseDate:"Choose date",chooseDecade:"Choose decade",chooseMonth:"Choose month",chooseTime:"Choose time",chooseYear:"Choose year",clearEntry:"Clear entry",clearFilter:"Clear filter",clearSort:"Clear sort",close:"Close",closeCalendar:"Close calendar",closeTimeInput:"Close time picker",collapseRow:"Collapse row",columnMenu:"Column options",columnMovedToPosition:(e,t,o)=>`${e} moved to position ${t} of ${o}`,columns:"Columns",compactPageXOfY:(e,t)=>`${e} of ${t}`,completed:"Completed",copied:"Copied",copy:"Copy",createOption:e=>`Create "${e}"`,currentlyPlaying:"currently playing",currentValue:"Current value",date:"Date",datePickerKeyboardHelp:"Use arrow keys to change values; press Alt+Down Arrow to open the calendar.",day:"Day",dayPeriod:"AM/PM",decrement:"Decrement",deselectAllRows:"Deselect all rows",disabled:"Disabled",dropFileHere:"Drop file here or click to browse",dropFilesHere:"Drop files here or click to browse",empty:"Empty",endDate:"End date",enterFullscreen:"Enter fullscreen",error:"Error",exitFullscreen:"Exit fullscreen",expandRow:"Expand row",filterByColumn:e=>`Filter by ${e}`,filterFrom:"From",filterMax:"Max",filterMin:"Min",filterTo:"To",firstPage:"First page",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hideColumn:"Hide column",hidePassword:"Hide password",hour:"Hour",incompleteDate:"Enter a valid date.",increment:"Increment",jumpBackwardX:e=>`Jump back ${e} pages`,jumpForwardX:e=>`Jump forward ${e} pages`,lastPage:"Last page",loading:"Loading",locked:"Locked",minute:"Minute",month:"Month",moreOptions:"More Options",mute:"Mute",nextDecade:"Next decade",nextMonth:"Next month",nextPage:"Next page",nextSlide:"Next slide",nextVideo:"Next Video",nextYear:"Next year",noData:"No data",noOptions:"No options",noResults:"No matching results",notCompleted:"Not completed",now:"Now",numCharacters:e=>e===1?"1 character":`${e} characters`,numCharactersRemaining:e=>e===1?"1 character remaining":`${e} characters remaining`,numOptionsAvailable:e=>e===0?"No options available":e===1?"1 option available":`${e} options available`,numOptionsSelected:e=>e===0?"No options selected":e===1?"1 option selected":`${e} options selected`,numRowsCopied:e=>e===1?"1 row copied":`${e} rows copied`,numRowsSelected:e=>e===1?"1 row selected":`${e} rows selected`,optionPosition:(e,t,o)=>`${e}, ${t} of ${o}`,optionsLoadError:"Options could not be loaded",pageXOfY:(e,t)=>`Page ${e} of ${t}`,pagination:"Pagination",pause:"Pause",pauseAnimation:"Pause animation",pictureInPicture:"Picture in picture",pinLeft:"Pin left",pinRight:"Pin right",play:"Play",playAnimation:"Play animation",playbackSpeed:"Playback speed",playlist:"Playlist",pm:"PM",previousDecade:"Previous decade",previousMonth:"Previous month",previousPage:"Previous page",previousSlide:"Previous slide",previousVideo:"Previous video",previousYear:"Previous year",progress:"Progress",rangeTooLong:e=>e===1?"Select a range no longer than 1 day":`Select a range no longer than ${e} days`,rangeTooShort:e=>e===1?"Select a range at least 1 day long":`Select a range at least ${e} days long`,readonly:"Read-only",remove:"Remove",resetColumns:"Reset columns",resize:"Resize",resizeColumn:"Resize column",rowsPerPage:"Rows per page",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",search:"Search",second:"Second",seek:"Seek",seekProgress:(e,t)=>`${e} of ${t}`,selectAColorFromTheScreen:"Select a color from the screen",selectAllRows:"Select all rows",selected:"Selected",selectedDateLabel:e=>`Selected: ${e}`,selectedRangeLabel:e=>`Selected range: ${e}`,selectGroup:"Select group",selectionCleared:"Selection cleared",selectRow:"Select row",showingNofMRows:(e,t)=>`Showing ${e} of ${t} rows`,showingXtoYofZ:(e,t,o)=>`${e}\u2013${t} of ${o}`,showPassword:"Show password",slideNum:e=>`Slide ${e}`,sortAscending:"Sort ascending",sortColumn:"Sort column",sortDescending:"Sort descending",startDate:"Start date",steps:"Steps",stepXOfY:(e,t)=>`Step ${e} of ${t}`,tagAdded:e=>`${e} added`,tagAlreadyAdded:e=>`${e} is already added`,tagInputKeyboardHelp:"Press Backspace or Delete to remove this tag.",tagRemoved:e=>`${e} removed`,time:"Time",timeInputKeyboardHelp:"Use arrow keys to change values; press Alt+Down Arrow to open the time picker.",today:"Today",toggleColorFormat:"Toggle color format",tooFewTags:e=>e===1?"Add at least 1 tag":`Add at least ${e} tags`,tooManyTags:e=>e===1?"Add no more than 1 tag":`Add no more than ${e} tags`,unmute:"Unmute",unpin:"Unpin",unpinColumn:"Unpin column",videoPlayer:"Video player",volume:"Volume",year:"Year",zoomIn:"Zoom in",zoomOut:"Zoom out"};Ee(di);var hi=di;var Y=class extends Fo{lang(){return this.host.didSSR&&!this.host.hasUpdated?this.host.lang||"en":super.lang()}};Ee(hi);var H=ke(class extends $e{constructor(e){if(super(e),e.type!==St.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(let r in t)t[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(t)}let o=e.element.classList;for(let r of this.st)r in t||(o.remove(r),this.st.delete(r));for(let r in t){let i=!!t[r];i===this.st.has(r)||this.nt?.has(r)||(i?(o.add(r),this.st.add(r)):(o.remove(r),this.st.delete(r)))}return Bt}});var O=class extends J{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.cachedOptions=null,this.hasSlotController=new bt(this,"hint","label"),this.localize=new Y(this),this.selectionOrder=new Map,this.typeToSelectString="",this.slotChangePending=!1,this.displayLabel="",this.selectedOptions=[],this.name="",this._defaultValue=null,this.size="m",this.placeholder="",this.multiple=!1,this.maxOptionsVisible=3,this.disabled=!1,this.withClear=!1,this.open=!1,this.appearance="outlined",this.pill=!1,this.label="",this.placement="bottom",this.hint="",this.withLabel=!1,this.withHint=!1,this.required=!1,this.getTag=e=>c`
        <wa-tag
          part="tag"
          exportparts="
            base:tag__base,
            content:tag__content,
            remove-button:tag__remove-button,
            remove-button__base:tag__remove-button__base
          "
          ?pill=${this.pill}
          size=${this.size}
          with-remove
          data-value=${e.value}
          @wa-remove=${t=>this.handleTagRemove(t,e)}
        >
          ${e.label}
        </wa-tag>
      `,this.handleDocumentFocusIn=e=>{let t=e.composedPath();this&&!t.includes(this)&&this.hide()},this.handleDocumentKeyDown=e=>{let t=e.target,o=t.closest('[part~="clear-button"]')!==null,r=t.closest("wa-button")!==null;if(!(o||r)){if(e.key==="Escape"&&this.open&&Ro(this)&&(e.preventDefault(),e.stopPropagation(),this.hide(),this.displayInput.focus({preventScroll:!0})),e.key==="Enter"||e.key===" "&&this.typeToSelectString===""){if(e.preventDefault(),e.stopImmediatePropagation(),!this.open){this.show();return}this.currentOption&&!this.currentOption.disabled&&(this.valueHasChanged=!0,this.hasInteracted=!0,this.multiple?this.toggleOptionSelection(this.currentOption):this.setSelectedOptions(this.currentOption),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})));return}if(["ArrowUp","ArrowDown","Home","End"].includes(e.key)){let i=this.getAllOptions(),a=i.indexOf(this.currentOption),s=Math.max(0,a);if(e.preventDefault(),!this.open&&(this.show(),this.currentOption))return;e.key==="ArrowDown"?(s=a+1,s>i.length-1&&(s=0)):e.key==="ArrowUp"?(s=a-1,s<0&&(s=i.length-1)):e.key==="Home"?s=0:e.key==="End"&&(s=i.length-1),this.setCurrentOption(i[s])}if(e.key?.length===1||e.key==="Backspace"){let i=this.getAllOptions();if(e.metaKey||e.ctrlKey||e.altKey)return;if(!this.open){if(e.key==="Backspace")return;this.show()}e.stopPropagation(),e.preventDefault(),clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout(()=>this.typeToSelectString="",1e3),e.key==="Backspace"?this.typeToSelectString=this.typeToSelectString.slice(0,-1):this.typeToSelectString+=e.key.toLowerCase();for(let a of i)if(a.label.toLowerCase().startsWith(this.typeToSelectString)){this.setCurrentOption(a);break}}}},this.handleDocumentMouseDown=e=>{let t=e.composedPath();this&&!t.includes(this)&&this.hide()}}static get validators(){let e=[Qr({validationElement:Object.assign(document.createElement("select"),{required:!0})})];return[...super.validators,...e]}get validationTarget(){return this.valueInput}set defaultValue(e){this._defaultValue=this.convertDefaultValue(e)}get defaultValue(){return this.convertDefaultValue(this._defaultValue)}rawValuesEqual(e,t){return e==null&&t==null?!0:e==null||t==null||e.length!==t.length?!1:e.every((o,r)=>o===t[r])}convertDefaultValue(e){return!(this.multiple||this.hasAttribute("multiple"))&&Array.isArray(e)&&(e=e[0]),e}set value(e){let t=this.value;e instanceof FormData&&(e=e.getAll(this.name)),e!=null&&!Array.isArray(e)&&(e=[e]);let o=this._value;this._value=e??null,this.rawValuesEqual(o,this._value)||(this.valueHasChanged=!0,this.requestUpdate("value",t))}get value(){let e=this._value??this.defaultValue??null;e!=null&&(e=Array.isArray(e)?e:[e]),this.optionValues=new Set(this.getAllOptions().filter(o=>!o.disabled).map(o=>o.value));let t=e;return e!=null&&(t=e.filter(o=>this.optionValues.has(o)),t=this.multiple?t:t[0],t=t??null),t}handleSizeChange(){nt(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.processSlotChange(),this.open=!1}disconnectedCallback(){super.disconnectedCallback(),this.removeOpenListeners(),this.cachedOptions=null}updateDefaultValue(){let t=this.getAllOptions().filter(o=>o.hasAttribute("selected")||o.defaultSelected);if(t.length>0){let o=t.map(r=>r.value);this._defaultValue=this.multiple?o:o[0]}this.hasAttribute("value")&&(this._defaultValue=this.getAttribute("value")||null)}addOpenListeners(){document.addEventListener("focusin",this.handleDocumentFocusIn),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),Io(this),this.getRootNode()!==document&&this.getRootNode().addEventListener("focusin",this.handleDocumentFocusIn)}removeOpenListeners(){document.removeEventListener("focusin",this.handleDocumentFocusIn),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),_e(this),this.getRootNode()!==document&&this.getRootNode().removeEventListener("focusin",this.handleDocumentFocusIn)}handleFocus(){this.displayInput.setSelectionRange(0,0)}handleLabelClick(){this.displayInput.focus()}handleComboboxClick(e){e.preventDefault()}handleComboboxMouseDown(e){let o=e.composedPath().some(r=>r instanceof Element&&r.tagName.toLowerCase()==="wa-button");this.disabled||o||(e.preventDefault(),this.displayInput.focus({preventScroll:!0}),this.open=!this.open)}handleComboboxKeyDown(e){e.stopPropagation(),this.handleDocumentKeyDown(e)}handleClearClick(e){e.stopPropagation(),this.hasInteracted=!0,this.valueHasChanged=!0,this.value!==null&&(this.displayLabel="",this.selectionOrder.clear(),this.setSelectedOptions([]),this.displayInput.focus({preventScroll:!0}),this.updateComplete.then(()=>{this.dispatchEvent(new To),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}handleClearMouseDown(e){e.stopPropagation(),e.preventDefault()}handleOptionClick(e){let o=e.target.closest("wa-option");o&&!o.disabled&&(this.hasInteracted=!0,this.valueHasChanged=!0,this.multiple?this.toggleOptionSelection(o):this.setSelectedOptions(o),this.updateComplete.then(()=>this.displayInput.focus({preventScroll:!0})),this.requestUpdate("value"),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}),this.multiple||(this.hide(),this.displayInput.focus({preventScroll:!0})))}handleDefaultSlotChange(){this.slotChangePending||(this.slotChangePending=!0,queueMicrotask(()=>{this.slotChangePending=!1,this.processSlotChange()}))}processSlotChange(){if(customElements.get("wa-option")||customElements.whenDefined("wa-option").then(()=>this.handleDefaultSlotChange()),this.didSSR&&!this.hasUpdated){this.updateComplete.then(()=>{this.handleDefaultSlotChange()});return}this.cachedOptions=null;let e=this.getAllOptions();this.updateDefaultValue();let t=this.value;if(t==null||!this.valueHasChanged&&!this.hasInteracted){this.selectionChanged();return}Array.isArray(t)||(t=[t]);let o=e.filter(r=>t.includes(r.value));this.setSelectedOptions(o)}handleTagRemove(e,t){if(e.stopPropagation(),this.disabled)return;this.hasInteracted=!0,this.valueHasChanged=!0;let o=t;if(!o){let r=e.target.closest("wa-tag[data-value]");if(r){let i=r.dataset.value;o=this.selectedOptions.find(a=>a.value===i)}}o&&(this.toggleOptionSelection(o,!1),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}))}getAllOptions(){return this.cachedOptions?this.cachedOptions:this?.querySelectorAll?(this.cachedOptions=[...this.querySelectorAll("wa-option")],this.cachedOptions):[]}getFirstOption(){return this.querySelector("wa-option")}setCurrentOption(e){this.getAllOptions().forEach(o=>{o.current=!1,o.tabIndex=-1}),e&&(this.currentOption=e,e.current=!0,e.tabIndex=0,e.focus({preventScroll:!0}),this.open&&!this.listbox.hidden&&ar(e,this.listbox,"vertical","auto"))}setSelectedOptions(e){let t=this.getAllOptions(),o=Array.isArray(e)?e:[e];t.forEach(r=>{o.includes(r)||(r.selected=!1)}),o.length&&o.forEach(r=>r.selected=!0),this.selectionChanged()}toggleOptionSelection(e,t){t===!0||t===!1?e.selected=t:e.selected=!e.selected,this.selectionChanged()}selectionChanged(){let t=this.getAllOptions().filter(s=>{if(!this.hasInteracted&&!this.valueHasChanged){let l=this.defaultValue,p=Array.isArray(l)?l:[l];return s.hasAttribute("selected")||s.defaultSelected||s.selected||p?.includes(s.value)}return s.selected}),o=new Set(t.map(s=>s.value));for(let s of this.selectionOrder.keys())o.has(s)||this.selectionOrder.delete(s);let i=(this.selectionOrder.size>0?Math.max(...this.selectionOrder.values()):-1)+1;for(let s of t)this.selectionOrder.has(s.value)||this.selectionOrder.set(s.value,i++);this.selectedOptions=t.sort((s,l)=>{let p=this.selectionOrder.get(s.value)??0,h=this.selectionOrder.get(l.value)??0;return p-h});let a=new Set(this.selectedOptions.map(s=>s.value));if(a.size>0||this._value){let s=this._value;if(this._value==null){let l=this.defaultValue??[];this._value=Array.isArray(l)?l:[l]}this._value=this._value?.filter(l=>!this.optionValues?.has(l))??null,this._value?.unshift(...a),this.requestUpdate("value",s)}if(this.multiple)this.placeholder&&!this.value?.length?this.displayLabel="":this.displayLabel=this.localize.term("numOptionsSelected",this.selectedOptions.length);else{let s=this.selectedOptions[0];this.displayLabel=s?.label??""}this.updateComplete.then(()=>{this.updateValidity()})}get tags(){return this.selectedOptions.map((e,t)=>{if(t<this.maxOptionsVisible||this.maxOptionsVisible<=0){let o=this.getTag(e,t);return o?typeof o=="string"?kt(o):o:null}else if(t===this.maxOptionsVisible)return c`
          <wa-tag
            part="tag"
            exportparts="
              base:tag__base,
              content:tag__content,
              remove-button:tag__remove-button,
              remove-button__base:tag__remove-button__base
            "
            ?pill=${this.pill}
            size=${this.size}
            >+${this.selectedOptions.length-t}</wa-tag
          >
        `;return null})}updated(e){super.updated(e),(e.has("value")||e.has("displayLabel"))&&this.customStates.set("blank",!this.value&&!this.displayLabel)}handleDisabledChange(){this.disabled&&this.open&&(this.open=!1)}handleValueChange(){let e=this.getAllOptions(),t=Array.isArray(this.value)?this.value:[this.value],o=e.filter(r=>t.includes(r.value));this.setSelectedOptions(o),this.updateValidity()}async handleOpenChange(){if(this.open&&!this.disabled){this.setCurrentOption(this.selectedOptions[0]||this.getFirstOption());let e=new Jt;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.listbox.hidden=!1,this.popup.active=!0,requestAnimationFrame(()=>{this.setCurrentOption(this.currentOption)}),await Ut(this.popup.popup,"show"),this.currentOption&&ar(this.currentOption,this.listbox,"vertical","auto"),this.dispatchEvent(new te)}else{let e=new Qt;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.removeOpenListeners(),await Ut(this.popup.popup,"hide"),this.listbox.hidden=!0,this.popup.active=!1,this.dispatchEvent(new Zt)}}async show(){if(this.open||this.disabled){this.open=!1;return}return this.open=!0,qt(this,"wa-after-show")}async hide(){if(!this.open||this.disabled){this.open=!1;return}return this.open=!1,qt(this,"wa-after-hide")}focus(e){this.displayInput.focus(e)}blur(){this.displayInput.blur()}formResetCallback(){this.selectionOrder.clear(),this.value=this.defaultValue,super.formResetCallback(),this.handleValueChange(),this.updateComplete.then(()=>{this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}render(){let e=this.hasSlotController.test("label","withLabel"),t=this.hasSlotController.test("hint","withHint"),o=this.label?!0:!!e,r=this.hint?!0:!!t,i=(this.hasUpdated||!1)&&this.withClear&&!this.disabled&&(this.displayLabel||this.value&&this.value.length>0);return c`
      <div
        part="form-control"
        class=${H({"form-control":!0,"form-control-has-label":o})}
      >
        <label
          id="label"
          part="form-control-label label"
          class=${H({label:!0,"has-label":o})}
          aria-hidden=${o?"false":"true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <wa-popup
            class=${H({select:!0,open:this.open,disabled:this.disabled,enabled:!this.disabled,multiple:this.multiple})}
            placement=${this.placement}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
          >
            <div
              part="combobox"
              class="combobox"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
              @click=${this.handleComboboxClick}
            >
              <slot part="start" name="start" class="start"></slot>

              <input
                part="display-input"
                class="display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                ?required=${this.required}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                readonly
                aria-invalid=${!this.validity.valid}
                aria-controls="listbox"
                aria-expanded=${this.open?"true":"false"}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled?"true":"false"}
                aria-describedby="hint"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
              />

              <!-- Tags need to wait for first hydration before populating otherwise it will create a hydration mismatch. -->
              ${this.multiple&&this.hasUpdated?c`<div part="tags" class="tags" @wa-remove=${this.handleTagRemove}>${this.tags}</div>`:""}

              <input
                class="value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value)?this.value.join(", "):this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${()=>this.focus()}
              />

              ${i?c`
                    <button
                      part="clear-button"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @mousedown=${this.handleClearMouseDown}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                      </slot>
                    </button>
                  `:""}

              <slot name="end" part="end" class="end"></slot>

              <slot name="expand-icon" part="expand-icon" class="expand-icon">
                <wa-icon library="system" name="chevron-down" variant="solid"></wa-icon>
              </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open?"true":"false"}
              aria-multiselectable=${this.multiple?"true":"false"}
              aria-labelledby="label"
              part="listbox"
              class="listbox"
              tabindex="-1"
              @mouseup=${this.handleOptionClick}
            >
              <slot @slotchange=${this.handleDefaultSlotChange}></slot>
            </div>
          </wa-popup>
        </div>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${H({"has-slotted":r})}
          aria-hidden=${r?"false":"true"}
          >${this.hint}</slot
        >
      </div>
    `}};O.css=[Jr,ee,lt];n([D(".select")],O.prototype,"popup",2);n([D(".combobox")],O.prototype,"combobox",2);n([D(".display-input")],O.prototype,"displayInput",2);n([D(".value-input")],O.prototype,"valueInput",2);n([D(".listbox")],O.prototype,"listbox",2);n([W()],O.prototype,"displayLabel",2);n([W()],O.prototype,"currentOption",2);n([W()],O.prototype,"selectedOptions",2);n([d({reflect:!0})],O.prototype,"name",2);n([d({attribute:!1})],O.prototype,"defaultValue",1);n([d({attribute:"value",reflect:!1})],O.prototype,"value",1);n([d({reflect:!0})],O.prototype,"size",2);n([R("size")],O.prototype,"handleSizeChange",1);n([d()],O.prototype,"placeholder",2);n([d({type:Boolean,reflect:!0})],O.prototype,"multiple",2);n([d({attribute:"max-options-visible",type:Number})],O.prototype,"maxOptionsVisible",2);n([d({type:Boolean})],O.prototype,"disabled",2);n([d({attribute:"with-clear",type:Boolean})],O.prototype,"withClear",2);n([d({type:Boolean,reflect:!0})],O.prototype,"open",2);n([d({reflect:!0})],O.prototype,"appearance",2);n([d({type:Boolean,reflect:!0})],O.prototype,"pill",2);n([d()],O.prototype,"label",2);n([d({reflect:!0})],O.prototype,"placement",2);n([d({attribute:"hint"})],O.prototype,"hint",2);n([d({attribute:"with-label",type:Boolean})],O.prototype,"withLabel",2);n([d({attribute:"with-hint",type:Boolean})],O.prototype,"withHint",2);n([d({type:Boolean,reflect:!0})],O.prototype,"required",2);n([d({attribute:!1})],O.prototype,"getTag",2);n([R("disabled",{waitUntilFirstUpdate:!0})],O.prototype,"handleDisabledChange",1);n([R("value",{waitUntilFirstUpdate:!0})],O.prototype,"handleValueChange",1);n([R("open",{waitUntilFirstUpdate:!0})],O.prototype,"handleOpenChange",1);O=n([I("wa-select")],O);O.disableWarning?.("change-in-update");var pi=class extends Event{constructor(){super("wa-remove",{bubbles:!0,cancelable:!1,composed:!0})}};var ui=w`
  @layer wa-component {
    :host {
      display: inline-flex;
      gap: 0.5em;
      border-radius: var(--wa-border-radius-m);
      align-items: center;
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
      border-style: var(--wa-border-style);
      border-width: var(--wa-border-width-s);
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      font-size: inherit;
      line-height: 1;
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      height: calc(var(--wa-form-control-height) * 0.8);
      line-height: calc(var(--wa-form-control-height) - var(--wa-form-control-border-width) * 2);
      padding: 0 0.75em;
    }

    /* Appearance modifiers */
    :host([appearance='outlined']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }

    :host([appearance='filled']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: transparent;
    }

    :host([appearance='filled-outlined']) {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }

    :host([appearance='accent']) {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
  }

  .content {
    font-size: var(--wa-font-size-smaller);
  }

  [part='remove-button'] {
    line-height: 1;
  }

  [part='remove-button']::part(base) {
    padding: 0;
    height: 1em;
    width: 1em;
    color: currentColor;
  }

  @media (hover: hover) {
    :host(:hover) > [part='remove-button']::part(base) {
      background-color: transparent;
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
    }
  }

  :host(:active) > [part='remove-button']::part(base) {
    background-color: transparent;
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }

  /*
   * Pill modifier
   */
  :host([pill]) {
    border-radius: var(--wa-border-radius-pill);
  }
`;var oe=w`
  :where(:root),
  .wa-neutral,
  :host([variant='neutral']) {
    --wa-color-fill-loud: var(--wa-color-neutral-fill-loud);
    --wa-color-fill-normal: var(--wa-color-neutral-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-neutral-fill-quiet);
    --wa-color-border-loud: var(--wa-color-neutral-border-loud);
    --wa-color-border-normal: var(--wa-color-neutral-border-normal);
    --wa-color-border-quiet: var(--wa-color-neutral-border-quiet);
    --wa-color-on-loud: var(--wa-color-neutral-on-loud);
    --wa-color-on-normal: var(--wa-color-neutral-on-normal);
    --wa-color-on-quiet: var(--wa-color-neutral-on-quiet);
  }

  .wa-brand,
  :host([variant='brand']) {
    --wa-color-fill-loud: var(--wa-color-brand-fill-loud);
    --wa-color-fill-normal: var(--wa-color-brand-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-brand-fill-quiet);
    --wa-color-border-loud: var(--wa-color-brand-border-loud);
    --wa-color-border-normal: var(--wa-color-brand-border-normal);
    --wa-color-border-quiet: var(--wa-color-brand-border-quiet);
    --wa-color-on-loud: var(--wa-color-brand-on-loud);
    --wa-color-on-normal: var(--wa-color-brand-on-normal);
    --wa-color-on-quiet: var(--wa-color-brand-on-quiet);
  }

  .wa-success,
  :host([variant='success']) {
    --wa-color-fill-loud: var(--wa-color-success-fill-loud);
    --wa-color-fill-normal: var(--wa-color-success-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-success-fill-quiet);
    --wa-color-border-loud: var(--wa-color-success-border-loud);
    --wa-color-border-normal: var(--wa-color-success-border-normal);
    --wa-color-border-quiet: var(--wa-color-success-border-quiet);
    --wa-color-on-loud: var(--wa-color-success-on-loud);
    --wa-color-on-normal: var(--wa-color-success-on-normal);
    --wa-color-on-quiet: var(--wa-color-success-on-quiet);
  }

  .wa-warning,
  :host([variant='warning']) {
    --wa-color-fill-loud: var(--wa-color-warning-fill-loud);
    --wa-color-fill-normal: var(--wa-color-warning-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-warning-fill-quiet);
    --wa-color-border-loud: var(--wa-color-warning-border-loud);
    --wa-color-border-normal: var(--wa-color-warning-border-normal);
    --wa-color-border-quiet: var(--wa-color-warning-border-quiet);
    --wa-color-on-loud: var(--wa-color-warning-on-loud);
    --wa-color-on-normal: var(--wa-color-warning-on-normal);
    --wa-color-on-quiet: var(--wa-color-warning-on-quiet);
  }

  .wa-danger,
  :host([variant='danger']) {
    --wa-color-fill-loud: var(--wa-color-danger-fill-loud);
    --wa-color-fill-normal: var(--wa-color-danger-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-danger-fill-quiet);
    --wa-color-border-loud: var(--wa-color-danger-border-loud);
    --wa-color-border-normal: var(--wa-color-danger-border-normal);
    --wa-color-border-quiet: var(--wa-color-danger-border-quiet);
    --wa-color-on-loud: var(--wa-color-danger-on-loud);
    --wa-color-on-normal: var(--wa-color-danger-on-normal);
    --wa-color-on-quiet: var(--wa-color-danger-on-quiet);
  }
`;var Wt=class extends N{constructor(){super(...arguments),this.localize=new Y(this),this.variant="neutral",this.appearance="filled-outlined",this.size="m",this.pill=!1,this.withRemove=!1}handleSizeChange(){nt(this.localName,this.size)}handleRemoveClick(){this.dispatchEvent(new pi)}render(){return c`
      <slot part="content" class="content"></slot>

      ${this.withRemove?c`
            <wa-button
              part="remove-button"
              exportparts="base:remove-button__base"
              class="remove"
              appearance="plain"
              size=${this.size}
              @click=${this.handleRemoveClick}
              tabindex="-1"
            >
              <wa-icon name="xmark" library="system" variant="solid" label=${this.localize.term("remove")}></wa-icon>
            </wa-button>
          `:""}
    `}};Wt.css=[ui,oe,lt];n([d({reflect:!0})],Wt.prototype,"variant",2);n([d({reflect:!0})],Wt.prototype,"appearance",2);n([d({reflect:!0})],Wt.prototype,"size",2);n([R("size")],Wt.prototype,"handleSizeChange",1);n([d({type:Boolean,reflect:!0})],Wt.prototype,"pill",2);n([d({attribute:"with-remove",type:Boolean})],Wt.prototype,"withRemove",2);Wt=n([I("wa-tag")],Wt);var mi=w`
  :host {
    --current-text-color: var(--wa-color-brand-on-loud);

    display: block;
    color: var(--wa-color-text-normal);
    -webkit-user-select: none;
    user-select: none;

    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    padding: 0.5em 1em 0.5em 0.25em;
    border-radius: var(--wa-border-radius-s);
    line-height: var(--wa-line-height-condensed);
    transition: var(--wa-transition-fast) background-color var(--wa-transition-easing);
    cursor: pointer;
  }

  :host(:focus) {
    outline: none;
  }

  @media (hover: hover) {
    :host(:not(:state(disabled), :state(current)):is(:state(hover), :hover)) {
      background-color: var(--wa-color-neutral-fill-normal);
      color: var(--wa-color-neutral-on-normal);
    }
  }

  :host(:state(current)),
  :host(:state(disabled):state(current)) {
    background-color: var(--wa-form-control-activated-color);
    color: var(--current-text-color);
    opacity: 1;
  }

  :host(:state(disabled)) {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .label {
    flex: 1 1 auto;
    display: inline-block;
  }

  .check {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--wa-font-size-smaller);
    visibility: hidden;
    width: 2em;
  }

  :host(:state(selected)) .check {
    visibility: visible;
  }

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .start::slotted(*) {
    margin-inline-end: 0.5em;
  }

  .end::slotted(*) {
    margin-inline-start: 0.5em;
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;function po(e,t=0){if(!e||!globalThis.Node)return"";if(typeof e[Symbol.iterator]=="function")return(Array.isArray(e)?e:[...e]).map(i=>po(i,--t)).join("");let o=e;if(o.nodeType===Node.TEXT_NODE)return o.textContent??"";if(o.nodeType===Node.ELEMENT_NODE){let r=o;if(r.hasAttribute("slot")||r.matches("style, script"))return"";if(r instanceof HTMLSlotElement){let i=r.assignedNodes({flatten:!0});if(i.length>0)return po(i,--t)}return t>-1?po(r,--t):r.textContent??""}return o.hasChildNodes()?po(o.childNodes,--t):""}var $t=class extends N{constructor(){super(...arguments),this.localize=new Y(this),this.cachedDefaultLabel="",this.isInitialized=!1,this.isDefaultLabelDirty=!0,this.current=!1,this.value="",this.disabled=!1,this.selected=!1,this.defaultSelected=!1,this._label="",this.handleHover=e=>{e.type==="mouseenter"?this.customStates.set("hover",!0):e.type==="mouseleave"&&this.customStates.set("hover",!1)}}set label(e){let t=this._label;this._label=e||"",this._label!==t&&this.requestUpdate("label",t)}get label(){return this._label?this._label:this.defaultLabel}get defaultLabel(){return(this.isDefaultLabelDirty||!this.cachedDefaultLabel)&&this.updateDefaultLabel(),this.cachedDefaultLabel}connectedCallback(){super.connectedCallback(),this.setAttribute("role","option"),this.setAttribute("aria-selected","false"),this.addEventListener("mouseenter",this.handleHover),this.addEventListener("mouseleave",this.handleHover)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseenter",this.handleHover),this.removeEventListener("mouseleave",this.handleHover)}handleDefaultSlotChange(){if(this.isDefaultLabelDirty=!0,!this.isInitialized){this.isInitialized=!0;return}let e=this.closest("wa-select, wa-combobox");e&&customElements.whenDefined(e.localName).then(()=>e.handleDefaultSlotChange?.())}willUpdate(e){e.has("defaultSelected")&&(this.didSSR&&this.hasUpdated||!this.didSSR)&&this.syncDefaultSelected(),super.willUpdate(e)}syncDefaultSelected(){if("closest"in this&&!this.closest("wa-combobox, wa-select")?.hasInteracted&&this.defaultSelected){let e=this.selected;this.selected=this.defaultSelected,this.requestUpdate("selected",e)}}updated(e){e.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled)),e.has("selected")&&(this.setAttribute("aria-selected",this.selected?"true":"false"),this.customStates.set("selected",this.selected)),e.has("value")&&(typeof this.value!="string"&&(this.value=String(this.value)),this.handleDefaultSlotChange()),e.has("current")&&this.customStates.set("current",this.current),super.updated(e)}async firstUpdated(e){if(super.firstUpdated(e),this.didSSR&&!this.hasUpdated?(await this.updateComplete,this.syncDefaultSelected()):this.syncDefaultSelected(),this.selected&&!this.defaultSelected){let t=this.closest("wa-select, wa-combobox");t&&!t.hasInteracted&&(await customElements.whenDefined(t?.localName),await t.updateComplete,t.selectionChanged?.())}}updateDefaultLabel(){let e=this.cachedDefaultLabel;this.cachedDefaultLabel=po(this).trim(),this.isDefaultLabelDirty=!1;let t=this.cachedDefaultLabel!==e;return!this._label&&t&&this.requestUpdate("label",e),t}render(){let e=this.selected;return this.didSSR&&!this.hasUpdated?(this.updateComplete.then(()=>{this.requestUpdate()}),dt):c`
      ${e?c`<wa-icon
            part="checked-icon"
            class="check"
            name="check"
            library="system"
            variant="solid"
            aria-hidden="true"
          ></wa-icon>`:c`<span part="checked-icon" class="check" aria-hidden="true"></span>`}
      <slot part="start" name="start" class="start"></slot>
      <slot part="label" class="label" @slotchange=${this.handleDefaultSlotChange}></slot>
      <slot part="end" name="end" class="end"></slot>
    `}};$t.css=mi;n([D(".label")],$t.prototype,"defaultSlot",2);n([W()],$t.prototype,"current",2);n([d({reflect:!0})],$t.prototype,"value",2);n([d({type:Boolean})],$t.prototype,"disabled",2);n([d({type:Boolean,attribute:!1})],$t.prototype,"selected",2);n([d({type:Boolean,attribute:"selected"})],$t.prototype,"defaultSelected",2);n([d()],$t.prototype,"label",1);$t=n([I("wa-option")],$t);var fi=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};var gi=w`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --popup-border-width: 0px;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45) to calculate the length of the arrow after rotation.
     *
     * The diamond will be translated inward by --arrow-base-offset, the border thickness, to centralise it on
     * the inner edge of the popup border. This also means we need to increase the size of the arrow by the
     * same amount to compensate.
     *
     * A diamond shaped clipping mask is used to avoid overlap of popup content. This extends slightly inward so
     * the popup border is covered with no sub-pixel rounding artifacts. The diamond corners are mitred at 22.5º
     * to properly merge any arrow border with the popup border. The constant 1.4142 is derived from 1 + tan(22.5).
     *
     */
    --arrow-base-offset: var(--popup-border-width);
    --arrow-size-diagonal: calc((var(--arrow-size) + var(--arrow-base-offset)) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));
    --arrow-size-div: calc(var(--arrow-size-diagonal) * 2);
    --arrow-clipping-corner: calc(var(--arrow-base-offset) * 1.4142);

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);

    /* Clear UA styles for [popover] */
    :where(&) {
      inset: unset;
      padding: unset;
      margin: unset;
      width: unset;
      height: unset;
      color: unset;
      background: unset;
      border: unset;
      overflow: unset;
    }
  }

  .popup-fixed {
    position: fixed;
  }

  .popup:not(.popup-active) {
    display: none;
  }

  .arrow {
    position: absolute;
    width: var(--arrow-size-div);
    height: var(--arrow-size-div);
    background: var(--arrow-color);
    z-index: 3;
    clip-path: polygon(
      var(--arrow-clipping-corner) 100%,
      var(--arrow-base-offset) calc(100% - var(--arrow-base-offset)),
      calc(var(--arrow-base-offset) - 2px) calc(100% - var(--arrow-base-offset)),
      calc(100% - var(--arrow-base-offset)) calc(var(--arrow-base-offset) - 2px),
      calc(100% - var(--arrow-base-offset)) var(--arrow-base-offset),
      100% var(--arrow-clipping-corner),
      100% 100%
    );
    rotate: 45deg;
  }

  :host([data-current-placement|='left']) .arrow {
    rotate: -45deg;
  }

  :host([data-current-placement|='right']) .arrow {
    rotate: 135deg;
  }

  :host([data-current-placement|='bottom']) .arrow {
    rotate: 225deg;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge-visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: 899;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }

  /* Built-in animations */
  .show {
    animation: show var(--show-duration) ease;
  }

  .hide {
    animation: show var(--hide-duration) ease reverse;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .show-with-scale {
    animation: show-with-scale var(--show-duration) ease;
  }

  .hide-with-scale {
    animation: show-with-scale var(--hide-duration) ease reverse;
  }

  @keyframes show-with-scale {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
`;var At=Math.min,_t=Math.max,mo=Math.round,fo=Math.floor,Dt=e=>({x:e,y:e}),Cs={left:"right",right:"left",bottom:"top",top:"bottom"};function dr(e,t,o){return _t(e,At(t,o))}function me(e,t){return typeof e=="function"?e(t):e}function re(e){return e.split("-")[0]}function fe(e){return e.split("-")[1]}function hr(e){return e==="x"?"y":"x"}function Bo(e){return e==="y"?"height":"width"}function Tt(e){let t=e[0];return t==="t"||t==="b"?"y":"x"}function qo(e){return hr(Tt(e))}function vi(e,t,o){o===void 0&&(o=!1);let r=fe(e),i=qo(e),a=Bo(i),s=i==="x"?r===(o?"end":"start")?"right":"left":r==="start"?"bottom":"top";return t.reference[a]>t.floating[a]&&(s=uo(s)),[s,uo(s)]}function yi(e){let t=uo(e);return[No(e),t,No(t)]}function No(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}var wi=["left","right"],bi=["right","left"],Ss=["top","bottom"],ks=["bottom","top"];function $s(e,t,o){switch(e){case"top":case"bottom":return o?t?bi:wi:t?wi:bi;case"left":case"right":return t?Ss:ks;default:return[]}}function xi(e,t,o,r){let i=fe(e),a=$s(re(e),o==="start",r);return i&&(a=a.map(s=>s+"-"+i),t&&(a=a.concat(a.map(No)))),a}function uo(e){let t=re(e);return Cs[t]+e.slice(t.length)}function _s(e){var t,o,r,i;return{top:(t=e.top)!=null?t:0,right:(o=e.right)!=null?o:0,bottom:(r=e.bottom)!=null?r:0,left:(i=e.left)!=null?i:0}}function pr(e){return typeof e!="number"?_s(e):{top:e,right:e,bottom:e,left:e}}function ge(e){let{x:t,y:o,width:r,height:i}=e;return{width:r,height:i,top:o,left:t,right:t+r,bottom:o+i,x:t,y:o}}function Ci(e,t,o){let{reference:r,floating:i}=e,a=Tt(t),s=qo(t),l=Bo(s),p=re(t),h=a==="y",u=r.x+r.width/2-i.width/2,g=r.y+r.height/2-i.height/2,y=r[l]/2-i[l]/2,v;switch(p){case"top":v={x:u,y:r.y-i.height};break;case"bottom":v={x:u,y:r.y+r.height};break;case"right":v={x:r.x+r.width,y:g};break;case"left":v={x:r.x-i.width,y:g};break;default:v={x:r.x,y:r.y}}let C=fe(t);return C&&(v[s]+=y*(C==="end"?1:-1)*(o&&h?-1:1)),v}async function Si(e,t){var o;t===void 0&&(t={});let{x:r,y:i,platform:a,rects:s,elements:l,strategy:p}=e,{boundary:h="clippingAncestors",rootBoundary:u="viewport",elementContext:g="floating",altBoundary:y=!1,padding:v=0}=me(t,e),C=pr(v),E=l[y?g==="floating"?"reference":"floating":g],_=ge(await a.getClippingRect({element:(o=await(a.isElement==null?void 0:a.isElement(E)))==null||o?E:E.contextElement||await(a.getDocumentElement==null?void 0:a.getDocumentElement(l.floating)),boundary:h,rootBoundary:u,strategy:p})),F=g==="floating"?{x:r,y:i,width:s.floating.width,height:s.floating.height}:s.reference,$=await(a.getOffsetParent==null?void 0:a.getOffsetParent(l.floating)),A=await(a.isElement==null?void 0:a.isElement($))&&await(a.getScale==null?void 0:a.getScale($))||{x:1,y:1},U=ge(a.convertOffsetParentRelativeRectToViewportRelativeRect?await a.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:F,offsetParent:$,strategy:p}):F);return{top:(_.top-U.top+C.top)/A.y,bottom:(U.bottom-_.bottom+C.bottom)/A.y,left:(_.left-U.left+C.left)/A.x,right:(U.right-_.right+C.right)/A.x}}var Ls=50,ki=async(e,t,o)=>{let{placement:r="bottom",strategy:i="absolute",middleware:a=[],platform:s}=o,l=s.detectOverflow?s:{...s,detectOverflow:Si},p=await(s.isRTL==null?void 0:s.isRTL(t)),h=await s.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:g}=Ci(h,r,p),y=r,v=0,C={};for(let S=0;S<a.length;S++){let E=a[S];if(!E)continue;let{name:_,fn:F}=E,{x:$,y:A,data:U,reset:V}=await F({x:u,y:g,initialPlacement:r,placement:y,strategy:i,middlewareData:C,rects:h,platform:l,elements:{reference:e,floating:t}});u=$??u,g=A??g,C[_]={...C[_],...U},V&&v<Ls&&(v++,typeof V=="object"&&(V.placement&&(y=V.placement),V.rects&&(h=V.rects===!0?await s.getElementRects({reference:e,floating:t,strategy:i}):V.rects),{x:u,y:g}=Ci(h,y,p)),S=-1)}return{x:u,y:g,placement:y,strategy:i,middlewareData:C}},$i=e=>({name:"arrow",options:e,async fn(t){let{x:o,y:r,placement:i,rects:a,platform:s,elements:l,middlewareData:p}=t,{element:h,padding:u=0}=me(e,t)||{};if(h==null)return{};let g=pr(u),y={x:o,y:r},v=qo(i),C=Bo(v),S=await s.getDimensions(h),E=v==="y",_=E?"top":"left",F=E?"bottom":"right",$=E?"clientHeight":"clientWidth",A=a.reference[C]+a.reference[v]-y[v]-a.floating[C],U=y[v]-a.reference[v],V=await(s.getOffsetParent==null?void 0:s.getOffsetParent(h)),X=V?V[$]:0;(!X||!await(s.isElement==null?void 0:s.isElement(V)))&&(X=l.floating[$]||a.floating[C]);let K=A/2-U/2,G=X/2-S[C]/2-1,Z=At(g[_],G),ut=At(g[F],G),je=X-S[C]-ut,Pt=X/2-S[C]/2+K,yt=dr(Z,Pt,je),de=!p.arrow&&fe(i)!=null&&Pt!==yt&&a.reference[C]/2-(Pt<Z?Z:ut)-S[C]/2<0,Nt=de?Pt<Z?Pt-Z:Pt-je:0;return{[v]:y[v]+Nt,data:{[v]:yt,centerOffset:Pt-yt-Nt,...de&&{alignmentOffset:Nt}},reset:de}}});var _i=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var o,r;let{placement:i,middlewareData:a,rects:s,initialPlacement:l,platform:p,elements:h}=t,{mainAxis:u=!0,crossAxis:g=!0,fallbackPlacements:y,fallbackStrategy:v="bestFit",fallbackAxisSideDirection:C="none",flipAlignment:S=!0,...E}=me(e,t);if((o=a.arrow)!=null&&o.alignmentOffset)return{};let _=re(i),F=Tt(l),$=re(l)===l,A=await(p.isRTL==null?void 0:p.isRTL(h.floating)),U=y||($||!S?[uo(l)]:yi(l)),V=C!=="none";!y&&V&&U.push(...xi(l,S,C,A));let X=[l,...U],K=await p.detectOverflow(t,E),G=[],Z=((r=a.flip)==null?void 0:r.overflows)||[];if(u&&G.push(K[_]),g){let yt=vi(i,s,A);G.push(K[yt[0]],K[yt[1]])}if(Z=[...Z,{placement:i,overflows:G}],!G.every(yt=>yt<=0)){var ut,je;let yt=(((ut=a.flip)==null?void 0:ut.index)||0)+1,de=X[yt];if(de&&(!(g==="alignment"?F!==Tt(de):!1)||Z.every(xt=>Tt(xt.placement)===F?xt.overflows[0]>0:!0)))return{data:{index:yt,overflows:Z},reset:{placement:de}};let Nt=(je=Z.filter(he=>he.overflows[0]<=0).sort((he,xt)=>he.overflows[1]-xt.overflows[1])[0])==null?void 0:je.placement;if(!Nt)switch(v){case"bestFit":{var Pt;let he=(Pt=Z.filter(xt=>{if(V){let Xt=Tt(xt.placement);return Xt===F||Xt==="y"}return!0}).map(xt=>[xt.placement,xt.overflows.filter(Xt=>Xt>0).reduce((Xt,ps)=>Xt+ps,0)]).sort((xt,Xt)=>xt[1]-Xt[1])[0])==null?void 0:Pt[0];he&&(Nt=he);break}case"initialPlacement":Nt=l;break}if(i!==Nt)return{reset:{placement:Nt}}}return{}}}};var Es=new Set(["left","top"]);async function zs(e,t){let{placement:o,platform:r,elements:i}=e,a=await(r.isRTL==null?void 0:r.isRTL(i.floating)),s=re(o),l=fe(o),p=Tt(o)==="y",h=Es.has(s)?-1:1,u=a&&p?-1:1,g=me(t,e),{mainAxis:y,crossAxis:v,alignmentAxis:C}=typeof g=="number"?{mainAxis:g,crossAxis:0,alignmentAxis:null}:{mainAxis:g.mainAxis||0,crossAxis:g.crossAxis||0,alignmentAxis:g.alignmentAxis};return l&&typeof C=="number"&&(v=l==="end"?C*-1:C),p?{x:v*u,y:y*h}:{x:y*h,y:v*u}}var Li=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var o,r;let{x:i,y:a,placement:s,middlewareData:l}=t,p=await zs(t,e);return s===((o=l.offset)==null?void 0:o.placement)&&(r=l.arrow)!=null&&r.alignmentOffset?{}:{x:i+p.x,y:a+p.y,data:{...p,placement:s}}}}},Ei=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){let{x:o,y:r,placement:i,platform:a}=t,{mainAxis:s=!0,crossAxis:l=!1,limiter:p={fn:F=>{let{x:$,y:A}=F;return{x:$,y:A}}},...h}=me(e,t),u={x:o,y:r},g=await a.detectOverflow(t,h),y=Tt(i),v=hr(y),C=u[v],S=u[y],E=(F,$)=>dr($+g[F==="y"?"top":"left"],$,$-g[F==="y"?"bottom":"right"]);s&&(C=E(v,C)),l&&(S=E(y,S));let _=p.fn({...t,[v]:C,[y]:S});return{..._,data:{x:_.x-o,y:_.y-r,enabled:{[v]:s,[y]:l}}}}}};var zi=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){let{placement:o,rects:r,platform:i,elements:a}=t,{apply:s=()=>{},...l}=me(e,t),p=await i.detectOverflow(t,l),h=re(o),u=fe(o),g=Tt(o)==="y",{width:y,height:v}=r.floating,C,S;h==="top"||h==="bottom"?(C=h,S=u===(await(i.isRTL==null?void 0:i.isRTL(a.floating))?"start":"end")?"left":"right"):(S=h,C=u==="end"?"top":"bottom");let E=v-p.top-p.bottom,_=y-p.left-p.right,F=At(v-p[C],E),$=At(y-p[S],_),A=t.middlewareData.shift,U=!A,V=F,X=$;A!=null&&A.enabled.x&&(X=_),A!=null&&A.enabled.y&&(V=E),U&&!u&&(g?X=y-2*_t(p.left,p.right):V=v-2*_t(p.top,p.bottom)),await s({...t,availableWidth:X,availableHeight:V});let K=await i.getDimensions(a.floating);return y!==K.width||v!==K.height?{reset:{rects:!0}}:{}}}};function Uo(){return typeof window<"u"}function be(e){return Ai(e)?(e.nodeName||"").toLowerCase():"#document"}function ht(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function It(e){var t;return(t=(Ai(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function Ai(e){return Uo()?e instanceof Node||e instanceof ht(e).Node:!1}function Lt(e){return Uo()?e instanceof Element||e instanceof ht(e).Element:!1}function jt(e){return Uo()?e instanceof HTMLElement||e instanceof ht(e).HTMLElement:!1}function Pi(e){return!Uo()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof ht(e).ShadowRoot}function go(e){let{overflow:t,overflowX:o,overflowY:r,display:i}=Et(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+o)&&i!=="inline"&&i!=="contents"}function Di(e){return/^(table|td|th)$/.test(be(e))}function wo(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}var Ps=/transform|translate|scale|rotate|perspective|filter/,As=/paint|layout|strict|content/,we=e=>!!e&&e!=="none",ur;function ze(e){let t=Lt(e)?Et(e):e;return we(t.transform)||we(t.translate)||we(t.scale)||we(t.rotate)||we(t.perspective)||!Vo()&&(we(t.backdropFilter)||we(t.filter))||Ps.test(t.willChange||"")||As.test(t.contain||"")}function Ti(e){let t=ie(e);for(;jt(t)&&!Pe(t);){if(ze(t))return t;if(wo(t))return null;t=ie(t)}return null}function Vo(){return ur==null&&(ur=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),ur}function Pe(e){return/^(html|body|#document)$/.test(be(e))}function Et(e){return ht(e).getComputedStyle(e)}function bo(e){return Lt(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function ie(e){if(be(e)==="html")return e;let t=e.assignedSlot||e.parentNode||Pi(e)&&e.host||It(e);return Pi(t)?t.host:t}function Ii(e){let t=ie(e);return Pe(t)?(e.ownerDocument||e).body:jt(t)&&go(t)?t:Ii(t)}function Ht(e,t,o){var r;t===void 0&&(t=[]),o===void 0&&(o=!0);let i=Ii(e),a=i===((r=e.ownerDocument)==null?void 0:r.body),s=ht(i);if(a){let l=Wo(s);return t.concat(s,s.visualViewport||[],go(i)?i:[],l&&o?Ht(l):[])}else return t.concat(i,Ht(i,[],o))}function Wo(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Mi(e){let t=Et(e),o=parseFloat(t.width)||0,r=parseFloat(t.height)||0,i=jt(e),a=i?e.offsetWidth:o,s=i?e.offsetHeight:r,l=mo(o)!==a||mo(r)!==s;return l&&(o=a,r=s),{width:o,height:r,$:l}}function fr(e){return Lt(e)?e:e.contextElement}function Ae(e){let t=fr(e);if(!jt(t))return Dt(1);let o=t.getBoundingClientRect(),{width:r,height:i,$:a}=Mi(t),s=(a?mo(o.width):o.width)/r,l=(a?mo(o.height):o.height)/i;return(!s||!Number.isFinite(s))&&(s=1),(!l||!Number.isFinite(l))&&(l=1),{x:s,y:l}}var Ds=Dt(0);function Fi(e){let t=ht(e);return!Vo()||!t.visualViewport?Ds:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function Ts(e,t,o){return t===void 0&&(t=!1),!!o&&t&&o===ht(e)}function ve(e,t,o,r){t===void 0&&(t=!1),o===void 0&&(o=!1);let i=e.getBoundingClientRect(),a=fr(e),s=Dt(1);t&&(r?Lt(r)&&(s=Ae(r)):s=Ae(e));let l=Ts(a,o,r)?Fi(a):Dt(0),p=(i.left+l.x)/s.x,h=(i.top+l.y)/s.y,u=i.width/s.x,g=i.height/s.y;if(a&&r){let y=ht(a),v=Lt(r)?ht(r):r,C=y,S=Wo(C);for(;S&&v!==C;){let E=Ae(S),_=S.getBoundingClientRect(),F=Et(S),$=_.left+(S.clientLeft+parseFloat(F.paddingLeft))*E.x,A=_.top+(S.clientTop+parseFloat(F.paddingTop))*E.y;p*=E.x,h*=E.y,u*=E.x,g*=E.y,p+=$,h+=A,C=ht(S),S=Wo(C)}}return ge({width:u,height:g,x:p,y:h})}function Ho(e,t){let o=bo(e).scrollLeft;return t?t.left+o:ve(It(e)).left+o}function Ni(e,t){let o=e.getBoundingClientRect(),r=o.left+t.scrollLeft-Ho(e,o),i=o.top+t.scrollTop;return{x:r,y:i}}function Is(e){let{elements:t,rect:o,offsetParent:r,strategy:i}=e,a=i==="fixed",s=It(r),l=t?wo(t.floating):!1;if(r===s||l&&a)return o;let p={scrollLeft:0,scrollTop:0},h=Dt(1),u=Dt(0),g=jt(r);if((g||!a)&&((be(r)!=="body"||go(s))&&(p=bo(r)),g)){let v=ve(r);h=Ae(r),u.x=v.x+r.clientLeft,u.y=v.y+r.clientTop}let y=s&&!g&&!a?Ni(s,p):Dt(0);return{width:o.width*h.x,height:o.height*h.y,x:o.x*h.x-p.scrollLeft*h.x+u.x+y.x,y:o.y*h.y-p.scrollTop*h.y+u.y+y.y}}function Rs(e){return e.getClientRects?Array.from(e.getClientRects()):[]}function Os(e){let t=bo(e),o=e.ownerDocument.body,r=_t(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth),i=_t(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight),a=-t.scrollLeft+Ho(e),s=-t.scrollTop;return Et(o).direction==="rtl"&&(a+=_t(e.clientWidth,o.clientWidth)-r),{width:r,height:i,x:a,y:s}}var Ms=25;function Fs(e,t,o){o===void 0&&(o="viewport");let r=o==="layoutViewport",i=ht(e),a=It(e),s=i.visualViewport,l=a.clientWidth,p=a.clientHeight,h=0,u=0;if(s){let y=!Vo()||t==="fixed";r?y||(h=-s.offsetLeft,u=-s.offsetTop):(l=s.width,p=s.height,y&&(h=s.offsetLeft,u=s.offsetTop))}if(Ho(a)<=0){let y=a.ownerDocument,v=y.body,C=getComputedStyle(v),S=y.compatMode==="CSS1Compat"&&parseFloat(C.marginLeft)+parseFloat(C.marginRight)||0,E=Math.abs(a.clientWidth-v.clientWidth-S),_=getComputedStyle(a).scrollbarGutter==="stable both-edges"?E/2:E;_<=Ms&&(l-=_)}return{width:l,height:p,x:h,y:u}}function Ns(e,t){let o=ve(e,!0,t==="fixed"),r=o.top+e.clientTop,i=o.left+e.clientLeft,a=Ae(e),s=e.clientWidth*a.x,l=e.clientHeight*a.y,p=i*a.x,h=r*a.y;return{width:s,height:l,x:p,y:h}}function Ri(e,t,o){let r;if(t==="viewport"||t==="layoutViewport")r=Fs(e,o,t);else if(t==="document")r=Os(It(e));else if(Lt(t))r=Ns(t,o);else{let i=Fi(e);r={x:t.x-i.x,y:t.y-i.y,width:t.width,height:t.height}}return ge(r)}function Bs(e,t){let o=t.get(e);if(o)return o;let r=Ht(e,[],!1).filter(l=>Lt(l)&&be(l)!=="body"),i=null,a=Et(e).position==="fixed",s=a?ie(e):e;for(;Lt(s)&&!Pe(s);){let l=Et(s),p=ze(s),h=i?i.position:a?"fixed":"";!p&&(h==="fixed"||h==="absolute"&&l.position==="static")?r=r.filter(g=>g!==s):i=l,s=ie(s)}return t.set(e,r),r}function qs(e){let{element:t,boundary:o,rootBoundary:r,strategy:i}=e,s=[...o==="clippingAncestors"?wo(t)?[]:Bs(t,this._c):[].concat(o),r],l=Ri(t,s[0],i),p=l.top,h=l.right,u=l.bottom,g=l.left;for(let y=1;y<s.length;y++){let v=Ri(t,s[y],i);p=_t(v.top,p),h=At(v.right,h),u=At(v.bottom,u),g=_t(v.left,g)}return{width:h-g,height:u-p,x:g,y:p}}function Us(e){let{width:t,height:o}=Mi(e);return{width:t,height:o}}function Vs(e,t,o){let r=jt(t),i=It(t),a=o==="fixed",s=ve(e,!0,a,t),l={scrollLeft:0,scrollTop:0},p=Dt(0);if((r||!a)&&((be(t)!=="body"||go(i))&&(l=bo(t)),r)){let y=ve(t,!0,a,t);p.x=y.x+t.clientLeft,p.y=y.y+t.clientTop}!r&&i&&(p.x=Ho(i));let h=i&&!r&&!a?Ni(i,l):Dt(0),u=s.left+l.scrollLeft-p.x-h.x,g=s.top+l.scrollTop-p.y-h.y;return{x:u,y:g,width:s.width,height:s.height}}function mr(e){return Et(e).position==="static"}function Oi(e,t){if(!jt(e)||Et(e).position==="fixed")return null;if(t)return t(e);let o=e.offsetParent;return It(e)===o&&(o=o.ownerDocument.body),o}function Bi(e,t){let o=ht(e);if(wo(e))return o;if(!jt(e)){let i=ie(e);for(;i&&!Pe(i);){if(Lt(i)&&!mr(i))return i;i=ie(i)}return o}let r=Oi(e,t);for(;r&&Di(r)&&mr(r);)r=Oi(r,t);return r&&Pe(r)&&mr(r)&&!ze(r)?o:r||Ti(e)||o}var Ws=async function(e){let t=this.getOffsetParent||Bi,o=this.getDimensions,r=await o(e.floating);return{reference:Vs(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function Hs(e){return Et(e).direction==="rtl"}var vo={convertOffsetParentRelativeRectToViewportRelativeRect:Is,getDocumentElement:It,getClippingRect:qs,getOffsetParent:Bi,getElementRects:Ws,getClientRects:Rs,getDimensions:Us,getScale:Ae,isElement:Lt,isRTL:Hs};function qi(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function js(e,t,o){let r=null,i,a=It(e);function s(){var u;clearTimeout(i),(u=r)==null||u.disconnect(),r=null}function l(u,g){u===void 0&&(u=!1),g===void 0&&(g=1),s();let y=e.getBoundingClientRect(),{left:v,top:C,width:S,height:E}=y;if(u||t(),!S||!E)return;let _=fo(C),F=fo(a.clientWidth-(v+S)),$=fo(a.clientHeight-(C+E)),A=fo(v),V={rootMargin:-_+"px "+-F+"px "+-$+"px "+-A+"px",threshold:_t(0,At(1,g))||1},X=!0;function K(G){let Z=G[0].intersectionRatio;if(!qi(y,e.getBoundingClientRect()))return l();if(Z!==g){if(!X)return l();Z?l(!1,Z):i=setTimeout(()=>{l(!1,1e-7)},1e3)}X=!1}try{r=new IntersectionObserver(K,{...V,root:a.ownerDocument})}catch{r=new IntersectionObserver(K,V)}r.observe(e)}let p=ht(e),h=()=>l(o);return p.addEventListener("resize",h),l(!0),()=>{p.removeEventListener("resize",h),s()}}function Ui(e,t,o,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:p=!1}=r,h=fr(e),u=i||a?[...h?Ht(h):[],...t?Ht(t):[]]:[];u.forEach(_=>{i&&_.addEventListener("scroll",o),a&&_.addEventListener("resize",o)});let g=h&&l?js(h,o,a):null,y=-1,v=null;s&&(v=new ResizeObserver(_=>{let[F]=_;F&&F.target===h&&v&&t&&(v.unobserve(t),cancelAnimationFrame(y),y=requestAnimationFrame(()=>{var $;($=v)==null||$.observe(t)})),o()}),h&&!p&&v.observe(h),t&&v.observe(t));let C,S=p?ve(e):null;p&&E();function E(){let _=ve(e);S&&!qi(S,_)&&o(),S=_,C=requestAnimationFrame(E)}return o(),()=>{var _;u.forEach(F=>{i&&F.removeEventListener("scroll",o),a&&F.removeEventListener("resize",o)}),g?.(),(_=v)==null||_.disconnect(),v=null,p&&cancelAnimationFrame(C)}}var Vi=Li;var Wi=Ei,Hi=_i,gr=zi;var ji=$i;var Yi=(e,t,o)=>{let r=new Map,i=o??{},a={...vo,...i.platform,_c:r};return ki(e,t,{...i,platform:a})};function Xi(e){return Ys(e)}function wr(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function Ys(e){for(let t=e;t;t=wr(t))if(t instanceof Element&&getComputedStyle(t).display==="none")return null;for(let t=wr(e);t;t=wr(t)){if(!(t instanceof Element))continue;let o=getComputedStyle(t);if(o.display!=="contents"&&(o.position!=="static"||ze(o)||t.tagName==="BODY"))return t}return null}function Ki(e){return e!==null&&typeof e=="object"&&"getBoundingClientRect"in e&&("contextElement"in e?e instanceof Element:!0)}var Xs=!!globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),B=class extends N{constructor(){super(...arguments),this.localize=new Y(this),this.SUPPORTS_POPOVER=!1,this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom"),r=0,i=0,a=0,s=0,l=0,p=0,h=0,u=0;o?e.top<t.top?(r=e.left,i=e.bottom,a=e.right,s=e.bottom,l=t.left,p=t.top,h=t.right,u=t.top):(r=t.left,i=t.bottom,a=t.right,s=t.bottom,l=e.left,p=e.top,h=e.right,u=e.top):e.left<t.left?(r=e.right,i=e.top,a=t.left,s=t.top,l=e.right,p=e.bottom,h=t.left,u=t.bottom):(r=t.right,i=t.top,a=e.left,s=e.top,l=t.right,p=t.bottom,h=e.left,u=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${i}px`),this.style.setProperty("--hover-bridge-top-right-x",`${a}px`),this.style.setProperty("--hover-bridge-top-right-y",`${s}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.SUPPORTS_POPOVER=Xs,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else this.anchor instanceof Element||Ki(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||!this.isConnected||(this.popup?.showPopover?.(),this.cleanup=Ui(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){if(!this.active||!this.anchorEl||!this.popup)return;let e=[Vi({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?e.push(gr({apply:({rects:r})=>{let i=this.sync==="width"||this.sync==="both",a=this.sync==="height"||this.sync==="both";this.popup.style.width=i?`${r.reference.width}px`:"",this.popup.style.height=a?`${r.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let t;this.SUPPORTS_POPOVER&&!Ki(this.anchor)&&this.boundary==="scroll"&&(t=Ht(this.anchorEl).filter(r=>r instanceof Element)),this.flip&&e.push(Hi({boundary:this.flipBoundary||t,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&e.push(Wi({boundary:this.shiftBoundary||t,padding:this.shiftPadding})),this.autoSize?e.push(gr({boundary:this.autoSizeBoundary||t,padding:this.autoSizePadding,apply:({availableWidth:r,availableHeight:i})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${i}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${r}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&e.push(ji({element:this.arrowEl,padding:this.arrowPadding}));let o=this.SUPPORTS_POPOVER?r=>vo.getOffsetParent(r,Xi):vo.getOffsetParent;Yi(this.anchorEl,this.popup,{placement:this.placement,middleware:e,strategy:this.SUPPORTS_POPOVER?"absolute":"fixed",platform:{...vo,getOffsetParent:o}}).then(({x:r,y:i,middlewareData:a,placement:s})=>{let l=this.localize.dir()==="rtl",p={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${r}px`,top:`${i}px`}),this.arrow){let h=a.arrow.x,u=a.arrow.y,g="",y="",v="",C="";if(this.arrowPlacement==="start"){let S=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";g=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",y=l?S:"",C=l?"":S}else if(this.arrowPlacement==="end"){let S=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";y=l?"":S,C=l?S:"",v=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(C=typeof h=="number"?"calc(50% - var(--arrow-size-diagonal))":"",g=typeof u=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(C=typeof h=="number"?`${h}px`:"",g=typeof u=="number"?`${u}px`:"");Object.assign(this.arrowEl.style,{top:g,right:y,bottom:v,left:C,[p]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new fi)}render(){return c`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${H({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${H({popup:!0,"popup-active":this.active,"popup-fixed":!this.SUPPORTS_POPOVER,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?c`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};B.css=gi;n([D(".popup")],B.prototype,"popup",2);n([D(".arrow")],B.prototype,"arrowEl",2);n([d({attribute:!1,type:Boolean})],B.prototype,"SUPPORTS_POPOVER",2);n([d()],B.prototype,"anchor",2);n([d({type:Boolean,reflect:!0})],B.prototype,"active",2);n([d({reflect:!0})],B.prototype,"placement",2);n([d()],B.prototype,"boundary",2);n([d({type:Number})],B.prototype,"distance",2);n([d({type:Number})],B.prototype,"skidding",2);n([d({type:Boolean})],B.prototype,"arrow",2);n([d({attribute:"arrow-placement"})],B.prototype,"arrowPlacement",2);n([d({attribute:"arrow-padding",type:Number})],B.prototype,"arrowPadding",2);n([d({type:Boolean})],B.prototype,"flip",2);n([d({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(t=>t.trim()).filter(t=>t!==""),toAttribute:e=>e.join(" ")}})],B.prototype,"flipFallbackPlacements",2);n([d({attribute:"flip-fallback-strategy"})],B.prototype,"flipFallbackStrategy",2);n([d({type:Object})],B.prototype,"flipBoundary",2);n([d({attribute:"flip-padding",type:Number})],B.prototype,"flipPadding",2);n([d({type:Boolean})],B.prototype,"shift",2);n([d({type:Object})],B.prototype,"shiftBoundary",2);n([d({attribute:"shift-padding",type:Number})],B.prototype,"shiftPadding",2);n([d({attribute:"auto-size"})],B.prototype,"autoSize",2);n([d()],B.prototype,"sync",2);n([d({type:Object})],B.prototype,"autoSizeBoundary",2);n([d({attribute:"auto-size-padding",type:Number})],B.prototype,"autoSizePadding",2);n([d({attribute:"hover-bridge",type:Boolean})],B.prototype,"hoverBridge",2);B=n([I("wa-popup")],B);var ae=()=>({checkValidity(e){let t=e.input,o={message:"",isValid:!0,invalidKeys:[]};if(!t)return o;let r=!0;if("checkValidity"in t&&(r=t.checkValidity()),r)return o;if(o.isValid=!1,"validationMessage"in t&&(o.message=t.validationMessage),!("validity"in t))return o.invalidKeys.push("customError"),o;for(let i in t.validity){if(i==="valid")continue;let a=i;t.validity[a]&&o.invalidKeys.push(a)}return o}});var Gi=w`
  @layer wa-component {
    :host {
      display: inline-block;

      /* Workaround because Chrome doesn't like :host(:has()) below
       * https://issues.chromium.org/issues/40062355
       * Firefox doesn't like this nested rule, so both are needed */
      &:has(wa-badge) {
        position: relative;
      }
    }

    /* Apply relative positioning only when needed to position wa-badge
     * This avoids creating a new stacking context for every button */
    :host(:has(wa-badge)) {
      position: relative;
    }
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    transition-property: background, border, box-shadow, color, opacity, transform;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    transform-origin: center;
    cursor: pointer;
    padding: 0 var(--wa-form-control-padding-inline);
    font-family: inherit;
    font-size: inherit;
    font-weight: var(--wa-font-weight-action);
    height: var(--wa-form-control-height);
    width: 100%;

    background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));

    border-color: transparent;
    color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-form-control-border-radius));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-form-control-border-radius));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-form-control-border-radius));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-form-control-border-radius));
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
  }

  /* Hover and active transforms */
  .button:not(.disabled):not(.loading) {
    @media (hover: hover) {
      &:hover {
        transform: var(--wa-button-transform-hover);
      }
    }
    &:active {
      transform: var(--wa-button-transform-active);
    }

    @media (prefers-reduced-motion: reduce) {
      &:hover,
      &:active {
        transform: none;
      }
    }
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='outlined']) {
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled-outlined']) {
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='accent']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
        var(--wa-color-mix-active)
      );
    }
  }

  /* Focus states */
  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled state */
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;

    /* When disabled, prevent mouse events from bubbling up from children */
    .button {
      pointer-events: none;
    }
  }

  /* Keep it last so Safari doesn't stop parsing this block */
  .button::-moz-focus-inner {
    border: 0;
  }

  /* Icon buttons */
  .button.is-icon-button {
    outline-offset: 2px;
    width: var(--wa-form-control-height);
    aspect-ratio: 1;
  }

  /* Icon buttons with a caret need to grow to fit both the icon and the caret */
  .button.is-icon-button.caret {
    width: auto;
    aspect-ratio: auto;
    min-width: var(--wa-form-control-height);
  }

  /* Pill modifier */
  :host([pill]) .button {
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-border-radius-pill));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-border-radius-pill));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-border-radius-pill));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-border-radius-pill));
  }

  /*
   * Label
   */

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .label {
    display: inline-block;
  }

  .is-icon-button .label {
    display: flex;
    justify-content: center;
  }

  .label::slotted(wa-icon) {
    align-self: center;
  }

  /*
   * Caret modifier
   */

  wa-icon[part='caret'] {
    display: flex;
    align-self: center;
    align-items: center;

    &::part(svg) {
      width: 0.875em;
      height: 0.875em;
    }

    .button:has(&) .end {
      display: none;
    }
  }

  /*
   * Loading modifier
   */

  .loading {
    position: relative;
    cursor: wait;

    .start,
    .label,
    .end,
    .caret {
      /* Hidden with opacity, not visibility, so the label stays in the accessibility tree */
      opacity: 0;

      /* Unlike visibility: hidden, opacity leaves the content clickable */
      pointer-events: none;
    }

    wa-spinner {
      --indicator-color: currentColor;
      --track-color: color-mix(in oklab, currentColor, transparent 90%);

      position: absolute;
      font-size: 1em;
      height: 1em;
      width: 1em;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.5em);
    }
  }

  /*
   * Badges
   */

  .button ::slotted(wa-badge) {
    border-color: var(--wa-color-surface-default);
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  :host(:dir(rtl)) ::slotted(wa-badge) {
    translate: -50% -50%;
  }

  /*
  * Button spacing
  */

  slot[name='start']::slotted(*) {
    margin-inline-end: 0.75em;
  }

  slot[name='end']::slotted(*),
  .button:not(.visually-hidden-label) [part='caret'] {
    margin-inline-start: 0.75em;
  }
`;var T=e=>e??dt;var Qi=Symbol.for(""),Ks=e=>{if(e?.r===Qi)return e?._$litStatic$};var br=(e,...t)=>({_$litStatic$:t.reduce((o,r,i)=>o+(a=>{if(a._$litStatic$!==void 0)return a._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(r)+e[i+1],e[0]),r:Qi}),Ji=new Map,vr=e=>(t,...o)=>{let r=o.length,i,a,s=[],l=[],p,h=0,u=!1;for(;h<r;){for(p=t[h];h<r&&(a=o[h],(i=Ks(a))!==void 0);)p+=i+t[++h],u=!0;h!==r&&l.push(a),s.push(p),h++}if(h===r&&s.push(t[r]),u){let g=s.join("$$lit$$");(t=Ji.get(g))===void 0&&(s.raw=s,Ji.set(g,t=s)),o=l}return e(t,...o)},jo=vr(c),Ap=vr(Xr),Dp=vr(Kr);var M=class extends J{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new bt(this,"[default]","start","end"),this.localize=new Y(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="m",this.withCaret=!1,this.withStart=!1,this.withEnd=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button"}static get validators(){return[...super.validators,ae()]}handleSizeChange(){nt(this.localName,this.size)}constructLightDOMButton(){let e=document.createElement("button");for(let t of this.attributes)t.name!=="style"&&e.setAttribute(t.name,t.value);return e.type=this.type,e.style.position="absolute !important",e.style.width="0 !important",e.style.height="0 !important",e.style.clipPath="inset(50%) !important",e.style.overflow="hidden !important",e.style.whiteSpace="nowrap !important",this.name&&(e.name=this.name),e.value=this.value||"",e}handleClick(e){if(this.disabled||this.loading){e.preventDefault(),e.stopImmediatePropagation();return}if(this.type!=="submit"&&this.type!=="reset"||!this.getForm())return;let o=this.constructLightDOMButton();this.parentElement?.append(o),o.click(),o.remove()}handleInvalid(){this.dispatchEvent(new Oo)}handleLabelSlotChange(){let e=this.labelSlot.assignedNodes({flatten:!0}),t=!1,o=!1,r=!1,i=!1;[...e].forEach(a=>{if(a.nodeType===Node.ELEMENT_NODE){let s=a;s.localName==="wa-icon"?(o=!0,t||(t=s.label!==void 0)):i=!0}else a.nodeType===Node.TEXT_NODE&&(a.textContent?.trim()||"").length>0&&(r=!0)}),this.isIconButton=o&&!r&&!i,this.customStates.set("icon-button",this.isIconButton),this.isIconButton&&!t&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.updateValidity()}handleHrefChange(){this.customStates.set("link",this.isLink())}handleLoadingChange(){this.customStates.set("loading",this.loading)}setValue(...e){}click(){this.button.click()}focus(e){this.button.focus(e)}blur(){this.button.blur()}render(){let e=this.isLink(),t=e?br`a`:br`button`;return jo`
      <${t}
        part="base button"
        class=${H({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()==="rtl","has-label":this.hasSlotController.test("[default]"),"has-start":this.hasSlotController.test("start","withStart"),"has-end":this.hasSlotController.test("end","withEnd"),"is-icon-button":this.isIconButton})}
        ?disabled=${T(e?void 0:this.disabled)}
        type=${T(e?void 0:this.type)}
        title=${this.title}
        name=${T(e?void 0:this.name)}
        value=${T(e?void 0:this.value)}
        href=${T(e?this.href:void 0)}
        target=${T(e?this.target:void 0)}
        download=${T(e?this.download:void 0)}
        rel=${T(e&&this.rel?this.rel:void 0)}
        role=${T(e?void 0:"button")}
        aria-disabled=${T(e&&this.disabled?"true":void 0)}
        aria-busy=${this.loading?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret?jo`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:""}
        ${this.loading?jo`<wa-spinner part="spinner"></wa-spinner>`:""}
      </${t}>
    `}};M.shadowRootOptions={...J.shadowRootOptions,delegatesFocus:!0};M.css=[Gi,oe,lt];n([D(".button")],M.prototype,"button",2);n([D("slot:not([name])")],M.prototype,"labelSlot",2);n([W()],M.prototype,"invalid",2);n([W()],M.prototype,"isIconButton",2);n([d()],M.prototype,"title",2);n([d({reflect:!0})],M.prototype,"variant",2);n([d({reflect:!0})],M.prototype,"appearance",2);n([d({reflect:!0})],M.prototype,"size",2);n([R("size")],M.prototype,"handleSizeChange",1);n([d({attribute:"with-caret",type:Boolean,reflect:!0})],M.prototype,"withCaret",2);n([d({attribute:"with-start",type:Boolean})],M.prototype,"withStart",2);n([d({attribute:"with-end",type:Boolean})],M.prototype,"withEnd",2);n([d({type:Boolean})],M.prototype,"disabled",2);n([d({type:Boolean,reflect:!0})],M.prototype,"loading",2);n([d({type:Boolean,reflect:!0})],M.prototype,"pill",2);n([d()],M.prototype,"type",2);n([d({reflect:!0})],M.prototype,"name",2);n([d({reflect:!0})],M.prototype,"value",2);n([d({reflect:!0})],M.prototype,"href",2);n([d()],M.prototype,"target",2);n([d()],M.prototype,"rel",2);n([d()],M.prototype,"download",2);n([d({attribute:"formaction"})],M.prototype,"formAction",2);n([d({attribute:"formenctype"})],M.prototype,"formEnctype",2);n([d({attribute:"formmethod"})],M.prototype,"formMethod",2);n([d({attribute:"formnovalidate",type:Boolean})],M.prototype,"formNoValidate",2);n([d({attribute:"formtarget"})],M.prototype,"formTarget",2);n([R("disabled",{waitUntilFirstUpdate:!0})],M.prototype,"handleDisabledChange",1);n([R("href")],M.prototype,"handleHrefChange",1);n([R("loading",{waitUntilFirstUpdate:!0})],M.prototype,"handleLoadingChange",1);M=n([I("wa-button")],M);M.disableWarning?.("change-in-update");var Zi=w`
  :host {
    --track-width: 2px;
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-color: var(--wa-color-brand-fill-loud);
    --speed: 2s;
    --size: 1em;

    /*
      Resizing a spinner element using anything but font-size will break the animation because the animation uses em
      units. Therefore, if a spinner is used in a flex container without \`flex: none\` applied, the spinner can
      grow/shrink and break the animation. The use of \`flex: none\` on the host element prevents this by always having
      the spinner sized according to its actual dimensions.
    */
    flex: none;
    display: inline-flex;
    width: var(--size);
    height: var(--size);
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    animation: spin var(--speed) linear infinite;
  }

  .track,
  .indicator {
    --radius: calc(var(--size) / 2 - var(--track-width) / 2);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
    r: var(--radius);
    fill: none;
    stroke-width: var(--track-width);
  }

  .track {
    stroke: var(--track-color);
  }

  .indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: calc(0.597 * var(--circumference)), calc(0.796 * var(--circumference));
    stroke-dashoffset: calc(-0.04 * var(--circumference));
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: calc(0.008 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.278 * var(--circumference));
    }
    100% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.987 * var(--circumference));
    }
  }
`;var Yo=class extends N{constructor(){super(...arguments),this.localize=new Y(this)}render(){return c`
      <svg
        part="base spinner"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" />
        <circle class="indicator" />
      </svg>
    `}};Yo.css=Zi;Yo=n([I("wa-spinner")],Yo);var ta=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}};var ea=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};var oa=w`
  :host {
    --primary-color: currentColor;
    --primary-opacity: 1;
    --secondary-color: currentColor;
    --secondary-opacity: 0.4;
    --rotate-angle: 0deg;

    box-sizing: content-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: -0.125em;
  }

  /* #region Canvas — the box the icon is centered within (mirrors Font Awesome's icon canvas). Orthogonal to font-size. */

  /* Fixed width (default): 1.25em × 1em (20 × 16px) */
  :host(:not([canvas])),
  :host([canvas='fixed']) {
    width: 1.25em;
    height: 1em;
    min-width: 1.25em; /* <-- this is what Safari respects for intrinsic */
    min-height: 1em;
  }

  /* Auto: hug the icon's width. \`auto-width\` is the deprecated alias for canvas="auto". */
  :host([canvas='auto']),
  :host([auto-width]:not([canvas])) {
    width: auto;
    height: 1em;
  }

  /* Square: 1.25em × 1.25em (20 × 20px) */
  :host([canvas='square']) {
    width: 1.25em;
    height: 1.25em;
    min-width: 1.25em;
    min-height: 1.25em;
  }

  /* Roomy: 1.5em × 1.5em (24 × 24px) */
  :host([canvas='roomy']) {
    width: 1.5em;
    height: 1.5em;
    min-width: 1.5em;
    min-height: 1.5em;
  }

  /* #endregion */

  svg {
    /* NOTE: Avoid setting fill here. A stylesheet rule beats SVG presentation attributes, breaking stroke-based
       libraries like Lucide (fill="none" stroke="currentColor") and attribute-based mutators (issue #1733). The default
       library applies fill="currentColor" in its mutator instead. */
    height: 1em;
    overflow: visible;
    width: auto;

    /* Duotone colors with path-specific opacity fallback */
    path[data-duotone-primary] {
      color: var(--primary-color);
      opacity: var(--path-opacity, var(--primary-opacity));
    }

    path[data-duotone-secondary] {
      color: var(--secondary-color);
      opacity: var(--path-opacity, var(--secondary-opacity));
    }
  }

  /* Rotation */
  :host([rotate]) {
    transform: rotate(var(--rotate-angle, 0deg));
  }

  /* Flipping */
  :host([flip='x']) {
    transform: scaleX(-1);
  }
  :host([flip='y']) {
    transform: scaleY(-1);
  }
  :host([flip='both']) {
    transform: scale(-1, -1);
  }

  /* Rotation and Flipping combined */
  :host([rotate][flip='x']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleX(-1);
  }
  :host([rotate][flip='y']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleY(-1);
  }
  :host([rotate][flip='both']) {
    transform: rotate(var(--rotate-angle, 0deg)) scale(-1, -1);
  }

  /* #region Animations — ported from Font Awesome 7.3 (--fa-* props mapped to wa-icon's --* names) */

  :host([animation='beat']) {
    animation-name: beat;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='bounce']) {
    animation-name: bounce;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
  }

  :host([animation='fade']) {
    animation-name: fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='beat-fade']) {
    animation-name: beat-fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='flip']) {
    animation-name: flip;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1.5s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='flip-360']) {
    animation-name: flip-360;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='shake']) {
    animation-name: shake;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.75s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='spin']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-pulse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, steps(8));
  }

  /* spin-reverse is FA's reverse modifier expressed as a standalone value; reverse any spin via --animation-direction: reverse */
  :host([animation='spin-reverse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, reverse);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap']) {
    animation-name: spin-snap;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 3s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap-4']) {
    animation-name: spin-snap-4;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2.4s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap-8']) {
    animation-name: spin-snap-8;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 4s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='buzz']) {
    animation-name: buzz;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.6s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='wag']) {
    animation-name: wag;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.9s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
    transform-origin: bottom center;
  }

  :host([animation='float']) {
    animation-name: float;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 3s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
    will-change: transform;
  }

  :host([animation='swing']) {
    animation-name: swing;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1.2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
    transform-origin: top center;
  }

  :host([animation='jello']) {
    animation-name: jello;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.9s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
  }

  @media (prefers-reduced-motion: reduce) {
    :host([animation='beat']),
    :host([animation='bounce']),
    :host([animation='fade']),
    :host([animation='beat-fade']),
    :host([animation='flip']),
    :host([animation='flip-360']),
    :host([animation='shake']),
    :host([animation='spin']),
    :host([animation='spin-pulse']),
    :host([animation='spin-reverse']),
    :host([animation='spin-snap']),
    :host([animation='spin-snap-4']),
    :host([animation='spin-snap-8']),
    :host([animation='buzz']),
    :host([animation='wag']),
    :host([animation='float']),
    :host([animation='swing']),
    :host([animation='jello']) {
      animation: none !important;
      transition: none !important;
    }
  }

  /* #endregion */

  /* #region Keyframes — ported verbatim from Font Awesome 7.3 */

  @keyframes beat {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(calc(1.25 * var(--beat-scale, 1.25)));
    }
    45% {
      transform: scale(calc(1.22 * var(--beat-scale, 1.22)));
    }
    65% {
      transform: scale(calc(1.25 * var(--beat-scale, 1.25)));
    }
    90% {
      transform: scale(1);
    }
  }

  @keyframes bounce {
    0% {
      transform: scale(1, 1) translateY(0);
      /* No fallback by design (ported from FA 7.3): the first segment uses the user's --animation-timing or the CSS
         initial ease, while the explicit cubic-beziers on later stops drive the bounce physics. */
      animation-timing-function: var(--animation-timing);
    }
    14% {
      transform: scale(var(--bounce-start-scale-x, 1.06), var(--bounce-start-scale-y, 0.94))
        translateY(var(--bounce-anticipation, 3px));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    32% {
      transform: scale(var(--bounce-jump-scale-x, 0.94), var(--bounce-jump-scale-y, 1.12))
        translateY(calc(-1 * var(--bounce-height, 0.5em)));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    52% {
      transform: scale(1, 1) translateY(calc(-1 * var(--bounce-height, 0.5em) * 1.1));
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    70% {
      transform: scale(var(--bounce-land-scale-x, 1.06), var(--bounce-land-scale-y, 0.92)) translateY(0);
      animation-timing-function: cubic-bezier(0.33, 0.33, 0.66, 1);
    }
    85% {
      transform: scale(0.98, 1.04) translateY(calc(-2px * var(--bounce-rebound, 1)));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }

  @keyframes fade {
    0% {
      opacity: 1;
      transform: scale(1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    40% {
      opacity: var(--fade-opacity, 0.4);
      transform: scale(0.98);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes beat-fade {
    0% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    25% {
      opacity: calc(var(--beat-fade-opacity, 0.4) + 0.4);
      transform: scale(var(--beat-fade-scale, 1.28));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    45% {
      opacity: 1;
      transform: scale(var(--beat-fade-scale, 1.25));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    65% {
      opacity: calc(var(--beat-fade-opacity, 0.4) + 0.4);
      transform: scale(var(--beat-fade-scale, 1.28));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    100% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
    }
  }

  @keyframes flip {
    0% {
      transform: perspective(2em) scale(1) rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    8% {
      transform: perspective(2em) scale(var(--flip-anticipation-scale, 0.95))
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    35% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.6));
      animation-timing-function: linear;
    }
    65% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.5));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    92% {
      transform: perspective(2em) scale(1)
        rotate3d(
          var(--flip-x, 0),
          var(--flip-y, 1),
          var(--flip-z, 0),
          calc(var(--flip-angle, -360deg) * var(--flip-overshoot, 1.04))
        );
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -360deg));
    }
  }

  @keyframes flip-360 {
    0% {
      transform: perspective(2em) scale(1) rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    8% {
      transform: perspective(2em) scale(var(--flip-anticipation-scale, 0.95))
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    50% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.6));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    80% {
      transform: perspective(2em) scale(1)
        rotate3d(
          var(--flip-x, 0),
          var(--flip-y, 1),
          var(--flip-z, 0),
          calc(var(--flip-angle, -360deg) * var(--flip-overshoot, 1.04))
        );
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -360deg));
    }
  }

  @keyframes shake {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    8% {
      transform: rotate(35deg) translateX(1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    20% {
      transform: rotate(-22deg) translateX(-1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    35% {
      transform: rotate(15deg) translateX(1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    50% {
      transform: rotate(-9deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    65% {
      transform: rotate(5deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    78% {
      transform: rotate(-3deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    90% {
      transform: rotate(1deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    12% {
      transform: rotate(60deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    16.67% {
      transform: rotate(60deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    28.67% {
      transform: rotate(120deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    33.33% {
      transform: rotate(120deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    45.33% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    62% {
      transform: rotate(240deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    66.67% {
      transform: rotate(240deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    78.67% {
      transform: rotate(300deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    83.33% {
      transform: rotate(300deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    95.33% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap-4 {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    15% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    25% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    40% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    65% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    75% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    90% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap-8 {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    9% {
      transform: rotate(45deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    12.5% {
      transform: rotate(45deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    21.5% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    25% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    34% {
      transform: rotate(135deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    37.5% {
      transform: rotate(135deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    46.5% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    59% {
      transform: rotate(225deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    62.5% {
      transform: rotate(225deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    71.5% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    75% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    84% {
      transform: rotate(315deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    87.5% {
      transform: rotate(315deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    96.5% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes buzz {
    0% {
      transform: translateX(0) rotate(0deg);
      animation-timing-function: cubic-bezier(0.1, 0, 0.9, 1);
    }
    5% {
      transform: translateX(var(--buzz-distance, 4px)) rotate(0.5deg);
    }
    10% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px))) rotate(-0.5deg);
    }
    15% {
      transform: translateX(var(--buzz-distance, 4px)) rotate(0.3deg);
    }
    20% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px))) rotate(-0.3deg);
    }
    25% {
      transform: translateX(calc(var(--buzz-distance, 4px) * 0.7)) rotate(0.2deg);
    }
    30% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px) * 0.7)) rotate(-0.2deg);
    }
    35% {
      transform: translateX(calc(var(--buzz-distance, 4px) * 0.4)) rotate(0.1deg);
    }
    40% {
      transform: translateX(0) rotate(0deg);
    }
    100% {
      transform: translateX(0) rotate(0deg);
    }
  }

  @keyframes wag {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    12% {
      transform: rotate(var(--wag-angle, 12deg));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    24% {
      transform: rotate(2deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    36% {
      transform: rotate(calc(var(--wag-angle, 12deg) * 0.85));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    48% {
      transform: rotate(1deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    58% {
      transform: rotate(calc(var(--wag-angle, 12deg) * 0.6));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    68% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    15% {
      transform: translateY(calc(-0.4 * var(--float-height, 6px))) translateX(var(--float-drift, 1px))
        rotate(var(--float-tilt, 1deg)) scale(1, 1);
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    35% {
      transform: translateY(calc(-1 * var(--float-height, 6px))) translateX(0) rotate(0deg)
        scale(var(--float-stretch-x, 0.98), var(--float-stretch-y, 1.03));
      animation-timing-function: cubic-bezier(0.5, 0, 0.5, 0);
    }
    50% {
      transform: translateY(calc(-0.92 * var(--float-height, 6px))) translateX(calc(-0.5 * var(--float-drift, 1px)))
        rotate(calc(-0.5 * var(--float-tilt, 1deg))) scale(0.995, 1.01);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    70% {
      transform: translateY(calc(-0.3 * var(--float-height, 6px))) translateX(calc(-1 * var(--float-drift, 1px)))
        rotate(calc(-1 * var(--float-tilt, 1deg))) scale(1, 1);
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    90% {
      transform: translateY(calc(0.05 * var(--float-height, 6px))) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: translateY(0) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
    }
  }

  @keyframes swing {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    8% {
      transform: rotate(var(--swing-angle, 22deg));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    18% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.85));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    28% {
      transform: rotate(calc(var(--swing-angle, 22deg) * 0.65));
      animation-timing-function: cubic-bezier(0.35, 0, 0.65, 1);
    }
    38% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.45));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    48% {
      transform: rotate(calc(var(--swing-angle, 22deg) * 0.25));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    56% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.1));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    64% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes jello {
    0% {
      transform: scale(1, 1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    12% {
      transform: scale(var(--jello-scale-x, 1.15), calc(2 - var(--jello-scale-x, 1.15)));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    24% {
      transform: scale(calc(2 - var(--jello-scale-y, 1.12)), var(--jello-scale-y, 1.12));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    36% {
      transform: scale(
        calc(1 + (var(--jello-scale-x, 1.15) - 1) * 0.5),
        calc(2 - (1 + (var(--jello-scale-x, 1.15) - 1) * 0.5))
      );
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    48% {
      transform: scale(
        calc(2 - (1 + (var(--jello-scale-y, 1.12) - 1) * 0.3)),
        calc(1 + (var(--jello-scale-y, 1.12) - 1) * 0.3)
      );
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    58% {
      transform: scale(1.02, 0.98);
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    68% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  /* #endregion */
`;var yr="",Gs="",xr="";function yo(e){yr=e}function Cr(e=""){if(!yr){let t=document.querySelector("[data-webawesome]");if(t?.hasAttribute("data-webawesome")){let o=new URL(t.getAttribute("data-webawesome")??"",window.location.href).pathname;yo(o)}else{let r=[...document.getElementsByTagName("script")].find(i=>i.src.endsWith("webawesome.js")||i.src.endsWith("webawesome.loader.js")||i.src.endsWith("webawesome.ssr-loader.js"));if(r){let i=String(r.getAttribute("src"));yo(i.split("/").slice(0,-1).join("/"))}}}return yr.replace(/\/$/,"")+(e?`/${e.replace(/^\//,"")}`:"")}function Sr(){return Gs.replace(/\/$/,"")}function ra(e){xr=e}function kr(){if(!xr){let e=document.querySelector("[data-fa-kit-code]");e&&ra(e.getAttribute("data-fa-kit-code")||"")}return xr}var ia="7.3.0";function aa(e,t,o){let r="solid";return t==="chisel"&&(r="chisel-regular"),t==="etch"&&(r="etch-solid"),t==="graphite"&&(r="graphite-thin"),t==="jelly"&&(r="jelly-regular",o==="duo-regular"&&(r="jelly-duo-regular"),o==="fill-regular"&&(r="jelly-fill-regular")),t==="jelly-duo"&&(r="jelly-duo-regular"),t==="jelly-fill"&&(r="jelly-fill-regular"),t==="notdog"&&(o==="solid"&&(r="notdog-solid"),o==="duo-solid"&&(r="notdog-duo-solid")),t==="notdog-duo"&&(r="notdog-duo-solid"),t==="slab"&&((o==="solid"||o==="regular")&&(r="slab-regular"),o==="press-regular"&&(r="slab-press-regular")),t==="slab-press"&&(r="slab-press-regular"),t==="slab-duo"&&(r="slab-duo-regular"),t==="slab-press-duo"&&(r="slab-press-duo-regular"),t==="thumbprint"&&(r="thumbprint-light"),t==="utility"&&(r="utility-semibold"),t==="utility-duo"&&(r="utility-duo-semibold"),t==="utility-fill"&&(r="utility-fill-semibold"),t==="whiteboard"&&(r="whiteboard-semibold"),t==="mosaic"&&(r="mosaic-solid"),t==="pixel"&&(r="pixel-regular"),t==="vellum"&&(r="vellum-solid"),t==="classic"&&(o==="thin"&&(r="thin"),o==="light"&&(r="light"),o==="regular"&&(r="regular"),o==="solid"&&(r="solid")),t==="duotone"&&(o==="thin"&&(r="duotone-thin"),o==="light"&&(r="duotone-light"),o==="regular"&&(r="duotone-regular"),o==="solid"&&(r="duotone")),t==="sharp"&&(o==="thin"&&(r="sharp-thin"),o==="light"&&(r="sharp-light"),o==="regular"&&(r="sharp-regular"),o==="solid"&&(r="sharp-solid")),t==="sharp-duotone"&&(o==="thin"&&(r="sharp-duotone-thin"),o==="light"&&(r="sharp-duotone-light"),o==="regular"&&(r="sharp-duotone-regular"),o==="solid"&&(r="sharp-duotone-solid")),t==="brands"&&(r="brands"),r}function Js(e,t,o){let r=aa(e,t,o),i=Sr();if(i)return`${i}/${r}/${e}.svg`;let a=kr();return a.length>0?`https://ka-p.fontawesome.com/releases/v${ia}/svgs/${r}/${e}.svg?token=${encodeURIComponent(a)}`:`https://ka-f.fontawesome.com/releases/v${ia}/svgs/${r}/${e}.svg`}var Qs={name:"default",resolver:(e,t="classic",o="solid")=>Js(e,t,o),mutator:(e,t)=>{if(e.hasAttribute("fill")||e.setAttribute("fill","currentColor"),t?.family&&!e.hasAttribute("data-duotone-initialized")){let{family:o,variant:r}=t;if(o==="duotone"||o==="sharp-duotone"||o==="notdog-duo"||o==="notdog"&&r==="duo-solid"||o==="jelly-duo"||o==="jelly"&&r==="duo-regular"||o==="utility-duo"||o==="slab-duo"||o==="slab-press-duo"||o==="thumbprint"){let i=[...e.querySelectorAll("path")],a=i.find(l=>!l.hasAttribute("opacity")),s=i.find(l=>l.hasAttribute("opacity"));if(!a||!s)return;if(a.setAttribute("data-duotone-primary",""),s.setAttribute("data-duotone-secondary",""),t.swapOpacity&&a&&s){let l=s.getAttribute("opacity")||"0.4";a.style.setProperty("--path-opacity",l),s.style.setProperty("--path-opacity","1")}e.setAttribute("data-duotone-initialized","")}}}},sa=Qs;function Zs(e){return`data:image/svg+xml,${encodeURIComponent(e)}`}var $r={solid:{"arrow-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7-105.4-105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>',"arrow-up":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-370.7 105.4 105.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>',backward:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M236.3 107.1C247.9 96 265 92.9 279.7 99.2C294.4 105.5 304 120 304 136L304 272.3L476.3 107.2C487.9 96 505 92.9 519.7 99.2C534.4 105.5 544 120 544 136L544 504C544 520 534.4 534.5 519.7 540.8C505 547.1 487.9 544 476.3 532.9L304 367.7L304 504C304 520 294.4 534.5 279.7 540.8C265 547.1 247.9 544 236.3 532.9L44.3 348.9C36.5 341.3 32 330.9 32 320C32 309.1 36.5 298.7 44.3 291.1L236.3 107.1z"/></svg>',"backward-step":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M491 100.8C478.1 93.8 462.3 94.5 450 102.6L192 272.1L192 128C192 110.3 177.7 96 160 96C142.3 96 128 110.3 128 128L128 512C128 529.7 142.3 544 160 544C177.7 544 192 529.7 192 512L192 367.9L450 537.5C462.3 545.6 478 546.3 491 539.3C504 532.3 512 518.8 512 504.1L512 136.1C512 121.4 503.9 107.9 491 100.9z"/></svg>',bars:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2026 Fonticons, Inc. --><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>',"angles-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M77.3 256 214.7 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256zm192 0L406.7 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L269.3 256z"/></svg>',"angles-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M434.7 256 297.3 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 256zm-192 0L105.3 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256z"/></svg>',check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',"closed-captioning":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M64 192C64 156.7 92.7 128 128 128L512 128C547.3 128 576 156.7 576 192L576 448C576 483.3 547.3 512 512 512L128 512C92.7 512 64 483.3 64 448L64 192zM216 272L248 272C252.4 272 256 275.6 256 280C256 293.3 266.7 304 280 304C293.3 304 304 293.3 304 280C304 249.1 278.9 224 248 224L216 224C185.1 224 160 249.1 160 280L160 360C160 390.9 185.1 416 216 416L248 416C278.9 416 304 390.9 304 360C304 346.7 293.3 336 280 336C266.7 336 256 346.7 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 280C208 275.6 211.6 272 216 272zM384 280C384 275.6 387.6 272 392 272L424 272C428.4 272 432 275.6 432 280C432 293.3 442.7 304 456 304C469.3 304 480 293.3 480 280C480 249.1 454.9 224 424 224L392 224C361.1 224 336 249.1 336 280L336 360C336 390.9 361.1 416 392 416L424 416C454.9 416 480 390.9 480 360C480 346.7 469.3 336 456 336C442.7 336 432 346.7 432 360C432 364.4 428.4 368 424 368L392 368C387.6 368 384 364.4 384 360L384 280z"/></svg>',"closed-captioning-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M39 39.1C48.4 29.7 63.6 29.7 72.9 39.1L161.8 128L512 128C547.3 128 576 156.7 576 192L576 448C576 473.5 561.1 495.4 539.6 505.8L601 567.1C610.4 576.5 610.4 591.7 601 601C591.6 610.3 576.4 610.4 567.1 601L39 73.1C29.7 63.7 29.7 48.5 39 39.1zM384 350.1L384 279.9C384 275.5 387.6 271.9 392 271.9L424 271.9C428.4 271.9 432 275.5 432 279.9C432 293.2 442.7 303.9 456 303.9C469.3 303.9 480 293.2 480 279.9C480 249 454.9 223.9 424 223.9L392 223.9C361.1 223.9 336 249 336 279.9L336 302.1L384 350.1zM445.5 411.6C465.7 403.2 480 383.2 480 359.9C480 346.6 469.3 335.9 456 335.9C442.7 335.9 432 346.6 432 359.9C432 364.3 428.4 367.9 424 367.9L401.8 367.9L445.5 411.6zM162.3 264.1C160.8 269.1 160 274.5 160 280L160 360C160 390.9 185.1 416 216 416L248 416C266.1 416 282.1 407.5 292.4 394.2L410.2 512L128 512C92.7 512 64 483.3 64 448L64 192C64 184.2 65.4 176.7 68 169.8L162.3 264.1zM256.1 357.9C256 358.6 256 359.3 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 309.8L256.1 357.9z"/></svg>',compress:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M160 64c0-17.7-14.3-32-32-32S96 46.3 96 64l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 320c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0z"/></svg>',ellipsis:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M96 320C96 289.1 121.1 264 152 264C182.9 264 208 289.1 208 320C208 350.9 182.9 376 152 376C121.1 376 96 350.9 96 320zM264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320zM488 264C518.9 264 544 289.1 544 320C544 350.9 518.9 376 488 376C457.1 376 432 350.9 432 320C432 289.1 457.1 264 488 264z"/></svg>',"ellipsis-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z"/></svg>',expand:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 96C110.3 96 96 110.3 96 128L96 224C96 241.7 110.3 256 128 256C145.7 256 160 241.7 160 224L160 160L224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L128 96zM160 416C160 398.3 145.7 384 128 384C110.3 384 96 398.3 96 416L96 512C96 529.7 110.3 544 128 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480L160 416zM416 96C398.3 96 384 110.3 384 128C384 145.7 398.3 160 416 160L480 160L480 224C480 241.7 494.3 256 512 256C529.7 256 544 241.7 544 224L544 128C544 110.3 529.7 96 512 96L416 96zM544 416C544 398.3 529.7 384 512 384C494.3 384 480 398.3 480 416L480 480L416 480C398.3 480 384 494.3 384 512C384 529.7 398.3 544 416 544L512 544C529.7 544 544 529.7 544 512L544 416z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',filter:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M32 64C19.1 64 7.4 71.8 2.4 83.8S.2 109.5 9.4 118.6L192 301.3 192 416c0 8.5 3.4 16.6 9.4 22.6l64 64c9.2 9.2 22.9 11.9 34.9 6.9S320 492.9 320 480l0-178.7 182.6-182.6c9.2-9.2 11.9-22.9 6.9-34.9S492.9 64 480 64L32 64z"/></svg>',forward:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M403.7 107.1C392.1 96 375 92.9 360.3 99.2C345.6 105.5 336 120 336 136L336 272.3L163.7 107.2C152.1 96 135 92.9 120.3 99.2C105.6 105.5 96 120 96 136L96 504C96 520 105.6 534.5 120.3 540.8C135 547.1 152.1 544 163.7 532.9L336 367.7L336 504C336 520 345.6 534.5 360.3 540.8C375 547.1 392.1 544 403.7 532.9L595.7 348.9C603.6 341.4 608 330.9 608 320C608 309.1 603.5 298.7 595.7 291.1L403.7 107.1z"/></svg>',file:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>',"file-audio":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>',"file-code":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>',"file-excel":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>',"file-image":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>',"file-pdf":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>',"file-powerpoint":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>',"file-video":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>',"file-word":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>',"file-zipper":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>',"forward-step":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M21 36.8c12.9-7 28.7-6.3 41 1.8L320 208.1 320 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 384c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-144.1-258 169.6c-12.3 8.1-28 8.8-41 1.8S0 454.7 0 440L0 72C0 57.3 8.1 43.8 21 36.8z"/></svg>',gauge:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm320 96c0-26.9-16.5-49.9-40-59.3L280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 172.7c-23.5 9.5-40 32.5-40 59.3 0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>',gear:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',"magnifying-glass":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',"picture-in-picture":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M448 32c35.3 0 64 28.7 64 64l0 112-64 0 0-112-384 0 0 320 144 0 0 64-144 0-6.5-.3c-30.1-3.1-54.1-27-57.1-57.1L0 416 0 96C0 62.9 25.2 35.6 57.5 32.3L64 32 448 32zm16 224c26.5 0 48 21.5 48 48l0 128c0 26.5-21.5 48-48 48l-160 0c-26.5 0-48-21.5-48-48l0-128c0-26.5 21.5-48 48-48l160 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',"play-circle":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',"table-columns":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm64 64l0 256 128 0 0-256-128 0zm320 0l-128 0 0 256 128 0 0-256z"/></svg>',thumbtack:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M32 32C32 14.3 46.3 0 64 0L320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-29.5 0 10.3 134.1c37.1 21.2 65.8 56.4 78.2 99.7l3.8 13.4c2.8 9.7 .8 20-5.2 28.1S362 352 352 352L32 352c-10 0-19.5-4.7-25.5-12.7s-8-18.4-5.2-28.1L5 297.8c12.4-43.3 41-78.5 78.2-99.7L93.5 64 64 64C46.3 64 32 49.7 32 32zM160 400l64 0 0 112c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-112z"/></svg>',"up-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M406.6 502.6l96-96c9.2-9.2 11.9-22.9 6.9-34.9S492.9 352 480 352l-64 0 0-320c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 320-64 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l96 96c12.5 12.5 32.8 12.5 45.3 0zM150.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-9.2 9.2-11.9 22.9-6.9 34.9S19.1 160 32 160l64 0 0 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-320 64 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-96-96z"/></svg>',upload:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',volume:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM441.1 107c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C443.3 170.7 464 210.9 464 256s-20.7 85.3-53.2 111.8c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5c43.2-35.2 70.9-88.9 70.9-149s-27.7-113.8-70.9-149zm-60.5 74.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>',"volume-low":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM380.6 181.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>',"volume-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM367 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{calendar:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z"/></svg>',"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',clock:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320zM64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},tn={name:"system",resolver:(e,t="classic",o="solid")=>{let i=$r[o][e]??$r.regular[e]??$r.regular["circle-question"];return i?Zs(i):""},mutator:e=>{e.hasAttribute("fill")||e.setAttribute("fill","currentColor")}},na=tn;var en="classic",on=[sa,na],la=new Set;function ca(e){la.add(e)}function da(e){la.delete(e)}function Xo(e){return on.find(t=>t.name===e)}function _r(){return en}var{I:Su}=Gr;var ha=(e,t)=>t===void 0?e?._$litType$!==void 0:e?._$litType$===t;var pa=e=>e.strings===void 0;var rn={},ua=(e,t=rn)=>e._$AH=t;var xo=Symbol(),Ko=Symbol(),Lr,Er=new Map,ot=class extends N{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(e,t)=>{let o;if(t?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=c`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`,await this.updateComplete;let r=this.shadowRoot.querySelector("[part='svg']");return typeof t.mutator=="function"&&t.mutator(r,this),this.svg}try{if(o=await fetch(e,{mode:"cors"}),!o.ok)return o.status===410?xo:Ko}catch{return Ko}try{let r=document.createElement("div");r.innerHTML=await o.text();let i=r.firstElementChild;if(i?.tagName?.toLowerCase()!=="svg")return xo;Lr||(Lr=new DOMParser);let s=Lr.parseFromString(i.outerHTML,"text/html").body.querySelector("svg");return s?(s.part.add("svg"),document.adoptNode(s)):xo}catch{return xo}}}connectedCallback(){super.connectedCallback(),ca(this)}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),da(this)}async getIconSource(){let e=Xo(this.library),t=this.family||_r();if(this.name&&e){let o=this.canvas==="auto"||this.autoWidth,r;try{r=await e.resolver(this.name,t,this.variant,o)}catch{r=void 0}return{url:r,fromLibrary:!0}}return{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){let{url:e,fromLibrary:t}=await this.getIconSource(),o=t?Xo(this.library):void 0;if(!e){this.svg=null;return}let r=Er.get(e);r||(r=this.resolveIcon(e,o),Er.set(e,r));let i=await r;i===Ko&&Er.delete(e);let a=await this.getIconSource();if(e===a.url){if(ha(i)){this.svg=i;return}switch(i){case Ko:case xo:this.svg=null,this.dispatchEvent(new ta);break;default:this.svg=i.cloneNode(!0),o?.mutator?.(this.svg,this),this.dispatchEvent(new ea)}}}willUpdate(e){return this.style||this.setStyleProperty("--rotate-angle",`${this.rotate}deg`),super.willUpdate(e)}updated(e){super.updated(e);let t=Xo(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);let o=this.shadowRoot?.querySelector("svg");o&&t?.mutator?.(o,this)}render(){return this.hasUpdated?this.svg:c`<svg part="svg" width="16" height="16" viewBox="0 0 16 16"></svg>`}};ot.css=oa;n([W()],ot.prototype,"svg",2);n([d({reflect:!0})],ot.prototype,"name",2);n([d({reflect:!0})],ot.prototype,"family",2);n([d({reflect:!0})],ot.prototype,"variant",2);n([d({reflect:!0})],ot.prototype,"canvas",2);n([d({attribute:"auto-width",type:Boolean,reflect:!0})],ot.prototype,"autoWidth",2);n([d({attribute:"swap-opacity",type:Boolean,reflect:!0})],ot.prototype,"swapOpacity",2);n([d()],ot.prototype,"src",2);n([d()],ot.prototype,"label",2);n([d({reflect:!0})],ot.prototype,"library",2);n([d({type:Number,reflect:!0})],ot.prototype,"rotate",2);n([d({type:String,reflect:!0})],ot.prototype,"flip",2);n([d({type:String,reflect:!0})],ot.prototype,"animation",2);n([R("label")],ot.prototype,"handleLabelChange",1);n([R(["family","name","library","variant","src","autoWidth","canvas","swapOpacity"],{waitUntilFirstUpdate:!0})],ot.prototype,"setIcon",1);ot=n([I("wa-icon")],ot);function Go(e,t){let o=e.metaKey||e.ctrlKey||e.shiftKey||e.altKey;e.key==="Enter"&&!o&&setTimeout(()=>{!e.defaultPrevented&&!e.isComposing&&ln(t)})}var an=new Map([["input",!0],["wa-input",!0],["wa-tag-input",!0],["wa-number-input",!0],["wa-otp-input",!0],["wa-slider",!0]]),sn=new Map([["button",!1],["checkbox",!1],["color",!1],["date",!1],["datetime-local",!1],["email",!0],["file",!1],["hidden",!1],["image",!1],["month",!1],["number",!0],["password",!0],["radio",!1],["range",!1],["reset",!0],["search",!0],["submit",!1],["tel",!0],["text",!0],["time",!1],["url",!0],["week",!1]]),nn=e=>{let t=e?.localName;if(!t||!!!an.get(t))return!1;if(t!=="input"&&t!=="wa-input")return!0;let r=e.type;return!!sn.get(r)};function ln(e){let t=null;if("form"in e&&(t=e.form),!t&&"getForm"in e&&(t=e.getForm()),!t)return;let o=Array.from(t.elements),r=0;for(let a of o)nn(a)&&(r+=1);if(r===1){t.requestSubmit(null);return}let i=o.find(a=>a.type==="submit"&&!a.matches(":disabled"));i&&(["input","button"].includes(i.localName)?t.requestSubmit(i):i.click())}var ma=w`
  :host {
    border-width: 0;
  }

  :host(:focus) {
    outline: none;
  }

  .text-field {
    display: flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    transition: inherit;
    height: var(--wa-form-control-height);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    cursor: text;
    color: var(--wa-form-control-value-color);
    font-size: var(--wa-form-control-value-font-size);
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    vertical-align: middle;
    width: 100%;
    transition:
      background-color var(--wa-transition-normal),
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    background-color: var(--wa-form-control-background-color);
    box-shadow: var(--box-shadow);
    padding: 0 var(--wa-form-control-padding-inline);
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    /* Only ring the field when the text input has focus, not inner buttons */
    &:has(input:focus, textarea:focus) {
      outline-color: var(--wa-color-focus);
    }

    /* Style disabled inputs */
    &:has(:disabled) {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) .text-field {
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
  }

  :host([appearance='filled']) .text-field {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-fill-quiet);
  }

  :host([appearance='filled-outlined']) .text-field {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-form-control-border-color);
  }

  :host([pill]) .text-field {
    border-radius: var(--wa-border-radius-pill) !important;
  }

  .text-field {
    /* Show autofill styles over the entire text field, not just the native <input> */
    &:has(:autofill),
    &:has(:-webkit-autofill) {
      background-color: var(--wa-color-brand-fill-quiet) !important;
    }

    input,
    textarea {
      /*
      Fixes an alignment issue with placeholders.
      https://github.com/shoelace-style/webawesome/issues/342
    */
      height: 100%;

      padding: 0;
      border: none;
      outline: none;
      box-shadow: none;
      margin: 0;
      cursor: inherit;
      -webkit-appearance: none;
      font: inherit;

      /* Turn off Safari's autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-background-clip: text;
        background-color: transparent;
        -webkit-text-fill-color: inherit;
      }
    }
  }

  input {
    flex: 1 1 auto;
    min-width: 0;
    height: 100%;
    transition: inherit;

    /* prettier-ignore */
    background-color: rgb(118 118 118 / 0); /* ensures proper placeholder styles in webkit's date input */
    height: calc(var(--wa-form-control-height) - var(--border-width) * 2);
    padding-block: 0;
    color: inherit;

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }

    &:focus {
      outline: none;
    }
  }

  textarea {
    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }
  }

  .start,
  .end {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;

    &::slotted(wa-icon) {
      color: var(--wa-color-neutral-on-quiet);
    }
  }

  .start::slotted(*) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  .end::slotted(*) {
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  /*
   * Clearable + Password Toggle
   */

  .clear,
  .password-toggle {
    position: relative;
    display: inline-flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    height: 1.5em;
    font-size: inherit;
    color: var(--wa-color-neutral-on-quiet);
    border: none;
    border-radius: var(--wa-border-radius-s);
    background: none;
    padding: 0;
    transition: var(--wa-transition-normal) color;
    cursor: pointer;
    /* The box is wider than the glyph, so overhang half of that growth on each side. Keeps the
       glyph flush with the field's trailing padding edge, like every other form control. */
    margin-inline-start: calc(var(--wa-form-control-padding-inline) - 0.125em);
    margin-inline-end: -0.125em;

    &::after {
      content: '';
      position: absolute;
      inset-inline: 0;
      height: var(--wa-form-control-height);
    }

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:active {
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide the built-in number spinner */
  :host([without-spin-buttons]) input[type='number'] {
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      display: none;
    }
  }
`;var De=ke(class extends $e{constructor(e){if(super(e),e.type!==St.PROPERTY&&e.type!==St.ATTRIBUTE&&e.type!==St.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!pa(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Bt||t===dt)return t;let o=e.element,r=e.name;if(e.type===St.PROPERTY){if(t===o[r])return Bt}else if(e.type===St.BOOLEAN_ATTRIBUTE){if(!!t===o.hasAttribute(r))return Bt}else if(e.type===St.ATTRIBUTE&&o.getAttribute(r)===t+"")return Bt;return ua(e),t}});var P=class extends J{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new bt(this,"hint","label"),this.localize=new Y(this),this.title="",this.type="text",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="m",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.withClear=!1,this.placeholder="",this.readonly=!1,this.passwordToggle=!1,this.passwordVisible=!1,this.withoutSpinButtons=!1,this.required=!1,this.spellcheck=!0,this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,ae()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){this._value!==e&&(this.valueHasChanged=!0,this._value=e)}updateFormValue(e){if(e==null){this.setValue("",null);return}super.updateFormValue(e)}handleSizeChange(){nt(this.localName,this.size)}handleChange(e){this.value=this.input.value,this.relayNativeEvent(e,{bubbles:!0,composed:!0})}handleClearClick(e){e.preventDefault(),this.value!==""&&(this.value="",this.updateComplete.then(()=>{this.dispatchEvent(new To),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})),this.input.focus()}handleInput(){this.value=this.input.value}handleKeyDown(e){Go(e,this)}handlePasswordToggle(){this.passwordVisible=!this.passwordVisible}updated(e){if(super.updated(e),e.has("value")||e.has("defaultValue")||e.has("type")){let t=["number","date","time","datetime-local"];this.input&&t.includes(this.type)&&this.value&&this.input.value!==this.value&&(this._value=this.input.value),this.customStates.set("blank",!this.value),this.updateValidity()}}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(e,t,o="none"){this.input.setSelectionRange(e,t,o)}setRangeText(e,t,o,r="preserve"){let i=t??this.input.selectionStart,a=o??this.input.selectionEnd;this.input.setRangeText(e,i,a,r),this.value!==this.input.value&&(this.value=this.input.value)}showPicker(){"showPicker"in HTMLInputElement.prototype&&this.input.showPicker()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=null,this.input&&(this.input.value=this.value),super.formResetCallback()}render(){let e=this.hasSlotController.test("label","withLabel"),t=this.hasSlotController.test("hint","withHint"),o=this.label?!0:!!e,r=this.hint?!0:!!t,i=this.withClear&&!this.disabled&&!this.readonly,a=(!this.didSSR||this.hasUpdated)&&i&&(typeof this.value=="number"||this.value&&this.value.length>0);return c`
      <label
        part="form-control-label label"
        class=${H({label:!0,"has-label":o})}
        for="input"
        aria-hidden=${o?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base input-wrapper" class="text-field">
        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type=${this.type==="password"&&this.passwordVisible?"text":this.type}
          title=${this.title}
          name=${T(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${T(this.placeholder)}
          minlength=${T(this.minlength)}
          maxlength=${T(this.maxlength)}
          min=${T(this.min)}
          max=${T(this.max)}
          step=${T(this.step)}
          .value=${De(this.value??"")}
          autocapitalize=${T(this.autocapitalize)}
          autocomplete=${T(this.autocomplete)}
          autocorrect=${this.autocorrect?"on":"off"}
          ?autofocus=${this.autofocus}
          spellcheck=${this.spellcheck}
          pattern=${T(this.pattern)}
          enterkeyhint=${T(this.enterkeyhint)}
          inputmode=${T(this.inputmode)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        ${a?c`
              <button
                part="clear-button"
                class="clear"
                type="button"
                aria-label=${this.localize.term("clearEntry")}
                @click=${this.handleClearClick}
                tabindex="-1"
              >
                <slot name="clear-icon">
                  <wa-icon name="circle-xmark" library="system" variant="regular"></wa-icon>
                </slot>
              </button>
            `:""}
        ${this.passwordToggle&&!this.disabled?c`
              <button
                part="password-toggle-button"
                class="password-toggle"
                type="button"
                aria-label=${this.localize.term(this.passwordVisible?"hidePassword":"showPassword")}
                @click=${this.handlePasswordToggle}
              >
                ${this.passwordVisible?c`
                      <slot name="hide-password-icon">
                        <wa-icon name="eye-slash" library="system" variant="regular"></wa-icon>
                      </slot>
                    `:c`
                      <slot name="show-password-icon">
                        <wa-icon name="eye" library="system" variant="regular"></wa-icon>
                      </slot>
                    `}
              </button>
            `:""}

        <slot name="end" part="end" class="end"></slot>
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${H({"has-slotted":r})}
        aria-hidden=${r?"false":"true"}
        >${this.hint}</slot
      >
    `}};P.css=[lt,ee,ma];P.shadowRootOptions={...J.shadowRootOptions,delegatesFocus:!0};n([D("input")],P.prototype,"input",2);n([d()],P.prototype,"title",2);n([d({reflect:!0})],P.prototype,"type",2);n([W()],P.prototype,"value",1);n([d({attribute:"value",reflect:!0})],P.prototype,"defaultValue",2);n([d({reflect:!0})],P.prototype,"size",2);n([R("size")],P.prototype,"handleSizeChange",1);n([d({reflect:!0})],P.prototype,"appearance",2);n([d({type:Boolean,reflect:!0})],P.prototype,"pill",2);n([d()],P.prototype,"label",2);n([d({attribute:"hint"})],P.prototype,"hint",2);n([d({attribute:"with-clear",type:Boolean})],P.prototype,"withClear",2);n([d()],P.prototype,"placeholder",2);n([d({type:Boolean,reflect:!0})],P.prototype,"readonly",2);n([d({attribute:"password-toggle",type:Boolean})],P.prototype,"passwordToggle",2);n([d({attribute:"password-visible",type:Boolean})],P.prototype,"passwordVisible",2);n([d({attribute:"without-spin-buttons",type:Boolean,reflect:!0})],P.prototype,"withoutSpinButtons",2);n([d({type:Boolean,reflect:!0})],P.prototype,"required",2);n([d()],P.prototype,"pattern",2);n([d({type:Number})],P.prototype,"minlength",2);n([d({type:Number})],P.prototype,"maxlength",2);n([d()],P.prototype,"min",2);n([d()],P.prototype,"max",2);n([d()],P.prototype,"step",2);n([d()],P.prototype,"autocapitalize",2);n([d({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="off"),toAttribute:e=>e?"on":"off"}})],P.prototype,"autocorrect",2);n([d()],P.prototype,"autocomplete",2);n([d({type:Boolean})],P.prototype,"autofocus",2);n([d()],P.prototype,"enterkeyhint",2);n([d({type:Boolean,converter:{fromAttribute:e=>!(!e||e==="false"),toAttribute:e=>e?"true":"false"}})],P.prototype,"spellcheck",2);n([d()],P.prototype,"inputmode",2);n([d({attribute:"with-label",type:Boolean})],P.prototype,"withLabel",2);n([d({attribute:"with-hint",type:Boolean})],P.prototype,"withHint",2);n([R("step",{waitUntilFirstUpdate:!0})],P.prototype,"handleStepChange",1);P=n([I("wa-input")],P);P.disableWarning?.("change-in-update");var fa=w`
  :host {
    --height: var(--wa-form-control-toggle-size);
    --width: calc(var(--height) * 1.75);
    --thumb-size: 0.75em;

    display: inline-flex;
    line-height: var(--wa-form-control-value-line-height);
  }

  label {
    position: relative;
    display: flex;
    align-items: center;
    font: inherit;
    color: var(--wa-form-control-value-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch {
    flex: 0 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--wa-form-control-background-color);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--height);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    transition-property: translate, background, border-color, box-shadow;
    transition-duration: var(--wa-transition-normal);
    transition-timing-function: var(--wa-transition-easing);
  }

  :host([did-ssr]:not(:defined)) .switch {
    transition-property: unset;
    transition-duration: unset;
    transition-timing-function: unset;
  }

  .switch .thumb {
    aspect-ratio: 1 / 1;
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--wa-form-control-border-color);
    border-radius: 50%;
    translate: calc((var(--width) - var(--height)) / -2);
    transition: inherit;
  }
  .switch .thumb:dir(rtl) {
    translate: calc((var(--width) - var(--height)) / 2);
  }

  .input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Focus */
  label:not(.disabled) .input:focus-visible ~ [part~='control'] {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Checked */
  .checked .switch {
    background-color: var(--wa-form-control-activated-color);
    border-color: var(--wa-form-control-activated-color);
  }

  .checked .switch .thumb {
    background-color: var(--wa-color-surface-default);
    translate: calc((var(--width) - var(--height)) / 2);
  }
  .checked .switch .thumb:dir(rtl) {
    translate: calc((var(--width) - var(--height)) / -2);
  }

  /* Disabled */
  label:has(> :disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  [part~='label'] {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) [part~='label']::after {
    content: var(--wa-form-control-required-content);
    color: var(--wa-form-control-required-content-color);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }

  @media (forced-colors: active) {
    :checked:enabled + .switch:hover .thumb,
    :checked + .switch .thumb {
      background-color: ButtonText;
    }
  }
`;var tt=class extends J{constructor(){super(...arguments),this.hasSlotController=new bt(this,"hint"),this.localize=new Y(this),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="m",this.disabled=!1,this._checked=null,this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint="",this.withHint=!1}static get validators(){return[...super.validators,ae()]}get value(){return this._value??"on"}set value(e){this._value=e}handleSizeChange(){nt(this.localName,this.size)}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(e){this._checked=!!e,this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleKeyDown(e){let t=this.localize.dir()==="rtl";e.key==="ArrowLeft"&&(e.preventDefault(),this.checked=t,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))})),e.key==="ArrowRight"&&(e.preventDefault(),this.checked=!t,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0}))}))}willUpdate(e){super.willUpdate(e),(e.has("value")||e.has("checked")||e.has("defaultChecked")||e.has("disabled"))&&this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){if(this.didSSR&&!this.hasUpdated){this.updateComplete.then(()=>{this.handleValueOrCheckedChange()});return}this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked),this.customStates.set("checked",this.checked),this.updateValidity()}handleDisabledChange(){this.updateValidity()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}setValue(e,t){if(!this.checked){this.internals.setFormValue(null,null);return}this.internals.setFormValue(e??"on",t)}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}render(){let e=this.hasSlotController.test("hint","withHint"),t=this.hint?!0:!!e,o=this.didSSR&&!this.hasUpdated?this.checked:this.defaultChecked,r=this.didSSR&&!this.hasUpdated?null:De(this.checked);return c`
      <label
        part="base switch"
        class=${H({checked:this.checked,disabled:this.disabled})}
      >
        <input
          class="input"
          type="checkbox"
          title=${this.title}
          name=${T(this.name)}
          value=${T(this.value)}
          .checked=${T(r)}
          ?checked=${o}
          ?disabled=${this.disabled}
          ?required=${this.required}
          role="switch"
          aria-checked=${this.checked?"true":"false"}
          aria-describedby="hint"
          @click=${this.handleClick}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch">
          <span part="thumb" class="thumb"></span>
        </span>

        <slot part="label" class="label"></slot>
      </label>

      <slot
        id="hint"
        name="hint"
        part="hint"
        class=${H({"has-slotted":t})}
        aria-hidden=${t?"false":"true"}
        >${this.hint}</slot
      >
    `}};tt.shadowRootOptions={...J.shadowRootOptions,delegatesFocus:!0};tt.css=[ee,lt,fa];n([D('input[type="checkbox"]')],tt.prototype,"input",2);n([d()],tt.prototype,"title",2);n([d({reflect:!0})],tt.prototype,"name",2);n([d({reflect:!0})],tt.prototype,"value",1);n([d({reflect:!0})],tt.prototype,"size",2);n([R("size")],tt.prototype,"handleSizeChange",1);n([d({type:Boolean})],tt.prototype,"disabled",2);n([d({type:Boolean,attribute:!1})],tt.prototype,"checked",1);n([d({type:Boolean,attribute:"checked",reflect:!0})],tt.prototype,"defaultChecked",2);n([d({type:Boolean,reflect:!0})],tt.prototype,"required",2);n([d({attribute:"hint"})],tt.prototype,"hint",2);n([d({attribute:"with-hint",type:Boolean})],tt.prototype,"withHint",2);n([R(["checked","defaultChecked"])],tt.prototype,"handleStateChange",1);n([R("disabled",{waitUntilFirstUpdate:!0})],tt.prototype,"handleDisabledChange",1);tt=n([I("wa-switch")],tt);tt.disableWarning?.("change-in-update");var ga=w`
  :host {
    display: inline-flex;
  }

  .button-group {
    display: flex;
    position: relative;
    isolation: isolate;
    flex-wrap: wrap;

    @media (hover: hover) {
      > :hover,
      &::slotted(:hover) {
        z-index: 1;
      }
    }

    /* Focus and checked are always on top */
    > :focus,
    &::slotted(:focus),
    > [aria-checked='true'],
    &::slotted([aria-checked='true']),
    > [checked],
    &::slotted([checked]) {
      z-index: 2 !important;
    }

    :host([orientation='horizontal']) & {
      flex-direction: row;
    }

    :host([orientation='vertical']) & {
      flex-direction: column;
    }
  }

  /* Set custom properties to be inherited by slotted buttons */
  :host([orientation='horizontal']) {
    --_button-horizontal-indent: var(--wa-form-control-border-width);
    --_button-horizontal-indent-outlined: calc(var(--wa-form-control-border-width) * -1);

    ::slotted(:first-child) {
      --_button-horizontal-indent: 0;
      --_button-horizontal-indent-outlined: 0;
    }
  }

  :host([orientation='vertical']) {
    --_button-vertical-indent: var(--wa-form-control-border-width);
    --_button-vertical-indent-outlined: calc(var(--wa-form-control-border-width) * -1);

    ::slotted(:first-child) {
      --_button-vertical-indent: 0;
      --_button-vertical-indent-outlined: 0;
    }
  }

  /* All buttons that are not in front or at the end get their border radius removed */
  ::slotted(:not(:first-child):not(:last-child)) {
    --_button-start-start-radius: 0;
    --_button-start-end-radius: 0;
    --_button-end-start-radius: 0;
    --_button-end-end-radius: 0;
  }

  /* Remove leading and trailing buttons border radius individually */
  :host([orientation='horizontal']) {
    ::slotted(:first-child:not(:last-child)) {
      --_button-start-end-radius: 0;
      --_button-end-end-radius: 0;
    }

    ::slotted(:last-child:not(:first-child)) {
      --_button-start-start-radius: 0;
      --_button-end-start-radius: 0;
    }
  }

  :host([orientation='vertical']) {
    ::slotted(:first-child:not(:last-child)) {
      --_button-end-start-radius: 0;
      --_button-end-end-radius: 0;
    }

    ::slotted(:last-child:not(:first-child)) {
      --_button-start-start-radius: 0;
      --_button-start-end-radius: 0;
    }
  }
`;var Yt=class extends N{constructor(){super(...arguments),this.disableRole=!1,this.hasOutlined=!1,this.label="",this.orientation="horizontal"}updated(e){super.updated(e),e.has("orientation")&&this.setAttribute("aria-orientation",this.orientation)}handleFocus(e){Jo(e.target)?.classList.add("button-focus")}handleBlur(e){Jo(e.target)?.classList.remove("button-focus")}handleMouseOver(e){Jo(e.target)?.classList.add("button-hover")}handleMouseOut(e){Jo(e.target)?.classList.remove("button-hover")}render(){return c`
      <slot
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        aria-orientation=${this.orientation}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      ></slot>
    `}};Yt.css=[ga];n([D("slot")],Yt.prototype,"defaultSlot",2);n([W()],Yt.prototype,"disableRole",2);n([W()],Yt.prototype,"hasOutlined",2);n([d()],Yt.prototype,"label",2);n([d({reflect:!0})],Yt.prototype,"orientation",2);Yt=n([I("wa-button-group")],Yt);function Jo(e){let t="wa-button, wa-radio-button";return e.closest(t)??e.querySelector(t)}var wa=w`
  :host {
    display: flex;
    position: relative;
    align-items: stretch;
    border-radius: var(--wa-panel-border-radius);
    background-color: var(--wa-color-fill-quiet, var(--wa-color-brand-fill-quiet));
    border-color: var(--wa-color-border-quiet, var(--wa-color-brand-border-quiet));
    border-style: var(--wa-panel-border-style);
    border-width: var(--wa-panel-border-width);
    color: var(--wa-color-text-normal);
    padding: 1em;
  }

  /* Appearance modifiers */
  :host([appearance~='plain']) {
    background-color: transparent;
    border-color: transparent;
  }

  :host([appearance~='outlined']) {
    background-color: transparent;
    border-color: var(--wa-color-border-loud, var(--wa-color-brand-border-loud));
  }

  :host([appearance~='filled']) {
    background-color: var(--wa-color-fill-quiet, var(--wa-color-brand-fill-quiet));
    border-color: transparent;
  }

  :host([appearance~='filled-outlined']) {
    border-color: var(--wa-color-border-quiet, var(--wa-color-brand-border-quiet));
  }

  :host([appearance~='accent']) {
    color: var(--wa-color-on-loud, var(--wa-color-brand-on-loud));
    background-color: var(--wa-color-fill-loud, var(--wa-color-brand-fill-loud));
    border-color: transparent;

    [part~='icon'] {
      color: currentColor;
    }
  }

  [part~='icon'] {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-on-quiet);
    font-size: 1.25em;
  }

  ::slotted([slot='icon']) {
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  [part~='message'] {
    flex: 1 1 auto;
    display: block;
    overflow: hidden;
  }
`;var se=class extends N{constructor(){super(...arguments),this.variant="brand",this.size="m"}handleSizeChange(){nt(this.localName,this.size)}render(){return c`
      <div part="icon">
        <slot name="icon"></slot>
      </div>

      <div part="message">
        <slot></slot>
      </div>
    `}};se.css=[wa,oe,lt];n([d({reflect:!0})],se.prototype,"variant",2);n([d({reflect:!0})],se.prototype,"appearance",2);n([d({reflect:!0})],se.prototype,"size",2);n([R("size")],se.prototype,"handleSizeChange",1);se=n([I("wa-callout")],se);var ba=w`
  :host(:focus) {
    outline: none;
  }

  .number-field {
    display: flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    height: var(--wa-form-control-height);
    border-color: var(--wa-form-control-border-color);
    border-radius: var(--wa-form-control-border-radius);
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
    cursor: text;
    color: var(--wa-form-control-value-color);
    font-size: inherit;
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    vertical-align: middle;
    width: 100%;
    transition:
      background-color var(--wa-transition-normal),
      border-color var(--wa-transition-normal),
      outline-color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    background-color: var(--wa-form-control-background-color);
    padding: 0;
    outline: var(--wa-focus-ring-style) var(--wa-focus-ring-width) transparent;
    outline-offset: var(--wa-focus-ring-offset);

    &:focus-within {
      outline-color: var(--wa-color-focus);
    }

    /* Style disabled inputs */
    &:has(input:disabled) {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Appearance modifiers */
  :host([appearance='outlined']) {
    .number-field {
      background-color: var(--wa-form-control-background-color);
      border-color: var(--wa-form-control-border-color);
    }

    .stepper {
      color: var(--wa-color-neutral-on-quiet);

      @media (hover: hover) {
        &:hover:not(:disabled) {
          color: var(--wa-color-neutral-on-quiet);
          background-color: var(--wa-color-neutral-fill-quiet);
        }
      }

      &:active:not(:disabled) {
        color: color-mix(in oklab, var(--wa-color-neutral-on-quiet), var(--wa-color-mix-active));
        background-color: color-mix(in oklab, var(--wa-color-neutral-fill-quiet), var(--wa-color-mix-active));
      }
    }
  }

  :host([appearance='filled']) {
    .number-field {
      background-color: var(--wa-color-neutral-fill-quiet);
      border-color: var(--wa-color-neutral-fill-quiet);
    }

    .stepper {
      color: var(--wa-color-neutral-on-quiet);

      @media (hover: hover) {
        &:hover:not(:disabled) {
          color: var(--wa-color-neutral-on-normal);
          background-color: var(--wa-color-neutral-fill-normal);
        }
      }

      &:active:not(:disabled) {
        color: color-mix(in oklab, var(--wa-color-neutral-on-normal), var(--wa-color-mix-active));
        background-color: color-mix(in oklab, var(--wa-color-neutral-fill-normal), var(--wa-color-mix-active));
      }
    }
  }

  :host([appearance='filled-outlined']) {
    .number-field {
      background-color: var(--wa-color-neutral-fill-quiet);
      border-color: var(--wa-form-control-border-color);
    }

    .stepper {
      color: var(--wa-color-neutral-on-quiet);

      @media (hover: hover) {
        &:hover:not(:disabled) {
          color: var(--wa-color-neutral-on-normal);
          background-color: var(--wa-color-neutral-fill-normal);
        }
      }

      &:active:not(:disabled) {
        color: color-mix(in oklab, var(--wa-color-neutral-on-normal), var(--wa-color-mix-active));
        background-color: color-mix(in oklab, var(--wa-color-neutral-fill-normal), var(--wa-color-mix-active));
      }
    }
  }

  :host([pill]) {
    .number-field,
    .stepper {
      border-radius: var(--wa-border-radius-pill);
    }
  }

  .number-field {
    /* Show autofill styles over the entire number field, not just the native <input> */
    &:has(:autofill),
    &:has(:-webkit-autofill) {
      background-color: var(--wa-color-brand-fill-quiet) !important;
    }

    input {
      flex: auto;
      height: 100%;
      width: auto;
      min-width: 0;
      margin: 0;
      padding: 0 var(--wa-form-control-padding-inline);
      outline: none;
      box-shadow: none;
      border: none;
      background-color: transparent;
      font: inherit;
      transition: inherit;
      cursor: inherit;
      -webkit-appearance: none;

      /* Center-align and use tabular numbers for better alignment */
      text-align: center;
      font-variant-numeric: tabular-nums;

      /* Hide the number spinners in Firefox */
      -moz-appearance: textfield;

      /* Hide the number spinners in Chrome/Safari */
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
        display: none;
      }

      /* Turn off Safari's autofill styles */
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-background-clip: text;
        background-color: transparent;
        -webkit-text-fill-color: inherit;
      }
    }

    &:autofill {
      &,
      &:hover,
      &:focus,
      &:active {
        box-shadow: none;
        caret-color: var(--wa-form-control-value-color);
      }
    }

    &::placeholder {
      color: var(--wa-form-control-placeholder-color);
      user-select: none;
      -webkit-user-select: none;
    }

    &:focus {
      outline: none;
    }
  }

  .start,
  .end {
    display: inline-flex;
    flex: 1;
    align-items: center;
    cursor: default;

    &::slotted(wa-icon) {
      color: var(--wa-color-neutral-on-quiet);
    }
  }

  .start {
    justify-content: start;
    margin-inline-start: var(--wa-form-control-padding-inline);
  }

  .end {
    justify-content: end;
    margin-inline-end: var(--wa-form-control-padding-inline);
  }

  /*
   * Steppers - horizontal layout with minus on start, plus on end
   */

  .stepper {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
    height: calc(100% - var(--wa-form-control-border-width) * 2);
    flex: 0 0 auto;
    border: none;
    border-radius: calc(var(--wa-form-control-border-radius) - var(--wa-form-control-border-width) * 2);
    background: transparent;
    cursor: pointer;
    margin: var(--wa-form-control-border-width);
    padding: 0;
    font-size: inherit;
    transition-property: background-color, color;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:focus {
      outline: none;
    }
  }

  :host([without-steppers]) .stepper {
    display: none;
  }
`;var q=class extends J{constructor(){super(...arguments),this.assumeInteractionOn=["blur","input"],this.hasSlotController=new bt(this,"hint","label"),this.localize=new Y(this),this.title="",this._value=null,this.defaultValue=this.getAttribute("value")||null,this.size="m",this.appearance="outlined",this.pill=!1,this.label="",this.hint="",this.placeholder="",this.readonly=!1,this.required=!1,this.step=1,this.withoutSteppers=!1,this.inputmode="numeric",this.withLabel=!1,this.withHint=!1}static get validators(){return[...super.validators,ae()]}get value(){return this.valueHasChanged?this._value:this._value??this.defaultValue}set value(e){this._value!==e&&(this.valueHasChanged=!0,this._value=e)}handleSizeChange(){nt(this.localName,this.size)}updateFormValue(e){if(e==null){this.setValue("",null);return}super.updateFormValue(e)}get isAtMin(){if(this.min===void 0)return!1;let e=parseFloat(this.value||"");return!isNaN(e)&&e<=this.min}get isAtMax(){if(this.max===void 0)return!1;let e=parseFloat(this.value||"");return!isNaN(e)&&e>=this.max}handleChange(e){this.value=this.input.value,this.relayNativeEvent(e,{bubbles:!0,composed:!0})}handleInput(){this.value=this.input.value}handleKeyDown(e){Go(e,this),(e.key==="ArrowUp"||e.key==="ArrowDown")&&requestAnimationFrame(()=>{this.value!==this.input.value&&(this.value=this.input.value)})}handleStepperPointerUp(e,t){if(this.disabled||this.readonly)return;let o=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0});this.dispatchEvent(o),!o.defaultPrevented&&(e==="up"?this.input.stepUp():this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value),this.dispatchEvent(new InputEvent("input",{bubbles:!0,composed:!0})),this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),t.pointerType!=="touch"&&this.input.focus())}handleStepperPointerDown(e){e.pointerType!=="touch"&&(e.preventDefault(),this.input.focus())}updated(e){super.updated(e),(e.has("value")||e.has("defaultValue"))&&(this.input&&this.value&&this.input.value!==this.value&&(this._value=this.input.value),this.customStates.set("blank",!this.value))}handleStepChange(){this.input.step=String(this.step),this.updateValidity()}focus(e){this.input.focus(e)}blur(){this.input.blur()}select(){this.input.select()}stepUp(){this.input.stepUp(),this.value!==this.input.value&&(this.value=this.input.value)}stepDown(){this.input.stepDown(),this.value!==this.input.value&&(this.value=this.input.value)}formResetCallback(){this.value=this.defaultValue,super.formResetCallback()}render(){let e=this.hasSlotController.test("label","withLabel"),t=this.hasSlotController.test("hint","withHint"),o=this.label?!0:!!e,r=this.hint?!0:!!t;return c`
      <label
        part="form-control-label label"
        class=${H({label:!0,"has-label":o})}
        for="input"
        aria-hidden=${o?"false":"true"}
      >
        <slot name="label">${this.label}</slot>
      </label>

      <div part="base number-input" class="number-field">
        ${this.withoutSteppers?"":c`
              <button
                part="stepper stepper-decrement"
                class="stepper stepper-decrement"
                type="button"
                tabindex="-1"
                aria-label=${this.localize.term("decrement")}
                ?disabled=${this.disabled||this.readonly||this.isAtMin}
                @pointerdown=${this.handleStepperPointerDown}
                @pointerup=${i=>this.handleStepperPointerUp("down",i)}
              >
                <slot name="decrement-icon">
                  <wa-icon name="minus" library="system"></wa-icon>
                </slot>
              </button>
            `}

        <slot name="start" part="start" class="start"></slot>

        <input
          part="input"
          id="input"
          class="control"
          type="number"
          inputmode=${T(this.inputmode)}
          title=${this.title}
          name=${T(this.name)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          ?required=${this.required}
          placeholder=${T(this.placeholder)}
          min=${T(this.min)}
          max=${T(this.max)}
          step=${T(this.step)}
          .value=${De(this.value??"")}
          autocomplete=${T(this.autocomplete)}
          ?autofocus=${this.autofocus}
          enterkeyhint=${T(this.enterkeyhint)}
          aria-describedby="hint"
          @change=${this.handleChange}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
        />

        <slot name="end" part="end" class="end"></slot>

        ${this.withoutSteppers?"":c`
              <button
                part="stepper stepper-increment"
                class="stepper stepper-increment"
                type="button"
                tabindex="-1"
                aria-label=${this.localize.term("increment")}
                ?disabled=${this.disabled||this.readonly||this.isAtMax}
                @pointerdown=${this.handleStepperPointerDown}
                @pointerup=${i=>this.handleStepperPointerUp("up",i)}
              >
                <slot name="increment-icon">
                  <wa-icon name="plus" library="system"></wa-icon>
                </slot>
              </button>
            `}
      </div>

      <slot
        id="hint"
        part="hint"
        name="hint"
        class=${H({"has-slotted":r})}
        aria-hidden=${r?"false":"true"}
        >${this.hint}</slot
      >
    `}};q.css=[lt,ee,ba];q.shadowRootOptions={...J.shadowRootOptions,delegatesFocus:!0};n([D("input")],q.prototype,"input",2);n([d()],q.prototype,"title",2);n([W()],q.prototype,"value",1);n([d({attribute:"value",reflect:!0})],q.prototype,"defaultValue",2);n([d({reflect:!0})],q.prototype,"size",2);n([R("size")],q.prototype,"handleSizeChange",1);n([d({reflect:!0})],q.prototype,"appearance",2);n([d({type:Boolean,reflect:!0})],q.prototype,"pill",2);n([d()],q.prototype,"label",2);n([d({attribute:"hint"})],q.prototype,"hint",2);n([d()],q.prototype,"placeholder",2);n([d({type:Boolean,reflect:!0})],q.prototype,"readonly",2);n([d({type:Boolean,reflect:!0})],q.prototype,"required",2);n([d({type:Number})],q.prototype,"min",2);n([d({type:Number})],q.prototype,"max",2);n([d()],q.prototype,"step",2);n([d({attribute:"without-steppers",type:Boolean})],q.prototype,"withoutSteppers",2);n([d()],q.prototype,"autocomplete",2);n([d({type:Boolean})],q.prototype,"autofocus",2);n([d()],q.prototype,"enterkeyhint",2);n([d()],q.prototype,"inputmode",2);n([d({attribute:"with-label",type:Boolean})],q.prototype,"withLabel",2);n([d({attribute:"with-hint",type:Boolean})],q.prototype,"withHint",2);n([R("step",{waitUntilFirstUpdate:!0})],q.prototype,"handleStepChange",1);q=n([I("wa-number-input")],q);q.disableWarning?.("change-in-update");var va=w`
  :host {
    --spacing: var(--wa-space-m);
    --show-duration: var(--wa-transition-normal);
    --hide-duration: var(--wa-transition-normal);

    display: block;
  }

  details {
    display: block;
    overflow-anchor: none;
    border: var(--wa-panel-border-width) var(--wa-color-surface-border) var(--wa-panel-border-style);
    background-color: var(--wa-color-surface-default);
    border-radius: var(--wa-panel-border-radius);
    color: var(--wa-color-text-normal);

    /* Print styles */
    @media print {
      background: none;
      border: solid var(--wa-border-width-s) var(--wa-color-surface-border);

      summary {
        list-style: none;
      }
    }
  }

  /* Appearance modifiers */
  :host([appearance='plain']) details {
    background-color: transparent;
    border-color: transparent;
    border-radius: 0;
  }

  :host([appearance='outlined']) details {
    background-color: var(--wa-color-surface-default);
    border-color: var(--wa-color-surface-border);
  }

  :host([appearance='filled']) details {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: transparent;
  }

  :host([appearance='filled-outlined']) details {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-border-quiet);
  }

  :host([disabled]) details {
    opacity: 0.5;
    cursor: not-allowed;
  }

  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing);
    padding: var(--spacing); /* Add padding here */
    border-radius: calc(var(--wa-panel-border-radius) - var(--wa-panel-border-width));
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;

    &::marker,
    &::-webkit-details-marker {
      display: none;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: calc(var(--wa-panel-border-width) + var(--wa-focus-ring-offset));
    }
  }

  :host([open]) summary {
    border-end-start-radius: 0;
    border-end-end-radius: 0;
  }

  /* 'Start' icon placement */
  :host([icon-placement='start']) summary {
    flex-direction: row-reverse;
    justify-content: start;
  }

  [part~='icon'] {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-text-quiet);
    transition: rotate var(--wa-transition-normal) var(--wa-transition-easing);
  }

  :host([open]) [part~='icon'] {
    rotate: 90deg;
  }

  :host([open]:dir(rtl)) [part~='icon'] {
    rotate: -90deg;
  }

  :host([open]) slot[name='expand-icon'],
  :host(:not([open])) slot[name='collapse-icon'] {
    display: none;
  }

  .body.animating {
    overflow: hidden;
  }

  .content {
    display: block;
    box-sizing: border-box; /* Ensure contents don't overflow */
    padding-block-start: var(--spacing);
    padding-inline: var(--spacing); /* Add horizontal padding */
    padding-block-end: var(--spacing); /* Add bottom padding */
  }
`;var ct=class extends N{constructor(){super(...arguments),this.localize=new Y(this),this.animationGeneration=0,this.isAnimating=!1,this.open=!1,this.disabled=!1,this.appearance="outlined",this.iconPlacement="end"}disconnectedCallback(){super.disconnectedCallback(),this.detailsObserver?.disconnect()}firstUpdated(e){super.firstUpdated(e),this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(t=>{for(let o of t)o.type==="attributes"&&o.attributeName==="open"&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}updated(e){e.has("isAnimating")&&this.customStates.set("animating",this.isAnimating)}handleSummaryClick(e){e.composedPath().some(r=>{if(!(r instanceof HTMLElement))return!1;let i=r.tagName?.toLowerCase();return["a","button","input","textarea","select"].includes(i)?!0:r instanceof J?!("disabled"in r)||!r.disabled:!1})||(e.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus()))}handleSummaryKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.open?this.hide():this.show()),(e.key==="ArrowUp"||e.key==="ArrowLeft")&&(e.preventDefault(),this.hide()),(e.key==="ArrowDown"||e.key==="ArrowRight")&&(e.preventDefault(),this.show())}closeOthersWithSameName(){if(!this.name)return;this.getRootNode().querySelectorAll(`wa-details[name="${this.name}"]`).forEach(o=>{o!==this&&o.open&&(o.open=!1)})}async handleOpenChange(){this.animationGeneration++;let e=this.animationGeneration;if(this.open){this.details.open=!0;let t=new Jt;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1,this.details.open=!1;return}this.closeOthersWithSameName(),this.isAnimating=!0;let o=sr(getComputedStyle(this.body).getPropertyValue("--show-duration"));if(await ho(this.body,[{height:"0",opacity:"0"},{height:`${this.body.scrollHeight}px`,opacity:"1"}],{duration:o,easing:"linear"}),this.animationGeneration!==e)return;this.body.style.height="auto",this.isAnimating=!1,this.dispatchEvent(new te)}else{let t=new Qt;if(this.dispatchEvent(t),t.defaultPrevented){this.details.open=!0,this.open=!0;return}this.isAnimating=!0;let o=sr(getComputedStyle(this.body).getPropertyValue("--hide-duration"));if(await ho(this.body,[{height:`${this.body.scrollHeight}px`,opacity:"1"},{height:"0",opacity:"0"}],{duration:o,easing:"linear"}),this.animationGeneration!==e)return;this.body.style.height="0",this.isAnimating=!1,this.details.open=!1,this.dispatchEvent(new Zt)}}async show(){if(!(this.open||this.disabled))return this.open=!0,qt(this,"wa-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,qt(this,"wa-after-hide")}render(){let e=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return c`
      <details part="base details">
        <summary
          part="header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary">${this.summary}</slot>

          <span part="icon">
            <slot name="expand-icon">
              <wa-icon library="system" variant="solid" name=${e?"chevron-left":"chevron-right"}></wa-icon>
            </slot>
            <slot name="collapse-icon">
              <wa-icon library="system" variant="solid" name=${e?"chevron-left":"chevron-right"}></wa-icon>
            </slot>
          </span>
        </summary>

        <div
          class=${H({body:!0,animating:this.isAnimating})}
          role="region"
          aria-labelledby="header"
        >
          <slot part="content" id="content" class="content"></slot>
        </div>
      </details>
    `}};ct.css=va;n([D("details")],ct.prototype,"details",2);n([D("summary")],ct.prototype,"header",2);n([D(".body")],ct.prototype,"body",2);n([D(".expand-icon-slot")],ct.prototype,"expandIconSlot",2);n([W()],ct.prototype,"isAnimating",2);n([d({type:Boolean,reflect:!0})],ct.prototype,"open",2);n([d()],ct.prototype,"summary",2);n([d({reflect:!0})],ct.prototype,"name",2);n([d({type:Boolean,reflect:!0})],ct.prototype,"disabled",2);n([d({reflect:!0})],ct.prototype,"appearance",2);n([d({attribute:"icon-placement",reflect:!0})],ct.prototype,"iconPlacement",2);n([R("open",{waitUntilFirstUpdate:!0})],ct.prototype,"handleOpenChange",1);ct=n([I("wa-details")],ct);var ya=w`
  :host {
    --gap: var(--wa-space-s);
    --width: 28rem;
    --reorder-duration: var(--wa-transition-normal);

    display: flex;
    flex-direction: column;
    position: fixed;
    width: var(--width);
    height: 100dvh;
    max-height: 100dvh;
    margin: 0;
    padding: var(--wa-space-m);
    overflow-y: auto;
    gap: var(--gap);
    border: none;
    background: transparent;
    pointer-events: none;
    scrollbar-width: thin;

    /* Reset inset properties so placement changes work correctly */
    inset-block-start: auto;
    inset-block-end: auto;
    inset-inline-start: auto;
    inset-inline-end: auto;
    translate: none;
    align-content: normal;
    justify-content: normal;
  }

  :host(:not(:popover-open)) {
    display: none;
  }

  /* Placement positioning using logical properties for RTL support */
  :host([placement='top-start']) {
    inset-block-start: 0;
    inset-inline-start: 0;
  }

  :host([placement='top-center']) {
    inset-block-start: 0;
    inset-inline-start: 50%;
    translate: -50% 0;
  }

  :host([placement='top-end']) {
    inset-block-start: 0;
    inset-inline-start: auto;
    inset-inline-end: 0;
  }

  :host([placement='bottom-start']) {
    inset-block-end: 0;
    inset-inline-start: 0;
    align-content: end;
  }

  :host([placement='bottom-center']) {
    inset-block-end: 0;
    inset-inline-start: 50%;
    translate: -50% 0;
    align-content: end;
  }

  :host([placement='bottom-end']) {
    inset-block-end: 0;
    inset-inline-start: auto;
    inset-inline-end: 0;
    align-content: end;
  }

  /* Bottom placements: justify content to end */
  :host([placement^='bottom']) {
    justify-content: end;
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    width: 100%;
    pointer-events: auto;
  }

  /* Bottom placements: reverse stack order so newest appears at bottom */
  :host([placement^='bottom']) .stack {
    flex-direction: column-reverse;
  }

  /* Mobile: full width */
  @media (max-width: 480px) {
    :host {
      width: 100%;
      padding: var(--wa-space-s);
    }
  }
`;var xa="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";var Ca=(e=21)=>{let t="",o=crypto.getRandomValues(new Uint8Array(e|=0));for(;e--;)t+=xa[o[e]&63];return t};function Qo(e=""){return`${e}${Ca()}`}var Co=null,Zo=0;function cn(){if(Zo+=1,Co||typeof document>"u")return;let e=document.createElement("div");e.id=Qo("wa-toast-live-region-"),e.setAttribute("data-wa-toast-live-region",""),e.style.cssText=`
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    white-space: nowrap;
    clip-path: inset(50%);
    pointer-events: none;
    top: 0;
    left: 0;
  `,document.body.append(e),Co=e}function dn(){Zo=Math.max(0,Zo-1),!(Zo>0)&&(Co?.remove(),Co=null)}function hn(e,t){if(typeof document>"u")return;let o=Co;if(!o)return;let r=e.trim();if(!r)return;let i=document.createElement("div");i.setAttribute("role",t==="danger"?"alert":"status"),i.setAttribute("aria-live",t==="danger"?"assertive":"polite"),i.setAttribute("aria-atomic","true"),o.append(i),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.textContent=r})}),setTimeout(()=>i.remove(),1e3)}var Te=class extends N{constructor(){super(...arguments),this.activatedToastItems=new WeakSet,this.positionCache=new Map,this.placement="top-end",this.handleDocumentKeyDown=async e=>{if(await new Promise(t=>setTimeout(t)),e.key==="Escape"&&!e.defaultPrevented){let t=this.getToastItems();t.length>0&&(e.preventDefault(),t[t.length-1]?.hide())}},this.handleAfterHide=async e=>{let t=e.target;t.parentElement===this&&(this.capturePositions(),t.remove(),await this.animatePositions()),this.getToastItems().length===0&&this.hideStack()}}connectedCallback(){super.connectedCallback(),this.popover="manual",cn(),document.addEventListener("keydown",this.handleDocumentKeyDown)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener?.("keydown",this.handleDocumentKeyDown),dn()}handleSlotChange(){let e=this.getToastItems(),t=[];e.forEach(o=>{this.activatedToastItems.has(o)||t.push(o)}),t.length>0&&(this.capturePositions(),t.forEach(o=>{this.activatedToastItems.add(o),this.showStack(),o.startTimer(),this.announceToastItem(o)}),requestAnimationFrame(()=>this.animatePositions()))}announceToastItem(e){hn(e.textContent??"",e.variant)}getToastItems(){return[...this.querySelectorAll(":scope > wa-toast-item")]}capturePositions(){this.positionCache.clear();for(let e of this.getToastItems())this.positionCache.set(e,e.getBoundingClientRect())}async animatePositions(){if(ni()){this.positionCache.clear();return}let e=[];for(let t of this.getToastItems()){let o=this.positionCache.get(t);if(!o)continue;let r=t.getBoundingClientRect(),i=o.top-r.top;if(Math.abs(i)>1){let a=ho(t,[{transform:`translateY(${i}px)`},{transform:"translateY(0)"}],{duration:200,easing:"cubic-bezier(0.2, 0, 0, 1)"});e.push(a)}}this.positionCache.clear(),await Promise.all(e)}showStack(){this.matches(":popover-open")||(this.showPopover(),this.customStates.set("visible",!0))}hideStack(){this.matches(":popover-open")&&(this.hidePopover(),this.customStates.set("visible",!1))}async create(e,t){let o={allowHtml:!1,duration:5e3,variant:"neutral",size:"m",...t},r=document.createElement("wa-toast-item");if(r.variant=o.variant,r.size=o.size,r.duration=o.duration,o.allowHtml?r.innerHTML=e:r.textContent=e,o.icon){let i=document.createElement("wa-icon");i.setAttribute("slot","icon"),typeof o.icon=="string"?i.setAttribute("name",o.icon):(i.setAttribute("name",o.icon.name),o.icon.library&&i.setAttribute("library",o.icon.library),o.icon.family&&i.setAttribute("family",o.icon.family),o.icon.variant&&i.setAttribute("variant",o.icon.variant)),r.prepend(i)}return this.activatedToastItems.add(r),this.capturePositions(),this.showStack(),this.prepend(r),await r.updateComplete,this.animatePositions(),r.startTimer(),this.announceToastItem(r),r}render(){return c`
      <div part="stack" class="stack" @wa-after-hide=${this.handleAfterHide}>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};Te.css=ya;n([D(".stack")],Te.prototype,"stack",2);n([d({reflect:!0})],Te.prototype,"placement",2);Te=n([I("wa-toast")],Te);var Sa=w`
  :host {
    --accent-width: 4px;
    --show-duration: var(--wa-transition-normal);
    --hide-duration: var(--wa-transition-normal);
    --accent-color: var(--wa-color-fill-loud);

    display: block;
    pointer-events: auto;
  }

  /* Sizes */
  :host([size='xs']) {
    --padding: var(--wa-space-xs);
  }
  :host([size='s']),
  :host([size='small']) {
    --padding: var(--wa-space-s);
  }
  :host([size='m']),
  :host([size='medium']) {
    --padding: var(--wa-space-m);
  }
  :host([size='l']),
  :host([size='large']) {
    --padding: var(--wa-space-l);
  }
  :host([size='xl']) {
    --padding: var(--wa-space-xl);
  }

  .toast-item {
    display: flex;
    align-items: stretch;
    background: var(--wa-color-surface-raised);
    border: var(--wa-border-width-s) solid var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    box-shadow: var(--wa-shadow-l);
    overflow: hidden;
  }

  /* Animations */
  .toast-item.show {
    animation: toast-show var(--show-duration) var(--wa-transition-easing) forwards;
  }

  .toast-item.hide {
    animation: toast-hide var(--hide-duration) var(--wa-transition-easing) forwards;
  }

  @keyframes toast-show {
    from {
      opacity: 0;
      translate: 0 -0.5rem;
    }
    to {
      opacity: 1;
      translate: 0;
    }
  }

  @keyframes toast-hide {
    from {
      opacity: 1;
      translate: 0;
    }
    to {
      opacity: 0;
      translate: 0 -0.5rem;
    }
  }

  /* Accent line */
  .accent {
    flex: 0 0 auto;
    width: var(--accent-width);
    background: var(--accent-color);
  }

  /* Icon - only show if slot has content */
  .icon {
    display: flex;
    align-items: center;
    padding: var(--padding);
    padding-inline-end: 0;
    color: var(--accent-color);
    font-size: 1.25em;
  }

  .toast-item:not(.toast-item--has-icon) .icon {
    display: none;
  }

  /* Content */
  .content {
    flex: 1 1 auto;
    align-self: center;
    min-width: 0;
    padding: var(--padding);
    color: var(--wa-color-text-normal);
  }

  /* Close button */
  .close-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    padding-inline: var(--padding);
    background: transparent;
    border: none;
    border-start-end-radius: var(--border-radius);
    border-end-end-radius: var(--border-radius);
    color: var(--wa-color-neutral-on-quiet);
    font-size: inherit;
    cursor: pointer;
    transition: background-color var(--wa-transition-fast);

    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
      }
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: calc(var(--wa-focus-ring-width) * -1);
    }
  }

  /* Progress ring styling */
  wa-progress-ring {
    --size: var(--wa-form-control-height);
    --track-width: 0.125rem;
    --indicator-width: 0.125rem;
    --track-color: var(--wa-color-neutral-fill-quiet);
    --indicator-color: var(--accent-color);
    --indicator-transition-duration: 50ms;
  }

  /* Hide progress ring indicator when no duration */
  .toast-item:not(.toast-item--has-duration) wa-progress-ring {
    --track-color: transparent;
    --indicator-color: transparent;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .toast-item.show,
    .toast-item.hide {
      animation: none;
    }
  }
`;var Rt=class extends N{constructor(){super(...arguments),this.hasSlotController=new bt(this,"icon"),this.localize=new Y(this),this.animationFrame=null,this.startTime=null,this.isHovering=!1,this.isFocused=!1,this.timeLeft=100,this.variant="neutral",this.size="m",this.duration=5e3,this.withIcon=!1,this.tick=()=>{if(!this.startTime)return;let e=performance.now()-this.startTime,t=Math.min(e/this.duration,1);this.timeLeft=100*(1-t),t<1?this.animationFrame=requestAnimationFrame(this.tick):this.hide()},this.handlePointerEnter=e=>{(e.pointerType==="mouse"||e.pointerType==="pen")&&(this.isHovering=!0,this.pauseTimer())},this.handlePointerLeave=()=>{this.isHovering&&(this.isHovering=!1,this.resumeTimer())},this.handleFocusIn=()=>{this.isFocused=!0,this.pauseTimer()},this.handleFocusOut=()=>{this.isFocused=!1,this.resumeTimer()}}handleSizeChange(){nt(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.addEventListener("pointerenter",this.handlePointerEnter),this.addEventListener("pointerleave",this.handlePointerLeave)}disconnectedCallback(){super.disconnectedCallback(),this.stopTimer(),this.removeEventListener("pointerenter",this.handlePointerEnter),this.removeEventListener("pointerleave",this.handlePointerLeave)}async startTimer(){let e=new Jt;this.dispatchEvent(e),!e.defaultPrevented&&(await this.updateComplete,await Ut(this.toastItemElement,"show"),this.dispatchEvent(new te),this.duration>0&&Number.isFinite(this.duration)&&(this.startTime=performance.now(),this.timeLeft=100,this.tick()))}stopTimer(){this.animationFrame!==null&&(cancelAnimationFrame(this.animationFrame),this.animationFrame=null)}async hide(){this.stopTimer();let e=new Qt;this.dispatchEvent(e),!e.defaultPrevented&&(await Ut(this.toastItemElement,"hide"),this.dispatchEvent(new Zt),this.remove())}handleCloseClick(){this.hide()}pauseTimer(){this.stopTimer(),this.timeLeft=100}resumeTimer(){!this.isHovering&&!this.isFocused&&this.duration>0&&(this.startTime=performance.now(),this.tick())}render(){let e=this.hasUpdated?this.hasSlotController.test("icon"):this.withIcon,t=this.duration>0;return c`
      <div
        part="toast-item"
        class=${H({"toast-item":!0,"toast-item--has-icon":e,"toast-item--has-duration":t})}
      >
        <div part="accent" class="accent"></div>

        <div part="icon" class="icon">
          <slot name="icon"></slot>
        </div>

        <div part="content" class="content">
          <slot></slot>
        </div>

        <button
          part="close-button"
          class="close-button"
          type="button"
          aria-label=${this.localize.term("close")}
          @click=${this.handleCloseClick}
          @focusin=${this.handleFocusIn}
          @focusout=${this.handleFocusOut}
        >
          <wa-progress-ring
            part="progress-ring"
            exportparts="
              base:progress-ring__base,
              label:progress-ring__label,
              track:progress-ring__track,
              indicator:progress-ring__indicator
            "
            value=${this.timeLeft}
            aria-hidden="true"
          >
            <wa-icon
              part="close-icon"
              exportparts="svg:close-icon__svg"
              name="xmark"
              library="system"
              variant="solid"
            ></wa-icon>
          </wa-progress-ring>
        </button>
      </div>
    `}};Rt.css=[Sa,oe,lt];n([D(".toast-item")],Rt.prototype,"toastItemElement",2);n([W()],Rt.prototype,"timeLeft",2);n([d({reflect:!0})],Rt.prototype,"variant",2);n([d({reflect:!0})],Rt.prototype,"size",2);n([R("size")],Rt.prototype,"handleSizeChange",1);n([d({type:Number})],Rt.prototype,"duration",2);n([d({attribute:"with-icon",type:Boolean})],Rt.prototype,"withIcon",2);Rt=n([I("wa-toast-item")],Rt);var ka=w`
  :host {
    --size: 8rem;
    --track-width: 0.25em; /* avoid using rems here */
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-width: var(--track-width);
    --indicator-color: var(--wa-color-brand-fill-loud);
    --indicator-transition-duration: 0.35s;

    display: inline-flex;
  }

  .progress-ring {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .image {
    width: var(--size);
    height: var(--size);
    rotate: -90deg;
    transform-origin: 50% 50%;
  }

  .track,
  .indicator {
    --radius: calc(var(--size) / 2 - max(var(--track-width), var(--indicator-width)) * 0.5);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    fill: none;
    r: var(--radius);
    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
  }

  .track {
    stroke: var(--track-color);
    stroke-width: var(--track-width);
  }

  .indicator {
    stroke: var(--indicator-color);
    stroke-width: var(--indicator-width);
    stroke-linecap: round;
    transition-property: stroke-dashoffset;
    transition-duration: var(--indicator-transition-duration);
    stroke-dasharray: var(--circumference) var(--circumference);
    stroke-dashoffset: calc(var(--circumference) - var(--percentage) * var(--circumference));
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
  }
`;var $a="important",pn=" !"+$a,zr=ke(class extends $e{constructor(e){if(super(e),e.type!==St.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,o)=>{let r=e[o];return r==null?t:t+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`},"")}update(e,[t]){let{style:o}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let r of this.ft)t[r]==null&&(this.ft.delete(r),r.includes("-")?o.removeProperty(r):o[r]=null);for(let r in t){let i=t[r];if(i!=null){this.ft.add(r);let a=typeof i=="string"&&i.endsWith(pn);r.includes("-")||a?o.setProperty(r,a?i.slice(0,-11):i,a?$a:""):o[r]=i}}return Bt}});var ne=class extends N{constructor(){super(...arguments),this.localize=new Y(this),this.value=0,this.label=""}updated(e){if(super.updated(e),e.has("value")){let t=parseFloat(getComputedStyle(this.indicator).getPropertyValue("r")),o=2*Math.PI*t,r=o-this.value/100*o;this.indicatorOffset=`${r}px`}}render(){return c`
      <div
        part="base progress-ring"
        class="progress-ring"
        role="progressbar"
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-describedby="label"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.value}"
        style=${zr({"--percentage":this.value/100})}
      >
        <svg class="image">
          <circle part="track" class="track"></circle>
          <circle
            part="indicator"
            class="indicator"
            style=${zr({"stroke-dashoffset":this.indicatorOffset})}
          ></circle>
        </svg>

        <slot id="label" part="label" class="label"></slot>
      </div>
    `}};ne.css=ka;n([D(".indicator")],ne.prototype,"indicator",2);n([W()],ne.prototype,"indicatorOffset",2);n([d({type:Number,reflect:!0})],ne.prototype,"value",2);n([d()],ne.prototype,"label",2);ne=n([I("wa-progress-ring")],ne);ne.disableWarning?.("change-in-update");var _a=w`
  :host {
    --color: var(--wa-color-neutral-fill-normal);
    --sheen-color: color-mix(in oklab, var(--color), var(--wa-color-surface-raised));

    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 1rem;
  }

  .indicator {
    flex: 1 1 auto;
    background: var(--color);
    border-radius: var(--wa-border-radius-pill);
  }

  :host([effect='sheen']) .indicator {
    background: linear-gradient(270deg, var(--sheen-color), var(--color), var(--color), var(--sheen-color));
    background-size: 400% 100%;
    animation: sheen 8s ease-in-out infinite;
  }

  :host([effect='pulse']) .indicator {
    animation: pulse 2s ease-in-out 0.5s infinite;
  }

  /* Forced colors mode */
  @media (forced-colors: active) {
    :host {
      --color: GrayText;
    }
  }

  @keyframes sheen {
    0% {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`;var So=class extends N{constructor(){super(...arguments),this.effect="none"}render(){return c` <div part="indicator" class="indicator"></div> `}};So.css=_a;n([d({reflect:!0})],So.prototype,"effect",2);So=n([I("wa-skeleton")],So);var La=w`
  :host {
    --max-width: 30ch;

    /** These styles are added so we don't interfere in the DOM. */
    display: inline-block;
    position: absolute;

    /** Defaults for inherited CSS properties */
    color: var(--wa-tooltip-content-color);
    font-size: var(--wa-tooltip-font-size);
    line-height: var(--wa-tooltip-line-height);
    text-align: start;
    white-space: normal;
  }

  .tooltip {
    --arrow-size: var(--wa-tooltip-arrow-size);
    --arrow-color: var(--wa-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: 1000;
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--wa-tooltip-border-radius);
    background-color: var(--wa-tooltip-background-color);
    border: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    padding: 0.25em 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  .tooltip {
    --popup-border-width: var(--wa-tooltip-border-width);

    /* Inset box-shadow, not a border: Safari seams a clip-path edge that runs along a border. */
    &::part(arrow) {
      box-shadow: inset calc(-1 * var(--wa-tooltip-border-width)) calc(-1 * var(--wa-tooltip-border-width)) 0 0
        var(--wa-tooltip-border-color);
    }
  }
`;function Ea(e,t){for(;t;){if(t===e)return!0;t instanceof Element&&t.assignedSlot?t=t.assignedSlot:t.parentNode?t=t.parentNode:t instanceof ShadowRoot?t=t.host:t=null}return!1}var Q=class extends N{constructor(){super(...arguments),this.dismissedByPress=!1,this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.dismissedByPress=!1,this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{if(this.hasTrigger("click")){this.open?this.hide():this.show();return}this.hasTrigger("manual")||this.lightDismiss()},this.handleFocus=()=>{this.dismissedByPress||this.hasTrigger("focus")&&this.show()},this.handleMouseDown=()=>{this.hasTrigger("click")||this.hasTrigger("manual")||this.lightDismiss()},this.handleDocumentKeyDown=e=>{this.hasTrigger("manual")||e.key==="Escape"&&this.open&&Ro(this)&&(e.preventDefault(),e.stopPropagation(),this.hide())},this.handleDocumentClick=e=>{this.hasTrigger("manual")||this.anchor&&e.composedPath().includes(this.anchor)||this.hide()},this.handleMouseOver=()=>{this.dismissedByPress||this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=e=>{let t=e.relatedTarget,o=!!(t&&this.anchor&&Ea(this.anchor,t)),r=!!(t&&Ea(this,t));o||r||(this.dismissedByPress=!1,this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>{this.hide()},this.hideDelay)))}}connectedCallback(){super.connectedCallback(),typeof document<"u"&&(this.eventController.signal.aborted&&(this.eventController=new AbortController),this.addEventListener("mouseout",this.handleMouseOut),this.dismissedByPress=!1,this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=Qo("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange())}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("click",this.handleDocumentClick),_e(this),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(e){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition()),super.firstUpdated(e)}lightDismiss(){clearTimeout(this.hoverTimeout),this.dismissedByPress=!0,this.hide()}hasTrigger(e){return this.trigger.split(" ").includes(e)}addToAriaLabelledBy(e,t){let r=(e.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);r.includes(t)||(r.push(t),e.setAttribute("aria-labelledby",r.join(" ")))}removeFromAriaLabelledBy(e,t){let i=(e.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(a=>a!==t);i.length>0?e.setAttribute("aria-labelledby",i.join(" ")):e.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;let e=new Jt;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}this.hasTrigger("manual")||(document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),document.addEventListener("click",this.handleDocumentClick,{signal:this.eventController.signal}),Io(this)),this.body.hidden=!1,this.popup.active=!0,await Ut(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new te)}else{let e=new Qt;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("click",this.handleDocumentClick),_e(this),await Ut(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new Zt)}}handleForChange(){let e=this.getRootNode?.();if(!e)return;let t=this.for?e.getElementById?.(this.for):null,o=this.anchor;if(t===o)return;this.dismissedByPress=!1;let{signal:r}=this.eventController;t&&(this.addToAriaLabelledBy(t,this.id),t.addEventListener("blur",this.handleBlur,{capture:!0,signal:r}),t.addEventListener("focus",this.handleFocus,{capture:!0,signal:r}),t.addEventListener("click",this.handleClick,{signal:r}),t.addEventListener("mousedown",this.handleMouseDown,{signal:r}),t.addEventListener("mouseover",this.handleMouseOver,{signal:r}),t.addEventListener("mouseout",this.handleMouseOut,{signal:r})),o&&(this.removeFromAriaLabelledBy(o,this.id),o.removeEventListener("blur",this.handleBlur,{capture:!0}),o.removeEventListener("focus",this.handleFocus,{capture:!0}),o.removeEventListener("click",this.handleClick),o.removeEventListener("mousedown",this.handleMouseDown),o.removeEventListener("mouseover",this.handleMouseOver),o.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=t}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,qt(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,qt(this,"wa-after-hide")}render(){return c`
      <wa-popup
        part="base tooltip"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${H({tooltip:!0,"tooltip-open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        flip
        shift
        ?arrow=${!this.withoutArrow}
        hover-bridge
        .anchor=${this.anchor}
      >
        <div part="body" class="body">
          <slot></slot>
        </div>
      </wa-popup>
    `}};Q.css=La;Q.dependencies={"wa-popup":B};n([D("slot:not([name])")],Q.prototype,"defaultSlot",2);n([D(".body")],Q.prototype,"body",2);n([D("wa-popup")],Q.prototype,"popup",2);n([d()],Q.prototype,"placement",2);n([d({type:Boolean,reflect:!0})],Q.prototype,"disabled",2);n([d({type:Number})],Q.prototype,"distance",2);n([d({type:Boolean,reflect:!0})],Q.prototype,"open",2);n([d({type:Number})],Q.prototype,"skidding",2);n([d({attribute:"show-delay",type:Number})],Q.prototype,"showDelay",2);n([d({attribute:"hide-delay",type:Number})],Q.prototype,"hideDelay",2);n([d()],Q.prototype,"trigger",2);n([d({attribute:"without-arrow",type:Boolean,reflect:!0})],Q.prototype,"withoutArrow",2);n([d()],Q.prototype,"for",2);n([W()],Q.prototype,"anchor",2);n([R("open",{waitUntilFirstUpdate:!0})],Q.prototype,"handleOpenChange",1);n([R("for")],Q.prototype,"handleForChange",1);n([R(["distance","placement","skidding"])],Q.prototype,"handleOptionsChange",1);n([R("disabled")],Q.prototype,"handleDisabledChange",1);Q=n([I("wa-tooltip")],Q);var h2=new MutationObserver(e=>{for(let{addedNodes:t}of e)for(let o of t)o.nodeType===Node.ELEMENT_NODE&&za(o)});async function za(e){let t=e instanceof Element?e.tagName.toLowerCase():"",o=t?.startsWith("wa-"),r=[...e.querySelectorAll(":not(:defined)")].map(p=>p.tagName.toLowerCase()).filter(p=>p.startsWith("wa-"));o&&!customElements.get(t)&&r.push(t);let i=e.querySelectorAll("[data-wa-preload]"),a=e instanceof Element&&e.hasAttribute("data-wa-preload")?[e,...i]:i;for(let p of a)r.push(...p.getAttribute("data-wa-preload").split(/\s+/).filter(h=>h.startsWith("wa-")));let s=[...new Set(r)],l=await Promise.allSettled(s.map(p=>un(p)));for(let p of l)p.status==="rejected"&&console.warn(p.reason);await new Promise(requestAnimationFrame),e.dispatchEvent(new CustomEvent("wa-discovery-complete",{bubbles:!1,cancelable:!1,composed:!0}))}function un(e){if(customElements.get(e))return Promise.resolve();let t=e.replace(/^wa-/i,""),o=Cr(`components/${t}/${t}.js`);return new Promise((r,i)=>{import(o).then(()=>r()).catch(()=>i(new Error(`Unable to autoload <${e}> from ${o}`)))})}var gn=Object.defineProperty,k=(e,t)=>gn(e,"name",{value:t,configurable:!0}),Me=class{constructor(e,t,o,r,i,a){x(this,"type",3);x(this,"name","");x(this,"prefix","");x(this,"value","");x(this,"suffix","");x(this,"modifier",3);this.type=e,this.name=t,this.prefix=o,this.value=r,this.suffix=i,this.modifier=a}hasCustomName(){return this.name!==""&&typeof this.name!="number"}};k(Me,"Part");var wn=/[$_\p{ID_Start}]/u,bn=/[$_\u200C\u200D\p{ID_Continue}]/u,Ar=".*";function Da(e,t){return(t?/^[\x00-\xFF]*$/:/^[\x00-\x7F]*$/).test(e)}k(Da,"isASCII");function Or(e,t=!1){let o=[],r=0;for(;r<e.length;){let i=e[r],a=k(function(s){if(!t)throw new TypeError(s);o.push({type:"INVALID_CHAR",index:r,value:e[r++]})},"ErrorOrInvalid");if(i==="*"){o.push({type:"ASTERISK",index:r,value:e[r++]});continue}if(i==="+"||i==="?"){o.push({type:"OTHER_MODIFIER",index:r,value:e[r++]});continue}if(i==="\\"){o.push({type:"ESCAPED_CHAR",index:r++,value:e[r++]});continue}if(i==="{"){o.push({type:"OPEN",index:r,value:e[r++]});continue}if(i==="}"){o.push({type:"CLOSE",index:r,value:e[r++]});continue}if(i===":"){let s="",l=r+1;for(;l<e.length;){let p=e.substr(l,1);if(l===r+1&&wn.test(p)||l!==r+1&&bn.test(p)){s+=e[l++];continue}break}if(!s){a(`Missing parameter name at ${r}`);continue}o.push({type:"NAME",index:r,value:s}),r=l;continue}if(i==="("){let s=1,l="",p=r+1,h=!1;if(e[p]==="?"){a(`Pattern cannot start with "?" at ${p}`);continue}for(;p<e.length;){if(!Da(e[p],!1)){a(`Invalid character '${e[p]}' at ${p}.`),h=!0;break}if(e[p]==="\\"){l+=e[p++]+e[p++];continue}if(e[p]===")"){if(s--,s===0){p++;break}}else if(e[p]==="("&&(s++,e[p+1]!=="?")){a(`Capturing groups are not allowed at ${p}`),h=!0;break}l+=e[p++]}if(h)continue;if(s){a(`Unbalanced pattern at ${r}`);continue}if(!l){a(`Missing pattern at ${r}`);continue}o.push({type:"REGEX",index:r,value:l}),r=p;continue}o.push({type:"CHAR",index:r,value:e[r++]})}return o.push({type:"END",index:r,value:""}),o}k(Or,"lexer");function Mr(e,t={}){let o=Or(e);t.delimiter??(t.delimiter="/#?"),t.prefixes??(t.prefixes="./");let r=`[^${ft(t.delimiter)}]+?`,i=[],a=0,s=0,l="",p=new Set,h=k($=>{if(s<o.length&&o[s].type===$)return o[s++].value},"tryConsume"),u=k(()=>h("OTHER_MODIFIER")??h("ASTERISK"),"tryConsumeModifier"),g=k($=>{let A=h($);if(A!==void 0)return A;let{type:U,index:V}=o[s];throw new TypeError(`Unexpected ${U} at ${V}, expected ${$}`)},"mustConsume"),y=k(()=>{let $="",A;for(;A=h("CHAR")??h("ESCAPED_CHAR");)$+=A;return $},"consumeText"),v=k($=>$,"DefaultEncodePart"),C=t.encodePart||v,S="",E=k($=>{S+=$},"appendToPendingFixedValue"),_=k(()=>{S.length&&(i.push(new Me(3,"","",C(S),"",3)),S="")},"maybeAddPartFromPendingFixedValue"),F=k(($,A,U,V,X)=>{let K=3;switch(X){case"?":K=1;break;case"*":K=0;break;case"+":K=2;break}if(!A&&!U&&K===3){E($);return}if(_(),!A&&!U){if(!$)return;i.push(new Me(3,"","",C($),"",K));return}let G;U?U==="*"?G=Ar:G=U:G=r;let Z=2;G===r?(Z=1,G=""):G===Ar&&(Z=0,G="");let ut;if(A?ut=A:U&&(ut=a++),p.has(ut))throw new TypeError(`Duplicate name '${ut}'.`);p.add(ut),i.push(new Me(Z,ut,C($),G,C(V),K))},"addPart");for(;s<o.length;){let $=h("CHAR"),A=h("NAME"),U=h("REGEX");if(!A&&!U&&(U=h("ASTERISK")),A||U){let X=$??"";t.prefixes.indexOf(X)===-1&&(E(X),X=""),_();let K=u();F(X,A,U,"",K);continue}let V=$??h("ESCAPED_CHAR");if(V){E(V);continue}if(h("OPEN")){let X=y(),K=h("NAME"),G=h("REGEX");!K&&!G&&(G=h("ASTERISK"));let Z=y();g("CLOSE");let ut=u();F(X,K,G,Z,ut);continue}_(),g("END")}return i}k(Mr,"parse");function ft(e){return e.replace(/([.+*?^${}()[\]|/\\])/g,"\\$1")}k(ft,"escapeString");function Dr(e){return e&&e.ignoreCase?"ui":"u"}k(Dr,"flags");function Ta(e,t,o){return Fr(Mr(e,o),t,o)}k(Ta,"stringToRegexp");function xe(e){switch(e){case 0:return"*";case 1:return"?";case 2:return"+";case 3:return""}}k(xe,"modifierToString");function Fr(e,t,o={}){o.delimiter??(o.delimiter="/#?"),o.prefixes??(o.prefixes="./"),o.sensitive??(o.sensitive=!1),o.strict??(o.strict=!1),o.end??(o.end=!0),o.start??(o.start=!0),o.endsWith="";let r=o.start?"^":"";for(let l of e){if(l.type===3){l.modifier===3?r+=ft(l.value):r+=`(?:${ft(l.value)})${xe(l.modifier)}`;continue}t&&t.push(l.name);let p=`[^${ft(o.delimiter)}]+?`,h=l.value;if(l.type===1?h=p:l.type===0&&(h=Ar),!l.prefix.length&&!l.suffix.length){l.modifier===3||l.modifier===1?r+=`(${h})${xe(l.modifier)}`:r+=`((?:${h})${xe(l.modifier)})`;continue}if(l.modifier===3||l.modifier===1){r+=`(?:${ft(l.prefix)}(${h})${ft(l.suffix)})`,r+=xe(l.modifier);continue}r+=`(?:${ft(l.prefix)}`,r+=`((?:${h})(?:`,r+=ft(l.suffix),r+=ft(l.prefix),r+=`(?:${h}))*)${ft(l.suffix)})`,l.modifier===0&&(r+="?")}let i=`[${ft(o.endsWith)}]|$`,a=`[${ft(o.delimiter)}]`;if(o.end)return o.strict||(r+=`${a}?`),o.endsWith.length?r+=`(?=${i})`:r+="$",new RegExp(r,Dr(o));o.strict||(r+=`(?:${a}(?=${i}))?`);let s=!1;if(e.length){let l=e[e.length-1];l.type===3&&l.modifier===3&&(s=o.delimiter.indexOf(l)>-1)}return s||(r+=`(?=${a}|${i})`),new RegExp(r,Dr(o))}k(Fr,"partsToRegexp");var ce={delimiter:"",prefixes:"",sensitive:!0,strict:!0},vn={delimiter:".",prefixes:"",sensitive:!0,strict:!0},yn={delimiter:"/",prefixes:"/",sensitive:!0,strict:!0};function Ia(e,t){return e.length?e[0]==="/"?!0:!t||e.length<2?!1:(e[0]=="\\"||e[0]=="{")&&e[1]=="/":!1}k(Ia,"isAbsolutePathname");function Nr(e,t){return e.startsWith(t)?e.substring(t.length,e.length):e}k(Nr,"maybeStripPrefix");function Ra(e,t){return e.endsWith(t)?e.substr(0,e.length-t.length):e}k(Ra,"maybeStripSuffix");function Br(e){return!e||e.length<2?!1:e[0]==="["||(e[0]==="\\"||e[0]==="{")&&e[1]==="["}k(Br,"treatAsIPv6Hostname");var Oa=["ftp","file","http","https","ws","wss"];function qr(e){if(!e)return!0;for(let t of Oa)if(e.test(t))return!0;return!1}k(qr,"isSpecialScheme");function Ma(e,t){if(e=Nr(e,"#"),t||e==="")return e;let o=new URL("https://example.com");return o.hash=e,o.hash?o.hash.substring(1,o.hash.length):""}k(Ma,"canonicalizeHash");function Fa(e,t){if(e=Nr(e,"?"),t||e==="")return e;let o=new URL("https://example.com");return o.search=e,o.search?o.search.substring(1,o.search.length):""}k(Fa,"canonicalizeSearch");function Na(e,t){return t||e===""?e:Br(e)?Wr(e):Vr(e)}k(Na,"canonicalizeHostname");function Ba(e,t){if(t||e==="")return e;let o=new URL("https://example.com");return o.password=e,o.password}k(Ba,"canonicalizePassword");function qa(e,t){if(t||e==="")return e;let o=new URL("https://example.com");return o.username=e,o.username}k(qa,"canonicalizeUsername");function Ua(e,t,o){if(o||e==="")return e;if(t&&!Oa.includes(t))return new URL(`${t}:${e}`).pathname;let r=e[0]=="/";return e=new URL(r?e:"/-"+e,"https://example.com").pathname,r||(e=e.substring(2,e.length)),e}k(Ua,"canonicalizePathname");function Va(e,t,o){return Ur(t)===e&&(e=""),o||e===""?e:Hr(e)}k(Va,"canonicalizePort");function Wa(e,t){return e=Ra(e,":"),t||e===""?e:rr(e)}k(Wa,"canonicalizeProtocol");function Ur(e){switch(e){case"ws":case"http":return"80";case"wws":case"https":return"443";case"ftp":return"21";default:return""}}k(Ur,"defaultPortForProtocol");function rr(e){if(e==="")return e;if(/^[-+.A-Za-z0-9]*$/.test(e))return e.toLowerCase();throw new TypeError(`Invalid protocol '${e}'.`)}k(rr,"protocolEncodeCallback");function Ha(e){if(e==="")return e;let t=new URL("https://example.com");return t.username=e,t.username}k(Ha,"usernameEncodeCallback");function ja(e){if(e==="")return e;let t=new URL("https://example.com");return t.password=e,t.password}k(ja,"passwordEncodeCallback");function Vr(e){if(e==="")return e;if(/[\t\n\r #%/:<>?@[\]^\\|]/g.test(e))throw new TypeError(`Invalid hostname '${e}'`);let t=new URL("https://example.com");return t.hostname=e,t.hostname}k(Vr,"hostnameEncodeCallback");function Wr(e){if(e==="")return e;if(/[^0-9a-fA-F[\]:]/g.test(e))throw new TypeError(`Invalid IPv6 hostname '${e}'`);return e.toLowerCase()}k(Wr,"ipv6HostnameEncodeCallback");function Hr(e){if(e===""||/^[0-9]*$/.test(e)&&parseInt(e)<=65535)return e;throw new TypeError(`Invalid port '${e}'.`)}k(Hr,"portEncodeCallback");function Ya(e){if(e==="")return e;let t=new URL("https://example.com");return t.pathname=e[0]!=="/"?"/-"+e:e,e[0]!=="/"?t.pathname.substring(2,t.pathname.length):t.pathname}k(Ya,"standardURLPathnameEncodeCallback");function Xa(e){return e===""?e:new URL(`data:${e}`).pathname}k(Xa,"pathURLPathnameEncodeCallback");function Ka(e){if(e==="")return e;let t=new URL("https://example.com");return t.search=e,t.search.substring(1,t.search.length)}k(Ka,"searchEncodeCallback");function Ga(e){if(e==="")return e;let t=new URL("https://example.com");return t.hash=e,t.hash.substring(1,t.hash.length)}k(Ga,"hashEncodeCallback");var Fe,pt,at,j,Ce,Ne,gt,Be,qe,Ue,f,rt,Qa,Tr,ko,tr,vt,Ir,Za,er,ts,es,or,Ie,ye,os,rs,is,as,Ot,ss,Pa,Ja=(Pa=class{constructor(e){it(this,f);it(this,Fe);it(this,pt,[]);it(this,at,{});it(this,j,0);it(this,Ce,1);it(this,Ne,0);it(this,gt,0);it(this,Be,0);it(this,qe,0);it(this,Ue,!1);et(this,Fe,e)}get result(){return m(this,at)}parse(){for(et(this,pt,Or(m(this,Fe),!0));m(this,j)<m(this,pt).length;et(this,j,m(this,j)+m(this,Ce))){if(et(this,Ce,1),m(this,pt)[m(this,j)].type==="END"){if(m(this,gt)===0){b(this,f,Tr).call(this),b(this,f,ye).call(this)?b(this,f,rt).call(this,9,1):b(this,f,Ie).call(this)?b(this,f,rt).call(this,8,1):b(this,f,rt).call(this,7,0);continue}else if(m(this,gt)===2){b(this,f,ko).call(this,5);continue}b(this,f,rt).call(this,10,0);break}if(m(this,Be)>0)if(b(this,f,rs).call(this))et(this,Be,m(this,Be)-1);else continue;if(b(this,f,os).call(this)){et(this,Be,m(this,Be)+1);continue}switch(m(this,gt)){case 0:b(this,f,Ir).call(this)&&b(this,f,ko).call(this,1);break;case 1:if(b(this,f,Ir).call(this)){b(this,f,ss).call(this);let e=7,t=1;b(this,f,Za).call(this)?(e=2,t=3):m(this,Ue)&&(e=2),b(this,f,rt).call(this,e,t)}break;case 2:b(this,f,er).call(this)?b(this,f,ko).call(this,3):(b(this,f,or).call(this)||b(this,f,Ie).call(this)||b(this,f,ye).call(this))&&b(this,f,ko).call(this,5);break;case 3:b(this,f,ts).call(this)?b(this,f,rt).call(this,4,1):b(this,f,er).call(this)&&b(this,f,rt).call(this,5,1);break;case 4:b(this,f,er).call(this)&&b(this,f,rt).call(this,5,1);break;case 5:b(this,f,is).call(this)?et(this,qe,m(this,qe)+1):b(this,f,as).call(this)&&et(this,qe,m(this,qe)-1),b(this,f,es).call(this)&&!m(this,qe)?b(this,f,rt).call(this,6,1):b(this,f,or).call(this)?b(this,f,rt).call(this,7,0):b(this,f,Ie).call(this)?b(this,f,rt).call(this,8,1):b(this,f,ye).call(this)&&b(this,f,rt).call(this,9,1);break;case 6:b(this,f,or).call(this)?b(this,f,rt).call(this,7,0):b(this,f,Ie).call(this)?b(this,f,rt).call(this,8,1):b(this,f,ye).call(this)&&b(this,f,rt).call(this,9,1);break;case 7:b(this,f,Ie).call(this)?b(this,f,rt).call(this,8,1):b(this,f,ye).call(this)&&b(this,f,rt).call(this,9,1);break;case 8:b(this,f,ye).call(this)&&b(this,f,rt).call(this,9,1);break;case 9:break;case 10:break}}m(this,at).hostname!==void 0&&m(this,at).port===void 0&&(m(this,at).port="")}},Fe=new WeakMap,pt=new WeakMap,at=new WeakMap,j=new WeakMap,Ce=new WeakMap,Ne=new WeakMap,gt=new WeakMap,Be=new WeakMap,qe=new WeakMap,Ue=new WeakMap,f=new WeakSet,rt=function(e,t){var o,r,i;switch(m(this,gt)){case 0:break;case 1:m(this,at).protocol=b(this,f,Ot).call(this);break;case 2:break;case 3:m(this,at).username=b(this,f,Ot).call(this);break;case 4:m(this,at).password=b(this,f,Ot).call(this);break;case 5:m(this,at).hostname=b(this,f,Ot).call(this);break;case 6:m(this,at).port=b(this,f,Ot).call(this);break;case 7:m(this,at).pathname=b(this,f,Ot).call(this);break;case 8:m(this,at).search=b(this,f,Ot).call(this);break;case 9:m(this,at).hash=b(this,f,Ot).call(this);break;case 10:break}m(this,gt)!==0&&e!==10&&([1,2,3,4].includes(m(this,gt))&&[6,7,8,9].includes(e)&&((o=m(this,at)).hostname??(o.hostname="")),[1,2,3,4,5,6].includes(m(this,gt))&&[8,9].includes(e)&&((r=m(this,at)).pathname??(r.pathname=m(this,Ue)?"/":"")),[1,2,3,4,5,6,7].includes(m(this,gt))&&e===9&&((i=m(this,at)).search??(i.search=""))),b(this,f,Qa).call(this,e,t)},Qa=function(e,t){et(this,gt,e),et(this,Ne,m(this,j)+t),et(this,j,m(this,j)+t),et(this,Ce,0)},Tr=function(){et(this,j,m(this,Ne)),et(this,Ce,0)},ko=function(e){b(this,f,Tr).call(this),et(this,gt,e)},tr=function(e){return e<0&&(e=m(this,pt).length-e),e<m(this,pt).length?m(this,pt)[e]:m(this,pt)[m(this,pt).length-1]},vt=function(e,t){let o=b(this,f,tr).call(this,e);return o.value===t&&(o.type==="CHAR"||o.type==="ESCAPED_CHAR"||o.type==="INVALID_CHAR")},Ir=function(){return b(this,f,vt).call(this,m(this,j),":")},Za=function(){return b(this,f,vt).call(this,m(this,j)+1,"/")&&b(this,f,vt).call(this,m(this,j)+2,"/")},er=function(){return b(this,f,vt).call(this,m(this,j),"@")},ts=function(){return b(this,f,vt).call(this,m(this,j),":")},es=function(){return b(this,f,vt).call(this,m(this,j),":")},or=function(){return b(this,f,vt).call(this,m(this,j),"/")},Ie=function(){if(b(this,f,vt).call(this,m(this,j),"?"))return!0;if(m(this,pt)[m(this,j)].value!=="?")return!1;let e=b(this,f,tr).call(this,m(this,j)-1);return e.type!=="NAME"&&e.type!=="REGEX"&&e.type!=="CLOSE"&&e.type!=="ASTERISK"},ye=function(){return b(this,f,vt).call(this,m(this,j),"#")},os=function(){return m(this,pt)[m(this,j)].type=="OPEN"},rs=function(){return m(this,pt)[m(this,j)].type=="CLOSE"},is=function(){return b(this,f,vt).call(this,m(this,j),"[")},as=function(){return b(this,f,vt).call(this,m(this,j),"]")},Ot=function(){let e=m(this,pt)[m(this,j)],t=b(this,f,tr).call(this,m(this,Ne)).index;return m(this,Fe).substring(t,e.index)},ss=function(){let e={};Object.assign(e,ce),e.encodePart=rr;let t=Ta(b(this,f,Ot).call(this),void 0,e);et(this,Ue,qr(t))},Pa);k(Ja,"Parser");var Pr=["protocol","username","password","hostname","port","pathname","search","hash"],le="*";function Rr(e,t){if(typeof e!="string")throw new TypeError("parameter 1 is not of type 'string'.");let o=new URL(e,t);return{protocol:o.protocol.substring(0,o.protocol.length-1),username:o.username,password:o.password,hostname:o.hostname,port:o.port,pathname:o.pathname,search:o.search!==""?o.search.substring(1,o.search.length):void 0,hash:o.hash!==""?o.hash.substring(1,o.hash.length):void 0}}k(Rr,"extractValues");function Mt(e,t){return t?Oe(e):e}k(Mt,"processBaseURLString");function Re(e,t,o){let r;if(typeof t.baseURL=="string")try{r=new URL(t.baseURL),t.protocol===void 0&&(e.protocol=Mt(r.protocol.substring(0,r.protocol.length-1),o)),!o&&t.protocol===void 0&&t.hostname===void 0&&t.port===void 0&&t.username===void 0&&(e.username=Mt(r.username,o)),!o&&t.protocol===void 0&&t.hostname===void 0&&t.port===void 0&&t.username===void 0&&t.password===void 0&&(e.password=Mt(r.password,o)),t.protocol===void 0&&t.hostname===void 0&&(e.hostname=Mt(r.hostname,o)),t.protocol===void 0&&t.hostname===void 0&&t.port===void 0&&(e.port=Mt(r.port,o)),t.protocol===void 0&&t.hostname===void 0&&t.port===void 0&&t.pathname===void 0&&(e.pathname=Mt(r.pathname,o)),t.protocol===void 0&&t.hostname===void 0&&t.port===void 0&&t.pathname===void 0&&t.search===void 0&&(e.search=Mt(r.search.substring(1,r.search.length),o)),t.protocol===void 0&&t.hostname===void 0&&t.port===void 0&&t.pathname===void 0&&t.search===void 0&&t.hash===void 0&&(e.hash=Mt(r.hash.substring(1,r.hash.length),o))}catch{throw new TypeError(`invalid baseURL '${t.baseURL}'.`)}if(typeof t.protocol=="string"&&(e.protocol=Wa(t.protocol,o)),typeof t.username=="string"&&(e.username=qa(t.username,o)),typeof t.password=="string"&&(e.password=Ba(t.password,o)),typeof t.hostname=="string"&&(e.hostname=Na(t.hostname,o)),typeof t.port=="string"&&(e.port=Va(t.port,e.protocol,o)),typeof t.pathname=="string"){if(e.pathname=t.pathname,r&&!Ia(e.pathname,o)){let i=r.pathname.lastIndexOf("/");i>=0&&(e.pathname=Mt(r.pathname.substring(0,i+1),o)+e.pathname)}e.pathname=Ua(e.pathname,e.protocol,o)}return typeof t.search=="string"&&(e.search=Fa(t.search,o)),typeof t.hash=="string"&&(e.hash=Ma(t.hash,o)),e}k(Re,"applyInit");function Oe(e){return e.replace(/([+*?:{}()\\])/g,"\\$1")}k(Oe,"escapePatternString");function ns(e){return e.replace(/([.+*?^${}()[\]|/\\])/g,"\\$1")}k(ns,"escapeRegexpString");function ls(e,t){t.delimiter??(t.delimiter="/#?"),t.prefixes??(t.prefixes="./"),t.sensitive??(t.sensitive=!1),t.strict??(t.strict=!1),t.end??(t.end=!0),t.start??(t.start=!0),t.endsWith="";let o=".*",r=`[^${ns(t.delimiter)}]+?`,i=/[$_\u200C\u200D\p{ID_Continue}]/u,a="";for(let s=0;s<e.length;++s){let l=e[s];if(l.type===3){if(l.modifier===3){a+=Oe(l.value);continue}a+=`{${Oe(l.value)}}${xe(l.modifier)}`;continue}let p=l.hasCustomName(),h=!!l.suffix.length||!!l.prefix.length&&(l.prefix.length!==1||!t.prefixes.includes(l.prefix)),u=s>0?e[s-1]:null,g=s<e.length-1?e[s+1]:null;if(!h&&p&&l.type===1&&l.modifier===3&&g&&!g.prefix.length&&!g.suffix.length)if(g.type===3){let y=g.value.length>0?g.value[0]:"";h=i.test(y)}else h=!g.hasCustomName();if(!h&&!l.prefix.length&&u&&u.type===3){let y=u.value[u.value.length-1];h=t.prefixes.includes(y)}h&&(a+="{"),a+=Oe(l.prefix),p&&(a+=`:${l.name}`),l.type===2?a+=`(${l.value})`:l.type===1?p||(a+=`(${r})`):l.type===0&&(!p&&(!u||u.type===3||u.modifier!==3||h||l.prefix!=="")?a+="*":a+=`(${o})`),l.type===1&&p&&l.suffix.length&&i.test(l.suffix[0])&&(a+="\\"),a+=Oe(l.suffix),h&&(a+="}"),l.modifier!==3&&(a+=xe(l.modifier))}return a}k(ls,"partsToPattern");var Ft,Se,Ve,st,zt,We,Aa,$o=(Aa=class{constructor(e={},t,o){it(this,Ft);it(this,Se,{});it(this,Ve,{});it(this,st,{});it(this,zt,{});it(this,We,!1);try{let r;if(typeof t=="string"?r=t:o=t,typeof e=="string"){let l=new Ja(e);if(l.parse(),e=l.result,r===void 0&&typeof e.protocol!="string")throw new TypeError("A base URL must be provided for a relative constructor string.");e.baseURL=r}else{if(!e||typeof e!="object")throw new TypeError("parameter 1 is not of type 'string' and cannot convert to dictionary.");if(r)throw new TypeError("parameter 1 is not of type 'string'.")}typeof o>"u"&&(o={ignoreCase:!1});let i={ignoreCase:o.ignoreCase===!0};et(this,Ft,Re({pathname:le,protocol:le,username:le,password:le,hostname:le,port:le,search:le,hash:le},e,!0)),Ur(m(this,Ft).protocol)===m(this,Ft).port&&(m(this,Ft).port="");let s;for(s of Pr){if(!(s in m(this,Ft)))continue;let l={},p=m(this,Ft)[s];switch(m(this,Ve)[s]=[],s){case"protocol":Object.assign(l,ce),l.encodePart=rr;break;case"username":Object.assign(l,ce),l.encodePart=Ha;break;case"password":Object.assign(l,ce),l.encodePart=ja;break;case"hostname":Object.assign(l,vn),Br(p)?l.encodePart=Wr:l.encodePart=Vr;break;case"port":Object.assign(l,ce),l.encodePart=Hr;break;case"pathname":qr(m(this,Se).protocol)?(Object.assign(l,yn,i),l.encodePart=Ya):(Object.assign(l,ce,i),l.encodePart=Xa);break;case"search":Object.assign(l,ce,i),l.encodePart=Ka;break;case"hash":Object.assign(l,ce,i),l.encodePart=Ga;break}try{m(this,zt)[s]=Mr(p,l),m(this,Se)[s]=Fr(m(this,zt)[s],m(this,Ve)[s],l),m(this,st)[s]=ls(m(this,zt)[s],l),et(this,We,m(this,We)||m(this,zt)[s].some(h=>h.type===2))}catch{throw new TypeError(`invalid ${s} pattern '${m(this,Ft)[s]}'.`)}}}catch(r){throw new TypeError(`Failed to construct 'URLPattern': ${r.message}`)}}get[Symbol.toStringTag](){return"URLPattern"}test(e={},t){let o={pathname:"",protocol:"",username:"",password:"",hostname:"",port:"",search:"",hash:""};if(typeof e!="string"&&t)throw new TypeError("parameter 1 is not of type 'string'.");if(typeof e>"u")return!1;try{typeof e=="object"?o=Re(o,e,!1):o=Re(o,Rr(e,t),!1)}catch{return!1}let r;for(r of Pr)if(!m(this,Se)[r].exec(o[r]))return!1;return!0}exec(e={},t){let o={pathname:"",protocol:"",username:"",password:"",hostname:"",port:"",search:"",hash:""};if(typeof e!="string"&&t)throw new TypeError("parameter 1 is not of type 'string'.");if(typeof e>"u")return;try{typeof e=="object"?o=Re(o,e,!1):o=Re(o,Rr(e,t),!1)}catch{return null}let r={};t?r.inputs=[e,t]:r.inputs=[e];let i;for(i of Pr){let a=m(this,Se)[i].exec(o[i]);if(!a)return null;let s={};for(let[l,p]of m(this,Ve)[i].entries())if(typeof p=="string"||typeof p=="number"){let h=a[l+1];s[p]=h}r[i]={input:o[i]??"",groups:s}}return r}static compareComponent(e,t,o){let r=k((l,p)=>{for(let h of["type","modifier","prefix","value","suffix"]){if(l[h]<p[h])return-1;if(l[h]!==p[h])return 1}return 0},"comparePart"),i=new Me(3,"","","","",3),a=new Me(0,"","","","",3),s=k((l,p)=>{let h=0;for(;h<Math.min(l.length,p.length);++h){let u=r(l[h],p[h]);if(u)return u}return l.length===p.length?0:r(l[h]??i,p[h]??i)},"comparePartList");return!m(t,st)[e]&&!m(o,st)[e]?0:m(t,st)[e]&&!m(o,st)[e]?s(m(t,zt)[e],[a]):!m(t,st)[e]&&m(o,st)[e]?s([a],m(o,zt)[e]):s(m(t,zt)[e],m(o,zt)[e])}get protocol(){return m(this,st).protocol}get username(){return m(this,st).username}get password(){return m(this,st).password}get hostname(){return m(this,st).hostname}get port(){return m(this,st).port}get pathname(){return m(this,st).pathname}get search(){return m(this,st).search}get hash(){return m(this,st).hash}get hasRegExpGroups(){return m(this,We)}},Ft=new WeakMap,Se=new WeakMap,Ve=new WeakMap,st=new WeakMap,zt=new WeakMap,We=new WeakMap,Aa);k($o,"URLPattern");globalThis.URLPattern||(globalThis.URLPattern=$o);var cs=new WeakMap,ds=e=>{if((o=>o.pattern!==void 0)(e))return e.pattern;let t=cs.get(e);return t===void 0&&cs.set(e,t=new URLPattern({pathname:e.path})),t},_o=class{constructor(t,o,r){this.routes=[],this.o=[],this.t={},this.i=i=>{if(i.routes===this)return;let a=i.routes;this.o.push(a),a.h=this,i.stopImmediatePropagation(),i.onDisconnect=()=>{this.o?.splice(this.o.indexOf(a)>>>0,1)};let s=hs(this.t);s!==void 0&&a.goto(s)},(this.l=t).addController(this),this.routes=[...o],this.fallback=r?.fallback}link(t){if(t?.startsWith("/"))return t;if(t?.startsWith("."))throw Error("Not implemented");return t??(t=this.u),(this.h?.link()??"")+t}async goto(t){let o;if(this.routes.length===0&&this.fallback===void 0)o=t,this.u="",this.t={0:o};else{let r=this.p(t);if(r===void 0)throw Error("No route found for "+t);let i=ds(r).exec({pathname:t}),a=i?.pathname.groups??{};if(o=hs(a),typeof r.enter=="function"&&await r.enter(a)===!1)return;this.v=r,this.t=a,this.u=o===void 0?t:t.substring(0,t.length-o.length)}if(o!==void 0)for(let r of this.o)r.goto(o);this.l.requestUpdate()}outlet(){return this.v?.render?.(this.t)}get params(){return this.t}p(t){let o=this.routes.find((r=>ds(r).test({pathname:t})));return o||this.fallback===void 0?o:this.fallback?{...this.fallback,path:"/*"}:void 0}hostConnected(){this.l.addEventListener(He.eventName,this.i);let t=new He(this);this.l.dispatchEvent(t),this._=t.onDisconnect}hostDisconnected(){this._?.(),this.h=void 0}},hs=e=>{let t;for(let o of Object.keys(e))/\d+/.test(o)&&(t===void 0||o>t)&&(t=o);return t&&e[t]},He=class e extends Event{constructor(t){super(e.eventName,{bubbles:!0,composed:!0,cancelable:!1}),this.routes=t}};He.eventName="lit-routes-connected";var xn=location.origin||location.protocol+"//"+location.host,Lo=class extends _o{constructor(){super(...arguments),this.m=t=>{let o=t.button!==0||t.metaKey||t.ctrlKey||t.shiftKey;if(t.defaultPrevented||o)return;let r=t.composedPath().find((s=>s.tagName==="A"));if(r===void 0||r.target!==""||r.hasAttribute("download")||r.getAttribute("rel")==="external")return;let i=r.href;if(i===""||i.startsWith("mailto:"))return;let a=window.location;r.origin===xn&&(t.preventDefault(),i!==a.href&&(window.history.pushState({},"",i),this.goto(r.pathname)))},this.R=t=>{this.goto(window.location.pathname)}}hostConnected(){super.hostConnected(),window.addEventListener("click",this.m),window.addEventListener("popstate",this.R),this.goto(window.location.pathname)}hostDisconnected(){super.hostDisconnected(),window.removeEventListener("click",this.m),window.removeEventListener("popstate",this.R)}};yo("/dist/webawesome");globalThis.URLPattern||(globalThis.URLPattern=$o);var ir=e=>async()=>(await e(),!0),Eo=class extends L{constructor(){super(),this.user=null,this.loading=!1,this.currentPage="home",this.selectedServer=void 0,this.router=new Lo(this,[{path:"/~{/}?",render:()=>c`<home-view .selectedServer=${this.selectedServer}></home-view>`},{path:"/~/server/:id{/}?",render:t=>{let o=parseInt(t.id,10);return this.selectedServer=isNaN(o)?void 0:o,this.requestUpdate(),c`<home-view .selectedServer=${this.selectedServer}></home-view>`}},{path:"/~/allitems{/}?",render:()=>c`<all-item-view .selectedServer=${this.selectedServer}></all-item-view>`},{path:"/~/settings{/}?",render:()=>c`<settings-view .user=${this.user}></settings-view>`},{path:"/~/server/:id/item/:itemid{/}?",render:t=>{let o=parseInt(t.id,10),r=parseInt(t.itemid,10);return this.selectedServer=isNaN(o)?void 0:o,this.requestUpdate(),c`<item-view .selectedServer=${this.selectedServer} .item=${r} .user=${this.user}></item-view>`}},{path:"/~/myrecoms{/}?",enter:ir(()=>import("./staff-view-WUCF4BJY.js")),render:()=>this.user&&(this.user.role=="staff"||this.user.role=="admin")?c`<my-recoms .user=${this.user}></my-recoms>`:c``},{path:"/~/adminpanel{/}?",enter:ir(()=>import("./admin-view-6DE2L6SL.js")),render:()=>{if(this.user&&this.user.role=="admin")return c`<admin-view .user=${this.user}></admin-view>`}},{path:"/~/spawners{/}?",render:()=>c`<spawner-view .selectedServer=${this.selectedServer}></spawner-view>`},{path:"/~/search{/}?",render:()=>c`<search-view .selectedServer=${this.selectedServer}></search-view>`},{path:"/~/advancedsearch{/}?",render:()=>c`<advanced-search-view .selectedServer=${this.selectedServer}></advanced-search-view>`},{path:"/~/grouppricing{/}?",enter:ir(()=>import("./group-pricing-G54CNFPJ.js")),render:()=>this.user&&(this.user.role=="staff"||this.user.role=="admin")?c`<group-price-view .selectedServer=${this.selectedServer}></group-price-view>`:c``},{path:"/~/viewgroups{/}?",enter:ir(()=>import("./gp-view-74R2QQXG.js")),render:()=>{if(this.user&&(this.user.role=="staff"||this.user.role=="admin"))return c`<manage-gp .user=${this.user}></manage-gp>`}},{path:"/~/updates/:post{/}?",render:({post:t})=>c`<site-updates .post=${t}></site-updates>`},{path:"/~/purchaseplan/home{/}?",render:()=>{if(this.user)return c`<my-purchase-plans></my-purchase-plans>`}},{path:"/~/purchaseplan/new{/}?",render:()=>{if(this.user)return c`<new-purchase-plan .selectedServer=${this.selectedServer}></new-purchase-plan>`}},{path:"/~/purchaseplan/view/:id{/}?",render:t=>c`<view-purchase-plan .plan_id=${t.id} .user=${this.user} .selectedServer=${this.selectedServer}></view-purchase-plan>`}])}connectedCallback(){super.connectedCallback(),this._checkLinkPopups(),this.checkLoginStatus(!1),this._getSelectedServer(),this.addEventListener("nav-requested",t=>{let o=t.detail&&t.detail.path?t.detail.path:window.location.pathname+window.location.search;this._getSelectedServer();let r=new URL(o,window.location.origin);window.history.pushState({},"",r),this.router.goto(r.pathname),Promise.resolve().then(()=>{this._syncServerFromURL(),this.requestUpdate()})}),this.addEventListener("check-login",()=>this.checkLoginStatus(!0)),window.addEventListener("popstate",()=>this._syncFromPathName()),this._syncFromPathName()}_checkLinkPopups(){let t=new URLSearchParams(window.location.search),r={0:{content:"<strong>Success!</strong><br>You are now logged in.",variant:"success",icon:"circle-check",allowHtml:!0},1:{content:"<strong>Login Failed</strong><br>You aren't in the BlossomCraft Discord server.",variant:"warning",icon:"circle-exclamation",duration:1e4,allowHtml:!0},2:{content:"<strong>Login Failed</strong><br>You haven't linked your Minecraft account in the BlossomCraft Discord server.",variant:"warning",icon:"circle-exclamation",duration:1e4,allowHtml:!0}}[t.get("linkPopup")];if(r){Kt(r.content,{variant:r.variant,icon:r.icon,allowHtml:r.allowHtml||!1,duration:r.duration||5e3}),t.delete("linkPopup");let i=`${window.location.pathname}${t.toString()?"?"+t.toString():""}${window.location.hash}`;window.history.replaceState({},"",i)}}_syncFromPathName(){let t=window.location.pathname;this._getSelectedServer(),this._syncServerFromURL(),this.router.goto(t),this.requestUpdate()}_getSelectedServer(){this.selectedServer=localStorage.getItem("selectedServer")===null||isNaN(Number(localStorage.getItem("selectedServer")))?void 0:Number(localStorage.getItem("selectedServer"))}_syncServerFromURL(){let t=window.location.pathname;if(t.startsWith("/~/server/")){let o=t.split("/")[3],r=parseInt(o,10);this.selectedServer=isNaN(r)?void 0:r}}async checkLoginStatus(t){this.loading=!0;try{let o=await fetch("/api/auth/me",{method:"GET",credentials:"include"});if(!o.ok){if(o.status!==401)throw console.log(o),new Error("Force catch");console.log("No valid login found."),this.user=null,t&&Kt("Successfully logged out.",{variant:"success",icon:"right-from-bracket"});return}let r=await o.json();r.loggedIn&&r.role&&r.user?this.user=r:(window.alert("Unknown authentication error"),console.error("Server sent invalid user data."))}catch(o){window.alert("Authentication check failed."),console.log(o)}finally{this.loading=!1}}render(){return this.loading?c`<p>Please Wait...</p>`:c`
    <div class="main">
      <top-navbar .user=${this.user} .rootSelectedServer=${this.selectedServer}></top-navbar>
      <div class="content">
      ${this.router.outlet()}
      <site-footer></site-footer>
      </div></div>
    `}};x(Eo,"properties",{user:{type:Object},loading:{type:Boolean},currentPage:{type:String},selectedServer:{type:Number}}),x(Eo,"styles",[z,w`
    .main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .content {
    flex: 1;
    min-height: 0;
    display: grid;
    grid-template-rows: 1fr auto;
  }
  `]);customElements.define("app-view",Eo);export{Eo as AppView};
/*! Bundled license information:

@awesome.me/webawesome/dist/chunks/chunk.UZWY5NQM.js:
@awesome.me/webawesome/dist/chunks/chunk.DITA2S5A.js:
@awesome.me/webawesome/dist/chunks/chunk.4ZAKP7NY.js:
@awesome.me/webawesome/dist/chunks/chunk.MQODJ75V.js:
@awesome.me/webawesome/dist/chunks/chunk.3NKIHICW.js:
@awesome.me/webawesome/dist/chunks/chunk.PX3HMKF7.js:
@awesome.me/webawesome/dist/chunks/chunk.JTOY5KP3.js:
@awesome.me/webawesome/dist/chunks/chunk.3H2FQERJ.js:
@awesome.me/webawesome/dist/chunks/chunk.GWSUX3V5.js:
@awesome.me/webawesome/dist/chunks/chunk.JPBXG7RE.js:
@awesome.me/webawesome/dist/chunks/chunk.VC3BPUZJ.js:
@awesome.me/webawesome/dist/chunks/chunk.7VGCIHDG.js:
@awesome.me/webawesome/dist/chunks/chunk.AOKMSJXD.js:
@awesome.me/webawesome/dist/chunks/chunk.KBXNFZQL.js:
@awesome.me/webawesome/dist/chunks/chunk.RPQJAXXR.js:
@awesome.me/webawesome/dist/chunks/chunk.RWNXKUCF.js:
@awesome.me/webawesome/dist/chunks/chunk.G5ZZIGWB.js:
@awesome.me/webawesome/dist/chunks/chunk.F25QOBDY.js:
@awesome.me/webawesome/dist/chunks/chunk.L6CIKOFQ.js:
@awesome.me/webawesome/dist/chunks/chunk.PZAN6FPN.js:
@awesome.me/webawesome/dist/chunks/chunk.M45NRQFW.js:
@awesome.me/webawesome/dist/chunks/chunk.S67PIWQL.js:
@awesome.me/webawesome/dist/chunks/chunk.ZAVDMBWV.js:
@awesome.me/webawesome/dist/chunks/chunk.HPULLNVR.js:
@awesome.me/webawesome/dist/chunks/chunk.4AHPL3WP.js:
@awesome.me/webawesome/dist/chunks/chunk.XNTP7DEQ.js:
@awesome.me/webawesome/dist/chunks/chunk.JS5OA4M6.js:
@awesome.me/webawesome/dist/chunks/chunk.C3KOHXUM.js:
@awesome.me/webawesome/dist/chunks/chunk.5WATURH2.js:
@awesome.me/webawesome/dist/chunks/chunk.ZWQCGLB5.js:
@awesome.me/webawesome/dist/chunks/chunk.HS5AYC6E.js:
@awesome.me/webawesome/dist/chunks/chunk.UEBQI7VV.js:
@awesome.me/webawesome/dist/chunks/chunk.R7QX4M6R.js:
@awesome.me/webawesome/dist/chunks/chunk.S35PLDPD.js:
@awesome.me/webawesome/dist/chunks/chunk.LXLE4T4D.js:
@awesome.me/webawesome/dist/chunks/chunk.W7A2VLCT.js:
@awesome.me/webawesome/dist/chunks/chunk.EGBUT3HG.js:
@awesome.me/webawesome/dist/chunks/chunk.YDQCS2HK.js:
@awesome.me/webawesome/dist/chunks/chunk.WDIIGUNP.js:
@awesome.me/webawesome/dist/chunks/chunk.O74G5RVH.js:
@awesome.me/webawesome/dist/chunks/chunk.HGBRCPUS.js:
@awesome.me/webawesome/dist/chunks/chunk.KKI7M5DP.js:
@awesome.me/webawesome/dist/chunks/chunk.YPRC5XZF.js:
@awesome.me/webawesome/dist/chunks/chunk.UDRJMWVZ.js:
@awesome.me/webawesome/dist/chunks/chunk.JAAVYFGY.js:
@awesome.me/webawesome/dist/components/select/select.js:
@awesome.me/webawesome/dist/components/option/option.js:
@awesome.me/webawesome/dist/chunks/chunk.4XYGFHPR.js:
@awesome.me/webawesome/dist/chunks/chunk.3ZKPD2O5.js:
@awesome.me/webawesome/dist/chunks/chunk.R6M2PXD4.js:
@awesome.me/webawesome/dist/components/input/input.js:
@awesome.me/webawesome/dist/components/button/button.js:
@awesome.me/webawesome/dist/components/spinner/spinner.js:
@awesome.me/webawesome/dist/components/icon/icon.js:
@awesome.me/webawesome/dist/chunks/chunk.DWWFIQKG.js:
@awesome.me/webawesome/dist/chunks/chunk.Q5CVJBTB.js:
@awesome.me/webawesome/dist/components/switch/switch.js:
@awesome.me/webawesome/dist/chunks/chunk.CB2JRBWR.js:
@awesome.me/webawesome/dist/chunks/chunk.KFCTFBMF.js:
@awesome.me/webawesome/dist/components/button-group/button-group.js:
@awesome.me/webawesome/dist/chunks/chunk.LCEGCF5S.js:
@awesome.me/webawesome/dist/chunks/chunk.C6MKRB3S.js:
@awesome.me/webawesome/dist/components/callout/callout.js:
@awesome.me/webawesome/dist/chunks/chunk.5J72BVE2.js:
@awesome.me/webawesome/dist/chunks/chunk.QGTNOKI7.js:
@awesome.me/webawesome/dist/components/number-input/number-input.js:
@awesome.me/webawesome/dist/chunks/chunk.W62SLQ7P.js:
@awesome.me/webawesome/dist/chunks/chunk.Z7CHPABS.js:
@awesome.me/webawesome/dist/components/details/details.js:
@awesome.me/webawesome/dist/chunks/chunk.FVSSD7XB.js:
@awesome.me/webawesome/dist/chunks/chunk.KNJT7KBU.js:
@awesome.me/webawesome/dist/chunks/chunk.R77TYQJ6.js:
@awesome.me/webawesome/dist/chunks/chunk.6AMLOZPA.js:
@awesome.me/webawesome/dist/chunks/chunk.RZRAQXM6.js:
@awesome.me/webawesome/dist/chunks/chunk.3HIXNYAW.js:
@awesome.me/webawesome/dist/chunks/chunk.5VXZIVD5.js:
@awesome.me/webawesome/dist/components/toast/toast.js:
@awesome.me/webawesome/dist/chunks/chunk.JLCUD5BZ.js:
@awesome.me/webawesome/dist/chunks/chunk.XQCWQFLH.js:
@awesome.me/webawesome/dist/components/skeleton/skeleton.js:
@awesome.me/webawesome/dist/chunks/chunk.DJLBC7Q4.js:
@awesome.me/webawesome/dist/chunks/chunk.6RPNM7SD.js:
@awesome.me/webawesome/dist/components/tooltip/tooltip.js:
@awesome.me/webawesome/dist/chunks/chunk.D5YFE5NT.js:
@awesome.me/webawesome/dist/chunks/chunk.N2TXQSKF.js:
@awesome.me/webawesome/dist/chunks/chunk.X55YNZ3B.js:
@awesome.me/webawesome/dist/chunks/chunk.LRYJ2M5H.js:
@awesome.me/webawesome/dist/chunks/chunk.KBS6YHTA.js:
@awesome.me/webawesome/dist/chunks/chunk.ZFSRFTCP.js:
@awesome.me/webawesome/dist/chunks/chunk.46TQDRI6.js:
@awesome.me/webawesome/dist/webawesome.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
@lit-labs/router/routes.js:
@lit-labs/router/router.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
lit-html/directives/if-defined.js:
lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/static.js:
lit-html/directive-helpers.js:
lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=app-root.js.map

import{a as l,e as p,h as m,i as g}from"./chunk-GJZMUBY3.js";import{a as c,f as d,i as a,o as h,p as u}from"./chunk-K3YW3SVB.js";var n=class extends h{constructor(){super(),this.loading=!0,this.selectedServer=null,this.formatter=new Intl.DateTimeFormat("en-US",{dateStyle:"long",timeStyle:"medium"}),this.crates=[],this.tags=[],this.selectedCrate=null,this.selectedTags=[],this.truncated=!1,this.items=[],this.selectedItems=[],this.visibleItems=[],this.lowDataMode=JSON.parse(localStorage.getItem("LDM")??!0),this.openSubmission=!1,this.servers=["cherry","spirit","lotus","tulip"],this.currentValue="0",this.activeMenu="exact",this.currentMaxValue="0",this._openModal=this._openModal.bind(this),this._closeModal=this._closeModal.bind(this)}connectedCallback(){super.connectedCallback(),this._fetchAll(),l.addEventListener("open-modal",this._openModal),l.dispatchEvent(new CustomEvent("set-status",{detail:{visible:!1,count:0}}))}disconnectedCallback(){super.disconnectedCallback(),l.removeEventListener("open-modal",this._openModal),l.dispatchEvent(new CustomEvent("set-status",{detail:{visible:!1}}))}_decodeEscapedUnicode(e){return typeof e!="string"?e:e.replace(/\\u([0-9a-fA-F]{4})/g,(s,t)=>String.fromCharCode(parseInt(t,16)))}async _fetchAll(){this.loading=!0,await this._fetchTags(),await this._fetchCrates(),this.loading=!1}async _fetchTags(){let e="/api/taglist";try{let s=await fetch(e,{method:"GET",credentials:"include"});if(!s.ok)return window.alert("An error occurred.");let t=await s.json();this.tags=t}catch{window.alert("A crate fetch error occurred.")}}async _fetchCrates(){let e="/api/cratelist";try{let s=await fetch(e,{method:"GET",credentials:"include"});if(!s.ok)return window.alert("An error occurred.");let t=await s.json();this.crates=t.result}catch{window.alert("A crate fetch error occurred.")}}async _fetchItems(){let e=new URLSearchParams(window.location.search),s=e.get("query");this.selectedCrate=e.get("crate")||!1,this.selectedTags=e.getAll("tags")||[];let t=`/api/search/advanced?query=${s}${this.selectedServer!=null?`&selectedServer=${this.selectedServer}`:""}${this.selectedCrate?`&crate=${this.selectedCrate}`:""}${this.selectedTags?this.selectedTags.map(i=>`&tags=${i}`).join(""):""}`;console.log(t);try{let i=await fetch(t,{method:"GET",credentials:"include"});if(!i.ok)throw new Error("Server fetch issue");let r=await i.json();this.truncated=r.truncated,this.items=r.result,this._setVisible()}catch(i){console.error("Error loading advanced search: "+i)}}_formatStr(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""}_openModal(){this.openSubmission=!0,this.updateComplete.then(()=>{this.shadowRoot.querySelector(this.activeMenu=="range"?"#newMinPrice":"#newprice").focus()})}_closeModal(){this.openSubmission=!1}_formatPrice(e){return Number(e).toLocaleString()}_formatDate(e){let s=new Date(e);return this.formatter.format(s)}_search(){let e=this.shadowRoot.querySelector("#search").value,s=this.shadowRoot.querySelector("#crate").value,t=this.shadowRoot.querySelector("#tags").value?this.shadowRoot.querySelector("#tags").value.map(r=>r.replaceAll("_"," ")):[];if(console.log(t),t){let r=t.map(o=>`&tags=${o}`);t=r.join(""),console.log(r,t)}let i=`/~/grouppricing?query=${e}${s?`&crate=${s}`:""}${t||""}`;this.dispatchEvent(new CustomEvent("nav-requested",{detail:{path:i},bubbles:!0,composed:!0})),this.loading=!0,this._fetchItems().finally(()=>this.loading=!1)}updated(e){e.has("selectedServer")&&this._fetchItems()}_handleLDM(e){this.lowDataMode=e.target.checked,localStorage.setItem("LDM",this.lowDataMode),this.requestUpdate()}_setVisible(){let e=this.items,s=new Set(this.selectedItems.map(t=>t.id));e=e.filter(t=>!s.has(t.id)),this.visibleItems=e}_selectItem(e){let s=this.visibleItems.find(i=>i.id==e),t=this.visibleItems.findIndex(i=>i.id==e);this.selectedItems.push(s),this.visibleItems.splice(t,1),l.dispatchEvent(new CustomEvent("set-status",{detail:{visible:!0,count:this.selectedItems.length}})),this.requestUpdate()}_deselectItem(e){let s=this.selectedItems.find(i=>i.id==e),t=this.selectedItems.findIndex(i=>i.id==e);this.selectedItems.splice(t,1),this._setVisible(),l.dispatchEvent(new CustomEvent("set-status",{detail:{visible:!0,count:this.selectedItems.length}})),this.requestUpdate()}_sanitizeHTML(e){return this._decodeEscapedUnicode(g.sanitize(e,{ALLOWED_TAGS:["div","span","br"],ALLOWED_ATTR:["class","style"]}))}_handleInput(e){this.currentValue=e.target.value}_handleAltInput(e){this.currentMaxValue=e.target.value}_getReadValue(e){let s=e?this.currentMaxValue:this.currentValue;if(!s)return 0;let t=s;if(isNaN(t)){if(isNaN(t.slice(0,-1))||!["k","m"].includes(t.at(-1).toLowerCase()))return"-";{let i=Number(t.slice(0,-1));return t.at(-1).toLowerCase()=="k"?i*1e3:t.at(-1).toLowerCase()=="m"?i*1e6:"-"}}else return t>0?t:0}_handleKeydown(e){let s=this.shadowRoot.querySelector("#newprice"),t=s.value;e.key=="Enter"?(e.preventDefault(),this._uploadRecom()):e.key=="Escape"?this.openSubmission=!1:e.key=="ArrowRight"&&s.selectionStart===s.selectionEnd&&s.selectionStart===t.length&&this._handleTabChange(e,"range")}_handleAltKeydown(e,s){let t=s?this.shadowRoot.querySelector("#newMaxPrice"):this.shadowRoot.querySelector("#newMinPrice"),i=t.value;e.key=="Enter"||e.key=="ArrowRight"&&!s&&t.selectionStart===t.selectionEnd&&t.selectionStart===i.length?(e.preventDefault(),s?this._uploadRecom(!0):this.shadowRoot.querySelector("#newMaxPrice").focus()):e.key=="Escape"?this.openSubmission=!1:e.key=="ArrowLeft"&&s&&t.selectionStart===t.selectionEnd&&t.selectionStart==0?(e.preventDefault(),this.shadowRoot.querySelector("#newMinPrice").focus()):e.key=="ArrowLeft"&&t.selectionStart===t.selectionEnd&&t.selectionStart==0&&this._handleTabChange(e,"exact")}_redFlash(e){let s=e?this.shadowRoot.querySelector("#minPriceDisplay"):this.shadowRoot.querySelector("#priceDisplay");clearTimeout(this.flashTimeout),s.classList.add("red"),this.flashTimeout=setTimeout(()=>{s.classList.remove("red")},400)}_maxRedFlash(){let e=this.shadowRoot.querySelector("#maxPriceDisplay");clearTimeout(this.maxFlashTimeout),e.classList.add("red"),this.maxFlashTimeout=setTimeout(()=>{e.classList.remove("red")},400)}_validatePrice(e){return!(!e||isNaN(e)||e<=0||e>5e7||Math.round(e)!=e)}async _uploadRecom(e){this.loading=!0;let s=this._getReadValue(),t=null;if(!this._validatePrice(s)){this._redFlash(!!e),this.loading=!1;return}let i={item_id:[...new Set(this.selectedItems.map(r=>r.id))],server_id:this.selectedServer,price:s,is_range:!!e};if(e){if(t=this._getReadValue(!0),!this._validatePrice(t)){this._maxRedFlash(),this.loading=!1;return}i.max_price=t}try{let r=await fetch("/api/group-recommend",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i),credentials:"include"});if(!r.ok)return console.log(r);let o=await r.json();o.success?(window.alert("Recommendation(s) submitted! Awaiting approval."),this.openSubmission=!1):(window.alert("An unknown error occurred."),console.log(o.message))}catch(r){window.alert("An error occurred."),console.error(r)}finally{this.loading=!1}}_handleTabChange(e,s){e.preventDefault(),this.activeMenu=s,this.updateComplete.then(()=>this.shadowRoot.querySelector(this.activeMenu=="range"?"#newMinPrice":"#newprice").focus())}render(){return a`
    <div ?hidden=${!this.openSubmission} class="modal-overlay" @click=${this._closeModal}>
      <div class="modal-content center" @click=${e=>e.stopPropagation()}>
      <wa-button pill size="xs" class="leftbutton" @click=${e=>this.openSubmission=!1} ?disabled=${this.loading} variant="brand"><wa-icon name="times"></wa-icon></wa-button>
      <span class="bigText bigSubText">Recommend New Price</span>
      <br><sub><b>Price limit: $50,000,000</b></sub>
      <div class="outerbox">
      <wa-button-group class="self-center" orientation="horizontal">
      <wa-button variant="brand" value="exact" size="s" @click=${e=>this._handleTabChange(e,"exact")} ?disabled=${this.activeMenu==="exact"}>Exact Price</wa-button>
      <wa-button variant="brand" value="range" size="s" @click=${e=>this._handleTabChange(e,"range")} ?disabled=${this.activeMenu==="range"}>Price Range</wa-button>
      </wa-button-group></div>
      ${this.activeMenu=="exact"?a`
      <span class="bigText" id="priceDisplay">$${this._formatPrice(this._getReadValue())||"-"}</span>
      <br><input id="newprice" @input=${this._handleInput} @keydown=${e=>this._handleKeydown(e)} ?disabled=${this.loading}><br><br>
      <wa-button pill variant="brand" @click=${()=>this._uploadRecom(!1)} ?disabled=${this.loading}>Submit</wa-button>
      `:a`
      <div class="rangeDisplay">
      <div class="leftItem">
      <span class="bold">Range Minimum</span>
      <br><span class="bigSubText" id="minPriceDisplay">$${this._formatPrice(this._getReadValue())}</span>
      <br><input id="newMinPrice" @input=${this._handleInput} @keydown=${e=>this._handleAltKeydown(e,!1)} ?disabled=${this.loading}><br><br>
      </div>
      <div class="divider"></div>
      <div class="rightItem">
      <span class="bold">Range Maximum</span>
      <br><span class="bigSubText" id="maxPriceDisplay">$${this._formatPrice(this._getReadValue(!0))}</span>
      <br><input id="newMaxPrice" @input=${this._handleAltInput} @keydown=${e=>this._handleAltKeydown(e,!0)} ?disabled=${this.loading}><br><br>
      </div>
      </div><br>
      <wa-button pill variant="brand" @click=${()=>this._uploadRecom(!0)} ?disabled=${this.loading} ?loading=${this.loading}>Submit</wa-button>
      `}
      </div>
    </div>

      <div class="center">
        <h1>Selected Items</h1>
        ${this.selectedItems&&this.selectedItems.length>0?a`
          <div class="center">
            <strong>Click items to deselect them.</strong>
            <div class="grid">
              ${this.selectedItems.map(e=>a`
                <div class="card" @click="${()=>this._deselectItem(e.id)}">
                  <h3>${this._decodeEscapedUnicode(e.item_name)}</h3>
                  <div class="tags">
                    ${e.tags?e.tags.map(s=>a`
                      <span class="tag">${this._decodeEscapedUnicode(s)}</span>
                    `):""}
                  </div>
                </div>
              `)}
            </div>
          </div>
        `:a`Selected items will appear here!`}
      </div>

      <div class="center outerbox">
        <h1>Find Items</h1>
        <div class="ASparams">
          ${this.truncated&&!this.loading?a`<wa-callout variant="warning"><wa-icon slot="icon" name="triangle-exclamation"></wa-icon><strong>Search Results Limited</strong><br>This search was limited to 150 items. Don't worry, this is a temporary fix!</wa-callout><br>`:""}
          <wa-input label="Search Term" id="search" placeholder="Search..." autocomplete="off" ?disabled=${this.loading} value=${new URLSearchParams(window.location.search).get("query")}></wa-input>
          <br>
          <wa-select label="Crate" id="crate" value=${this.selectedCrate||""} ?disabled=${this.loading}>
            <wa-option value="" ?selected=${!this.selectedCrate}>All</wa-option>
            ${this.crates.map(e=>a`<wa-option value=${e.id} ?selected=${this.selectedCrate==e.id}>${e.CrateName}</wa-option>`)}
          </wa-select>
          <br>
          <wa-select label="Tags" id="tags" value=${this.selectedTags.join(" ")} placeholder="Select tags..." multiple with-clear ?disabled=${this.loading}>
            ${this.tags.map(e=>a`<wa-option value=${e.replaceAll(" ","_")} ?selected=${this.selectedTags.includes(e)}>${e}</wa-option>`)}
          </wa-select>
          <br>
          <wa-button @click=${this._search} variant="brand" ?disabled=${this.loading} ?loading=${this.loading}>Search</wa-button>
        </div>
      </div>

      ${this.loading?"":a`
        <div class="center">
          <strong>Click items to select them. Already selected items are hidden.</strong>
        </div>
      `}

      ${this.loading?a`<div class="grid"><wa-spinner></wa-spinner></div>`:a`
        ${this.visibleItems&&this.visibleItems.length>0?a`
          <div class="center">
            <div class="forceGap">
              <wa-switch ?checked=${this.lowDataMode} id="LDMtoggle" @change=${this._handleLDM}>Low Data Mode</wa-switch>
            </div>
            <div class="grid">
              ${this.visibleItems.map(e=>a`
                <div class="card" @click="${()=>this._selectItem(e.id)}">
                  <h3>${this._decodeEscapedUnicode(e.item_name)}</h3>
                  ${this.selectedServer!==void 0&&this.selectedServer!==null&&e.price&&e.recom_timestamp&&e.username?a`
                    <div class="center">
                      <span class="priceAdd">${this._formatStr(this.servers[this.selectedServer])} Price${e.is_range?" Range":""}: </span><br>
                      <span class="price">$${this._formatPrice(e.price)}${e.is_range?` to $${this._formatPrice(e.max_price)}`:""}</span><br>
                      <sub>-${e.username}${m(e.author_id)}<br>${this._formatDate(e.recom_timestamp)}</sub>
                    </div>
                  `:a`<sub>No price available :(</sub>`}
                  
                  <div class="tags">
                    ${e.tags?e.tags.map(s=>a`
                      <span class="tag">${this._decodeEscapedUnicode(s)}</span>
                    `):""}
                  </div>
                  
                  ${this.lowDataMode&&!e.tags?.includes("spawner")&&!e.tags?.includes("currency")?a`
                    <div class="give-preview-text-outer">
                      <div class="give-preview-text w-100">
                        <div class="give-preview-text-inner text-start" style="text-align: left;">
                          ${p(this._sanitizeHTML(e.item_html))}
                        </div>
                      </div>
                    </div>  
                  `:a`
                    <img
                      src=${e.tags?.includes("spawner")?"https://minecraft.wiki/images/Monster_Spawner_JE4.png":e.tags?.includes("currency")?`/src/images/${e.img_src}`:`https://items.blossomcraft.org/static/images/BlossomCraft_Descriptions/${e.id}.png`}
                      alt="${this._decodeEscapedUnicode(e.item_name)}"
                    />
                  `}
                </div>
              `)}
            </div>
          </div>
        `:a`<div class="grid">Search results will appear here!</div>`}
      `}
    `}};c(n,"properties",{items:{type:Array},loading:{type:Boolean},selectedServer:{type:Number},crates:{type:Array},selectedItems:{type:Array},visibleItems:{type:Array},lowDataMode:{type:Boolean},openSubmission:{type:Boolean},currentValue:{type:String},activeMenu:{type:String},currentMaxValue:{type:String}}),c(n,"styles",[u,d`
    .ASparams {
    position: relative;
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
  `]);customElements.define("group-price-view",n);export{n as ASView};
//# sourceMappingURL=group-pricing-G54CNFPJ.js.map

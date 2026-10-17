import{a as r,f as d,i,o as l,p as h}from"./chunk-K3YW3SVB.js";var o=class extends l{constructor(){super();r(this,"_handleKeydown",t=>{t.key=="Escape"&&this.openModal&&(this.openModal=!1)});this.loading=!0,this.toShow="all",this.data=null,this.formatter=new Intl.DateTimeFormat("en-US",{dateStyle:"long",timeStyle:"medium"}),this.disabledList=[],this.page=1,this.maxPages=1,this.user={},this.showAdmin=!1,this.openModal=!1,this.viewData=[],this.modal_loading=!1}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this._handleKeydown)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this._handleKeydown)}updated(t){(t.has("page")||t.has("toShow"))&&this._fetchAll(),t.has("user")&&this.user?.role==="admin"&&(this.showAdmin=!0,this._fetchAll())}async _fetchAll(){this.loading=!0,await this._getPageCount(),await this._getRecoms(),this.loading=!1}async _getPageCount(){let t=`/api/pagecount/groups?do_manage=${this.showAdmin}`;try{let a=await fetch(t,{method:"GET",credentials:"include"});if(!a.ok)return console.log("ERROR",a);let s=await a.json();this.maxPages=s.count}catch(a){window.alert("An error occurred, reload to try again."),console.error(a)}}async _getRecoms(){let t=`/api/groups/${this.page}?do_manage=${this.showAdmin}`;try{let a=await fetch(t,{method:"GET",credentials:"include"});if(!a.ok)return console.log("ERROR",a);let s=await a.json();this.data=s.result}catch(a){window.alert("An error occurred, reload to try again."),console.error(a)}}async _getRecomsWrapper(t){this.loading=!0,await this._getRecoms(t),this.loading=!1}async _updateStatus(t,a){if(console.log(t,a),!["accepted","denied"].includes(a))return window.alert("Invalid arguments");let s={submission_id:t,type:a};this.requestUpdate();try{if(!(await fetch("/api/updatestatus/groups",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})).ok)return window.alert("An error occurred.");let n=this.data.findIndex(c=>c.group_id==t);if(n==-1)return console.log("error?");this.data[n].status=a}catch(e){window.alert("An error occurred. Type: 2"),console.error(e)}finally{this.requestUpdate()}}async _viewItems(t,a){if(this.viewData={},this.modal_loading=!0,this.openModal=!0,t.preventDefault(),!a||isNaN(Number(a)))return window.alert("an error occurred.");try{let s=await fetch(`/api/viewgroup/${a}`,{method:"GET",credentials:"include"});if(!s.ok)return window.alert("An error occurred.");let e=await s.json();this.viewData=e.result,console.log(this.viewData)}catch(s){this.openModal=!1,window.alert("An error occurred."),console.error(s)}finally{this.modal_loading=!1,this.requestUpdate()}}_formatDate(t){let a=new Date(t);return this.formatter.format(a)}_formatPrice(t){return Number(t).toLocaleString()}_formatStr(t){return t?t.charAt(0).toUpperCase()+t.slice(1):""}_nextPage(){this.page++}_previousPage(){this.page--}async _customPage(){console.log(this.maxPages);let t=window.prompt("Enter page number 1-"+this.maxPages);t!==null&&(/^\d+$/.test(t.trim())&&t>0&&t<=this.maxPages?this.page=Number(t):window.alert("Invalid input"))}render(){let t=["Cherry","Spirit","Lotus","Tulip"],a=this.page==1,s=this.page==this.maxPages;return i`
    <div ?hidden=${!this.openModal} class="modal-overlay scrollable" @click=${e=>{this.loading||this.modal_loading||(this.openModal=!1)}}>
      <div class="modal-content center" @click=${e=>e.stopPropagation()}>
      <div class="forceLeft noGap"><wa-button pill size="xs" class="leftbutton" @click=${e=>this.openModal=!1} ?disabled=${this.loading||this.modal_loading} variant="brand"><wa-icon name="times"></wa-icon></wa-button></div>
      ${this.loading||this.modal_loading?i`<wa-spinner></wa-spinner>`:i`
        <table>
        <thead>
        <tr>
        <th scope="col">Item</th>
        <th scope="col">Crate</th>
        <th scope="col">Win Chance</th>
        <th scope="col">Rarity</th>
        <tr>
        </thead>
        <tbody>
        ${this.viewData&&this.viewData.length>0?this.viewData.map(e=>i`
            <tr><td>${e.item_name}</td><td>${e.crate_name}</td><td>${e.win_chance}%</td><td>${e.rarity_human}</td></tr>
            `):""}
        </tbody>
        </table>
        `}
      </div>
    </div>

    <div class="dashboard">
    <div class="fullcard">
    <div class="forceLeft noGap">
    ${this.user?.role==="admin"?i`<wa-button variant="brand" pill appearance="filled" @click=${()=>{this.showAdmin=!this.showAdmin,this._fetchAll()}} ?disabled=${this.loading}><wa-icon name="right-left"></wa-icon></wa-button>`:""}
    <wa-button style="margin-left: 20px;" variant="brand" pill appearance="filled" @click=${()=>{this.toShow==="all"?this.toShow="pending":this.toShow="all",this.requestUpdate()}} ?disabled=${this.loading}>Show ${this.toShow==="all"?"Pending Only":"All"}</wa-button>
    </div>
    <h1>${this.showAdmin?"Manage":"My"} Group Prices</h1>
    ${this.maxPages>0?i`<span>Page ${this.loading?i`<wa-spinner></wa-spinner>`:`${this.page}/${this.maxPages}`}</span>
    ${this.maxPages>1?i`<br><wa-button-group size="xxs" orientation="horizontal"><wa-button @click=${this._previousPage} ?disabled=${a||this.loading} variant="brand"><<<</wa-button><wa-button @click=${this._customPage} ?disabled=${this.loading} variant="brand">...</wa-button><wa-button @click=${this._nextPage} ?disabled=${s||this.loading} variant="brand">>>></wa-button></wa-button-group>`:""}`:""}
    ${this.loading?i`<br>Please wait...`:i`
        ${this.data?i`
    <table>
        <thead>
            <tr>
            <th scope="col">Timestamp</th>
            <th scope="col">Server</th>
            <th scope="col">Items</th>
            ${this.showAdmin?i`<th scope="col">User</th>`:""}
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            ${this.showAdmin?i`<th scope="col">Actions</th>`:""}
            </tr>
        </thead>
        <tbody>
        ${this.data.map(e=>this.toShow!=="all"&&e.status!==this.toShow?i``:i`
            <tr><td>${this._formatDate(e.timestamp)}</td><td>${t[e.server_id]}</td><td><wa-button pill size="xs" variant="brand" @click=${n=>this._viewItems(n,e.group_id)}>View ${e.item_id.length} Items</wa-button></td>${this.showAdmin?i`<td>${e.username}</td>`:""}<td>$${this._formatPrice(e.price)}${e.is_range?i` <br>to<br>$${this._formatPrice(e.max_price)}`:""}</td><td>${this._formatStr(e.status)}</td>${this.showAdmin?i`<td><wa-button-group orientation="horizontal"><wa-button @click=${()=>this._updateStatus(e.group_id,"accepted")} ?disabled=${e.status=="accepted"||this.disabledList.includes(e.group_id)} size="xs" variant="brand">Approve</wa-button><wa-button @click=${()=>this._updateStatus(e.group_id,"denied")} ?disabled=${e.status=="denied"||this.disabledList.includes(e.group_id)} size="xs" variant="brand">Deny</wa-button></wa-button-group></td>`:""}</tr>
            `)}
        </tbody>
    </table>
        `:i`<br><br>No groups to show :(`}
`}
    </div>
    </div>
    `}};r(o,"properties",{loading:{type:Boolean},data:{type:Object},disabledList:{type:Array},page:{type:Number},showAdmin:{type:Boolean},user:{type:Object},openModal:{type:Boolean},viewData:{type:Array},modal_loading:{type:Boolean}}),r(o,"styles",[h,d`
  .dashboard {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  }

    table, th, td {
        border: 1px var(--color-text) solid;
        padding: 10px;
        text-align: center;
        transition: border ease 0s;
    }
    
    table {
        border-collapse: collapse;
        margin: 0 auto;
        margin-top: 20px;
        width: 100%;
        color: var(--color-text);
    }
  `]);customElements.define("manage-gp",o);export{o as GroupPriceView};
//# sourceMappingURL=gp-view-74R2QQXG.js.map

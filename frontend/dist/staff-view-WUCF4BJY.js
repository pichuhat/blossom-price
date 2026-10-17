import{a as d}from"./chunk-PC5URATX.js";import{a as r,f as h,i as o,o as l,p as c}from"./chunk-K3YW3SVB.js";var n=class extends l{constructor(){super(),this.loading=!0,this.toShow="all",this.data=null,this.formatter=new Intl.DateTimeFormat("en-US",{dateStyle:"long",timeStyle:"medium"}),this.disabledList=[],this.page=1,this.maxPages=1}updated(t){(t.has("page")||t.has("toShow"))&&this._fetchAll()}async _fetchAll(){this.loading=!0;let t=this.toShow==="all"?"":this.toShow;try{await Promise.all([this._getPageCount(t),this._getRecoms(t)])}catch(a){console.error(a),d("<strong>An error occurred.</strong><br>Something went wrong while fetching this data.",{variant:"danger",icon:"triangle-exclamation",allowHtml:!0})}finally{this.loading=!1}}async _getPageCount(t){let a=`/api/myrecoms/pagecount${t?`?type=${t}`:""}`;try{let e=await fetch(a,{method:"GET",credentials:"include"});if(!e.ok)throw new Error(`(_getPageCount) Bad HTTP Status: ${e.status}`);let i=await e.json();this.maxPages=i.count}catch(e){throw console.error(e),e}}async _getRecoms(t){if(console.log(t),t&&!["accepted","pending","denied"].includes(t))return window.alert("An error occured. ID: GR_BAD_TYPE");let a=`/api/myrecoms/listrecoms/${this.page}${t?`?type=${t}`:""}`;try{let e=await fetch(a,{method:"GET",credentials:"include"});if(!e.ok)throw new Error(`(_getRecoms) Bad HTTP Status: ${e.status}`);let i=await e.json();this.data=i.history}catch(e){throw console.error(e),e}}async _getRecomsWrapper(t){this.loading=!0,await this._getRecoms(t),this.loading=!1}_formatDate(t){let a=new Date(t);return this.formatter.format(a)}_formatPrice(t){return Number(t).toLocaleString()}_formatStr(t){return t?t.charAt(0).toUpperCase()+t.slice(1):""}_showAll(){this.toShow="all",this.page=1,this._fetchAll()}_showAccepted(){this.toShow="accepted",this.page=1,this._fetchAll()}_showPending(){this.toShow="pending",this.page=1,this._fetchAll()}_showDenied(){this.toShow="denied",this.page=1,this._fetchAll()}async _nextPage(){this.page++}async _previousPage(){this.page--}async _customPage(){console.log(this.maxPages);let t=window.prompt("Enter page number 1-"+this.maxPages);t!==null&&(/^\d+$/.test(t.trim())&&t>0&&t<=this.maxPages?this.page=Number(t):window.alert("Invalid input"))}render(){let t=["Cherry","Spirit","Lotus","Tulip"],a=this.page==1,e=this.page==this.maxPages||this.maxPages==0,i=this.maxPages<=1;return o`
    <div class="dashboard">
    <div class="fullcard" style="position: relative;">
    <h1>Manage Recommendations</h1>
    Show: <wa-button-group orientation="horizontal"><wa-button @click=${this._showAll} ?disabled=${this.loading||this.toShow=="all"} variant="brand" size="xs">All</wa-button><wa-button @click=${this._showAccepted} ?disabled=${this.loading||this.toShow=="accepted"} variant="brand" size="xs">Accepted</wa-button><wa-button @click=${this._showPending} ?disabled=${this.loading||this.toShow=="pending"} variant="brand" size="xs">Pending</wa-button><wa-button @click=${this._showDenied} ?disabled=${this.loading||this.toShow=="denied"} variant="brand" size="xs">Denied</wa-button></wa-button-group>
    <br><span>${this.loading?o`Page <wa-spinner></wa-spinner>`:this.maxPages>0?`Page ${this.page}/${this.maxPages}`:o`No Pages :(`}</span>
    <br><wa-button-group size="xxs" orientation="horizontal"><wa-button @click=${this._previousPage} ?disabled=${a||this.loading} variant="brand"><<<</wa-button><wa-button @click=${this._customPage} ?disabled=${this.loading||i} variant="brand">...</wa-button><wa-button @click=${this._nextPage} ?disabled=${e||this.loading} variant="brand">>>></wa-button></wa-button-group>
    
    ${this.loading||this.data&&(this.toShow=="all"||this.data.some(s=>s.status==this.toShow))?o`
<table>
    <thead>
        <tr>
            <th scope="col">Timestamp</th>
            <th scope="col">Server</th>
            <th scope="col">Item</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
        </tr>
    </thead>
    <tbody>
    ${this.loading?o`
        <td><wa-skeleton class="chars-15"></wa-skeleton></td>
        <td><wa-skeleton class="chars-5"></wa-skeleton></td>
        <td><wa-skeleton class="chars-20"></wa-skeleton></td>
        <td><wa-skeleton class="chars-10"></wa-skeleton></td>
        <td><wa-skeleton class="chars-10"></wa-skeleton></td>
        `:this.data.map(s=>o`<tr>
            <td>${this._formatDate(s.recom_timestamp)}</td>
            <td>${t[s.server]}</td>
            <td>${s.item_name}</td>
            <td>$${this._formatPrice(s.price)}${s.is_range?o` <br>to<br>$${this._formatPrice(s.max_price)}`:""}</td>
            <td>${this._formatStr(s.status)}</td>
            </tr>`)}
    </tbody>
</table>`:o`<br><br>No recommendations here :(`}
    </div>
    </div>
    `}};r(n,"properties",{loading:{type:Boolean},data:{type:Object},disabledList:{type:Array},page:{type:Number}}),r(n,"styles",[c,h`

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
  `]);customElements.define("my-recoms",n);export{n as StaffView};
//# sourceMappingURL=staff-view-WUCF4BJY.js.map

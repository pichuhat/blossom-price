var bt=Object.defineProperty;var Y=r=>{throw TypeError(r)};var _t=(r,t,e)=>t in r?bt(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var Tt=(r,t,e)=>_t(r,typeof t!="symbol"?t+"":t,e),I=(r,t,e)=>t.has(r)||Y("Cannot "+e);var Ot=(r,t,e)=>(I(r,t,"read from private field"),e?e.call(r):t.get(r)),Mt=(r,t,e)=>t.has(r)?Y("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(r):t.set(r,e),Ht=(r,t,e,o)=>(I(r,t,"write to private field"),o?o.call(r,e):t.set(r,e),e),Nt=(r,t,e)=>(I(r,t,"access private method"),e);var N=globalThis,R=N.ShadowRoot&&(N.ShadyCSS===void 0||N.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,q=Symbol(),tt=new WeakMap,E=class{constructor(t,e,o){if(this._$cssResult$=!0,o!==q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(R&&t===void 0){let o=e!==void 0&&e.length===1;o&&(t=tt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&tt.set(e,t))}return t}toString(){return this.cssText}},et=r=>new E(typeof r=="string"?r:r+"",void 0,q),V=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((o,s,i)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[i+1],r[0]);return new E(e,r,q)},ot=(r,t)=>{if(R)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let o=document.createElement("style"),s=N.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=e.cssText,r.appendChild(o)}},W=R?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let o of t.cssRules)e+=o.cssText;return et(e)})(r):r;var{is:At,defineProperty:xt,getOwnPropertyDescriptor:vt,getOwnPropertyNames:wt,getOwnPropertySymbols:yt,getPrototypeOf:St}=Object,$=globalThis,rt=$.trustedTypes,Et=rt?rt.emptyScript:"",Ct=$.reactiveElementPolyfillSupport,C=(r,t)=>r,K={toAttribute(r,t){switch(t){case Boolean:r=r?Et:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},it=(r,t)=>!At(r,t),st={attribute:!0,type:String,converter:K,reflect:!1,useDefault:!1,hasChanged:it};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);var f=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=st){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let o=Symbol(),s=this.getPropertyDescriptor(t,o,e);s!==void 0&&xt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,o){let{get:s,set:i}=vt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){let c=s?.call(this);i?.call(this,n),this.requestUpdate(t,c,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??st}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;let t=St(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){let e=this.properties,o=[...wt(e),...yt(e)];for(let s of o)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[o,s]of e)this.elementProperties.set(o,s)}this._$Eh=new Map;for(let[e,o]of this.elementProperties){let s=this._$Eu(e,o);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let o=new Set(t.flat(1/0).reverse());for(let s of o)e.unshift(W(s))}else t!==void 0&&e.push(W(t));return e}static _$Eu(t,e){let o=e.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let o of e.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ot(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,o){this._$AK(t,o)}_$ET(t,e){let o=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,o);if(s!==void 0&&o.reflect===!0){let i=(o.converter?.toAttribute!==void 0?o.converter:K).toAttribute(e,o.type);this._$Em=t,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(t,e){let o=this.constructor,s=o._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let i=o.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:K;this._$Em=s;let c=n.fromAttribute(e,i.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(t,e,o,s=!1,i){if(t!==void 0){let n=this.constructor;if(s===!1&&(i=this[t]),o??(o=n.getPropertyOptions(t)),!((o.hasChanged??it)(i,e)||o.useDefault&&o.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,o))))return;this.C(t,e,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:o,reflect:s,wrapped:i},n){o&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),i!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||o||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[s,i]of o){let{wrapped:n}=i,c=this[s];n!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,i,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(o=>o.hostUpdate?.()),this.update(e)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[C("elementProperties")]=new Map,f[C("finalized")]=new Map,Ct?.({ReactiveElement:f}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.2");var P=globalThis,nt=r=>r,z=P.trustedTypes,at=z?z.createPolicy("lit-html",{createHTML:r=>r}):void 0,J="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,Z="?"+g,kt=`<${Z}>`,A=document,U=()=>A.createComment(""),T=r=>r===null||typeof r!="object"&&typeof r!="function",Q=Array.isArray,ut=r=>Q(r)||typeof r?.[Symbol.iterator]=="function",G=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,lt=/-->/g,ct=/>/g,b=RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),dt=/'/g,ht=/"/g,ft=/^(?:script|style|textarea|title)$/i,X=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),Dt=X(1),Bt=X(2),It=X(3),x=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),pt=new WeakMap,_=A.createTreeWalker(A,129);function gt(r,t){if(!Q(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return at!==void 0?at.createHTML(t):t}var mt=(r,t)=>{let e=r.length-1,o=[],s,i=t===2?"<svg>":t===3?"<math>":"",n=k;for(let c=0;c<e;c++){let a=r[c],d,p,l=-1,u=0;for(;u<a.length&&(n.lastIndex=u,p=n.exec(a),p!==null);)u=n.lastIndex,n===k?p[1]==="!--"?n=lt:p[1]!==void 0?n=ct:p[2]!==void 0?(ft.test(p[2])&&(s=RegExp("</"+p[2],"g")),n=b):p[3]!==void 0&&(n=b):n===b?p[0]===">"?(n=s??k,l=-1):p[1]===void 0?l=-2:(l=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?b:p[3]==='"'?ht:dt):n===ht||n===dt?n=b:n===lt||n===ct?n=k:(n=b,s=void 0);let m=n===b&&r[c+1].startsWith("/>")?" ":"";i+=n===k?a+kt:l>=0?(o.push(d),a.slice(0,l)+J+a.slice(l)+g+m):a+g+(l===-2?c:m)}return[gt(r,i+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),o]},O=class r{constructor({strings:t,_$litType$:e},o){let s;this.parts=[];let i=0,n=0,c=t.length-1,a=this.parts,[d,p]=mt(t,e);if(this.el=r.createElement(d,o),_.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=_.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let l of s.getAttributeNames())if(l.endsWith(J)){let u=p[n++],m=s.getAttribute(l).split(g),H=/([.?@])?(.*)/.exec(u);a.push({type:1,index:i,name:H[2],strings:m,ctor:H[1]==="."?L:H[1]==="?"?j:H[1]==="@"?D:w}),s.removeAttribute(l)}else l.startsWith(g)&&(a.push({type:6,index:i}),s.removeAttribute(l));if(ft.test(s.tagName)){let l=s.textContent.split(g),u=l.length-1;if(u>0){s.textContent=z?z.emptyScript:"";for(let m=0;m<u;m++)s.append(l[m],U()),_.nextNode(),a.push({type:2,index:++i});s.append(l[u],U())}}}else if(s.nodeType===8)if(s.data===Z)a.push({type:2,index:i});else{let l=-1;for(;(l=s.data.indexOf(g,l+1))!==-1;)a.push({type:7,index:i}),l+=g.length-1}i++}}static createElement(t,e){let o=A.createElement("template");return o.innerHTML=t,o}};function v(r,t,e=r,o){if(t===x)return t;let s=o!==void 0?e._$Co?.[o]:e._$Cl,i=T(t)?void 0:t._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(r),s._$AT(r,e,o)),o!==void 0?(e._$Co??(e._$Co=[]))[o]=s:e._$Cl=s),s!==void 0&&(t=v(r,s._$AS(r,t.values),s,o)),t}var F=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:o}=this._$AD,s=(t?.creationScope??A).importNode(e,!0);_.currentNode=s;let i=_.nextNode(),n=0,c=0,a=o[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new y(i,i.nextSibling,this,t):a.type===1?d=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(d=new B(i,this,t)),this._$AV.push(d),a=o[++c]}n!==a?.index&&(i=_.nextNode(),n++)}return _.currentNode=A,s}p(t){let e=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,e),e+=o.strings.length-2):o._$AI(t[e])),e++}},y=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,o,s){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=v(this,t,e),T(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==x&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ut(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:o}=t,s=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=O.createElement(gt(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(e);else{let i=new F(s,this),n=i.u(this.options);i.p(e),this.T(n),this._$AH=i}}_$AC(t){let e=pt.get(t.strings);return e===void 0&&pt.set(t.strings,e=new O(t)),e}k(t){Q(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,o,s=0;for(let i of t)s===e.length?e.push(o=new r(this.O(U()),this.O(U()),this,this.options)):o=e[s],o._$AI(i),s++;s<e.length&&(this._$AR(o&&o._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let o=nt(t).nextSibling;nt(t).remove(),t=o}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},w=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,o,s,i){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=i,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=h}_$AI(t,e=this,o,s){let i=this.strings,n=!1;if(i===void 0)t=v(this,t,e,0),n=!T(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else{let c=t,a,d;for(t=i[0],a=0;a<i.length-1;a++)d=v(this,c[o+a],e,a),d===x&&(d=this._$AH[a]),n||(n=!T(d)||d!==this._$AH[a]),d===h?t=h:t!==h&&(t+=(d??"")+i[a+1]),this._$AH[a]=d}n&&!s&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},L=class extends w{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}},j=class extends w{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}},D=class extends w{constructor(t,e,o,s,i){super(t,e,o,s,i),this.type=5}_$AI(t,e=this){if((t=v(this,t,e,0)??h)===x)return;let o=this._$AH,s=t===h&&o!==h||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,i=t!==h&&(o===h||s);s&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},B=class{constructor(t,e,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){v(this,t)}},qt={M:J,P:g,A:Z,C:1,L:mt,R:F,D:ut,V:v,I:y,H:w,N:j,U:D,B:L,F:B},Pt=P.litHtmlPolyfillSupport;Pt?.(O,y),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.3");var $t=(r,t,e)=>{let o=e?.renderBefore??t,s=o._$litPart$;if(s===void 0){let i=e?.renderBefore??null;o._$litPart$=s=new y(t.insertBefore(U(),i),i,void 0,e??{})}return s._$AI(r),s};var M=globalThis,S=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=$t(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return x}};S._$litElement$=!0,S.finalized=!0,M.litElementHydrateSupport?.({LitElement:S});var Ut=M.litElementPolyfillSupport;Ut?.({LitElement:S});(M.litElementVersions??(M.litElementVersions=[])).push("4.2.2");var se=V`
:host, *, *::before, *::after {
  transition: background-color 0.5s ease; border-color 0.5s ease; box-shadow: 0.5s ease;
}

.self-center {
margin-left: auto;
margin-right: auto;
}

.outerbox {
  width: 100%;
}

.innerbox {
width: 50%;
margin: 0 auto;
}

.center {
text-align: center;
}

.ASparams {
  border-radius: 5px;
  width: 50%;
  padding: 10px;
  margin: 20px auto;
  background-color: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  box-shadow: 0 0 0 1px var(--color-border), 0 4px 16px var(--color-glow);
  color: var(--color-text)
}

.forceLeft {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  text-align: left;
  margin-left: 20px;
}

.forceLeft.noGap {
margin-left: 0;
}

:host {
  --wa-color-brand-fill-loud: #bc4bc2;   /* solid buttons/backgrounds */
  --wa-color-brand-fill-normal: #f3d7f7; /* lighter fill */
  --wa-color-brand-fill-quiet: #fcf6fd;  /* subtle fill */
  --wa-color-brand-border-loud: #97319a;
  --wa-color-brand-border-normal: #df8ce6;
  --wa-color-brand-border-quiet: #f3d7f7;
  --wa-color-brand-on-loud: white;       /* text on solid brand bg */
  --wa-color-brand-on-normal: #97319a;
  --wa-color-brand-on-quiet: #7d2a7e;
  --wa-color-focus: #bc4bc2;
}
  
.forceAlign {
display: flex;
align-items: center;
}

.forceAlign wa-icon {
vertical-align: middle;
}
    .navsearch {
    background-color: var(--wa-color-brand-fill-normal);
    border: 3px var(--wa-color-brand-border-loud) solid;
    margin-right: 0;
    padding: 3px;
    border-right: none;
    }
    wa-input wa-icon {
    transition: color 0.2s ease;
    }
    wa-input wa-icon:hover {
    color: #d3d3d3;
    }
    .forceGap {
    margin-top: 20px;
    }
    .biggerText {
    font-size: 300%;
    font-weight: bold;
    }
    .bigText {
    font-size: 200%;
    font-weight: bold;
    }
    .bigSubText {
    font-size: 150%;
    }
    .alt {
    font-style: italic;
    }
    .bold {
    font-weight: bold;
    }
    .fake-h3 {
    font-size: 1.17em;
    font-weight: bold;
    }
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: fit-content;
      max-width: 100%;
      background-color: var(--color-surface-raised);
      border: 1px solid var(--color-border-alt);
      border-radius: 8px;
      padding: 16px;
      color: var(--color-text);
      box-sizing: border-box;
      overflow: hidden;
      box-shadow: 0 0 0 1px var(--color-border-alt), 0 4px 16px var(--color-glow);
      transition: transform 0.3s ease;
    }

    .card:hover {
    transform: scale(1.02);
    }

    .card img, .card .give-preview-text-outer {
      display: block;
      width: auto;
      max-width: 100%;
      height: auto;
      border-radius: 6px;
      margin-top: 12px;
    }
    .dashboard {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  } 
    .fullcard {
    background-color: var(--color-surface-raised);
    border: 2px solid var(--color-border);
    border-radius: 8px;
    padding: 20px;
    color: var(--color-text);
    text-align: center;
    box-shadow: 0 0 0 1px var(--color-border-alt), 0 4px 16px var(--color-glow);
    min-width: 50%;
    }
    .fullcard.lock-width {
    width: 50%;
    }
    .priceAdd {
        font-size: 100%;
    }
    .price {
        color: var(--color-price);
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
    .tags.internal {
    margin-top: 0px;
    }
    .tag {
      background-color: #bc4bc2;
      color: white;
      font-size: 80%;
      padding: 2px 8px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
      justify-content: center;
    }
      .grid-single-row {
  flex-wrap: nowrap;
  overflow: hidden;
}

.give-preview-text-outer {
    overflow: auto;
    max-width: 100%;
}
.give-preview-text {
    padding: 2px;
    display: inline-block;
    background-color: rgba(17,2,16,.8)
}
.give-preview-text-inner {
    font-family: 'Mozart NBP';
    font-smooth: never;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: none;
    font-size: 24px;
    line-height: .8;
    padding: 4px 5px;
    border: 2px solid #2c0863;
    border-radius: 2px;
}
.mc-bold {
    font-weight: bold;
}

.mc-italic {
    font-style: italic;
}
.mc-underlined {
    text-decoration: underline;
}

/* &0 */
.mc-black {
    color: #000000;
}
/* &1 */
.mc-dark-blue {
    color: #0000AA;
}
/* &2 */
.mc-dark-green {
    color: #00AA00;
}
/* &3 */
.mc-dark-aqua {
    color: #00AAAA;
}
/* &4 */
.mc-dark-red {
    color: #AA0000 ;
}
/* &5 */
.mc-dark-purple {
    color: #AA00AA ;
}
/* &6 */
.mc-gold {
    color: #FFAA00;
}
/* &7 */
.mc-gray {
    color: #AAAAAA ;
}
/* &8 */
.mc-dark-gray {
    color: #555555 ;
}
/* &9 */
.mc-blue {
    color: #5555FF;
}
/* &a */
.mc-green {
    color: #55FF55 ;
}
/* &b */
.mc-aqua {
    color: #55FFFF;
}
/* &c */
.mc-red {
    color: #FF5555;
}
/* &d */
.mc-light-purple {
    color: #FF55FF;
}
/* &e */
.mc-yellow {
    color: #FFFF55;
}
/* &f */
.mc-white {
    color: #FFFFFF;
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

.modal-overlay {
  position: fixed;
  display: block;
  z-index: 1001;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-overlay.scrollable {
  overflow-y: auto; 
}

.modal-overlay[hidden] {
  display: none;
}

.modal-content {
  background-color: var(--color-surface-raised);
  margin: 5% auto;
  padding: 20px;
  border: 2px solid var(--color-border);
  width: 80%;
  max-width: 500px;
  border-radius: 8px;
  position: relative;
}

.big-spinner wa-spinner {
font-size: 3rem;
--track-width: 5px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

td.dropdown {
  display: table-cell;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--color-dropdown-bg);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1001;
  top: 100%;
  right: 0;
  left: auto;
}

td.dropdown .dropdown-content {
pointer-events: none;
}

td.dropdown .dropdown-content.flip-up {
    top: auto;
    bottom: 100%;
}

.dropdown-content a {
  display: inline-block;
  color: white;
  padding: 8px 0;
  text-decoration: none;
  text-align: center;
  width: 100%;
  transition: background-color 0s ease;
}

.dropdown-content a:hover {
  background-color: var(--color-dropdown-hover);
}

.dropdown:hover .dropdown-content {
  display: block; 
}

.itemTable:hover td, .clickTable:hover td {
    background-color: rgba(0,0,0,.2)
}
.forcecolor {
    background-color: #bc2bc4 !important;
}

.bigIcon {
    font-size: 500%;
}

.forceTopRight {
  position: absolute;
  top: 10px;
  right: 10px;
}

.forceTopLeft {
  position: absolute;
  top: 10px;
  left: 10px;
}

wa-skeleton {
max-width: 100%;
}

wa-skeleton.chars-20 {
width: 20ch;
}

wa-skeleton.chars-15 {
width: 15ch;
}

wa-skeleton.chars-10 {
width: 10ch;
}

wa-skeleton.chars-5 {
width: 5ch;
}

wa-tooltip {
text-align: center;
}
`;export{Tt as a,Ot as b,Mt as c,Ht as d,Nt as e,V as f,K as g,it as h,Dt as i,Bt as j,It as k,x as l,h as m,qt as n,S as o,se as p};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=chunk-K3YW3SVB.js.map

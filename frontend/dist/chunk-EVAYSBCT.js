var o=document.querySelector("wa-toast"),a=5e3,n=null,c=null;function s(t,l={}){let e=Date.now();if(String(t)===n&&e-c<a){console.log(`Toast creation DENIED: an exact copy was created less than ${a/1e3} seconds ago.`);return}n=t,c=e,o.placement=localStorage.getItem("toast-placement"),o?.create(t,l)}export{s as a};
//# sourceMappingURL=chunk-EVAYSBCT.js.map

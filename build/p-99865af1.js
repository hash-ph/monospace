import{h as t}from"./p-7647a4a8.js";const e=(()=>{let e=new Map,r={historyType:"browser",location:{pathname:"",query:{},key:""},titleSuffix:"",root:"/",routeViewsUpdated:()=>{}};const o=(t,e)=>{Array.isArray(t)?[...t].forEach((t=>{e[t]=r[t]})):e[t]=Object.assign({},r)},s=(t,r)=>(e.has(t)||(e.set(t,r),o(r,t)),()=>{e.has(t)&&e.delete(t)});return{Provider:({state:t},s)=>(r=t,e.forEach(o),s),Consumer:(e,r)=>((e,r)=>t("context-consumer",{subscribe:e,renderer:r}))(s,r[0]),injectProps:(t,r)=>{const o=t.prototype,n=o.connectedCallback,i=o.disconnectedCallback;o.connectedCallback=function(){if(s(this,r),n)return n.call(this)},o.disconnectedCallback=function(){e.delete(this),i&&i.call(this)}}}})();export{e as A}
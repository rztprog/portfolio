import n from"path";import o from"locate-path";var t={};const r=n;const c=o;t=(n,o={})=>{const t=r.resolve(o.cwd||"");const{root:e}=r.parse(t);const s=[].concat(n);return new Promise(n=>{(function find(o){c(s,{cwd:o}).then(t=>{t?n(r.join(o,t)):o===e?n(null):find(r.dirname(o))})})(t)})};t.sync=(n,o={})=>{let t=r.resolve(o.cwd||"");const{root:e}=r.parse(t);const s=[].concat(n);while(true){const n=c.sync(s,{cwd:t});if(n)return r.join(t,n);if(t===e)return null;t=r.dirname(t)}};var e=t;const s=t.sync;export default e;export{s as sync};


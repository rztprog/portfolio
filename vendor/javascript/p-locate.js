import r from"p-limit";var e={};const n=r;class EndError extends Error{constructor(r){super();this.value=r}}const testElement=(r,e)=>Promise.resolve(r).then(e);const finder=r=>Promise.all(r).then(r=>true===r[1]&&Promise.reject(new EndError(r[0])));e=(r,e,t)=>{t=Object.assign({concurrency:Infinity,preserveOrder:true},t);const o=n(t.concurrency);const s=[...r].map(r=>[r,o(testElement,r,e)]);const c=n(t.preserveOrder?1:Infinity);return Promise.all(s.map(r=>c(finder,r))).then(()=>{}).catch(r=>r instanceof EndError?r.value:Promise.reject(r))};var t=e;export default t;


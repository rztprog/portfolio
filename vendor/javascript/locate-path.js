import o from"path";import r from"path-exists";import t from"p-locate";import c from"process";var s={};var e=c;const n=o;const p=r;const a=t;s=(o,r)=>{r=Object.assign({cwd:e.cwd()},r);return a(o,o=>p(n.resolve(r.cwd,o)),r)};s.sync=(o,r)=>{r=Object.assign({cwd:e.cwd()},r);for(const t of o)if(p.sync(n.resolve(r.cwd,t)))return t};var f=s;const i=s.sync;export default f;export{i as sync};


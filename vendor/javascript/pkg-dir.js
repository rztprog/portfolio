import n from"path";import o from"find-up";var r={};const t=n;const c=o;r=n=>c("package.json",{cwd:n}).then(n=>n?t.dirname(n):null);r.sync=n=>{const o=c.sync("package.json",{cwd:n});return o?t.dirname(o):null};var a=r;const e=r.sync;export default a;export{e as sync};


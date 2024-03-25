import t from"fs";import e from"path";import r from"process";var o={};var n=r;const c=t;const s=e;const i=c.lchown?"lchown":"chown";const l=c.lchownSync?"lchownSync":"chownSync";const h=c.lchown&&!n.version.match(/v1[1-9]+\./)&&!n.version.match(/v10\.[6-9]/);const lchownSync=(t,e,r)=>{try{return c[l](t,e,r)}catch(t){if("ENOENT"!==t.code)throw t}};const chownSync=(t,e,r)=>{try{return c.chownSync(t,e,r)}catch(t){if("ENOENT"!==t.code)throw t}};const a=h?(t,e,r,o)=>n=>{n&&"EISDIR"===n.code?c.chown(t,e,r,o):o(n)}:(t,e,r,o)=>o;const f=h?(t,e,r)=>{try{return lchownSync(t,e,r)}catch(o){if("EISDIR"!==o.code)throw o;chownSync(t,e,r)}}:(t,e,r)=>lchownSync(t,e,r);const E=n.version;let readdir=(t,e,r)=>c.readdir(t,e,r);let readdirSync=(t,e)=>c.readdirSync(t,e);/^v4\./.test(E)&&(readdir=(t,e,r)=>c.readdir(t,r));const chown=(t,e,r,o)=>{c[i](t,e,r,a(t,e,r,t=>{o(t&&"ENOENT"!==t.code?t:null)}))};const chownrKid=(t,e,r,o,n)=>{if("string"===typeof e)return c.lstat(s.resolve(t,e),(c,s)=>{if(c)return n("ENOENT"!==c.code?c:null);s.name=e;chownrKid(t,s,r,o,n)});if(e.isDirectory())chownr(s.resolve(t,e.name),r,o,c=>{if(c)return n(c);const i=s.resolve(t,e.name);chown(i,r,o,n)});else{const c=s.resolve(t,e.name);chown(c,r,o,n)}};const chownr=(t,e,r,o)=>{readdir(t,{withFileTypes:true},(n,c)=>{if(n){if("ENOENT"===n.code)return o();if("ENOTDIR"!==n.code&&"ENOTSUP"!==n.code)return o(n)}if(n||!c.length)return chown(t,e,r,o);let s=c.length;let i=null;const then=n=>{if(!i)return n?o(i=n):0===--s?chown(t,e,r,o):void 0};c.forEach(o=>chownrKid(t,o,e,r,then))})};const chownrKidSync=(t,e,r,o)=>{if("string"===typeof e)try{const r=c.lstatSync(s.resolve(t,e));r.name=e;e=r}catch(t){if("ENOENT"===t.code)return;throw t}e.isDirectory()&&chownrSync(s.resolve(t,e.name),r,o);f(s.resolve(t,e.name),r,o)};const chownrSync=(t,e,r)=>{let o;try{o=readdirSync(t,{withFileTypes:true})}catch(o){if("ENOENT"===o.code)return;if("ENOTDIR"===o.code||"ENOTSUP"===o.code)return f(t,e,r);throw o}o&&o.length&&o.forEach(o=>chownrKidSync(t,o,e,r));return f(t,e,r)};o=chownr;chownr.sync=chownrSync;var d=o;export default d;


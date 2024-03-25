var t={};const{parse:n,stringify:s}=JSON;const{keys:o}=Object;const e=String;const c="string";const r={};const a="object";const noop=(t,n)=>n;const primitives=t=>t instanceof e?e(t):t;const Primitives=(t,n)=>typeof n===c?new e(n):n;const revive=(t,n,s,c)=>{const l=[];for(let f=o(s),{length:i}=f,p=0;p<i;p++){const o=f[p];const i=s[o];if(i instanceof e){const e=t[i];if(typeof e!==a||n.has(e))s[o]=c.call(s,o,e);else{n.add(e);s[o]=r;l.push({k:o,a:[t,n,e,c]})}}else s[o]!==r&&(s[o]=c.call(s,o,i))}for(let{length:t}=l,n=0;n<t;n++){const{k:t,a:o}=l[n];s[t]=c.call(s,t,revive.apply(null,o))}return s};const set=(t,n,s)=>{const o=e(n.push(s)-1);t.set(s,o);return o};
/**
 * Converts a specialized flatted string into a JS value.
 * @param {string} text
 * @param {((this: any, key: string, value: any) => any) | undefined): any} [reviver]
 * @returns {any}
 */const parse=(t,s)=>{const o=n(t,Primitives).map(primitives);const e=o[0];const c=s||noop;const r=typeof e===a&&e?revive(o,new Set,e,c):e;return c.call({"":r},"",r)};t.parse=parse;
/**
 * Converts a JS value into a specialized flatted string.
 * @param {any} value
 * @param {((this: any, key: string, value: any) => any) | (string | number)[] | null | undefined} [replacer]
 * @param {string | number | undefined} [space]
 * @returns {string}
 */const stringify=(t,n,o)=>{const e=n&&typeof n===a?(t,s)=>t===""||-1<n.indexOf(t)?s:void 0:n||noop;const r=new Map;const l=[];const f=[];let i=+set(r,l,e.call({"":t},"",t));let p=!i;while(i<l.length){p=true;f[i]=s(l[i++],replace,o)}return"["+f.join(",")+"]";function replace(t,n){if(p){p=!p;return n}const s=e.call(this,t,n);switch(typeof s){case a:if(s===null)return s;case c:return r.get(s)||set(r,l,s)}return s}};t.stringify=stringify;
/**
 * Converts a generic value into a JSON serializable object without losing recursion.
 * @param {any} value
 * @returns {any}
 */const toJSON=t=>n(stringify(t));t.toJSON=toJSON;
/**
 * Converts a previously serialized object with recursion into a recursive one.
 * @param {any} value
 * @returns {any}
 */const fromJSON=t=>parse(s(t));t.fromJSON=fromJSON;const l=t.parse,f=t.stringify,i=t.toJSON,p=t.fromJSON;export{t as default,p as fromJSON,l as parse,f as stringify,i as toJSON};


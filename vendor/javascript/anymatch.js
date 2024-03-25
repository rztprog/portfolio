import*as t from"picomatch";import*as e from"normalize-path";var r="default"in t?t.default:t;var n="default"in e?e.default:e;var o={};Object.defineProperty(o,"__esModule",{value:true});const s=r;const a=n;
/**
 * @typedef {(testString: string) => boolean} AnymatchFn
 * @typedef {string|RegExp|AnymatchFn} AnymatchPattern
 * @typedef {AnymatchPattern|AnymatchPattern[]} AnymatchMatcher
 */const c="!";const f={returnIndex:false};const arrify=t=>Array.isArray(t)?t:[t]
/**
 * @param {AnymatchPattern} matcher
 * @param {object} options
 * @returns {AnymatchFn}
 */;const createPattern=(t,e)=>{if("function"===typeof t)return t;if("string"===typeof t){const r=s(t,e);return e=>t===e||r(e)}return t instanceof RegExp?e=>t.test(e):t=>false};
/**
 * @param {Array<Function>} patterns
 * @param {Array<Function>} negPatterns
 * @param {String|Array} args
 * @param {Boolean} returnIndex
 * @returns {boolean|number}
 */const matchPatterns=(t,e,r,n)=>{const o=Array.isArray(r);const s=o?r[0]:r;if(!o&&"string"!==typeof s)throw new TypeError("anymatch: second argument must be a string: got "+Object.prototype.toString.call(s));const c=a(s,false);for(let t=0;t<e.length;t++){const r=e[t];if(r(c))return!!n&&-1}const f=o&&[c].concat(r.slice(1));for(let e=0;e<t.length;e++){const r=t[e];if(o?r(...f):r(c))return!n||e}return!!n&&-1};
/**
 * @param {AnymatchMatcher} matchers
 * @param {Array|string} testString
 * @param {object} options
 * @returns {boolean|number|Function}
 */const anymatch=(t,e,r=f)=>{if(null==t)throw new TypeError("anymatch: specify first argument");const n="boolean"===typeof r?{returnIndex:r}:r;const o=n.returnIndex||false;const a=arrify(t);const l=a.filter((t=>"string"===typeof t&&t.charAt(0)===c)).map((t=>t.slice(1))).map((t=>s(t,n)));const i=a.filter((t=>"string"!==typeof t||"string"===typeof t&&t.charAt(0)!==c)).map((t=>createPattern(t,n)));return null==e?(t,e=false)=>{const r="boolean"===typeof e&&e;return matchPatterns(i,l,t,r)}:matchPatterns(i,l,e,o)};anymatch.default=anymatch;o=anymatch;var l=o;const i=o.__esModule;export{i as __esModule,l as default};


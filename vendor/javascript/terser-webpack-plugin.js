import e from"crypto";import t from"path";import r from"source-map";import n from"webpack-sources";import s from"webpack/lib/RequestShortener";import o from"webpack/lib/ModuleFilenameHelpers";import i from"schema-utils";import a from"serialize-javascript";import c from"terser/package.json";import l from"os";import u from"cacache";import p from"find-cache-dir";import f from"worker-farm";import m from"is-wsl";import d from"terser";import h from"process";var b={additionalProperties:false,definitions:{"file-conditions":{anyOf:[{instanceof:"RegExp"},{type:"string"}]}},properties:{test:{anyOf:[{$ref:"#/definitions/file-conditions"},{items:{anyOf:[{$ref:"#/definitions/file-conditions"}]},type:"array"}]},include:{anyOf:[{$ref:"#/definitions/file-conditions"},{items:{anyOf:[{$ref:"#/definitions/file-conditions"}]},type:"array"}]},exclude:{anyOf:[{$ref:"#/definitions/file-conditions"},{items:{anyOf:[{$ref:"#/definitions/file-conditions"}]},type:"array"}]},chunkFilter:{instanceof:"Function"},cache:{anyOf:[{type:"boolean"},{type:"string"}]},cacheKeys:{instanceof:"Function"},parallel:{anyOf:[{type:"boolean"},{type:"integer"}]},sourceMap:{type:"boolean"},minify:{instanceof:"Function"},terserOptions:{additionalProperties:true,type:"object"},extractComments:{anyOf:[{type:"boolean"},{type:"string"},{instanceof:"RegExp"},{instanceof:"Function"},{additionalProperties:false,properties:{condition:{anyOf:[{type:"boolean"},{type:"string"},{instanceof:"RegExp"},{instanceof:"Function"}]},filename:{anyOf:[{type:"string"},{instanceof:"Function"}]},banner:{anyOf:[{type:"boolean"},{type:"string"},{instanceof:"Function"}]}},type:"object"}]},warningsFilter:{instanceof:"Function"}},type:"object"};var y={};Object.defineProperty(y,"__esModule",{value:true});y.default=void 0;var g=d;function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})));r.push.apply(r,n)}return r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(r),true).forEach((function(t){_defineProperty(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function _defineProperty(e,t,r){t in e?Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true}):e[t]=r;return e}const buildTerserOptions=({ecma:e,warnings:t,parse:r={},compress:n={},mangle:s,module:o,output:i,toplevel:a,nameCache:c,ie8:l,keep_classnames:u,keep_fnames:p,safari10:f}={})=>({ecma:e,warnings:t,parse:_objectSpread({},r),compress:"boolean"===typeof n?n:_objectSpread({},n),mangle:null==s||("boolean"===typeof s?s:_objectSpread({},s)),output:_objectSpread({shebang:true,comments:false,beautify:false,semicolons:true},i),module:o,sourceMap:null,toplevel:a,nameCache:c,ie8:l,keep_classnames:u,keep_fnames:p,safari10:f});const buildComments=(e,t,r)=>{const n={};const s=t.output.comments;if("boolean"===typeof e.extractComments){n.preserve=s;n.extract=/^\**!|@preserve|@license|@cc_on/i}else if("string"===typeof e.extractComments||e.extractComments instanceof RegExp){n.preserve=s;n.extract=e.extractComments}else if("function"===typeof e.extractComments){n.preserve=s;n.extract=e.extractComments}else if(Object.prototype.hasOwnProperty.call(e.extractComments,"condition")){n.preserve=s;n.extract=e.extractComments.condition}else{n.preserve=false;n.extract=s}["preserve","extract"].forEach(e=>{let t;let r;switch(typeof n[e]){case"boolean":n[e]=n[e]?()=>true:()=>false;break;case"function":break;case"string":if("all"===n[e]){n[e]=()=>true;break}if("some"===n[e]){n[e]=(e,t)=>"comment2"===t.type&&/^\**!|@preserve|@license|@cc_on/i.test(t.value);break}t=n[e];n[e]=(e,r)=>new RegExp(t).test(r.value);break;default:r=n[e];n[e]=(e,t)=>r.test(t.value)}});return(e,t)=>{if(n.extract(e,t)){const e="comment2"===t.type?`/*${t.value}*/`:`//${t.value}`;r.includes(e)||r.push(e)}return n.preserve(e,t)}};const minify=e=>{const{file:t,input:r,inputSourceMap:n,extractComments:s,minify:o}=e;if(o)return o({[t]:r},n);const i=buildTerserOptions(e.terserOptions);n&&(i.sourceMap=true);const a=[];s&&(i.output.comments=buildComments(e,i,a));const{error:c,map:l,code:u,warnings:p}=(0,g.minify)({[t]:r},i);return{error:c,map:l,code:u,warnings:p,extractedComments:a}};var w=minify;y.default=w;var v={};function _nullRequire(e){var t=new Error("Cannot find module '"+e+"'");t.code="MODULE_NOT_FOUND";throw t}_nullRequire.resolve=_nullRequire;var O=h;Object.defineProperty(v,"__esModule",{value:true});v.default=void 0;var k=_interopRequireDefault(l);var j=_interopRequireDefault(u);var _=_interopRequireDefault(p);var $=_interopRequireDefault(f);var x=_interopRequireDefault(a);var P=_interopRequireDefault(m);var C=_interopRequireDefault(y);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}const D="./worker";class TaskRunner{constructor(e={}){const{cache:t,parallel:r}=e;this.cacheDir=true===t?(0,_.default)({name:"terser-webpack-plugin"})||k.default.tmpdir():t;const n=k.default.cpus()||{length:1};this.maxConcurrentWorkers=P.default?1:true===r?n.length-1:Math.min(Number(r)||0,n.length-1)}run(e,t){if(!e.length){t(null,[]);return}if(this.maxConcurrentWorkers>1){const e="win32"===O.platform?{maxConcurrentWorkers:this.maxConcurrentWorkers,maxConcurrentCallsPerWorker:1}:{maxConcurrentWorkers:this.maxConcurrentWorkers};this.workers=(0,$.default)(e,D);this.boundWorkers=(e,t)=>{try{this.workers((0,x.default)(e),t)}catch(e){t(e)}}}else this.boundWorkers=(e,t)=>{try{t(null,(0,C.default)(e))}catch(e){t(e)}};let r=e.length;const n=[];const step=(e,s)=>{r-=1;n[e]=s;r||t(null,n)};e.forEach((e,t)=>{const enqueue=()=>{this.boundWorkers(e,(r,n)=>{const s=r?{error:r}:n;const done=()=>step(t,s);this.cacheDir&&!s.error?j.default.put(this.cacheDir,(0,x.default)(e.cacheKeys),JSON.stringify(n)).then(done,done):done()})};this.cacheDir?j.default.get(this.cacheDir,(0,x.default)(e.cacheKeys)).then(({data:e})=>step(t,JSON.parse(e)),enqueue):enqueue()})}exit(){this.workers&&$.default.end(this.workers)}}v.default=TaskRunner;var E={name:"terser-webpack-plugin",version:"1.4.5",description:"Terser plugin for webpack",license:"MIT",repository:"webpack-contrib/terser-webpack-plugin",author:"webpack Contrib Team",homepage:"https://github.com/webpack-contrib/terser-webpack-plugin",bugs:"https://github.com/webpack-contrib/terser-webpack-plugin/issues",main:"dist/cjs.js",engines:{node:">= 6.9.0"},scripts:{start:"npm run build -- -w",prebuild:"npm run clean",build:'cross-env NODE_ENV=production babel src -d dist --ignore "src/**/*.test.js" --copy-files',clean:"del-cli dist",commitlint:"commitlint --from=master","lint:prettier":'prettier "{**/*,*}.{js,json,md,yml,css}" --list-different',"lint:js":"eslint --cache src test",lint:'npm-run-all -l -p "lint:**"',prepare:"npm run build",release:"standard-version",security:"npm audit","test:only":"cross-env NODE_ENV=test jest","test:watch":"cross-env NODE_ENV=test jest --watch","test:coverage":'cross-env NODE_ENV=test jest --collectCoverageFrom="src/**/*.js" --coverage',pretest:"npm run lint",test:"cross-env NODE_ENV=test npm run test:coverage",defaults:"webpack-defaults"},files:["dist"],peerDependencies:{webpack:"^4.0.0"},dependencies:{cacache:"^12.0.2","find-cache-dir":"^2.1.0","is-wsl":"^1.1.0","schema-utils":"^1.0.0","serialize-javascript":"^4.0.0","source-map":"^0.6.1",terser:"^4.1.2","webpack-sources":"^1.4.0","worker-farm":"^1.7.0"},devDependencies:{"@babel/cli":"^7.5.5","@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","@commitlint/cli":"^8.1.0","@commitlint/config-conventional":"^8.1.0","@webpack-contrib/defaults":"^5.0.2","@webpack-contrib/eslint-config-webpack":"^3.0.0","babel-jest":"^24.8.0","commitlint-azure-pipelines-cli":"^1.0.2","cross-env":"^5.2.0",del:"^4.1.1","del-cli":"^1.1.0",eslint:"^6.1.0","eslint-config-prettier":"^6.0.0","eslint-plugin-import":"^2.18.2",husky:"^3.0.2",jest:"^24.8.0","jest-junit":"^7.0.0","lint-staged":"^9.2.1","memory-fs":"^0.4.1","npm-run-all":"^4.1.5",prettier:"^1.18.2","standard-version":"^7.0.0","uglify-js":"^3.6.0",webpack:"^4.38.0"},keywords:["uglify","uglify-js","uglify-es","terser","webpack","webpack-plugin","minification","compress","compressor","min","minification","minifier","minify","optimize","optimizer"]};var S={};var M=h;Object.defineProperty(S,"__esModule",{value:true});S.default=void 0;var R=_interopRequireDefault$1(e);var F=_interopRequireDefault$1(t);var T=r;var q=n;var N=_interopRequireDefault$1(s);var K=_interopRequireDefault$1(o);var W=_interopRequireDefault$1(i);var A=_interopRequireDefault$1(a);var z=_interopRequireDefault$1(c);var V=_interopRequireDefault$1(b);var J=_interopRequireDefault$1(v);function _interopRequireDefault$1(e){return e&&e.__esModule?e:{default:e}}function ownKeys$1(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})));r.push.apply(r,n)}return r}function _objectSpread$1(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys$1(Object(r),true).forEach((function(t){_defineProperty$1(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys$1(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function _defineProperty$1(e,t,r){t in e?Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true}):e[t]=r;return e}const H=/\[.+:([0-9]+),([0-9]+)\]/;class TerserPlugin{constructor(e={}){(0,W.default)(V.default,e,"Terser Plugin");const{minify:t,terserOptions:r={},test:n=/\.m?js(\?.*)?$/i,chunkFilter:s=(()=>true),warningsFilter:o=(()=>true),extractComments:i=false,sourceMap:a=false,cache:c=false,cacheKeys:l=(e=>e),parallel:u=false,include:p,exclude:f}=e;this.options={test:n,chunkFilter:s,warningsFilter:o,extractComments:i,sourceMap:a,cache:c,cacheKeys:l,parallel:u,include:p,exclude:f,minify:t,terserOptions:_objectSpread$1({output:{comments:!i&&/^\**!|@preserve|@license|@cc_on/i}},r)}}static isSourceMap(e){return Boolean(e&&e.version&&e.sources&&Array.isArray(e.sources)&&"string"===typeof e.mappings)}static buildSourceMap(e){return e&&TerserPlugin.isSourceMap(e)?new T.SourceMapConsumer(e):null}static buildError(e,t,r,n){if(e.line){const s=r&&r.originalPositionFor({line:e.line,column:e.col});return s&&s.source&&n?new Error(`${t} from Terser\n${e.message} [${n.shorten(s.source)}:${s.line},${s.column}][${t}:${e.line},${e.col}]`):new Error(`${t} from Terser\n${e.message} [${t}:${e.line},${e.col}]`)}return e.stack?new Error(`${t} from Terser\n${e.stack}`):new Error(`${t} from Terser\n${e.message}`)}static buildWarning(e,t,r,n,s){let o=e;let i="";let a=null;if(r){const s=H.exec(e);if(s){const e=+s[1];const c=+s[2];const l=r.originalPositionFor({line:e,column:c});if(l&&l.source&&l.source!==t&&n){({source:a}=l);o=`${o.replace(H,"")}`;i=`[${n.shorten(l.source)}:${l.line},${l.column}]`}}}return s&&!s(e,a)?null:`Terser Plugin: ${o}${i}`}apply(e){const buildModuleFn=e=>{e.useSourceMap=true};const optimizeFn=(t,r,n)=>{const s=new J.default({cache:this.options.cache,parallel:this.options.parallel});const o=new WeakSet;const i=[];const{chunkFilter:a}=this.options;Array.from(r).filter(e=>a&&a(e)).reduce((e,t)=>e.concat(t.files||[]),[]).concat(t.additionalChunkAssets||[]).filter(K.default.matchObject.bind(null,this.options)).forEach(r=>{let n;const s=t.assets[r];if(!o.has(s))try{let e;if(this.options.sourceMap&&s.sourceAndMap){const{source:o,map:i}=s.sourceAndMap();e=o;if(TerserPlugin.isSourceMap(i))n=i;else{n=i;t.warnings.push(new Error(`${r} contains invalid source map`))}}else{e=s.source();n=null}let o=false;if(this.options.extractComments){o=this.options.extractComments.filename||`${r}.LICENSE`;"function"===typeof o&&(o=o(r))}const a={file:r,input:e,inputSourceMap:n,commentsFile:o,extractComments:this.options.extractComments,terserOptions:this.options.terserOptions,minify:this.options.minify};if(this.options.cache){const t={terser:z.default.version,node_version:M.version,"terser-webpack-plugin":E.version,"terser-webpack-plugin-options":this.options,hash:R.default.createHash("md4").update(e).digest("hex")};a.cacheKeys=this.options.cacheKeys(t,r)}i.push(a)}catch(s){t.errors.push(TerserPlugin.buildError(s,r,TerserPlugin.buildSourceMap(n),new N.default(e.context)))}});s.run(i,(r,a)=>{if(r)t.errors.push(r);else{a.forEach((r,n)=>{const{file:s,input:a,inputSourceMap:c,commentsFile:l}=i[n];const{error:u,map:p,code:f,warnings:m}=r;let{extractedComments:d}=r;let h=null;(u||m&&m.length>0)&&(h=TerserPlugin.buildSourceMap(c));if(u){t.errors.push(TerserPlugin.buildError(u,s,h,new N.default(e.context)));return}let b;b=p?new q.SourceMapSource(f,s,JSON.parse(p),a,c,true):new q.RawSource(f);if(l&&d&&d.length>0){if(l in t.assets){const e=t.assets[l].source();d=d.filter(t=>!e.includes(t))}if(d.length>0){if(false!==this.options.extractComments.banner){let e=this.options.extractComments.banner||`For license information please see ${F.default.posix.basename(l)}`;"function"===typeof e&&(e=e(l));e&&(b=new q.ConcatSource(`/*! ${e} */\n`,b))}const e=new q.RawSource(`${d.join("\n\n")}\n`);if(l in t.assets)if(t.assets[l]instanceof q.ConcatSource){t.assets[l].add("\n");t.assets[l].add(e)}else t.assets[l]=new q.ConcatSource(t.assets[l],"\n",e);else t.assets[l]=e}}o.add(t.assets[s]=b);m&&m.length>0&&m.forEach(r=>{const n=TerserPlugin.buildWarning(r,s,h,new N.default(e.context),this.options.warningsFilter);n&&t.warnings.push(n)})});s.exit();n()}})};const t={name:this.constructor.name};e.hooks.compilation.tap(t,e=>{this.options.sourceMap&&e.hooks.buildModule.tap(t,buildModuleFn);const{mainTemplate:r,chunkTemplate:n}=e;for(const e of[r,n])e.hooks.hashForChunk.tap(t,e=>{const t=(0,A.default)({terser:z.default.version,terserOptions:this.options.terserOptions});e.update("TerserPlugin");e.update(t)});e.hooks.optimizeChunkAssets.tapAsync(t,optimizeFn.bind(this,e))})}}var I=TerserPlugin;S.default=I;var L={};const U=S;L=U.default;var B=L;export default B;


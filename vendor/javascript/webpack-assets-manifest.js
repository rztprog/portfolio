import t from"fs";import e from"url";import s from"path";import i from"lodash.get";import n from"lodash.has";import o from"schema-utils";import r from"tapable";import a from"webpack-sources";import h from"crypto";import l from"chalk";import p from"mkdirp";import u from"process";var c={title:"Webpack Assets Manifest options schema",description:"Webpack Assets Manifest options",type:"object",properties:{assets:{type:"object",default:{}},output:{type:"string",default:"manifest.json"},replacer:{oneOf:[{$ref:"#/definitions/functionOrNull"},{type:"array"}]},space:{type:"integer",multipleOf:1,minimum:0,default:2},writeToDisk:{type:"boolean",default:false},fileExtRegex:{oneOf:[{instanceof:"RegExp"},{type:"null"},{const:false}]},sortManifest:{default:true,oneOf:[{type:"boolean"},{instanceof:"Function"}]},merge:{default:false,oneOf:[{type:"boolean"},{const:"customize"}]},publicPath:{default:null,oneOf:[{type:"string"},{type:"boolean"},{type:"null"},{instanceof:"Function"}]},apply:{$ref:"#/definitions/functionOrNull"},customize:{$ref:"#/definitions/functionOrNull"},transform:{$ref:"#/definitions/functionOrNull"},done:{$ref:"#/definitions/functionOrNull"},entrypoints:{type:"boolean",default:false},entrypointsKey:{default:"entrypoints",oneOf:[{type:"string"},{const:false}]},integrity:{type:"boolean",default:false},integrityHashes:{type:"array",items:{type:"string"},default:["sha256","sha384","sha512"]},integrityPropertyName:{type:"string",minLength:1,default:"integrity"}},definitions:{functionOrNull:{default:null,oneOf:[{instanceof:"Function"},{type:"null"}]}}};var f={};const m=h;const y=l;function warn(t){if(t in warn.cache)return;const e=y.hex("#CC4A8B")("WARNING:");console.warn(y`${e} ${t}`)}warn.cache=Object.create(null);warn.once=function(t){warn(t);warn.cache[t]=true};function maybeArrayWrap(t){return Array.isArray(t)?t:[t]}function filterHashes(t){const e=m.getHashes();return t.filter(t=>{if(e.includes(t))return true;warn(y`{blueBright ${t}} is not a supported hash algorithm`);return false})}function getSRIHash(t,e){return Array.isArray(t)?t.map(t=>{const s=m.createHash(t).update(e,"utf-8").digest("base64");return`${t}-${s}`}).join(" "):""}function varType(t){const[,e]=Object.prototype.toString.call(t).match(/\[object\s(\w+)\]/);return e}function getSortedObject(t,e){const s=Object.keys(t);s.sort(e);return s.reduce((e,s)=>(e[s]=t[s],e),Object.create(null))}f={maybeArrayWrap:maybeArrayWrap,filterHashes:filterHashes,getSRIHash:getSRIHash,warn:warn,varType:varType,getSortedObject:getSortedObject};var g=f;var d={};var b=u;const O=t;const w=e;const k=s;const v=i;const P=n;const x=o;const{SyncHook:A,SyncWaterfallHook:R}=r;const{RawSource:N}=a;const S=c;const{maybeArrayWrap:j,filterHashes:M,getSRIHash:E,warn:H,varType:$,getSortedObject:F}=g;const z=Symbol("isMerging");const K="WebpackAssetsManifest";class WebpackAssetsManifest{constructor(t={}){this.hooks={apply:new A(["manifest"]),customize:new R(["entry","original","manifest","asset"]),transform:new R(["assets","manifest"]),done:new A(["manifest","stats"]),options:new R(["options"]),afterOptions:new A(["options"])};this.hooks.transform.tap(K,t=>{const{sortManifest:e}=this.options;return e?F(t,"function"===typeof e?e.bind(this):void 0):t});this.hooks.afterOptions.tap(K,t=>{this.options=Object.assign(this.defaultOptions,t);this.options.integrityHashes=M(this.options.integrityHashes);x(S,this.options,K);this.assets=Object.assign(this.options.assets,this.assets,this.options.assets);this.options.hasOwnProperty("contextRelativeKeys")&&H("contextRelativeKeys has been removed. Please use the customize hook instead.");["apply","customize","transform","done"].forEach(t=>{"function"===typeof this.options[t]&&this.hooks[t].tap(`${K}.option.${t}`,this.options[t])})});this.options=Object.assign(this.defaultOptions,t);this.assets=this.options.assets;this.assetNames=new Map;this.currentAsset=null;this.compiler=null;this.stats=null;this.hmrRegex=null;this[z]=false}apply(t){this.compiler=t;this.options=this.hooks.options.call(this.options);this.hooks.afterOptions.call(this.options);const{output:{filename:e,hotUpdateChunkFilename:s}}=t.options;e!==s&&"string"===typeof s&&(this.hmrRegex=new RegExp(s.replace(/\./g,"\\.").replace(/\[[a-z]+(:\d+)?\]/gi,(t,e)=>e?`.{${e.substr(1)}}`:".+")+"$","i"));t.hooks.compilation.tap(K,this.handleCompilation.bind(this));t.hooks.emit.tapAsync(K,this.handleEmit.bind(this));t.hooks.afterEmit.tapPromise(K,this.handleAfterEmit.bind(this));t.hooks.done.tap(K,t=>this.hooks.done.call(this,t));this.hooks.apply.call(this)}get defaultOptions(){return{assets:Object.create(null),output:"manifest.json",replacer:null,space:2,writeToDisk:false,fileExtRegex:/\.\w{2,4}\.(?:map|gz)$|\.\w+$/i,sortManifest:true,merge:false,publicPath:null,apply:null,customize:null,transform:null,done:null,entrypoints:false,entrypointsKey:"entrypoints",integrity:false,integrityHashes:["sha256","sha384","sha512"],integrityPropertyName:"integrity"}}get isMerging(){return this[z]}getExtension(t){if(!t||"string"!==typeof t)return"";t=t.split(/[?#]/)[0];if(this.options.fileExtRegex){const e=t.match(this.options.fileExtRegex);return e&&e.length?e[0]:""}return k.extname(t)}fixKey(t){return"string"===typeof t?t.replace(/\\/g,"/"):t}isHMR(t){return!!this.hmrRegex&&this.hmrRegex.test(t)}setRaw(t,e){this.assets[t]=e;return this}set(t,e){if(this.isMerging&&"customize"!==this.options.merge)return this.setRaw(t,e);const s=this.fixKey(t);const i=this.getPublicPath(e);const n=this.hooks.customize.call({key:s,value:i},{key:t,value:e},this,this.currentAsset);if(false===n)return this;if("Object"===$(n)){let{key:t=s,value:e=i}=n;e===i&&this.options.integrity&&(e={src:e,integrity:v(this,`currentAsset.${this.options.integrityPropertyName}`,"")});return this.setRaw(t,e)}H.once(`Unexpected customize() return type: ${$(n)}`);return this.setRaw(s,i)}has(t){return P(this.assets,t)||P(this.assets,this.fixKey(t))}get(t,e=""){return this.assets[t]||this.assets[this.fixKey(t)]||e}delete(t){if(P(this.assets,t))return delete this.assets[t];t=this.fixKey(t);return!!P(this.assets,t)&&delete this.assets[t]}processAssetsByChunkName(t){Object.keys(t).forEach(e=>{j(t[e]).filter(t=>!this.isHMR(t)).forEach(t=>{this.assetNames.set(t,e+this.getExtension(t))})});return this.assetNames}toJSON(){return this.hooks.transform.call(this.assets,this)}toString(){return JSON.stringify(this,this.options.replacer,this.options.space)||"{}"}maybeMerge(){if(this.options.merge)try{this[z]=true;const t=JSON.parse(O.readFileSync(this.getOutputPath()));for(const e in t)this.has(e)||this.set(e,t[e])}catch(t){}finally{this[z]=false}}getEntrypointFilesGroupedByExtension(t){const e=Object.create(null);const removeHMR=t=>!this.isHMR(t);const groupFilesByExtension=(t,e)=>{const s=this.getExtension(e).replace(/^\.+/,"").toLowerCase();t[s]=t[s]||[];t[s].push(this.getPublicPath(e));return t};for(const[s,i]of t)e[s]=i.getFiles().filter(removeHMR).reduce(groupFilesByExtension,Object.create(null));return e}handleEmit(t,e){this.stats=t.getStats().toJson();this.processAssetsByChunkName(this.stats.assetsByChunkName);for(const[e,s]of this.assetNames){this.currentAsset=t.assets[e];this.options.integrity&&this.currentAsset&&!this.currentAsset[this.options.integrityPropertyName]&&(this.currentAsset[this.options.integrityPropertyName]=E(this.options.integrityHashes,this.currentAsset.source()));this.set(s,e);this.currentAsset=null}if(this.options.entrypoints){const e=this.getEntrypointFilesGroupedByExtension(t.entrypoints);if(false===this.options.entrypointsKey)for(const t in e)this.setRaw(t,e[t]);else this.setRaw(this.options.entrypointsKey,e)}this.maybeMerge();const s=this.getManifestPath(t,this.inDevServer()?k.basename(this.getOutputPath()):k.relative(t.compiler.outputPath,this.getOutputPath()));t.assets[s]=new N(this.toString());e()}getManifestPath(t,e){return t.getPath(e,{chunk:{name:"manifest"},filename:"manifest.json"})}handleAfterEmit(t){this.assetNames.clear();return this.options.writeToDisk?new Promise((e,s)=>{const i=this.getManifestPath(t,this.getOutputPath());p(k.dirname(i),t=>{t?s(t):O.writeFile(i,this.toString(),e)})}):Promise.resolve()}handleNormalModuleLoader(t,e){const{emitFile:s}=t;t.emitFile=(t,i,n)=>{if(!this.assetNames.has(t)){const s=k.join(k.dirname(t),k.basename(e.userRequest));this.assetNames.set(t,s)}return s.call(e,t,i,n)}}handleCompilation(t){t.hooks.normalModuleLoader.tap(K,this.handleNormalModuleLoader.bind(this))}inDevServer(){return!!b.argv.some(t=>t.includes("webpack-dev-server"))||P(this,"compiler.outputFileSystem")&&"MemoryFileSystem"===this.compiler.outputFileSystem.constructor.name}getOutputPath(){if(!this.compiler)return"";if(k.isAbsolute(this.options.output))return this.options.output;if(this.inDevServer()){let t=v(this,"compiler.options.devServer.outputPath",v(this,"compiler.outputPath","/"));if("/"===t){H.once("Please use an absolute path in options.output when using webpack-dev-server.");t=v(this,"compiler.context",b.cwd())}return k.resolve(t,this.options.output)}return k.resolve(this.compiler.outputPath,this.options.output)}getPublicPath(t){if("string"===typeof t){const{publicPath:e}=this.options;if("function"===typeof e)return e(t,this);if("string"===typeof e)return w.resolve(e,t);if(true===e)return w.resolve(v(this,"compiler.options.output.publicPath",""),t)}return t}getProxy(t=false){const e=t?"setRaw":"set";return new Proxy(this,{has(t,e){return t.has(e)},get(t,e){return t.get(e)||void 0},set(t,s,i){return t[e](s,i).has(s)},deleteProperty(t,e){return t.delete(e)}})}}d=WebpackAssetsManifest;var W=d;export default W;


import*as e from"path";import*as o from"ts-pnp";import*as n from"pnpapi";import r from"process";var t="default"in e?e.default:e;var s={};const a=t;
/**
 * return source path given a locator
 * @param {*} sourceLocator 
 * @returns 
 */function getSourceLocation(e,o){if(!e)return null;const n=o.getPackageInformation(e);if(!n)throw new Error("Couldn't find the package to use as resolution source");if(!n.packageLocation)throw new Error("The package to use as resolution source seem to not have been installed - maybe it's a devDependency not installed in prod?");return n.packageLocation.replace(/\/?$/,"/")}
/**
 *
 * @param {*} sourceLocator
 * @param {*} filter
 * @returns
 */function makeResolver$1(e){const{sourceLocator:o,filter:n,pnpapi:r}=e||{};const t=getSourceLocation(o,r);return e=>{const o=/^\.\.([\\\/]|$)/;const s=e.ensureHook("resolve");e.getHook("file").intercept({register:e=>"SymlinkPlugin"!==e.name?e:Object.assign({},e,{fn:(e,o,n)=>{n()}})});e.getHook("after-module").tapAsync("PnpResolver",((e,o,n)=>n(o.pnpErrors&&o.pnpErrors.get(e.context.issuer))));e.getHook("before-module").tapAsync("PnpResolver",((i,p,l)=>{let c=i.request;let u=i.context.issuer;if(u){if(!a.isAbsolute(u))throw new Error(`Cannot successfully resolve this dependency - issuer not supported (${u})`)}else u=`${i.path}/`;if(n){const e=a.relative(n,u);if(a.isAbsolute(e)||o.test(e))return l(null)}let d=t||u;let f;try{f=r.resolveToUnqualified(c,d,{considerBuiltins:false})}catch(e){p.missingDependencies&&p.missingDependencies.add(i.path);p.log&&p.log(e.message);p.pnpErrors=p.pnpErrors||new Map;p.pnpErrors.set(u,e);return l()}e.doResolve(s,Object.assign({},i,{request:f}),null,p,l)}))}}s.makeResolver=makeResolver$1;"default"in e&&e.default;var i="default"in o?o.default:o;var p="default"in n?n.default:n;var l={};function _nullRequire(e){var o=new Error("Cannot find module '"+e+"'");o.code="MODULE_NOT_FOUND";throw o}_nullRequire.resolve=_nullRequire;var c=r;const{resolveModuleName:u}=i;const{makeResolver:d}=s;function nothing(){}function getModuleLocator(e,o){const n="string"===typeof e?e:e.filename;if(!n)throw new Error("The specified module doesn't seem to exist on the filesystem");const r=o.findPackageLocator(n);if(!r)throw new Error("the specified module doesn't seem to be part of the dependency tree");return r}function getDependencyLocator(e,o,n){const{packageDependencies:r}=n.getPackageInformation(e);const t=r.get(o);return{name:o,reference:t}}l=c.versions.pnp?{apply:d({pnpapi:p})}:{apply:nothing};l.makePlugin=(e,o)=>c.versions.pnp?{apply:d({sourceLocator:e,filter:o,pnpapi:p})}:{apply:nothing};l.moduleLoader=e=>{if(c.versions.pnp){const o=p;return{apply:d({sourceLocator:getModuleLocator(e,o),pnpapi:o})}}return{apply:nothing}};l.topLevelLoader=c.versions.pnp?{apply:d({sourceLocator:{name:null,reference:null},pnpapi:p})}:{apply:nothing};l.bind=(e,o,n)=>{if(c.versions.pnp){const r=p;return{apply:d({sourceLocator:n?getDependencyLocator(getModuleLocator(o,r),n,r):getModuleLocator(o,r),filter:e,pnpapi:r})}}return{apply:nothing}};l.tsLoaderOptions=(e={})=>c.versions.pnp?Object.assign({},e,{resolveModuleName:u,resolveTypeReferenceDirective:u}):e;l.forkTsCheckerOptions=(e={})=>c.versions.pnp?Object.assign({},e,{resolveModuleNameModule:"./ts",resolveTypeReferenceDirectiveModule:"./ts"}):e;var f=l;const g=l.makePlugin,m=l.moduleLoader,v=l.topLevelLoader,h=l.bind,y=l.tsLoaderOptions,L=l.forkTsCheckerOptions;export default f;export{h as bind,L as forkTsCheckerOptions,g as makePlugin,m as moduleLoader,v as topLevelLoader,y as tsLoaderOptions};


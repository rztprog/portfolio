import e from"process";var r="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var t={};var a=e;t=t=SemVer;var n;n="object"===typeof a&&a.env&&a.env.NODE_DEBUG&&/\bsemver\b/i.test(a.env.NODE_DEBUG)?function(){var e=Array.prototype.slice.call(arguments,0);e.unshift("SEMVER");console.log.apply(console,e)}:function(){};t.SEMVER_SPEC_VERSION="2.0.0";var s=256;var i=Number.MAX_SAFE_INTEGER||9007199254740991;var o=16;var p=s-6;var c=t.re=[];var l=t.safeRe=[];var u=t.src=[];var f=0;var m="[a-zA-Z0-9-]";var h=[["\\s",1],["\\d",s],[m,p]];function makeSafeRe(e){for(var r=0;r<h.length;r++){var t=h[r][0];var a=h[r][1];e=e.split(t+"*").join(t+"{0,"+a+"}").split(t+"+").join(t+"{1,"+a+"}")}return e}var v=f++;u[v]="0|[1-9]\\d*";var g=f++;u[g]="\\d+";var d=f++;u[d]="\\d*[a-zA-Z-]"+m+"*";var w=f++;u[w]="("+u[v]+")\\.("+u[v]+")\\.("+u[v]+")";var S=f++;u[S]="("+u[g]+")\\.("+u[g]+")\\.("+u[g]+")";var y=f++;u[y]="(?:"+u[v]+"|"+u[d]+")";var R=f++;u[R]="(?:"+u[g]+"|"+u[d]+")";var V=f++;u[V]="(?:-("+u[y]+"(?:\\."+u[y]+")*))";var E=f++;u[E]="(?:-?("+u[R]+"(?:\\."+u[R]+")*))";var j=f++;u[j]=m+"+";var C=f++;u[C]="(?:\\+("+u[j]+"(?:\\."+u[j]+")*))";var b=f++;var I="v?"+u[w]+u[V]+"?"+u[C]+"?";u[b]="^"+I+"$";var X="[v=\\s]*"+u[S]+u[E]+"?"+u[C]+"?";var $=f++;u[$]="^"+X+"$";var x=f++;u[x]="((?:<|>)?=?)";var T=f++;u[T]=u[g]+"|x|X|\\*";var k=f++;u[k]=u[v]+"|x|X|\\*";var q=f++;u[q]="[v=\\s]*("+u[k]+")(?:\\.("+u[k]+")(?:\\.("+u[k]+")(?:"+u[V]+")?"+u[C]+"?)?)?";var P=f++;u[P]="[v=\\s]*("+u[T]+")(?:\\.("+u[T]+")(?:\\.("+u[T]+")(?:"+u[E]+")?"+u[C]+"?)?)?";var N=f++;u[N]="^"+u[x]+"\\s*"+u[q]+"$";var _=f++;u[_]="^"+u[x]+"\\s*"+u[P]+"$";var M=f++;u[M]="(?:^|[^\\d])(\\d{1,"+o+"})(?:\\.(\\d{1,"+o+"}))?(?:\\.(\\d{1,"+o+"}))?(?:$|[^\\d])";var L=f++;u[L]="(?:~>?)";var A=f++;u[A]="(\\s*)"+u[L]+"\\s+";c[A]=new RegExp(u[A],"g");l[A]=new RegExp(makeSafeRe(u[A]),"g");var D="$1~";var O=f++;u[O]="^"+u[L]+u[q]+"$";var G=f++;u[G]="^"+u[L]+u[P]+"$";var U=f++;u[U]="(?:\\^)";var z=f++;u[z]="(\\s*)"+u[U]+"\\s+";c[z]=new RegExp(u[z],"g");l[z]=new RegExp(makeSafeRe(u[z]),"g");var B="$1^";var Z=f++;u[Z]="^"+u[U]+u[q]+"$";var F=f++;u[F]="^"+u[U]+u[P]+"$";var H=f++;u[H]="^"+u[x]+"\\s*("+X+")$|^$";var J=f++;u[J]="^"+u[x]+"\\s*("+I+")$|^$";var K=f++;u[K]="(\\s*)"+u[x]+"\\s*("+X+"|"+u[q]+")";c[K]=new RegExp(u[K],"g");l[K]=new RegExp(makeSafeRe(u[K]),"g");var Q="$1$2$3";var W=f++;u[W]="^\\s*("+u[q]+")\\s+-\\s+("+u[q]+")\\s*$";var Y=f++;u[Y]="^\\s*("+u[P]+")\\s+-\\s+("+u[P]+")\\s*$";var ee=f++;u[ee]="(<|>)?=?\\s*\\*";for(var re=0;re<f;re++){n(re,u[re]);if(!c[re]){c[re]=new RegExp(u[re]);l[re]=new RegExp(makeSafeRe(u[re]))}}t.parse=parse;function parse(e,r){r&&"object"===typeof r||(r={loose:!!r,includePrerelease:false});if(e instanceof SemVer)return e;if("string"!==typeof e)return null;if(e.length>s)return null;var t=r.loose?l[$]:l[b];if(!t.test(e))return null;try{return new SemVer(e,r)}catch(e){return null}}t.valid=valid;function valid(e,r){var t=parse(e,r);return t?t.version:null}t.clean=clean;function clean(e,r){var t=parse(e.trim().replace(/^[=v]+/,""),r);return t?t.version:null}t.SemVer=SemVer;function SemVer(e,t){t&&"object"===typeof t||(t={loose:!!t,includePrerelease:false});if(e instanceof SemVer){if(e.loose===t.loose)return e;e=e.version}else if("string"!==typeof e)throw new TypeError("Invalid Version: "+e);if(e.length>s)throw new TypeError("version is longer than "+s+" characters");if(!((this||r)instanceof SemVer))return new SemVer(e,t);n("SemVer",e,t);(this||r).options=t;(this||r).loose=!!t.loose;var a=e.trim().match(t.loose?l[$]:l[b]);if(!a)throw new TypeError("Invalid Version: "+e);(this||r).raw=e;(this||r).major=+a[1];(this||r).minor=+a[2];(this||r).patch=+a[3];if((this||r).major>i||(this||r).major<0)throw new TypeError("Invalid major version");if((this||r).minor>i||(this||r).minor<0)throw new TypeError("Invalid minor version");if((this||r).patch>i||(this||r).patch<0)throw new TypeError("Invalid patch version");a[4]?(this||r).prerelease=a[4].split(".").map((function(e){if(/^[0-9]+$/.test(e)){var r=+e;if(r>=0&&r<i)return r}return e})):(this||r).prerelease=[];(this||r).build=a[5]?a[5].split("."):[];this.format()}SemVer.prototype.format=function(){(this||r).version=(this||r).major+"."+(this||r).minor+"."+(this||r).patch;(this||r).prerelease.length&&((this||r).version+="-"+(this||r).prerelease.join("."));return(this||r).version};SemVer.prototype.toString=function(){return(this||r).version};SemVer.prototype.compare=function(e){n("SemVer.compare",(this||r).version,(this||r).options,e);e instanceof SemVer||(e=new SemVer(e,(this||r).options));return this.compareMain(e)||this.comparePre(e)};SemVer.prototype.compareMain=function(e){e instanceof SemVer||(e=new SemVer(e,(this||r).options));return compareIdentifiers((this||r).major,e.major)||compareIdentifiers((this||r).minor,e.minor)||compareIdentifiers((this||r).patch,e.patch)};SemVer.prototype.comparePre=function(e){e instanceof SemVer||(e=new SemVer(e,(this||r).options));if((this||r).prerelease.length&&!e.prerelease.length)return-1;if(!(this||r).prerelease.length&&e.prerelease.length)return 1;if(!(this||r).prerelease.length&&!e.prerelease.length)return 0;var t=0;do{var a=(this||r).prerelease[t];var s=e.prerelease[t];n("prerelease compare",t,a,s);if(void 0===a&&void 0===s)return 0;if(void 0===s)return 1;if(void 0===a)return-1;if(a!==s)return compareIdentifiers(a,s)}while(++t)};SemVer.prototype.inc=function(e,t){switch(e){case"premajor":(this||r).prerelease.length=0;(this||r).patch=0;(this||r).minor=0;(this||r).major++;this.inc("pre",t);break;case"preminor":(this||r).prerelease.length=0;(this||r).patch=0;(this||r).minor++;this.inc("pre",t);break;case"prepatch":(this||r).prerelease.length=0;this.inc("patch",t);this.inc("pre",t);break;case"prerelease":0===(this||r).prerelease.length&&this.inc("patch",t);this.inc("pre",t);break;case"major":0===(this||r).minor&&0===(this||r).patch&&0!==(this||r).prerelease.length||(this||r).major++;(this||r).minor=0;(this||r).patch=0;(this||r).prerelease=[];break;case"minor":0===(this||r).patch&&0!==(this||r).prerelease.length||(this||r).minor++;(this||r).patch=0;(this||r).prerelease=[];break;case"patch":0===(this||r).prerelease.length&&(this||r).patch++;(this||r).prerelease=[];break;case"pre":if(0===(this||r).prerelease.length)(this||r).prerelease=[0];else{var a=(this||r).prerelease.length;while(--a>=0)if("number"===typeof(this||r).prerelease[a]){(this||r).prerelease[a]++;a=-2}-1===a&&(this||r).prerelease.push(0)}t&&((this||r).prerelease[0]===t?isNaN((this||r).prerelease[1])&&((this||r).prerelease=[t,0]):(this||r).prerelease=[t,0]);break;default:throw new Error("invalid increment argument: "+e)}this.format();(this||r).raw=(this||r).version;return this||r};t.inc=inc;function inc(e,r,t,a){if("string"===typeof t){a=t;t=void 0}try{return new SemVer(e,t).inc(r,a).version}catch(e){return null}}t.diff=diff;function diff(e,r){if(eq(e,r))return null;var t=parse(e);var a=parse(r);var n="";if(t.prerelease.length||a.prerelease.length){n="pre";var s="prerelease"}for(var i in t)if(("major"===i||"minor"===i||"patch"===i)&&t[i]!==a[i])return n+i;return s}t.compareIdentifiers=compareIdentifiers;var te=/^[0-9]+$/;function compareIdentifiers(e,r){var t=te.test(e);var a=te.test(r);if(t&&a){e=+e;r=+r}return e===r?0:t&&!a?-1:a&&!t?1:e<r?-1:1}t.rcompareIdentifiers=rcompareIdentifiers;function rcompareIdentifiers(e,r){return compareIdentifiers(r,e)}t.major=major;function major(e,r){return new SemVer(e,r).major}t.minor=minor;function minor(e,r){return new SemVer(e,r).minor}t.patch=patch;function patch(e,r){return new SemVer(e,r).patch}t.compare=compare;function compare(e,r,t){return new SemVer(e,t).compare(new SemVer(r,t))}t.compareLoose=compareLoose;function compareLoose(e,r){return compare(e,r,true)}t.rcompare=rcompare;function rcompare(e,r,t){return compare(r,e,t)}t.sort=sort;function sort(e,r){return e.sort((function(e,a){return t.compare(e,a,r)}))}t.rsort=rsort;function rsort(e,r){return e.sort((function(e,a){return t.rcompare(e,a,r)}))}t.gt=gt;function gt(e,r,t){return compare(e,r,t)>0}t.lt=lt;function lt(e,r,t){return compare(e,r,t)<0}t.eq=eq;function eq(e,r,t){return 0===compare(e,r,t)}t.neq=neq;function neq(e,r,t){return 0!==compare(e,r,t)}t.gte=gte;function gte(e,r,t){return compare(e,r,t)>=0}t.lte=lte;function lte(e,r,t){return compare(e,r,t)<=0}t.cmp=cmp;function cmp(e,r,t,a){switch(r){case"===":"object"===typeof e&&(e=e.version);"object"===typeof t&&(t=t.version);return e===t;case"!==":"object"===typeof e&&(e=e.version);"object"===typeof t&&(t=t.version);return e!==t;case"":case"=":case"==":return eq(e,t,a);case"!=":return neq(e,t,a);case">":return gt(e,t,a);case">=":return gte(e,t,a);case"<":return lt(e,t,a);case"<=":return lte(e,t,a);default:throw new TypeError("Invalid operator: "+r)}}t.Comparator=Comparator;function Comparator(e,t){t&&"object"===typeof t||(t={loose:!!t,includePrerelease:false});if(e instanceof Comparator){if(e.loose===!!t.loose)return e;e=e.value}if(!((this||r)instanceof Comparator))return new Comparator(e,t);e=e.trim().split(/\s+/).join(" ");n("comparator",e,t);(this||r).options=t;(this||r).loose=!!t.loose;this.parse(e);(this||r).semver===ae?(this||r).value="":(this||r).value=(this||r).operator+(this||r).semver.version;n("comp",this||r)}var ae={};Comparator.prototype.parse=function(e){var t=(this||r).options.loose?l[H]:l[J];var a=e.match(t);if(!a)throw new TypeError("Invalid comparator: "+e);(this||r).operator=a[1];"="===(this||r).operator&&((this||r).operator="");a[2]?(this||r).semver=new SemVer(a[2],(this||r).options.loose):(this||r).semver=ae};Comparator.prototype.toString=function(){return(this||r).value};Comparator.prototype.test=function(e){n("Comparator.test",e,(this||r).options.loose);if((this||r).semver===ae)return true;"string"===typeof e&&(e=new SemVer(e,(this||r).options));return cmp(e,(this||r).operator,(this||r).semver,(this||r).options)};Comparator.prototype.intersects=function(e,t){if(!(e instanceof Comparator))throw new TypeError("a Comparator is required");t&&"object"===typeof t||(t={loose:!!t,includePrerelease:false});var a;if(""===(this||r).operator){a=new Range(e.value,t);return satisfies((this||r).value,a,t)}if(""===e.operator){a=new Range((this||r).value,t);return satisfies(e.semver,a,t)}var n=(">="===(this||r).operator||">"===(this||r).operator)&&(">="===e.operator||">"===e.operator);var s=("<="===(this||r).operator||"<"===(this||r).operator)&&("<="===e.operator||"<"===e.operator);var i=(this||r).semver.version===e.semver.version;var o=(">="===(this||r).operator||"<="===(this||r).operator)&&(">="===e.operator||"<="===e.operator);var p=cmp((this||r).semver,"<",e.semver,t)&&(">="===(this||r).operator||">"===(this||r).operator)&&("<="===e.operator||"<"===e.operator);var c=cmp((this||r).semver,">",e.semver,t)&&("<="===(this||r).operator||"<"===(this||r).operator)&&(">="===e.operator||">"===e.operator);return n||s||i&&o||p||c};t.Range=Range;function Range(e,t){t&&"object"===typeof t||(t={loose:!!t,includePrerelease:false});if(e instanceof Range)return e.loose===!!t.loose&&e.includePrerelease===!!t.includePrerelease?e:new Range(e.raw,t);if(e instanceof Comparator)return new Range(e.value,t);if(!((this||r)instanceof Range))return new Range(e,t);(this||r).options=t;(this||r).loose=!!t.loose;(this||r).includePrerelease=!!t.includePrerelease;(this||r).raw=e.trim().split(/\s+/).join(" ");(this||r).set=(this||r).raw.split("||").map((function(e){return this.parseRange(e.trim())}),this||r).filter((function(e){return e.length}));if(!(this||r).set.length)throw new TypeError("Invalid SemVer Range: "+(this||r).raw);this.format()}Range.prototype.format=function(){(this||r).range=(this||r).set.map((function(e){return e.join(" ").trim()})).join("||").trim();return(this||r).range};Range.prototype.toString=function(){return(this||r).range};Range.prototype.parseRange=function(e){var t=(this||r).options.loose;var a=t?l[Y]:l[W];e=e.replace(a,hyphenReplace);n("hyphen replace",e);e=e.replace(l[K],Q);n("comparator trim",e,l[K]);e=e.replace(l[A],D);e=e.replace(l[z],B);var s=t?l[H]:l[J];var i=e.split(" ").map((function(e){return parseComparator(e,(this||r).options)}),this||r).join(" ").split(/\s+/);(this||r).options.loose&&(i=i.filter((function(e){return!!e.match(s)})));i=i.map((function(e){return new Comparator(e,(this||r).options)}),this||r);return i};Range.prototype.intersects=function(e,t){if(!(e instanceof Range))throw new TypeError("a Range is required");return(this||r).set.some((function(r){return r.every((function(r){return e.set.some((function(e){return e.every((function(e){return r.intersects(e,t)}))}))}))}))};t.toComparators=toComparators;function toComparators(e,r){return new Range(e,r).set.map((function(e){return e.map((function(e){return e.value})).join(" ").trim().split(" ")}))}function parseComparator(e,r){n("comp",e,r);e=replaceCarets(e,r);n("caret",e);e=replaceTildes(e,r);n("tildes",e);e=replaceXRanges(e,r);n("xrange",e);e=replaceStars(e,r);n("stars",e);return e}function isX(e){return!e||"x"===e.toLowerCase()||"*"===e}function replaceTildes(e,r){return e.trim().split(/\s+/).map((function(e){return replaceTilde(e,r)})).join(" ")}function replaceTilde(e,r){var t=r.loose?l[G]:l[O];return e.replace(t,(function(r,t,a,s,i){n("tilde",e,r,t,a,s,i);var o;if(isX(t))o="";else if(isX(a))o=">="+t+".0.0 <"+(+t+1)+".0.0";else if(isX(s))o=">="+t+"."+a+".0 <"+t+"."+(+a+1)+".0";else if(i){n("replaceTilde pr",i);o=">="+t+"."+a+"."+s+"-"+i+" <"+t+"."+(+a+1)+".0"}else o=">="+t+"."+a+"."+s+" <"+t+"."+(+a+1)+".0";n("tilde return",o);return o}))}function replaceCarets(e,r){return e.trim().split(/\s+/).map((function(e){return replaceCaret(e,r)})).join(" ")}function replaceCaret(e,r){n("caret",e,r);var t=r.loose?l[F]:l[Z];return e.replace(t,(function(r,t,a,s,i){n("caret",e,r,t,a,s,i);var o;if(isX(t))o="";else if(isX(a))o=">="+t+".0.0 <"+(+t+1)+".0.0";else if(isX(s))o="0"===t?">="+t+"."+a+".0 <"+t+"."+(+a+1)+".0":">="+t+"."+a+".0 <"+(+t+1)+".0.0";else if(i){n("replaceCaret pr",i);o="0"===t?"0"===a?">="+t+"."+a+"."+s+"-"+i+" <"+t+"."+a+"."+(+s+1):">="+t+"."+a+"."+s+"-"+i+" <"+t+"."+(+a+1)+".0":">="+t+"."+a+"."+s+"-"+i+" <"+(+t+1)+".0.0"}else{n("no pr");o="0"===t?"0"===a?">="+t+"."+a+"."+s+" <"+t+"."+a+"."+(+s+1):">="+t+"."+a+"."+s+" <"+t+"."+(+a+1)+".0":">="+t+"."+a+"."+s+" <"+(+t+1)+".0.0"}n("caret return",o);return o}))}function replaceXRanges(e,r){n("replaceXRanges",e,r);return e.split(/\s+/).map((function(e){return replaceXRange(e,r)})).join(" ")}function replaceXRange(e,r){e=e.trim();var t=r.loose?l[_]:l[N];return e.replace(t,(function(r,t,a,s,i,o){n("xRange",e,r,t,a,s,i,o);var p=isX(a);var c=p||isX(s);var l=c||isX(i);var u=l;"="===t&&u&&(t="");if(p)r=">"===t||"<"===t?"<0.0.0":"*";else if(t&&u){c&&(s=0);i=0;if(">"===t){t=">=";if(c){a=+a+1;s=0;i=0}else{s=+s+1;i=0}}else if("<="===t){t="<";c?a=+a+1:s=+s+1}r=t+a+"."+s+"."+i}else c?r=">="+a+".0.0 <"+(+a+1)+".0.0":l&&(r=">="+a+"."+s+".0 <"+a+"."+(+s+1)+".0");n("xRange return",r);return r}))}function replaceStars(e,r){n("replaceStars",e,r);return e.trim().replace(l[ee],"")}function hyphenReplace(e,r,t,a,n,s,i,o,p,c,l,u,f){r=isX(t)?"":isX(a)?">="+t+".0.0":isX(n)?">="+t+"."+a+".0":">="+r;o=isX(p)?"":isX(c)?"<"+(+p+1)+".0.0":isX(l)?"<"+p+"."+(+c+1)+".0":u?"<="+p+"."+c+"."+l+"-"+u:"<="+o;return(r+" "+o).trim()}Range.prototype.test=function(e){if(!e)return false;"string"===typeof e&&(e=new SemVer(e,(this||r).options));for(var t=0;t<(this||r).set.length;t++)if(testSet((this||r).set[t],e,(this||r).options))return true;return false};function testSet(e,r,t){for(var a=0;a<e.length;a++)if(!e[a].test(r))return false;if(r.prerelease.length&&!t.includePrerelease){for(a=0;a<e.length;a++){n(e[a].semver);if(e[a].semver!==ae&&e[a].semver.prerelease.length>0){var s=e[a].semver;if(s.major===r.major&&s.minor===r.minor&&s.patch===r.patch)return true}}return false}return true}t.satisfies=satisfies;function satisfies(e,r,t){try{r=new Range(r,t)}catch(e){return false}return r.test(e)}t.maxSatisfying=maxSatisfying;function maxSatisfying(e,r,t){var a=null;var n=null;try{var s=new Range(r,t)}catch(e){return null}e.forEach((function(e){if(s.test(e)&&(!a||-1===n.compare(e))){a=e;n=new SemVer(a,t)}}));return a}t.minSatisfying=minSatisfying;function minSatisfying(e,r,t){var a=null;var n=null;try{var s=new Range(r,t)}catch(e){return null}e.forEach((function(e){if(s.test(e)&&(!a||1===n.compare(e))){a=e;n=new SemVer(a,t)}}));return a}t.minVersion=minVersion;function minVersion(e,r){e=new Range(e,r);var t=new SemVer("0.0.0");if(e.test(t))return t;t=new SemVer("0.0.0-0");if(e.test(t))return t;t=null;for(var a=0;a<e.set.length;++a){var n=e.set[a];n.forEach((function(e){var r=new SemVer(e.semver.version);switch(e.operator){case">":0===r.prerelease.length?r.patch++:r.prerelease.push(0);r.raw=r.format();case"":case">=":t&&!gt(t,r)||(t=r);break;case"<":case"<=":break;default:throw new Error("Unexpected operation: "+e.operator)}}))}return t&&e.test(t)?t:null}t.validRange=validRange;function validRange(e,r){try{return new Range(e,r).range||"*"}catch(e){return null}}t.ltr=ltr;function ltr(e,r,t){return outside(e,r,"<",t)}t.gtr=gtr;function gtr(e,r,t){return outside(e,r,">",t)}t.outside=outside;function outside(e,r,t,a){e=new SemVer(e,a);r=new Range(r,a);var n,s,i,o,p;switch(t){case">":n=gt;s=lte;i=lt;o=">";p=">=";break;case"<":n=lt;s=gte;i=gt;o="<";p="<=";break;default:throw new TypeError('Must provide a hilo val of "<" or ">"')}if(satisfies(e,r,a))return false;for(var c=0;c<r.set.length;++c){var l=r.set[c];var u=null;var f=null;l.forEach((function(e){e.semver===ae&&(e=new Comparator(">=0.0.0"));u=u||e;f=f||e;n(e.semver,u.semver,a)?u=e:i(e.semver,f.semver,a)&&(f=e)}));if(u.operator===o||u.operator===p)return false;if((!f.operator||f.operator===o)&&s(e,f.semver))return false;if(f.operator===p&&i(e,f.semver))return false}return true}t.prerelease=prerelease;function prerelease(e,r){var t=parse(e,r);return t&&t.prerelease.length?t.prerelease:null}t.intersects=intersects;function intersects(e,r,t){e=new Range(e,t);r=new Range(r,t);return e.intersects(r)}t.coerce=coerce;function coerce(e){if(e instanceof SemVer)return e;if("string"!==typeof e)return null;var r=e.match(l[M]);return null==r?null:parse(r[1]+"."+(r[2]||"0")+"."+(r[3]||"0"))}var ne=t;const se=t.SEMVER_SPEC_VERSION;const ie=t.re,oe=t.safeRe,pe=t.src,ce=t.parse,le=t.valid,ue=t.clean,fe=t.SemVer,me=t.inc,he=t.diff,ve=t.compareIdentifiers,ge=t.rcompareIdentifiers,de=t.major,we=t.minor,Se=t.patch,ye=t.compare,Re=t.compareLoose,Ve=t.rcompare,Ee=t.sort,je=t.rsort,Ce=t.gt,be=t.lt,Ie=t.eq,Xe=t.neq,$e=t.gte,xe=t.lte,Te=t.cmp,ke=t.Comparator,qe=t.Range,Pe=t.toComparators,Ne=t.satisfies,_e=t.maxSatisfying,Me=t.minSatisfying,Le=t.minVersion,Ae=t.validRange,De=t.ltr,Oe=t.gtr,Ge=t.outside,Ue=t.prerelease,ze=t.intersects,Be=t.coerce;export{ke as Comparator,qe as Range,se as SEMVER_SPEC_VERSION,fe as SemVer,ue as clean,Te as cmp,Be as coerce,ye as compare,ve as compareIdentifiers,Re as compareLoose,ne as default,he as diff,Ie as eq,Ce as gt,$e as gte,Oe as gtr,me as inc,ze as intersects,be as lt,xe as lte,De as ltr,de as major,_e as maxSatisfying,Me as minSatisfying,Le as minVersion,we as minor,Xe as neq,Ge as outside,ce as parse,Se as patch,Ue as prerelease,Ve as rcompare,ge as rcompareIdentifiers,ie as re,je as rsort,oe as safeRe,Ne as satisfies,Ee as sort,pe as src,Pe as toComparators,le as valid,Ae as validRange};


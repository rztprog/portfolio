import"color-name";import r from"./conversions.js";var n={};var e=r;function buildGraph(){var r={};var n=Object.keys(e);for(var a=n.length,t=0;t<a;t++)r[n[t]]={distance:-1,parent:null};return r}function deriveBFS(r){var n=buildGraph();var a=[r];n[r].distance=0;while(a.length){var t=a.pop();var o=Object.keys(e[t]);for(var i=o.length,v=0;v<i;v++){var c=o[v];var u=n[c];if(-1===u.distance){u.distance=n[t].distance+1;u.parent=t;a.unshift(c)}}}return n}function link(r,n){return function(e){return n(r(e))}}function wrapConversion(r,n){var a=[n[r].parent,r];var t=e[n[r].parent][r];var o=n[r].parent;while(n[o].parent){a.unshift(n[o].parent);t=link(e[n[o].parent][o],t);o=n[o].parent}t.conversion=a;return t}n=function(r){var n=deriveBFS(r);var e={};var a=Object.keys(n);for(var t=a.length,o=0;o<t;o++){var i=a[o];var v=n[i];null!==v.parent&&(e[i]=wrapConversion(i,n))}return e};var a=n;var t={};var o=r;var i=a;var v={};var c=Object.keys(o);function wrapRaw(r){var wrappedFn=function(n){if(void 0===n||null===n)return n;arguments.length>1&&(n=Array.prototype.slice.call(arguments));return r(n)};"conversion"in r&&(wrappedFn.conversion=r.conversion);return wrappedFn}function wrapRounded(r){var wrappedFn=function(n){if(void 0===n||null===n)return n;arguments.length>1&&(n=Array.prototype.slice.call(arguments));var e=r(n);if("object"===typeof e)for(var a=e.length,t=0;t<a;t++)e[t]=Math.round(e[t]);return e};"conversion"in r&&(wrappedFn.conversion=r.conversion);return wrappedFn}c.forEach((function(r){v[r]={};Object.defineProperty(v[r],"channels",{value:o[r].channels});Object.defineProperty(v[r],"labels",{value:o[r].labels});var n=i(r);var e=Object.keys(n);e.forEach((function(e){var a=n[e];v[r][e]=wrapRounded(a);v[r][e].raw=wrapRaw(a)}))}));t=v;var u=t;export default u;


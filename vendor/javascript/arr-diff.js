var r={};r=function diff(r){var a=arguments.length;var e=0;while(++e<a)r=diffArray(r,arguments[e]);return r};function diffArray(r,a){if(!Array.isArray(a))return r.slice();var e=a.length;var f=r.length;var v=-1;var i=[];while(++v<f){var t=r[v];var n=false;for(var l=0;l<e;l++){var u=a[l];if(t===u){n=true;break}}false===n&&i.push(t)}return i}var a=r;export default a;


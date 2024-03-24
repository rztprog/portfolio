import r from"is-glob";import a from"path";import e from"os";var t={};var o=r;var i=a.posix.dirname;var s="win32"===e.platform();var l="/";var p=/\\/g;var v=/[\{\[].*[\}\]]$/;var f=/(^|[^\\])([\{\[]|\([^\)]+$)/;var m=/\\([\!\*\?\|\[\]\(\)\{\}])/g;
/**
 * @param {string} str
 * @param {Object} opts
 * @param {boolean} [opts.flipBackslashes=true]
 * @returns {string}
 */t=function globParent(r,a){var e=Object.assign({flipBackslashes:true},a);e.flipBackslashes&&s&&r.indexOf(l)<0&&(r=r.replace(p,l));v.test(r)&&(r+=l);r+="a";do{r=i(r)}while(o(r)||f.test(r));return r.replace(m,"$1")};var n=t;export default n;


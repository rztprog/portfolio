var r={};var t={exports:r};(function(){var r,n,e,o,l,u=[].slice;n=function(r,t){return function(){var n,e;e=arguments[0],n=2<=arguments.length?u.call(arguments,1):[];return null!=e?r(e):"function"===typeof t?t.apply(null,n):void 0}};l=function(r,t){return n(r,(function(){var n,e;n=1<=arguments.length?u.call(arguments,0):[];try{return t.apply(null,n)}catch(t){e=t;return r(e)}}))};o=n.bind(null,(function(r){throw r}));e=n((function(r){return console.error(r.stack||r)}));t.exports=r=n;r.iferr=n;r.tiferr=l;r.throwerr=o;r.printerr=e}).call(r);var n=t.exports;const e=t.exports.iferr,o=t.exports.tiferr,l=t.exports.throwerr,u=t.exports.printerr;export default n;export{e as iferr,u as printerr,l as throwerr,o as tiferr};


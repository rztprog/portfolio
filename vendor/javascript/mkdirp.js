import*as r from"path";import*as t from"fs";var e="default"in r?r.default:r;var a="default"in t?t.default:t;var i={};var n=e;var o=a;var d=parseInt("0777",8);i=mkdirP.mkdirp=mkdirP.mkdirP=mkdirP;function mkdirP(r,t,e,a){if("function"===typeof t){e=t;t={}}else t&&"object"===typeof t||(t={mode:t});var i=t.mode;var c=t.fs||o;void 0===i&&(i=d);a||(a=null);var f=e||function(){};r=n.resolve(r);c.mkdir(r,i,(function(e){if(!e){a=a||r;return f(null,a)}switch(e.code){case"ENOENT":if(n.dirname(r)===r)return f(e);mkdirP(n.dirname(r),t,(function(e,a){e?f(e,a):mkdirP(r,t,f,a)}));break;default:c.stat(r,(function(r,t){r||!t.isDirectory()?f(e,a):f(null,a)}));break}}))}mkdirP.sync=function sync(r,t,e){t&&"object"===typeof t||(t={mode:t});var a=t.mode;var i=t.fs||o;void 0===a&&(a=d);e||(e=null);r=n.resolve(r);try{i.mkdirSync(r,a);e=e||r}catch(a){switch(a.code){case"ENOENT":e=sync(n.dirname(r),t,e);sync(r,t,e);break;default:var c;try{c=i.statSync(r)}catch(r){throw a}if(!c.isDirectory())throw a;break}}return e};var c=i;export{c as default};


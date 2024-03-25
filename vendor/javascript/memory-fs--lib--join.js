import t from"./normalize.js";var e={};const r=t;const o=/^[A-Z]:([\\\/]|$)/i;const n=/^\//i;e=function join(t,e){return e?o.test(e)?r(e.replace(/\//g,"\\")):n.test(e)?r(e):"/"==t?r(t+e):o.test(t)?r(t.replace(/\//g,"\\")+"\\"+e.replace(/\//g,"\\")):(n.test(t),r(t+"/"+e)):r(t)};var s=e;export default s;


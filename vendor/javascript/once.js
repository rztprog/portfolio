import e from"wrappy";var r="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var t={};var n=e;t=n(once);t.strict=n(onceStrict);once.proto=once((function(){Object.defineProperty(Function.prototype,"once",{value:function(){return once(this||r)},configurable:true});Object.defineProperty(Function.prototype,"onceStrict",{value:function(){return onceStrict(this||r)},configurable:true})}));function once(e){var f=function(){if(f.called)return f.value;f.called=true;return f.value=e.apply(this||r,arguments)};f.called=false;return f}function onceStrict(e){var f=function(){if(f.called)throw new Error(f.onceError);f.called=true;return f.value=e.apply(this||r,arguments)};var t=e.name||"Function wrapped with `once`";f.onceError=t+" shouldn't be called more than once";f.called=false;return f}var o=t;const c=t.strict;export default o;export{c as strict};


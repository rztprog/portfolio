import e from"@webassemblyjs/wasm-parser";import r from"@webassemblyjs/ast";import t from"@webassemblyjs/wasm-gen/lib/encoder";import o from"@webassemblyjs/helper-buffer";var n={};Object.defineProperty(n,"__esModule",{value:true});n.shrinkPaddedLEB128=shrinkPaddedLEB128;var i=r;var a=t;var s=o;function shiftFollowingSections(e,r,t){var o=r.section;var n=false;(0,i.traverse)(e,{SectionMetadata:function SectionMetadata(r){r.node.section!==o?true===n&&(0,i.shiftSection)(e,r.node,t):n=true}})}function shrinkPaddedLEB128(e,r){(0,i.traverse)(e,{SectionMetadata:function SectionMetadata(t){var o=t.node;var n=(0,a.encodeU32)(o.size.value);var i=n.length;var c=o.size.loc.start.column;var u=o.size.loc.end.column;var f=u-c;if(i!==f){var l=f-i;r=(0,s.overrideBytesInBuffer)(r,c,u,n);shiftFollowingSections(e,o,-l)}}});return r}var c={};Object.defineProperty(c,"__esModule",{value:true});c.shrinkPaddedLEB128=shrinkPaddedLEB128$1;var u=e;var f=n;function _typeof(e){_typeof="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function _typeof(e){return typeof e}:function _typeof(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};return _typeof(e)}function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,r){if(r&&("object"===_typeof(r)||"function"===typeof r))return r;if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _inherits(e,r){if("function"!==typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}});r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}var l=function(e){_inherits(OptimizerError,e);function OptimizerError(e,r){var t;_classCallCheck(this,OptimizerError);t=_possibleConstructorReturn(this,(OptimizerError.__proto__||Object.getPrototypeOf(OptimizerError)).call(this,"Error while optimizing: "+e+": "+r.message));t.stack=r.stack;return t}return OptimizerError}(Error);var d={ignoreCodeSection:true,ignoreDataSection:true};function shrinkPaddedLEB128$1(e){try{var r=(0,u.decode)(e.buffer,d);return(0,f.shrinkPaddedLEB128)(r,e)}catch(e){throw new l("shrinkPaddedLEB128",e)}}const p=c.__esModule;const y=c.shrinkPaddedLEB128;export default c;export{p as __esModule,y as shrinkPaddedLEB128};


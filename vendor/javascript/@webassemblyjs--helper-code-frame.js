import e from"@webassemblyjs/wast-printer";var o={};Object.defineProperty(o,"__esModule",{value:true});o.codeFrameFromAst=codeFrameFromAst;o.codeFrameFromSource=codeFrameFromSource;var r=e;function _typeof(e){_typeof="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function _typeof(e){return typeof e}:function _typeof(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};return _typeof(e)}var t=5;function repeat(e,o){return Array(o).fill(e).join("")}function codeFrameFromAst(e,o){return codeFrameFromSource((0,r.print)(e),o)}function codeFrameFromSource(e,o){var r=o.start,n=o.end;var c=1;"object"===_typeof(n)&&(c=n.column-r.column+1);return e.split("\n").reduce((function(e,o,n){Math.abs(r.line-n)<t&&(e+=o+"\n");if(n===r.line-1){e+=repeat(" ",r.column-1);e+=repeat("^",c);e+="\n"}return e}),"")}const n=o.__esModule;const c=o.codeFrameFromAst,m=o.codeFrameFromSource;export default o;export{n as __esModule,c as codeFrameFromAst,m as codeFrameFromSource};


var t={};t=function(t){t.prototype[Symbol.iterator]=function*(){for(let t=this.head;t;t=t.next)yield t.value}};var e=t;var l={};l=Yallist;Yallist.Node=Node;Yallist.create=Yallist;function Yallist(t){var e=this;e instanceof Yallist||(e=new Yallist);e.tail=null;e.head=null;e.length=0;if(t&&"function"===typeof t.forEach)t.forEach((function(t){e.push(t)}));else if(arguments.length>0)for(var l=0,i=arguments.length;l<i;l++)e.push(arguments[l]);return e}Yallist.prototype.removeNode=function(t){if(t.list!==this)throw new Error("removing node which does not belong to this list");var e=t.next;var l=t.prev;e&&(e.prev=l);l&&(l.next=e);t===this.head&&(this.head=e);t===this.tail&&(this.tail=l);t.list.length--;t.next=null;t.prev=null;t.list=null;return e};Yallist.prototype.unshiftNode=function(t){if(t!==this.head){t.list&&t.list.removeNode(t);var e=this.head;t.list=this;t.next=e;e&&(e.prev=t);this.head=t;this.tail||(this.tail=t);this.length++}};Yallist.prototype.pushNode=function(t){if(t!==this.tail){t.list&&t.list.removeNode(t);var e=this.tail;t.list=this;t.prev=e;e&&(e.next=t);this.tail=t;this.head||(this.head=t);this.length++}};Yallist.prototype.push=function(){for(var t=0,e=arguments.length;t<e;t++)push(this,arguments[t]);return this.length};Yallist.prototype.unshift=function(){for(var t=0,e=arguments.length;t<e;t++)unshift(this,arguments[t]);return this.length};Yallist.prototype.pop=function(){if(this.tail){var t=this.tail.value;this.tail=this.tail.prev;this.tail?this.tail.next=null:this.head=null;this.length--;return t}};Yallist.prototype.shift=function(){if(this.head){var t=this.head.value;this.head=this.head.next;this.head?this.head.prev=null:this.tail=null;this.length--;return t}};Yallist.prototype.forEach=function(t,e){e=e||this;for(var l=this.head,i=0;null!==l;i++){t.call(e,l.value,i,this);l=l.next}};Yallist.prototype.forEachReverse=function(t,e){e=e||this;for(var l=this.tail,i=this.length-1;null!==l;i--){t.call(e,l.value,i,this);l=l.prev}};Yallist.prototype.get=function(t){for(var e=0,l=this.head;null!==l&&e<t;e++)l=l.next;if(e===t&&null!==l)return l.value};Yallist.prototype.getReverse=function(t){for(var e=0,l=this.tail;null!==l&&e<t;e++)l=l.prev;if(e===t&&null!==l)return l.value};Yallist.prototype.map=function(t,e){e=e||this;var l=new Yallist;for(var i=this.head;null!==i;){l.push(t.call(e,i.value,this));i=i.next}return l};Yallist.prototype.mapReverse=function(t,e){e=e||this;var l=new Yallist;for(var i=this.tail;null!==i;){l.push(t.call(e,i.value,this));i=i.prev}return l};Yallist.prototype.reduce=function(t,e){var l;var i=this.head;if(arguments.length>1)l=e;else{if(!this.head)throw new TypeError("Reduce of empty list with no initial value");i=this.head.next;l=this.head.value}for(var n=0;null!==i;n++){l=t(l,i.value,n);i=i.next}return l};Yallist.prototype.reduceReverse=function(t,e){var l;var i=this.tail;if(arguments.length>1)l=e;else{if(!this.tail)throw new TypeError("Reduce of empty list with no initial value");i=this.tail.prev;l=this.tail.value}for(var n=this.length-1;null!==i;n--){l=t(l,i.value,n);i=i.prev}return l};Yallist.prototype.toArray=function(){var t=new Array(this.length);for(var e=0,l=this.head;null!==l;e++){t[e]=l.value;l=l.next}return t};Yallist.prototype.toArrayReverse=function(){var t=new Array(this.length);for(var e=0,l=this.tail;null!==l;e++){t[e]=l.value;l=l.prev}return t};Yallist.prototype.slice=function(t,e){e=e||this.length;e<0&&(e+=this.length);t=t||0;t<0&&(t+=this.length);var l=new Yallist;if(e<t||e<0)return l;t<0&&(t=0);e>this.length&&(e=this.length);for(var i=0,n=this.head;null!==n&&i<t;i++)n=n.next;for(;null!==n&&i<e;i++,n=n.next)l.push(n.value);return l};Yallist.prototype.sliceReverse=function(t,e){e=e||this.length;e<0&&(e+=this.length);t=t||0;t<0&&(t+=this.length);var l=new Yallist;if(e<t||e<0)return l;t<0&&(t=0);e>this.length&&(e=this.length);for(var i=this.length,n=this.tail;null!==n&&i>e;i--)n=n.prev;for(;null!==n&&i>t;i--,n=n.prev)l.push(n.value);return l};Yallist.prototype.splice=function(t,e){t>this.length&&(t=this.length-1);t<0&&(t=this.length+t);for(var l=0,i=this.head;null!==i&&l<t;l++)i=i.next;var n=[];for(var l=0;i&&l<e;l++){n.push(i.value);i=this.removeNode(i)}null===i&&(i=this.tail);i!==this.head&&i!==this.tail&&(i=i.prev);for(var l=2;l<arguments.length;l++)i=insert(this,i,arguments[l]);return n};Yallist.prototype.reverse=function(){var t=this.head;var e=this.tail;for(var l=t;null!==l;l=l.prev){var i=l.prev;l.prev=l.next;l.next=i}this.head=e;this.tail=t;return this};function insert(t,e,l){var i=e===t.head?new Node(l,null,e,t):new Node(l,e,e.next,t);null===i.next&&(t.tail=i);null===i.prev&&(t.head=i);t.length++;return i}function push(t,e){t.tail=new Node(e,t.tail,null,t);t.head||(t.head=t.tail);t.length++}function unshift(t,e){t.head=new Node(e,null,t.head,t);t.tail||(t.tail=t.head);t.length++}function Node(t,e,l,i){if(!(this instanceof Node))return new Node(t,e,l,i);this.list=i;this.value=t;if(e){e.next=this;this.prev=e}else this.prev=null;if(l){l.prev=this;this.next=l}else this.next=null}try{e(Yallist)}catch(t){}var i=l;export default i;


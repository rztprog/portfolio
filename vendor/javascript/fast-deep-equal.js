var r={};r=function equal(r,e){if(r===e)return true;if(r&&e&&"object"==typeof r&&"object"==typeof e){if(r.constructor!==e.constructor)return false;var t,f,u;if(Array.isArray(r)){t=r.length;if(t!=e.length)return false;for(f=t;0!==f--;)if(!equal(r[f],e[f]))return false;return true}if(r.constructor===RegExp)return r.source===e.source&&r.flags===e.flags;if(r.valueOf!==Object.prototype.valueOf)return r.valueOf()===e.valueOf();if(r.toString!==Object.prototype.toString)return r.toString()===e.toString();u=Object.keys(r);t=u.length;if(t!==Object.keys(e).length)return false;for(f=t;0!==f--;)if(!Object.prototype.hasOwnProperty.call(e,u[f]))return false;for(f=t;0!==f--;){var o=u[f];if(!equal(r[o],e[o]))return false}return true}return r!==r&&e!==e};var e=r;export default e;


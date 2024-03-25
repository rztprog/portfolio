import"buffer";import"./keywords/instanceof.js";import r from"./keywords/index.js";import"./keywords/typeof.js";import"./keywords/uniqueItemProperties.js";var e={};var o=r;e=defineKeywords;
/**
 * Defines one or several keywords in ajv instance
 * @param  {Ajv} ajv validator instance
 * @param  {String|Array<String>|undefined} keyword keyword(s) to define
 * @return {Ajv} ajv instance (for chaining)
 */function defineKeywords(r,e){if(Array.isArray(e)){for(var t=0;t<e.length;t++)get(e[t])(r);return r}if(e){get(e)(r);return r}for(e in o)get(e)(r);return r}defineKeywords.get=get;function get(r){var e=o[r];if(!e)throw new Error("Unknown keyword "+r);return e}var t=e;export default t;


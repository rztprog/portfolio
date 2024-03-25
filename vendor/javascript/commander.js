import*as t from"events";import*as e from"child_process";import*as i from"path";import*as n from"fs";import*as s from"process";import r from"buffer";var o={};class CommanderError$2 extends Error{
/**
   * Constructs the CommanderError class
   * @param {number} exitCode suggested exit code which could be used with process.exit
   * @param {string} code an id string representing the error
   * @param {string} message human-readable description of the error
   * @constructor
   */
constructor(t,e,i){super(i);Error.captureStackTrace(this,this.constructor);this.name=this.constructor.name;this.code=e;this.exitCode=t;this.nestedError=void 0}}class InvalidArgumentError$3 extends CommanderError$2{
/**
   * Constructs the InvalidArgumentError class
   * @param {string} [message] explanation of why argument is invalid
   * @constructor
   */
constructor(t){super(1,"commander.invalidArgument",t);Error.captureStackTrace(this,this.constructor);this.name=this.constructor.name}}o.CommanderError=CommanderError$2;o.InvalidArgumentError=InvalidArgumentError$3;var a={};const{InvalidArgumentError:h}=o;class Argument$2{
/**
   * Initialize a new command argument with the given name and description.
   * The default is that the argument is required, and you can explicitly
   * indicate this with <> around the name. Put [] around the name for an optional argument.
   *
   * @param {string} name
   * @param {string} [description]
   */
constructor(t,e){this.description=e||"";this.variadic=false;this.parseArg=void 0;this.defaultValue=void 0;this.defaultValueDescription=void 0;this.argChoices=void 0;switch(t[0]){case"<":this.required=true;this._name=t.slice(1,-1);break;case"[":this.required=false;this._name=t.slice(1,-1);break;default:this.required=true;this._name=t;break}if(this._name.length>3&&"..."===this._name.slice(-3)){this.variadic=true;this._name=this._name.slice(0,-3)}}name(){return this._name}_concatValue(t,e){return e!==this.defaultValue&&Array.isArray(e)?e.concat(t):[t]}
/**
   * Set the default value, and optionally supply the description to be displayed in the help.
   *
   * @param {any} value
   * @param {string} [description]
   * @return {Argument}
   */default(t,e){this.defaultValue=t;this.defaultValueDescription=e;return this}
/**
   * Set the custom handler for processing CLI command arguments into argument values.
   *
   * @param {Function} [fn]
   * @return {Argument}
   */argParser(t){this.parseArg=t;return this}
/**
   * Only allow argument value to be one of choices.
   *
   * @param {string[]} values
   * @return {Argument}
   */choices(t){this.argChoices=t.slice();this.parseArg=(t,e)=>{if(!this.argChoices.includes(t))throw new h(`Allowed choices are ${this.argChoices.join(", ")}.`);return this.variadic?this._concatValue(t,e):t};return this}argRequired(){this.required=true;return this}argOptional(){this.required=false;return this}}
/**
 * Takes an argument and returns its human readable equivalent for help usage.
 *
 * @param {Argument} arg
 * @return {string}
 * @api private
 */function humanReadableArgName$2(t){const e=t.name()+(true===t.variadic?"...":"");return t.required?"<"+e+">":"["+e+"]"}a.Argument=Argument$2;a.humanReadableArgName=humanReadableArgName$2;var l={};const{humanReadableArgName:c}=a;
/**
 * TypeScript import types for JSDoc, used by Visual Studio Code IntelliSense and `npm run typescript-checkJS`
 * https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#import-types
 * @typedef { import("./argument.js").Argument } Argument
 * @typedef { import("./command.js").Command } Command
 * @typedef { import("./option.js").Option } Option
 */class Help$2{constructor(){this.helpWidth=void 0;this.sortSubcommands=false;this.sortOptions=false;this.showGlobalOptions=false}
/**
   * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
   *
   * @param {Command} cmd
   * @returns {Command[]}
   */visibleCommands(t){const e=t.commands.filter((t=>!t._hidden));if(t._hasImplicitHelpCommand()){const[,i,n]=t._helpCommandnameAndArgs.match(/([^ ]+) *(.*)/);const s=t.createCommand(i).helpOption(false);s.description(t._helpCommandDescription);n&&s.arguments(n);e.push(s)}this.sortSubcommands&&e.sort(((t,e)=>t.name().localeCompare(e.name())));return e}
/**
   * Compare options for sort.
   *
   * @param {Option} a
   * @param {Option} b
   * @returns number
   */compareOptions(t,e){const getSortKey=t=>t.short?t.short.replace(/^-/,""):t.long.replace(/^--/,"");return getSortKey(t).localeCompare(getSortKey(e))}
/**
   * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
   *
   * @param {Command} cmd
   * @returns {Option[]}
   */visibleOptions(t){const e=t.options.filter((t=>!t.hidden));const i=t._hasHelpOption&&t._helpShortFlag&&!t._findOption(t._helpShortFlag);const n=t._hasHelpOption&&!t._findOption(t._helpLongFlag);if(i||n){let s;s=i?n?t.createOption(t._helpFlags,t._helpDescription):t.createOption(t._helpShortFlag,t._helpDescription):t.createOption(t._helpLongFlag,t._helpDescription);e.push(s)}this.sortOptions&&e.sort(this.compareOptions);return e}
/**
   * Get an array of the visible global options. (Not including help.)
   *
   * @param {Command} cmd
   * @returns {Option[]}
   */visibleGlobalOptions(t){if(!this.showGlobalOptions)return[];const e=[];for(let i=t.parent;i;i=i.parent){const t=i.options.filter((t=>!t.hidden));e.push(...t)}this.sortOptions&&e.sort(this.compareOptions);return e}
/**
   * Get an array of the arguments if any have a description.
   *
   * @param {Command} cmd
   * @returns {Argument[]}
   */visibleArguments(t){t._argsDescription&&t._args.forEach((e=>{e.description=e.description||t._argsDescription[e.name()]||""}));return t._args.find((t=>t.description))?t._args:[]}
/**
   * Get the command term to show in the list of subcommands.
   *
   * @param {Command} cmd
   * @returns {string}
   */subcommandTerm(t){const e=t._args.map((t=>c(t))).join(" ");return t._name+(t._aliases[0]?"|"+t._aliases[0]:"")+(t.options.length?" [options]":"")+(e?" "+e:"")}
/**
   * Get the option term to show in the list of options.
   *
   * @param {Option} option
   * @returns {string}
   */optionTerm(t){return t.flags}
/**
   * Get the argument term to show in the list of arguments.
   *
   * @param {Argument} argument
   * @returns {string}
   */argumentTerm(t){return t.name()}
/**
   * Get the longest command term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */longestSubcommandTermLength(t,e){return e.visibleCommands(t).reduce(((t,i)=>Math.max(t,e.subcommandTerm(i).length)),0)}
/**
   * Get the longest option term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */longestOptionTermLength(t,e){return e.visibleOptions(t).reduce(((t,i)=>Math.max(t,e.optionTerm(i).length)),0)}
/**
   * Get the longest global option term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */longestGlobalOptionTermLength(t,e){return e.visibleGlobalOptions(t).reduce(((t,i)=>Math.max(t,e.optionTerm(i).length)),0)}
/**
   * Get the longest argument term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */longestArgumentTermLength(t,e){return e.visibleArguments(t).reduce(((t,i)=>Math.max(t,e.argumentTerm(i).length)),0)}
/**
   * Get the command usage to be displayed at the top of the built-in help.
   *
   * @param {Command} cmd
   * @returns {string}
   */commandUsage(t){let e=t._name;t._aliases[0]&&(e=e+"|"+t._aliases[0]);let i="";for(let e=t.parent;e;e=e.parent)i=e.name()+" "+i;return i+e+" "+t.usage()}
/**
   * Get the description for the command.
   *
   * @param {Command} cmd
   * @returns {string}
   */commandDescription(t){return t.description()}
/**
   * Get the subcommand summary to show in the list of subcommands.
   * (Fallback to description for backwards compatibility.)
   *
   * @param {Command} cmd
   * @returns {string}
   */subcommandDescription(t){return t.summary()||t.description()}
/**
   * Get the option description to show in the list of options.
   *
   * @param {Option} option
   * @return {string}
   */optionDescription(t){const e=[];t.argChoices&&e.push(`choices: ${t.argChoices.map((t=>JSON.stringify(t))).join(", ")}`);if(void 0!==t.defaultValue){const i=t.required||t.optional||t.isBoolean()&&"boolean"===typeof t.defaultValue;i&&e.push(`default: ${t.defaultValueDescription||JSON.stringify(t.defaultValue)}`)}void 0!==t.presetArg&&t.optional&&e.push(`preset: ${JSON.stringify(t.presetArg)}`);void 0!==t.envVar&&e.push(`env: ${t.envVar}`);return e.length>0?`${t.description} (${e.join(", ")})`:t.description}
/**
   * Get the argument description to show in the list of arguments.
   *
   * @param {Argument} argument
   * @return {string}
   */argumentDescription(t){const e=[];t.argChoices&&e.push(`choices: ${t.argChoices.map((t=>JSON.stringify(t))).join(", ")}`);void 0!==t.defaultValue&&e.push(`default: ${t.defaultValueDescription||JSON.stringify(t.defaultValue)}`);if(e.length>0){const i=`(${e.join(", ")})`;return t.description?`${t.description} ${i}`:i}return t.description}
/**
   * Generate the built-in help text.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {string}
   */formatHelp(t,e){const i=e.padWidth(t,e);const n=e.helpWidth||80;const s=2;const r=2;function formatItem(t,o){if(o){const a=`${t.padEnd(i+r)}${o}`;return e.wrap(a,n-s,i+r)}return t}function formatList(t){return t.join("\n").replace(/^/gm," ".repeat(s))}let o=[`Usage: ${e.commandUsage(t)}`,""];const a=e.commandDescription(t);a.length>0&&(o=o.concat([e.wrap(a,n,0),""]));const h=e.visibleArguments(t).map((t=>formatItem(e.argumentTerm(t),e.argumentDescription(t))));h.length>0&&(o=o.concat(["Arguments:",formatList(h),""]));const l=e.visibleOptions(t).map((t=>formatItem(e.optionTerm(t),e.optionDescription(t))));l.length>0&&(o=o.concat(["Options:",formatList(l),""]));if(this.showGlobalOptions){const i=e.visibleGlobalOptions(t).map((t=>formatItem(e.optionTerm(t),e.optionDescription(t))));i.length>0&&(o=o.concat(["Global Options:",formatList(i),""]))}const c=e.visibleCommands(t).map((t=>formatItem(e.subcommandTerm(t),e.subcommandDescription(t))));c.length>0&&(o=o.concat(["Commands:",formatList(c),""]));return o.join("\n")}
/**
   * Calculate the pad width from the maximum term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */padWidth(t,e){return Math.max(e.longestOptionTermLength(t,e),e.longestGlobalOptionTermLength(t,e),e.longestSubcommandTermLength(t,e),e.longestArgumentTermLength(t,e))}
/**
   * Wrap the given string to width characters per line, with lines after the first indented.
   * Do not wrap if insufficient room for wrapping (minColumnWidth), or string is manually formatted.
   *
   * @param {string} str
   * @param {number} width
   * @param {number} indent
   * @param {number} [minColumnWidth=40]
   * @return {string}
   *
   */wrap(t,e,i,n=40){const s=" \\f\\t\\v   -   　\ufeff";const r=new RegExp(`[\\n][${s}]+`);if(t.match(r))return t;const o=e-i;if(o<n)return t;const a=t.slice(0,i);const h=t.slice(i).replace("\r\n","\n");const l=" ".repeat(i);const c="​";const u=`\\s${c}`;const p=new RegExp(`\n|.{1,${o-1}}([${u}]|$)|[^${u}]+?([${u}]|$)`,"g");const m=h.match(p)||[];return a+m.map(((t,e)=>"\n"===t?"":(e>0?l:"")+t.trimEnd())).join("\n")}}l.Help=Help$2;var u={};const{InvalidArgumentError:p}=o;class Option$2{
/**
   * Initialize a new `Option` with the given `flags` and `description`.
   *
   * @param {string} flags
   * @param {string} [description]
   */
constructor(t,e){this.flags=t;this.description=e||"";this.required=t.includes("<");this.optional=t.includes("[");this.variadic=/\w\.\.\.[>\]]$/.test(t);this.mandatory=false;const i=splitOptionFlags$1(t);this.short=i.shortFlag;this.long=i.longFlag;this.negate=false;this.long&&(this.negate=this.long.startsWith("--no-"));this.defaultValue=void 0;this.defaultValueDescription=void 0;this.presetArg=void 0;this.envVar=void 0;this.parseArg=void 0;this.hidden=false;this.argChoices=void 0;this.conflictsWith=[];this.implied=void 0}
/**
   * Set the default value, and optionally supply the description to be displayed in the help.
   *
   * @param {any} value
   * @param {string} [description]
   * @return {Option}
   */default(t,e){this.defaultValue=t;this.defaultValueDescription=e;return this}
/**
   * Preset to use when option used without option-argument, especially optional but also boolean and negated.
   * The custom processing (parseArg) is called.
   *
   * @example
   * new Option('--color').default('GREYSCALE').preset('RGB');
   * new Option('--donate [amount]').preset('20').argParser(parseFloat);
   *
   * @param {any} arg
   * @return {Option}
   */preset(t){this.presetArg=t;return this}
/**
   * Add option name(s) that conflict with this option.
   * An error will be displayed if conflicting options are found during parsing.
   *
   * @example
   * new Option('--rgb').conflicts('cmyk');
   * new Option('--js').conflicts(['ts', 'jsx']);
   *
   * @param {string | string[]} names
   * @return {Option}
   */conflicts(t){this.conflictsWith=this.conflictsWith.concat(t);return this}
/**
   * Specify implied option values for when this option is set and the implied options are not.
   *
   * The custom processing (parseArg) is not called on the implied values.
   *
   * @example
   * program
   *   .addOption(new Option('--log', 'write logging information to file'))
   *   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
   *
   * @param {Object} impliedOptionValues
   * @return {Option}
   */implies(t){let e=t;"string"===typeof t&&(e={[t]:true});this.implied=Object.assign(this.implied||{},e);return this}
/**
   * Set environment variable to check for option value.
   *
   * An environment variable is only used if when processed the current option value is
   * undefined, or the source of the current value is 'default' or 'config' or 'env'.
   *
   * @param {string} name
   * @return {Option}
   */env(t){this.envVar=t;return this}
/**
   * Set the custom handler for processing CLI option arguments into option values.
   *
   * @param {Function} [fn]
   * @return {Option}
   */argParser(t){this.parseArg=t;return this}
/**
   * Whether the option is mandatory and must have a value after parsing.
   *
   * @param {boolean} [mandatory=true]
   * @return {Option}
   */makeOptionMandatory(t=true){this.mandatory=!!t;return this}
/**
   * Hide option in help.
   *
   * @param {boolean} [hide=true]
   * @return {Option}
   */hideHelp(t=true){this.hidden=!!t;return this}_concatValue(t,e){return e!==this.defaultValue&&Array.isArray(e)?e.concat(t):[t]}
/**
   * Only allow option value to be one of choices.
   *
   * @param {string[]} values
   * @return {Option}
   */choices(t){this.argChoices=t.slice();this.parseArg=(t,e)=>{if(!this.argChoices.includes(t))throw new p(`Allowed choices are ${this.argChoices.join(", ")}.`);return this.variadic?this._concatValue(t,e):t};return this}name(){return this.long?this.long.replace(/^--/,""):this.short.replace(/^-/,"")}attributeName(){return camelcase(this.name().replace(/^no-/,""))}
/**
   * Check if `arg` matches the short or long flag.
   *
   * @param {string} arg
   * @return {boolean}
   * @api private
   */is(t){return this.short===t||this.long===t}isBoolean(){return!this.required&&!this.optional&&!this.negate}}class DualOptions$1{
/**
   * @param {Option[]} options
   */
constructor(t){this.positiveOptions=new Map;this.negativeOptions=new Map;this.dualOptions=new Set;t.forEach((t=>{t.negate?this.negativeOptions.set(t.attributeName(),t):this.positiveOptions.set(t.attributeName(),t)}));this.negativeOptions.forEach(((t,e)=>{this.positiveOptions.has(e)&&this.dualOptions.add(e)}))}
/**
   * Did the value come from the option, and not from possible matching dual option?
   *
   * @param {any} value
   * @param {Option} option
   * @returns {boolean}
   */valueFromOption(t,e){const i=e.attributeName();if(!this.dualOptions.has(i))return true;const n=this.negativeOptions.get(i).presetArg;const s=void 0!==n&&n;return e.negate===(s===t)}}
/**
 * Convert string from kebab-case to camelCase.
 *
 * @param {string} str
 * @return {string}
 * @api private
 */function camelcase(t){return t.split("-").reduce(((t,e)=>t+e[0].toUpperCase()+e.slice(1)))}function splitOptionFlags$1(t){let e;let i;const n=t.split(/[ |,]+/);n.length>1&&!/^[[<]/.test(n[1])&&(e=n.shift());i=n.shift();if(!e&&/^-[^-]$/.test(i)){e=i;i=void 0}return{shortFlag:e,longFlag:i}}u.Option=Option$2;u.splitOptionFlags=splitOptionFlags$1;u.DualOptions=DualOptions$1;var m={};const d=3;function editDistance(t,e){if(Math.abs(t.length-e.length)>d)return Math.max(t.length,e.length);const i=[];for(let e=0;e<=t.length;e++)i[e]=[e];for(let t=0;t<=e.length;t++)i[0][t]=t;for(let n=1;n<=e.length;n++)for(let s=1;s<=t.length;s++){let r=1;r=t[s-1]===e[n-1]?0:1;i[s][n]=Math.min(i[s-1][n]+1,i[s][n-1]+1,i[s-1][n-1]+r);s>1&&n>1&&t[s-1]===e[n-2]&&t[s-2]===e[n-1]&&(i[s][n]=Math.min(i[s][n],i[s-2][n-2]+1))}return i[t.length][e.length]}
/**
 * Find close matches, restricted to same number of edits.
 *
 * @param {string} word
 * @param {string[]} candidates
 * @returns {string}
 */function suggestSimilar$1(t,e){if(!e||0===e.length)return"";e=Array.from(new Set(e));const i=t.startsWith("--");if(i){t=t.slice(2);e=e.map((t=>t.slice(2)))}let n=[];let s=d;const r=.4;e.forEach((e=>{if(e.length<=1)return;const i=editDistance(t,e);const o=Math.max(t.length,e.length);const a=(o-i)/o;if(a>r)if(i<s){s=i;n=[e]}else i===s&&n.push(e)}));n.sort(((t,e)=>t.localeCompare(e)));i&&(n=n.map((t=>`--${t}`)));return n.length>1?`\n(Did you mean one of ${n.join(", ")}?)`:1===n.length?`\n(Did you mean ${n[0]}?)`:""}m.suggestSimilar=suggestSimilar$1;var g="default"in t?t.default:t;var f="default"in e?e.default:e;var _="default"in i?i.default:i;var O="default"in n?n.default:n;var v="default"in s?s.default:s;var C={};var b=r.Buffer;const A=g.EventEmitter;const w=f;const $=_;const E=O;const x=v;const{Argument:H,humanReadableArgName:y}=a;const{CommanderError:V}=o;const{Help:k}=l;const{Option:S,splitOptionFlags:F,DualOptions:D}=u;const{suggestSimilar:N}=m;class Command$1 extends A{
/**
   * Initialize a new `Command`.
   *
   * @param {string} [name]
   */
constructor(t){super();
/** @type {Command[]} */this.commands=[];
/** @type {Option[]} */this.options=[];this.parent=null;this._allowUnknownOption=false;this._allowExcessArguments=true;
/** @type {Argument[]} */this._args=[];
/** @type {string[]} */this.args=[];this.rawArgs=[];this.processedArgs=[];this._scriptPath=null;this._name=t||"";this._optionValues={};this._optionValueSources={};this._storeOptionsAsProperties=false;this._actionHandler=null;this._executableHandler=false;this._executableFile=null;this._executableDir=null;this._defaultCommandName=null;this._exitCallback=null;this._aliases=[];this._combineFlagAndOptionalValue=true;this._description="";this._summary="";this._argsDescription=void 0;this._enablePositionalOptions=false;this._passThroughOptions=false;this._lifeCycleHooks={};
/** @type {boolean | string} */this._showHelpAfterError=false;this._showSuggestionAfterError=true;this._outputConfiguration={writeOut:t=>x.stdout.write(t),writeErr:t=>x.stderr.write(t),getOutHelpWidth:()=>x.stdout.isTTY?x.stdout.columns:void 0,getErrHelpWidth:()=>x.stderr.isTTY?x.stderr.columns:void 0,outputError:(t,e)=>e(t)};this._hidden=false;this._hasHelpOption=true;this._helpFlags="-h, --help";this._helpDescription="display help for command";this._helpShortFlag="-h";this._helpLongFlag="--help";this._addImplicitHelpCommand=void 0;this._helpCommandName="help";this._helpCommandnameAndArgs="help [command]";this._helpCommandDescription="display help for command";this._helpConfiguration={}}
/**
   * Copy settings that are useful to have in common across root command and subcommands.
   *
   * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
   *
   * @param {Command} sourceCommand
   * @return {Command} `this` command for chaining
   */copyInheritedSettings(t){this._outputConfiguration=t._outputConfiguration;this._hasHelpOption=t._hasHelpOption;this._helpFlags=t._helpFlags;this._helpDescription=t._helpDescription;this._helpShortFlag=t._helpShortFlag;this._helpLongFlag=t._helpLongFlag;this._helpCommandName=t._helpCommandName;this._helpCommandnameAndArgs=t._helpCommandnameAndArgs;this._helpCommandDescription=t._helpCommandDescription;this._helpConfiguration=t._helpConfiguration;this._exitCallback=t._exitCallback;this._storeOptionsAsProperties=t._storeOptionsAsProperties;this._combineFlagAndOptionalValue=t._combineFlagAndOptionalValue;this._allowExcessArguments=t._allowExcessArguments;this._enablePositionalOptions=t._enablePositionalOptions;this._showHelpAfterError=t._showHelpAfterError;this._showSuggestionAfterError=t._showSuggestionAfterError;return this}
/**
   * Define a command.
   *
   * There are two styles of command: pay attention to where to put the description.
   *
   * @example
   * // Command implemented using action handler (description is supplied separately to `.command`)
   * program
   *   .command('clone <source> [destination]')
   *   .description('clone a repository into a newly created directory')
   *   .action((source, destination) => {
   *     console.log('clone command called');
   *   });
   *
   * // Command implemented using separate executable file (description is second parameter to `.command`)
   * program
   *   .command('start <service>', 'start named service')
   *   .command('stop [service]', 'stop named service, or all if no name supplied');
   *
   * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
   * @param {Object|string} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
   * @param {Object} [execOpts] - configuration options (for executable)
   * @return {Command} returns new command for action handler, or `this` for executable command
   */command(t,e,i){let n=e;let s=i;if("object"===typeof n&&null!==n){s=n;n=null}s=s||{};const[,r,o]=t.match(/([^ ]+) *(.*)/);const a=this.createCommand(r);if(n){a.description(n);a._executableHandler=true}s.isDefault&&(this._defaultCommandName=a._name);a._hidden=!!(s.noHelp||s.hidden);a._executableFile=s.executableFile||null;o&&a.arguments(o);this.commands.push(a);a.parent=this;a.copyInheritedSettings(this);return n?this:a}
/**
   * Factory routine to create a new unattached command.
   *
   * See .command() for creating an attached subcommand, which uses this routine to
   * create the command. You can override createCommand to customise subcommands.
   *
   * @param {string} [name]
   * @return {Command} new command
   */createCommand(t){return new Command$1(t)}createHelp(){return Object.assign(new k,this.configureHelp())}
/**
   * You can customise the help by overriding Help properties using configureHelp(),
   * or with a subclass of Help by overriding createHelp().
   *
   * @param {Object} [configuration] - configuration options
   * @return {Command|Object} `this` command for chaining, or stored configuration
   */configureHelp(t){if(void 0===t)return this._helpConfiguration;this._helpConfiguration=t;return this}
/**
   * The default output goes to stdout and stderr. You can customise this for special
   * applications. You can also customise the display of errors by overriding outputError.
   *
   * The configuration properties are all functions:
   *
   *     // functions to change where being written, stdout and stderr
   *     writeOut(str)
   *     writeErr(str)
   *     // matching functions to specify width for wrapping help
   *     getOutHelpWidth()
   *     getErrHelpWidth()
   *     // functions based on what is being written out
   *     outputError(str, write) // used for displaying errors, and not used for displaying help
   *
   * @param {Object} [configuration] - configuration options
   * @return {Command|Object} `this` command for chaining, or stored configuration
   */configureOutput(t){if(void 0===t)return this._outputConfiguration;Object.assign(this._outputConfiguration,t);return this}
/**
   * Display the help or a custom message after an error occurs.
   *
   * @param {boolean|string} [displayHelp]
   * @return {Command} `this` command for chaining
   */showHelpAfterError(t=true){"string"!==typeof t&&(t=!!t);this._showHelpAfterError=t;return this}
/**
   * Display suggestion of similar commands for unknown commands, or options for unknown options.
   *
   * @param {boolean} [displaySuggestion]
   * @return {Command} `this` command for chaining
   */showSuggestionAfterError(t=true){this._showSuggestionAfterError=!!t;return this}
/**
   * Add a prepared subcommand.
   *
   * See .command() for creating an attached subcommand which inherits settings from its parent.
   *
   * @param {Command} cmd - new subcommand
   * @param {Object} [opts] - configuration options
   * @return {Command} `this` command for chaining
   */addCommand(t,e){if(!t._name)throw new Error("Command passed to .addCommand() must have a name\n- specify the name in Command constructor or using .name()");e=e||{};e.isDefault&&(this._defaultCommandName=t._name);(e.noHelp||e.hidden)&&(t._hidden=true);this.commands.push(t);t.parent=this;return this}
/**
   * Factory routine to create a new unattached argument.
   *
   * See .argument() for creating an attached argument, which uses this routine to
   * create the argument. You can override createArgument to return a custom argument.
   *
   * @param {string} name
   * @param {string} [description]
   * @return {Argument} new argument
   */createArgument(t,e){return new H(t,e)}
/**
   * Define argument syntax for command.
   *
   * The default is that the argument is required, and you can explicitly
   * indicate this with <> around the name. Put [] around the name for an optional argument.
   *
   * @example
   * program.argument('<input-file>');
   * program.argument('[output-file]');
   *
   * @param {string} name
   * @param {string} [description]
   * @param {Function|*} [fn] - custom argument processing function
   * @param {*} [defaultValue]
   * @return {Command} `this` command for chaining
   */argument(t,e,i,n){const s=this.createArgument(t,e);"function"===typeof i?s.default(n).argParser(i):s.default(i);this.addArgument(s);return this}
/**
   * Define argument syntax for command, adding multiple at once (without descriptions).
   *
   * See also .argument().
   *
   * @example
   * program.arguments('<cmd> [env]');
   *
   * @param {string} names
   * @return {Command} `this` command for chaining
   */arguments(t){t.split(/ +/).forEach((t=>{this.argument(t)}));return this}
/**
   * Define argument syntax for command, adding a prepared argument.
   *
   * @param {Argument} argument
   * @return {Command} `this` command for chaining
   */addArgument(t){const e=this._args.slice(-1)[0];if(e&&e.variadic)throw new Error(`only the last argument can be variadic '${e.name()}'`);if(t.required&&void 0!==t.defaultValue&&void 0===t.parseArg)throw new Error(`a default value for a required argument is never used: '${t.name()}'`);this._args.push(t);return this}addHelpCommand(t,e){if(false===t)this._addImplicitHelpCommand=false;else{this._addImplicitHelpCommand=true;if("string"===typeof t){this._helpCommandName=t.split(" ")[0];this._helpCommandnameAndArgs=t}this._helpCommandDescription=e||this._helpCommandDescription}return this}_hasImplicitHelpCommand(){return void 0===this._addImplicitHelpCommand?this.commands.length&&!this._actionHandler&&!this._findCommand("help"):this._addImplicitHelpCommand}
/**
   * Add hook for life cycle event.
   *
   * @param {string} event
   * @param {Function} listener
   * @return {Command} `this` command for chaining
   */hook(t,e){const i=["preSubcommand","preAction","postAction"];if(!i.includes(t))throw new Error(`Unexpected value for event passed to hook : '${t}'.\nExpecting one of '${i.join("', '")}'`);this._lifeCycleHooks[t]?this._lifeCycleHooks[t].push(e):this._lifeCycleHooks[t]=[e];return this}
/**
   * Register callback to use as replacement for calling process.exit.
   *
   * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
   * @return {Command} `this` command for chaining
   */exitOverride(t){this._exitCallback=t||(t=>{if("commander.executeSubCommandAsync"!==t.code)throw t});return this}
/**
   * Call process.exit, and _exitCallback if defined.
   *
   * @param {number} exitCode exit code for using with process.exit
   * @param {string} code an id string representing the error
   * @param {string} message human-readable description of the error
   * @return never
   * @api private
   */_exit(t,e,i){this._exitCallback&&this._exitCallback(new V(t,e,i));x.exit(t)}
/**
   * Register callback `fn` for the command.
   *
   * @example
   * program
   *   .command('serve')
   *   .description('start service')
   *   .action(function() {
   *      // do work here
   *   });
   *
   * @param {Function} fn
   * @return {Command} `this` command for chaining
   */action(t){const listener=e=>{const i=this._args.length;const n=e.slice(0,i);this._storeOptionsAsProperties?n[i]=this:n[i]=this.opts();n.push(this);return t.apply(this,n)};this._actionHandler=listener;return this}
/**
   * Factory routine to create a new unattached option.
   *
   * See .option() for creating an attached option, which uses this routine to
   * create the option. You can override createOption to return a custom option.
   *
   * @param {string} flags
   * @param {string} [description]
   * @return {Option} new option
   */createOption(t,e){return new S(t,e)}
/**
   * Add an option.
   *
   * @param {Option} option
   * @return {Command} `this` command for chaining
   */addOption(t){const e=t.name();const i=t.attributeName();if(t.negate){const e=t.long.replace(/^--no-/,"--");this._findOption(e)||this.setOptionValueWithSource(i,void 0===t.defaultValue||t.defaultValue,"default")}else void 0!==t.defaultValue&&this.setOptionValueWithSource(i,t.defaultValue,"default");this.options.push(t);const handleOptionValue=(e,n,s)=>{null==e&&void 0!==t.presetArg&&(e=t.presetArg);const r=this.getOptionValue(i);if(null!==e&&t.parseArg)try{e=t.parseArg(e,r)}catch(t){if("commander.invalidArgument"===t.code){const e=`${n} ${t.message}`;this.error(e,{exitCode:t.exitCode,code:t.code})}throw t}else null!==e&&t.variadic&&(e=t._concatValue(e,r));null==e&&(e=!t.negate&&(!(!t.isBoolean()&&!t.optional)||""));this.setOptionValueWithSource(i,e,s)};this.on("option:"+e,(e=>{const i=`error: option '${t.flags}' argument '${e}' is invalid.`;handleOptionValue(e,i,"cli")}));t.envVar&&this.on("optionEnv:"+e,(e=>{const i=`error: option '${t.flags}' value '${e}' from env '${t.envVar}' is invalid.`;handleOptionValue(e,i,"env")}));return this}_optionEx(t,e,i,n,s){if("object"===typeof e&&e instanceof S)throw new Error("To add an Option object use addOption() instead of option() or requiredOption()");const r=this.createOption(e,i);r.makeOptionMandatory(!!t.mandatory);if("function"===typeof n)r.default(s).argParser(n);else if(n instanceof RegExp){const t=n;n=(e,i)=>{const n=t.exec(e);return n?n[0]:i};r.default(s).argParser(n)}else r.default(n);return this.addOption(r)}
/**
   * Define option with `flags`, `description` and optional
   * coercion `fn`.
   *
   * The `flags` string contains the short and/or long flags,
   * separated by comma, a pipe or space. The following are all valid
   * all will output this way when `--help` is used.
   *
   *     "-p, --pepper"
   *     "-p|--pepper"
   *     "-p --pepper"
   *
   * @example
   * // simple boolean defaulting to undefined
   * program.option('-p, --pepper', 'add pepper');
   *
   * program.pepper
   * // => undefined
   *
   * --pepper
   * program.pepper
   * // => true
   *
   * // simple boolean defaulting to true (unless non-negated option is also defined)
   * program.option('-C, --no-cheese', 'remove cheese');
   *
   * program.cheese
   * // => true
   *
   * --no-cheese
   * program.cheese
   * // => false
   *
   * // required argument
   * program.option('-C, --chdir <path>', 'change the working directory');
   *
   * --chdir /tmp
   * program.chdir
   * // => "/tmp"
   *
   * // optional argument
   * program.option('-c, --cheese [type]', 'add cheese [marble]');
   *
   * @param {string} flags
   * @param {string} [description]
   * @param {Function|*} [fn] - custom option processing function or default value
   * @param {*} [defaultValue]
   * @return {Command} `this` command for chaining
   */option(t,e,i,n){return this._optionEx({},t,e,i,n)}
/**
  * Add a required option which must have a value after parsing. This usually means
  * the option must be specified on the command line. (Otherwise the same as .option().)
  *
  * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
  *
  * @param {string} flags
  * @param {string} [description]
  * @param {Function|*} [fn] - custom option processing function or default value
  * @param {*} [defaultValue]
  * @return {Command} `this` command for chaining
  */requiredOption(t,e,i,n){return this._optionEx({mandatory:true},t,e,i,n)}
/**
   * Alter parsing of short flags with optional values.
   *
   * @example
   * // for `.option('-f,--flag [value]'):
   * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
   * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
   *
   * @param {Boolean} [combine=true] - if `true` or omitted, an optional value can be specified directly after the flag.
   */combineFlagAndOptionalValue(t=true){this._combineFlagAndOptionalValue=!!t;return this}
/**
   * Allow unknown options on the command line.
   *
   * @param {Boolean} [allowUnknown=true] - if `true` or omitted, no error will be thrown
   * for unknown options.
   */allowUnknownOption(t=true){this._allowUnknownOption=!!t;return this}
/**
   * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
   *
   * @param {Boolean} [allowExcess=true] - if `true` or omitted, no error will be thrown
   * for excess arguments.
   */allowExcessArguments(t=true){this._allowExcessArguments=!!t;return this}
/**
   * Enable positional options. Positional means global options are specified before subcommands which lets
   * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
   * The default behaviour is non-positional and global options may appear anywhere on the command line.
   *
   * @param {Boolean} [positional=true]
   */enablePositionalOptions(t=true){this._enablePositionalOptions=!!t;return this}
/**
   * Pass through options that come after command-arguments rather than treat them as command-options,
   * so actual command-options come before command-arguments. Turning this on for a subcommand requires
   * positional options to have been enabled on the program (parent commands).
   * The default behaviour is non-positional and options may appear before or after command-arguments.
   *
   * @param {Boolean} [passThrough=true]
   * for unknown options.
   */passThroughOptions(t=true){this._passThroughOptions=!!t;if(!!this.parent&&t&&!this.parent._enablePositionalOptions)throw new Error("passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)");return this}
/**
    * Whether to store option values as properties on command object,
    * or store separately (specify false). In both cases the option values can be accessed using .opts().
    *
    * @param {boolean} [storeAsProperties=true]
    * @return {Command} `this` command for chaining
    */storeOptionsAsProperties(t=true){this._storeOptionsAsProperties=!!t;if(this.options.length)throw new Error("call .storeOptionsAsProperties() before adding options");return this}
/**
   * Retrieve option value.
   *
   * @param {string} key
   * @return {Object} value
   */getOptionValue(t){return this._storeOptionsAsProperties?this[t]:this._optionValues[t]}
/**
   * Store option value.
   *
   * @param {string} key
   * @param {Object} value
   * @return {Command} `this` command for chaining
   */setOptionValue(t,e){return this.setOptionValueWithSource(t,e,void 0)}
/**
    * Store option value and where the value came from.
    *
    * @param {string} key
    * @param {Object} value
    * @param {string} source - expected values are default/config/env/cli/implied
    * @return {Command} `this` command for chaining
    */setOptionValueWithSource(t,e,i){this._storeOptionsAsProperties?this[t]=e:this._optionValues[t]=e;this._optionValueSources[t]=i;return this}
/**
    * Get source of option value.
    * Expected values are default | config | env | cli | implied
    *
    * @param {string} key
    * @return {string}
    */getOptionValueSource(t){return this._optionValueSources[t]}
/**
    * Get source of option value. See also .optsWithGlobals().
    * Expected values are default | config | env | cli | implied
    *
    * @param {string} key
    * @return {string}
    */getOptionValueSourceWithGlobals(t){let e;getCommandAndParents(this).forEach((i=>{void 0!==i.getOptionValueSource(t)&&(e=i.getOptionValueSource(t))}));return e}_prepareUserArgs(t,e){if(void 0!==t&&!Array.isArray(t))throw new Error("first parameter to parse must be array or undefined");e=e||{};if(void 0===t){t=x.argv;x.versions&&x.versions.electron&&(e.from="electron")}this.rawArgs=t.slice();let i;switch(e.from){case void 0:case"node":this._scriptPath=t[1];i=t.slice(2);break;case"electron":if(x.defaultApp){this._scriptPath=t[1];i=t.slice(2)}else i=t.slice(1);break;case"user":i=t.slice(0);break;default:throw new Error(`unexpected parse option { from: '${e.from}' }`)}!this._name&&this._scriptPath&&this.nameFromFilename(this._scriptPath);this._name=this._name||"program";return i}
/**
   * Parse `argv`, setting options and invoking commands when defined.
   *
   * The default expectation is that the arguments are from node and have the application as argv[0]
   * and the script being run in argv[1], with user parameters after that.
   *
   * @example
   * program.parse(process.argv);
   * program.parse(); // implicitly use process.argv and auto-detect node vs electron conventions
   * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
   *
   * @param {string[]} [argv] - optional, defaults to process.argv
   * @param {Object} [parseOptions] - optionally specify style of options with from: node/user/electron
   * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
   * @return {Command} `this` command for chaining
   */parse(t,e){const i=this._prepareUserArgs(t,e);this._parseCommand([],i);return this}
/**
   * Parse `argv`, setting options and invoking commands when defined.
   *
   * Use parseAsync instead of parse if any of your action handlers are async. Returns a Promise.
   *
   * The default expectation is that the arguments are from node and have the application as argv[0]
   * and the script being run in argv[1], with user parameters after that.
   *
   * @example
   * await program.parseAsync(process.argv);
   * await program.parseAsync(); // implicitly use process.argv and auto-detect node vs electron conventions
   * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
   *
   * @param {string[]} [argv]
   * @param {Object} [parseOptions]
   * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
   * @return {Promise}
   */async parseAsync(t,e){const i=this._prepareUserArgs(t,e);await this._parseCommand([],i);return this}_executeSubCommand(t,e){e=e.slice();let i=false;const n=[".js",".ts",".tsx",".mjs",".cjs"];function findFile(t,e){const i=$.resolve(t,e);if(E.existsSync(i))return i;if(n.includes($.extname(e)))return;const s=n.find((t=>E.existsSync(`${i}${t}`)));return s?`${i}${s}`:void 0}this._checkForMissingMandatoryOptions();this._checkForConflictingOptions();let s=t._executableFile||`${this._name}-${t._name}`;let r=this._executableDir||"";if(this._scriptPath){let t;try{t=E.realpathSync(this._scriptPath)}catch(e){t=this._scriptPath}r=$.resolve($.dirname(t),r)}if(r){let e=findFile(r,s);if(!e&&!t._executableFile&&this._scriptPath){const i=$.basename(this._scriptPath,$.extname(this._scriptPath));i!==this._name&&(e=findFile(r,`${i}-${t._name}`))}s=e||s}i=n.includes($.extname(s));let o;if("win32"!==x.platform)if(i){e.unshift(s);e=incrementNodeInspectorPort(x.execArgv).concat(e);o=w.spawn(x.argv[0],e,{stdio:"inherit"})}else o=w.spawn(s,e,{stdio:"inherit"});else{e.unshift(s);e=incrementNodeInspectorPort(x.execArgv).concat(e);o=w.spawn(x.execPath,e,{stdio:"inherit"})}if(!o.killed){const t=["SIGUSR1","SIGUSR2","SIGTERM","SIGINT","SIGHUP"];t.forEach((t=>{x.on(t,(()=>{false===o.killed&&null===o.exitCode&&o.kill(t)}))}))}const a=this._exitCallback;a?o.on("close",(()=>{a(new V(x.exitCode||0,"commander.executeSubCommandAsync","(close)"))})):o.on("close",x.exit.bind(x));o.on("error",(e=>{if("ENOENT"===e.code){const e=r?`searched for local subcommand relative to directory '${r}'`:"no directory for search for local subcommand, use .executableDir() to supply a custom directory";const i=`'${s}' does not exist\n - if '${t._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead\n - if the default executable name is not suitable, use the executableFile option to supply a custom name or path\n - ${e}`;throw new Error(i)}if("EACCES"===e.code)throw new Error(`'${s}' not executable`);if(a){const t=new V(1,"commander.executeSubCommandAsync","(error)");t.nestedError=e;a(t)}else x.exit(1)}));this.runningCommand=o}_dispatchSubcommand(t,e,i){const n=this._findCommand(t);n||this.help({error:true});let s;s=this._chainOrCallSubCommandHook(s,n,"preSubcommand");s=this._chainOrCall(s,(()=>{if(!n._executableHandler)return n._parseCommand(e,i);this._executeSubCommand(n,e.concat(i))}));return s}_checkNumberOfArguments(){this._args.forEach(((t,e)=>{t.required&&null==this.args[e]&&this.missingArgument(t.name())}));this._args.length>0&&this._args[this._args.length-1].variadic||this.args.length>this._args.length&&this._excessArguments(this.args)}_processArguments(){const myParseArg=(t,e,i)=>{let n=e;if(null!==e&&t.parseArg)try{n=t.parseArg(e,i)}catch(i){if("commander.invalidArgument"===i.code){const n=`error: command-argument value '${e}' is invalid for argument '${t.name()}'. ${i.message}`;this.error(n,{exitCode:i.exitCode,code:i.code})}throw i}return n};this._checkNumberOfArguments();const t=[];this._args.forEach(((e,i)=>{let n=e.defaultValue;if(e.variadic)if(i<this.args.length){n=this.args.slice(i);e.parseArg&&(n=n.reduce(((t,i)=>myParseArg(e,i,t)),e.defaultValue))}else void 0===n&&(n=[]);else if(i<this.args.length){n=this.args[i];e.parseArg&&(n=myParseArg(e,n,e.defaultValue))}t[i]=n}));this.processedArgs=t}
/**
   * Once we have a promise we chain, but call synchronously until then.
   *
   * @param {Promise|undefined} promise
   * @param {Function} fn
   * @return {Promise|undefined}
   * @api private
   */_chainOrCall(t,e){return t&&t.then&&"function"===typeof t.then?t.then((()=>e())):e()}
/**
   *
   * @param {Promise|undefined} promise
   * @param {string} event
   * @return {Promise|undefined}
   * @api private
   */_chainOrCallHooks(t,e){let i=t;const n=[];getCommandAndParents(this).reverse().filter((t=>void 0!==t._lifeCycleHooks[e])).forEach((t=>{t._lifeCycleHooks[e].forEach((e=>{n.push({hookedCommand:t,callback:e})}))}));"postAction"===e&&n.reverse();n.forEach((t=>{i=this._chainOrCall(i,(()=>t.callback(t.hookedCommand,this)))}));return i}
/**
   *
   * @param {Promise|undefined} promise
   * @param {Command} subCommand
   * @param {string} event
   * @return {Promise|undefined}
   * @api private
   */_chainOrCallSubCommandHook(t,e,i){let n=t;void 0!==this._lifeCycleHooks[i]&&this._lifeCycleHooks[i].forEach((t=>{n=this._chainOrCall(n,(()=>t(this,e)))}));return n}_parseCommand(t,e){const i=this.parseOptions(e);this._parseOptionsEnv();this._parseOptionsImplied();t=t.concat(i.operands);e=i.unknown;this.args=t.concat(e);if(t&&this._findCommand(t[0]))return this._dispatchSubcommand(t[0],t.slice(1),e);if(this._hasImplicitHelpCommand()&&t[0]===this._helpCommandName){1===t.length&&this.help();return this._dispatchSubcommand(t[1],[],[this._helpLongFlag])}if(this._defaultCommandName){outputHelpIfRequested(this,e);return this._dispatchSubcommand(this._defaultCommandName,t,e)}!this.commands.length||0!==this.args.length||this._actionHandler||this._defaultCommandName||this.help({error:true});outputHelpIfRequested(this,i.unknown);this._checkForMissingMandatoryOptions();this._checkForConflictingOptions();const checkForUnknownOptions=()=>{i.unknown.length>0&&this.unknownOption(i.unknown[0])};const n=`command:${this.name()}`;if(this._actionHandler){checkForUnknownOptions();this._processArguments();let i;i=this._chainOrCallHooks(i,"preAction");i=this._chainOrCall(i,(()=>this._actionHandler(this.processedArgs)));this.parent&&(i=this._chainOrCall(i,(()=>{this.parent.emit(n,t,e)})));i=this._chainOrCallHooks(i,"postAction");return i}if(this.parent&&this.parent.listenerCount(n)){checkForUnknownOptions();this._processArguments();this.parent.emit(n,t,e)}else if(t.length){if(this._findCommand("*"))return this._dispatchSubcommand("*",t,e);if(this.listenerCount("command:*"))this.emit("command:*",t,e);else if(this.commands.length)this.unknownCommand();else{checkForUnknownOptions();this._processArguments()}}else if(this.commands.length){checkForUnknownOptions();this.help({error:true})}else{checkForUnknownOptions();this._processArguments()}}_findCommand(t){if(t)return this.commands.find((e=>e._name===t||e._aliases.includes(t)))}
/**
   * Return an option matching `arg` if any.
   *
   * @param {string} arg
   * @return {Option}
   * @api private
   */_findOption(t){return this.options.find((e=>e.is(t)))}_checkForMissingMandatoryOptions(){for(let t=this;t;t=t.parent)t.options.forEach((e=>{e.mandatory&&void 0===t.getOptionValue(e.attributeName())&&t.missingMandatoryOptionValue(e)}))}_checkForConflictingLocalOptions(){const t=this.options.filter((t=>{const e=t.attributeName();return void 0!==this.getOptionValue(e)&&"default"!==this.getOptionValueSource(e)}));const e=t.filter((t=>t.conflictsWith.length>0));e.forEach((e=>{const i=t.find((t=>e.conflictsWith.includes(t.attributeName())));i&&this._conflictingOption(e,i)}))}_checkForConflictingOptions(){for(let t=this;t;t=t.parent)t._checkForConflictingLocalOptions()}
/**
   * Parse options from `argv` removing known options,
   * and return argv split into operands and unknown arguments.
   *
   * Examples:
   *
   *     argv => operands, unknown
   *     --known kkk op => [op], []
   *     op --known kkk => [op], []
   *     sub --unknown uuu op => [sub], [--unknown uuu op]
   *     sub -- --unknown uuu op => [sub --unknown uuu op], []
   *
   * @param {String[]} argv
   * @return {{operands: String[], unknown: String[]}}
   */parseOptions(t){const e=[];const i=[];let n=e;const s=t.slice();function maybeOption(t){return t.length>1&&"-"===t[0]}let r=null;while(s.length){const t=s.shift();if("--"===t){n===i&&n.push(t);n.push(...s);break}if(!r||maybeOption(t)){r=null;if(maybeOption(t)){const e=this._findOption(t);if(e){if(e.required){const t=s.shift();void 0===t&&this.optionMissingArgument(e);this.emit(`option:${e.name()}`,t)}else if(e.optional){let t=null;s.length>0&&!maybeOption(s[0])&&(t=s.shift());this.emit(`option:${e.name()}`,t)}else this.emit(`option:${e.name()}`);r=e.variadic?e:null;continue}}if(t.length>2&&"-"===t[0]&&"-"!==t[1]){const e=this._findOption(`-${t[1]}`);if(e){if(e.required||e.optional&&this._combineFlagAndOptionalValue)this.emit(`option:${e.name()}`,t.slice(2));else{this.emit(`option:${e.name()}`);s.unshift(`-${t.slice(2)}`)}continue}}if(/^--[^=]+=/.test(t)){const e=t.indexOf("=");const i=this._findOption(t.slice(0,e));if(i&&(i.required||i.optional)){this.emit(`option:${i.name()}`,t.slice(e+1));continue}}maybeOption(t)&&(n=i);if((this._enablePositionalOptions||this._passThroughOptions)&&0===e.length&&0===i.length){if(this._findCommand(t)){e.push(t);s.length>0&&i.push(...s);break}if(t===this._helpCommandName&&this._hasImplicitHelpCommand()){e.push(t);s.length>0&&e.push(...s);break}if(this._defaultCommandName){i.push(t);s.length>0&&i.push(...s);break}}if(this._passThroughOptions){n.push(t);s.length>0&&n.push(...s);break}n.push(t)}else this.emit(`option:${r.name()}`,t)}return{operands:e,unknown:i}}opts(){if(this._storeOptionsAsProperties){const t={};const e=this.options.length;for(let i=0;i<e;i++){const e=this.options[i].attributeName();t[e]=e===this._versionOptionName?this._version:this[e]}return t}return this._optionValues}optsWithGlobals(){return getCommandAndParents(this).reduce(((t,e)=>Object.assign(t,e.opts())),{})}
/**
   * Display error message and exit (or call exitOverride).
   *
   * @param {string} message
   * @param {Object} [errorOptions]
   * @param {string} [errorOptions.code] - an id string representing the error
   * @param {number} [errorOptions.exitCode] - used with process.exit
   */error(t,e){this._outputConfiguration.outputError(`${t}\n`,this._outputConfiguration.writeErr);if("string"===typeof this._showHelpAfterError)this._outputConfiguration.writeErr(`${this._showHelpAfterError}\n`);else if(this._showHelpAfterError){this._outputConfiguration.writeErr("\n");this.outputHelp({error:true})}const i=e||{};const n=i.exitCode||1;const s=i.code||"commander.error";this._exit(n,s,t)}_parseOptionsEnv(){this.options.forEach((t=>{if(t.envVar&&t.envVar in x.env){const e=t.attributeName();(void 0===this.getOptionValue(e)||["default","config","env"].includes(this.getOptionValueSource(e)))&&(t.required||t.optional?this.emit(`optionEnv:${t.name()}`,x.env[t.envVar]):this.emit(`optionEnv:${t.name()}`))}}))}_parseOptionsImplied(){const t=new D(this.options);const hasCustomOptionValue=t=>void 0!==this.getOptionValue(t)&&!["default","implied"].includes(this.getOptionValueSource(t));this.options.filter((e=>void 0!==e.implied&&hasCustomOptionValue(e.attributeName())&&t.valueFromOption(this.getOptionValue(e.attributeName()),e))).forEach((t=>{Object.keys(t.implied).filter((t=>!hasCustomOptionValue(t))).forEach((e=>{this.setOptionValueWithSource(e,t.implied[e],"implied")}))}))}
/**
   * Argument `name` is missing.
   *
   * @param {string} name
   * @api private
   */missingArgument(t){const e=`error: missing required argument '${t}'`;this.error(e,{code:"commander.missingArgument"})}
/**
   * `Option` is missing an argument.
   *
   * @param {Option} option
   * @api private
   */optionMissingArgument(t){const e=`error: option '${t.flags}' argument missing`;this.error(e,{code:"commander.optionMissingArgument"})}
/**
   * `Option` does not have a value, and is a mandatory option.
   *
   * @param {Option} option
   * @api private
   */missingMandatoryOptionValue(t){const e=`error: required option '${t.flags}' not specified`;this.error(e,{code:"commander.missingMandatoryOptionValue"})}
/**
   * `Option` conflicts with another option.
   *
   * @param {Option} option
   * @param {Option} conflictingOption
   * @api private
   */_conflictingOption(t,e){const findBestOptionFromValue=t=>{const e=t.attributeName();const i=this.getOptionValue(e);const n=this.options.find((t=>t.negate&&e===t.attributeName()));const s=this.options.find((t=>!t.negate&&e===t.attributeName()));return n&&(void 0===n.presetArg&&false===i||void 0!==n.presetArg&&i===n.presetArg)?n:s||t};const getErrorMessage=t=>{const e=findBestOptionFromValue(t);const i=e.attributeName();const n=this.getOptionValueSource(i);return"env"===n?`environment variable '${e.envVar}'`:`option '${e.flags}'`};const i=`error: ${getErrorMessage(t)} cannot be used with ${getErrorMessage(e)}`;this.error(i,{code:"commander.conflictingOption"})}
/**
   * Unknown option `flag`.
   *
   * @param {string} flag
   * @api private
   */unknownOption(t){if(this._allowUnknownOption)return;let e="";if(t.startsWith("--")&&this._showSuggestionAfterError){let i=[];let n=this;do{const t=n.createHelp().visibleOptions(n).filter((t=>t.long)).map((t=>t.long));i=i.concat(t);n=n.parent}while(n&&!n._enablePositionalOptions);e=N(t,i)}const i=`error: unknown option '${t}'${e}`;this.error(i,{code:"commander.unknownOption"})}
/**
   * Excess arguments, more than expected.
   *
   * @param {string[]} receivedArgs
   * @api private
   */_excessArguments(t){if(this._allowExcessArguments)return;const e=this._args.length;const i=1===e?"":"s";const n=this.parent?` for '${this.name()}'`:"";const s=`error: too many arguments${n}. Expected ${e} argument${i} but got ${t.length}.`;this.error(s,{code:"commander.excessArguments"})}unknownCommand(){const t=this.args[0];let e="";if(this._showSuggestionAfterError){const i=[];this.createHelp().visibleCommands(this).forEach((t=>{i.push(t.name());t.alias()&&i.push(t.alias())}));e=N(t,i)}const i=`error: unknown command '${t}'${e}`;this.error(i,{code:"commander.unknownCommand"})}
/**
   * Set the program version to `str`.
   *
   * This method auto-registers the "-V, --version" flag
   * which will print the version number when passed.
   *
   * You can optionally supply the  flags and description to override the defaults.
   *
   * @param {string} str
   * @param {string} [flags]
   * @param {string} [description]
   * @return {this | string} `this` command for chaining, or version string if no arguments
   */version(t,e,i){if(void 0===t)return this._version;this._version=t;e=e||"-V, --version";i=i||"output the version number";const n=this.createOption(e,i);this._versionOptionName=n.attributeName();this.options.push(n);this.on("option:"+n.name(),(()=>{this._outputConfiguration.writeOut(`${t}\n`);this._exit(0,"commander.version",t)}));return this}
/**
   * Set the description.
   *
   * @param {string} [str]
   * @param {Object} [argsDescription]
   * @return {string|Command}
   */description(t,e){if(void 0===t&&void 0===e)return this._description;this._description=t;e&&(this._argsDescription=e);return this}
/**
   * Set the summary. Used when listed as subcommand of parent.
   *
   * @param {string} [str]
   * @return {string|Command}
   */summary(t){if(void 0===t)return this._summary;this._summary=t;return this}
/**
   * Set an alias for the command.
   *
   * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
   *
   * @param {string} [alias]
   * @return {string|Command}
   */alias(t){if(void 0===t)return this._aliases[0];
/** @type {Command} */let e=this;0!==this.commands.length&&this.commands[this.commands.length-1]._executableHandler&&(e=this.commands[this.commands.length-1]);if(t===e._name)throw new Error("Command alias can't be the same as its name");e._aliases.push(t);return this}
/**
   * Set aliases for the command.
   *
   * Only the first alias is shown in the auto-generated help.
   *
   * @param {string[]} [aliases]
   * @return {string[]|Command}
   */aliases(t){if(void 0===t)return this._aliases;t.forEach((t=>this.alias(t)));return this}
/**
   * Set / get the command usage `str`.
   *
   * @param {string} [str]
   * @return {String|Command}
   */usage(t){if(void 0===t){if(this._usage)return this._usage;const t=this._args.map((t=>y(t)));return[].concat(this.options.length||this._hasHelpOption?"[options]":[],this.commands.length?"[command]":[],this._args.length?t:[]).join(" ")}this._usage=t;return this}
/**
   * Get or set the name of the command.
   *
   * @param {string} [str]
   * @return {string|Command}
   */name(t){if(void 0===t)return this._name;this._name=t;return this}
/**
   * Set the name of the command from script filename, such as process.argv[1],
   * or require.main.filename, or __filename.
   *
   * (Used internally and public although not documented in README.)
   *
   * @example
   * program.nameFromFilename(require.main.filename);
   *
   * @param {string} filename
   * @return {Command}
   */nameFromFilename(t){this._name=$.basename(t,$.extname(t));return this}
/**
   * Get or set the directory for searching for executable subcommands of this command.
   *
   * @example
   * program.executableDir(__dirname);
   * // or
   * program.executableDir('subcommands');
   *
   * @param {string} [path]
   * @return {string|Command}
   */executableDir(t){if(void 0===t)return this._executableDir;this._executableDir=t;return this}
/**
   * Return program help documentation.
   *
   * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
   * @return {string}
   */helpInformation(t){const e=this.createHelp();void 0===e.helpWidth&&(e.helpWidth=t&&t.error?this._outputConfiguration.getErrHelpWidth():this._outputConfiguration.getOutHelpWidth());return e.formatHelp(this,e)}_getHelpContext(t){t=t||{};const e={error:!!t.error};let i;i=e.error?t=>this._outputConfiguration.writeErr(t):t=>this._outputConfiguration.writeOut(t);e.write=t.write||i;e.command=this;return e}
/**
   * Output help information for this command.
   *
   * Outputs built-in help, and custom text added using `.addHelpText()`.
   *
   * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
   */outputHelp(t){let e;if("function"===typeof t){e=t;t=void 0}const i=this._getHelpContext(t);getCommandAndParents(this).reverse().forEach((t=>t.emit("beforeAllHelp",i)));this.emit("beforeHelp",i);let n=this.helpInformation(i);if(e){n=e(n);if("string"!==typeof n&&!b.isBuffer(n))throw new Error("outputHelp callback must return a string or a Buffer")}i.write(n);this.emit(this._helpLongFlag);this.emit("afterHelp",i);getCommandAndParents(this).forEach((t=>t.emit("afterAllHelp",i)))}
/**
   * You can pass in flags and a description to override the help
   * flags and help description for your command. Pass in false to
   * disable the built-in help option.
   *
   * @param {string | boolean} [flags]
   * @param {string} [description]
   * @return {Command} `this` command for chaining
   */helpOption(t,e){if("boolean"===typeof t){this._hasHelpOption=t;return this}this._helpFlags=t||this._helpFlags;this._helpDescription=e||this._helpDescription;const i=F(this._helpFlags);this._helpShortFlag=i.shortFlag;this._helpLongFlag=i.longFlag;return this}
/**
   * Output help information and exit.
   *
   * Outputs built-in help, and custom text added using `.addHelpText()`.
   *
   * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
   */help(t){this.outputHelp(t);let e=x.exitCode||0;0===e&&t&&"function"!==typeof t&&t.error&&(e=1);this._exit(e,"commander.help","(outputHelp)")}
/**
   * Add additional text to be displayed with the built-in help.
   *
   * Position is 'before' or 'after' to affect just this command,
   * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
   *
   * @param {string} position - before or after built-in help
   * @param {string | Function} text - string to add, or a function returning a string
   * @return {Command} `this` command for chaining
   */addHelpText(t,e){const i=["beforeAll","before","after","afterAll"];if(!i.includes(t))throw new Error(`Unexpected value for position to addHelpText.\nExpecting one of '${i.join("', '")}'`);const n=`${t}Help`;this.on(n,(t=>{let i;i="function"===typeof e?e({error:t.error,command:t.command}):e;i&&t.write(`${i}\n`)}));return this}}
/**
 * Output help information if help flags specified
 *
 * @param {Command} cmd - command to output help for
 * @param {Array} args - array of options to search for help flags
 * @api private
 */function outputHelpIfRequested(t,e){const i=t._hasHelpOption&&e.find((e=>e===t._helpLongFlag||e===t._helpShortFlag));if(i){t.outputHelp();t._exit(0,"commander.helpDisplayed","(outputHelp)")}}
/**
 * Scan arguments and increment port number for inspect calls (to avoid conflicts when spawning new command).
 *
 * @param {string[]} args - array of arguments from node.execArgv
 * @returns {string[]}
 * @api private
 */function incrementNodeInspectorPort(t){return t.map((t=>{if(!t.startsWith("--inspect"))return t;let e;let i="127.0.0.1";let n="9229";let s;if(null!==(s=t.match(/^(--inspect(-brk)?)$/)))e=s[1];else if(null!==(s=t.match(/^(--inspect(-brk|-port)?)=([^:]+)$/))){e=s[1];/^\d+$/.test(s[3])?n=s[3]:i=s[3]}else if(null!==(s=t.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/))){e=s[1];i=s[3];n=s[4]}return e&&"0"!==n?`${e}=${i}:${parseInt(n)+1}`:t}))}
/**
 * @param {Command} startCommand
 * @returns {Command[]}
 * @api private
 */function getCommandAndParents(t){const e=[];for(let i=t;i;i=i.parent)e.push(i);return e}C.Command=Command$1;var P={};const{Argument:I}=a;const{Command:T}=C;const{CommanderError:M,InvalidArgumentError:W}=o;const{Help:j}=l;const{Option:q}=u;P=P=new T;P.program=P;P.Argument=I;P.Command=T;P.CommanderError=M;P.Help=j;P.InvalidArgumentError=W;P.InvalidOptionArgumentError=W;P.Option=q;var L=P;const G=P.program,U=P.InvalidOptionArgumentError;const R=P.Argument,B=P.Command,J=P.CommanderError,Y=P.Help,z=P.InvalidArgumentError,K=P.Option;export{R as Argument,B as Command,J as CommanderError,Y as Help,z as InvalidArgumentError,U as InvalidOptionArgumentError,K as Option,L as default,G as program};


import*as t from"events";import*as s from"fs";import*as e from"path";import*as i from"util";import*as n from"readdirp";import*as r from"anymatch";import*as a from"glob-parent";import*as o from"is-glob";import*as h from"braces";import*as c from"normalize-path";import*as l from"is-binary-path";import*as d from"os";import f from"process";import*as _ from"fsevents";var u=e;try{"default"in e&&(u=e.default)}catch(t){}var w=d;try{"default"in d&&(w=d.default)}catch(t){}var E={};var m=f;const{sep:p}=u;const{platform:y}=m;const v=w;E.EV_ALL="all";E.EV_READY="ready";E.EV_ADD="add";E.EV_CHANGE="change";E.EV_ADD_DIR="addDir";E.EV_UNLINK="unlink";E.EV_UNLINK_DIR="unlinkDir";E.EV_RAW="raw";E.EV_ERROR="error";E.STR_DATA="data";E.STR_END="end";E.STR_CLOSE="close";E.FSEVENT_CREATED="created";E.FSEVENT_MODIFIED="modified";E.FSEVENT_DELETED="deleted";E.FSEVENT_MOVED="moved";E.FSEVENT_CLONED="cloned";E.FSEVENT_UNKNOWN="unknown";E.FSEVENT_FLAG_MUST_SCAN_SUBDIRS=1;E.FSEVENT_TYPE_FILE="file";E.FSEVENT_TYPE_DIRECTORY="directory";E.FSEVENT_TYPE_SYMLINK="symlink";E.KEY_LISTENERS="listeners";E.KEY_ERR="errHandlers";E.KEY_RAW="rawEmitters";E.HANDLER_KEYS=[E.KEY_LISTENERS,E.KEY_ERR,E.KEY_RAW];E.DOT_SLASH=`.${p}`;E.BACK_SLASH_RE=/\\/g;E.DOUBLE_SLASH_RE=/\/\//;E.SLASH_OR_BACK_SLASH_RE=/[/\\]/;E.DOT_RE=/\..*\.(sw[px])$|~$|\.subl.*\.tmp/;E.REPLACER_RE=/^\.[/\\]/;E.SLASH="/";E.SLASH_SLASH="//";E.BRACE_START="{";E.BANG="!";E.ONE_DOT=".";E.TWO_DOTS="..";E.STAR="*";E.GLOBSTAR="**";E.ROOT_GLOBSTAR="/**/*";E.SLASH_GLOBSTAR="/**";E.DIR_SUFFIX="Dir";E.ANYMATCH_OPTS={dot:true};E.STRING_TYPE="string";E.FUNCTION_TYPE="function";E.EMPTY_STR="";E.EMPTY_FN=()=>{};E.IDENTITY_FN=t=>t;E.isWindows=y==="win32";E.isMacos=y==="darwin";E.isLinux=y==="linux";E.isIBMi=v.type()==="OS400";var S=s;try{"default"in s&&(S=s.default)}catch(t){}var g=e;try{"default"in e&&(g=e.default)}catch(t){}var R=i;try{"default"in i&&(R=i.default)}catch(t){}var T=l;try{"default"in l&&(T=l.default)}catch(t){}var P={};const D=S;const F=g;const{promisify:b}=R;const A=T;const{isWindows:N,isLinux:I,EMPTY_FN:W,EMPTY_STR:O,KEY_LISTENERS:L,KEY_ERR:C,KEY_RAW:k,HANDLER_KEYS:V,EV_CHANGE:H,EV_ADD:M,EV_ADD_DIR:G,EV_ERROR:Y,STR_DATA:U,STR_END:K,BRACE_START:B,STAR:j}=E;const z="watch";const x=b(D.open);const $=b(D.stat);const X=b(D.lstat);const Q=b(D.close);const q=b(D.realpath);const J={lstat:X,stat:$};const foreach=(t,s)=>{t instanceof Set?t.forEach(s):s(t)};const addAndConvert=(t,s,e)=>{let i=t[s];i instanceof Set||(t[s]=i=new Set([i]));i.add(e)};const clearItem=t=>s=>{const e=t[s];e instanceof Set?e.clear():delete t[s]};const delFromSet=(t,s,e)=>{const i=t[s];i instanceof Set?i.delete(e):i===e&&delete t[s]};const isEmptySet=t=>t instanceof Set?t.size===0:!t
/**
 * @typedef {String} Path
 */
/**
 * @typedef {Object} FsWatchContainer
 * @property {Set} listeners
 * @property {Set} errHandlers
 * @property {Set} rawEmitters
 * @property {fs.FSWatcher=} watcher
 * @property {Boolean=} watcherUnusable
 */
/**
 * @type {Map<String,FsWatchContainer>}
 */;const Z=new Map;
/**
 * Instantiates the fs_watch interface
 * @param {String} path to be watched
 * @param {Object} options to be passed to fs_watch
 * @param {Function} listener main event handler
 * @param {Function} errHandler emits info about errors
 * @param {Function} emitRaw emits raw event data
 * @returns {fs.FSWatcher} new fsevents instance
 */function createFsWatchInstance(t,s,e,i,n){const handleEvent=(s,i)=>{e(t);n(s,i,{watchedPath:t});i&&t!==i&&fsWatchBroadcast(F.resolve(t,i),L,F.join(t,i))};try{return D.watch(t,s,handleEvent)}catch(t){i(t)}}
/**
 * Helper for passing fs_watch event data to a collection of listeners
 * @param {Path} fullPath absolute path bound to fs_watch instance
 * @param {String} type listener type
 * @param {*=} val1 arguments to be passed to listeners
 * @param {*=} val2
 * @param {*=} val3
 */const fsWatchBroadcast=(t,s,e,i,n)=>{const r=Z.get(t);r&&foreach(r[s],(t=>{t(e,i,n)}))};
/**
 * Instantiates the fs_watch interface or binds listeners
 * to an existing one covering the same file system entry
 * @param {String} path
 * @param {String} fullPath absolute path
 * @param {Object} options to be passed to fs_watch
 * @param {Object} handlers container for event listener functions
 */const setFsWatchListener=(t,s,e,i)=>{const{listener:n,errHandler:r,rawEmitter:a}=i;let o=Z.get(s);
/** @type {fs.FSWatcher=} */let h;if(!e.persistent){h=createFsWatchInstance(t,e,n,r,a);return h.close.bind(h)}if(o){addAndConvert(o,L,n);addAndConvert(o,C,r);addAndConvert(o,k,a)}else{h=createFsWatchInstance(t,e,fsWatchBroadcast.bind(null,s,L),r,fsWatchBroadcast.bind(null,s,k));if(!h)return;h.on(Y,(async e=>{const i=fsWatchBroadcast.bind(null,s,C);o.watcherUnusable=true;if(N&&e.code==="EPERM")try{const s=await x(t,"r");await Q(s);i(e)}catch(t){}else i(e)}));o={listeners:n,errHandlers:r,rawEmitters:a,watcher:h};Z.set(s,o)}return()=>{delFromSet(o,L,n);delFromSet(o,C,r);delFromSet(o,k,a);if(isEmptySet(o.listeners)){o.watcher.close();Z.delete(s);V.forEach(clearItem(o));o.watcher=void 0;Object.freeze(o)}}};const tt=new Map;
/**
 * Instantiates the fs_watchFile interface or binds listeners
 * to an existing one covering the same file system entry
 * @param {String} path to be watched
 * @param {String} fullPath absolute path
 * @param {Object} options options to be passed to fs_watchFile
 * @param {Object} handlers container for event listener functions
 * @returns {Function} closer
 */const setFsWatchFileListener=(t,s,e,i)=>{const{listener:n,rawEmitter:r}=i;let a=tt.get(s);let o=new Set;let h=new Set;const c=a&&a.options;if(c&&(c.persistent<e.persistent||c.interval>e.interval)){o=a.listeners;h=a.rawEmitters;D.unwatchFile(s);a=void 0}if(a){addAndConvert(a,L,n);addAndConvert(a,k,r)}else{a={listeners:n,rawEmitters:r,options:e,watcher:D.watchFile(s,e,((e,i)=>{foreach(a.rawEmitters,(t=>{t(H,s,{curr:e,prev:i})}));const n=e.mtimeMs;(e.size!==i.size||n>i.mtimeMs||n===0)&&foreach(a.listeners,(s=>s(t,e)))}))};tt.set(s,a)}return()=>{delFromSet(a,L,n);delFromSet(a,k,r);if(isEmptySet(a.listeners)){tt.delete(s);D.unwatchFile(s);a.options=a.watcher=void 0;Object.freeze(a)}}};let st=class NodeFsHandler{
/**
   * @param {import("../index").FSWatcher} fsW
   */
constructor(t){this.fsw=t;this._boundHandleError=s=>t._handleError(s)}
/**
   * Watch file for changes with fs_watchFile or fs_watch.
   * @param {String} path to file or dir
   * @param {Function} listener on fs change
   * @returns {Function} closer for the watcher instance
   */_watchWithNodeFs(t,s){const e=this.fsw.options;const i=F.dirname(t);const n=F.basename(t);const r=this.fsw._getWatchedDir(i);r.add(n);const a=F.resolve(t);const o={persistent:e.persistent};s||(s=W);let h;if(e.usePolling){o.interval=e.enableBinaryInterval&&A(n)?e.binaryInterval:e.interval;h=setFsWatchFileListener(t,a,o,{listener:s,rawEmitter:this.fsw._emitRaw})}else h=setFsWatchListener(t,a,o,{listener:s,errHandler:this._boundHandleError,rawEmitter:this.fsw._emitRaw});return h}
/**
   * Watch a file and emit add event if warranted.
   * @param {Path} file Path
   * @param {fs.Stats} stats result of fs_stat
   * @param {Boolean} initialAdd was the file added at watch instantiation?
   * @returns {Function} closer for the watcher instance
   */_handleFile(t,s,e){if(this.fsw.closed)return;const i=F.dirname(t);const n=F.basename(t);const r=this.fsw._getWatchedDir(i);let a=s;if(r.has(n))return;const listener=async(s,e)=>{if(this.fsw._throttle(z,t,5))if(e&&e.mtimeMs!==0){if(r.has(n)){const s=e.atimeMs;const i=e.mtimeMs;(!s||s<=i||i!==a.mtimeMs)&&this.fsw._emit(H,t,e);a=e}}else try{const e=await $(t);if(this.fsw.closed)return;const i=e.atimeMs;const n=e.mtimeMs;(!i||i<=n||n!==a.mtimeMs)&&this.fsw._emit(H,t,e);if(I&&a.ino!==e.ino){this.fsw._closeFile(s);a=e;this.fsw._addPathCloser(s,this._watchWithNodeFs(t,listener))}else a=e}catch(t){this.fsw._remove(i,n)}};const o=this._watchWithNodeFs(t,listener);if(!(e&&this.fsw.options.ignoreInitial)&&this.fsw._isntIgnored(t)){if(!this.fsw._throttle(M,t,0))return;this.fsw._emit(M,t,s)}return o}
/**
   * Handle symlinks encountered while reading a dir.
   * @param {Object} entry returned by readdirp
   * @param {String} directory path of dir being read
   * @param {String} path of this item
   * @param {String} item basename of this item
   * @returns {Promise<Boolean>} true if no more processing is needed for this entry.
   */async _handleSymlink(t,s,e,i){if(this.fsw.closed)return;const n=t.fullPath;const r=this.fsw._getWatchedDir(s);if(!this.fsw.options.followSymlinks){this.fsw._incrReadyCount();let s;try{s=await q(e)}catch(t){this.fsw._emitReady();return true}if(this.fsw.closed)return;if(r.has(i)){if(this.fsw._symlinkPaths.get(n)!==s){this.fsw._symlinkPaths.set(n,s);this.fsw._emit(H,e,t.stats)}}else{r.add(i);this.fsw._symlinkPaths.set(n,s);this.fsw._emit(M,e,t.stats)}this.fsw._emitReady();return true}if(this.fsw._symlinkPaths.has(n))return true;this.fsw._symlinkPaths.set(n,true)}_handleRead(t,s,e,i,n,r,a){t=F.join(t,O);if(!e.hasGlob){a=this.fsw._throttle("readdir",t,1e3);if(!a)return}const o=this.fsw._getWatchedDir(e.path);const h=new Set;let c=this.fsw._readdirp(t,{fileFilter:t=>e.filterPath(t),directoryFilter:t=>e.filterDir(t),depth:0}).on(U,(async a=>{if(this.fsw.closed){c=void 0;return}const l=a.path;let d=F.join(t,l);h.add(l);if(!a.stats.isSymbolicLink()||!await this._handleSymlink(a,t,d,l))if(this.fsw.closed)c=void 0;else if(l===i||!i&&!o.has(l)){this.fsw._incrReadyCount();d=F.join(n,F.relative(n,d));this._addToNodeFs(d,s,e,r+1)}})).on(Y,this._boundHandleError);return new Promise((s=>c.once(K,(()=>{if(this.fsw.closed){c=void 0;return}const l=!!a&&a.clear();s();o.getChildren().filter((s=>s!==t&&!h.has(s)&&(!e.hasGlob||e.filterPath({fullPath:F.resolve(t,s)})))).forEach((s=>{this.fsw._remove(t,s)}));c=void 0;l&&this._handleRead(t,false,e,i,n,r,a)}))))}
/**
   * Read directory to add / remove files from `@watched` list and re-read it on change.
   * @param {String} dir fs path
   * @param {fs.Stats} stats
   * @param {Boolean} initialAdd
   * @param {Number} depth relative to user-supplied path
   * @param {String} target child path targeted for watch
   * @param {Object} wh Common watch helpers for this path
   * @param {String} realpath
   * @returns {Promise<Function>} closer for the watcher instance.
   */async _handleDir(t,s,e,i,n,r,a){const o=this.fsw._getWatchedDir(F.dirname(t));const h=o.has(F.basename(t));e&&this.fsw.options.ignoreInitial||n||h||r.hasGlob&&!r.globFilter(t)||this.fsw._emit(G,t,s);o.add(F.basename(t));this.fsw._getWatchedDir(t);let c;let l;const d=this.fsw.options.depth;if((d==null||i<=d)&&!this.fsw._symlinkPaths.has(a)){if(!n){await this._handleRead(t,e,r,n,t,i,c);if(this.fsw.closed)return}l=this._watchWithNodeFs(t,((s,e)=>{e&&e.mtimeMs===0||this._handleRead(s,false,r,n,t,i,c)}))}return l}
/**
   * Handle added file, directory, or glob pattern.
   * Delegates call to _handleFile / _handleDir after checks.
   * @param {String} path to file or ir
   * @param {Boolean} initialAdd was the file added at watch instantiation?
   * @param {Object} priorWh depth relative to user-supplied path
   * @param {Number} depth Child path actually targeted for watch
   * @param {String=} target Child path actually targeted for watch
   * @returns {Promise}
   */async _addToNodeFs(t,s,e,i,n){const r=this.fsw._emitReady;if(this.fsw._isIgnored(t)||this.fsw.closed){r();return false}const a=this.fsw._getWatchHelpers(t,i);if(!a.hasGlob&&e){a.hasGlob=e.hasGlob;a.globFilter=e.globFilter;a.filterPath=t=>e.filterPath(t);a.filterDir=t=>e.filterDir(t)}try{const e=await J[a.statMethod](a.watchPath);if(this.fsw.closed)return;if(this.fsw._isIgnored(a.watchPath,e)){r();return false}const o=this.fsw.options.followSymlinks&&!t.includes(j)&&!t.includes(B);let h;if(e.isDirectory()){const r=F.resolve(t);const c=o?await q(t):t;if(this.fsw.closed)return;h=await this._handleDir(a.watchPath,e,s,i,n,a,c);if(this.fsw.closed)return;r!==c&&c!==void 0&&this.fsw._symlinkPaths.set(r,c)}else if(e.isSymbolicLink()){const n=o?await q(t):t;if(this.fsw.closed)return;const r=F.dirname(a.watchPath);this.fsw._getWatchedDir(r).add(a.watchPath);this.fsw._emit(M,a.watchPath,e);h=await this._handleDir(r,e,s,i,t,a,n);if(this.fsw.closed)return;n!==void 0&&this.fsw._symlinkPaths.set(F.resolve(t),n)}else h=this._handleFile(a.watchPath,e,s);r();this.fsw._addPathCloser(t,h);return false}catch(s){if(this.fsw._handleError(s)){r();return t}}}};P=st;var et=P;var it=s;try{"default"in s&&(it=s.default)}catch(t){}var nt=e;try{"default"in e&&(nt=e.default)}catch(t){}var rt=i;try{"default"in i&&(rt=i.default)}catch(t){}var at=_;try{"default"in _&&(at=_.default)}catch(t){}var ot={};var ht=f;const ct=it;const lt=nt;const{promisify:dt}=rt;let ft;try{ft=at}catch(t){ht.env.CHOKIDAR_PRINT_FSEVENTS_REQUIRE_ERROR&&console.error(t)}if(ft){const t=ht.version.match(/v(\d+)\.(\d+)/);if(t&&t[1]&&t[2]){const s=Number.parseInt(t[1],10);const e=Number.parseInt(t[2],10);s===8&&e<16&&(ft=void 0)}}const{EV_ADD:_t,EV_CHANGE:ut,EV_ADD_DIR:wt,EV_UNLINK:Et,EV_ERROR:mt,STR_DATA:pt,STR_END:yt,FSEVENT_CREATED:vt,FSEVENT_MODIFIED:St,FSEVENT_DELETED:gt,FSEVENT_MOVED:Rt,FSEVENT_UNKNOWN:Tt,FSEVENT_FLAG_MUST_SCAN_SUBDIRS:Pt,FSEVENT_TYPE_FILE:Dt,FSEVENT_TYPE_DIRECTORY:Ft,FSEVENT_TYPE_SYMLINK:bt,ROOT_GLOBSTAR:At,DIR_SUFFIX:Nt,DOT_SLASH:It,FUNCTION_TYPE:Wt,EMPTY_FN:Ot,IDENTITY_FN:Lt}=E;const Depth=t=>isNaN(t)?{}:{depth:t};const Ct=dt(ct.stat);const kt=dt(ct.lstat);const Vt=dt(ct.realpath);const Ht={stat:Ct,lstat:kt};
/**
 * @typedef {String} Path
 */
/**
 * @typedef {Object} FsEventsWatchContainer
 * @property {Set<Function>} listeners
 * @property {Function} rawEmitter
 * @property {{stop: Function}} watcher
 */
/**
 * Object to hold per-process fsevents instances (may be shared across chokidar FSWatcher instances)
 * @type {Map<Path,FsEventsWatchContainer>}
 */const Mt=new Map;const Gt=10;const Yt=new Set([69888,70400,71424,72704,73472,131328,131840,262912]);
/**
 * Instantiates the fsevents interface
 * @param {Path} path path to be watched
 * @param {Function} callback called when fsevents is bound and ready
 * @returns {{stop: Function}} new fsevents instance
 */const createFSEventsInstance=(t,s)=>{const e=ft.watch(t,s);return{stop:e}};
/**
 * Instantiates the fsevents interface or binds listeners to an existing one covering
 * the same file tree.
 * @param {Path} path           - to be watched
 * @param {Path} realPath       - real path for symlinks
 * @param {Function} listener   - called when fsevents emits events
 * @param {Function} rawEmitter - passes data to listeners of the 'raw' event
 * @returns {Function} closer
 */function setFSEventsListener(t,s,e,i){let n=lt.extname(s)?lt.dirname(s):s;const r=lt.dirname(n);let a=Mt.get(n);couldConsolidate(r)&&(n=r);const o=lt.resolve(t);const h=o!==s;const filteredListener=(t,i,n)=>{h&&(t=t.replace(s,o));t!==o&&t.indexOf(o+lt.sep)||e(t,i,n)};let c=false;for(const t of Mt.keys())if(s.indexOf(lt.resolve(t)+lt.sep)===0){n=t;a=Mt.get(n);c=true;break}if(a||c)a.listeners.add(filteredListener);else{a={listeners:new Set([filteredListener]),rawEmitter:i,watcher:createFSEventsInstance(n,((t,s)=>{if(!a.listeners.size)return;if(s&Pt)return;const e=ft.getInfo(t,s);a.listeners.forEach((i=>{i(t,s,e)}));a.rawEmitter(e.event,t,e)}))};Mt.set(n,a)}return()=>{const t=a.listeners;t.delete(filteredListener);if(!t.size){Mt.delete(n);if(a.watcher)return a.watcher.stop().then((()=>{a.rawEmitter=a.watcher=void 0;Object.freeze(a)}))}}}const couldConsolidate=t=>{let s=0;for(const e of Mt.keys())if(e.indexOf(t)===0){s++;if(s>=Gt)return true}return false};const canUse=()=>ft&&Mt.size<128;const calcDepth=(t,s)=>{let e=0;while(!t.indexOf(s)&&(t=lt.dirname(t))!==s)e++;return e};const sameTypes=(t,s)=>t.type===Ft&&s.isDirectory()||t.type===bt&&s.isSymbolicLink()||t.type===Dt&&s.isFile();let Ut=class FsEventsHandler{
/**
   * @param {import('../index').FSWatcher} fsw
   */
constructor(t){this.fsw=t}checkIgnored(t,s){const e=this.fsw._ignoredPaths;if(this.fsw._isIgnored(t,s)){e.add(t);s&&s.isDirectory()&&e.add(t+At);return true}e.delete(t);e.delete(t+At)}addOrChange(t,s,e,i,n,r,a,o){const h=n.has(r)?ut:_t;this.handleEvent(h,t,s,e,i,n,r,a,o)}async checkExists(t,s,e,i,n,r,a,o){try{const h=await Ct(t);if(this.fsw.closed)return;sameTypes(a,h)?this.addOrChange(t,s,e,i,n,r,a,o):this.handleEvent(Et,t,s,e,i,n,r,a,o)}catch(h){h.code==="EACCES"?this.addOrChange(t,s,e,i,n,r,a,o):this.handleEvent(Et,t,s,e,i,n,r,a,o)}}handleEvent(t,s,e,i,n,r,a,o,h){if(!this.fsw.closed&&!this.checkIgnored(s))if(t===Et){const t=o.type===Ft;(t||r.has(a))&&this.fsw._remove(n,a,t)}else{if(t===_t){o.type===Ft&&this.fsw._getWatchedDir(s);if(o.type===bt&&h.followSymlinks){const t=h.depth===void 0?void 0:calcDepth(e,i)+1;return this._addToFsEvents(s,false,true,t)}this.fsw._getWatchedDir(n).add(a)}
/**
       * @type {'add'|'addDir'|'unlink'|'unlinkDir'}
       */const r=o.type===Ft?t+Nt:t;this.fsw._emit(r,s);r===wt&&this._addToFsEvents(s,false,true)}}
/**
   * Handle symlinks encountered during directory scan
   * @param {String} watchPath  - file/dir path to be watched with fsevents
   * @param {String} realPath   - real path (in case of symlinks)
   * @param {Function} transform  - path transformer
   * @param {Function} globFilter - path filter in case a glob pattern was provided
   * @returns {Function} closer for the watcher instance
  */_watchWithFsEvents(t,s,e,i){if(this.fsw.closed||this.fsw._isIgnored(t))return;const n=this.fsw.options;const watchCallback=async(r,a,o)=>{if(this.fsw.closed)return;if(n.depth!==void 0&&calcDepth(r,s)>n.depth)return;const h=e(lt.join(t,lt.relative(t,r)));if(i&&!i(h))return;const c=lt.dirname(h);const l=lt.basename(h);const d=this.fsw._getWatchedDir(o.type===Ft?h:c);if(Yt.has(a)||o.event===Tt)if(typeof n.ignored===Wt){let t;try{t=await Ct(h)}catch(t){}if(this.fsw.closed)return;if(this.checkIgnored(h,t))return;sameTypes(o,t)?this.addOrChange(h,r,s,c,d,l,o,n):this.handleEvent(Et,h,r,s,c,d,l,o,n)}else this.checkExists(h,r,s,c,d,l,o,n);else switch(o.event){case vt:case St:return this.addOrChange(h,r,s,c,d,l,o,n);case gt:case Rt:return this.checkExists(h,r,s,c,d,l,o,n)}};const r=setFSEventsListener(t,s,watchCallback,this.fsw._emitRaw);this.fsw._emitReady();return r}
/**
   * Handle symlinks encountered during directory scan
   * @param {String} linkPath path to symlink
   * @param {String} fullPath absolute path to the symlink
   * @param {Function} transform pre-existing path transformer
   * @param {Number} curDepth level of subdirectories traversed to where symlink is
   * @returns {Promise<void>}
   */async _handleFsEventsSymlink(t,s,e,i){if(!this.fsw.closed&&!this.fsw._symlinkPaths.has(s)){this.fsw._symlinkPaths.set(s,true);this.fsw._incrReadyCount();try{const s=await Vt(t);if(this.fsw.closed)return;if(this.fsw._isIgnored(s))return this.fsw._emitReady();this.fsw._incrReadyCount();this._addToFsEvents(s||t,(i=>{let n=t;s&&s!==It?n=i.replace(s,t):i!==It&&(n=lt.join(t,i));return e(n)}),false,i)}catch(t){if(this.fsw._handleError(t))return this.fsw._emitReady()}}}
/**
   *
   * @param {Path} newPath
   * @param {fs.Stats} stats
   */emitAdd(t,s,e,i,n){const r=e(t);const a=s.isDirectory();const o=this.fsw._getWatchedDir(lt.dirname(r));const h=lt.basename(r);a&&this.fsw._getWatchedDir(r);if(!o.has(h)){o.add(h);i.ignoreInitial&&n!==true||this.fsw._emit(a?wt:_t,r,s)}}initWatch(t,s,e,i){if(this.fsw.closed)return;const n=this._watchWithFsEvents(e.watchPath,lt.resolve(t||e.watchPath),i,e.globFilter);this.fsw._addPathCloser(s,n)}
/**
   * Handle added path with fsevents
   * @param {String} path file/dir path or glob pattern
   * @param {Function|Boolean=} transform converts working path to what the user expects
   * @param {Boolean=} forceAdd ensure add is emitted
   * @param {Number=} priorDepth Level of subdirectories already traversed.
   * @returns {Promise<void>}
   */async _addToFsEvents(t,s,e,i){if(this.fsw.closed)return;const n=this.fsw.options;const r=typeof s===Wt?s:Lt;const a=this.fsw._getWatchHelpers(t);try{const s=await Ht[a.statMethod](a.watchPath);if(this.fsw.closed)return;if(this.fsw._isIgnored(a.watchPath,s))throw null;if(s.isDirectory()){a.globFilter||this.emitAdd(r(t),s,r,n,e);if(i&&i>n.depth)return;this.fsw._readdirp(a.watchPath,{fileFilter:t=>a.filterPath(t),directoryFilter:t=>a.filterDir(t),...Depth(n.depth-(i||0))}).on(pt,(t=>{if(this.fsw.closed)return;if(t.stats.isDirectory()&&!a.filterPath(t))return;const s=lt.join(a.watchPath,t.path);const{fullPath:i}=t;if(a.followSymlinks&&t.stats.isSymbolicLink()){const t=n.depth===void 0?void 0:calcDepth(s,lt.resolve(a.watchPath))+1;this._handleFsEventsSymlink(s,i,r,t)}else this.emitAdd(s,t.stats,r,n,e)})).on(mt,Ot).on(yt,(()=>{this.fsw._emitReady()}))}else{this.emitAdd(a.watchPath,s,r,n,e);this.fsw._emitReady()}}catch(t){if(!t||this.fsw._handleError(t)){this.fsw._emitReady();this.fsw._emitReady()}}if(n.persistent&&e!==true)if(typeof s===Wt)this.initWatch(void 0,t,a,r);else{let s;try{s=await Vt(a.watchPath)}catch(t){}this.initWatch(s,t,a,r)}}};ot=Ut;ot.canUse=canUse;var Kt=ot;var Bt=t;try{"default"in t&&(Bt=t.default)}catch(t){}var jt=s;try{"default"in s&&(jt=s.default)}catch(t){}var zt=e;try{"default"in e&&(zt=e.default)}catch(t){}var xt=i;try{"default"in i&&(xt=i.default)}catch(t){}var $t=n;try{"default"in n&&($t=n.default)}catch(t){}var Xt=r;try{"default"in r&&(Xt=r.default)}catch(t){}var Qt=a;try{"default"in a&&(Qt=a.default)}catch(t){}var qt=o;try{"default"in o&&(qt=o.default)}catch(t){}var Jt=h;try{"default"in h&&(Jt=h.default)}catch(t){}var Zt=c;try{"default"in c&&(Zt=c.default)}catch(t){}var ts={};var ss=f;const{EventEmitter:es}=Bt;const is=jt;const ns=zt;const{promisify:rs}=xt;const as=$t;const os=Xt.default;const hs=Qt;const cs=qt;const ls=Jt;const ds=Zt;const fs=et;const _s=Kt;const{EV_ALL:us,EV_READY:ws,EV_ADD:Es,EV_CHANGE:ms,EV_UNLINK:ps,EV_ADD_DIR:ys,EV_UNLINK_DIR:vs,EV_RAW:Ss,EV_ERROR:gs,STR_CLOSE:Rs,STR_END:Ts,BACK_SLASH_RE:Ps,DOUBLE_SLASH_RE:Ds,SLASH_OR_BACK_SLASH_RE:Fs,DOT_RE:bs,REPLACER_RE:As,SLASH:Ns,SLASH_SLASH:Is,BRACE_START:Ws,BANG:Os,ONE_DOT:Ls,TWO_DOTS:Cs,GLOBSTAR:ks,SLASH_GLOBSTAR:Vs,ANYMATCH_OPTS:Hs,STRING_TYPE:Ms,FUNCTION_TYPE:Gs,EMPTY_STR:Ys,EMPTY_FN:Us,isWindows:Ks,isMacos:Bs,isIBMi:js}=E;const zs=rs(is.stat);const xs=rs(is.readdir);
/**
 * @typedef {String} Path
 * @typedef {'all'|'add'|'addDir'|'change'|'unlink'|'unlinkDir'|'raw'|'error'|'ready'} EventName
 * @typedef {'readdir'|'watch'|'add'|'remove'|'change'} ThrottleType
 */
/**
 *
 * @typedef {Object} WatchHelpers
 * @property {Boolean} followSymlinks
 * @property {'stat'|'lstat'} statMethod
 * @property {Path} path
 * @property {Path} watchPath
 * @property {Function} entryPath
 * @property {Boolean} hasGlob
 * @property {Object} globFilter
 * @property {Function} filterPath
 * @property {Function} filterDir
 */const arrify=(t=[])=>Array.isArray(t)?t:[t];const flatten=(t,s=[])=>{t.forEach((t=>{Array.isArray(t)?flatten(t,s):s.push(t)}));return s};const unifyPaths=t=>{
/**
   * @type {Array<String>}
   */
const s=flatten(arrify(t));if(!s.every((t=>typeof t===Ms)))throw new TypeError(`Non-string provided as watch path: ${s}`);return s.map(normalizePathToUnix)};const toUnix=t=>{let s=t.replace(Ps,Ns);let e=false;s.startsWith(Is)&&(e=true);while(s.match(Ds))s=s.replace(Ds,Ns);e&&(s=Ns+s);return s};const normalizePathToUnix=t=>toUnix(ns.normalize(toUnix(t)));const normalizeIgnored=(t=Ys)=>s=>typeof s!==Ms?s:normalizePathToUnix(ns.isAbsolute(s)?s:ns.join(t,s));const getAbsolutePath=(t,s)=>ns.isAbsolute(t)?t:t.startsWith(Os)?Os+ns.join(s,t.slice(1)):ns.join(s,t);const undef=(t,s)=>t[s]===void 0;class DirEntry{
/**
   * @param {Path} dir
   * @param {Function} removeWatcher
   */
constructor(t,s){this.path=t;this._removeWatcher=s;
/** @type {Set<Path>} */this.items=new Set}add(t){const{items:s}=this;s&&t!==Ls&&t!==Cs&&s.add(t)}async remove(t){const{items:s}=this;if(!s)return;s.delete(t);if(s.size>0)return;const e=this.path;try{await xs(e)}catch(t){this._removeWatcher&&this._removeWatcher(ns.dirname(e),ns.basename(e))}}has(t){const{items:s}=this;if(s)return s.has(t)}
/**
   * @returns {Array<String>}
   */getChildren(){const{items:t}=this;if(t)return[...t.values()]}dispose(){this.items.clear();delete this.path;delete this._removeWatcher;delete this.items;Object.freeze(this)}}const $s="stat";const Xs="lstat";class WatchHelper{constructor(t,s,e,i){this.fsw=i;this.path=t=t.replace(As,Ys);this.watchPath=s;this.fullWatchPath=ns.resolve(s);this.hasGlob=s!==t;
/** @type {object|boolean} */t===Ys&&(this.hasGlob=false);this.globSymlink=!(!this.hasGlob||!e)&&void 0;this.globFilter=!!this.hasGlob&&os(t,void 0,Hs);this.dirParts=this.getDirParts(t);this.dirParts.forEach((t=>{t.length>1&&t.pop()}));this.followSymlinks=e;this.statMethod=e?$s:Xs}checkGlobSymlink(t){this.globSymlink===void 0&&(this.globSymlink=t.fullParentDir!==this.fullWatchPath&&{realPath:t.fullParentDir,linkPath:this.fullWatchPath});return this.globSymlink?t.fullPath.replace(this.globSymlink.realPath,this.globSymlink.linkPath):t.fullPath}entryPath(t){return ns.join(this.watchPath,ns.relative(this.watchPath,this.checkGlobSymlink(t)))}filterPath(t){const{stats:s}=t;if(s&&s.isSymbolicLink())return this.filterDir(t);const e=this.entryPath(t);const i=!this.hasGlob||typeof this.globFilter!==Gs||this.globFilter(e);return i&&this.fsw._isntIgnored(e,s)&&this.fsw._hasReadPermissions(s)}getDirParts(t){if(!this.hasGlob)return[];const s=[];const e=t.includes(Ws)?ls.expand(t):[t];e.forEach((t=>{s.push(ns.relative(this.watchPath,t).split(Fs))}));return s}filterDir(t){if(this.hasGlob){const s=this.getDirParts(this.checkGlobSymlink(t));let e=false;this.unmatchedGlob=!this.dirParts.some((t=>t.every(((t,i)=>{t===ks&&(e=true);return e||!s[0][i]||os(t,s[0][i],Hs)}))))}return!this.unmatchedGlob&&this.fsw._isntIgnored(this.entryPath(t),t.stats)}}class FSWatcher extends es{constructor(t){super();const s={};t&&Object.assign(s,t);
/** @type {Map<String, DirEntry>} */this._watched=new Map;
/** @type {Map<String, Array>} */this._closers=new Map;
/** @type {Set<String>} */this._ignoredPaths=new Set;
/** @type {Map<ThrottleType, Map>} */this._throttled=new Map;
/** @type {Map<Path, String|Boolean>} */this._symlinkPaths=new Map;this._streams=new Set;this.closed=false;undef(s,"persistent")&&(s.persistent=true);undef(s,"ignoreInitial")&&(s.ignoreInitial=false);undef(s,"ignorePermissionErrors")&&(s.ignorePermissionErrors=false);undef(s,"interval")&&(s.interval=100);undef(s,"binaryInterval")&&(s.binaryInterval=300);undef(s,"disableGlobbing")&&(s.disableGlobbing=false);s.enableBinaryInterval=s.binaryInterval!==s.interval;undef(s,"useFsEvents")&&(s.useFsEvents=!s.usePolling);const e=_s.canUse();e||(s.useFsEvents=false);undef(s,"usePolling")&&!s.useFsEvents&&(s.usePolling=Bs);js&&(s.usePolling=true);const i=ss.env.CHOKIDAR_USEPOLLING;if(i!==void 0){const t=i.toLowerCase();s.usePolling=t!=="false"&&t!=="0"&&(t==="true"||t==="1"||!!t)}const n=ss.env.CHOKIDAR_INTERVAL;n&&(s.interval=Number.parseInt(n,10));undef(s,"atomic")&&(s.atomic=!s.usePolling&&!s.useFsEvents);s.atomic&&(this._pendingUnlinks=new Map);undef(s,"followSymlinks")&&(s.followSymlinks=true);undef(s,"awaitWriteFinish")&&(s.awaitWriteFinish=false);s.awaitWriteFinish===true&&(s.awaitWriteFinish={});const r=s.awaitWriteFinish;if(r){r.stabilityThreshold||(r.stabilityThreshold=2e3);r.pollInterval||(r.pollInterval=100);this._pendingWrites=new Map}s.ignored&&(s.ignored=arrify(s.ignored));let a=0;this._emitReady=()=>{a++;if(a>=this._readyCount){this._emitReady=Us;this._readyEmitted=true;ss.nextTick((()=>this.emit(ws)))}};this._emitRaw=(...t)=>this.emit(Ss,...t);this._readyEmitted=false;this.options=s;s.useFsEvents?this._fsEventsHandler=new _s(this):this._nodeFsHandler=new fs(this);Object.freeze(s)}
/**
   * Adds paths to be watched on an existing FSWatcher instance
   * @param {Path|Array<Path>} paths_
   * @param {String=} _origAdd private; for handling non-existent paths to be watched
   * @param {Boolean=} _internal private; indicates a non-user add
   * @returns {FSWatcher} for chaining
   */
add(t,s,e){const{cwd:i,disableGlobbing:n}=this.options;this.closed=false;let r=unifyPaths(t);i&&(r=r.map((t=>{const s=getAbsolutePath(t,i);return n||!cs(t)?s:ds(s)})));r=r.filter((t=>{if(t.startsWith(Os)){this._ignoredPaths.add(t.slice(1));return false}this._ignoredPaths.delete(t);this._ignoredPaths.delete(t+Vs);this._userIgnored=void 0;return true}));if(this.options.useFsEvents&&this._fsEventsHandler){this._readyCount||(this._readyCount=r.length);this.options.persistent&&(this._readyCount+=r.length);r.forEach((t=>this._fsEventsHandler._addToFsEvents(t)))}else{this._readyCount||(this._readyCount=0);this._readyCount+=r.length;Promise.all(r.map((async t=>{const i=await this._nodeFsHandler._addToNodeFs(t,!e,0,0,s);i&&this._emitReady();return i}))).then((t=>{this.closed||t.filter((t=>t)).forEach((t=>{this.add(ns.dirname(t),ns.basename(s||t))}))}))}return this}
/**
   * Close watchers or start ignoring events from specified paths.
   * @param {Path|Array<Path>} paths_ - string or array of strings, file/directory paths and/or globs
   * @returns {FSWatcher} for chaining
  */unwatch(t){if(this.closed)return this;const s=unifyPaths(t);const{cwd:e}=this.options;s.forEach((t=>{if(!ns.isAbsolute(t)&&!this._closers.has(t)){e&&(t=ns.join(e,t));t=ns.resolve(t)}this._closePath(t);this._ignoredPaths.add(t);this._watched.has(t)&&this._ignoredPaths.add(t+Vs);this._userIgnored=void 0}));return this}
/**
   * Close watchers and remove all listeners from watched paths.
   * @returns {Promise<void>}.
  */close(){if(this.closed)return this._closePromise;this.closed=true;this.removeAllListeners();const t=[];this._closers.forEach((s=>s.forEach((s=>{const e=s();e instanceof Promise&&t.push(e)}))));this._streams.forEach((t=>t.destroy()));this._userIgnored=void 0;this._readyCount=0;this._readyEmitted=false;this._watched.forEach((t=>t.dispose()));["closers","watched","streams","symlinkPaths","throttled"].forEach((t=>{this[`_${t}`].clear()}));this._closePromise=t.length?Promise.all(t).then((()=>{})):Promise.resolve();return this._closePromise}
/**
   * Expose list of watched paths
   * @returns {Object} for chaining
  */getWatched(){const t={};this._watched.forEach(((s,e)=>{const i=this.options.cwd?ns.relative(this.options.cwd,e):e;t[i||Ls]=s.getChildren().sort()}));return t}emitWithAll(t,s){this.emit(...s);t!==gs&&this.emit(us,...s)}
/**
   * Normalize and emit events.
   * Calling _emit DOES NOT MEAN emit() would be called!
   * @param {EventName} event Type of event
   * @param {Path} path File or directory path
   * @param {*=} val1 arguments to be passed with event
   * @param {*=} val2
   * @param {*=} val3
   * @returns the error if defined, otherwise the value of the FSWatcher instance's `closed` flag
   */
async _emit(t,s,e,i,n){if(this.closed)return;const r=this.options;Ks&&(s=ns.normalize(s));r.cwd&&(s=ns.relative(r.cwd,s))
/** @type Array<any> */;const a=[t,s];n!==void 0?a.push(e,i,n):i!==void 0?a.push(e,i):e!==void 0&&a.push(e);const o=r.awaitWriteFinish;let h;if(o&&(h=this._pendingWrites.get(s))){h.lastChange=new Date;return this}if(r.atomic){if(t===ps){this._pendingUnlinks.set(s,a);setTimeout((()=>{this._pendingUnlinks.forEach(((t,s)=>{this.emit(...t);this.emit(us,...t);this._pendingUnlinks.delete(s)}))}),typeof r.atomic==="number"?r.atomic:100);return this}if(t===Es&&this._pendingUnlinks.has(s)){t=a[0]=ms;this._pendingUnlinks.delete(s)}}if(o&&(t===Es||t===ms)&&this._readyEmitted){const awfEmit=(s,e)=>{if(s){t=a[0]=gs;a[1]=s;this.emitWithAll(t,a)}else if(e){a.length>2?a[2]=e:a.push(e);this.emitWithAll(t,a)}};this._awaitWriteFinish(s,o.stabilityThreshold,t,awfEmit);return this}if(t===ms){const t=!this._throttle(ms,s,50);if(t)return this}if(r.alwaysStat&&e===void 0&&(t===Es||t===ys||t===ms)){const t=r.cwd?ns.join(r.cwd,s):s;let e;try{e=await zs(t)}catch(t){}if(!e||this.closed)return;a.push(e)}this.emitWithAll(t,a);return this}
/**
   * Common handler for errors
   * @param {Error} error
   * @returns {Error|Boolean} The error if defined, otherwise the value of the FSWatcher instance's `closed` flag
   */_handleError(t){const s=t&&t.code;t&&s!=="ENOENT"&&s!=="ENOTDIR"&&(!this.options.ignorePermissionErrors||s!=="EPERM"&&s!=="EACCES")&&this.emit(gs,t);return t||this.closed}
/**
   * Helper utility for throttling
   * @param {ThrottleType} actionType type being throttled
   * @param {Path} path being acted upon
   * @param {Number} timeout duration of time to suppress duplicate actions
   * @returns {Object|false} tracking object or false if action should be suppressed
   */_throttle(t,s,e){this._throttled.has(t)||this._throttled.set(t,new Map)
/** @type {Map<Path, Object>} */;const i=this._throttled.get(t);
/** @type {Object} */const n=i.get(s);if(n){n.count++;return false}let r;const clear=()=>{const t=i.get(s);const e=t?t.count:0;i.delete(s);clearTimeout(r);t&&clearTimeout(t.timeoutObject);return e};r=setTimeout(clear,e);const a={timeoutObject:r,clear:clear,count:0};i.set(s,a);return a}_incrReadyCount(){return this._readyCount++}
/**
   * Awaits write operation to finish.
   * Polls a newly created file for size variations. When files size does not change for 'threshold' milliseconds calls callback.
   * @param {Path} path being acted upon
   * @param {Number} threshold Time in milliseconds a file size must be fixed before acknowledging write OP is finished
   * @param {EventName} event
   * @param {Function} awfEmit Callback to be called when ready for event to be emitted.
   */_awaitWriteFinish(t,s,e,i){let n;let r=t;this.options.cwd&&!ns.isAbsolute(t)&&(r=ns.join(this.options.cwd,t));const a=new Date;const awaitWriteFinish=e=>{is.stat(r,((r,a)=>{if(r||!this._pendingWrites.has(t)){r&&r.code!=="ENOENT"&&i(r);return}const o=Number(new Date);e&&a.size!==e.size&&(this._pendingWrites.get(t).lastChange=o);const h=this._pendingWrites.get(t);const c=o-h.lastChange;if(c>=s){this._pendingWrites.delete(t);i(void 0,a)}else n=setTimeout(awaitWriteFinish,this.options.awaitWriteFinish.pollInterval,a)}))};if(!this._pendingWrites.has(t)){this._pendingWrites.set(t,{lastChange:a,cancelWait:()=>{this._pendingWrites.delete(t);clearTimeout(n);return e}});n=setTimeout(awaitWriteFinish,this.options.awaitWriteFinish.pollInterval)}}_getGlobIgnored(){return[...this._ignoredPaths.values()]}
/**
   * Determines whether user has asked to ignore this path.
   * @param {Path} path filepath or dir
   * @param {fs.Stats=} stats result of fs.stat
   * @returns {Boolean}
   */_isIgnored(t,s){if(this.options.atomic&&bs.test(t))return true;if(!this._userIgnored){const{cwd:t}=this.options;const s=this.options.ignored;const e=s&&s.map(normalizeIgnored(t));const i=arrify(e).filter((t=>typeof t===Ms&&!cs(t))).map((t=>t+Vs));const n=this._getGlobIgnored().map(normalizeIgnored(t)).concat(e,i);this._userIgnored=os(n,void 0,Hs)}return this._userIgnored([t,s])}_isntIgnored(t,s){return!this._isIgnored(t,s)}
/**
   * Provides a set of common helpers and properties relating to symlink and glob handling.
   * @param {Path} path file, directory, or glob pattern being watched
   * @param {Number=} depth at any depth > 0, this isn't a glob
   * @returns {WatchHelper} object containing helpers for this path
   */_getWatchHelpers(t,s){const e=s||this.options.disableGlobbing||!cs(t)?t:hs(t);const i=this.options.followSymlinks;return new WatchHelper(t,e,i,this)}
/**
   * Provides directory tracking objects
   * @param {String} directory path of the directory
   * @returns {DirEntry} the directory's tracking object
   */
_getWatchedDir(t){this._boundRemove||(this._boundRemove=this._remove.bind(this));const s=ns.resolve(t);this._watched.has(s)||this._watched.set(s,new DirEntry(s,this._boundRemove));return this._watched.get(s)}
/**
   * Check for read permissions.
   * Based on this answer on SO: https://stackoverflow.com/a/11781404/1358405
   * @param {fs.Stats} stats - object, result of fs_stat
   * @returns {Boolean} indicates whether the file can be read
  */
_hasReadPermissions(t){if(this.options.ignorePermissionErrors)return true;const s=t&&Number.parseInt(t.mode,10);const e=s&511;const i=Number.parseInt(e.toString(8)[0],10);return Boolean(4&i)}
/**
   * Handles emitting unlink events for
   * files and directories, and via recursion, for
   * files and directories within directories that are unlinked
   * @param {String} directory within which the following item is located
   * @param {String} item      base path of item/directory
   * @returns {void}
  */_remove(t,s,e){const i=ns.join(t,s);const n=ns.resolve(i);e=e!=null?e:this._watched.has(i)||this._watched.has(n);if(!this._throttle("remove",i,100))return;e||this.options.useFsEvents||this._watched.size!==1||this.add(t,s,true);const r=this._getWatchedDir(i);const a=r.getChildren();a.forEach((t=>this._remove(i,t)));const o=this._getWatchedDir(t);const h=o.has(s);o.remove(s);this._symlinkPaths.has(n)&&this._symlinkPaths.delete(n);let c=i;this.options.cwd&&(c=ns.relative(this.options.cwd,i));if(this.options.awaitWriteFinish&&this._pendingWrites.has(c)){const t=this._pendingWrites.get(c).cancelWait();if(t===Es)return}this._watched.delete(i);this._watched.delete(n);const l=e?vs:ps;h&&!this._isIgnored(i)&&this._emit(l,i);this.options.useFsEvents||this._closePath(i)}
/**
   * Closes all watchers for a path
   * @param {Path} path
   */_closePath(t){this._closeFile(t);const s=ns.dirname(t);this._getWatchedDir(s).remove(ns.basename(t))}
/**
   * Closes only file-specific watchers
   * @param {Path} path
   */_closeFile(t){const s=this._closers.get(t);if(s){s.forEach((t=>t()));this._closers.delete(t)}}
/**
   *
   * @param {Path} path
   * @param {Function} closer
   */_addPathCloser(t,s){if(!s)return;let e=this._closers.get(t);if(!e){e=[];this._closers.set(t,e)}e.push(s)}_readdirp(t,s){if(this.closed)return;const e={type:us,alwaysStat:true,lstat:true,...s};let i=as(t,e);this._streams.add(i);i.once(Rs,(()=>{i=void 0}));i.once(Ts,(()=>{if(i){this._streams.delete(i);i=void 0}}));return i}}ts.FSWatcher=FSWatcher;
/**
 * Instantiates watcher with paths to be tracked.
 * @param {String|Array<String>} paths file/directory paths and/or globs
 * @param {Object=} options chokidar opts
 * @returns an instance of FSWatcher for chaining.
 */const watch=(t,s)=>{const e=new FSWatcher(s);e.add(t);return e};ts.watch=watch;const Qs=ts.FSWatcher,qs=ts.watch;export{Qs as FSWatcher,ts as default,qs as watch};


import t from"process";var e={};var i=t;class Storage{constructor(t){this.duration=t;this.running=new Map;this.data=new Map;this.levels=[];if(t>0){this.levels.push(new Set,new Set,new Set,new Set,new Set,new Set,new Set,new Set,new Set);for(let e=8e3;e<t;e+=500)this.levels.push(new Set)}this.count=0;this.interval=null;this.needTickCheck=false;this.nextTick=null;this.passive=true;this.tick=this.tick.bind(this)}ensureTick(){!this.interval&&this.duration>0&&!this.nextTick&&(this.interval=setInterval(this.tick,Math.floor(this.duration/this.levels.length)))}finished(t,e,i){const s=this.running.get(t);this.running.delete(t);if(this.duration>0){this.data.set(t,[e,i]);const s=this.levels[0];this.count-=s.size;s.add(t);this.count+=s.size;this.ensureTick()}for(let t=0;t<s.length;t++)s[t](e,i)}finishedSync(t,e,i){if(this.duration>0){this.data.set(t,[e,i]);const s=this.levels[0];this.count-=s.size;s.add(t);this.count+=s.size;this.ensureTick()}}provide(t,e,s){if("string"!==typeof t){s(new TypeError("path must be a string"));return}let r=this.running.get(t);if(r)r.push(s);else{if(this.duration>0){this.checkTicks();const e=this.data.get(t);if(e)return i.nextTick((()=>{s.apply(null,e)}))}this.running.set(t,r=[s]);e(t,((e,i)=>{this.finished(t,e,i)}))}}provideSync(t,e){if("string"!==typeof t)throw new TypeError("path must be a string");if(this.duration>0){this.checkTicks();const e=this.data.get(t);if(e){if(e[0])throw e[0];return e[1]}}let i;try{i=e(t)}catch(e){this.finishedSync(t,e);throw e}this.finishedSync(t,null,i);return i}tick(){const t=this.levels.pop();for(let e of t)this.data.delete(e);this.count-=t.size;t.clear();this.levels.unshift(t);if(0===this.count){clearInterval(this.interval);this.interval=null;this.nextTick=null;return true}if(this.nextTick){this.nextTick+=Math.floor(this.duration/this.levels.length);const t=(new Date).getTime();if(this.nextTick>t){this.nextTick=null;this.interval=setInterval(this.tick,Math.floor(this.duration/this.levels.length));return true}}else if(this.passive){clearInterval(this.interval);this.interval=null;this.nextTick=(new Date).getTime()+Math.floor(this.duration/this.levels.length)}else this.passive=true}checkTicks(){this.passive=false;if(this.nextTick)while(!this.tick());}purge(t){if(t)if("string"===typeof t)for(let e of this.data.keys())e.startsWith(t)&&this.data.delete(e);else for(let e=t.length-1;e>=0;e--)this.purge(t[e]);else{this.count=0;clearInterval(this.interval);this.nextTick=null;this.data.clear();this.levels.forEach((t=>{t.clear()}))}}}e=class CachedInputFileSystem{constructor(t,e){this.fileSystem=t;this._statStorage=new Storage(e);this._readdirStorage=new Storage(e);this._readFileStorage=new Storage(e);this._readJsonStorage=new Storage(e);this._readlinkStorage=new Storage(e);this._stat=this.fileSystem.stat?this.fileSystem.stat.bind(this.fileSystem):null;this._stat||(this.stat=null);this._statSync=this.fileSystem.statSync?this.fileSystem.statSync.bind(this.fileSystem):null;this._statSync||(this.statSync=null);this._readdir=this.fileSystem.readdir?this.fileSystem.readdir.bind(this.fileSystem):null;this._readdir||(this.readdir=null);this._readdirSync=this.fileSystem.readdirSync?this.fileSystem.readdirSync.bind(this.fileSystem):null;this._readdirSync||(this.readdirSync=null);this._readFile=this.fileSystem.readFile?this.fileSystem.readFile.bind(this.fileSystem):null;this._readFile||(this.readFile=null);this._readFileSync=this.fileSystem.readFileSync?this.fileSystem.readFileSync.bind(this.fileSystem):null;this._readFileSync||(this.readFileSync=null);this.fileSystem.readJson?this._readJson=this.fileSystem.readJson.bind(this.fileSystem):this.readFile?this._readJson=(t,e)=>{this.readFile(t,((t,i)=>{if(t)return e(t);let s;try{s=JSON.parse(i.toString("utf-8"))}catch(t){return e(t)}e(null,s)}))}:this.readJson=null;this.fileSystem.readJsonSync?this._readJsonSync=this.fileSystem.readJsonSync.bind(this.fileSystem):this.readFileSync?this._readJsonSync=t=>{const e=this.readFileSync(t);const i=JSON.parse(e.toString("utf-8"));return i}:this.readJsonSync=null;this._readlink=this.fileSystem.readlink?this.fileSystem.readlink.bind(this.fileSystem):null;this._readlink||(this.readlink=null);this._readlinkSync=this.fileSystem.readlinkSync?this.fileSystem.readlinkSync.bind(this.fileSystem):null;this._readlinkSync||(this.readlinkSync=null)}stat(t,e){this._statStorage.provide(t,this._stat,e)}readdir(t,e){this._readdirStorage.provide(t,this._readdir,e)}readFile(t,e){this._readFileStorage.provide(t,this._readFile,e)}readJson(t,e){this._readJsonStorage.provide(t,this._readJson,e)}readlink(t,e){this._readlinkStorage.provide(t,this._readlink,e)}statSync(t){return this._statStorage.provideSync(t,this._statSync)}readdirSync(t){return this._readdirStorage.provideSync(t,this._readdirSync)}readFileSync(t){return this._readFileStorage.provideSync(t,this._readFileSync)}readJsonSync(t){return this._readJsonStorage.provideSync(t,this._readJsonSync)}readlinkSync(t){return this._readlinkStorage.provideSync(t,this._readlinkSync)}purge(t){this._statStorage.purge(t);this._readdirStorage.purge(t);this._readFileStorage.purge(t);this._readlinkStorage.purge(t);this._readJsonStorage.purge(t)}};var s=e;export default s;


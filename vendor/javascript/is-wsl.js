import r from"os";import e from"fs";import o from"process";var t={};var s=o;const f=r;const n=e;const isWsl=()=>{if("linux"!==s.platform)return false;if(f.release().includes("Microsoft"))return true;try{return n.readFileSync("/proc/version","utf8").includes("Microsoft")}catch(r){return false}};t=s.env.__IS_WSL_TEST__?isWsl:isWsl();var c=t;export default c;


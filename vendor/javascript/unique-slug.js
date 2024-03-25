import r from"imurmurhash";var t={};var u=r;t=function(r){if(r){var t=new u(r);return("00000000"+t.result().toString(16)).substr(-8)}return(Math.random().toString(16)+"0000000").substr(2,8)};var a=t;export default a;


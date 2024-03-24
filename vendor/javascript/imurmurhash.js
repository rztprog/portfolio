var t="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var e={};
/**
 * @preserve
 * JS Implementation of incremental MurmurHash3 (r150) (as of May 10, 2013)
 *
 * @author <a href="mailto:jensyt@gmail.com">Jens Taylor</a>
 * @see http://github.com/homebrewing/brauhaus-diff
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 */(function(){var r;function MurmurHash3(e,h){var s=(this||t)instanceof MurmurHash3?this||t:r;s.reset(h);"string"===typeof e&&e.length>0&&s.hash(e);if(s!==(this||t))return s}MurmurHash3.prototype.hash=function(e){var r,h,s,a,i;i=e.length;(this||t).len+=i;h=(this||t).k1;s=0;switch((this||t).rem){case 0:h^=i>s?65535&e.charCodeAt(s++):0;case 1:h^=i>s?(65535&e.charCodeAt(s++))<<8:0;case 2:h^=i>s?(65535&e.charCodeAt(s++))<<16:0;case 3:h^=i>s?(255&e.charCodeAt(s))<<24:0;h^=i>s?(65280&e.charCodeAt(s++))>>8:0}(this||t).rem=i+(this||t).rem&3;i-=(this||t).rem;if(i>0){r=(this||t).h1;while(1){h=11601*h+3432906752*(65535&h)&4294967295;h=h<<15|h>>>17;h=13715*h+461832192*(65535&h)&4294967295;r^=h;r=r<<13|r>>>19;r=5*r+3864292196&4294967295;if(s>=i)break;h=65535&e.charCodeAt(s++)^(65535&e.charCodeAt(s++))<<8^(65535&e.charCodeAt(s++))<<16;a=e.charCodeAt(s++);h^=(255&a)<<24^(65280&a)>>8}h=0;switch((this||t).rem){case 3:h^=(65535&e.charCodeAt(s+2))<<16;case 2:h^=(65535&e.charCodeAt(s+1))<<8;case 1:h^=65535&e.charCodeAt(s)}(this||t).h1=r}(this||t).k1=h;return this||t};MurmurHash3.prototype.result=function(){var e,r;e=(this||t).k1;r=(this||t).h1;if(e>0){e=11601*e+3432906752*(65535&e)&4294967295;e=e<<15|e>>>17;e=13715*e+461832192*(65535&e)&4294967295;r^=e}r^=(this||t).len;r^=r>>>16;r=51819*r+2246770688*(65535&r)&4294967295;r^=r>>>13;r=44597*r+3266445312*(65535&r)&4294967295;r^=r>>>16;return r>>>0};MurmurHash3.prototype.reset=function(e){(this||t).h1="number"===typeof e?e:0;(this||t).rem=(this||t).k1=(this||t).len=0;return this||t};r=new MurmurHash3;e=MurmurHash3})();var r=e;export default r;


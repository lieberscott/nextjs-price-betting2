(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{30928:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(85893),a=n(67294);function i(e){var t=(0,a.useState)(0),n=t[0],i=t[1],u=(0,a.useState)(0),o=u[0],s=u[1],l=(0,a.useState)(0),p=l[0],c=l[1];(0,a.useEffect)((function(){var t=Date.now(),n=1e3*parseInt(e.cutoffTime),r=n-t<0?[0,0,0]:f(n-t);i(r[0]),s(r[1]),c(r[2])}),[]);var f=function(e){var t=Math.floor(e/1e3%60),n=Math.floor(e/6e4%60);return[Math.floor(e/36e5%24),n,t]};return(0,a.useEffect)((function(){var e=setInterval((function(){p>0&&c(p-1),0===o&&(0===n?clearInterval(e):(i(n-1),s(59),c(59))),0===p&&(0===o?clearInterval(e):(s(o-1),c(59)))}),1e3);return function(){clearInterval(e)}})),(0,r.jsx)("div",{className:"flex",children:0===n&&0===o&&0===p?"Entries Closed":(0,r.jsxs)("span",{children:[" ",n,":",o<10?"0".concat(o):o,":",p<10?"0".concat(p):p]})})}},96301:function(e,t,n){"use strict";var r=n(37917),a=n(83753),i=n(4463);e.exports={contractAddresses:r,factoryAbi:a,instanceAbi:i}},31551:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,i=[],u=!0,o=!1;try{for(n=n.call(e);!(u=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);u=!0);}catch(s){o=!0,a=s}finally{try{u||null==n.return||n.return()}finally{if(o)throw a}}return i}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i,u=(i=n(67294))&&i.__esModule?i:{default:i},o=n(41003),s=n(80880),l=n(69246);var p={};function c(e,t,n,r){if(e&&o.isLocalURL(t)){e.prefetch(t,n,r).catch((function(e){0}));var a=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;p[t+"%"+n+(a?"%"+a:"")]=!0}}var f=function(e){var t,n=!1!==e.prefetch,r=s.useRouter(),i=u.default.useMemo((function(){var t=a(o.resolveHref(r,e.href,!0),2),n=t[0],i=t[1];return{href:n,as:e.as?o.resolveHref(r,e.as):i||n}}),[r,e.href,e.as]),f=i.href,y=i.as,d=u.default.useRef(f),m=u.default.useRef(y),v=e.children,b=e.replace,g=e.shallow,M=e.scroll,T=e.locale;"string"===typeof v&&(v=u.default.createElement("a",null,v));var h=(t=u.default.Children.only(v))&&"object"===typeof t&&t.ref,_=a(l.useIntersection({rootMargin:"200px"}),3),w=_[0],x=_[1],k=_[2],E=u.default.useCallback((function(e){m.current===y&&d.current===f||(k(),m.current=y,d.current=f),w(e),h&&("function"===typeof h?h(e):"object"===typeof h&&(h.current=e))}),[y,h,f,k,w]);u.default.useEffect((function(){var e=x&&n&&o.isLocalURL(f),t="undefined"!==typeof T?T:r&&r.locale,a=p[f+"%"+y+(t?"%"+t:"")];e&&!a&&c(r,f,y,{locale:t})}),[y,f,x,T,n,r]);var I={ref:E,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,r,a,i,u,s){("A"!==e.currentTarget.nodeName.toUpperCase()||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&o.isLocalURL(n))&&(e.preventDefault(),t[a?"replace":"push"](n,r,{shallow:i,locale:s,scroll:u}))}(e,r,f,y,b,g,M,T)},onMouseEnter:function(e){t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),o.isLocalURL(f)&&c(r,f,y,{priority:!0})}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var C="undefined"!==typeof T?T:r&&r.locale,P=r&&r.isLocaleDomain&&o.getDomainLocale(y,C,r&&r.locales,r&&r.domainLocales);I.href=P||o.addBasePath(o.addLocale(y,C,r&&r.defaultLocale))}return u.default.cloneElement(t,I)};t.default=f,("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&(Object.assign(t.default,t),e.exports=t.default)},69246:function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,i=[],u=!0,o=!1;try{for(n=n.call(e);!(u=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);u=!0);}catch(s){o=!0,a=s}finally{try{u||null==n.return||n.return()}finally{if(o)throw a}}return i}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,n=e.rootMargin,r=e.disabled||!o,p=i.useRef(),c=a(i.useState(!1),2),f=c[0],y=c[1],d=a(i.useState(t?t.current:null),2),m=d[0],v=d[1],b=i.useCallback((function(e){p.current&&(p.current(),p.current=void 0),r||f||e&&e.tagName&&(p.current=function(e,t,n){var r=function(e){var t,n={root:e.root||null,margin:e.rootMargin||""},r=l.find((function(e){return e.root===n.root&&e.margin===n.margin}));r?t=s.get(r):(t=s.get(n),l.push(n));if(t)return t;var a=new Map,i=new IntersectionObserver((function(e){e.forEach((function(e){var t=a.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return s.set(n,t={id:n,observer:i,elements:a}),t}(n),a=r.id,i=r.observer,u=r.elements;return u.set(e,t),i.observe(e),function(){if(u.delete(e),i.unobserve(e),0===u.size){i.disconnect(),s.delete(a);var t=l.findIndex((function(e){return e.root===a.root&&e.margin===a.margin}));t>-1&&l.splice(t,1)}}}(e,(function(e){return e&&y(e)}),{root:m,rootMargin:n}))}),[r,m,n,f]),g=i.useCallback((function(){y(!1)}),[]);return i.useEffect((function(){if(!o&&!f){var e=u.requestIdleCallback((function(){return y(!0)}));return function(){return u.cancelIdleCallback(e)}}}),[f]),i.useEffect((function(){t&&v(t.current)}),[t]),[b,f,g]};var i=n(67294),u=n(44686),o="undefined"!==typeof IntersectionObserver;var s=new Map,l=[];("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&(Object.assign(t.default,t),e.exports=t.default)},1438:function(e,t,n){"use strict";n.d(t,{P:function(){return r}});var r=function(e){var t=1e3*parseInt(e),n=new Date(t),r=parseInt(n.getMonth())+1,a=n.getDate(),i=n.getFullYear(),u=parseInt(n.getHours()),o=u%12===0?12:u%12,s=u>=12?"p.m.":"a.m.",l=parseInt(n.getMinutes()).toLocaleString("en-US",{minimumIntegerDigits:2,useGrouping:!1});return"".concat(r,"/").concat(a,"/").concat(i,", ").concat(o,":").concat(l," ").concat(s)}},41664:function(e,t,n){e.exports=n(31551)},37917:function(e){"use strict";e.exports=JSON.parse('{"31337":["0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"]}')},83753:function(e){"use strict";e.exports=JSON.parse('[{"inputs":[{"internalType":"address","name":"_ethUsdPriceFeed","type":"address"},{"internalType":"address","name":"_btcUsdPriceFeed","type":"address"},{"internalType":"address","name":"_dogeUsdPriceFeed","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"PredictionMarket__CallFailed","type":"error"},{"inputs":[],"name":"PredictionMarket__IneligibleExpirationTime","type":"error"},{"inputs":[],"name":"PredictionMarket__IneligiblePredictionCutoffTime","type":"error"},{"inputs":[],"name":"PredictionMarket__NotOwner","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"marketCreator","type":"address"},{"indexed":true,"internalType":"uint256","name":"asset","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"entryFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"predictionCutoffTime","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"expirationTime","type":"uint256"}],"name":"MarketCreated","type":"event"},{"inputs":[{"internalType":"uint256","name":"_asset","type":"uint256"},{"internalType":"uint256","name":"_entryFee","type":"uint256"},{"internalType":"uint256","name":"_predictionCutoffTime","type":"uint256"},{"internalType":"uint256","name":"_expirationTime","type":"uint256"}],"name":"createMarket","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"getMarket","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumMarkets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPriceFeeds","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]')},4463:function(e){"use strict";e.exports=JSON.parse('[{"inputs":[{"internalType":"uint256","name":"_asset","type":"uint256"},{"internalType":"uint256","name":"_entryFee","type":"uint256"},{"internalType":"uint256","name":"_predictionCutoffTime","type":"uint256"},{"internalType":"uint256","name":"_expirationTime","type":"uint256"},{"internalType":"address","name":"_priceFeed","type":"address"}],"stateMutability":"payable","type":"constructor"},{"inputs":[],"name":"Market__Ended","type":"error"},{"inputs":[],"name":"Market__ExpirationTimeNotReached","type":"error"},{"inputs":[],"name":"Market__MustExpireInFuture","type":"error"},{"inputs":[],"name":"Market__NotEnoughEth","type":"error"},{"inputs":[],"name":"Market__PayoutFailed","type":"error"},{"inputs":[],"name":"Market__PredictionsClosed","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"predictor","type":"address"},{"indexed":true,"internalType":"uint256","name":"price","type":"uint256"}],"name":"PredictionMade","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"winner","type":"address"},{"indexed":true,"internalType":"uint256","name":"_amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_asset","type":"uint256"}],"name":"WinnerChosen","type":"event"},{"inputs":[],"name":"endMarket","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAsset","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCutoffTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getDeployTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEntryFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEthBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getExpirationTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getIsOpen","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getNumPlayers","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPredictions","outputs":[{"components":[{"internalType":"address","name":"bettorAddress","type":"address"},{"internalType":"uint256","name":"priceGuess","type":"uint256"}],"internalType":"struct Market.prediction[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getPriceFeed","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"makePrediction","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]')}}]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();class Ne{constructor(){this.routes={},this.currentComponent=null,this.mountPoint=null,window.addEventListener("hashchange",()=>this.handleRouting()),window.addEventListener("DOMContentLoaded",()=>this.handleRouting())}setMountPoint(e){this.mountPoint=document.getElementById(e)}on(e,s){this.routes[e]=s}handleRouting(){if(!this.mountPoint&&(this.mountPoint=document.getElementById("view-mount"),!this.mountPoint))return;let e=window.location.hash||"#/dashboard";this.routes[e]||(e="#/dashboard");const s=this.routes[e];this.currentComponent&&typeof this.currentComponent.destroy=="function"&&this.currentComponent.destroy(),this.mountPoint.innerHTML=s.render(),typeof s.init=="function"&&s.init(),this.currentComponent=s,document.querySelectorAll(".nav-link").forEach(n=>{n.getAttribute("href")===e?(n.classList.add("active"),n.setAttribute("aria-current","page")):(n.classList.remove("active"),n.removeAttribute("aria-current"))})}navigate(e){window.location.hash=e}}const x=new Ne;class $e{constructor(e){this.onThemeChange=e}render(){return`
      <div class="nav-container">
        <a href="#/dashboard" class="logo-link">
          <svg class="logo-icon" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
            <circle cx="12" cy="12" r="10" stroke-opacity="0.1" />
          </svg>
          <span class="logo-text">ParkGuard</span>
        </a>
        <nav>
          <ul>
            <li><a href="#/dashboard" class="nav-link">Dashboard</a></li>
            <li><a href="#/simulator" class="nav-link">Security Simulator</a></li>
            <li><a href="#/admin" class="nav-link">Admin Center</a></li>
            <li><a href="#/about" class="nav-link">About Us</a></li>
            <li><a href="#/contact" class="nav-link">Contact &amp; Support</a></li>
          </ul>
        </nav>
        <div class="controls-container">
          <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle light/dark theme">
            <svg class="theme-icon-sun" viewBox="0 0 24 24" style="display: none;">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
            <svg class="theme-icon-moon" viewBox="0 0 24 24">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </button>
        </div>
      </div>
    `}init(){const e=document.getElementById("theme-toggle");if(!e)return;const s=e.querySelector(".theme-icon-sun"),n=e.querySelector(".theme-icon-moon"),t=document.documentElement,i=localStorage.getItem("theme")||"light";t.setAttribute("data-theme",i),a(i),e.addEventListener("click",()=>{const l=t.getAttribute("data-theme")==="dark"?"light":"dark";t.setAttribute("data-theme",l),localStorage.setItem("theme",l),a(l),this.onThemeChange&&this.onThemeChange(l)});function a(r){r==="dark"?(s.style.display="block",n.style.display="none"):(s.style.display="none",n.style.display="block")}}}class ze{render(){return`
      <div class="hero-section" style="background: linear-gradient(135deg, hsl(var(--accent-rgb) / 0.05) 0%, hsl(var(--accent-rgb) / 0.01) 100%); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 2.5rem 2rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem; position: relative; overflow: hidden; box-shadow: var(--card-shadow);">
        <div style="flex: 1.5; z-index: 2;">
          <span style="background: hsl(var(--accent-rgb) / 0.08); color: var(--accent); padding: 0.35rem 0.75rem; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block; margin-bottom: 1rem;">
            🛡️ IoT Anti-Parking-Slot Theft &amp; Security Lock
          </span>
          <h1 style="font-size: 2.15rem; font-weight: 800; line-height: 1.25; margin-bottom: 1rem; letter-spacing: -0.03em;">
            Smart Parking Security &amp;<br/>Reservation System
          </h1>
          <p class="text-secondary" style="font-size: 1rem; margin-bottom: 1.5rem; max-width: 580px; line-height: 1.5;">
            An advanced parking lot management system utilizing QR codes, license plate match sensors, and a real-time anti-theft exit gate lock to prevent space piracy and unauthorized vehicle drive-off.
          </p>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <a href="#/simulator" class="btn btn-primary">Launch Gate Simulator</a>
            <a href="#/about" class="btn btn-secondary">System Workflow</a>
          </div>
        </div>
        <div class="hero-art-container" style="flex: 1; display: flex; justify-content: center; position: relative; z-index: 1;">
          <svg viewBox="0 0 200 200" style="width: 100%; max-width: 160px; height: auto;">
            <circle cx="100" cy="100" r="80" fill="hsl(var(--accent-rgb) / 0.03)" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.3" />
            <!-- Car body background -->
            <path d="M50 140 h100 v-15 a 10 10 0 0 0 -10 -10 H60 a 10 10 0 0 0 -10 10 z" fill="var(--bg-tertiary)" stroke="var(--border-color)" stroke-width="2" />
            <!-- Security lock -->
            <rect x="75" y="75" width="50" height="42" rx="8" fill="var(--bg-secondary)" stroke="var(--accent)" stroke-width="3" />
            <path d="M85 75V60a15 15 0 1 1 30 0v15" fill="none" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" />
            <circle cx="100" cy="96" r="6" fill="var(--accent)" />
            <!-- Checkmark -->
            <path d="M96 122 l3 3 l6 -6" fill="none" stroke="var(--success)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
    `}init(){}}var _={},He=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},be={},B={};let de;const Ve=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];B.getSymbolSize=function(e){if(!e)throw new Error('"version" cannot be null or undefined');if(e<1||e>40)throw new Error('"version" should be in range from 1 to 40');return e*4+17};B.getSymbolTotalCodewords=function(e){return Ve[e]};B.getBCHDigit=function(o){let e=0;for(;o!==0;)e++,o>>>=1;return e};B.setToSJISFunction=function(e){if(typeof e!="function")throw new Error('"toSJISFunc" is not a valid function.');de=e};B.isKanjiModeEnabled=function(){return typeof de<"u"};B.toSJIS=function(e){return de(e)};var J={};(function(o){o.L={bit:1},o.M={bit:0},o.Q={bit:3},o.H={bit:2};function e(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"l":case"low":return o.L;case"m":case"medium":return o.M;case"q":case"quartile":return o.Q;case"h":case"high":return o.H;default:throw new Error("Unknown EC Level: "+s)}}o.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},o.from=function(n,t){if(o.isValid(n))return n;try{return e(n)}catch{return t}}})(J);function we(){this.buffer=[],this.length=0}we.prototype={get:function(o){const e=Math.floor(o/8);return(this.buffer[e]>>>7-o%8&1)===1},put:function(o,e){for(let s=0;s<e;s++)this.putBit((o>>>e-s-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(o){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),o&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var Fe=we;function G(o){if(!o||o<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=o,this.data=new Uint8Array(o*o),this.reservedBit=new Uint8Array(o*o)}G.prototype.set=function(o,e,s,n){const t=o*this.size+e;this.data[t]=s,n&&(this.reservedBit[t]=!0)};G.prototype.get=function(o,e){return this.data[o*this.size+e]};G.prototype.xor=function(o,e,s){this.data[o*this.size+e]^=s};G.prototype.isReserved=function(o,e){return this.reservedBit[o*this.size+e]};var Ue=G,ke={};(function(o){const e=B.getSymbolSize;o.getRowColCoords=function(n){if(n===1)return[];const t=Math.floor(n/7)+2,i=e(n),a=i===145?26:Math.ceil((i-13)/(2*t-2))*2,r=[i-7];for(let l=1;l<t-1;l++)r[l]=r[l-1]-a;return r.push(6),r.reverse()},o.getPositions=function(n){const t=[],i=o.getRowColCoords(n),a=i.length;for(let r=0;r<a;r++)for(let l=0;l<a;l++)r===0&&l===0||r===0&&l===a-1||r===a-1&&l===0||t.push([i[r],i[l]]);return t}})(ke);var Ee={};const Oe=B.getSymbolSize,pe=7;Ee.getPositions=function(e){const s=Oe(e);return[[0,0],[s-pe,0],[0,s-pe]]};var Ce={};(function(o){o.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};o.isValid=function(t){return t!=null&&t!==""&&!isNaN(t)&&t>=0&&t<=7},o.from=function(t){return o.isValid(t)?parseInt(t,10):void 0},o.getPenaltyN1=function(t){const i=t.size;let a=0,r=0,l=0,c=null,d=null;for(let h=0;h<i;h++){r=l=0,c=d=null;for(let u=0;u<i;u++){let g=t.get(h,u);g===c?r++:(r>=5&&(a+=e.N1+(r-5)),c=g,r=1),g=t.get(u,h),g===d?l++:(l>=5&&(a+=e.N1+(l-5)),d=g,l=1)}r>=5&&(a+=e.N1+(r-5)),l>=5&&(a+=e.N1+(l-5))}return a},o.getPenaltyN2=function(t){const i=t.size;let a=0;for(let r=0;r<i-1;r++)for(let l=0;l<i-1;l++){const c=t.get(r,l)+t.get(r,l+1)+t.get(r+1,l)+t.get(r+1,l+1);(c===4||c===0)&&a++}return a*e.N2},o.getPenaltyN3=function(t){const i=t.size;let a=0,r=0,l=0;for(let c=0;c<i;c++){r=l=0;for(let d=0;d<i;d++)r=r<<1&2047|t.get(c,d),d>=10&&(r===1488||r===93)&&a++,l=l<<1&2047|t.get(d,c),d>=10&&(l===1488||l===93)&&a++}return a*e.N3},o.getPenaltyN4=function(t){let i=0;const a=t.data.length;for(let l=0;l<a;l++)i+=t.data[l];return Math.abs(Math.ceil(i*100/a/5)-10)*e.N4};function s(n,t,i){switch(n){case o.Patterns.PATTERN000:return(t+i)%2===0;case o.Patterns.PATTERN001:return t%2===0;case o.Patterns.PATTERN010:return i%3===0;case o.Patterns.PATTERN011:return(t+i)%3===0;case o.Patterns.PATTERN100:return(Math.floor(t/2)+Math.floor(i/3))%2===0;case o.Patterns.PATTERN101:return t*i%2+t*i%3===0;case o.Patterns.PATTERN110:return(t*i%2+t*i%3)%2===0;case o.Patterns.PATTERN111:return(t*i%3+(t+i)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}o.applyMask=function(t,i){const a=i.size;for(let r=0;r<a;r++)for(let l=0;l<a;l++)i.isReserved(l,r)||i.xor(l,r,s(t,l,r))},o.getBestMask=function(t,i){const a=Object.keys(o.Patterns).length;let r=0,l=1/0;for(let c=0;c<a;c++){i(c),o.applyMask(c,t);const d=o.getPenaltyN1(t)+o.getPenaltyN2(t)+o.getPenaltyN3(t)+o.getPenaltyN4(t);o.applyMask(c,t),d<l&&(l=d,r=c)}return r}})(Ce);var Z={};const D=J,q=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],K=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];Z.getBlocksCount=function(e,s){switch(s){case D.L:return q[(e-1)*4+0];case D.M:return q[(e-1)*4+1];case D.Q:return q[(e-1)*4+2];case D.H:return q[(e-1)*4+3];default:return}};Z.getTotalCodewordsCount=function(e,s){switch(s){case D.L:return K[(e-1)*4+0];case D.M:return K[(e-1)*4+1];case D.Q:return K[(e-1)*4+2];case D.H:return K[(e-1)*4+3];default:return}};var Se={},W={};const U=new Uint8Array(512),Q=new Uint8Array(256);(function(){let e=1;for(let s=0;s<255;s++)U[s]=e,Q[e]=s,e<<=1,e&256&&(e^=285);for(let s=255;s<512;s++)U[s]=U[s-255]})();W.log=function(e){if(e<1)throw new Error("log("+e+")");return Q[e]};W.exp=function(e){return U[e]};W.mul=function(e,s){return e===0||s===0?0:U[Q[e]+Q[s]]};(function(o){const e=W;o.mul=function(n,t){const i=new Uint8Array(n.length+t.length-1);for(let a=0;a<n.length;a++)for(let r=0;r<t.length;r++)i[a+r]^=e.mul(n[a],t[r]);return i},o.mod=function(n,t){let i=new Uint8Array(n);for(;i.length-t.length>=0;){const a=i[0];for(let l=0;l<t.length;l++)i[l]^=e.mul(t[l],a);let r=0;for(;r<i.length&&i[r]===0;)r++;i=i.slice(r)}return i},o.generateECPolynomial=function(n){let t=new Uint8Array([1]);for(let i=0;i<n;i++)t=o.mul(t,new Uint8Array([1,e.exp(i)]));return t}})(Se);const Ie=Se;function ue(o){this.genPoly=void 0,this.degree=o,this.degree&&this.initialize(this.degree)}ue.prototype.initialize=function(e){this.degree=e,this.genPoly=Ie.generateECPolynomial(this.degree)};ue.prototype.encode=function(e){if(!this.genPoly)throw new Error("Encoder not initialized");const s=new Uint8Array(e.length+this.degree);s.set(e);const n=Ie.mod(s,this.genPoly),t=this.degree-n.length;if(t>0){const i=new Uint8Array(this.degree);return i.set(n,t),i}return n};var _e=ue,Be={},R={},ge={};ge.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40};var L={};const Te="[0-9]+",Ge="[A-Z $%*+\\-./:]+";let O="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";O=O.replace(/u/g,"\\u");const qe="(?:(?![A-Z0-9 $%*+\\-./:]|"+O+`)(?:.|[\r
]))+`;L.KANJI=new RegExp(O,"g");L.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");L.BYTE=new RegExp(qe,"g");L.NUMERIC=new RegExp(Te,"g");L.ALPHANUMERIC=new RegExp(Ge,"g");const Ke=new RegExp("^"+O+"$"),je=new RegExp("^"+Te+"$"),Qe=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");L.testKanji=function(e){return Ke.test(e)};L.testNumeric=function(e){return je.test(e)};L.testAlphanumeric=function(e){return Qe.test(e)};(function(o){const e=ge,s=L;o.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},o.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},o.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},o.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},o.MIXED={bit:-1},o.getCharCountIndicator=function(i,a){if(!i.ccBits)throw new Error("Invalid mode: "+i);if(!e.isValid(a))throw new Error("Invalid version: "+a);return a>=1&&a<10?i.ccBits[0]:a<27?i.ccBits[1]:i.ccBits[2]},o.getBestModeForData=function(i){return s.testNumeric(i)?o.NUMERIC:s.testAlphanumeric(i)?o.ALPHANUMERIC:s.testKanji(i)?o.KANJI:o.BYTE},o.toString=function(i){if(i&&i.id)return i.id;throw new Error("Invalid mode")},o.isValid=function(i){return i&&i.bit&&i.ccBits};function n(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return o.NUMERIC;case"alphanumeric":return o.ALPHANUMERIC;case"kanji":return o.KANJI;case"byte":return o.BYTE;default:throw new Error("Unknown mode: "+t)}}o.from=function(i,a){if(o.isValid(i))return i;try{return n(i)}catch{return a}}})(R);(function(o){const e=B,s=Z,n=J,t=R,i=ge,a=7973,r=e.getBCHDigit(a);function l(u,g,p){for(let y=1;y<=40;y++)if(g<=o.getCapacity(y,p,u))return y}function c(u,g){return t.getCharCountIndicator(u,g)+4}function d(u,g){let p=0;return u.forEach(function(y){const C=c(y.mode,g);p+=C+y.getBitsLength()}),p}function h(u,g){for(let p=1;p<=40;p++)if(d(u,p)<=o.getCapacity(p,g,t.MIXED))return p}o.from=function(g,p){return i.isValid(g)?parseInt(g,10):p},o.getCapacity=function(g,p,y){if(!i.isValid(g))throw new Error("Invalid QR Code version");typeof y>"u"&&(y=t.BYTE);const C=e.getSymbolTotalCodewords(g),v=s.getTotalCodewordsCount(g,p),b=(C-v)*8;if(y===t.MIXED)return b;const f=b-c(y,g);switch(y){case t.NUMERIC:return Math.floor(f/10*3);case t.ALPHANUMERIC:return Math.floor(f/11*2);case t.KANJI:return Math.floor(f/13);case t.BYTE:default:return Math.floor(f/8)}},o.getBestVersionForData=function(g,p){let y;const C=n.from(p,n.M);if(Array.isArray(g)){if(g.length>1)return h(g,C);if(g.length===0)return 1;y=g[0]}else y=g;return l(y.mode,y.getLength(),C)},o.getEncodedBits=function(g){if(!i.isValid(g)||g<7)throw new Error("Invalid QR Code version");let p=g<<12;for(;e.getBCHDigit(p)-r>=0;)p^=a<<e.getBCHDigit(p)-r;return g<<12|p}})(Be);var Ae={};const ae=B,xe=1335,Ye=21522,ve=ae.getBCHDigit(xe);Ae.getEncodedBits=function(e,s){const n=e.bit<<3|s;let t=n<<10;for(;ae.getBCHDigit(t)-ve>=0;)t^=xe<<ae.getBCHDigit(t)-ve;return(n<<10|t)^Ye};var Le={};const Je=R;function $(o){this.mode=Je.NUMERIC,this.data=o.toString()}$.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)};$.prototype.getLength=function(){return this.data.length};$.prototype.getBitsLength=function(){return $.getBitsLength(this.data.length)};$.prototype.write=function(e){let s,n,t;for(s=0;s+3<=this.data.length;s+=3)n=this.data.substr(s,3),t=parseInt(n,10),e.put(t,10);const i=this.data.length-s;i>0&&(n=this.data.substr(s),t=parseInt(n,10),e.put(t,i*3+1))};var Ze=$;const We=R,te=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function z(o){this.mode=We.ALPHANUMERIC,this.data=o}z.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)};z.prototype.getLength=function(){return this.data.length};z.prototype.getBitsLength=function(){return z.getBitsLength(this.data.length)};z.prototype.write=function(e){let s;for(s=0;s+2<=this.data.length;s+=2){let n=te.indexOf(this.data[s])*45;n+=te.indexOf(this.data[s+1]),e.put(n,11)}this.data.length%2&&e.put(te.indexOf(this.data[s]),6)};var Xe=z;const et=R;function H(o){this.mode=et.BYTE,typeof o=="string"?this.data=new TextEncoder().encode(o):this.data=new Uint8Array(o)}H.getBitsLength=function(e){return e*8};H.prototype.getLength=function(){return this.data.length};H.prototype.getBitsLength=function(){return H.getBitsLength(this.data.length)};H.prototype.write=function(o){for(let e=0,s=this.data.length;e<s;e++)o.put(this.data[e],8)};var tt=H;const st=R,nt=B;function V(o){this.mode=st.KANJI,this.data=o}V.getBitsLength=function(e){return e*13};V.prototype.getLength=function(){return this.data.length};V.prototype.getBitsLength=function(){return V.getBitsLength(this.data.length)};V.prototype.write=function(o){let e;for(e=0;e<this.data.length;e++){let s=nt.toSJIS(this.data[e]);if(s>=33088&&s<=40956)s-=33088;else if(s>=57408&&s<=60351)s-=49472;else throw new Error("Invalid SJIS character: "+this.data[e]+`
Make sure your charset is UTF-8`);s=(s>>>8&255)*192+(s&255),o.put(s,13)}};var it=V,Me={exports:{}};(function(o){var e={single_source_shortest_paths:function(s,n,t){var i={},a={};a[n]=0;var r=e.PriorityQueue.make();r.push(n,0);for(var l,c,d,h,u,g,p,y,C;!r.empty();){l=r.pop(),c=l.value,h=l.cost,u=s[c]||{};for(d in u)u.hasOwnProperty(d)&&(g=u[d],p=h+g,y=a[d],C=typeof a[d]>"u",(C||y>p)&&(a[d]=p,r.push(d,p),i[d]=c))}if(typeof t<"u"&&typeof a[t]>"u"){var v=["Could not find a path from ",n," to ",t,"."].join("");throw new Error(v)}return i},extract_shortest_path_from_predecessor_list:function(s,n){for(var t=[],i=n;i;)t.push(i),s[i],i=s[i];return t.reverse(),t},find_path:function(s,n,t){var i=e.single_source_shortest_paths(s,n,t);return e.extract_shortest_path_from_predecessor_list(i,t)},PriorityQueue:{make:function(s){var n=e.PriorityQueue,t={},i;s=s||{};for(i in n)n.hasOwnProperty(i)&&(t[i]=n[i]);return t.queue=[],t.sorter=s.sorter||n.default_sorter,t},default_sorter:function(s,n){return s.cost-n.cost},push:function(s,n){var t={value:s,cost:n};this.queue.push(t),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};o.exports=e})(Me);var ot=Me.exports;(function(o){const e=R,s=Ze,n=Xe,t=tt,i=it,a=L,r=B,l=ot;function c(v){return unescape(encodeURIComponent(v)).length}function d(v,b,f){const m=[];let w;for(;(w=v.exec(f))!==null;)m.push({data:w[0],index:w.index,mode:b,length:w[0].length});return m}function h(v){const b=d(a.NUMERIC,e.NUMERIC,v),f=d(a.ALPHANUMERIC,e.ALPHANUMERIC,v);let m,w;return r.isKanjiModeEnabled()?(m=d(a.BYTE,e.BYTE,v),w=d(a.KANJI,e.KANJI,v)):(m=d(a.BYTE_KANJI,e.BYTE,v),w=[]),b.concat(f,m,w).sort(function(E,T){return E.index-T.index}).map(function(E){return{data:E.data,mode:E.mode,length:E.length}})}function u(v,b){switch(b){case e.NUMERIC:return s.getBitsLength(v);case e.ALPHANUMERIC:return n.getBitsLength(v);case e.KANJI:return i.getBitsLength(v);case e.BYTE:return t.getBitsLength(v)}}function g(v){return v.reduce(function(b,f){const m=b.length-1>=0?b[b.length-1]:null;return m&&m.mode===f.mode?(b[b.length-1].data+=f.data,b):(b.push(f),b)},[])}function p(v){const b=[];for(let f=0;f<v.length;f++){const m=v[f];switch(m.mode){case e.NUMERIC:b.push([m,{data:m.data,mode:e.ALPHANUMERIC,length:m.length},{data:m.data,mode:e.BYTE,length:m.length}]);break;case e.ALPHANUMERIC:b.push([m,{data:m.data,mode:e.BYTE,length:m.length}]);break;case e.KANJI:b.push([m,{data:m.data,mode:e.BYTE,length:c(m.data)}]);break;case e.BYTE:b.push([{data:m.data,mode:e.BYTE,length:c(m.data)}])}}return b}function y(v,b){const f={},m={start:{}};let w=["start"];for(let k=0;k<v.length;k++){const E=v[k],T=[];for(let P=0;P<E.length;P++){const A=E[P],F=""+k+P;T.push(F),f[F]={node:A,lastCount:0},m[F]={};for(let ee=0;ee<w.length;ee++){const M=w[ee];f[M]&&f[M].node.mode===A.mode?(m[M][F]=u(f[M].lastCount+A.length,A.mode)-u(f[M].lastCount,A.mode),f[M].lastCount+=A.length):(f[M]&&(f[M].lastCount=A.length),m[M][F]=u(A.length,A.mode)+4+e.getCharCountIndicator(A.mode,b))}}w=T}for(let k=0;k<w.length;k++)m[w[k]].end=0;return{map:m,table:f}}function C(v,b){let f;const m=e.getBestModeForData(v);if(f=e.from(b,m),f!==e.BYTE&&f.bit<m.bit)throw new Error('"'+v+'" cannot be encoded with mode '+e.toString(f)+`.
 Suggested mode is: `+e.toString(m));switch(f===e.KANJI&&!r.isKanjiModeEnabled()&&(f=e.BYTE),f){case e.NUMERIC:return new s(v);case e.ALPHANUMERIC:return new n(v);case e.KANJI:return new i(v);case e.BYTE:return new t(v)}}o.fromArray=function(b){return b.reduce(function(f,m){return typeof m=="string"?f.push(C(m,null)):m.data&&f.push(C(m.data,m.mode)),f},[])},o.fromString=function(b,f){const m=h(b,r.isKanjiModeEnabled()),w=p(m),k=y(w,f),E=l.find_path(k.map,"start","end"),T=[];for(let P=1;P<E.length-1;P++)T.push(k.table[E[P]].node);return o.fromArray(g(T))},o.rawSplit=function(b){return o.fromArray(h(b,r.isKanjiModeEnabled()))}})(Le);const X=B,se=J,at=Fe,rt=Ue,lt=ke,ct=Ee,re=Ce,le=Z,dt=_e,Y=Be,ut=Ae,gt=R,ne=Le;function ht(o,e){const s=o.size,n=ct.getPositions(e);for(let t=0;t<n.length;t++){const i=n[t][0],a=n[t][1];for(let r=-1;r<=7;r++)if(!(i+r<=-1||s<=i+r))for(let l=-1;l<=7;l++)a+l<=-1||s<=a+l||(r>=0&&r<=6&&(l===0||l===6)||l>=0&&l<=6&&(r===0||r===6)||r>=2&&r<=4&&l>=2&&l<=4?o.set(i+r,a+l,!0,!0):o.set(i+r,a+l,!1,!0))}}function mt(o){const e=o.size;for(let s=8;s<e-8;s++){const n=s%2===0;o.set(s,6,n,!0),o.set(6,s,n,!0)}}function ft(o,e){const s=lt.getPositions(e);for(let n=0;n<s.length;n++){const t=s[n][0],i=s[n][1];for(let a=-2;a<=2;a++)for(let r=-2;r<=2;r++)a===-2||a===2||r===-2||r===2||a===0&&r===0?o.set(t+a,i+r,!0,!0):o.set(t+a,i+r,!1,!0)}}function pt(o,e){const s=o.size,n=Y.getEncodedBits(e);let t,i,a;for(let r=0;r<18;r++)t=Math.floor(r/3),i=r%3+s-8-3,a=(n>>r&1)===1,o.set(t,i,a,!0),o.set(i,t,a,!0)}function ie(o,e,s){const n=o.size,t=ut.getEncodedBits(e,s);let i,a;for(i=0;i<15;i++)a=(t>>i&1)===1,i<6?o.set(i,8,a,!0):i<8?o.set(i+1,8,a,!0):o.set(n-15+i,8,a,!0),i<8?o.set(8,n-i-1,a,!0):i<9?o.set(8,15-i-1+1,a,!0):o.set(8,15-i-1,a,!0);o.set(n-8,8,1,!0)}function vt(o,e){const s=o.size;let n=-1,t=s-1,i=7,a=0;for(let r=s-1;r>0;r-=2)for(r===6&&r--;;){for(let l=0;l<2;l++)if(!o.isReserved(t,r-l)){let c=!1;a<e.length&&(c=(e[a]>>>i&1)===1),o.set(t,r-l,c),i--,i===-1&&(a++,i=7)}if(t+=n,t<0||s<=t){t-=n,n=-n;break}}}function yt(o,e,s){const n=new at;s.forEach(function(l){n.put(l.mode.bit,4),n.put(l.getLength(),gt.getCharCountIndicator(l.mode,o)),l.write(n)});const t=X.getSymbolTotalCodewords(o),i=le.getTotalCodewordsCount(o,e),a=(t-i)*8;for(n.getLengthInBits()+4<=a&&n.put(0,4);n.getLengthInBits()%8!==0;)n.putBit(0);const r=(a-n.getLengthInBits())/8;for(let l=0;l<r;l++)n.put(l%2?17:236,8);return bt(n,o,e)}function bt(o,e,s){const n=X.getSymbolTotalCodewords(e),t=le.getTotalCodewordsCount(e,s),i=n-t,a=le.getBlocksCount(e,s),r=n%a,l=a-r,c=Math.floor(n/a),d=Math.floor(i/a),h=d+1,u=c-d,g=new dt(u);let p=0;const y=new Array(a),C=new Array(a);let v=0;const b=new Uint8Array(o.buffer);for(let E=0;E<a;E++){const T=E<l?d:h;y[E]=b.slice(p,p+T),C[E]=g.encode(y[E]),p+=T,v=Math.max(v,T)}const f=new Uint8Array(n);let m=0,w,k;for(w=0;w<v;w++)for(k=0;k<a;k++)w<y[k].length&&(f[m++]=y[k][w]);for(w=0;w<u;w++)for(k=0;k<a;k++)f[m++]=C[k][w];return f}function wt(o,e,s,n){let t;if(Array.isArray(o))t=ne.fromArray(o);else if(typeof o=="string"){let c=e;if(!c){const d=ne.rawSplit(o);c=Y.getBestVersionForData(d,s)}t=ne.fromString(o,c||40)}else throw new Error("Invalid data");const i=Y.getBestVersionForData(t,s);if(!i)throw new Error("The amount of data is too big to be stored in a QR Code");if(!e)e=i;else if(e<i)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+i+`.
`);const a=yt(e,s,t),r=X.getSymbolSize(e),l=new rt(r);return ht(l,e),mt(l),ft(l,e),ie(l,s,0),e>=7&&pt(l,e),vt(l,a),isNaN(n)&&(n=re.getBestMask(l,ie.bind(null,l,s))),re.applyMask(n,l),ie(l,s,n),{modules:l,version:e,errorCorrectionLevel:s,maskPattern:n,segments:t}}be.create=function(e,s){if(typeof e>"u"||e==="")throw new Error("No input text");let n=se.M,t,i;return typeof s<"u"&&(n=se.from(s.errorCorrectionLevel,se.M),t=Y.from(s.version),i=re.from(s.maskPattern),s.toSJISFunc&&X.setToSJISFunction(s.toSJISFunc)),wt(e,t,n,i)};var Pe={},he={};(function(o){function e(s){if(typeof s=="number"&&(s=s.toString()),typeof s!="string")throw new Error("Color should be defined as hex string");let n=s.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+s);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(i){return[i,i]}))),n.length===6&&n.push("F","F");const t=parseInt(n.join(""),16);return{r:t>>24&255,g:t>>16&255,b:t>>8&255,a:t&255,hex:"#"+n.slice(0,6).join("")}}o.getOptions=function(n){n||(n={}),n.color||(n.color={});const t=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,i=n.width&&n.width>=21?n.width:void 0,a=n.scale||4;return{width:i,scale:i?4:a,margin:t,color:{dark:e(n.color.dark||"#000000ff"),light:e(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},o.getScale=function(n,t){return t.width&&t.width>=n+t.margin*2?t.width/(n+t.margin*2):t.scale},o.getImageWidth=function(n,t){const i=o.getScale(n,t);return Math.floor((n+t.margin*2)*i)},o.qrToImageData=function(n,t,i){const a=t.modules.size,r=t.modules.data,l=o.getScale(a,i),c=Math.floor((a+i.margin*2)*l),d=i.margin*l,h=[i.color.light,i.color.dark];for(let u=0;u<c;u++)for(let g=0;g<c;g++){let p=(u*c+g)*4,y=i.color.light;if(u>=d&&g>=d&&u<c-d&&g<c-d){const C=Math.floor((u-d)/l),v=Math.floor((g-d)/l);y=h[r[C*a+v]?1:0]}n[p++]=y.r,n[p++]=y.g,n[p++]=y.b,n[p]=y.a}}})(he);(function(o){const e=he;function s(t,i,a){t.clearRect(0,0,i.width,i.height),i.style||(i.style={}),i.height=a,i.width=a,i.style.height=a+"px",i.style.width=a+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}o.render=function(i,a,r){let l=r,c=a;typeof l>"u"&&(!a||!a.getContext)&&(l=a,a=void 0),a||(c=n()),l=e.getOptions(l);const d=e.getImageWidth(i.modules.size,l),h=c.getContext("2d"),u=h.createImageData(d,d);return e.qrToImageData(u.data,i,l),s(h,c,d),h.putImageData(u,0,0),c},o.renderToDataURL=function(i,a,r){let l=r;typeof l>"u"&&(!a||!a.getContext)&&(l=a,a=void 0),l||(l={});const c=o.render(i,a,l),d=l.type||"image/png",h=l.rendererOpts||{};return c.toDataURL(d,h.quality)}})(Pe);var De={};const kt=he;function ye(o,e){const s=o.a/255,n=e+'="'+o.hex+'"';return s<1?n+" "+e+'-opacity="'+s.toFixed(2).slice(1)+'"':n}function oe(o,e,s){let n=o+e;return typeof s<"u"&&(n+=" "+s),n}function Et(o,e,s){let n="",t=0,i=!1,a=0;for(let r=0;r<o.length;r++){const l=Math.floor(r%e),c=Math.floor(r/e);!l&&!i&&(i=!0),o[r]?(a++,r>0&&l>0&&o[r-1]||(n+=i?oe("M",l+s,.5+c+s):oe("m",t,0),t=0,i=!1),l+1<e&&o[r+1]||(n+=oe("h",a),a=0)):t++}return n}De.render=function(e,s,n){const t=kt.getOptions(s),i=e.modules.size,a=e.modules.data,r=i+t.margin*2,l=t.color.light.a?"<path "+ye(t.color.light,"fill")+' d="M0 0h'+r+"v"+r+'H0z"/>':"",c="<path "+ye(t.color.dark,"stroke")+' d="'+Et(a,i,t.margin)+'"/>',d='viewBox="0 0 '+r+" "+r+'"',u='<svg xmlns="http://www.w3.org/2000/svg" '+(t.width?'width="'+t.width+'" height="'+t.width+'" ':"")+d+' shape-rendering="crispEdges">'+l+c+`</svg>
`;return typeof n=="function"&&n(null,u),u};const Ct=He,ce=be,Re=Pe,St=De;function me(o,e,s,n,t){const i=[].slice.call(arguments,1),a=i.length,r=typeof i[a-1]=="function";if(!r&&!Ct())throw new Error("Callback required as last argument");if(r){if(a<2)throw new Error("Too few arguments provided");a===2?(t=s,s=e,e=n=void 0):a===3&&(e.getContext&&typeof t>"u"?(t=n,n=void 0):(t=n,n=s,s=e,e=void 0))}else{if(a<1)throw new Error("Too few arguments provided");return a===1?(s=e,e=n=void 0):a===2&&!e.getContext&&(n=s,s=e,e=void 0),new Promise(function(l,c){try{const d=ce.create(s,n);l(o(d,e,n))}catch(d){c(d)}})}try{const l=ce.create(s,n);t(null,o(l,e,n))}catch(l){t(l)}}_.create=ce.create;_.toCanvas=me.bind(null,Re.render);_.toDataURL=me.bind(null,Re.renderToDataURL);_.toString=me.bind(null,function(o,e,s){return St.render(o,s)});async function It(o,e=!1){try{const s=e?"#f8fafc":"#0f172a",n=e?"#1e293b":"#ffffff";return await _.toDataURL(o,{margin:1,width:256,errorCorrectionLevel:"H",color:{dark:s,light:n}})}catch(s){return console.error("Failed to generate QR code:",s),""}}const fe="smart_parking_state",Bt=[{id:"A1",zone:"A",type:"Standard",status:"available",rate:2},{id:"A2",zone:"A",type:"Standard",status:"available",rate:2},{id:"A3",zone:"A",type:"Standard",status:"available",rate:2},{id:"A4",zone:"A",type:"Standard",status:"available",rate:2},{id:"A5",zone:"A",type:"Standard",status:"available",rate:2},{id:"A6",zone:"A",type:"Standard",status:"available",rate:2},{id:"A7",zone:"A",type:"Standard",status:"available",rate:2},{id:"A8",zone:"A",type:"Standard",status:"available",rate:2},{id:"B1",zone:"B",type:"EV Charging",status:"available",rate:3},{id:"B2",zone:"B",type:"EV Charging",status:"available",rate:3},{id:"B3",zone:"B",type:"EV Charging",status:"available",rate:3},{id:"B4",zone:"B",type:"EV Charging",status:"available",rate:3},{id:"B5",zone:"B",type:"EV Charging",status:"available",rate:3},{id:"B6",zone:"B",type:"EV Charging",status:"available",rate:3},{id:"C1",zone:"C",type:"Premium / VIP",status:"available",rate:5},{id:"C2",zone:"C",type:"Premium / VIP",status:"available",rate:5},{id:"C3",zone:"C",type:"Premium / VIP",status:"available",rate:5},{id:"C4",zone:"C",type:"Premium / VIP",status:"available",rate:5},{id:"C5",zone:"C",type:"Premium / VIP",status:"available",rate:5},{id:"C6",zone:"C",type:"Premium / VIP",status:"available",rate:5}];function S(){const o=localStorage.getItem(fe);if(o)try{const s=JSON.parse(o);if(s&&s.slots&&s.bookings)return s}catch(s){console.error("Failed to parse local storage state",s)}const e={slots:Bt,bookings:[],alerts:[],supportTickets:[]};return I(e),e}function I(o){localStorage.setItem(fe,JSON.stringify(o))}function N(o="BK"){return`${o}-${Math.floor(1e5+Math.random()*9e5)}`}function Tt(o,e,s){const n=S(),t=n.slots.find(c=>c.id===o);if(!t)return{success:!1,error:"Slot not found"};if(t.status!=="available")return{success:!1,error:"Slot is not available"};const i=e.trim().toUpperCase();if(!i)return{success:!1,error:"License plate is required"};const a=N("BK"),r=Math.floor(1e3+Math.random()*9e3).toString(),l={id:a,slotId:o,vehiclePlate:i,pin:r,bookingTime:new Date().toISOString(),startTime:null,endTime:null,estimatedDuration:parseFloat(s)||2,rate:t.rate,securityLock:!1,status:"reserved"};return t.status="reserved",n.bookings.push(l),I(n),{success:!0,booking:l}}function At(o,e,s){const n=S(),t=n.bookings.find(r=>r.id===o&&r.slotId===e&&r.status==="reserved"),i=n.slots.find(r=>r.id===e);if(!i)return{success:!1,error:"Parking slot not found."};const a=s.trim().toUpperCase();if(!t){if(i.status==="occupied"||i.status==="theft-alert")return{success:!1,error:"Slot is already occupied."};i.status="theft-alert";const l={id:N("ALT"),timestamp:new Date().toISOString(),type:"theft",slotId:e,message:`THEFT ALERT: Unauthorized vehicle (${a}) parked in slot ${e} without reservation!`,resolved:!1};return n.alerts.push(l),I(n),{success:!1,alert:l,error:"No active reservation found for this slot!"}}if(t.vehiclePlate!==a){i.status="theft-alert";const l={id:N("ALT"),timestamp:new Date().toISOString(),type:"theft",slotId:e,message:`THEFT ALERT: Reserved slot ${e} hijacked! Vehicle ${a} parked instead of reserved vehicle ${t.vehiclePlate}.`,resolved:!1};return n.alerts.push(l),I(n),{success:!1,alert:l,error:"License plate verification failed! Slot theft alert triggered."}}return t.status="checked-in",t.startTime=new Date().toISOString(),i.status="occupied",I(n),{success:!0,booking:t}}function xt(o,e){const s=S(),n=s.slots.find(h=>h.id===o);if(!n)return{success:!1,error:"Parking slot not found."};if(n.status!=="occupied"&&n.status!=="theft-alert")return{success:!1,error:"No vehicle is currently parked in this slot."};const t=s.bookings.find(h=>h.slotId===o&&h.status==="checked-in");if(!t)return n.status="available",s.alerts.forEach(h=>{h.slotId===o&&!h.resolved&&(h.resolved=!0)}),I(s),{success:!0,message:"Unauthorized vehicle removed. Slot reset to available."};if(t.securityLock){const u={id:N("ALT"),timestamp:new Date().toISOString(),type:"lock-violation",slotId:o,message:`SECURITY ALERT: Unauthorized movement detected for locked vehicle ${t.vehiclePlate} at slot ${o}! Exit gate blocked.`,resolved:!1};return s.alerts.push(u),I(s),{success:!1,error:"SECURITY LOCK ACTIVE! Exit gate locked. Unlock via user pass first.",alert:u}}if(t.pin!==e)return{success:!1,error:"Invalid security PIN."};const i=new Date().toISOString(),a=new Date(t.startTime),l=(new Date(i)-a)/(1e3*60*60),c=Math.max(.1,parseFloat(l.toFixed(4))),d=parseFloat((c*t.rate).toFixed(2));return t.status="completed",t.endTime=i,t.cost=d,n.status="available",s.alerts.forEach(h=>{h.slotId===o&&!h.resolved&&(h.resolved=!0)}),I(s),{success:!0,booking:t,billedHours:c,finalCost:d}}function Lt(o,e){const s=S(),n=s.bookings.find(t=>t.id===o);return n?(n.securityLock=e,I(s),{success:!0,booking:n}):{success:!1,error:"Booking not found"}}function Mt(o){const e=S(),s=e.alerts.find(n=>n.id===o);if(!s)return{success:!1,error:"Alert not found"};if(s.resolved=!0,s.type==="theft"){const n=e.slots.find(t=>t.id===s.slotId);n&&n.status==="theft-alert"&&(n.status="available")}return I(e),{success:!0,alert:s}}function Pt(o,e,s,n){const t=S(),i=o.trim().toUpperCase();if(!i)return{success:!1,error:"Slot ID is required"};if(t.slots.some(r=>r.id===i))return{success:!1,error:"Slot ID already exists"};const a={id:i,zone:e.trim().toUpperCase(),type:s,status:"available",rate:parseFloat(n)||2};return t.slots.push(a),I(t),{success:!0,slot:a}}function Dt(o){const e=S(),s=e.slots.findIndex(t=>t.id===o);return s===-1?{success:!1,error:"Slot not found"}:e.slots[s].status!=="available"?{success:!1,error:"Cannot remove a slot that is currently reserved or occupied."}:(e.slots.splice(s,1),I(e),{success:!0})}function Rt(o,e,s,n){const t=S(),i={id:N("TCK"),name:o.trim(),email:e.trim(),subject:s.trim(),message:n.trim(),timestamp:new Date().toISOString(),status:"open"};return t.supportTickets.push(i),I(t),{success:!0,ticket:i}}function Nt(){return localStorage.removeItem(fe),S()}function $t(o){const e=S(),s=e.bookings.find(l=>l.id===o);if(!s)return{success:!1,error:"Booking not found"};const n=s.slotId,t=e.slots.find(l=>l.id===n);t&&(t.status="theft-alert");const a={id:N("ALT"),timestamp:new Date().toISOString(),type:"theft",slotId:n,message:`USER DISPUTE: Driver reported reserved slot ${n} occupied by unauthorized vehicle!`,resolved:!1};e.alerts.push(a);let r=e.slots.find(l=>l.zone===t.zone&&l.status==="available");if(r||(r=e.slots.find(l=>l.status==="available")),r)return r.status="reserved",s.slotId=r.id,s.rate=0,s.isCompensated=!0,I(e),{success:!0,newSlotId:r.id,alert:a,message:`Dispute filed! Slot ${n} marked as hijacked. We have reassigned you to Slot ${r.id} for FREE ($0.00 rate) as compensation. Please check your updated digital pass.`};{const l="C-EMERGENCY";let c=e.slots.find(u=>u.id===l);c?c.status="reserved":(c={id:l,zone:"C",type:"VIP Emergency Backup",status:"reserved",rate:0},e.slots.push(c)),s.slotId=l,s.rate=0,s.isCompensated=!0,s.isEmergencyOverAllocated=!0,s.voucherCode="SORRY10",s.voucherValue=10;const h={id:N("ALT"),timestamp:new Date().toISOString(),type:"theft",slotId:n,message:`TOW DISPATCHED: Lot is 100% full. Automated tow truck sent to remove unauthorized vehicle at Slot ${n}. Driver reassigned to backup slot ${l}.`,resolved:!1};return e.alerts.push(h),I(e),{success:!0,newSlotId:l,alert:h,message:`Dispute filed! Lot is 100% full. We have dynamically unlocked our VIP Backup Space (${l}) for you for FREE, issued a $10.00 compensation voucher (Code: SORRY10), and dispatched an automated tow truck to clear your original space.`}}}class zt{constructor(e){this.showToast=e,this.heroComponent=new ze,this.activeBillingInterval=null,this.currentSelectedSlotId=null}render(){return`
      <!-- Embedded Hero Landing component -->
      <div id="dashboard-hero-mount">
        ${this.heroComponent.render()}
      </div>

      <!-- Bento Grid Stats -->
      <div class="stats-grid">
        <div class="stat-card total">
          <span class="stat-title">Total Capacity</span>
          <span id="stats-total" class="stat-val">20</span>
          <span class="stat-subtitle">Configured slots</span>
        </div>
        <div class="stat-card available">
          <span class="stat-title">Available Spaces</span>
          <span id="stats-available" class="stat-val">20</span>
          <span class="stat-subtitle">Ready to reserve</span>
        </div>
        <div class="stat-card occupied">
          <span class="stat-title">Occupied Spaces</span>
          <span id="stats-occupied" class="stat-val">0</span>
          <span class="stat-subtitle">Vehicles parked</span>
        </div>
        <div class="stat-card alerts" id="alert-card-container">
          <span class="stat-title">Security Alarms</span>
          <span id="stats-alerts" class="stat-val">0</span>
          <span class="stat-subtitle" id="stats-alerts-text">No active breaches</span>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="dashboard-layout">
        <!-- Interactive Layout Grid -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Real-Time Parking Grid Map</h2>
            <div class="legend-item" style="font-size: 0.75rem;">
              <span class="legend-color available"></span><span>Available</span>
              <span class="legend-color reserved"></span><span>Reserved</span>
              <span class="legend-color occupied"></span><span>Occupied</span>
              <span class="legend-color theft-alert"></span><span>Theft Alarm</span>
            </div>
          </div>
          <div class="card-body">
            <div class="parking-zones">
              <!-- Zone A -->
              <div class="parking-zone">
                <div class="zone-header">
                  <span>Zone A - Standard Parking</span>
                  <span class="text-secondary">$2.00 / hour</span>
                </div>
                <div id="grid-zone-a" class="zone-grid"></div>
              </div>
              
              <!-- Zone B -->
              <div class="parking-zone">
                <div class="zone-header">
                  <span>Zone B - EV Charging Slots</span>
                  <span class="text-secondary">$3.00 / hour</span>
                </div>
                <div id="grid-zone-b" class="zone-grid"></div>
              </div>

              <!-- Zone C -->
              <div class="parking-zone">
                <div class="zone-header">
                  <span>Zone C - Premium VIP Slots</span>
                  <span class="text-secondary">$5.00 / hour</span>
                </div>
                <div id="grid-zone-c" class="zone-grid"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Actions -->
        <div class="sidebar-panel">
          <div class="card" id="sidebar-action-card">
            <div class="card-header">
              <h2 class="card-title" id="sidebar-title">Slot Details</h2>
            </div>
            <div class="card-body">
              <div id="sidebar-slot-details">
                <p class="text-secondary">Click on any parking slot in the grid map to view its occupancy status or to start a reservation.</p>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Quick Live Tracker</h2>
            </div>
            <div class="card-body">
              <div class="info-box">
                <div class="info-title">
                  <svg width="16" height="16" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v6l4 2"/></svg>
                  <span>Active Reservations</span>
                </div>
                <div id="quick-bookings-list">
                  <p class="text-secondary" style="font-size: 0.8rem;">No active bookings found. Select a slot to reserve.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dialogue Modal Elements (Encapsulated in Dashboard for cleanliness) -->
      
      <!-- Booking Form Modal -->
      <dialog id="booking-modal" closedby="any" aria-labelledby="booking-modal-title">
        <div class="dialog-header">
          <h2 id="booking-modal-title">Reserve Parking Slot</h2>
          <button type="button" class="dialog-close" id="btn-close-booking-modal" aria-label="Close dialog">&times;</button>
        </div>
        <form id="booking-form" method="dialog">
          <div class="form-group">
            <label>Selected Parking Slot</label>
            <input type="text" id="booking-slot-id-display" class="form-control" style="font-weight: 700; background-color: var(--bg-tertiary);" readonly />
          </div>
          <div class="form-group">
            <label for="booking-plate">Vehicle License Plate Number</label>
            <input type="text" id="booking-plate" class="form-control" placeholder="e.g. KA-01-AB-1234" required />
          </div>
          <div class="form-group">
            <label for="booking-duration">Estimated Duration (Hours)</label>
            <select id="booking-duration" class="form-control" required>
              <option value="1">1 Hour</option>
              <option value="2" selected>2 Hours</option>
              <option value="4">4 Hours</option>
              <option value="8">8 Hours</option>
              <option value="12">12 Hours</option>
              <option value="24">24 Hours</option>
            </select>
          </div>
          <div class="form-group" style="margin-top: 1.5rem;">
            <button type="submit" class="btn btn-primary btn-block">Confirm Reservation</button>
          </div>
        </form>
      </dialog>

      <!-- Digital Pass Modal -->
      <dialog id="pass-modal" closedby="any" aria-labelledby="pass-modal-title">
        <div class="dialog-header">
          <h2 id="pass-modal-title">Digital Parking Ticket</h2>
          <button type="button" class="dialog-close" id="btn-close-pass-modal" aria-label="Close dialog">&times;</button>
        </div>
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div class="booking-pass">
            <div id="pass-slot-id" style="font-size: 1.75rem; font-weight: 800; color: var(--accent); line-height: 1;">A1</div>
            <div style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-secondary); margin-top: -0.5rem; font-weight: 600;">Assigned Space</div>
            
            <div class="qr-wrapper">
              <img id="pass-qr-code-img" class="qr-code" src="" alt="Booking QR Code" />
            </div>
            
            <div class="pass-details">
              <div>Booking ID:</div>
              <div id="pass-booking-id" class="pass-val">BK-XXXXXX</div>
              <div>Vehicle Plate:</div>
              <div id="pass-vehicle-plate" class="pass-val">KA-01-AB-1234</div>
              <div>Security PIN:</div>
              <div id="pass-pin" class="pass-val" style="letter-spacing: 0.1em;">----</div>
              <div>Hourly Rate:</div>
              <div id="pass-rate" class="pass-val">$2.00 / hr</div>
            </div>
          </div>

          <!-- Security Anti-Theft Switch -->
          <div class="lock-card-box" id="pass-lock-box">
            <div class="lock-label-group">
              <svg class="lock-icon-svg" id="pass-lock-icon" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path class="lock-shackle" d="M7 11V7a5 5 0 0 1 9.9-1" />
              </svg>
              <div>
                <div style="font-weight: 700; font-size: 0.9rem;" id="pass-lock-title">Vehicle Security Lock</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);" id="pass-lock-desc">Lock vehicle at exit gates</div>
              </div>
            </div>
            <div>
              <label class="switch" aria-label="Toggle vehicle security lock">
                <input type="checkbox" id="pass-lock-toggle" />
                <span class="slider"></span>
              </label>
            </div>
          </div>
          
          <!-- Emergency & Dispute Action Buttons -->
          <div style="display: flex; gap: 0.5rem;" id="pass-dispute-actions">
            <button type="button" id="btn-report-theft" class="btn btn-warning" style="flex: 1; font-size: 0.8rem; font-weight: 600; padding: 0.5rem 0.25rem;">
              🚨 Report Slot Hijacked
            </button>
            <a href="tel:+15550199111" class="btn btn-danger" style="flex: 1; font-size: 0.8rem; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; gap: 0.25rem; padding: 0.5rem 0.25rem;">
              📞 Emergency Call
            </a>
          </div>
          
          <p class="text-secondary" style="font-size: 0.75rem; text-align: center; margin-top: -0.25rem;">
            Show this QR code at the entry gate sensor, or use the PIN to checkout at the exit gate. Activating the Security Lock blocks the vehicle from being driven out.
          </p>
        </div>
      </dialog>
    `}init(){this.heroComponent.init(),this.setupModalDismiss(),this.render(),this.updateDashboard()}destroy(){this.activeBillingInterval&&(clearInterval(this.activeBillingInterval),this.activeBillingInterval=null)}updateDashboard(){const e=S();this.activeBillingInterval&&(clearInterval(this.activeBillingInterval),this.activeBillingInterval=null);const s=e.slots.length,n=e.slots.filter(g=>g.status==="available").length,t=e.slots.filter(g=>g.status==="occupied").length,a=e.alerts.filter(g=>!g.resolved).length,r=document.getElementById("stats-total"),l=document.getElementById("stats-available"),c=document.getElementById("stats-occupied"),d=document.getElementById("stats-alerts");r&&(r.textContent=s),l&&(l.textContent=n),c&&(c.textContent=t),d&&(d.textContent=a);const h=document.getElementById("alert-card-container"),u=document.getElementById("stats-alerts-text");h&&u&&(a>0?(h.classList.add("active-alarms"),u.innerHTML=`<span style="color: var(--danger); font-weight: 700;">${a} Active Breaches!</span>`):(h.classList.remove("active-alarms"),u.textContent="No active breaches")),this.renderZoneGrid("grid-zone-a","A",e.slots),this.renderZoneGrid("grid-zone-b","B",e.slots),this.renderZoneGrid("grid-zone-c","C",e.slots),this.renderSidebarDetails(e),this.renderQuickReservations(e)}renderZoneGrid(e,s,n){const t=document.getElementById(e);if(!t)return;t.innerHTML="",n.filter(a=>a.zone===s).forEach(a=>{const r=document.createElement("div");r.className=`parking-slot ${a.status}`,r.setAttribute("role","button"),r.setAttribute("aria-label",`Slot ${a.id}, status: ${a.status}, category: ${a.type}`),r.setAttribute("tabindex","0");let l="";a.status==="available"?l='<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>':a.status==="theft-alert"?l='<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>':l='<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11 2 11.2 2 11.5V16c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',r.innerHTML=`
        <span class="slot-id">${a.id}</span>
        <svg class="slot-icon" viewBox="0 0 24 24">
          ${l}
        </svg>
        <span class="slot-status-text">${a.status.replace("-"," ")}</span>
      `,r.addEventListener("keydown",c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),r.click())}),r.addEventListener("click",()=>{document.querySelectorAll(".parking-slot").forEach(c=>c.style.boxShadow=""),r.style.boxShadow="0 0 0 3px var(--accent)",this.currentSelectedSlotId=a.id,this.showSlotDetailsInSidebar(a)}),t.appendChild(r)})}renderSidebarDetails(e){if(this.currentSelectedSlotId){const n=e.slots.find(t=>t.id===this.currentSelectedSlotId);if(n){this.showSlotDetailsInSidebar(n);return}}const s=document.getElementById("sidebar-slot-details");s&&(s.innerHTML=`
        <p class="text-secondary">Click on any parking slot in the grid map to view its occupancy status or to start a reservation.</p>
      `)}showSlotDetailsInSidebar(e){const s=document.getElementById("sidebar-slot-details"),n=document.getElementById("sidebar-title"),t=S();if(!(!s||!n)){if(n.textContent=`Space details: ${e.id}`,this.activeBillingInterval&&(clearInterval(this.activeBillingInterval),this.activeBillingInterval=null),e.status==="available")s.innerHTML=`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div class="info-box">
            <div class="info-item"><span>Slot ID:</span> <span>${e.id}</span></div>
            <div class="info-item"><span>Category:</span> <span>${e.type}</span></div>
            <div class="info-item"><span>Hourly Rate:</span> <span>$${e.rate.toFixed(2)}/hr</span></div>
            <div class="info-item"><span>Status:</span> <span style="color: var(--success); font-weight: 700;">Available</span></div>
          </div>
          <button id="btn-reserve-sidebar" class="btn btn-primary btn-block">Reserve Space</button>
        </div>
      `,document.getElementById("btn-reserve-sidebar").addEventListener("click",()=>{this.openReservationDialog(e.id)});else if(e.status==="reserved"){const i=t.bookings.find(a=>a.slotId===e.id&&a.status==="reserved");if(!i)return;s.innerHTML=`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div class="info-box">
            <div class="info-item"><span>Booking ID:</span> <span style="font-family: monospace;">${i.id}</span></div>
            <div class="info-item"><span>Vehicle Plate:</span> <span>${i.vehiclePlate}</span></div>
            <div class="info-item"><span>Rate:</span> <span>$${e.rate.toFixed(2)}/hr</span></div>
            <div class="info-item"><span>Security PIN:</span> <span style="letter-spacing: 0.05em;">${i.pin}</span></div>
            <div class="info-item"><span>Status:</span> <span style="color: var(--accent); font-weight: 700;">Reserved</span></div>
          </div>
          <button id="btn-view-pass-sidebar" class="btn btn-secondary btn-block">View Digital Pass</button>
        </div>
      `,document.getElementById("btn-view-pass-sidebar").addEventListener("click",()=>{this.openDigitalPass(i.id)})}else if(e.status==="occupied"){const i=t.bookings.find(r=>r.slotId===e.id&&r.status==="checked-in");if(!i)return;s.innerHTML=`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div class="info-box">
            <div class="info-item"><span>Booking ID:</span> <span style="font-family: monospace;">${i.id}</span></div>
            <div class="info-item"><span>Vehicle Plate:</span> <span>${i.vehiclePlate}</span></div>
            <div class="info-item"><span>Check-In Time:</span> <span style="font-size: 0.75rem;">${new Date(i.startTime).toLocaleTimeString()}</span></div>
            <div class="info-item"><span>Security Lock:</span> <span style="color: ${i.securityLock?"var(--danger)":"var(--success)"}; font-weight: 700;">${i.securityLock?"LOCKED":"UNLOCKED"}</span></div>
            <div class="info-item" style="border-top: 1px dashed var(--border-color); padding-top: 0.5rem; margin-top: 0.5rem;">
              <span>Charges Accrued:</span> 
              <span id="live-charges-count" style="font-size: 1.15rem; color: var(--warning); font-weight: 700;">$0.00</span>
            </div>
          </div>
          <button id="btn-view-pass-sidebar" class="btn btn-secondary btn-block">Manage Pass &amp; Lock</button>
        </div>
      `;const a=()=>{const c=(new Date-new Date(i.startTime))/(1e3*60*60),h=Math.max(.01,c)*i.rate,u=document.getElementById("live-charges-count");u&&(u.textContent=`$${h.toFixed(3)}`)};a(),this.activeBillingInterval=setInterval(a,1e3),document.getElementById("btn-view-pass-sidebar").addEventListener("click",()=>{this.openDigitalPass(i.id)})}else if(e.status==="theft-alert"){const i=t.alerts.find(a=>a.slotId===e.id&&!a.resolved);s.innerHTML=`
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div class="info-box" style="border-color: var(--danger); background-color: var(--danger-bg);">
            <div style="color: var(--danger); font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.25rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              Security Alarm Active
            </div>
            <p style="font-size: 0.8rem; color: var(--text-primary); line-height: 1.4;">
              ${i?i.message:"Unauthorized vehicle parked in reserved slot without verification."}
            </p>
          </div>
          <button id="btn-goto-admin" class="btn btn-secondary btn-block">Go to Admin Center</button>
        </div>
      `,document.getElementById("btn-goto-admin").addEventListener("click",()=>{window.location.hash="#/admin"})}}}renderQuickReservations(e){const s=document.getElementById("quick-bookings-list");if(!s)return;const n=e.bookings.filter(i=>i.status==="reserved"||i.status==="checked-in");if(n.length===0){s.innerHTML='<p class="text-secondary" style="font-size: 0.8rem;">No active bookings found. Select a slot to reserve.</p>';return}s.innerHTML="";const t=document.createElement("div");t.style.display="flex",t.style.flexDirection="column",t.style.gap="0.5rem",n.forEach(i=>{const a=document.createElement("button");a.className="btn btn-secondary",a.style.fontSize="0.8rem",a.style.justifyContent="space-between",a.style.width="100%",a.style.padding="0.4rem 0.65rem";let r='<span style="color: var(--accent); font-weight: 700;">Reserved</span>';i.status==="checked-in"&&(r=i.securityLock?'<span style="color: var(--danger); font-weight: 700;">LOCKED</span>':'<span style="color: var(--success); font-weight: 700;">Parked</span>'),a.innerHTML=`
        <span style="font-weight: 600;">${i.slotId} - ${i.vehiclePlate}</span>
        ${r}
      `,a.addEventListener("click",()=>{this.openDigitalPass(i.id)}),t.appendChild(a)}),s.appendChild(t)}openReservationDialog(e){const s=document.getElementById("booking-modal"),n=document.getElementById("booking-slot-id-display"),t=document.getElementById("booking-form");!s||!n||!t||(n.value=e,document.getElementById("booking-plate").value="",document.getElementById("booking-duration").selectedIndex=1,t.onsubmit=i=>{i.preventDefault();const a=document.getElementById("booking-plate").value,r=document.getElementById("booking-duration").value,l=Tt(e,a,r);l.success?(s.close(),this.showToast(`Slot ${e} reserved successfully!`,"success"),this.updateDashboard(),this.openDigitalPass(l.booking.id)):this.showToast(l.error,"error")},s.showModal())}async openDigitalPass(e){const s=document.getElementById("pass-modal");if(!s)return;const t=S().bookings.find(g=>g.id===e);if(!t)return;document.getElementById("pass-slot-id").textContent=t.slotId;const i=s.querySelector(".pass-details");if(i)if(t.voucherCode)i.innerHTML=`
          <div>Booking ID:</div>
          <div id="pass-booking-id" class="pass-val">${t.id}</div>
          <div>Vehicle Plate:</div>
          <div id="pass-vehicle-plate" class="pass-val">${t.vehiclePlate}</div>
          <div>Security PIN:</div>
          <div id="pass-pin" class="pass-val" style="letter-spacing: 0.1em;">${t.pin}</div>
          <div>Hourly Rate:</div>
          <div id="pass-rate" class="pass-val" style="color: var(--success); font-weight: 700;">$0.00 (FREE COMP)</div>
          <div style="color: var(--success); font-weight: 700;">Compensation:</div>
          <div class="pass-val" style="color: var(--success); font-weight: 700;">$10.00 Credit (${t.voucherCode})</div>
        `;else{const g=t.rate===0?"$0.00 (FREE COMP)":`$${t.rate.toFixed(2)}/hr`;i.innerHTML=`
          <div>Booking ID:</div>
          <div id="pass-booking-id" class="pass-val">${t.id}</div>
          <div>Vehicle Plate:</div>
          <div id="pass-vehicle-plate" class="pass-val">${t.vehiclePlate}</div>
          <div>Security PIN:</div>
          <div id="pass-pin" class="pass-val" style="letter-spacing: 0.1em;">${t.pin}</div>
          <div>Hourly Rate:</div>
          <div id="pass-rate" class="pass-val">${g}</div>
        `}await this.renderQR(e);const a=document.getElementById("pass-lock-toggle"),r=document.getElementById("pass-lock-box"),l=document.getElementById("pass-lock-icon"),c=document.getElementById("pass-lock-title"),d=document.getElementById("pass-lock-desc");a&&(a.checked=t.securityLock,this.updateLockUI(t.securityLock,r,c,d,l),a.onchange=()=>{const g=a.checked;Lt(e,g).success&&(this.updateLockUI(g,r,c,d,l),g?this.showToast("ANTI-THEFT LOCK ACTIVE! Vehicle cannot leave gate.","warning"):this.showToast("Vehicle unlocked. Exit gate cleared.","success"),this.updateDashboard())});const h=document.getElementById("pass-dispute-actions"),u=document.getElementById("btn-report-theft");if(h&&u)if(t.status==="reserved"){h.style.display="flex";const g=u.cloneNode(!0);u.parentNode.replaceChild(g,u),g.addEventListener("click",()=>{if(confirm(`Are you sure you want to report that another vehicle is currently occupying Slot ${t.slotId}?

This will trigger a security dispatch and immediately reassign you to a free parking slot as compensation.`)){const p=$t(e);p.success?(this.showToast(p.message,"success"),s.close(),this.updateDashboard(),setTimeout(()=>{this.openDigitalPass(e)},400)):(this.showToast(p.error||"Dispute registered.","warning"),s.close(),this.updateDashboard())}})}else h.style.display="none";s.showModal()}async renderQR(e){const s=document.documentElement.getAttribute("data-theme")==="dark",n=document.getElementById("pass-qr-code-img"),t=await It(e,s);n&&(n.src=t)}updateLockUI(e,s,n,t,i){!s||!n||!t||!i||(e?(s.classList.add("locked"),n.textContent="Vehicle Security Locked",n.style.color="var(--danger)",t.textContent="Exit block active. Disable lock to drive out.",i.innerHTML=`
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      `):(s.classList.remove("locked"),n.textContent="Vehicle Security Unlocked",n.style.color="",t.textContent="Lock vehicle to secure it at the exit gates.",i.innerHTML=`
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
      `))}setupModalDismiss(){const e=document.getElementById("booking-modal"),s=document.getElementById("pass-modal"),n=document.getElementById("btn-close-booking-modal"),t=document.getElementById("btn-close-pass-modal");n&&n.addEventListener("click",()=>e.close()),t&&t.addEventListener("click",()=>s.close()),"closedBy"in HTMLDialogElement.prototype||[e,s].forEach(i=>{i&&i.addEventListener("click",a=>{if(a.target!==i)return;const r=i.getBoundingClientRect();r.top<=a.clientY&&a.clientY<=r.top+r.height&&r.left<=a.clientX&&a.clientX<=r.left+r.width||i.close()})})}}class Ht{constructor(e){this.showToast=e}render(){return`
      <div class="static-page-header">
        <h1>Smart Security Gate Simulation Panel</h1>
        <p>Test and verify the anti-parking slot theft features, QR verifications, and alarm alerts.</p>
      </div>

      <div class="simulator-layout">
        <!-- Control Forms Column -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <!-- Check-in Gate -->
          <div class="simulation-gate">
            <div class="gate-indicator closed" id="entry-gate-indicator">
              <span style="font-weight: 600;">ENTRY GATE SENSOR</span>
              <span class="gate-status-light"></span>
            </div>
            <h3>Simulate Vehicle Entry</h3>
            <p class="text-secondary" style="font-size: 0.85rem; margin-top: -0.5rem;">
              Simulate a car arriving at the gate. Enter plate + matching Booking ID. If a different vehicle attempts to park in a reserved slot, slot theft is triggered!
            </p>
            <form id="simulator-entry-form">
              <div class="form-group">
                <label for="sim-entry-slot">Parking Slot to Enter</label>
                <select id="sim-entry-slot" class="form-control" required>
                  <option value="">-- Choose Slot --</option>
                </select>
              </div>
              <div class="form-group">
                <label for="sim-entry-booking">Booking ID / Scan Ticket</label>
                <input type="text" id="sim-entry-booking" class="form-control" placeholder="BK-123456" />
                <span class="text-secondary" style="font-size: 0.75rem;">(Leave blank to simulate parking without reservation)</span>
              </div>
              <div class="form-group">
                <label for="sim-entry-plate">Arriving Vehicle License Plate</label>
                <input type="text" id="sim-entry-plate" class="form-control" placeholder="e.g. KA-01-AB-1234" required />
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                Simulate Gate Entry Check
              </button>
            </form>
          </div>

          <!-- Check-out Gate -->
          <div class="simulation-gate">
            <div class="gate-indicator closed" id="exit-gate-indicator">
              <span style="font-weight: 600;">EXIT GATE SENSOR</span>
              <span class="gate-status-light"></span>
            </div>
            <h3>Simulate Vehicle Exit</h3>
            <p class="text-secondary" style="font-size: 0.85rem; margin-top: -0.5rem;">
              Simulate a car leaving. Enter PIN. If the user toggled the "Security Lock" in the booking pass, the exit gate will block the vehicle and trigger an alarm.
            </p>
            <form id="simulator-exit-form">
              <div class="form-group">
                <label for="sim-exit-slot">Parking Slot to Exit</label>
                <select id="sim-exit-slot" class="form-control" required>
                  <option value="">-- Choose Slot --</option>
                </select>
              </div>
              <div class="form-group">
                <label for="sim-exit-pin">Security PIN (4 digits)</label>
                <input type="password" id="sim-exit-pin" class="form-control" maxLength="4" placeholder="Enter PIN" />
                <span class="text-secondary" style="font-size: 0.75rem;">(Unnecessary if slot is unauthorized/theft status)</span>
              </div>
              <button type="submit" class="btn btn-secondary btn-block">
                Simulate Gate Exit Check
              </button>
            </form>
          </div>
        </div>

        <!-- Real-Time Activity Monitor Log Column -->
        <div class="card">
          <div class="card-header" style="background-color: var(--bg-tertiary);">
            <h2 class="card-title">Live Simulator Activity &amp; Alarm Log</h2>
            <button id="clear-simulator-logs" class="btn btn-secondary" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;">Clear Logs</button>
          </div>
          <div class="card-body" style="display: flex; flex-direction: column; gap: 1rem; height: calc(100% - 60px);">
            <div class="logs-list" id="simulator-logs-feed" style="flex: 1; min-height: 480px;">
              <div class="log-item">
                <span class="log-time">[20:56:50]</span>
                <span class="log-msg">Security monitoring systems initialized and active.</span>
              </div>
            </div>
            <div class="info-box">
              <div style="font-weight: 600; font-size: 0.85rem;">Simulate Quick Theft Test Steps:</div>
              <ol style="font-size: 0.8rem; padding-left: 1.25rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.25rem;">
                <li>Go to <strong>Dashboard</strong>, select <strong>Slot A1</strong>, click <strong>Reserve</strong>, enter vehicle number (e.g. <code>KA-01-1234</code>).</li>
                <li>In the <strong>Security Simulator</strong>, choose <strong>Slot A1</strong>. Try entering a different plate (e.g. <code>DL-03-5555</code>) with the Booking ID.</li>
                <li>Click <strong>Gate Entry Check</strong>. Observe the warning and flashing red slot alert!</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    `}init(){this.updateDropdowns(),this.setupListeners()}updateDropdowns(){const e=S(),s=document.getElementById("sim-entry-slot"),n=document.getElementById("sim-exit-slot");s&&(s.innerHTML='<option value="">-- Choose Slot --</option>',e.slots.forEach(t=>{(t.status==="available"||t.status==="reserved")&&(s.innerHTML+=`<option value="${t.id}">${t.id} (${t.status.toUpperCase()})</option>`)})),n&&(n.innerHTML='<option value="">-- Choose Slot --</option>',e.slots.forEach(t=>{(t.status==="occupied"||t.status==="theft-alert")&&(n.innerHTML+=`<option value="${t.id}">${t.id} (${t.status.toUpperCase()})</option>`)}))}setupListeners(){const e=document.getElementById("simulator-entry-form"),s=document.getElementById("simulator-exit-form"),n=document.getElementById("clear-simulator-logs");e&&e.addEventListener("submit",t=>{t.preventDefault();const i=document.getElementById("sim-entry-slot").value,a=document.getElementById("sim-entry-booking").value,r=document.getElementById("sim-entry-plate").value,l=At(a,i,r),c=document.getElementById("entry-gate-indicator");l.success?(this.showToast("Gate Verified! Access Granted.","success"),this.logEvent(`ENTRY GATE: Vehicle ${r.toUpperCase()} checked into slot ${i}. Reservation verified.`,!1,!0),c&&(c.classList.remove("closed"),c.classList.add("open"),setTimeout(()=>{c.classList.remove("open"),c.classList.add("closed")},2500)),e.reset(),this.updateDropdowns()):(this.showToast(l.error,"error"),l.alert?(this.logEvent(`SECURITY BREACH WARNING: ${l.error} (Alert ID: ${l.alert.id})`,!0),this.triggerAlarm()):this.logEvent(`ENTRY GATES DENIED: ${l.error}`,!0),this.updateDropdowns())}),s&&s.addEventListener("submit",t=>{t.preventDefault();const i=document.getElementById("sim-exit-slot").value,a=document.getElementById("sim-exit-pin").value,r=xt(i,a),l=document.getElementById("exit-gate-indicator");r.success?(this.showToast("Gate Verified! Exit Granted.","success"),r.booking?this.logEvent(`EXIT GATE: Vehicle ${r.booking.vehiclePlate} checked out. Duration: ${r.billedHours} hr. Final Bill: $${r.finalCost.toFixed(2)}.`,!1,!0):this.logEvent(`EXIT GATE: Slot ${i} cleared.`,!1,!0),l&&(l.classList.remove("closed"),l.classList.add("open"),setTimeout(()=>{l.classList.remove("open"),l.classList.add("closed")},2500)),s.reset(),this.updateDropdowns()):(this.showToast(r.error,"error"),r.alert?(this.logEvent(`ANTI-THEFT LOCKOUT: Gate closed! Locked vehicle movement detected on slot ${i}. (Alert ID: ${r.alert.id})`,!0),this.triggerAlarm()):this.logEvent(`EXIT GATES DENIED: ${r.error}`,!0),this.updateDropdowns())}),n&&n.addEventListener("click",()=>{const t=document.getElementById("simulator-logs-feed");t&&(t.innerHTML=`
            <div class="log-item">
              <span class="log-time">[${new Date().toLocaleTimeString()}]</span>
              <span class="log-msg">Simulator logs cleared. Security monitoring active.</span>
            </div>
          `)})}logEvent(e,s=!1,n=!1){const t=document.getElementById("simulator-logs-feed");if(!t)return;const i=new Date().toLocaleTimeString(),a=document.createElement("div");a.className="log-item";let r="log-msg";s&&(r+=" error"),n&&(r+=" success"),a.innerHTML=`
      <span class="log-time">[${i}]</span>
      <span class="${r}">${e}</span>
    `,t.appendChild(a),t.scrollTop=t.scrollHeight}triggerAlarm(){try{const e=new(window.AudioContext||window.webkitAudioContext);if(!e)return;const s=n=>{const t=e.createOscillator(),i=e.createGain();t.type="sawtooth",t.frequency.setValueAtTime(880,e.currentTime),t.connect(i),i.connect(e.destination),i.gain.setValueAtTime(.15,e.currentTime),t.start(e.currentTime+n),i.gain.exponentialRampToValueAtTime(.01,e.currentTime+n+.5),t.stop(e.currentTime+n+.5)};s(0),s(.6)}catch(e){console.warn("Audio Context alarm beep failed.",e)}}}class Vt{constructor(e){this.showToast=e}render(){return`
      <div class="static-page-header">
        <h1>Command &amp; Security Control Center</h1>
        <p>View bookings, manage slot layouts, respond to security breach alerts, and read support tickets.</p>
      </div>

      <div class="admin-layout">
        <!-- Alerts and Management Column -->
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          
          <!-- Security Alerts Feed -->
          <div class="card" id="admin-alerts-card">
            <div class="card-header" style="background-color: var(--danger-bg); border-bottom-color: var(--danger);">
              <h2 class="card-title" style="color: var(--danger); display: flex; align-items: center; gap: 0.5rem;">
                <svg width="20" height="20" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                Active Security Breaches (<span id="admin-alerts-count">0</span>)
              </h2>
            </div>
            <div class="card-body">
              <div class="alert-feed-list" id="admin-alerts-feed">
                <p class="text-secondary" style="text-align: center; padding: 1.5rem 0;">No active security breaches or lock violations detected.</p>
              </div>
            </div>
          </div>

          <!-- Slots Management -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Manage Parking Layout</h2>
            </div>
            <div class="card-body">
              <div class="grid-2col" style="gap: 1.5rem; align-items: start;">
                <!-- Add slot form -->
                <form id="admin-add-slot-form" style="border-right: 1px solid var(--border-color); padding-right: 1.5rem;">
                  <h3 style="font-size: 1rem; margin-bottom: 1rem;">Add New Parking Slot</h3>
                  <div class="form-group">
                    <label for="admin-slot-id">Slot ID (Unique, e.g. A9)</label>
                    <input type="text" id="admin-slot-id" class="form-control" placeholder="A9" required />
                  </div>
                  <div class="form-group">
                    <label for="admin-slot-zone">Zone (A, B, C...)</label>
                    <input type="text" id="admin-slot-zone" class="form-control" placeholder="A" maxLength="1" required />
                  </div>
                  <div class="form-group">
                    <label for="admin-slot-type">Slot Category</label>
                    <select id="admin-slot-type" class="form-control" required>
                      <option value="Standard">Standard Parking</option>
                      <option value="EV Charging">EV Charging Slot</option>
                      <option value="Premium / VIP">Premium / VIP Slot</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="admin-slot-rate">Hourly Rate ($)</label>
                    <input type="number" id="admin-slot-rate" class="form-control" step="0.5" min="0.5" value="2.0" required />
                  </div>
                  <button type="submit" class="btn btn-primary btn-block">Add Slot to Grid</button>
                </form>

                <!-- Slots List with delete -->
                <div>
                  <h3 style="font-size: 1rem; margin-bottom: 1rem;">Active Layout Slots (<span id="admin-slots-total">20</span>)</h3>
                  <div id="admin-slots-list" style="max-height: 320px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.5rem; border: 1px solid var(--border-color); padding: 0.75rem; border-radius: var(--radius-sm);">
                    <!-- Dynamic rendering -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Support Tickets Logs -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">User Support &amp; Contact Enquiries</h2>
            </div>
            <div class="card-body">
              <div class="ticket-list" id="admin-tickets-list">
                <p class="text-secondary" style="text-align: center; padding: 1.5rem 0;">No support inquiries or contact submissions found.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bookings Column -->
        <div class="card">
          <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
            <h2 class="card-title">All Reservations History</h2>
            <button id="admin-reset-system" class="btn btn-danger" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;">Reset Database</button>
          </div>
          <div class="card-body" style="padding: 0;">
            <div id="admin-bookings-table-wrapper" style="max-height: 600px; overflow-y: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
                <thead>
                  <tr style="background-color: var(--bg-tertiary); border-bottom: 1px solid var(--border-color);">
                    <th style="padding: 0.75rem 1rem;">Booking ID</th>
                    <th style="padding: 0.75rem 1rem;">Slot</th>
                    <th style="padding: 0.75rem 1rem;">Plate</th>
                    <th style="padding: 0.75rem 1rem;">Status</th>
                    <th style="padding: 0.75rem 1rem;">Cost</th>
                  </tr>
                </thead>
                <tbody id="admin-bookings-rows">
                  <tr>
                    <td colspan="5" class="text-secondary" style="text-align: center; padding: 2rem;">No bookings found.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `}init(){this.updateAdminView(),this.setupListeners()}updateAdminView(){const e=S(),s=document.getElementById("admin-alerts-feed"),n=document.getElementById("admin-alerts-count"),t=e.alerts.filter(c=>!c.resolved);n&&(n.textContent=t.length),s&&(t.length===0?s.innerHTML='<p class="text-secondary" style="text-align: center; padding: 1.5rem 0;">No active security breaches or lock violations detected.</p>':(s.innerHTML="",t.forEach(c=>{const d=document.createElement("div");d.className="alert-feed-item",d.innerHTML=`
            <div class="alert-feed-content">
              <div class="alert-feed-msg">${c.message}</div>
              <div class="alert-feed-time">Detected: ${new Date(c.timestamp).toLocaleTimeString()} - Alert ID: ${c.id}</div>
            </div>
            <button class="btn btn-danger btn-dismiss-alert" data-id="${c.id}">Dismiss / Dispatch Guard</button>
          `,d.querySelector(".btn-dismiss-alert").addEventListener("click",()=>{Mt(c.id),this.showToast("Alert cleared. Security guard dispatched.","success"),this.updateAdminView()}),s.appendChild(d)})));const i=document.getElementById("admin-slots-list"),a=document.getElementById("admin-slots-total");a&&(a.textContent=e.slots.length),i&&(i.innerHTML="",e.slots.forEach(c=>{const d=document.createElement("div");d.style.display="flex",d.style.justifyContent="space-between",d.style.alignItems="center",d.style.padding="0.5rem",d.style.borderBottom="1px solid var(--border-color)",d.style.fontSize="0.85rem";let h="var(--success)";c.status==="reserved"&&(h="var(--accent)"),c.status==="occupied"&&(h="var(--warning)"),c.status==="theft-alert"&&(h="var(--danger)"),d.innerHTML=`
          <div>
            <span style="font-weight: 700;">${c.id}</span> 
            <span class="text-secondary" style="margin-left: 0.5rem;">(${c.type} - $${c.rate}/hr)</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-weight: 600; color: ${h}; font-size: 0.75rem; text-transform: uppercase;">${c.status}</span>
            ${c.status==="available"?`<button class="btn btn-secondary btn-delete-slot" data-id="${c.id}" style="padding: 0.2rem 0.4rem; font-size: 0.75rem;">&times;</button>`:""}
          </div>
        `,c.status==="available"&&d.querySelector(".btn-delete-slot").addEventListener("click",()=>{const u=Dt(c.id);u.success?(this.showToast(`Slot ${c.id} removed.`,"success"),this.updateAdminView()):this.showToast(u.error,"error")}),i.appendChild(d)}));const r=document.getElementById("admin-bookings-rows");r&&(e.bookings.length===0?r.innerHTML=`
          <tr>
            <td colspan="5" class="text-secondary" style="text-align: center; padding: 2rem;">No bookings found.</td>
          </tr>
        `:(r.innerHTML="",[...e.bookings].reverse().forEach(d=>{const h=document.createElement("tr");h.style.borderBottom="1px solid var(--border-color)";let u="var(--accent)";d.status==="checked-in"&&(u="var(--warning)"),d.status==="completed"&&(u="var(--success)"),d.status==="cancelled"&&(u="var(--text-secondary)"),h.innerHTML=`
            <td style="padding: 0.75rem 1rem; font-family: monospace;">${d.id}</td>
            <td style="padding: 0.75rem 1rem; font-weight: 600;">${d.slotId}</td>
            <td style="padding: 0.75rem 1rem;">${d.vehiclePlate}</td>
            <td style="padding: 0.75rem 1rem; font-weight: 600; color: ${u};">${d.status.toUpperCase()}</td>
            <td style="padding: 0.75rem 1rem; font-weight: 700;">${d.cost?`$${d.cost.toFixed(2)}`:"--"}</td>
          `,r.appendChild(h)})));const l=document.getElementById("admin-tickets-list");l&&(e.supportTickets.length===0?l.innerHTML='<p class="text-secondary" style="text-align: center; padding: 1.5rem 0;">No support inquiries or contact submissions found.</p>':(l.innerHTML="",e.supportTickets.forEach(c=>{const d=document.createElement("div");d.className="ticket-item",d.innerHTML=`
            <div class="ticket-header">
              <div>
                <div class="ticket-subject">${c.subject}</div>
                <div class="ticket-meta">From: ${c.name} (${c.email})</div>
              </div>
              <div class="ticket-meta">${new Date(c.timestamp).toLocaleString()}</div>
            </div>
            <div class="ticket-message">${c.message}</div>
          `,l.appendChild(d)})))}setupListeners(){const e=document.getElementById("admin-add-slot-form"),s=document.getElementById("admin-reset-system");e&&e.addEventListener("submit",n=>{n.preventDefault();const t=document.getElementById("admin-slot-id").value,i=document.getElementById("admin-slot-zone").value,a=document.getElementById("admin-slot-type").value,r=document.getElementById("admin-slot-rate").value,l=Pt(t,i,a,r);l.success?(this.showToast(`Slot ${t} added to the grid map.`,"success"),e.reset(),this.updateAdminView()):this.showToast(l.error,"error")}),s&&s.addEventListener("click",()=>{confirm("Are you sure you want to restore the system to defaults? This will erase all bookings, alerts, and tickets!")&&(Nt(),this.showToast("Database reset to defaults.","success"),window.location.hash="#/dashboard")})}}class Ft{render(){return`
      <div class="static-page-header">
        <h1>About Smart Parking Security &amp; Reservation System</h1>
        <p>A smart IoT-inspired system designed to resolve space piracy, parking fraud, and vehicle theft.</p>
      </div>

      <div class="grid-2col">
        <!-- Story and Description -->
        <div>
          <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--accent);">Anti-Theft Parking Innovation</h2>
          <p class="text-secondary" style="margin-bottom: 1.25rem;">
            In traditional parking lots, reservations only act as a signpost. Anyone can slide into an empty reserved spot, leading to disputes, lost revenues, and frustration. Furthermore, once inside a parking garage, vehicles are vulnerable to theft.
          </p>
          <p class="text-secondary" style="margin-bottom: 1.5rem;">
            <strong>ParkGuard</strong> resolves both problems simultaneously. By binding digital ticket check-ins to license plate scans, the entry gates verify identity before opening. If an unauthorized car slides in, the slot sensor flags it instantly. When parked, drivers can toggle the <strong>Security Lock</strong> via their smartphone. If a thief tries to roll the locked car past exit sensors, the system locks down exit gates, triggers loud sirens, and alerts parking authorities.
          </p>

          <h3 style="font-weight: 600; font-size: 1.1rem; margin-bottom: 1rem;">Core Security Workflows</h3>
          <div class="about-features">
            <div class="feature-box">
              <div class="feature-box-icon">
                <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div class="feature-box-content">
                <h3>QR &amp; Plate Verification</h3>
                <p>Gates cross-reference the digital QR pass with the physical license plate. Mismatching vehicles are denied access.</p>
              </div>
            </div>
            
            <div class="feature-box">
              <div class="feature-box-icon">
                <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <div class="feature-box-content">
                <h3>Smartphone Slot Lock</h3>
                <p>Secure your vehicle directly from the browser app. When activated, the exit gate will block the vehicle until the owner unlocks it.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Technical and Team info -->
        <div>
          <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Technology &amp; Security Flow</h2>
          <div class="info-box" style="margin-bottom: 2rem;">
            <div class="info-title">System Architecture Overview</div>
            <div class="text-secondary" style="line-height: 1.6;">
              This web application acts as a simulation and monitoring dashboard representing a real-world edge IoT network. 
              <br/><br/>
              <strong>1. Client Interface:</strong> The user accesses the dashboard to reserve spaces, check prices, and obtain QR tickets.
              <br/><br/>
              <strong>2. Simulation Node:</strong> Emulates automated gate nodes and ultrasonic parking bay sensors, sending verification payloads.
              <br/><br/>
              <strong>3. Command Center:</strong> Receives event logs, updates layout configurations, and dispatches security guards when slot theft or vehicle movement alarms trigger.
            </div>
          </div>

          <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Developer Team</h2>
          <div class="team-grid">
            <div class="team-card">
              <div class="team-avatar">JD</div>
              <div class="team-name">Joshua D.</div>
              <div class="team-role">Lead Developer</div>
              <p class="text-secondary" style="font-size: 0.75rem;">Full Stack Developer &amp; Security Enthusiast</p>
            </div>
            <div class="team-card">
              <div class="team-avatar">AG</div>
              <div class="team-name">Antigravity AI</div>
              <div class="team-role">AI Architect</div>
              <p class="text-secondary" style="font-size: 0.75rem;">Pair-Programming Assistant &amp; Designer</p>
            </div>
          </div>
        </div>
      </div>
    `}init(){}}class Ut{constructor(e){this.showToast=e}render(){return`
      <div class="static-page-header">
        <h1>Contact Support &amp; FAQ Center</h1>
        <p>Get in touch with parking authorities, file support tickets, or search FAQs.</p>
      </div>

      <div class="grid-2col" style="align-items: start;">
        <!-- Support Ticket Form -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">File a Support Ticket</h2>
          </div>
          <div class="card-body">
            <form id="contact-support-form">
              <div class="form-group">
                <label for="contact-name">Your Full Name</label>
                <input type="text" id="contact-name" class="form-control" placeholder="John Doe" required />
              </div>
              <div class="form-group">
                <label for="contact-email">Email Address</label>
                <input type="email" id="contact-email" class="form-control" placeholder="john@example.com" required />
              </div>
              <div class="form-group">
                <label for="contact-subject">Topic / Subject</label>
                <input type="text" id="contact-subject" class="form-control" placeholder="e.g. Booking refund or lock issue" required />
              </div>
              <div class="form-group">
                <label for="contact-message">Detailed Message</label>
                <textarea id="contact-message" class="form-control" rows="5" placeholder="Explain the problem or request..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-block">Submit Support Ticket</button>
            </form>
          </div>
        </div>

        <!-- FAQ and Direct contact -->
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <!-- FAQ Section -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Frequently Asked Questions</h2>
            </div>
            <div class="card-body" style="display: flex; flex-direction: column; gap: 1rem;">
              
              <details name="parking-faq">
                <summary style="font-weight: 600; cursor: pointer; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                  How does the Anti-Slot Theft system verify plates?
                </summary>
                <p class="text-secondary" style="padding: 0.75rem 0; font-size: 0.85rem;">
                  When a driver reserves a slot, their vehicle registration number is mapped to that slot. When entering, a license plate reader (ANPR camera) scans the plate. If the plate does not match the reservation mapping, the slot lights flash red, gate access is blocked, and an alert is dispatched to security guards.
                </p>
              </details>

              <details name="parking-faq">
                <summary style="font-weight: 600; cursor: pointer; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                  What should I do if my exit gate is blocked by a Security Lock?
                </summary>
                <p class="text-secondary" style="padding: 0.75rem 0; font-size: 0.85rem;">
                  Simply pull up the app, view your active digital booking pass, and slide the "Anti-Theft Lock" toggle to OFF. The exit gate sensor will check the state and open. In case of cell network issues, you can present the QR ticket to the parking operator who can manually override the lock.
                </p>
              </details>

              <details name="parking-faq">
                <summary style="font-weight: 600; cursor: pointer; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                  How are parking charges calculated?
                </summary>
                <p class="text-secondary" style="padding: 0.75rem 0; font-size: 0.85rem;">
                  Charges start accruing the moment your vehicle scans in through the entry gate. Charges stop when you verify and scan out of the exit gate. Hourly rates depend on slot selection: Standard is $2/hr, EV Charging is $3/hr, and Premium VIP is $5/hr.
                </p>
              </details>
            </div>
          </div>

          <!-- Contact details -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Contact &amp; Location Details</h2>
            </div>
            <div class="card-body">
              <div class="contact-info-list">
                <div class="contact-info-item">
                  <div class="contact-info-icon">
                    <svg width="24" height="24" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div class="contact-info-text">
                    <h3>Emergency Security Dispatch</h3>
                    <p>+1 (555) 019-9111</p>
                  </div>
                </div>

                <div class="contact-info-item">
                  <div class="contact-info-icon">
                    <svg width="24" height="24" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                  </div>
                  <div class="contact-info-text">
                    <h3>Customer Support Email</h3>
                    <p>support@parksecure-systems.com</p>
                  </div>
                </div>

                <div class="contact-info-item">
                  <div class="contact-info-icon">
                    <svg width="24" height="24" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div class="contact-info-text">
                    <h3>Headquarters</h3>
                    <p>Sector 5, Outer Ring Rd, Tech City, KA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}init(){this.setupListeners()}setupListeners(){const e=document.getElementById("contact-support-form");e&&e.addEventListener("submit",s=>{s.preventDefault();const n=document.getElementById("contact-name").value,t=document.getElementById("contact-email").value,i=document.getElementById("contact-subject").value,a=document.getElementById("contact-message").value;Rt(n,t,i,a),this.showToast("Support ticket filed successfully!","success"),e.reset()})}}function j(o,e="info"){const s=document.getElementById("toast-container");if(!s)return;const n=document.createElement("div");n.className=`toast ${e}`;let t="";e==="success"?t='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>':e==="error"?t='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>':e==="warning"?t='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>':t='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>',n.innerHTML=`
    ${t}
    <span>${o}</span>
  `,s.appendChild(n),setTimeout(()=>{n.classList.add("toast-out"),n.addEventListener("animationend",()=>n.remove())},4e3)}document.addEventListener("DOMContentLoaded",()=>{const o=document.getElementById("navbar-mount"),e=new $e(r=>{if(x.currentComponent&&typeof x.currentComponent.renderQR=="function"){const l=document.getElementById("pass-modal");if(l&&l.hasAttribute("open")){const c=document.getElementById("pass-booking-id").textContent;x.currentComponent.renderQR(c)}}});o&&(o.innerHTML=e.render(),e.init());const s=new zt(j),n=new Ht(j),t=new Vt(j),i=new Ft,a=new Ut(j);x.setMountPoint("view-mount"),x.on("#/dashboard",s),x.on("#/simulator",n),x.on("#/admin",t),x.on("#/about",i),x.on("#/contact",a),x.handleRouting()});

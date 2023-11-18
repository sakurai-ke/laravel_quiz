import{J as De,k as h,o as b,f as x,i as A,l as Le,b as l,F as Y,j as Ee,h as Z,m as oe,A as se,I as je,a as V,u as U,w as le,p as $,x as ie,t as _,g as q,c as Ze,q as Ve,s as S,d as I,n as qe,y as Pe,z as We}from"./app-92f28c26.js";import{_ as Be}from"./AuthenticatedLayout-a5a149c9.js";import{Z as Qe}from"./index.esm-4f1a13b9.js";import Je from"./Chart-f410517b.js";import{C as Ge}from"./auto-5842a5d9.js";/* empty css                                                               */import{_ as Ke}from"./_plugin-vue_export-helper-c27b6911.js";import"./ApplicationLogo-306a323f.js";/* empty css                                              */function Xe(t){if(t===null||t===!0||t===!1)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function et(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}var he=6e4,we=36e5;function P(t,e){var a;et(1,arguments);var r=Xe((a=e==null?void 0:e.additionalDigits)!==null&&a!==void 0?a:2);if(r!==2&&r!==1&&r!==0)throw new RangeError("additionalDigits must be 0, 1 or 2");if(!(typeof t=="string"||Object.prototype.toString.call(t)==="[object String]"))return new Date(NaN);var n=nt(t),o;if(n.date){var c=ot(n.date,r);o=st(c.restDateString,c.year)}if(!o||isNaN(o.getTime()))return new Date(NaN);var v=o.getTime(),g=0,D;if(n.time&&(g=lt(n.time),isNaN(g)))return new Date(NaN);if(n.timezone){if(D=it(n.timezone),isNaN(D))return new Date(NaN)}else{var m=new Date(v+g),T=new Date(0);return T.setFullYear(m.getUTCFullYear(),m.getUTCMonth(),m.getUTCDate()),T.setHours(m.getUTCHours(),m.getUTCMinutes(),m.getUTCSeconds(),m.getUTCMilliseconds()),T}return new Date(v+g+D)}var F={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},tt=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,at=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,rt=/^([+-])(\d{2})(?::?(\d{2}))?$/;function nt(t){var e={},a=t.split(F.dateTimeDelimiter),r;if(a.length>2)return e;if(/:/.test(a[0])?r=a[0]:(e.date=a[0],r=a[1],F.timeZoneDelimiter.test(e.date)&&(e.date=t.split(F.timeZoneDelimiter)[0],r=t.substr(e.date.length,t.length))),r){var n=F.timezone.exec(r);n?(e.time=r.replace(n[1],""),e.timezone=n[1]):e.time=r}return e}function ot(t,e){var a=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+e)+"})|(\\d{2}|[+-]\\d{"+(2+e)+"})$)"),r=t.match(a);if(!r)return{year:NaN,restDateString:""};var n=r[1]?parseInt(r[1]):null,o=r[2]?parseInt(r[2]):null;return{year:o===null?n:o*100,restDateString:t.slice((r[1]||r[2]).length)}}function st(t,e){if(e===null)return new Date(NaN);var a=t.match(tt);if(!a)return new Date(NaN);var r=!!a[4],n=k(a[1]),o=k(a[2])-1,c=k(a[3]),v=k(a[4]),g=k(a[5])-1;if(r)return vt(e,v,g)?ut(e,v,g):new Date(NaN);var D=new Date(0);return!dt(e,o,c)||!ft(e,n)?new Date(NaN):(D.setUTCFullYear(e,o,Math.max(n,c)),D)}function k(t){return t?parseInt(t):1}function lt(t){var e=t.match(at);if(!e)return NaN;var a=W(e[1]),r=W(e[2]),n=W(e[3]);return pt(a,r,n)?a*we+r*he+n*1e3:NaN}function W(t){return t&&parseFloat(t.replace(",","."))||0}function it(t){if(t==="Z")return 0;var e=t.match(rt);if(!e)return 0;var a=e[1]==="+"?-1:1,r=parseInt(e[2]),n=e[3]&&parseInt(e[3])||0;return gt(r,n)?a*(r*we+n*he):NaN}function ut(t,e,a){var r=new Date(0);r.setUTCFullYear(t,0,4);var n=r.getUTCDay()||7,o=(e-1)*7+a+1-n;return r.setUTCDate(r.getUTCDate()+o),r}var ct=[31,null,31,30,31,30,31,31,30,31,30,31];function be(t){return t%400===0||t%4===0&&t%100!==0}function dt(t,e,a){return e>=0&&e<=11&&a>=1&&a<=(ct[e]||(be(t)?29:28))}function ft(t,e){return e>=1&&e<=(be(t)?366:365)}function vt(t,e,a){return e>=1&&e<=53&&a>=0&&a<=6}function pt(t,e,a){return t===24?e===0&&a===0:a>=0&&a<60&&e>=0&&e<60&&t>=0&&t<25}function gt(t,e){return e>=0&&e<=59}var K={exports:{}};(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=a;function a(r){if(r===null||r===!0||r===!1)return NaN;var n=Number(r);return isNaN(n)?n:n<0?Math.ceil(n):Math.floor(n)}t.exports=e.default})(K,K.exports);var mt=K.exports;const _t=De(mt);var X={exports:{}};(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=a;function a(r){var n=new Date(Date.UTC(r.getFullYear(),r.getMonth(),r.getDate(),r.getHours(),r.getMinutes(),r.getSeconds(),r.getMilliseconds()));return n.setUTCFullYear(r.getFullYear()),r.getTime()-n.getTime()}t.exports=e.default})(X,X.exports);var Dt=X.exports;const ue=De(Dt);function ht(t,e){var a=xt(e);return a.formatToParts?bt(a,t):yt(a,t)}var wt={year:0,month:1,day:2,hour:3,minute:4,second:5};function bt(t,e){try{for(var a=t.formatToParts(e),r=[],n=0;n<a.length;n++){var o=wt[a[n].type];o>=0&&(r[o]=parseInt(a[n].value,10))}return r}catch(c){if(c instanceof RangeError)return[NaN];throw c}}function yt(t,e){var a=t.format(e).replace(/\u200E/g,""),r=/(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(a);return[r[3],r[1],r[2],r[4],r[5],r[6]]}var B={};function xt(t){if(!B[t]){var e=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:"America/New_York",year:"numeric",month:"numeric",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(new Date("2014-06-25T04:00:00.123Z")),a=e==="06/25/2014, 00:00:00"||e==="‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00";B[t]=a?new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"numeric",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}):new Intl.DateTimeFormat("en-US",{hourCycle:"h23",timeZone:t,year:"numeric",month:"numeric",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})}return B[t]}function ye(t,e,a,r,n,o,c){var v=new Date(0);return v.setUTCFullYear(t,e,a),v.setUTCHours(r,n,o,c),v}var ce=36e5,Tt=6e4,Q={timezone:/([Z+-].*)$/,timezoneZ:/^(Z)$/,timezoneHH:/^([+-]\d{2})$/,timezoneHHMM:/^([+-]\d{2}):?(\d{2})$/};function xe(t,e,a){var r,n;if(!t||(r=Q.timezoneZ.exec(t),r))return 0;var o;if(r=Q.timezoneHH.exec(t),r)return o=parseInt(r[1],10),de(o)?-(o*ce):NaN;if(r=Q.timezoneHHMM.exec(t),r){o=parseInt(r[1],10);var c=parseInt(r[2],10);return de(o,c)?(n=Math.abs(o)*ce+c*Tt,o>0?-n:n):NaN}if(It(t)){e=new Date(e||Date.now());var v=a?e:Nt(e),g=ee(v,t),D=a?g:Ct(e,g,t);return-D}return NaN}function Nt(t){return ye(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds())}function ee(t,e){var a=ht(t,e),r=ye(a[0],a[1]-1,a[2],a[3]%24,a[4],a[5],0).getTime(),n=t.getTime(),o=n%1e3;return n-=o>=0?o:1e3+o,r-n}function Ct(t,e,a){var r=t.getTime(),n=r-e,o=ee(new Date(n),a);if(e===o)return e;n-=o-e;var c=ee(new Date(n),a);return o===c?o:Math.max(o,c)}function de(t,e){return-23<=t&&t<=23&&(e==null||0<=e&&e<=59)}var fe={};function It(t){if(fe[t])return!0;try{return new Intl.DateTimeFormat(void 0,{timeZone:t}),fe[t]=!0,!0}catch{return!1}}var Mt=/(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/,J=36e5,ve=6e4,Yt=2,y={dateTimePattern:/^([0-9W+-]+)(T| )(.*)/,datePattern:/^([0-9W+-]+)(.*)/,plainTime:/:/,YY:/^(\d{2})$/,YYY:[/^([+-]\d{2})$/,/^([+-]\d{3})$/,/^([+-]\d{4})$/],YYYY:/^(\d{4})/,YYYYY:[/^([+-]\d{4})/,/^([+-]\d{5})/,/^([+-]\d{6})/],MM:/^-(\d{2})$/,DDD:/^-?(\d{3})$/,MMDD:/^-?(\d{2})-?(\d{2})$/,Www:/^-?W(\d{2})$/,WwwD:/^-?W(\d{2})-?(\d{1})$/,HH:/^(\d{2}([.,]\d*)?)$/,HHMM:/^(\d{2}):?(\d{2}([.,]\d*)?)$/,HHMMSS:/^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,timeZone:Mt};function Ut(t,e){if(arguments.length<1)throw new TypeError("1 argument required, but only "+arguments.length+" present");if(t===null)return new Date(NaN);var a=e||{},r=a.additionalDigits==null?Yt:_t(a.additionalDigits);if(r!==2&&r!==1&&r!==0)throw new RangeError("additionalDigits must be 0, 1 or 2");if(t instanceof Date||typeof t=="object"&&Object.prototype.toString.call(t)==="[object Date]")return new Date(t.getTime());if(typeof t=="number"||Object.prototype.toString.call(t)==="[object Number]")return new Date(t);if(!(typeof t=="string"||Object.prototype.toString.call(t)==="[object String]"))return new Date(NaN);var n=$t(t),o=kt(n.date,r),c=o.year,v=o.restDateString,g=zt(v,c);if(isNaN(g))return new Date(NaN);if(g){var D=g.getTime(),m=0,T;if(n.time&&(m=Ht(n.time),isNaN(m)))return new Date(NaN);if(n.timeZone||a.timeZone){if(T=xe(n.timeZone||a.timeZone,new Date(D+m)),isNaN(T))return new Date(NaN)}else T=ue(new Date(D+m)),T=ue(new Date(D+m+T));return new Date(D+m+T)}else return new Date(NaN)}function $t(t){var e={},a=y.dateTimePattern.exec(t),r;if(a?(e.date=a[1],r=a[3]):(a=y.datePattern.exec(t),a?(e.date=a[1],r=a[2]):(e.date=null,r=t)),r){var n=y.timeZone.exec(r);n?(e.time=r.replace(n[1],""),e.timeZone=n[1].trim()):e.time=r}return e}function kt(t,e){var a=y.YYY[e],r=y.YYYYY[e],n;if(n=y.YYYY.exec(t)||r.exec(t),n){var o=n[1];return{year:parseInt(o,10),restDateString:t.slice(o.length)}}if(n=y.YY.exec(t)||a.exec(t),n){var c=n[1];return{year:parseInt(c,10)*100,restDateString:t.slice(c.length)}}return{year:null}}function zt(t,e){if(e===null)return null;var a,r,n,o;if(t.length===0)return r=new Date(0),r.setUTCFullYear(e),r;if(a=y.MM.exec(t),a)return r=new Date(0),n=parseInt(a[1],10)-1,ge(e,n)?(r.setUTCFullYear(e,n),r):new Date(NaN);if(a=y.DDD.exec(t),a){r=new Date(0);var c=parseInt(a[1],10);return Ft(e,c)?(r.setUTCFullYear(e,0,c),r):new Date(NaN)}if(a=y.MMDD.exec(t),a){r=new Date(0),n=parseInt(a[1],10)-1;var v=parseInt(a[2],10);return ge(e,n,v)?(r.setUTCFullYear(e,n,v),r):new Date(NaN)}if(a=y.Www.exec(t),a)return o=parseInt(a[1],10)-1,me(e,o)?pe(e,o):new Date(NaN);if(a=y.WwwD.exec(t),a){o=parseInt(a[1],10)-1;var g=parseInt(a[2],10)-1;return me(e,o,g)?pe(e,o,g):new Date(NaN)}return null}function Ht(t){var e,a,r;if(e=y.HH.exec(t),e)return a=parseFloat(e[1].replace(",",".")),G(a)?a%24*J:NaN;if(e=y.HHMM.exec(t),e)return a=parseInt(e[1],10),r=parseFloat(e[2].replace(",",".")),G(a,r)?a%24*J+r*ve:NaN;if(e=y.HHMMSS.exec(t),e){a=parseInt(e[1],10),r=parseInt(e[2],10);var n=parseFloat(e[3].replace(",","."));return G(a,r,n)?a%24*J+r*ve+n*1e3:NaN}return null}function pe(t,e,a){e=e||0,a=a||0;var r=new Date(0);r.setUTCFullYear(t,0,4);var n=r.getUTCDay()||7,o=e*7+a+1-n;return r.setUTCDate(r.getUTCDate()+o),r}var Ot=[31,28,31,30,31,30,31,31,30,31,30,31],St=[31,29,31,30,31,30,31,31,30,31,30,31];function Te(t){return t%400===0||t%4===0&&t%100!==0}function ge(t,e,a){if(e<0||e>11)return!1;if(a!=null){if(a<1)return!1;var r=Te(t);if(r&&a>St[e]||!r&&a>Ot[e])return!1}return!0}function Ft(t,e){if(e<1)return!1;var a=Te(t);return!(a&&e>366||!a&&e>365)}function me(t,e,a){return!(e<0||e>52||a!=null&&(a<0||a>6))}function G(t,e,a){return!(t!=null&&(t<0||t>=25)||e!=null&&(e<0||e>=60)||a!=null&&(a<0||a>=60))}function C(t,e,a){var r=Ut(t,a),n=xe(e,r,!0),o=new Date(r.getTime()-n),c=new Date(0);return c.setFullYear(o.getUTCFullYear(),o.getUTCMonth(),o.getUTCDate()),c.setHours(o.getUTCHours(),o.getUTCMinutes(),o.getUTCSeconds(),o.getUTCMilliseconds()),c}const At={class:"fixed inset-0 flex items-center justify-center z-50","aria-hidden":"true"},Rt=l("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[l("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})],-1),Lt=[Rt],Et=Ee('<header class="modal__header flex justify-between items-center px-4 py-2 bg-gray-100 rounded-t-lg mt-4"><h2 class="modal__title text-lg font-semibold text-gray-800"><span class="font-bold text-blue-700">記録画面ヘルプ</span><br></h2></header><main class="modal__content p-4 text-gray-700"><p class="mb-4"><span class="font-bold text-blue-700">レーダーチャート</span><br> レーダーチャートは、各クイズカテゴリーの正答率を比較するための視覚的なグラフです。チャートの中心から外側に 向かって正答率が高くなり、各項目がカテゴリーを表します。グラフ上でカーソルを合わせると正確な数値を表示します。 </p><p class="mb-4"><span class="font-bold text-blue-700">折れ線グラフ</span><br> 折れ線グラフは、クイズの正答率の推移を時間に基づいて示しています。クイズ結果のデータはカテゴリーごとに 表示することが可能です。グラフ上でカーソルを合わせると正確な数値を表示します。 </p><p class="mb-4"><span class="font-bold text-blue-700">クイズの結果一覧</span><br> 過去のクイズ結果が一覧表示されます。各結果には、クイズの日付、カテゴリー、出題数、正答率などが表示されます。 「回答詳細」をクリックすると、それぞれのクイズの結果についての詳細情報が表示されます。 </p></main>',2),jt={__name:"RecordModal",setup(t){const e=h(!1),a=()=>{e.value=!e.value},r=n=>{n.target.classList.contains("modal__overlay")&&a()};return(n,o)=>(b(),x(Y,null,[A(l("div",At,[l("div",{class:"modal fixed inset-0 flex items-center justify-center z-50"},[l("div",{onClick:r,class:"modal__overlay fixed inset-0 bg-opacity-50 bg-black"}),l("div",{class:"modal__container bg-white rounded-lg shadow-lg max-w-md mx-auto p-4 z-50 relative",role:"dialog","aria-modal":"true","aria-labelledby":"modal-1-title"},[l("button",{onClick:a,type:"button",class:"modal__close absolute top-4 right-4 focus:outline-none text-gray-500 hover:text-gray-700"},Lt),Et,l("footer",{class:"modal__footer px-4 py-2"},[l("button",{onClick:a,type:"button",class:"modal__btn modal__btn-primary bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none mr-2"}," 閉じる ")])])])],512),[[Le,e.value]]),l("button",{onClick:a,type:"button",class:"bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"},"ヘルプ")],64))}},N=t=>(Pe("data-v-7559d7aa"),t=t(),We(),t),Zt=N(()=>l("h2",{class:"font-semibold text-2xl text-gray-800 leading-tight"},"クイズの結果情報",-1)),Vt={class:"absolute top-40 right-4 z-50"},qt={class:"bg-gray-100 py-8 px-4 mt-8"},Pt={class:"max-w-3xl mx-auto"},Wt={key:0},Bt=N(()=>l("p",{class:"text-xl font-semibold text-gray-800"},"あなたはまだクイズを実施していません。",-1)),Qt=[Bt],Jt={key:1},Gt={class:"flex space-x-4 mb-4"},Kt={for:"fromDate",class:"flex items-center"},Xt=N(()=>l("span",{class:"mr-1"},"From:",-1)),ea={for:"toDate",class:"flex items-center"},ta=N(()=>l("span",{class:"mr-1"},"To:",-1)),aa={key:0,class:"text-red-500"},ra=N(()=>l("option",{value:"all"},"全て",-1)),na=["value"],oa={class:"flex justify-between items-center"},sa={class:"text-lg font-semibold"},la={class:"text-gray-600"},ia={class:"text-gray-600"},ua={class:"text-gray-600"},ca=["onClick"],da={key:0,class:"mt-4 p-4 bg-gray-100 rounded-md"},fa={class:"border-b border-gray-300 pb-2 mb-2"},va=N(()=>l("h3",{class:"text-xl font-semibold mb-1"},"回答詳細",-1)),pa={class:"text-gray-600"},ga={class:"text-gray-600"},ma={class:"text-gray-600"},_a={class:"space-y-4"},Da={class:"border border-gray-300 rounded-md p-4"},ha={class:"text-lg font-semibold mb-2"},wa=N(()=>l("strong",null,"選択した回答:",-1)),ba=N(()=>l("strong",null,"結果:",-1)),ya=N(()=>l("strong",null,"正解:",-1)),xa=N(()=>l("strong",null,"誤答1:",-1)),Ta=N(()=>l("strong",null,"誤答2:",-1)),Na=N(()=>l("strong",null,"誤答3:",-1)),Ca=N(()=>l("strong",null,"解説:",-1)),Ia={class:"mt-4 flex justify-center space-x-1"},Ma=["disabled"],Ya=["onClick"],Ua=["disabled"],_e=10,$a={__name:"Record",setup(t){const e=h(1);let a=Z(()=>Math.ceil(r.value.length/10));const r=h([]),n=h(null),o=h(null),c=h(null),v=h([]),g=h(!0),D=h(null),m=h(null),T=h([]),M=h("all"),R=i=>{i>=1&&i<=a.value&&(e.value=i)},Ne=Z(()=>{const i=(e.value-1)*_e,u=i+_e;return r.value.slice(i,u)});function Ce(i,u){const s=[];if(i<=1)return s;s.push(1),u>3&&s.push("...");for(let d=u-2;d<=u+2;d++)d>1&&d<i&&s.push(d);return u<i-2&&s.push("..."),s.push(i),s}async function Ie(){try{const i=await $.get("/api/quiz-results");r.value=i.data.sort((u,s)=>new Date(s.created_at)-new Date(u.created_at)),r.value.forEach(u=>{u.created_at=C(new Date(u.created_at),"Asia/Tokyo")})}catch(i){console.error("クイズの結果情報の取得に失敗しました",i)}}function Me(i){n.value===i?n.value=null:n.value=i}const Ye={dateValidation:"Fromの日付はTo以前の日付を選択してください"};let z=h(""),Ue=[];async function $e(){try{let s=(await $.get("/api/quiz-results")).data.sort((p,O)=>new Date(O.created_at)-new Date(p.created_at));if(o.value&&c.value&&new Date(o.value)>new Date(c.value)){z.value=Ye.dateValidation;return}else z.value="";const d=o.value?C(P(o.value),"Asia/Tokyo"):null,w=c.value?C(P(c.value),"Asia/Tokyo"):null;w&&w.setHours(w.getHours()+24),console.log("fromDateTime",d),console.log("toDateTime",w),s=s.filter(p=>{const O=C(P(p.created_at),"Asia/Tokyo");return(!d||O>=d)&&(!w||O<=w)}),s.forEach(p=>{p.created_at=C(new Date(p.created_at),"Asia/Tokyo")}),Ue=s,await ae();const f=te(s);console.log("filteredQuizRecords",f),r.value=f,Se(),E(H(f)),console.log("quizRecords.value",r.value)}catch(i){console.error("クイズの結果情報の取得に失敗しました",i)}}function te(i){if(!o.value&&!c.value)return i;const u=o.value?C(new Date(o.value),"UTC"):null,s=c.value?C(new Date(c.value),"UTC"):null;return s&&s.setHours(s.getHours()+24),console.log("fromDateValue3",u),console.log("toDateValue3",s),i.filter(d=>{const w=C(new Date(d.created_at),"Asia/Tokyo");return(!u||w>=u)&&(!s||w<=s)})}const L=h({});async function ke(){try{(await $.get("/api/categories")).data.forEach(s=>{L.value[s.id]=s.name})}catch(i){console.error("カテゴリー情報の取得に失敗しました",i)}}async function ae(){try{let u=(await $.get("/api/quiz-results")).data;if(o.value){const f=C(new Date(o.value),"UTC");u=u.filter(p=>new Date(p.created_at)>=f),console.log("fromDateTime2",f)}if(c.value){const f=C(new Date(c.value),"UTC");f.setDate(f.getDate()+1),u=u.filter(p=>new Date(p.created_at)<f),console.log("toDateTime2",f)}const s={},d={};u.forEach(f=>{const p=f.category_id;s[p]||(s[p]=0),d[p]||(d[p]=0),s[p]+=f.correct_answers,d[p]+=f.total_questions}),v.value=Object.keys(s).map(f=>({name:re(f),accuracy:He(s[f],d[f])})),ze(u.map(f=>f.category_id)).forEach(f=>{v.value.push({name:re(f),accuracy:0})}),console.log("filteredResults: ",u)}catch(i){console.error("カテゴリー別の正答率データの取得に失敗しました",i)}}function ze(i){return Object.keys(L.value).map(Number).filter(s=>!i.includes(s))}function re(i){return L.value[i]||"Unknown Category"}function He(i,u){return u===0?0:(i/u*100).toFixed(2)}oe(()=>{Ie(),ke(),ae()}),Z(()=>te(r.value));function ne(){return Math.random().toString(36).substring(7)}const Oe=h(ne());function Se(){Oe.value=ne()}const Fe=h([]);function Ae(){Fe.value=H(v.value)}async function Re(){try{const i=await $.get("/api/categories");T.value=i.data}catch(i){console.error("カテゴリー情報の取得に失敗しました",i)}}h([]),se([v,o,c],Ae),je(()=>{M.value="all"});function H(i){if(!o.value&&!c.value)return i;const u=o.value?C(new Date(o.value),"UTC").getTime():0,s=c.value?C(new Date(c.value),"UTC").getTime()+24*60*60*1e3:Date.now();return console.log("fromDateValue4:",new Date(u).toLocaleString("ja-JP")),console.log("toDateValue4:",new Date(s).toLocaleString("ja-JP")),i.filter(d=>{const w=new Date(d.created_at).getTime();return w>=u&&w<=s})}function E(i){if(!D.value||(m.value&&(m.value.destroy(),m.value=null),Object.keys(i).length===0))return;const u=j(),s=[],d=[];for(const f in u){const p=u[f];s.push(p.accuracy),d.push(new Date(p.created_at).toLocaleDateString())}const w=D.value.getContext("2d");m.value=new Ge(w,{type:"line",data:{labels:d,datasets:[{label:"正答率",data:s,borderColor:"rgb(75, 192, 192)",tension:.1}]},options:{scales:{x:{title:{display:!0,text:"日付"},reverse:!0},y:{title:{display:!0,text:"正答率 (%)"}}}}})}function j(){return M.value==="all"?r.value:r.value.filter(i=>i.category_id===M.value)}return oe(async()=>{await Re(),E(H(j()))}),se(M,()=>{E(H(j()))}),(i,u)=>(b(),x(Y,null,[V(U(Qe),{title:"クイズの結果情報"}),V(Be,null,{header:le(()=>[Zt]),default:le(()=>[l("div",Vt,[V(jt)]),l("div",qt,[l("div",Pt,[r.value.length===0&&!g.value?(b(),x("div",Wt,Qt)):(b(),x("div",Jt,[l("div",Gt,[l("label",Kt,[Xt,A(l("input",{type:"date",id:"fromDate","onUpdate:modelValue":u[0]||(u[0]=s=>o.value=s),class:"px-2 py-1 border rounded-md"},null,512),[[ie,o.value]])]),l("label",ea,[ta,A(l("input",{type:"date",id:"toDate","onUpdate:modelValue":u[1]||(u[1]=s=>c.value=s),class:"px-2 py-1 border rounded-md"},null,512),[[ie,c.value]])]),l("button",{onClick:$e,class:"bg-blue-500 text-white px-3 py-1 rounded-md"}," 検索 ")]),U(z)?(b(),x("p",aa,_(U(z)),1)):q("",!0),v.value.length>0?(b(),Ze(Je,{key:1,categoryData:v.value},null,8,["categoryData"])):q("",!0),l("div",null,[A(l("select",{"onUpdate:modelValue":u[2]||(u[2]=s=>M.value=s)},[ra,(b(!0),x(Y,null,S(T.value,s=>(b(),x("option",{key:s.id,value:s.id},_(s.name),9,na))),128))],512),[[Ve,M.value]]),l("canvas",{ref_key:"lineChartCanvas",ref:D},null,512)]),l("ul",null,[(b(!0),x(Y,null,S(Ne.value,s=>(b(),x("li",{key:s.id,class:"bg-white shadow-md p-4 mb-4 rounded-md"},[l("div",oa,[l("div",null,[l("h2",sa,_(new Date(s.created_at).toLocaleString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})),1),l("p",la,"カテゴリー: "+_(s.category.name),1),l("p",ia,"出題数: "+_(s.total_questions),1),l("p",ua,"正答率: "+_(s.accuracy)+"%",1)]),l("button",{class:"bg-blue-500 text-white px-3 py-1 rounded-md",onClick:d=>Me(s.id)},_(n.value===s.id?"閉じる":"回答詳細"),9,ca)]),n.value===s.id?(b(),x("div",da,[l("div",fa,[va,l("p",pa,"問題数: "+_(s.total_questions),1),l("p",ga,"正解数: "+_(s.correct_answers),1),l("p",ma,"正答率: "+_(s.accuracy)+"%",1)]),l("ul",_a,[(b(!0),x(Y,null,S(s.results,d=>(b(),x("li",{key:d.id},[l("div",Da,[l("h4",ha,_(d.quiz.title),1),l("p",null,[wa,I(" "+_(d.selected_choice),1)]),l("p",null,[ba,I(" "+_(d.correct?"正解":"不正解"),1)]),l("p",null,[ya,I(" "+_(d.quiz.correct_answer),1)]),l("p",null,[xa,I(" "+_(d.quiz.wrong_answer_1),1)]),l("p",null,[Ta,I(" "+_(d.quiz.wrong_answer_2),1)]),l("p",null,[Na,I(" "+_(d.quiz.wrong_answer_3),1)]),l("p",null,[Ca,I(" "+_(d.quiz.explain),1)])])]))),128))])])):q("",!0)]))),128))]),l("div",Ia,[l("button",{onClick:u[3]||(u[3]=s=>R(e.value-1)),disabled:e.value===1,class:"px-3 py-1 rounded-md bg-white text-blue-500 border border-blue-500"}," 前へ ",8,Ma),(b(!0),x(Y,null,S(Ce(U(a),e.value),s=>(b(),x("button",{key:s,onClick:d=>R(s),class:qe(["px-3 py-1 rounded-md",e.value===s?"bg-blue-500 text-white":"bg-white text-blue-500 border border-blue-500"])},_(s),11,Ya))),128)),l("button",{onClick:u[4]||(u[4]=s=>R(e.value+1)),disabled:e.value===U(a),class:"px-3 py-1 rounded-md bg-white text-blue-500 border border-blue-500"}," 次へ ",8,Ua)])]))])])]),_:1})],64))}},Ea=Ke($a,[["__scopeId","data-v-7559d7aa"]]);export{Ea as default};
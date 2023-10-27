import{J as z,p as A,K as $,L as K,k as x,M as J,N as E,O as W,A as G,h as V,P as Q,Q as U,R as Y}from"./app-865d1ee5.js";var Z={exports:{}};/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */(function(e,r){(function(t,i){e.exports=i()})(z,function(){var t={};t.version="0.2.0";var i=t.settings={minimum:.08,easing:"ease",positionUsing:"",speed:200,trickle:!0,trickleRate:.02,trickleSpeed:800,showSpinner:!0,barSelector:'[role="bar"]',spinnerSelector:'[role="spinner"]',parent:"body",template:'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'};t.configure=function(s){var n,l;for(n in s)l=s[n],l!==void 0&&s.hasOwnProperty(n)&&(i[n]=l);return this},t.status=null,t.set=function(s){var n=t.isStarted();s=d(s,i.minimum,1),t.status=s===1?null:s;var l=t.render(!n),m=l.querySelector(i.barSelector),w=i.speed,b=i.easing;return l.offsetWidth,k(function(f){i.positionUsing===""&&(i.positionUsing=t.getPositioningCSS()),v(m,y(s,w,b)),s===1?(v(l,{transition:"none",opacity:1}),l.offsetWidth,setTimeout(function(){v(l,{transition:"all "+w+"ms linear",opacity:0}),setTimeout(function(){t.remove(),f()},w)},w)):setTimeout(f,w)}),this},t.isStarted=function(){return typeof t.status=="number"},t.start=function(){t.status||t.set(0);var s=function(){setTimeout(function(){t.status&&(t.trickle(),s())},i.trickleSpeed)};return i.trickle&&s(),this},t.done=function(s){return!s&&!t.status?this:t.inc(.3+.5*Math.random()).set(1)},t.inc=function(s){var n=t.status;return n?(typeof s!="number"&&(s=(1-n)*d(Math.random()*n,.1,.95)),n=d(n+s,0,.994),t.set(n)):t.start()},t.trickle=function(){return t.inc(Math.random()*i.trickleRate)},function(){var s=0,n=0;t.promise=function(l){return!l||l.state()==="resolved"?this:(n===0&&t.start(),s++,n++,l.always(function(){n--,n===0?(s=0,t.done()):t.set((s-n)/s)}),this)}}(),t.render=function(s){if(t.isRendered())return document.getElementById("nprogress");o(document.documentElement,"nprogress-busy");var n=document.createElement("div");n.id="nprogress",n.innerHTML=i.template;var l=n.querySelector(i.barSelector),m=s?"-100":u(t.status||0),w=document.querySelector(i.parent),b;return v(l,{transition:"all 0 linear",transform:"translate3d("+m+"%,0,0)"}),i.showSpinner||(b=n.querySelector(i.spinnerSelector),b&&S(b)),w!=document.body&&o(w,"nprogress-custom-parent"),w.appendChild(n),n},t.remove=function(){c(document.documentElement,"nprogress-busy"),c(document.querySelector(i.parent),"nprogress-custom-parent");var s=document.getElementById("nprogress");s&&S(s)},t.isRendered=function(){return!!document.getElementById("nprogress")},t.getPositioningCSS=function(){var s=document.body.style,n="WebkitTransform"in s?"Webkit":"MozTransform"in s?"Moz":"msTransform"in s?"ms":"OTransform"in s?"O":"";return n+"Perspective"in s?"translate3d":n+"Transform"in s?"translate":"margin"};function d(s,n,l){return s<n?n:s>l?l:s}function u(s){return(-1+s)*100}function y(s,n,l){var m;return i.positionUsing==="translate3d"?m={transform:"translate3d("+u(s)+"%,0,0)"}:i.positionUsing==="translate"?m={transform:"translate("+u(s)+"%,0)"}:m={"margin-left":u(s)+"%"},m.transition="all "+n+"ms "+l,m}var k=function(){var s=[];function n(){var l=s.shift();l&&l(n)}return function(l){s.push(l),s.length==1&&n()}}(),v=function(){var s=["Webkit","O","Moz","ms"],n={};function l(f){return f.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,function(T,a){return a.toUpperCase()})}function m(f){var T=document.body.style;if(f in T)return f;for(var a=s.length,p=f.charAt(0).toUpperCase()+f.slice(1),P;a--;)if(P=s[a]+p,P in T)return P;return f}function w(f){return f=l(f),n[f]||(n[f]=m(f))}function b(f,T,a){T=w(T),f.style[T]=a}return function(f,T){var a=arguments,p,P;if(a.length==2)for(p in T)P=T[p],P!==void 0&&T.hasOwnProperty(p)&&b(f,p,P);else b(f,a[1],a[2])}}();function g(s,n){var l=typeof s=="string"?s:h(s);return l.indexOf(" "+n+" ")>=0}function o(s,n){var l=h(s),m=l+n;g(l,n)||(s.className=m.substring(1))}function c(s,n){var l=h(s),m;g(s,n)&&(m=l.replace(" "+n+" "," "),s.className=m.substring(1,m.length-1))}function h(s){return(" "+(s.className||"")+" ").replace(/\s+/gi," ")}function S(s){s&&s.parentNode&&s.parentNode.removeChild(s)}return t})})(Z);function ee(e,r){let t;return function(...i){clearTimeout(t),t=setTimeout(()=>e.apply(this,i),r)}}function C(e,r){return document.dispatchEvent(new CustomEvent(`inertia:${e}`,r))}var te=e=>C("before",{cancelable:!0,detail:{visit:e}}),re=e=>C("error",{detail:{errors:e}}),se=e=>C("exception",{cancelable:!0,detail:{exception:e}}),q=e=>C("finish",{detail:{visit:e}}),ne=e=>C("invalid",{cancelable:!0,detail:{response:e}}),I=e=>C("navigate",{detail:{page:e}}),ie=e=>C("progress",{detail:{progress:e}}),oe=e=>C("start",{detail:{visit:e}}),ae=e=>C("success",{detail:{page:e}});function j(e){return e instanceof File||e instanceof Blob||e instanceof FileList&&e.length>0||e instanceof FormData&&Array.from(e.values()).some(r=>j(r))||typeof e=="object"&&e!==null&&Object.values(e).some(r=>j(r))}function D(e,r=new FormData,t=null){e=e||{};for(let i in e)Object.prototype.hasOwnProperty.call(e,i)&&X(r,_(t,i),e[i]);return r}function _(e,r){return e?e+"["+r+"]":r}function X(e,r,t){if(Array.isArray(t))return Array.from(t.keys()).forEach(i=>X(e,_(r,i.toString()),t[i]));if(t instanceof Date)return e.append(r,t.toISOString());if(t instanceof File)return e.append(r,t,t.name);if(t instanceof Blob)return e.append(r,t);if(typeof t=="boolean")return e.append(r,t?"1":"0");if(typeof t=="string")return e.append(r,t);if(typeof t=="number")return e.append(r,`${t}`);if(t==null)return e.append(r,"");D(t,e,r)}var le={modal:null,listener:null,show(e){typeof e=="object"&&(e=`All Inertia requests must receive a valid Inertia response, however a plain JSON response was received.<hr>${JSON.stringify(e)}`);let r=document.createElement("html");r.innerHTML=e,r.querySelectorAll("a").forEach(i=>i.setAttribute("target","_top")),this.modal=document.createElement("div"),this.modal.style.position="fixed",this.modal.style.width="100vw",this.modal.style.height="100vh",this.modal.style.padding="50px",this.modal.style.boxSizing="border-box",this.modal.style.backgroundColor="rgba(0, 0, 0, .6)",this.modal.style.zIndex=2e5,this.modal.addEventListener("click",()=>this.hide());let t=document.createElement("iframe");if(t.style.backgroundColor="white",t.style.borderRadius="5px",t.style.width="100%",t.style.height="100%",this.modal.appendChild(t),document.body.prepend(this.modal),document.body.style.overflow="hidden",!t.contentWindow)throw new Error("iframe not yet ready.");t.contentWindow.document.open(),t.contentWindow.document.write(r.outerHTML),t.contentWindow.document.close(),this.listener=this.hideOnEscape.bind(this),document.addEventListener("keydown",this.listener)},hide(){this.modal.outerHTML="",this.modal=null,document.body.style.overflow="visible",document.removeEventListener("keydown",this.listener)},hideOnEscape(e){e.keyCode===27&&this.hide()}};function L(e){return new URL(e.toString(),window.location.toString())}function H(e,r,t,i="brackets"){let d=/^https?:\/\//.test(r.toString()),u=d||r.toString().startsWith("/"),y=!u&&!r.toString().startsWith("#")&&!r.toString().startsWith("?"),k=r.toString().includes("?")||e==="get"&&Object.keys(t).length,v=r.toString().includes("#"),g=new URL(r.toString(),"http://localhost");return e==="get"&&Object.keys(t).length&&(g.search=$.stringify(K($.parse(g.search,{ignoreQueryPrefix:!0}),t),{encodeValuesOnly:!0,arrayFormat:i}),t={}),[[d?`${g.protocol}//${g.host}`:"",u?g.pathname:"",y?g.pathname.substring(1):"",k?g.search:"",v?g.hash:""].join(""),t]}function N(e){return e=new URL(e.href),e.hash="",e}var M=typeof window>"u",ce=class{constructor(){this.visitId=null}init({initialPage:e,resolveComponent:r,swapComponent:t}){this.page=e,this.resolveComponent=r,this.swapComponent=t,this.setNavigationType(),this.clearRememberedStateOnReload(),this.isBackForwardVisit()?this.handleBackForwardVisit(this.page):this.isLocationVisit()?this.handleLocationVisit(this.page):this.handleInitialPageVisit(this.page),this.setupEventListeners()}setNavigationType(){this.navigationType=window.performance&&window.performance.getEntriesByType("navigation").length>0?window.performance.getEntriesByType("navigation")[0].type:"navigate"}clearRememberedStateOnReload(){var e;this.navigationType==="reload"&&((e=window.history.state)!=null&&e.rememberedState)&&delete window.history.state.rememberedState}handleInitialPageVisit(e){this.page.url+=window.location.hash,this.setPage(e,{preserveState:!0}).then(()=>I(e))}setupEventListeners(){window.addEventListener("popstate",this.handlePopstateEvent.bind(this)),document.addEventListener("scroll",ee(this.handleScrollEvent.bind(this),100),!0)}scrollRegions(){return document.querySelectorAll("[scroll-region]")}handleScrollEvent(e){typeof e.target.hasAttribute=="function"&&e.target.hasAttribute("scroll-region")&&this.saveScrollPositions()}saveScrollPositions(){this.replaceState({...this.page,scrollRegions:Array.from(this.scrollRegions()).map(e=>({top:e.scrollTop,left:e.scrollLeft}))})}resetScrollPositions(){window.scrollTo(0,0),this.scrollRegions().forEach(e=>{typeof e.scrollTo=="function"?e.scrollTo(0,0):(e.scrollTop=0,e.scrollLeft=0)}),this.saveScrollPositions(),window.location.hash&&setTimeout(()=>{var e;return(e=document.getElementById(window.location.hash.slice(1)))==null?void 0:e.scrollIntoView()})}restoreScrollPositions(){this.page.scrollRegions&&this.scrollRegions().forEach((e,r)=>{let t=this.page.scrollRegions[r];if(t)typeof e.scrollTo=="function"?e.scrollTo(t.left,t.top):(e.scrollTop=t.top,e.scrollLeft=t.left);else return})}isBackForwardVisit(){return window.history.state&&this.navigationType==="back_forward"}handleBackForwardVisit(e){window.history.state.version=e.version,this.setPage(window.history.state,{preserveScroll:!0,preserveState:!0}).then(()=>{this.restoreScrollPositions(),I(e)})}locationVisit(e,r){try{let t={preserveScroll:r};window.sessionStorage.setItem("inertiaLocationVisit",JSON.stringify(t)),window.location.href=e.href,N(window.location).href===N(e).href&&window.location.reload()}catch{return!1}}isLocationVisit(){try{return window.sessionStorage.getItem("inertiaLocationVisit")!==null}catch{return!1}}handleLocationVisit(e){var t,i;let r=JSON.parse(window.sessionStorage.getItem("inertiaLocationVisit")||"");window.sessionStorage.removeItem("inertiaLocationVisit"),e.url+=window.location.hash,e.rememberedState=((t=window.history.state)==null?void 0:t.rememberedState)??{},e.scrollRegions=((i=window.history.state)==null?void 0:i.scrollRegions)??[],this.setPage(e,{preserveScroll:r.preserveScroll,preserveState:!0}).then(()=>{r.preserveScroll&&this.restoreScrollPositions(),I(e)})}isLocationVisitResponse(e){return!!(e&&e.status===409&&e.headers["x-inertia-location"])}isInertiaResponse(e){return!!(e!=null&&e.headers["x-inertia"])}createVisitId(){return this.visitId={},this.visitId}cancelVisit(e,{cancelled:r=!1,interrupted:t=!1}){e&&!e.completed&&!e.cancelled&&!e.interrupted&&(e.cancelToken.abort(),e.onCancel(),e.completed=!1,e.cancelled=r,e.interrupted=t,q(e),e.onFinish(e))}finishVisit(e){!e.cancelled&&!e.interrupted&&(e.completed=!0,e.cancelled=!1,e.interrupted=!1,q(e),e.onFinish(e))}resolvePreserveOption(e,r){return typeof e=="function"?e(r):e==="errors"?Object.keys(r.props.errors||{}).length>0:e}cancel(){this.activeVisit&&this.cancelVisit(this.activeVisit,{cancelled:!0})}visit(e,{method:r="get",data:t={},replace:i=!1,preserveScroll:d=!1,preserveState:u=!1,only:y=[],headers:k={},errorBag:v="",forceFormData:g=!1,onCancelToken:o=()=>{},onBefore:c=()=>{},onStart:h=()=>{},onProgress:S=()=>{},onFinish:s=()=>{},onCancel:n=()=>{},onSuccess:l=()=>{},onError:m=()=>{},queryStringArrayFormat:w="brackets"}={}){let b=typeof e=="string"?L(e):e;if((j(t)||g)&&!(t instanceof FormData)&&(t=D(t)),!(t instanceof FormData)){let[a,p]=H(r,b,t,w);b=L(a),t=p}let f={url:b,method:r,data:t,replace:i,preserveScroll:d,preserveState:u,only:y,headers:k,errorBag:v,forceFormData:g,queryStringArrayFormat:w,cancelled:!1,completed:!1,interrupted:!1};if(c(f)===!1||!te(f))return;this.activeVisit&&this.cancelVisit(this.activeVisit,{interrupted:!0}),this.saveScrollPositions();let T=this.createVisitId();this.activeVisit={...f,onCancelToken:o,onBefore:c,onStart:h,onProgress:S,onFinish:s,onCancel:n,onSuccess:l,onError:m,queryStringArrayFormat:w,cancelToken:new AbortController},o({cancel:()=>{this.activeVisit&&this.cancelVisit(this.activeVisit,{cancelled:!0})}}),oe(f),h(f),A({method:r,url:N(b).href,data:r==="get"?{}:t,params:r==="get"?t:{},signal:this.activeVisit.cancelToken.signal,headers:{...k,Accept:"text/html, application/xhtml+xml","X-Requested-With":"XMLHttpRequest","X-Inertia":!0,...y.length?{"X-Inertia-Partial-Component":this.page.component,"X-Inertia-Partial-Data":y.join(",")}:{},...v&&v.length?{"X-Inertia-Error-Bag":v}:{},...this.page.version?{"X-Inertia-Version":this.page.version}:{}},onUploadProgress:a=>{t instanceof FormData&&(a.percentage=a.progress?Math.round(a.progress*100):0,ie(a),S(a))}}).then(a=>{var B;if(!this.isInertiaResponse(a))return Promise.reject({response:a});let p=a.data;y.length&&p.component===this.page.component&&(p.props={...this.page.props,...p.props}),d=this.resolvePreserveOption(d,p),u=this.resolvePreserveOption(u,p),u&&((B=window.history.state)!=null&&B.rememberedState)&&p.component===this.page.component&&(p.rememberedState=window.history.state.rememberedState);let P=b,F=L(p.url);return P.hash&&!F.hash&&N(P).href===F.href&&(F.hash=P.hash,p.url=F.href),this.setPage(p,{visitId:T,replace:i,preserveScroll:d,preserveState:u})}).then(()=>{let a=this.page.props.errors||{};if(Object.keys(a).length>0){let p=v?a[v]?a[v]:{}:a;return re(p),m(p)}return ae(this.page),l(this.page)}).catch(a=>{if(this.isInertiaResponse(a.response))return this.setPage(a.response.data,{visitId:T});if(this.isLocationVisitResponse(a.response)){let p=L(a.response.headers["x-inertia-location"]),P=b;P.hash&&!p.hash&&N(P).href===p.href&&(p.hash=P.hash),this.locationVisit(p,d===!0)}else if(a.response)ne(a.response)&&le.show(a.response.data);else return Promise.reject(a)}).then(()=>{this.activeVisit&&this.finishVisit(this.activeVisit)}).catch(a=>{if(!A.isCancel(a)){let p=se(a);if(this.activeVisit&&this.finishVisit(this.activeVisit),p)return Promise.reject(a)}})}setPage(e,{visitId:r=this.createVisitId(),replace:t=!1,preserveScroll:i=!1,preserveState:d=!1}={}){return Promise.resolve(this.resolveComponent(e.component)).then(u=>{r===this.visitId&&(e.scrollRegions=e.scrollRegions||[],e.rememberedState=e.rememberedState||{},t=t||L(e.url).href===window.location.href,t?this.replaceState(e):this.pushState(e),this.swapComponent({component:u,page:e,preserveState:d}).then(()=>{i||this.resetScrollPositions(),t||I(e)}))})}pushState(e){this.page=e,window.history.pushState(e,"",e.url)}replaceState(e){this.page=e,window.history.replaceState(e,"",e.url)}handlePopstateEvent(e){if(e.state!==null){let r=e.state,t=this.createVisitId();Promise.resolve(this.resolveComponent(r.component)).then(i=>{t===this.visitId&&(this.page=r,this.swapComponent({component:i,page:r,preserveState:!1}).then(()=>{this.restoreScrollPositions(),I(r)}))})}else{let r=L(this.page.url);r.hash=window.location.hash,this.replaceState({...this.page,url:r.href}),this.resetScrollPositions()}}get(e,r={},t={}){return this.visit(e,{...t,method:"get",data:r})}reload(e={}){return this.visit(window.location.href,{...e,preserveScroll:!0,preserveState:!0})}replace(e,r={}){return console.warn(`Inertia.replace() has been deprecated and will be removed in a future release. Please use Inertia.${r.method??"get"}() instead.`),this.visit(e,{preserveState:!0,...r,replace:!0})}post(e,r={},t={}){return this.visit(e,{preserveState:!0,...t,method:"post",data:r})}put(e,r={},t={}){return this.visit(e,{preserveState:!0,...t,method:"put",data:r})}patch(e,r={},t={}){return this.visit(e,{preserveState:!0,...t,method:"patch",data:r})}delete(e,r={}){return this.visit(e,{preserveState:!0,...r,method:"delete"})}remember(e,r="default"){var t;M||this.replaceState({...this.page,rememberedState:{...(t=this.page)==null?void 0:t.rememberedState,[r]:e}})}restore(e="default"){var r,t;if(!M)return(t=(r=window.history.state)==null?void 0:r.rememberedState)==null?void 0:t[e]}on(e,r){let t=i=>{let d=r(i);i.cancelable&&!i.defaultPrevented&&d===!1&&i.preventDefault()};return document.addEventListener(`inertia:${e}`,t),()=>document.removeEventListener(`inertia:${e}`,t)}};function he(e){let r=e.currentTarget.tagName.toLowerCase()==="a";return!(e.target&&(e==null?void 0:e.target).isContentEditable||e.defaultPrevented||r&&e.which>1||r&&e.altKey||r&&e.ctrlKey||r&&e.metaKey||r&&e.shiftKey)}var R=new ce;function fe(e,r){let t=typeof e=="string"?e:null,i=typeof e=="string"?r:e,d=t?R.restore(t):null,u=typeof i=="object"?E(i):E(i()),y=null,k=null,v=o=>o,g=W({...d?d.data:E(u),isDirty:!1,errors:d?d.errors:{},hasErrors:!1,processing:!1,progress:null,wasSuccessful:!1,recentlySuccessful:!1,data(){return Object.keys(u).reduce((o,c)=>(o[c]=this[c],o),{})},transform(o){return v=o,this},defaults(o,c){if(typeof i=="function")throw new Error("You cannot call `defaults()` when using a function to define your form data.");return typeof o>"u"?u=this.data():u=Object.assign({},E(u),typeof o=="string"?{[o]:c}:o),this},reset(...o){let c=typeof i=="object"?E(u):E(i()),h=E(c);return o.length===0?(u=h,Object.assign(this,c)):Object.keys(c).filter(S=>o.includes(S)).forEach(S=>{u[S]=h[S],this[S]=c[S]}),this},setError(o,c){return Object.assign(this.errors,typeof o=="string"?{[o]:c}:o),this.hasErrors=Object.keys(this.errors).length>0,this},clearErrors(...o){return this.errors=Object.keys(this.errors).reduce((c,h)=>({...c,...o.length>0&&!o.includes(h)?{[h]:this.errors[h]}:{}}),{}),this.hasErrors=Object.keys(this.errors).length>0,this},submit(o,c,h={}){let S=v(this.data()),s={...h,onCancelToken:n=>{if(y=n,h.onCancelToken)return h.onCancelToken(n)},onBefore:n=>{if(this.wasSuccessful=!1,this.recentlySuccessful=!1,clearTimeout(k),h.onBefore)return h.onBefore(n)},onStart:n=>{if(this.processing=!0,h.onStart)return h.onStart(n)},onProgress:n=>{if(this.progress=n,h.onProgress)return h.onProgress(n)},onSuccess:async n=>{this.processing=!1,this.progress=null,this.clearErrors(),this.wasSuccessful=!0,this.recentlySuccessful=!0,k=setTimeout(()=>this.recentlySuccessful=!1,2e3);let l=h.onSuccess?await h.onSuccess(n):null;return u=E(this.data()),this.isDirty=!1,l},onError:n=>{if(this.processing=!1,this.progress=null,this.clearErrors().setError(n),h.onError)return h.onError(n)},onCancel:()=>{if(this.processing=!1,this.progress=null,h.onCancel)return h.onCancel()},onFinish:n=>{if(this.processing=!1,this.progress=null,y=null,h.onFinish)return h.onFinish(n)}};o==="delete"?R.delete(c,{...s,data:S}):R[o](c,S,s)},get(o,c){this.submit("get",o,c)},post(o,c){this.submit("post",o,c)},put(o,c){this.submit("put",o,c)},patch(o,c){this.submit("patch",o,c)},delete(o,c){this.submit("delete",o,c)},cancel(){y&&y.cancel()},__rememberable:t===null,__remember(){return{data:this.data(),errors:this.errors}},__restore(o){Object.assign(this,o.data),this.setError(o.errors)}});return G(g,o=>{g.isDirty=!Q(g.data(),u),t&&R.remember(E(o.__remember()),t)},{immediate:!0,deep:!0}),g}x(null);var O=x(null);J(null);x(null);function me(){return W({props:V(()=>{var e;return(e=O.value)==null?void 0:e.props}),url:V(()=>{var e;return(e=O.value)==null?void 0:e.url}),component:V(()=>{var e;return(e=O.value)==null?void 0:e.component}),version:V(()=>{var e;return(e=O.value)==null?void 0:e.version}),scrollRegions:V(()=>{var e;return(e=O.value)==null?void 0:e.scrollRegions}),rememberedState:V(()=>{var e;return(e=O.value)==null?void 0:e.rememberedState})})}var de=U({props:{title:{type:String,required:!1}},data(){return{provider:this.$headManager.createProvider()}},beforeUnmount(){this.provider.disconnect()},methods:{isUnaryTag(e){return["area","base","br","col","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"].indexOf(e.type)>-1},renderTagStart(e){e.props=e.props||{},e.props.inertia=e.props["head-key"]!==void 0?e.props["head-key"]:"";let r=Object.keys(e.props).reduce((t,i)=>{let d=e.props[i];return["key","head-key"].includes(i)?t:d===""?t+` ${i}`:t+` ${i}="${d}"`},"");return`<${e.type}${r}>`},renderTagChildren(e){return typeof e.children=="string"?e.children:e.children.reduce((r,t)=>r+this.renderTag(t),"")},isFunctionNode(e){return typeof e.type=="function"},isComponentNode(e){return typeof e.type=="object"},isCommentNode(e){return/(comment|cmt)/i.test(e.type.toString())},isFragmentNode(e){return/(fragment|fgt|symbol\(\))/i.test(e.type.toString())},isTextNode(e){return/(text|txt)/i.test(e.type.toString())},renderTag(e){if(this.isTextNode(e))return e.children;if(this.isFragmentNode(e)||this.isCommentNode(e))return"";let r=this.renderTagStart(e);return e.children&&(r+=this.renderTagChildren(e)),this.isUnaryTag(e)||(r+=`</${e.type}>`),r},addTitleElement(e){return this.title&&!e.find(r=>r.startsWith("<title"))&&e.push(`<title inertia>${this.title}</title>`),e},renderNodes(e){return this.addTitleElement(e.flatMap(r=>this.resolveNode(r)).map(r=>this.renderTag(r)).filter(r=>r))},resolveNode(e){return this.isFunctionNode(e)?this.resolveNode(e.type()):this.isComponentNode(e)?(console.warn("Using components in the <Head> component is not supported."),[]):this.isTextNode(e)&&e.children?e:this.isFragmentNode(e)&&e.children?e.children.flatMap(r=>this.resolveNode(r)):this.isCommentNode(e)?[]:e}},render(){this.provider.update(this.renderNodes(this.$slots.default?this.$slots.default():[]))}}),ge=de,ue=U({name:"Link",props:{as:{type:String,default:"a"},data:{type:Object,default:()=>({})},href:{type:String,required:!0},method:{type:String,default:"get"},replace:{type:Boolean,default:!1},preserveScroll:{type:Boolean,default:!1},preserveState:{type:Boolean,default:null},only:{type:Array,default:()=>[]},headers:{type:Object,default:()=>({})},queryStringArrayFormat:{type:String,default:"brackets"}},setup(e,{slots:r,attrs:t}){return()=>{let i=e.as.toLowerCase(),d=e.method.toLowerCase(),[u,y]=H(d,e.href||"",e.data,e.queryStringArrayFormat);return i==="a"&&d!=="get"&&console.warn(`Creating POST/PUT/PATCH/DELETE <a> links is discouraged as it causes "Open Link in New Tab/Window" accessibility issues.

Please specify a more appropriate element using the "as" attribute. For example:

<Link href="${u}" method="${d}" as="button">...</Link>`),Y(e.as,{...t,...i==="a"?{href:u}:{},onClick:k=>{he(k)&&(k.preventDefault(),R.visit(u,{data:y,method:d,replace:e.replace,preserveScroll:e.preserveScroll,preserveState:e.preserveState??d!=="get",only:e.only,headers:e.headers,onCancelToken:t.onCancelToken||(()=>({})),onBefore:t.onBefore||(()=>({})),onStart:t.onStart||(()=>({})),onProgress:t.onProgress||(()=>({})),onFinish:t.onFinish||(()=>({})),onCancel:t.onCancel||(()=>({})),onSuccess:t.onSuccess||(()=>({})),onError:t.onError||(()=>({}))}))}},r)}}}),ve=ue;export{me as K,fe as T,ge as Z,ve as i};

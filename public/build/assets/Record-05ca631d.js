import{k as m,o as _,f as h,i as L,l as be,b as a,F as z,j as we,h as E,m as P,A as G,H as De,a as H,u as U,w as X,p as R,x as ee,t as p,g as Z,c as xe,q as Ce,s as $,d as T,n as Te,y as ke,z as Ne}from"./app-865d1ee5.js";import{_ as ze}from"./AuthenticatedLayout-1a72b56a.js";import{Z as Ue}from"./index.esm-bde64fbc.js";import Re from"./Chart-09d536ce.js";import{C as Se}from"./auto-5842a5d9.js";/* empty css                                                               */import{_ as Ie}from"./_plugin-vue_export-helper-c27b6911.js";import{u as D}from"./index-210e5ca7.js";import"./ApplicationLogo-34c4e552.js";/* empty css                                              */function Me(n){if(n===null||n===!0||n===!1)return NaN;var e=Number(n);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function Ve(n,e){if(e.length<n)throw new TypeError(n+" argument"+(n>1?"s":"")+" required, but only "+e.length+" present")}var ae=6e4,ne=36e5;function B(n,e){var l;Ve(1,arguments);var s=Me((l=e==null?void 0:e.additionalDigits)!==null&&l!==void 0?l:2);if(s!==2&&s!==1&&s!==0)throw new RangeError("additionalDigits must be 0, 1 or 2");if(!(typeof n=="string"||Object.prototype.toString.call(n)==="[object String]"))return new Date(NaN);var u=je(n),c;if(u.date){var f=qe(u.date,s);c=Fe(f.restDateString,f.year)}if(!c||isNaN(c.getTime()))return new Date(NaN);var b=c.getTime(),C=0,x;if(u.time&&(C=Oe(u.time),isNaN(C)))return new Date(NaN);if(u.timezone){if(x=Ee(u.timezone),isNaN(x))return new Date(NaN)}else{var w=new Date(b+C),k=new Date(0);return k.setFullYear(w.getUTCFullYear(),w.getUTCMonth(),w.getUTCDate()),k.setHours(w.getUTCHours(),w.getUTCMinutes(),w.getUTCSeconds(),w.getUTCMilliseconds()),k}return new Date(b+C+x)}var A={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},$e=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,Ae=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,Le=/^([+-])(\d{2})(?::?(\d{2}))?$/;function je(n){var e={},l=n.split(A.dateTimeDelimiter),s;if(l.length>2)return e;if(/:/.test(l[0])?s=l[0]:(e.date=l[0],s=l[1],A.timeZoneDelimiter.test(e.date)&&(e.date=n.split(A.timeZoneDelimiter)[0],s=n.substr(e.date.length,n.length))),s){var u=A.timezone.exec(s);u?(e.time=s.replace(u[1],""),e.timezone=u[1]):e.time=s}return e}function qe(n,e){var l=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+e)+"})|(\\d{2}|[+-]\\d{"+(2+e)+"})$)"),s=n.match(l);if(!s)return{year:NaN,restDateString:""};var u=s[1]?parseInt(s[1]):null,c=s[2]?parseInt(s[2]):null;return{year:c===null?u:c*100,restDateString:n.slice((s[1]||s[2]).length)}}function Fe(n,e){if(e===null)return new Date(NaN);var l=n.match($e);if(!l)return new Date(NaN);var s=!!l[4],u=S(l[1]),c=S(l[2])-1,f=S(l[3]),b=S(l[4]),C=S(l[5])-1;if(s)return Ye(e,b,C)?He(e,b,C):new Date(NaN);var x=new Date(0);return!Be(e,c,f)||!Qe(e,u)?new Date(NaN):(x.setUTCFullYear(e,c,Math.max(u,f)),x)}function S(n){return n?parseInt(n):1}function Oe(n){var e=n.match(Ae);if(!e)return NaN;var l=Q(e[1]),s=Q(e[2]),u=Q(e[3]);return We(l,s,u)?l*ne+s*ae+u*1e3:NaN}function Q(n){return n&&parseFloat(n.replace(",","."))||0}function Ee(n){if(n==="Z")return 0;var e=n.match(Le);if(!e)return 0;var l=e[1]==="+"?-1:1,s=parseInt(e[2]),u=e[3]&&parseInt(e[3])||0;return Je(s,u)?l*(s*ne+u*ae):NaN}function He(n,e,l){var s=new Date(0);s.setUTCFullYear(n,0,4);var u=s.getUTCDay()||7,c=(e-1)*7+l+1-u;return s.setUTCDate(s.getUTCDate()+c),s}var Ze=[31,null,31,30,31,30,31,31,30,31,30,31];function oe(n){return n%400===0||n%4===0&&n%100!==0}function Be(n,e,l){return e>=0&&e<=11&&l>=1&&l<=(Ze[e]||(oe(n)?29:28))}function Qe(n,e){return e>=1&&e<=(oe(n)?366:365)}function Ye(n,e,l){return e>=1&&e<=53&&l>=0&&l<=6}function We(n,e,l){return n===24?e===0&&l===0:l>=0&&l<60&&e>=0&&e<60&&n>=0&&n<25}function Je(n,e){return e>=0&&e<=59}const Ke={class:"fixed inset-0 flex items-center justify-center z-50","aria-hidden":"true"},Pe=a("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[a("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})],-1),Ge=[Pe],Xe=we('<header class="modal__header flex justify-between items-center px-4 py-2 bg-gray-100 rounded-t-lg mt-4"><h2 class="modal__title text-lg font-semibold text-gray-800"><span class="font-bold text-blue-700">記録画面ヘルプ</span><br></h2></header><main class="modal__content p-4 text-gray-700"><p class="mb-4"><span class="font-bold text-blue-700">レーダーチャート</span><br> レーダーチャートは、各クイズカテゴリーの正答率を比較するための視覚的なグラフです。チャートの中心から外側に 向かって正答率が高くなり、各項目がカテゴリーを表します。グラフ上でカーソルを合わせると正確な数値を表示します。 </p><p class="mb-4"><span class="font-bold text-blue-700">折れ線グラフ</span><br> 折れ線グラフは、クイズの正答率の推移を時間に基づいて示しています。クイズ結果のデータはカテゴリーごとに 表示することが可能です。グラフ上でカーソルを合わせると正確な数値を表示します。 </p><p class="mb-4"><span class="font-bold text-blue-700">クイズの結果一覧</span><br> 過去のクイズ結果が一覧表示されます。各結果には、クイズの日付、カテゴリー、出題数、正答率などが表示されます。 「回答詳細」をクリックすると、それぞれのクイズの結果についての詳細情報が表示されます。 </p></main>',2),et={__name:"RecordModal",setup(n){const e=m(!1),l=()=>{e.value=!e.value},s=u=>{u.target.classList.contains("modal__overlay")&&l()};return(u,c)=>(_(),h(z,null,[L(a("div",Ke,[a("div",{class:"modal fixed inset-0 flex items-center justify-center z-50"},[a("div",{onClick:s,class:"modal__overlay fixed inset-0 bg-opacity-50 bg-black"}),a("div",{class:"modal__container bg-white rounded-lg shadow-lg max-w-md mx-auto p-4 z-50 relative",role:"dialog","aria-modal":"true","aria-labelledby":"modal-1-title"},[a("button",{onClick:l,type:"button",class:"modal__close absolute top-4 right-4 focus:outline-none text-gray-500 hover:text-gray-700"},Ge),Xe,a("footer",{class:"modal__footer px-4 py-2"},[a("button",{onClick:l,type:"button",class:"modal__btn modal__btn-primary bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none mr-2"}," 閉じる ")])])])],512),[[be,e.value]]),a("button",{onClick:l,type:"button",class:"bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"},"ヘルプ")],64))}},y=n=>(ke("data-v-5e6d0883"),n=n(),Ne(),n),tt=y(()=>a("h2",{class:"font-semibold text-2xl text-gray-800 leading-tight"},"クイズの結果情報",-1)),at={class:"absolute top-40 right-4 z-50"},nt={class:"bg-gray-100 py-8 px-4"},ot={class:"max-w-3xl mx-auto"},st={key:0},rt=y(()=>a("p",{class:"text-xl font-semibold text-gray-800"},"あなたはまだクイズを実施していません。",-1)),lt=[rt],it={key:1},ut={class:"flex space-x-4 mb-4"},ct={for:"fromDate",class:"flex items-center"},dt=y(()=>a("span",{class:"mr-1"},"From:",-1)),ft={for:"toDate",class:"flex items-center"},vt=y(()=>a("span",{class:"mr-1"},"To:",-1)),pt={key:0,class:"text-red-500"},mt=y(()=>a("option",{value:"all"},"全て",-1)),gt=["value"],_t={class:"flex justify-between items-center"},ht={class:"text-lg font-semibold"},yt={class:"text-gray-600"},bt={class:"text-gray-600"},wt={class:"text-gray-600"},Dt=["onClick"],xt={key:0,class:"mt-4 p-4 bg-gray-100 rounded-md"},Ct={class:"border-b border-gray-300 pb-2 mb-2"},Tt=y(()=>a("h3",{class:"text-xl font-semibold mb-1"},"回答詳細",-1)),kt={class:"text-gray-600"},Nt={class:"text-gray-600"},zt={class:"text-gray-600"},Ut={class:"space-y-4"},Rt={class:"border border-gray-300 rounded-md p-4"},St={class:"text-lg font-semibold mb-2"},It=y(()=>a("strong",null,"選択した回答:",-1)),Mt=y(()=>a("strong",null,"結果:",-1)),Vt=y(()=>a("strong",null,"正解:",-1)),$t=y(()=>a("strong",null,"誤答1:",-1)),At=y(()=>a("strong",null,"誤答2:",-1)),Lt=y(()=>a("strong",null,"誤答3:",-1)),jt=y(()=>a("strong",null,"解説:",-1)),qt={class:"mt-4 flex justify-center space-x-1"},Ft=["disabled"],Ot=["onClick"],Et=["disabled"],te=10,Ht={__name:"Record",setup(n){const e=m(1);let l=E(()=>Math.ceil(s.value.length/10));const s=m([]),u=m(null),c=m(null),f=m(null),b=m([]),C=m(!0),x=m(null),w=m(null),k=m([]),N=m("all"),j=o=>{o>=1&&o<=l.value&&(e.value=o)},se=E(()=>{const o=(e.value-1)*te,r=o+te;return s.value.slice(o,r)});function re(o,r){const t=[];if(o<=1)return t;t.push(1),r>3&&t.push("...");for(let i=r-2;i<=r+2;i++)i>1&&i<o&&t.push(i);return r<o-2&&t.push("..."),t.push(o),t}async function le(){try{const o=await R.get("/api/quiz-results");s.value=o.data.sort((r,t)=>new Date(t.created_at)-new Date(r.created_at)),s.value.forEach(r=>{r.created_at=D(new Date(r.created_at),"Asia/Tokyo")})}catch(o){console.error("クイズの結果情報の取得に失敗しました",o)}}function ie(o){u.value===o?u.value=null:u.value=o}const ue={dateValidation:"Fromの日付はTo以前の日付を選択してください"};let I=m(""),ce=[];async function de(){try{let t=(await R.get("/api/quiz-results")).data.sort((v,V)=>new Date(V.created_at)-new Date(v.created_at));if(c.value&&f.value&&new Date(c.value)>new Date(f.value)){I.value=ue.dateValidation;return}else I.value="";const i=c.value?D(B(c.value),"Asia/Tokyo"):null,g=f.value?D(B(f.value),"Asia/Tokyo"):null;g&&g.setHours(g.getHours()+24),console.log("fromDateTime",i),console.log("toDateTime",g),t=t.filter(v=>{const V=D(B(v.created_at),"Asia/Tokyo");return(!i||V>=i)&&(!g||V<=g)}),t.forEach(v=>{v.created_at=D(new Date(v.created_at),"Asia/Tokyo")}),ce=t,await W();const d=Y(t);console.log("filteredQuizRecords",d),s.value=d,ge(),F(M(d)),console.log("quizRecords.value",s.value)}catch(o){console.error("クイズの結果情報の取得に失敗しました",o)}}function Y(o){if(!c.value&&!f.value)return o;const r=c.value?D(new Date(c.value),"UTC"):null,t=f.value?D(new Date(f.value),"UTC"):null;return t&&t.setHours(t.getHours()+24),console.log("fromDateValue3",r),console.log("toDateValue3",t),o.filter(i=>{const g=D(new Date(i.created_at),"Asia/Tokyo");return(!r||g>=r)&&(!t||g<=t)})}const q=m({});async function fe(){try{(await R.get("/api/categories")).data.forEach(t=>{q.value[t.id]=t.name})}catch(o){console.error("カテゴリー情報の取得に失敗しました",o)}}async function W(){try{let r=(await R.get("/api/quiz-results")).data;if(c.value){const d=D(new Date(c.value),"UTC");r=r.filter(v=>new Date(v.created_at)>=d),console.log("fromDateTime2",d)}if(f.value){const d=D(new Date(f.value),"UTC");d.setDate(d.getDate()+1),r=r.filter(v=>new Date(v.created_at)<d),console.log("toDateTime2",d)}const t={},i={};r.forEach(d=>{const v=d.category_id;t[v]||(t[v]=0),i[v]||(i[v]=0),t[v]+=d.correct_answers,i[v]+=d.total_questions}),b.value=Object.keys(t).map(d=>({name:J(d),accuracy:pe(t[d],i[d])})),ve(r.map(d=>d.category_id)).forEach(d=>{b.value.push({name:J(d),accuracy:0})}),console.log("filteredResults: ",r)}catch(o){console.error("カテゴリー別の正答率データの取得に失敗しました",o)}}function ve(o){return Object.keys(q.value).map(Number).filter(t=>!o.includes(t))}function J(o){return q.value[o]||"Unknown Category"}function pe(o,r){return r===0?0:(o/r*100).toFixed(2)}P(()=>{le(),fe(),W()}),E(()=>Y(s.value));function K(){return Math.random().toString(36).substring(7)}const me=m(K());function ge(){me.value=K()}const _e=m([]);function he(){_e.value=M(b.value)}async function ye(){try{const o=await R.get("/api/categories");k.value=o.data}catch(o){console.error("カテゴリー情報の取得に失敗しました",o)}}m([]),G([b,c,f],he),De(()=>{N.value="all"});function M(o){if(!c.value&&!f.value)return o;const r=c.value?D(new Date(c.value),"UTC").getTime():0,t=f.value?D(new Date(f.value),"UTC").getTime()+24*60*60*1e3:Date.now();return console.log("fromDateValue4:",new Date(r).toLocaleString("ja-JP")),console.log("toDateValue4:",new Date(t).toLocaleString("ja-JP")),o.filter(i=>{const g=new Date(i.created_at).getTime();return g>=r&&g<=t})}function F(o){if(!x.value||(w.value&&(w.value.destroy(),w.value=null),Object.keys(o).length===0))return;const r=O(),t=[],i=[];for(const d in r){const v=r[d];t.push(v.accuracy),i.push(new Date(v.created_at).toLocaleDateString())}const g=x.value.getContext("2d");w.value=new Se(g,{type:"line",data:{labels:i,datasets:[{label:"正答率",data:t,borderColor:"rgb(75, 192, 192)",tension:.1}]},options:{scales:{x:{title:{display:!0,text:"日付"},reverse:!0},y:{title:{display:!0,text:"正答率 (%)"}}}}})}function O(){return N.value==="all"?s.value:s.value.filter(o=>o.category_id===N.value)}return P(async()=>{await ye(),F(M(O()))}),G(N,()=>{F(M(O()))}),(o,r)=>(_(),h(z,null,[H(U(Ue),{title:"クイズの結果情報"}),H(ze,null,{header:X(()=>[tt]),default:X(()=>[a("div",at,[H(et)]),a("div",nt,[a("div",ot,[s.value.length===0&&!C.value?(_(),h("div",st,lt)):(_(),h("div",it,[a("div",ut,[a("label",ct,[dt,L(a("input",{type:"date",id:"fromDate","onUpdate:modelValue":r[0]||(r[0]=t=>c.value=t),class:"px-2 py-1 border rounded-md"},null,512),[[ee,c.value]])]),a("label",ft,[vt,L(a("input",{type:"date",id:"toDate","onUpdate:modelValue":r[1]||(r[1]=t=>f.value=t),class:"px-2 py-1 border rounded-md"},null,512),[[ee,f.value]])]),a("button",{onClick:de,class:"bg-blue-500 text-white px-3 py-1 rounded-md"}," 検索 ")]),U(I)?(_(),h("p",pt,p(U(I)),1)):Z("",!0),b.value.length>0?(_(),xe(Re,{key:1,categoryData:b.value},null,8,["categoryData"])):Z("",!0),a("div",null,[L(a("select",{"onUpdate:modelValue":r[2]||(r[2]=t=>N.value=t)},[mt,(_(!0),h(z,null,$(k.value,t=>(_(),h("option",{key:t.id,value:t.id},p(t.name),9,gt))),128))],512),[[Ce,N.value]]),a("canvas",{ref_key:"lineChartCanvas",ref:x},null,512)]),a("ul",null,[(_(!0),h(z,null,$(se.value,t=>(_(),h("li",{key:t.id,class:"bg-white shadow-md p-4 mb-4 rounded-md"},[a("div",_t,[a("div",null,[a("h2",ht,p(new Date(t.created_at).toLocaleString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})),1),a("p",yt,"カテゴリー: "+p(t.category.name),1),a("p",bt,"出題数: "+p(t.total_questions),1),a("p",wt,"正答率: "+p(t.accuracy)+"%",1)]),a("button",{class:"bg-blue-500 text-white px-3 py-1 rounded-md",onClick:i=>ie(t.id)},p(u.value===t.id?"閉じる":"回答詳細"),9,Dt)]),u.value===t.id?(_(),h("div",xt,[a("div",Ct,[Tt,a("p",kt,"問題数: "+p(t.total_questions),1),a("p",Nt,"正解数: "+p(t.correct_answers),1),a("p",zt,"正答率: "+p(t.accuracy)+"%",1)]),a("ul",Ut,[(_(!0),h(z,null,$(t.results,i=>(_(),h("li",{key:i.id},[a("div",Rt,[a("h4",St,p(i.quiz.title),1),a("p",null,[It,T(" "+p(i.selected_choice),1)]),a("p",null,[Mt,T(" "+p(i.correct?"正解":"不正解"),1)]),a("p",null,[Vt,T(" "+p(i.quiz.correct_answer),1)]),a("p",null,[$t,T(" "+p(i.quiz.wrong_answer_1),1)]),a("p",null,[At,T(" "+p(i.quiz.wrong_answer_2),1)]),a("p",null,[Lt,T(" "+p(i.quiz.wrong_answer_3),1)]),a("p",null,[jt,T(" "+p(i.quiz.explain),1)])])]))),128))])])):Z("",!0)]))),128))]),a("div",qt,[a("button",{onClick:r[3]||(r[3]=t=>j(e.value-1)),disabled:e.value===1,class:"px-3 py-1 rounded-md bg-white text-blue-500 border border-blue-500"}," 前へ ",8,Ft),(_(!0),h(z,null,$(re(U(l),e.value),t=>(_(),h("button",{key:t,onClick:i=>j(t),class:Te(["px-3 py-1 rounded-md",e.value===t?"bg-blue-500 text-white":"bg-white text-blue-500 border border-blue-500"])},p(t),11,Ot))),128)),a("button",{onClick:r[4]||(r[4]=t=>j(e.value+1)),disabled:e.value===U(l),class:"px-3 py-1 rounded-md bg-white text-blue-500 border border-blue-500"}," 次へ ",8,Et)])]))])])]),_:1})],64))}},ea=Ie(Ht,[["__scopeId","data-v-5e6d0883"]]);export{ea as default};

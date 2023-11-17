import{k as i,o as a,f as l,i as D,l as G,b as s,F as b,j as H,h as w,m as k,p as m,A as J,a as z,u as C,w as j,q as M,s as L,t as _,g as N,d as K,n as X,y as Y,z as q}from"./app-219f245d.js";import{_ as ee}from"./AuthenticatedLayout-d5afd5c8.js";import{Z as te,i as se}from"./index.esm-6aa3b88f.js";import{_ as oe}from"./_plugin-vue_export-helper-c27b6911.js";import"./ApplicationLogo-e8a5445c.js";const ae={class:"fixed inset-0 flex items-center justify-center z-50","aria-hidden":"true"},le=s("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[s("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})],-1),ne=[le],re=H('<header class="modal__header flex justify-between items-center px-4 py-2 bg-gray-100 rounded-t-lg mt-4"><h2 class="modal__title text-lg font-semibold text-gray-800"><span class="font-bold text-blue-700">クイズ一覧画面ヘルプ</span><br></h2></header><main class="modal__content p-4 text-gray-700"><p class="mb-4"><span class="font-bold text-blue-700">クイズ一覧表示:</span><br> 画面上部にはあなたが作成したクイズ一覧が表示されます。それぞれのクイズにはタイトル、 作成日時、カテゴリー名が表示されています。 </p><p class="mb-4"><span class="font-bold text-blue-700">カテゴリーのフィルター:</span><br> クイズ一覧の上にはカテゴリーのドロップダウンメニューがあります。特定のカテゴリーのクイズだけを 表示するには、ここからカテゴリーを選択してください。 </p><p class="mb-4"><span class="font-bold text-blue-700">クイズの削除:</span><br> 削除したいクイズのチェックボックスをクリックして選択状態にしてください。 「削除」ボタンをクリックすると、選択されたクイズは一括削除されます。 実際にクイズが削除される前に、削除確認のための確認ダイアログが表示されます。 </p></main>',2),ie={__name:"ListModal",setup(h){const n=i(!1),c=()=>{n.value=!n.value},r=f=>{f.target.classList.contains("modal__overlay")&&c()};return(f,p)=>(a(),l(b,null,[D(s("div",ae,[s("div",{class:"modal fixed inset-0 flex items-center justify-center z-50"},[s("div",{onClick:r,class:"modal__overlay fixed inset-0 bg-opacity-50 bg-black"}),s("div",{class:"modal__container bg-white rounded-lg shadow-lg max-w-md mx-auto p-4 z-50 relative",role:"dialog","aria-modal":"true","aria-labelledby":"modal-1-title"},[s("button",{onClick:c,type:"button",class:"modal__close absolute top-4 right-4 focus:outline-none text-gray-500 hover:text-gray-700"},ne),re,s("footer",{class:"modal__footer px-4 py-2"},[s("button",{onClick:c,type:"button",class:"modal__btn modal__btn-primary bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none mr-2"}," 閉じる ")])])])],512),[[G,n.value]]),s("button",{onClick:c,type:"button",class:"bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"},"ヘルプ")],64))}};const S=h=>(Y("data-v-25504eb0"),h=h(),q(),h),ce=S(()=>s("h2",{class:"font-semibold text-2xl text-gray-800 leading-tight"},"クイズ一覧",-1)),de={class:"absolute top-40 right-4 z-50"},ue={class:"bg-gray-100 py-16"},_e={class:"max-w-3xl mx-auto px-4"},pe={key:0},ve=S(()=>s("p",{class:"text-xl font-semibold text-gray-800"},"あなたはまだクイズを作成していません。",-1)),me=[ve],be={key:1},he={class:"flex items-center mb-4 justify-between"},fe=["disabled"],ge=S(()=>s("option",{value:"all"},"全て",-1)),xe=["value"],ye=S(()=>s("option",{value:"all"},"全てのユーザー",-1)),we=["value","selected"],ke={class:"mt-4 space-y-4"},ze={class:"flex items-center"},Ce=["checked","onInput"],Le={class:"text-right"},Se={class:"text-gray-600"},Ue={class:"text-gray-600"},$e={key:0,class:"text-gray-600"},Ie={class:"mt-4 flex justify-center space-x-1"},Qe=["disabled"],je=["onClick"],De=["disabled"],B=20,Ve={__name:"List",setup(h){const n=i(1);let c=w(()=>Math.ceil(V.value.length/20));const r=i([]);console.log("quizzes",r);const f=i([]),p=i("all"),x=i(!0),U=i([]),g=i({id:null});k(async()=>{try{const e=await m.get("/api/currentUser");g.value=e.data.user,d.value=g.value?g.value.id:"all",x.value=!1}catch(e){console.error("ログインユーザー情報の取得に失敗しました",e)}}),k(()=>{Q(),I()});async function A(){try{const e=await m.get("/api/getUsers");U.value=e.data.users,console.log("response.data.users",e.data.users)}catch(e){console.error("ユーザー名の取得に失敗しました",e)}}k(async()=>{await Promise.all([Q(),I(),A()]),x.value=!1});const $=e=>{e>=1&&e<=c.value&&(n.value=e)},E=w(()=>{const e=(n.value-1)*B,o=e+B;return V.value.slice(e,o)});function F(e,o){const t=[];if(e<=1)return t;t.push(1),o>3&&t.push("...");for(let u=o-2;u<=o+2;u++)u>1&&u<e&&t.push(u);return o<e-2&&t.push("..."),t.push(e),t}async function I(){try{const e=await m.get("/api/categories");f.value=e.data}catch(e){console.error("カテゴリー一覧の取得に失敗しました",e)}}const d=i("all"),V=w(()=>p.value==="all"&&d.value==="all"?r.value:r.value.filter(e=>(p.value==="all"||e.category_id===p.value)&&(d.value==="all"||e.user_id===d.value)));function O(e){const o={year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"};return new Date(e).toLocaleDateString(void 0,o)}r.value.forEach(e=>{e.selected=!1});const v=i([]),P=e=>{e.selected?v.value=v.value.filter(o=>o.id!==e.id):v.value.push(e),e.selected=!e.selected},R=async()=>{if(v.value.length!==0)try{const e=v.value.map(t=>t.id);(await m.delete("/api/deleteQuizzes",{data:{quiz_ids:e}})).status===200&&(r.value=r.value.filter(t=>!e.includes(t.id)),v.value=[])}catch(e){console.error("クイズの削除に失敗しました",e)}};function T(){confirm("本当にクイズデータを削除しますか？")?R():event.preventDefault()}const W=w(()=>r.value.some(e=>e.selected)),y=i(null);async function Q(){try{const e=y.value?"/api/getAllQuizzes":"/api/getQuizzes",o=await m.get(e);r.value=o.data.quizzes,console.log("quizzes.value",r.value)}catch(e){console.error("クイズ一覧の取得に失敗しました",e)}}function Z(e){const o=U.value.find(t=>t.id===e);return o?o.name:"Unknown User"}return k(async()=>{try{const e=await m.get("/api/userRole");y.value=e.data.role==="admin",await Promise.all([Q(),I()]),x.value=!1}catch(e){console.error("ユーザーの役割の取得に失敗しました",e)}}),J(d,()=>{n.value=1}),(e,o)=>(a(),l(b,null,[z(C(te),{title:"クイズ一覧"}),z(ee,null,{header:j(()=>[ce]),default:j(()=>[s("div",de,[z(ie)]),s("div",ue,[s("div",_e,[r.value.length===0&&!x.value?(a(),l("div",pe,me)):(a(),l("div",be,[s("div",he,[s("button",{onClick:T,disabled:!W.value,class:"px-4 py-2 rounded-md bg-red-500 text-white"},"削除",8,fe),D(s("select",{"onUpdate:modelValue":o[0]||(o[0]=t=>p.value=t),class:"block w-40 bg-white border border-gray-300 p-2 rounded shadow-sm ml-6"},[ge,(a(!0),l(b,null,L(f.value,t=>(a(),l("option",{key:t.id,value:t.id},_(t.name),9,xe))),128))],512),[[M,p.value]])]),y.value?D((a(),l("select",{key:0,"onUpdate:modelValue":o[1]||(o[1]=t=>d.value=t),class:"block w-40 bg-white border border-gray-300 p-2 rounded shadow-sm ml-6"},[ye,(a(!0),l(b,null,L(U.value,t=>(a(),l("option",{key:t.id,value:t.id,selected:g.value.value&&t.id===g.value.value.id},_(t.name),9,we))),128))],512)),[[M,d.value]]):N("",!0),s("ul",ke,[(a(!0),l(b,null,L(E.value,t=>(a(),l("li",{key:t.id,class:"bg-white rounded shadow-md p-4 flex items-center justify-between"},[s("div",ze,[s("input",{type:"checkbox",checked:t.selected,class:"mr-6",onInput:u=>P(t)},null,40,Ce),z(C(se),{href:"/list/"+t.id,class:"hover:underline text-xl font-semibold mb-2"},{default:j(()=>[K(_(t.title),1)]),_:2},1032,["href"])]),s("div",Le,[s("p",Se,"作成日時: "+_(O(t.created_at)),1),s("p",Ue,"カテゴリー名: "+_(t.category.name),1),y.value?(a(),l("p",$e,"ユーザー名: "+_(Z(t.user_id)),1)):N("",!0)])]))),128))])]))])]),s("div",Ie,[s("button",{onClick:o[2]||(o[2]=t=>$(n.value-1)),disabled:n.value===1,class:"px-3 py-1 rounded-md bg-white text-blue-500 border border-blue-500"}," 前へ ",8,Qe),(a(!0),l(b,null,L(F(C(c),n.value),t=>(a(),l("button",{key:t,onClick:u=>$(t),class:X(["px-3 py-1 rounded-md",n.value===t?"bg-blue-500 text-white":"bg-white text-blue-500 border border-blue-500"])},_(t),11,je))),128)),s("button",{onClick:o[3]||(o[3]=t=>$(n.value+1)),disabled:n.value===C(c),class:"px-3 py-1 rounded-md bg-white text-blue-500 border border-blue-500"}," 次へ ",8,De)])]),_:1})],64))}},Fe=oe(Ve,[["__scopeId","data-v-25504eb0"]]);export{Fe as default};

import{k as r,h as y,m as x,p,A as J,o as l,f as o,a as D,u as w,w as L,F as m,b as a,i as $,q as j,s as k,t as u,g as A,d as K,n as O,y as W,z as X}from"./app-865d1ee5.js";import{_ as Y}from"./AuthenticatedLayout-1a72b56a.js";import{Z as q,i as ee}from"./index.esm-bde64fbc.js";import{_ as te}from"./_plugin-vue_export-helper-c27b6911.js";import"./ApplicationLogo-34c4e552.js";const z=f=>(W("data-v-c7ccd3c1"),f=f(),X(),f),se=z(()=>a("h2",{class:"font-semibold text-2xl text-gray-800 leading-tight"},"クイズ一覧",-1)),ae={class:"bg-gray-100 py-8"},le={class:"max-w-3xl mx-auto px-4"},oe={key:0},ne=z(()=>a("p",{class:"text-xl font-semibold text-gray-800"},"あなたはまだクイズを作成していません。",-1)),re=[ne],ie={key:1},ce={class:"flex items-center mb-4 justify-between"},de=["disabled"],ue=z(()=>a("option",{value:"all"},"全て",-1)),ve=["value"],pe=z(()=>a("option",{value:"all"},"全てのユーザー",-1)),_e=["value","selected"],he={class:"mt-4 space-y-4"},me={class:"flex items-center"},fe=["checked","onInput"],be={class:"text-right"},ge={class:"text-gray-600"},ye={class:"text-gray-600"},xe={key:0,class:"text-gray-600"},we={class:"mt-4 flex justify-center space-x-1"},ke=["disabled"],ze=["onClick"],Ce=["disabled"],B=20,Ue={__name:"List",setup(f){const i=r(1);let C=y(()=>Math.ceil(N.value.length/20));const n=r([]);console.log("quizzes",n);const V=r([]),_=r("all"),b=r(!0),U=r([]),h=r({id:null});x(async()=>{try{const e=await p.get("/api/currentUser");h.value=e.data.user,c.value=h.value?h.value.id:"all",b.value=!1}catch(e){console.error("ログインユーザー情報の取得に失敗しました",e)}}),x(()=>{S(),Q()});async function M(){try{const e=await p.get("/api/getUsers");U.value=e.data.users,console.log("response.data.users",e.data.users)}catch(e){console.error("ユーザー名の取得に失敗しました",e)}}x(async()=>{await Promise.all([S(),Q(),M()]),b.value=!1});const I=e=>{e>=1&&e<=C.value&&(i.value=e)},E=y(()=>{const e=(i.value-1)*B,s=e+B;return N.value.slice(e,s)});function F(e,s){const t=[];if(e<=1)return t;t.push(1),s>3&&t.push("...");for(let d=s-2;d<=s+2;d++)d>1&&d<e&&t.push(d);return s<e-2&&t.push("..."),t.push(e),t}async function Q(){try{const e=await p.get("/api/categories");V.value=e.data}catch(e){console.error("カテゴリー一覧の取得に失敗しました",e)}}const c=r("all"),N=y(()=>_.value==="all"&&c.value==="all"?n.value:n.value.filter(e=>(_.value==="all"||e.category_id===_.value)&&(c.value==="all"||e.user_id===c.value)));function P(e){const s={year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"};return new Date(e).toLocaleDateString(void 0,s)}n.value.forEach(e=>{e.selected=!1});const v=r([]),R=e=>{e.selected?v.value=v.value.filter(s=>s.id!==e.id):v.value.push(e),e.selected=!e.selected},T=async()=>{if(v.value.length!==0)try{const e=v.value.map(t=>t.id);(await p.delete("/api/deleteQuizzes",{data:{quiz_ids:e}})).status===200&&(n.value=n.value.filter(t=>!e.includes(t.id)),v.value=[])}catch(e){console.error("クイズの削除に失敗しました",e)}};function Z(){confirm("本当にクイズデータを削除しますか？")?T():event.preventDefault()}const G=y(()=>n.value.some(e=>e.selected)),g=r(null);async function S(){try{const e=g.value?"/api/getAllQuizzes":"/api/getQuizzes",s=await p.get(e);n.value=s.data.quizzes,console.log("quizzes.value",n.value)}catch(e){console.error("クイズ一覧の取得に失敗しました",e)}}function H(e){const s=U.value.find(t=>t.id===e);return s?s.name:"Unknown User"}return x(async()=>{try{const e=await p.get("/api/userRole");g.value=e.data.role==="admin",await Promise.all([S(),Q()]),b.value=!1}catch(e){console.error("ユーザーの役割の取得に失敗しました",e)}}),J(c,()=>{i.value=1}),(e,s)=>(l(),o(m,null,[D(w(q),{title:"クイズ一覧"}),D(Y,null,{header:L(()=>[se]),default:L(()=>[a("div",ae,[a("div",le,[n.value.length===0&&!b.value?(l(),o("div",oe,re)):(l(),o("div",ie,[a("div",ce,[a("button",{onClick:Z,disabled:!G.value,class:"px-4 py-2 rounded-md bg-red-500 text-white"},"削除",8,de),$(a("select",{"onUpdate:modelValue":s[0]||(s[0]=t=>_.value=t),class:"block w-40 bg-white border border-gray-300 p-2 rounded shadow-sm ml-6"},[ue,(l(!0),o(m,null,k(V.value,t=>(l(),o("option",{key:t.id,value:t.id},u(t.name),9,ve))),128))],512),[[j,_.value]])]),g.value?$((l(),o("select",{key:0,"onUpdate:modelValue":s[1]||(s[1]=t=>c.value=t),class:"block w-40 bg-white border border-gray-300 p-2 rounded shadow-sm ml-6"},[pe,(l(!0),o(m,null,k(U.value,t=>(l(),o("option",{key:t.id,value:t.id,selected:h.value.value&&t.id===h.value.value.id},u(t.name),9,_e))),128))],512)),[[j,c.value]]):A("",!0),a("ul",he,[(l(!0),o(m,null,k(E.value,t=>(l(),o("li",{key:t.id,class:"bg-white rounded shadow-md p-4 flex items-center justify-between"},[a("div",me,[a("input",{type:"checkbox",checked:t.selected,class:"mr-6",onInput:d=>R(t)},null,40,fe),D(w(ee),{href:"/list/"+t.id,class:"hover:underline text-xl font-semibold mb-2"},{default:L(()=>[K(u(t.title),1)]),_:2},1032,["href"])]),a("div",be,[a("p",ge,"作成日時: "+u(P(t.created_at)),1),a("p",ye,"カテゴリー名: "+u(t.category.name),1),g.value?(l(),o("p",xe,"ユーザー名: "+u(H(t.user_id)),1)):A("",!0)])]))),128))])]))])]),a("div",we,[a("button",{onClick:s[2]||(s[2]=t=>I(i.value-1)),disabled:i.value===1,class:"px-3 py-1 rounded-md bg-white text-blue-500 border border-blue-500"}," 前へ ",8,ke),(l(!0),o(m,null,k(F(w(C),i.value),t=>(l(),o("button",{key:t,onClick:d=>I(t),class:O(["px-3 py-1 rounded-md",i.value===t?"bg-blue-500 text-white":"bg-white text-blue-500 border border-blue-500"])},u(t),11,ze))),128)),a("button",{onClick:s[3]||(s[3]=t=>I(i.value+1)),disabled:i.value===w(C),class:"px-3 py-1 rounded-md bg-white text-blue-500 border border-blue-500"}," 次へ ",8,Ce)])]),_:1})],64))}},Ve=te(Ue,[["__scopeId","data-v-c7ccd3c1"]]);export{Ve as default};

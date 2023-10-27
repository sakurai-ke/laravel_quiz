import{_ as m}from"./AuthenticatedLayout-1a72b56a.js";import{Z as g,i as x}from"./index.esm-bde64fbc.js";import{k as p,o as c,f as r,i as f,l as v,b as t,F as u,j as y,m as w,p as k,a as i,u as b,w as _,t as a,d as z}from"./app-865d1ee5.js";import"./ApplicationLogo-34c4e552.js";import"./_plugin-vue_export-helper-c27b6911.js";const C={class:"fixed inset-0 flex items-center justify-center z-50","aria-hidden":"true"},$=t("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[t("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})],-1),S=[$],j=y('<header class="modal__header flex justify-between items-center px-4 py-2 bg-gray-100 rounded-t-lg mt-4"><h2 class="modal__title text-lg font-semibold text-gray-800"><span class="font-bold text-blue-700">クイズ詳細画面ヘルプ</span><br></h2></header><main class="modal__content p-4 text-gray-700"><p class="mb-4"><span class="font-bold text-blue-700">問題文の表示:</span><br> この画面では、クイズの詳細情報が表示されます。問題文や選択肢、解説など、クイズに関する詳細な情報を確認できます。 </p><p class="mb-4"><span class="font-bold text-blue-700">選択肢の確認:</span><br> 問題文の下には、クイズの選択肢が表示されます。正解や誤答の選択肢を確認できます。 </p><p class="mb-4"><span class="font-bold text-blue-700">カテゴリー情報:</span><br> クイズのカテゴリー情報も表示されます。 </p><p class="mb-4"><span class="font-bold text-blue-700">画像の確認:</span><br> クイズに関連する画像がある場合、画像が表示されます。 </p><p class="mb-4"><span class="font-bold text-blue-700">カテゴリー情報:</span><br> クイズ情報の編集が必要な場合、「編集」リンクをクリックして情報を更新できます </p></main>',2),B={__name:"ShowModal",setup(h){const s=p(!1),o=()=>{s.value=!s.value},d=l=>{l.target.classList.contains("modal__overlay")&&o()};return(l,e)=>(c(),r(u,null,[f(t("div",C,[t("div",{class:"modal fixed inset-0 flex items-center justify-center z-50"},[t("div",{onClick:d,class:"modal__overlay fixed inset-0 bg-opacity-50 bg-black"}),t("div",{class:"modal__container bg-white rounded-lg shadow-lg max-w-md mx-auto p-4 z-50 relative",role:"dialog","aria-modal":"true","aria-labelledby":"modal-1-title"},[t("button",{onClick:o,type:"button",class:"modal__close absolute top-4 right-4 focus:outline-none text-gray-500 hover:text-gray-700"},S),j,t("footer",{class:"modal__footer px-4 py-2"},[t("button",{onClick:o,type:"button",class:"modal__btn modal__btn-primary bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none mr-2"}," 閉じる ")])])])],512),[[v,s.value]]),t("button",{onClick:o,type:"button",class:"bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"},"ヘルプ")],64))}},L={class:"absolute top-40 right-4 z-50"},M=t("h2",{class:"font-semibold text-2xl text-gray-800 leading-tight"},"クイズ詳細",-1),N={class:"bg-gray-100 py-8"},V={class:"max-w-3xl mx-auto px-4"},q={class:"bg-white rounded shadow-md p-4 space-y-4"},D={class:"border-b pb-2"},F=t("p",{class:"text-lg font-semibold"},"カテゴリー",-1),I={class:"text-gray-700"},O={class:"border-b pb-2"},Q=t("p",{class:"text-lg font-semibold"},"問題文",-1),E={class:"text-gray-700"},T={class:"border-b pb-2"},U=t("p",{class:"text-lg font-semibold"},"正解",-1),W={class:"text-gray-700"},Z={class:"border-b pb-2"},A=t("p",{class:"text-lg font-semibold"},"選択肢1",-1),G={class:"text-gray-670"},H={class:"border-b pb-2"},J=t("p",{class:"text-lg font-semibold"},"選択肢2",-1),K={class:"text-gray-700"},P={class:"border-b pb-2"},R=t("p",{class:"text-lg font-semibold"},"選択肢3",-1),X={class:"text-gray-700"},Y={class:"border-b pb-2"},tt=t("p",{class:"text-lg font-semibold"},"解説",-1),st={class:"text-gray-700"},et={class:"border-b pb-2"},ot=t("p",{class:"text-lg font-semibold"},"画像",-1),at=["src"],lt={key:1,class:"text-gray-700"},nt={class:"mt-4"},pt={__name:"Show",setup(h){const s=p({}),o=p({});w(()=>{const e=window.location.pathname.split("/").pop();d(e)});async function d(e){try{const n=await k.get(`/api/showQuizzes/${e}`);s.value=n.data.quiz,o.value=s.value.category}catch(n){console.error("クイズの詳細情報の取得に失敗しました",n)}}function l(e){return e?"/storage/images/"+e:null}return(e,n)=>(c(),r(u,null,[i(b(g),{title:"クイズ詳細"}),i(m,null,{header:_(()=>[M]),default:_(()=>[t("div",L,[i(B)]),t("div",N,[t("div",V,[t("div",q,[t("div",D,[F,t("p",I,a(o.value.name),1)]),t("div",O,[Q,t("p",E,a(s.value.title),1)]),t("div",T,[U,t("p",W,a(s.value.correct_answer),1)]),t("div",Z,[A,t("p",G,a(s.value.wrong_answer_1),1)]),t("div",H,[J,t("p",K,a(s.value.wrong_answer_2),1)]),t("div",P,[R,t("p",X,a(s.value.wrong_answer_3),1)]),t("div",Y,[tt,t("p",st,a(s.value.explain),1)]),t("div",et,[ot,s.value.image_src?(c(),r("img",{key:0,src:l(s.value.image_src),alt:"クイズの画像",class:"max-h-40"},null,8,at)):(c(),r("p",lt,"画像なし"))])]),t("div",nt,[i(b(x),{href:"/list/"+s.value.id+"/edit",class:"text-blue-500 hover:underline"},{default:_(()=>[z("編集")]),_:1},8,["href"])])])])]),_:1})],64))}};export{pt as default};

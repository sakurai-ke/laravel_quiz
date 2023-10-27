import{k as i,o as m,f as b,i as c,l as I,b as e,F as f,j as V,m as U,p as w,a as v,u as j,w as h,g as x,e as L,q as z,s as $,t as D,x as p,y as O,z as B}from"./app-865d1ee5.js";import{_ as F}from"./AuthenticatedLayout-1a72b56a.js";import{Z as N}from"./index.esm-bde64fbc.js";import{_ as T}from"./ValidationErrors-518981d5.js";import{_ as q}from"./_plugin-vue_export-helper-c27b6911.js";import"./ApplicationLogo-34c4e552.js";const H={class:"fixed inset-0 flex items-center justify-center z-50","aria-hidden":"true"},R=e("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})],-1),E=[R],P=V('<header class="modal__header flex justify-between items-center px-4 py-2 bg-gray-100 rounded-t-lg mt-4"><h2 class="modal__title text-lg font-semibold text-gray-800"><span class="font-bold text-blue-700">クイズ作成画面ヘルプ</span><br></h2></header><main class="modal__content p-4 text-gray-700"><p class="mb-4"><span class="font-bold text-blue-700">問題文の入力:</span><br> クイズを作成する際に、まず画面上部の「問題文」欄に問題の内容を入力します。 問題文はクイズの鍵となる部分ですので、よく考えて記入しましょう。 </p><p class="mb-4"><span class="font-bold text-blue-700">カテゴリーの選択:</span><br> 問題に対応するカテゴリーを選択してください。カテゴリーはクイズを分類するためのものです。 </p><p class="mb-4"><span class="font-bold text-blue-700">選択肢の入力:</span><br> 問題文の下には正解と不正解の選択肢を入力します。 正解の選択肢は問題の答えとなり、不正解の選択肢は誤答の選択肢として表示されます。 </p><p class="mb-4"><span class="font-bold text-blue-700">解説の入力:</span><br> クイズの正解に対する詳細な解説を提供します。ユーザーがクイズに回答した際に、 正しい理由や補足情報を提供する場所です。 </p><p class="mb-4"><span class="font-bold text-blue-700">画像のアップロード (オプション):</span><br> もし問題に関連する画像を含めたい場合、画面下部の「画像ファイル」セクションから画像をアップロードできます。 画像のアップロードはオプションです。 </p></main>',2),Q={__name:"CreateModal",setup(_){const d=i(!1),n=()=>{d.value=!d.value},r=u=>{u.target.classList.contains("modal__overlay")&&n()};return(u,s)=>(m(),b(f,null,[c(e("div",H,[e("div",{class:"modal fixed inset-0 flex items-center justify-center z-50"},[e("div",{onClick:r,class:"modal__overlay fixed inset-0 bg-opacity-50 bg-black"}),e("div",{class:"modal__container bg-white rounded-lg shadow-lg max-w-md mx-auto p-4 z-50 relative",role:"dialog","aria-modal":"true","aria-labelledby":"modal-1-title"},[e("button",{onClick:n,type:"button",class:"modal__close absolute top-4 right-4 focus:outline-none text-gray-500 hover:text-gray-700"},E),P,e("footer",{class:"modal__footer px-4 py-2"},[e("button",{onClick:n,type:"button",class:"modal__btn modal__btn-primary bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none mr-2"}," 閉じる ")])])])],512),[[I,d.value]]),e("button",{onClick:n,type:"button",class:"bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"},"ヘルプ")],64))}};const l=_=>(O("data-v-e0491966"),_=_(),B(),_),W=l(()=>e("h2",{class:"font-semibold text-2xl text-gray-800 leading-tight"},"クイズ作成",-1)),Z={class:"absolute top-40 right-4 z-50"},A={class:"w-full max-w-screen-md mx-auto p-6 bg-white rounded-md shadow-md mt-4"},G=["innerHTML"],J=["onSubmit"],K={class:"mb-4"},X=l(()=>e("label",{class:"block font-semibold"},"クイズのジャンル",-1)),Y=["value"],ee={class:"mb-4"},te=l(()=>e("label",{class:"block font-semibold"},"問題文",-1)),se={class:"mb-4"},oe=l(()=>e("label",{class:"block font-semibold"},"正解の選択肢",-1)),ae={class:"mb-4"},le=l(()=>e("label",{class:"block font-semibold"},"不正解の選択肢1",-1)),ne={class:"mb-4"},re=l(()=>e("label",{class:"block font-semibold"},"不正解の選択肢2",-1)),de={class:"mb-4"},ie=l(()=>e("label",{class:"block font-semibold"},"不正解の選択肢3",-1)),ce={class:"mb-4"},ue=l(()=>e("label",{class:"block font-semibold"},"解説",-1)),_e={class:"mb-4"},pe=l(()=>e("label",{class:"block font-semibold"},"画像ファイル",-1)),me={key:0,class:"mt-2"},be=["src"],ve=l(()=>e("div",{class:"mb-4"},[e("button",{type:"submit",class:"py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition duration-300"}," 送信 ")],-1)),ge={__name:"Create",props:{errors:Object},setup(_){const d=i(""),n=i([]),r=i(null),u=i(null),s=i({category_id:null,title:"",correct_answer:"",wrong_answer_1:"",wrong_answer_2:"",wrong_answer_3:"",explain:"",image_src:""});U(()=>{y(),k.value=localStorage.getItem("flashMessage"),localStorage.removeItem("flashMessage")});async function y(){try{const o=await w.get("/api/categories");n.value=o.data,d.value=n.value.length>0?n.value[0].id:""}catch(o){console.error("カテゴリーの取得に失敗しました",o)}}const k=i(null),g=i(null);async function C(){const o=new FormData;o.append("category_id",d.value),o.append("title",s.value.title),o.append("correct_answer",s.value.correct_answer),o.append("wrong_answer_1",s.value.wrong_answer_1),o.append("wrong_answer_2",s.value.wrong_answer_2),o.append("wrong_answer_3",s.value.wrong_answer_3),o.append("explain",s.value.explain),r.value?o.append("image_src",r.value):o.append("image_src","");try{const t=await w.post("/api/makeQuizzes",o);console.log("クイズ作成成功:",t.data),t.data.message==="クイズが作成されました"&&(localStorage.setItem("flashMessage","クイズが作成されました"),window.location.href="/top"),s.value={title:"",category_id:null,correct_answer:"",wrong_answer_1:"",wrong_answer_2:"",wrong_answer_3:"",explain:"",image_src:""}}catch(t){console.error("クイズ作成エラー:",t),t.response&&(console.error("エラーレスポンス:",t.response.data),t.response.data.errors&&(g.value=Object.values(t.response.data.errors).join("<br>")))}}function M(o){const t=o.target.files[0];r.value=t,r.value?u.value=URL.createObjectURL(r.value):u.value=null}function S(){r.value=null,u.value=null}return(o,t)=>(m(),b(f,null,[v(j(N),{title:"クイズ作成"}),v(F,null,{header:h(()=>[W]),default:h(()=>[e("div",Z,[v(Q)]),e("div",A,[v(T,{errors:_.errors},null,8,["errors"]),g.value?(m(),b("div",{key:0,class:"mb-4 text-red-600",innerHTML:g.value},null,8,G)):x("",!0),e("form",{onSubmit:L(C,["prevent"]),enctype:"multipart/form-data"},[e("div",K,[X,c(e("select",{"onUpdate:modelValue":t[0]||(t[0]=a=>d.value=a),class:"w-full p-2 border rounded-md"},[(m(!0),b(f,null,$(n.value,a=>(m(),b("option",{key:a.id,value:a.id},D(a.name),9,Y))),128))],512),[[z,d.value]])]),e("div",ee,[te,c(e("textarea",{"onUpdate:modelValue":t[1]||(t[1]=a=>s.value.title=a),class:"w-full p-2 border rounded-md"},null,512),[[p,s.value.title]])]),e("div",se,[oe,c(e("input",{"onUpdate:modelValue":t[2]||(t[2]=a=>s.value.correct_answer=a),class:"w-full p-2 border rounded-md"},null,512),[[p,s.value.correct_answer]])]),e("div",ae,[le,c(e("input",{"onUpdate:modelValue":t[3]||(t[3]=a=>s.value.wrong_answer_1=a),class:"w-full p-2 border rounded-md"},null,512),[[p,s.value.wrong_answer_1]])]),e("div",ne,[re,c(e("input",{"onUpdate:modelValue":t[4]||(t[4]=a=>s.value.wrong_answer_2=a),class:"w-full p-2 border rounded-md"},null,512),[[p,s.value.wrong_answer_2]])]),e("div",de,[ie,c(e("input",{"onUpdate:modelValue":t[5]||(t[5]=a=>s.value.wrong_answer_3=a),class:"w-full p-2 border rounded-md"},null,512),[[p,s.value.wrong_answer_3]])]),e("div",ce,[ue,c(e("textarea",{"onUpdate:modelValue":t[6]||(t[6]=a=>s.value.explain=a),class:"w-full p-2 border rounded-md"},null,512),[[p,s.value.explain]])]),e("div",_e,[pe,e("input",{type:"file",onChange:M,accept:"image/*",class:"w-full p-2 border rounded-md"},null,32),r.value?(m(),b("div",me,[e("img",{src:u.value,alt:"選択した画像",class:"max-h-40"},null,8,be),e("button",{type:"button",onClick:S,class:"mt-2 text-sm text-red-500 hover:text-red-700"}," 画像を削除 ")])):x("",!0)]),ve],40,J)])]),_:1})],64))}},Ce=q(ge,[["__scopeId","data-v-e0491966"]]);export{Ce as default};

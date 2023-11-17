import{k as r,o as u,f as i,i as T,l as Z,b as o,F as N,j as ee,m as te,p as I,a as se,s as P,u as f,t as p,g,n as k,c as oe,w as ae,B as ne,C as le,d as re,y as ue,z as ce}from"./app-92f28c26.js";import{i as ie}from"./index.esm-4f1a13b9.js";import{_ as de}from"./_plugin-vue_export-helper-c27b6911.js";const _e={class:"fixed inset-0 flex items-center justify-center z-50","aria-hidden":"true"},be=o("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[o("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})],-1),pe=[be],ge=ee('<header class="modal__header flex justify-between items-center px-4 py-2 bg-gray-100 rounded-t-lg mt-4"><h2 class="modal__title text-lg font-semibold text-gray-800"><span class="font-bold text-blue-700">クイズ画面ヘルプ</span><br></h2></header><main class="modal__content p-4 text-gray-700"><p class="mb-4"><span class="font-bold text-blue-700">問題の表示:</span><br> 画面上部に問題文が表示されます。問題文をよく読み、正しい答えを選んでください。 </p><p class="mb-4"><span class="font-bold text-blue-700">選択肢の選択:</span><br> 問題文の下には選択肢が表示されます。正しい選択肢を選んでください。クイズには1つの正解があります。 </p><p class="mb-4"><span class="font-bold text-blue-700">ヒントボタン:</span><br> 「ヒント」ボタンをクリックすると、ChatGPTのAPIからヒントを取得します。このヒントは、問題文と正解の情報 からChatGPTによって生成されます。 </p><p class="mb-4"><span class="font-bold text-blue-700">回答ボタン:</span><br> 選択肢を選んだら、「回答」ボタンをクリックして回答を提出してください。正解か不正解かが表示されます。 </p><p class="mb-4"><span class="font-bold text-blue-700">クイズ番号のリスト:</span><br> 画面上側にはクイズ番号のリストが表示されます。クイズを飛び越えて選択することができます。 </p><p class="mb-4"><span class="font-bold text-blue-700">前のクイズへ / 次のクイズへ:</span><br> 「前のクイズへ」ボタンと「次のクイズへ」ボタンを使用して、前後の問題に移動できます。 </p><p class="mb-4"><span class="font-bold text-blue-700">結果を見る:</span><br> すべてのクイズに回答した後、結果（クイズの正解率）を確認するためのボタンが表示されます。 </p></main>',2),ve={__name:"QuizModal",setup(h){const _=r(!1),l=()=>{_.value=!_.value},C=c=>{c.target.classList.contains("modal__overlay")&&l()};return(c,t)=>(u(),i(N,null,[T(o("div",_e,[o("div",{class:"modal fixed inset-0 flex items-center justify-center z-50"},[o("div",{onClick:C,class:"modal__overlay fixed inset-0 bg-opacity-50 bg-black"}),o("div",{class:"modal__container bg-white rounded-lg shadow-lg max-w-md mx-auto p-4 z-50 relative",role:"dialog","aria-modal":"true","aria-labelledby":"modal-1-title"},[o("button",{onClick:l,type:"button",class:"modal__close absolute top-4 right-4 focus:outline-none text-gray-500 hover:text-gray-700"},pe),ge,o("footer",{class:"modal__footer px-4 py-2"},[o("button",{onClick:l,type:"button",class:"modal__btn modal__btn-primary bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none mr-2"}," 閉じる ")])])])],512),[[Z,_.value]]),o("button",{onClick:l,type:"button",class:"bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"},"ヘルプ")],64))}};const V=h=>(ue("data-v-9af2a895"),h=h(),ce(),h),fe={class:"absolute top-40 right-4 z-50"},he={class:"w-full max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md h-auto"},me={class:"quiz-progress flex justify-center items-center flex-wrap mb-4"},we=["onClick"],xe={class:"mb-2 text-gray-600"},ye={class:"text-xl font-semibold mb-4"},ke=["src"],Ce={class:"choice-list grid grid-cols-2 gap-4"},ze={class:"choice-label block"},Qe=["disabled","value"],$e=["onClick"],Be=["disabled"],Ie={key:2,class:"quiz-end-message mt-4"},Ne={key:0,class:"font-semibold text-green-500"},De={key:1},qe=V(()=>o("div",{class:"mb-4"},null,-1)),je={class:"button-group flex justify-between items-center mt-4"},Me={key:3,class:"mt-4 p-4 bg-gray-100 rounded-md"},Se=V(()=>o("h3",{class:"text-lg font-semibold mb-2"},"ヒント",-1)),Re={class:"text-gray-700"},Le={__name:"Quiz",props:{quizData:Object,selectedNumQuestions:Number,selectedCategory:Number},setup(h){const _=h;console.log("selectedNumQuestionsの値:",_.selectedNumQuestions),console.log("record_idの値:",_.record_id),console.log("selectedCategoryの値:",_.selectedCategory);const l=r(null),C=r([]),c=r("");let t=0,s=[];const b=r(_.quizData),A=r(_.selectedCategory);r(_.selectedNumQuestions);const m=r(!0),D=[],q=r(0);r(null);const S=r(0),w=r(!0),x=r(!1),y=r(!1);r(!1);const j=[];te(()=>{R()}),s.forEach(e=>{e.user_answer="",e.answered=!1});function E(e){for(let a=e.length-1;a>0;a--){const d=Math.floor(Math.random()*(a+1));[e[a],e[d]]=[e[d],e[a]]}return console.log("choices",e),e}function z(){const e=s[t];console.log("newQuizData",e),b.value=e,C.value=e.choices,l.value=e.user_choice,v.value=null}async function R(){try{const a=(await I.get("/api/quizzes",{params:{category_id:b.value.category_id,num_questions:_.selectedNumQuestions}})).data;if(a.length>0){const d=s.map(n=>n.id);s=a.filter(n=>!d.includes(n.id)).map(n=>({...n,isCorrect:l.value===n.correct_answer,user_choice:"",choices:E([n.correct_answer,n.wrong_answer_1,n.wrong_answer_2,n.wrong_answer_3])})),console.log("shuffledQuizList",s),s[t].answered&&(l.value=s[t].user_answer),z(),m.value=!0,c.value="",Q()}else console.error("次のクイズデータがありません")}catch(e){console.error("クイズの取得に失敗しました",e)}}const O=r(!0);async function F(){const e=s[t],a=l.value===e.correct_answer,d={quizIndex:t,isCorrect:a,explanation:e.explain};if(j.push(d),a?(c.value=`正解！
${e.explain}`,e.user_answer=l.value,e.answered=!0,D.push(e),q.value=D.length/s.length*100):(c.value=`不正解！正解は「${e.correct_answer}」です。
${e.explain}`,e.user_answer=l.value,e.answered=!0),await ne(),m.value=!1,S.value++,S.value===s.length)try{if(O.value){const n={category_id:A.value,total_questions:s.length,correct_answers:D.length,accuracy:q.value,created_at:new Date,updated_at:new Date},X=(await I.post("/api/record",n)).data.data.id;for(const B of s){const Y={record_id:X,quiz_id:B.id,selected_choice:B.user_answer,correct:B.user_answer===B.correct_answer,created_at:new Date,updated_at:new Date};await I.post("/api/result",Y)}y.value=!0,console.log("showResultButton.",y.value)}}catch(n){console.error("結果の保存に失敗しました",n)}}async function L(){c.value="",l.value="",t<s.length-1?(t++,z(),s[t].answered?m.value=!1:m.value=!0,Q()):R(),console.log("showResultButton.",y.value)}function G(){if(c.value="",l.value="",s[t].answered){const e=j.find(a=>a.quizIndex===t);e&&(c.value=e.isCorrect?`正解！
${e.explanation}`:`不正解！正解は「${s[t].correct_answer}」です。
${e.explanation}`)}t>0&&(t--,z(),Q()),console.log("showResultButton.",y.value)}function Q(){if(t===0?(x.value=!1,w.value=!0):t===s.length-1?(x.value=!0,w.value=!1):(x.value=!0,w.value=!0),s[t].answered){const e=j.find(a=>a.quizIndex===t);e&&(c.value=e.isCorrect?`正解！
${e.explanation}`:`不正解！正解は「${s[t].correct_answer}」です。
${e.explanation}`)}}function U(e){s[t].answered||(l.value=e,M.value=e,s[t].user_choice=e)}function W(e){return"/storage/images/"+e}const M=r(null);function H(){c.value=""}function J(e){t=e,H(),s[t].answered?M.value=s[t].user_choice:M.value=null,z(),m.value=!0,Q()}const v=r("");async function K(){v.value=null;try{const e=await I.post("/api/get-hint",{problem_statement:b.value.title,correct_answer:b.value.correct_answer});console.log("responseの値:",e);const a=e.data.hint;a?(v.value=a,console.log("ヒントの値:",v.value)):v.value="このクイズにはヒントがありません。"}catch(e){console.error("ヒントの取得に失敗しました",e)}}return(e,a)=>(u(),i(N,null,[o("div",fe,[se(ve)]),o("div",he,[o("div",me,[(u(!0),i(N,null,P(f(s),(d,n)=>(u(),i("div",{key:n,class:k(["quiz-number",d.answered?"bg-green-500 text-white":"bg-white border",n===f(t)?"current-quiz":""]),onClick:$=>J(n)},p(n+1),11,we))),128))]),o("p",xe,p(f(t)+1)+"問目 / "+p(f(s).length)+"問中 ",1),o("h2",ye,p(b.value.title),1),b.value.image_src?(u(),i("img",{key:0,src:W(b.value.image_src),alt:"Quiz Image",class:"mb-4 mx-auto"},null,8,ke)):g("",!0),o("ul",Ce,[(u(!0),i(N,null,P(C.value,(d,n)=>(u(),i("li",{key:n},[o("label",ze,[T(o("input",{type:"radio",disabled:b.value.answered,"onUpdate:modelValue":a[0]||(a[0]=$=>l.value=$),value:d,class:"hidden"},null,8,Qe),[[le,l.value]]),o("button",{class:k(["choice-button w-full py-2 px-4 rounded-md focus:outline-none transition duration-300",l.value===d?"bg-blue-500 text-white":"bg-gray-300 cursor-not-allowed"]),onClick:$=>U(d)},p(d),11,$e)])]))),128))]),m.value&&!b.value.answered?(u(),i("button",{key:1,onClick:F,class:k(["answer-button mt-4 w-full py-2 px-4 rounded-md focus:outline-none transition duration-300",l.value!==""?"bg-blue-500 hover:bg-blue-600 text-white":"bg-gray-300 cursor-not-allowed"]),disabled:l.value===""}," 回答 ",10,Be)):g("",!0),c.value!==""?(u(),i("div",Ie,[c.value.startsWith("正解")?(u(),i("p",Ne,p(c.value),1)):(u(),i("p",De,p(c.value),1)),qe,f(t)<f(s).length-1?(u(),i("button",{key:2,onClick:L,class:"block mx-auto mt-8 w-full max-w-xs py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition duration-300"}," 次へ ")):g("",!0),y.value?(u(),oe(f(ie),{key:3,href:e.route("quiz.result",{correctPercentage:q.value}),class:"block mx-auto mt-8 w-28 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition duration-300"},{default:ae(()=>[re(" 結果を見る ")]),_:1},8,["href"])):g("",!0)])):g("",!0),o("div",je,[x.value?(u(),i("button",{key:0,onClick:G,class:k(["prev-button",x.value?"bg-blue-500 hover:bg-blue-600 text-white":"bg-gray-300 cursor-not-allowed"])}," 前のクイズへ ",2)):g("",!0),w.value?(u(),i("button",{key:1,onClick:L,class:k(["next-button",w.value?"bg-blue-500 hover:bg-blue-600 text-white":"bg-gray-300 cursor-not-allowed"])}," 次のクイズへ ",2)):g("",!0)]),o("button",{onClick:K,class:"mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition duration-300"}," ヒント "),v.value?(u(),i("div",Me,[Se,o("p",Re,p(v.value),1)])):g("",!0)])],64))}},Ae=de(Le,[["__scopeId","data-v-9af2a895"]]);export{Ae as default};

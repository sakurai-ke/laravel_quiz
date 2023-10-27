import{m as u,B as f,o,f as l,a as d,u as y,w as c,F as p,b as e,s as w,t as n,i as m,C as _,p as b}from"./app-865d1ee5.js";import{_ as v}from"./AuthenticatedLayout-1a72b56a.js";import{Z as k}from"./index.esm-bde64fbc.js";import"./ApplicationLogo-34c4e552.js";import"./_plugin-vue_export-helper-c27b6911.js";const U=e("h2",{class:"font-semibold text-2xl text-gray-800 leading-tight"},"ユーザー一覧",-1),V={class:"container mx-auto py-6"},B=e("h1",{class:"text-2xl font-semibold text-gray-800 mb-4"},"User Profiles",-1),C={class:"bg-white shadow-md rounded-lg overflow-hidden"},E={class:"min-w-full"},N=e("thead",null,[e("tr",null,[e("th",{class:"px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider"}," # "),e("th",{class:"px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider"}," Name "),e("th",{class:"px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider"}," Email "),e("th",{class:"px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider"}," 権限 ")])],-1),$={class:"px-6 py-4 whitespace-no-wrap"},A={class:"px-6 py-4 whitespace-no-wrap"},D={class:"px-6 py-4 whitespace-no-wrap"},F={class:"px-6 py-4 whitespace-no-wrap text-right"},L={class:"inline-flex items-center"},M=["name","onUpdate:modelValue"],R=e("span",{class:"ml-2"},"Admin",-1),P={class:"inline-flex items-center"},S=["name","onUpdate:modelValue"],T=e("span",{class:"ml-2"},"User",-1),Z=["onClick"],I={__name:"List",props:{users:Array},setup(i){const x=i,h=async s=>{try{await b.post(`/api/user/${s.id}/save-role`,{role:s.role})}catch(r){console.error(r)}};return u(async()=>{await f(),x.users.forEach(s=>{s.roles.length>0?s.role=s.roles[0].name:s.role="user"})}),(s,r)=>(o(),l(p,null,[d(y(k),{title:"ユーザー一覧"}),d(v,null,{header:c(()=>[U]),default:c(()=>[e("div",V,[B,e("div",C,[e("table",E,[N,e("tbody",null,[(o(!0),l(p,null,w(i.users,(t,g)=>(o(),l("tr",{key:t.id},[e("td",$,n(g+1),1),e("td",A,n(t.name),1),e("td",D,n(t.email),1),e("td",F,[e("div",null,[e("label",L,[m(e("input",{type:"radio",class:"form-radio text-indigo-600 border-2 border-indigo-600",name:"role_"+t.id,value:"admin","onUpdate:modelValue":a=>t.role=a},null,8,M),[[_,t.role]]),R])]),e("div",null,[e("label",P,[m(e("input",{type:"radio",class:"form-radio text-green-600 border-2 border-green-600",name:"role_"+t.id,value:"user","onUpdate:modelValue":a=>t.role=a},null,8,S),[[_,t.role]]),T])]),e("button",{onClick:a=>h(t)},"保存",8,Z)])]))),128))])])])])]),_:1})],64))}};export{I as default};

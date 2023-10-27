import{h as w,i as k,v as y,o as i,f as h,c as u,w as d,a as o,u as s,t as v,g as c,b as r,d as p,n as x,e as V}from"./app-865d1ee5.js";import{_ as B}from"./GuestLayout-f6b584ba.js";import{_ as f,a as g,b as _}from"./TextInput-f77946d7.js";import{P as C}from"./PrimaryButton-f5a5a609.js";import{T as $,Z as P,i as q}from"./index.esm-bde64fbc.js";import"./ApplicationLogo-34c4e552.js";import"./_plugin-vue_export-helper-c27b6911.js";const N=["value"],S={__name:"Checkbox",props:{checked:{type:[Array,Boolean],required:!0},value:{default:null}},emits:["update:checked"],setup(l,{emit:e}){const m=l,n=w({get(){return m.checked},set(t){e("update:checked",t)}});return(t,a)=>k((i(),h("input",{type:"checkbox",value:l.value,"onUpdate:modelValue":a[0]||(a[0]=b=>n.value=b),class:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"},null,8,N)),[[y,n.value]])}},U={key:0,class:"mb-4 font-medium text-sm text-green-600"},L=["onSubmit"],R={class:"mt-4"},D={class:"block mt-4"},E={class:"flex items-center"},F=r("span",{class:"ml-2 text-sm text-gray-600"},"Remember me",-1),M={class:"flex items-center justify-end mt-4"},I={__name:"Login",props:{canResetPassword:{type:Boolean},status:{type:String}},setup(l){const e=$({email:"",password:"",remember:!1}),m=()=>{e.post(route("login"),{onFinish:()=>e.reset("password")})};return(n,t)=>(i(),u(B,null,{default:d(()=>[o(s(P),{title:"Log in"}),l.status?(i(),h("div",U,v(l.status),1)):c("",!0),r("form",{onSubmit:V(m,["prevent"])},[r("div",null,[o(f,{for:"email",value:"Email"}),o(g,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:s(e).email,"onUpdate:modelValue":t[0]||(t[0]=a=>s(e).email=a),required:"",autofocus:"",autocomplete:"username"},null,8,["modelValue"]),o(_,{class:"mt-2",message:s(e).errors.email},null,8,["message"])]),r("div",R,[o(f,{for:"password",value:"Password"}),o(g,{id:"password",type:"password",class:"mt-1 block w-full",modelValue:s(e).password,"onUpdate:modelValue":t[1]||(t[1]=a=>s(e).password=a),required:"",autocomplete:"current-password"},null,8,["modelValue"]),o(_,{class:"mt-2",message:s(e).errors.password},null,8,["message"])]),r("div",D,[r("label",E,[o(S,{name:"remember",checked:s(e).remember,"onUpdate:checked":t[2]||(t[2]=a=>s(e).remember=a)},null,8,["checked"]),F])]),r("div",M,[l.canResetPassword?(i(),u(s(q),{key:0,href:n.route("password.request"),class:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"},{default:d(()=>[p(" Forgot your password? ")]),_:1},8,["href"])):c("",!0),o(C,{class:x(["ml-4",{"opacity-25":s(e).processing}]),disabled:s(e).processing},{default:d(()=>[p(" Log in ")]),_:1},8,["class","disabled"])])],40,L)]),_:1}))}};export{I as default};

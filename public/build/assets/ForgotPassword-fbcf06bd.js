import{o as r,c as u,w as i,a as t,u as s,f as d,t as c,g as f,b as a,d as p,n as _,e as w}from"./app-865d1ee5.js";import{_ as g}from"./GuestLayout-f6b584ba.js";import{_ as y,a as b,b as x}from"./TextInput-f77946d7.js";import{P as k}from"./PrimaryButton-f5a5a609.js";import{T as h,Z as V}from"./index.esm-bde64fbc.js";import"./ApplicationLogo-34c4e552.js";import"./_plugin-vue_export-helper-c27b6911.js";const v=a("div",{class:"mb-4 text-sm text-gray-600"}," Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. ",-1),B={key:0,class:"mb-4 font-medium text-sm text-green-600"},N=["onSubmit"],P={class:"flex items-center justify-end mt-4"},z={__name:"ForgotPassword",props:{status:{type:String}},setup(o){const e=h({email:""}),m=()=>{e.post(route("password.email"))};return(S,l)=>(r(),u(g,null,{default:i(()=>[t(s(V),{title:"Forgot Password"}),v,o.status?(r(),d("div",B,c(o.status),1)):f("",!0),a("form",{onSubmit:w(m,["prevent"])},[a("div",null,[t(y,{for:"email",value:"Email"}),t(b,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:s(e).email,"onUpdate:modelValue":l[0]||(l[0]=n=>s(e).email=n),required:"",autofocus:"",autocomplete:"username"},null,8,["modelValue"]),t(x,{class:"mt-2",message:s(e).errors.email},null,8,["message"])]),a("div",P,[t(k,{class:_({"opacity-25":s(e).processing}),disabled:s(e).processing},{default:i(()=>[p(" Email Password Reset Link ")]),_:1},8,["class","disabled"])])],40,N)]),_:1}))}};export{z as default};

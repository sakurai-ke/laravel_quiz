import{o as n,c as l,w as t,a,u as o,b as e,d,n as c,e as p}from"./app-865d1ee5.js";import{_ as u}from"./GuestLayout-f6b584ba.js";import{_ as f,a as _,b as w}from"./TextInput-f77946d7.js";import{P as b}from"./PrimaryButton-f5a5a609.js";import{T as h,Z as x}from"./index.esm-bde64fbc.js";import"./ApplicationLogo-34c4e552.js";import"./_plugin-vue_export-helper-c27b6911.js";const g=e("div",{class:"mb-4 text-sm text-gray-600"}," This is a secure area of the application. Please confirm your password before continuing. ",-1),y=["onSubmit"],P={class:"flex justify-end mt-4"},j={__name:"ConfirmPassword",setup(V){const s=h({password:""}),i=()=>{s.post(route("password.confirm"),{onFinish:()=>s.reset()})};return(v,r)=>(n(),l(u,null,{default:t(()=>[a(o(x),{title:"Confirm Password"}),g,e("form",{onSubmit:p(i,["prevent"])},[e("div",null,[a(f,{for:"password",value:"Password"}),a(_,{id:"password",type:"password",class:"mt-1 block w-full",modelValue:o(s).password,"onUpdate:modelValue":r[0]||(r[0]=m=>o(s).password=m),required:"",autocomplete:"current-password",autofocus:""},null,8,["modelValue"]),a(w,{class:"mt-2",message:o(s).errors.password},null,8,["message"])]),e("div",P,[a(b,{class:c(["ml-4",{"opacity-25":o(s).processing}]),disabled:o(s).processing},{default:t(()=>[d(" Confirm ")]),_:1},8,["class","disabled"])])],40,y)]),_:1}))}};export{j as default};

import{o as n,f as m,b as a,a as s,u as e,d as u,w as d,i as _,l as h,g as p,T as x,e as V}from"./app-ce9a988c.js";import{a as v,b as g,_ as y}from"./TextInput-380b17ea.js";import{P as b}from"./PrimaryButton-32cc6beb.js";import{K as k,T as w,i as B}from"./index.esm-2de91299.js";import"./_plugin-vue_export-helper-c27b6911.js";const S=a("header",null,[a("h2",{class:"text-lg font-medium text-gray-900"},"アカウント編集"),a("p",{class:"mt-1 text-sm text-gray-600"}," アカウントのネームとメールアドレスを更新します。 ")],-1),N={key:0},T={class:"text-sm mt-2 text-gray-800"},$={class:"mt-2 font-medium text-sm text-green-600"},C={class:"flex items-center gap-4"},E={key:0,class:"text-sm text-gray-600"},K={__name:"UpdateProfileInformationForm",props:{mustVerifyEmail:{type:Boolean},status:{type:String}},setup(c){const r=(k().props||{}).auth||{user:null},i=r&&r.user?r.user:null,t=w({name:i?i.name:"",email:i?i.email:""});return(f,o)=>(n(),m("section",null,[S,a("form",{onSubmit:o[2]||(o[2]=V(l=>e(t).patch(f.route("profile.update")),["prevent"])),class:"mt-6 space-y-6"},[a("div",null,[s(y,{for:"name",value:"ネーム"}),s(v,{id:"name",type:"text",class:"mt-1 block w-full",modelValue:e(t).name,"onUpdate:modelValue":o[0]||(o[0]=l=>e(t).name=l),required:"",autofocus:"",autocomplete:"name"},null,8,["modelValue"]),s(g,{class:"mt-2",message:e(t).errors.name},null,8,["message"])]),a("div",null,[s(y,{for:"email",value:"メールアドレス"}),s(v,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:e(t).email,"onUpdate:modelValue":o[1]||(o[1]=l=>e(t).email=l),required:"",autocomplete:"username"},null,8,["modelValue"]),s(g,{class:"mt-2",message:e(t).errors.email},null,8,["message"])]),c.mustVerifyEmail&&e(i).email_verified_at===null?(n(),m("div",N,[a("p",T,[u(" Your email address is unverified. "),s(e(B),{href:f.route("verification.send"),method:"post",as:"button",class:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"},{default:d(()=>[u(" Click here to re-send the verification email. ")]),_:1},8,["href"])]),_(a("div",$," A new verification link has been sent to your email address. ",512),[[h,c.status==="verification-link-sent"]])])):p("",!0),a("div",C,[s(b,{disabled:e(t).processing},{default:d(()=>[u("保存")]),_:1},8,["disabled"]),s(x,{"enter-active-class":"transition ease-in-out","enter-from-class":"opacity-0","leave-active-class":"transition ease-in-out","leave-to-class":"opacity-0"},{default:d(()=>[e(t).recentlySuccessful?(n(),m("p",E,"Saved.")):p("",!0)]),_:1})])],32)]))}};export{K as default};
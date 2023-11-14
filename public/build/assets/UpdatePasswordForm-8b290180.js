import{k as c,o as m,f as i,b as o,a as e,u as r,w,T as _,e as v,d as y,g}from"./app-ce9a988c.js";import{a as l,b as n,_ as d}from"./TextInput-380b17ea.js";import{P as V}from"./PrimaryButton-32cc6beb.js";import{T as x}from"./index.esm-2de91299.js";import"./_plugin-vue_export-helper-c27b6911.js";const b=o("header",null,[o("h2",{class:"text-lg font-medium text-gray-900"},"パスワード編集"),o("p",{class:"mt-1 text-sm text-gray-600"}," アカウントのメールアドレスを更新します。 ")],-1),k=["onSubmit"],P={class:"flex items-center gap-4"},S={key:0,class:"text-sm text-gray-600"},C={__name:"UpdatePasswordForm",setup(B){const u=c(null),p=c(null),s=x({current_password:"",password:"",password_confirmation:""}),f=()=>{s.put(route("password.update"),{preserveScroll:!0,onSuccess:()=>s.reset(),onError:()=>{s.errors.password&&(s.reset("password","password_confirmation"),u.value.focus()),s.errors.current_password&&(s.reset("current_password"),p.value.focus())}})};return(I,a)=>(m(),i("section",null,[b,o("form",{onSubmit:v(f,["prevent"]),class:"mt-6 space-y-6"},[o("div",null,[e(d,{for:"current_password",value:"現在のパスワード"}),e(l,{id:"current_password",ref_key:"currentPasswordInput",ref:p,modelValue:r(s).current_password,"onUpdate:modelValue":a[0]||(a[0]=t=>r(s).current_password=t),type:"password",class:"mt-1 block w-full",autocomplete:"current-password"},null,8,["modelValue"]),e(n,{message:r(s).errors.current_password,class:"mt-2"},null,8,["message"])]),o("div",null,[e(d,{for:"password",value:"新しいパスワード"}),e(l,{id:"password",ref_key:"passwordInput",ref:u,modelValue:r(s).password,"onUpdate:modelValue":a[1]||(a[1]=t=>r(s).password=t),type:"password",class:"mt-1 block w-full",autocomplete:"new-password"},null,8,["modelValue"]),e(n,{message:r(s).errors.password,class:"mt-2"},null,8,["message"])]),o("div",null,[e(d,{for:"password_confirmation",value:"新しいパスワード（確認）"}),e(l,{id:"password_confirmation",modelValue:r(s).password_confirmation,"onUpdate:modelValue":a[2]||(a[2]=t=>r(s).password_confirmation=t),type:"password",class:"mt-1 block w-full",autocomplete:"new-password"},null,8,["modelValue"]),e(n,{message:r(s).errors.password_confirmation,class:"mt-2"},null,8,["message"])]),o("div",P,[e(V,{disabled:r(s).processing},{default:w(()=>[y("保存")]),_:1},8,["disabled"]),e(_,{"enter-active-class":"transition ease-in-out","enter-from-class":"opacity-0","leave-active-class":"transition ease-in-out","leave-to-class":"opacity-0"},{default:w(()=>[r(s).recentlySuccessful?(m(),i("p",S,"Saved.")):g("",!0)]),_:1})])],40,k)]))}};export{C as default};
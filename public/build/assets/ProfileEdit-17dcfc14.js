import{k as n,H as c,o as i,f as l,t as _,g as f,b as e,i as r,x as u,e as v}from"./app-ce9a988c.js";const b=e("h1",null,"プロフィール編集",-1),g={key:0,class:"text-green-500"},h=["onSubmit"],x=e("label",{for:"name"},"ユーザー名",-1),y=e("label",{for:"email"},"メールアドレス",-1),k=e("button",{type:"submit"},"保存",-1),B={__name:"ProfileEdit",setup(V){const t=n({name:$page.props.user.name,email:$page.props.user.email}),{put:m}=c.useInertia(),s=n(""),p=async()=>{(await m(route("profile.update"),t)).ok&&(s.value="プロフィールが更新されました。")};return(d,a)=>(i(),l("div",null,[b,s.value?(i(),l("div",g,_(s.value),1)):f("",!0),e("form",{onSubmit:v(p,["prevent"])},[x,r(e("input",{"onUpdate:modelValue":a[0]||(a[0]=o=>t.value.name=o),type:"text",id:"name",name:"name"},null,512),[[u,t.value.name]]),y,r(e("input",{"onUpdate:modelValue":a[1]||(a[1]=o=>t.value.email=o),type:"email",id:"email",name:"email"},null,512),[[u,t.value.email]]),k],40,h)]))}};export{B as default};
import{A as N}from"./ApplicationLogo-34c4e552.js";import{m as D,D as E,h as _,k as x,o as n,f as u,b as t,r as g,i as L,l as S,a as s,w as r,n as v,T as j,c as y,u as k,d as a,F as B,g as f,t as $}from"./app-865d1ee5.js";import{i as w}from"./index.esm-bde64fbc.js";const z={class:"relative"},A={__name:"Dropdown",props:{align:{type:String,default:"right"},width:{type:String,default:"48"},contentClasses:{type:String,default:"py-1 bg-white"}},setup(i){const o=i,l=b=>{c.value&&b.key==="Escape"&&(c.value=!1)};D(()=>document.addEventListener("keydown",l)),E(()=>document.removeEventListener("keydown",l));const e=_(()=>({48:"w-48"})[o.width.toString()]),d=_(()=>o.align==="left"?"origin-top-left left-0":o.align==="right"?"origin-top-right right-0":"origin-top"),c=x(!1);return(b,m)=>(n(),u("div",z,[t("div",{onClick:m[0]||(m[0]=C=>c.value=!c.value)},[g(b.$slots,"trigger")]),L(t("div",{class:"fixed inset-0 z-40",onClick:m[1]||(m[1]=C=>c.value=!1)},null,512),[[S,c.value]]),s(j,{"enter-active-class":"transition ease-out duration-200","enter-from-class":"opacity-0 scale-95","enter-to-class":"opacity-100 scale-100","leave-active-class":"transition ease-in duration-75","leave-from-class":"opacity-100 scale-100","leave-to-class":"opacity-0 scale-95"},{default:r(()=>[L(t("div",{class:v(["absolute z-50 mt-2 rounded-md shadow-lg",[e.value,d.value]]),style:{display:"none"},onClick:m[2]||(m[2]=C=>c.value=!1)},[t("div",{class:v(["rounded-md ring-1 ring-black ring-opacity-5",i.contentClasses])},[g(b.$slots,"content")],2)],2),[[S,c.value]])]),_:3})]))}},M={__name:"DropdownLink",props:{href:{type:String,required:!0}},setup(i){return(o,l)=>(n(),y(k(w),{href:i.href,class:"block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"},{default:r(()=>[g(o.$slots,"default")]),_:3},8,["href"]))}},p={__name:"NavLink",props:{href:{type:String,required:!0},active:{type:Boolean}},setup(i){const o=i,l=_(()=>o.active?"inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out":"inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out");return(e,d)=>(n(),y(k(w),{href:i.href,class:v(l.value)},{default:r(()=>[g(e.$slots,"default")]),_:3},8,["href","class"]))}},h={__name:"ResponsiveNavLink",props:{href:{type:String,required:!0},active:{type:Boolean}},setup(i){const o=i,l=_(()=>o.active?"block w-full pl-3 pr-4 py-2 border-l-4 border-indigo-400 text-left text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out":"block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out");return(e,d)=>(n(),y(k(w),{href:i.href,class:v(l.value)},{default:r(()=>[g(e.$slots,"default")]),_:3},8,["href","class"]))}},O={class:"min-h-screen bg-gray-100"},R={class:"bg-white border-b border-gray-100"},V={class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"},q={class:"flex justify-between h-16"},P={class:"flex"},T={class:"w-24 h-16 shrink-0 flex items-center"},F={class:"hidden space-x-8 sm:-my-px sm:ml-10 sm:flex"},I={class:"hidden sm:flex sm:items-center sm:ml-6"},U={key:0,class:"ml-3 relative"},G={class:"inline-flex rounded-md"},H={type:"button",class:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"},J=t("svg",{class:"ml-2 -mr-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},[t("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1),K={key:1,class:"ml-3 relative"},Q={class:"-mr-2 flex items-center sm:hidden"},W={class:"h-6 w-6",stroke:"currentColor",fill:"none",viewBox:"0 0 24 24"},X={class:"pt-2 pb-3 space-y-1"},Y={key:0,class:"pt-4 pb-1 border-t border-gray-200"},Z={class:"px-4"},ee={key:0,class:"font-medium text-base text-gray-800"},te={key:1,class:"font-medium text-sm text-gray-500"},re={class:"mt-3 space-y-1"},se={key:0,class:"bg-white shadow"},oe={class:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"},ae="/api/userRole",ue={__name:"AuthenticatedLayout",setup(i){const o=x(!1),l=x(null);return(async()=>{try{const d=await(await fetch(ae)).json();d.role&&(l.value=d.role)}catch(e){console.error("ユーザーのロール情報を取得できませんでした:",e)}})(),(e,d)=>(n(),u("div",null,[t("div",O,[t("nav",R,[t("div",V,[t("div",q,[t("div",P,[t("div",T,[s(k(w),{href:e.route("top"),class:"mb-4"},{default:r(()=>[s(N,{class:"block h-9 w-auto fill-current text-gray-800"})]),_:1},8,["href"])]),t("div",F,[s(p,{href:e.route("top"),active:e.route().current("top")},{default:r(()=>[a(" クイズを解く ")]),_:1},8,["href","active"]),e.$page.props.auth.user?(n(),u(B,{key:0},[s(p,{href:e.route("records"),active:e.route().current("records")},{default:r(()=>[a(" 記録 ")]),_:1},8,["href","active"]),s(p,{href:e.route("create"),active:e.route().current("create")},{default:r(()=>[a(" クイズ作成 ")]),_:1},8,["href","active"]),s(p,{href:e.route("list"),active:e.route().current("list")},{default:r(()=>[a(" クイズ詳細・編集 ")]),_:1},8,["href","active"])],64)):f("",!0),s(p,{href:e.route("rank"),active:e.route().current("rank")},{default:r(()=>[a(" ランキング ")]),_:1},8,["href","active"]),l.value==="admin"?(n(),y(p,{key:1,href:e.route("users"),active:e.route().current("users")},{default:r(()=>[a("ユーザー一覧")]),_:1},8,["href","active"])):f("",!0)])]),t("div",I,[e.$page.props.auth.user?(n(),u("div",U,[s(A,{align:"right",width:"48"},{trigger:r(()=>[t("span",G,[t("button",H,[a($(e.$page.props.auth.user?e.$page.props.auth.user.name:"")+" ",1),J])])]),content:r(()=>[s(M,{href:e.route("profile.edit")},{default:r(()=>[a(" Profile ")]),_:1},8,["href"]),s(M,{href:e.route("logout"),method:"post",as:"button"},{default:r(()=>[a(" Log Out ")]),_:1},8,["href"])]),_:1})])):(n(),u("div",K,[s(p,{href:"/"},{default:r(()=>[a("Log Out")]),_:1})]))]),t("div",Q,[t("button",{onClick:d[0]||(d[0]=c=>o.value=!o.value),class:"inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"},[(n(),u("svg",W,[t("path",{class:v({hidden:o.value,"inline-flex":!o.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 6h16M4 12h16M4 18h16"},null,2),t("path",{class:v({hidden:!o.value,"inline-flex":o.value}),"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"},null,2)]))])])])]),t("div",{class:v([{block:o.value,hidden:!o.value},"sm:hidden"])},[t("div",X,[s(h,{href:e.route("top"),active:e.route().current("top")},{default:r(()=>[a(" クイズを解く ")]),_:1},8,["href","active"]),e.$page.props.auth.user?(n(),u(B,{key:0},[s(h,{href:e.route("records"),active:e.route().current("records")},{default:r(()=>[a(" 記録 ")]),_:1},8,["href","active"]),s(h,{href:e.route("create"),active:e.route().current("create")},{default:r(()=>[a(" クイズ作成 ")]),_:1},8,["href","active"]),s(h,{href:e.route("list"),active:e.route().current("list")},{default:r(()=>[a(" クイズ詳細・編集 ")]),_:1},8,["href","active"])],64)):f("",!0),s(h,{href:e.route("rank"),active:e.route().current("rank")},{default:r(()=>[a(" ランキング ")]),_:1},8,["href","active"]),l.value==="admin"?(n(),y(h,{key:1,href:e.route("users"),active:e.route().current("users")},{default:r(()=>[a("ユーザー一覧")]),_:1},8,["href","active"])):f("",!0)]),e.$page.props.auth.user?(n(),u("div",Y,[t("div",Z,[e.$page.props.auth.user?(n(),u("div",ee,$(e.$page.props.auth.user.name),1)):f("",!0),e.$page.props.auth.user?(n(),u("div",te,$(e.$page.props.auth.user.email),1)):f("",!0)]),t("div",re,[s(h,{href:e.route("profile.edit")},{default:r(()=>[a(" Profile ")]),_:1},8,["href"]),s(h,{href:e.route("logout"),method:"post",as:"button"},{default:r(()=>[a(" Log Out ")]),_:1},8,["href"])])])):f("",!0)],2)]),e.$slots.header?(n(),u("header",se,[t("div",oe,[g(e.$slots,"header")])])):f("",!0),t("main",null,[g(e.$slots,"default")])])]))}};export{ue as _};

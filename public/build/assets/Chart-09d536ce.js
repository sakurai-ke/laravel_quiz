import{C as p}from"./auto-5842a5d9.js";/* empty css                                              */import{k as h,m as g,A as y,o,f as s,b as f,F as m,s as C,t as b,g as _}from"./app-865d1ee5.js";const k={key:0,class:"unanswered-category"},D={__name:"Chart",props:{categoryData:{type:Array,required:!0}},setup(u){const n=u,c=h(null);g(()=>{d(),y(()=>n.categoryData,()=>{d()})}),window.addEventListener("resize",()=>{a&&i()});function i(){c.value.getContext("2d"),a.resize(),a.update()}function d(){const l=c.value.getContext("2d"),t=[],e=[];for(const r of n.categoryData)t.push(r.name),e.push(r.accuracy);for(;t.length<5;)t.push("未回答"),e.push(0);a&&a.destroy(),a=new p(l,{type:"radar",data:{labels:t,datasets:[{label:"正答率",data:e,backgroundColor:"rgba(75, 192, 192, 0.2)",borderColor:"rgba(75, 192, 192, 1)",borderWidth:1}]},options:{scales:{r:{beginAtZero:!0}}}})}let a=null;return(l,t)=>(o(),s("div",null,[f("canvas",{ref_key:"radarChart",ref:c},null,512),(o(!0),s(m,null,C(n.categoryData,(e,r)=>(o(),s("div",{key:r},[e.accuracy===0?(o(),s("p",k,"未回答: "+b(e.name),1)):_("",!0)]))),128))]))}};export{D as default};
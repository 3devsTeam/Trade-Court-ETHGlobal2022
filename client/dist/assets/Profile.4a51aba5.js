import{G as L,r as b,j as n,a as e,H as O,I as P,M as A,O as S,l as M,A as _,h as y,J as $,F as j,N as C,U as k}from"./index.d4f6898f.js";const I=({offer:a,refetch:r})=>{const{_id:c,maker:h,offerType:i,unitPrice:f,amount:l,quantity:p,minLimit:x,maxLimit:o,payMethods:m,crypto:s,fiat:t,totalAmount:u}=a,d=L(()=>S.deleteByID(c)),[D,v]=b.exports.useState(!1);return b.exports.useEffect(()=>{r(),v(!1)},[d.isSuccess]),n("div",{className:"flex justify-between items-center bg-white shadow-customDark rounded-[20px] p-5",children:[e("div",{children:e("span",{className:"text-purple",children:c})}),e("div",{children:e("span",{className:`font-bold ${i==="buy"?"text-lightGreen":"text-red-400"}`,children:`${i==null?void 0:i[0].toUpperCase()}${i==null?void 0:i.slice(1)}`})}),e("div",{children:n("span",{children:[f," ",t==null?void 0:t.ticker]})}),e("div",{children:n("span",{className:"font-bold",children:[s.symbol,"/",t.ticker]})}),e("div",{children:m.map(g=>{var N;return e("div",{children:e("span",{children:(N=g==null?void 0:g.bank)==null?void 0:N.name})})})}),n("div",{className:"flex flex-col",children:[n("span",{className:"font-bold",children:[l,"/",u," ",s.symbol]}),n("span",{className:"font-bold",children:[l/u*100,"%"]})]}),e("div",{children:e(O,{onClick:()=>v(!0),color:"bg-black",icon:e(P,{})})}),D?e(A,{close:()=>v(!1),header:"Delete this Offer?",children:e("button",{onClick:()=>d.mutate(),disabled:d.isLoading,className:"text-white p-2 w-full rounded-lg bg-red-500 font-bold hover:opacity-70",children:d.isLoading?"Deleting Offer...":"Delete"})}):null]})},w=({name:a,margin:r})=>n("div",{className:`flex items-center ${r}`,children:[e("hr",{className:"w-full"}),e("div",{className:"text-center px-4 flex-none",children:e("span",{className:"text-gray-300 select-none",children:a})}),e("hr",{className:"w-full"})]}),E=({activeOffer:a})=>{const r=M(),{_id:c,offer:h,banks:i,crypto:f,fiat:l,stage:p,roomId:x}=a,{ticker:o}=l[0],{symbol:m}=f[0],{offerType:s,unitPrice:t}=h[0],u=()=>{r(`/transaction/${c}`)};return n("div",{className:"flex justify-between items-center bg-white shadow-customDark rounded-[20px] p-5",children:[e("div",{children:e("span",{className:"text-purple",children:c})}),e("div",{children:e("span",{className:`font-bold ${s==="buy"?"text-lightGreen":"text-red-400"}`,children:s})}),e("div",{children:n("span",{children:[t," ",o]})}),e("div",{children:n("span",{className:"font-bold",children:[m,"/",o]})}),e("div",{children:i.map(d=>e("div",{children:e("span",{children:d.name})}))}),e("div",{children:e("span",{className:"font-bold text-purple",children:p})}),e("div",{children:e(O,{onClick:()=>u(),color:"bg-purple",icon:e("div",{className:"-rotate-90 text-white",children:e(_,{})})})})]})},R=()=>{const{data:a,isSuccess:r,isLoading:c,isError:h,refetch:i,isFetching:f}=y(["get user offers"],()=>k.getOffers(),{select:s=>s.data.offers}),{data:l,isLoading:p,isError:x,isSuccess:o}=y(["get user rooms"],()=>k.getUserRooms(),{select:({data:s})=>s.rooms});return n("div",{children:[e($,{fields:[{name:"Ad number",className:"flex-[1.5_0]"},{name:"Type",className:"flex-[0.5_0]"},{name:"Price",className:"flex-1"},{name:"Pair",className:"flex-1"},{name:"Pay Methods",className:"flex-1"},{name:"Info",className:"flex-1"}]}),n("section",{className:"relative",children:[l!=null&&l.length?n(j,{children:[e(w,{name:"Active offers",margin:"my-5"}),x?e("p",{children:"error"}):(l==null?void 0:l.length)===0?e("p",{children:"no offers"}):o?e("div",{className:"flex flex-col gap-5",children:l==null?void 0:l.map(s=>e(E,{activeOffer:s},s._id))}):null]}):null,e(w,{name:"My offers",margin:"my-5"}),h?e("p",{children:"error"}):(a==null?void 0:a.length)===0?e(C,{}):r?e("div",{className:"flex flex-col gap-5",children:a==null?void 0:a.map(s=>e(I,{offer:s,refetch:i},s._id))}):null]})]})};export{R as default};

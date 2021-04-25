var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,o=Object.getOwnPropertySymbols,r=Object.prototype.propertyIsEnumerable,a=(t,o,r)=>o in t?e(t,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[o]=r,n=(e,n)=>{for(var l in n||(n={}))t.call(n,l)&&a(e,l,n[l]);if(o)for(var l of o(n))r.call(n,l)&&a(e,l,n[l]);return e};import{r as l,a as c}from"./vendor.de62f314.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(o){const r=new URL(e,location),a=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((o,n)=>{const l=new URL(e,r);if(self[t].moduleMap[l])return o(self[t].moduleMap[l]);const c=new Blob([`import * as m from '${l}';`,`${t}.moduleMap['${l}']=m;`],{type:"text/javascript"}),i=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(c),onerror(){n(new Error(`Failed to import: ${e}`)),a(i)},onload(){o(self[t].moduleMap[l]),a(i)}});document.head.appendChild(i)})),self[t].moduleMap={}}}("/GoBang/assets/");var i=e=>{const{isBlackPlayer:t,winner:o,initGame:r}=e;return l.createElement("section",{className:"game-info",style:{textAlign:"center"}},l.createElement("span",{className:"current-player"},"当前执棋：",t?"黑棋":"白棋"),o&&l.createElement(l.Fragment,null,l.createElement("span",{className:"winner"},"恭喜 ",o.name," 执",t?"黑棋":"白棋","取得胜利～"),l.createElement("button",{onClick:r},"再来一局")))},s=e=>{const{type:t,name:o,position:r="left"}=e;return l.createElement("div",{className:`chess-player ${r}`},l.createElement("i",{className:`piece-type ${t}`}),l.createElement("span",{className:"player-name"},o))};const p=e=>{const{value:t,onClick:o,piece:r,tagPiece:a,position:n}=e;return l.createElement("span",{"data-value":t,className:"board-square",style:{pointerEvents:r.type?"none":"auto"}},l.createElement("div",{className:`piece ${a.includes(t)?"tag":""} ${r.type}`,onClick:()=>o(t,n)}))};var m=e=>{const{rowLen:t,colLen:o,handleSquareOnClick:r,pieces:a,tagPiece:n}=e,c=Array(t).fill(""),i=Array(t).fill("");return l.createElement("div",{className:"board-container"},c.map(((e,t)=>(e=>l.createElement("div",{className:"board-row",key:e},i.map(((t,c)=>{const i=e*o+c;return l.createElement(p,{value:i,piece:a[i],onClick:r,tagPiece:n,position:{row:e,col:c},key:c})}))))(t))))};var u,y,f,d;(y=u||(u={})).Top="top",y.TopRight="topRight",y.Right="right",y.RightBottom="rightBottom",y.Bottom="bottom",y.BottomLeft="bottomLeft",y.Left="left",y.LeftTop="leftTop",(d=f||(f={}))[d.Top=-15]="Top",d[d.TopRight=-14]="TopRight",d[d.Right=1]="Right",d[d.RightBottom=16]="RightBottom",d[d.Bottom=15]="Bottom",d[d.BottomLeft=14]="BottomLeft",d[d.Left=-1]="Left",d[d.LeftTop=-16]="LeftTop";const g=(e,t,o,r,a,n)=>{var l;if(r<0||r>224)return n;const c=e[r];if(c.type!==t)return n;const i=null==(l=c.position)?void 0:l.row;return((e,t,o)=>{let r=!1;switch(e){case u.Left:case u.Right:r=t!==o;break;case u.TopRight:case u.BottomLeft:r=t===o;break;case u.LeftTop:case u.RightBottom:r=Math.abs(t-o)>1;break;case u.Top:case u.Bottom:r=t===o}return r})(o.type,i,a)||5===++n?n:g(e,t,o,r+o.rule,i,n)},h=[48,56,112,168,176];var v=()=>{const[e,t]=l.useState(Array(225).fill({type:void 0})),[o,r]=l.useState(!0),[a,c]=l.useState(void 0),p={rowLen:15,colLen:15,handleSquareOnClick:(n,l)=>{if(e[n].type||a)return;const i=o?"black":"white",s=e.slice(),p={type:i,index:n,position:l};s[n]=p,t(s);((e,t)=>{const o=[[{type:u.Top,rule:-15},{type:u.Bottom,rule:15}],[{type:u.Left,rule:-1},{type:u.Right,rule:1}],[{type:u.TopRight,rule:-14},{type:u.BottomLeft,rule:14}],[{type:u.RightBottom,rule:16},{type:u.LeftTop,rule:-16}]],{type:r,position:a}=e[t];return o.some((o=>o.reduce(((o,n)=>{const l=t+n.rule,c=null==a?void 0:a.row;return o+g(e,r,n,l,c,0)}),1)>=5))})(s,n)?c({type:i,name:"Bran"}):r(!o)},pieces:e,tagPiece:h},y={isBlackPlayer:o,winner:a,initGame:()=>{t(Array(225).fill({type:void 0})),r(!0),c(void 0)}};return l.createElement("div",{className:"container"},l.createElement(i,n({},y)),l.createElement(s,{type:"black",name:"电脑"}),l.createElement(m,n({},p)),l.createElement(s,{type:"white",name:"Bran",position:"right"}))};c.render(l.createElement(l.StrictMode,null,l.createElement(v,null)),document.getElementById("root"));
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{33:function(n,e,t){n.exports=t(43)},43:function(n,e,t){"use strict";t.r(e);var r=t(2),a=t(0),o=t.n(a),i=t(11),c=t(3),l=t(24),u=t(32),d=t(25),f=t(5),s=t(27),p=function(n,e){switch(e.type){case"UPDATE":return Object(s.a)({},n,e.payload);case"DROP":return Object(s.a)({},n,{board:e.payload.board,draggableElements:n.draggableElements.map(function(n,t){return t===e.payload.droppedElementIndex?x():n})});default:return n}},m=["#FEFEFE","#84A9AC","#3B6978","#204051"],v=[[{x:-1,y:-1,val:1},{x:0,y:-1,val:1},{x:0,y:0,val:1},{x:0,y:1,val:1},{x:1,y:1,val:1}],[{x:-1,y:1,val:1},{x:0,y:1,val:1},{x:0,y:0,val:1},{x:0,y:-1,val:1},{x:1,y:-1,val:1}],[{x:0,y:0,val:2},{x:0,y:1,val:2},{x:1,y:0,val:2},{x:1,y:1,val:2}],[{x:0,y:-1,val:2},{x:0,y:0,val:2},{x:0,y:1,val:2},{x:1,y:1,val:2}],[{x:1,y:-1,val:2},{x:0,y:-1,val:2},{x:0,y:0,val:2},{x:0,y:1,val:2}],[{x:0,y:-1,val:3},{x:0,y:0,val:3},{x:0,y:1,val:3},{x:0,y:2,val:3}],[{x:-1,y:0,val:3},{x:0,y:0,val:3},{x:1,y:0,val:3},{x:2,y:0,val:3}],[{x:-1,y:1,val:3},{x:-1,y:0,val:3},{x:0,y:0,val:3},{x:1,y:0,val:3}],[{x:-1,y:0,val:1},{x:0,y:0,val:1},{x:1,y:0,val:1},{x:1,y:1,val:1}],[{x:-1,y:0,val:1},{x:0,y:0,val:1},{x:1,y:0,val:1},{x:0,y:-1,val:1}],[{x:-1,y:0,val:1},{x:0,y:0,val:1},{x:1,y:0,val:1},{x:0,y:1,val:1}],[{x:-1,y:0,val:1},{x:0,y:1,val:1},{x:0,y:0,val:1},{x:0,y:-1,val:1}],[{x:1,y:0,val:1},{x:0,y:1,val:1},{x:0,y:0,val:1},{x:0,y:-1,val:1}],[{x:0,y:0,val:1}],[{x:0,y:0,val:1},{x:0,y:1,val:1}],[{x:0,y:0,val:1},{x:1,y:0,val:1}]];function g(n){if("undefined"===typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(n=function(n,e){if(!n)return;if("string"===typeof n)return b(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);"Object"===t&&n.constructor&&(t=n.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return b(n,e)}(n))){var e=0,t=function(){};return{s:t,n:function(){return e>=n.length?{done:!0}:{done:!1,value:n[e++]}},e:function(n){throw n},f:t}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,o=!0,i=!1;return{s:function(){r=n[Symbol.iterator]()},n:function(){var n=r.next();return o=n.done,n},e:function(n){i=!0,a=n},f:function(){try{o||null==r.return||r.return()}finally{if(i)throw a}}}}function b(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}Array.prototype.deepClone=function(){return JSON.parse(JSON.stringify(this))};var x=function(){return v[Math.floor(Math.random()*v.length)]},y=function(){return Array.from(Array(9),function(){return new Array(9).fill(0)})},h=function(){return{board:y(),draggableElements:[x(),x(),x()],score:0}},w=function(n,e,t){for(var r=3*e;r<3*(e+1);r++)for(var a=3*n;a<3*(n+1);a++)t.apply(null,[a,r])},E=Object(a.createContext)({}),O=function(n){var e=n.children,t=JSON.parse(localStorage.getItem("gameState")),r=Object(a.useReducer)(p,t||h()),i=Object(f.a)(r,2),c=i[0],l=i[1],u=Object(a.useState)({}),d=Object(f.a)(u,2),s=d[0],m=d[1];Object(a.useEffect)(function(){for(var n=!1,e=0;e<3;e++)for(var t=0;t<3;t++)y(t,e)&&(O(t,e),n=!0);!n&&c.draggableElements.length>0&&!k()&&(x(),alert("Game over!"))},[c]),Object(a.useEffect)(function(){localStorage.setItem("gameState",JSON.stringify(c))},[c]);var v=Object(a.useCallback)(function(){l({type:"UPDATE",payload:h()})},[]),b=Object(a.useCallback)(function(n,e,t){var r,a=c.board.deepClone(),o=g(c.draggableElements[t]);try{for(o.s();!(r=o.n()).done;){var i=r.value;if(void 0===c.board[e+i.y]||void 0===c.board[e+i.y][n+i.x]||0!==c.board[e+i.y][n+i.x])return;a[e+i.y][n+i.x]=i.val}}catch(u){o.e(u)}finally{o.f()}l({type:"DROP",payload:{board:a,droppedElementIndex:t}})},[c.board,c.draggableElements]),x=Object(a.useCallback)(function(){l({type:"UPDATE",payload:{draggableElements:[]}})},[]),y=function(n,e){var t=!0;return w(n,e,function(n,e){0===c.board[e][n]&&(t=!1)}),t},O=function(n,e){var t=c.board.deepClone(),r=0;w(n,e,function(n,e){t[e][n]=0,r+=c.board[e][n]}),m({xBlock:n,yBlock:e,addScore:r}),l({type:"UPDATE",payload:{board:t,score:c.score+r}})},j=Object(a.useCallback)(function(n,e,t){var r,a=!0,o=g(c.draggableElements[t]);try{for(o.s();!(r=o.n()).done;){var i=r.value;void 0!==c.board[e+i.y]&&void 0!==c.board[e+i.y][n+i.x]&&0===c.board[e+i.y][n+i.x]||(a=!1)}}catch(l){o.e(l)}finally{o.f()}return a},[c]),k=function(){var n,e=g(c.draggableElements);try{for(e.s();!(n=e.n()).done;){var t=n.value;if(S(t))return!0}}catch(r){e.e(r)}finally{e.f()}return!1},S=function(n){for(var e=0;e<9;e++)for(var t=0;t<9;t++){var r,a=!0,o=g(n);try{for(o.s();!(r=o.n()).done;){var i=r.value;void 0!==c.board[e+i.y]&&void 0!==c.board[e+i.y][t+i.x]&&0===c.board[e+i.y][t+i.x]||(a=!1)}}catch(l){o.e(l)}finally{o.f()}if(a)return!0}return!1},A=Object(a.useMemo)(function(){return{board:c.board,draggableElements:c.draggableElements,score:c.score,firedScoreAnimation:s,dropElement:b,clearDraggableElements:x,canElementBeDropped:j,resetGame:v}},[c,b,x,j,s]);return o.a.createElement(E.Provider,{value:A},e)};function j(){var n=Object(r.a)(["\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: 100;\n  display: grid;\n  justify-content: center;\n  align-items: center;\n  animation: "," 0.6s ease-in-out 1;\n  animation-fill-mode: forwards;\n  user-select: none;\n"]);return j=function(){return n},n}function k(){var n=Object(r.a)(["\n  0%    {opacity: 0; transform: scale(0);}\n  20%   {opacity: 1; }\n  80%   {opacity: 0;}\n  99%   {opacity: 0; transform: scale(30)};\n  100%  { transform: scale(0)}\n"]);return k=function(){return n},n}var S=Object(c.c)(k()),A=c.b.div(j(),S),D=function(n){return o.a.createElement(A,{onAnimationEnd:n.onAnimationEnd},o.a.createElement("div",{unselectable:"on"},n.score))};function C(){var n=Object(r.a)(["\n  display: inline-block;\n  margin-top: ","%;\n  bottom: 0;\n"]);return C=function(){return n},n}function T(){var n=Object(r.a)(["\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: grid;\n  grid-template-columns: repeat(",", 1fr);\n  grid-row-gap: 0px;\n  grid-column-gap: 0px;\n  background-color: ",";\n"]);return T=function(){return n},n}function I(){var n=Object(r.a)(["\n  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.35);\n  display: inline-block;\n  position: relative;\n  width: 100%;\n  grid-column: 1 / 2;\n  z-index: 1;\n\n  @media (max-width: 768px) {\n    grid-column: 1 / 3;\n    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.35);\n  }\n"]);return I=function(){return n},n}var z=c.b.div(I()),M=c.b.div(T(),function(n){return n.width},"#D9DCE2"),P=c.b.div(C(),function(n){var e=n.width;return n.height/e*100}),R=o.a.memo(function(n){return o.a.createElement(z,null,o.a.createElement(P,{width:9,height:9}),o.a.createElement(M,{width:3},n.children))}),U=t(47);function W(){var n=Object(r.a)(["\n  position: relative;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n  background-color: ",";\n"]);return W=function(){return n},n}function B(){var n=Object(r.a)(["\n  display: relative;\n  margin-top: 100%;\n  bottom: 0;\n  z-index: -1;\n"]);return B=function(){return n},n}function N(){var n=Object(r.a)(["\n  width: 100%;\n  height: 100%;\n  transform: translateZ(0);\n  background-color: ",";\n  transition: background-color 0.4s ease-in-out;\n"]);return N=function(){return n},n}var H=c.b.div(N(),function(n){var e=n.value;return m[e]}),J=c.b.div(B()),G=c.b.div(W(),function(n){return n.isDroppable?"#CAE8D5":"rgba(209, 46, 46, 0.4)"}),L=o.a.memo(function(n){var e=Object(a.useContext)(E),t=e.board,r=e.dropElement,i=e.canElementBeDropped,c=Object(U.a)({accept:"ELEMENT",drop:function(e){r(n.x,n.y,e.index)},hover:function(n){s(n.index)},canDrop:function(e){return i(n.x,n.y,e.index)},collect:function(n){return{isOver:n.isOver()}}}),l=Object(f.a)(c,2),u=l[0].isOver,d=l[1],s=function(e){!u&&n.onHover(n.x,n.y,e)};return o.a.createElement(H,{value:t[n.y][n.x],ref:d},0!==n.hover&&o.a.createElement(G,{isDroppable:n.hover>=0}),o.a.createElement(J,null))}),$=t(46);function F(n){if("undefined"===typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(n=function(n,e){if(!n)return;if("string"===typeof n)return Z(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);"Object"===t&&n.constructor&&(t=n.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Z(n,e)}(n))){var e=0,t=function(){};return{s:t,n:function(){return e>=n.length?{done:!0}:{done:!1,value:n[e++]}},e:function(n){throw n},f:t}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,o=!0,i=!1;return{s:function(){r=n[Symbol.iterator]()},n:function(){var n=r.next();return o=n.done,n},e:function(n){i=!0,a=n},f:function(){try{o||null==r.return||r.return()}finally{if(i)throw a}}}}function Z(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function q(){var n=Object(r.a)(["\n  opacity: 1;\n  width: ","px;\n  height: ","px;\n\n  @media (max-width: 1200px) {\n    width: ","px;\n    height: ","px;\n  }\n\n  @media (max-width: 992px) {\n    width: ","px;\n    height: ","px;\n  }\n\n  @media (max-width: 576px) {\n    width: ","px;\n    height: ","px;\n  }\n"]);return q=function(){return n},n}function K(){var n=Object(r.a)(["\n  transform: translateZ(0);\n  grid-column: ",";\n  grid-row: ",";\n  background-color: ",";\n  padding-top: 100%;\n  opacity: ",";\n  transition: opacity 0.2s ease-in-out;\n  width: ","px;\n\n  @media (max-width: 1350px) {\n    width: ","px;\n  }\n\n  @media (max-width: 764px) {\n    width: ","px;\n  }\n"]);return K=function(){return n},n}function Q(){var n=Object(r.a)(["\n  position: relative;\n  grid-row-gap: 10px;\n  grid-column-gap: 10px;\n  margin: inherit;\n\n  left: ","px;\n  top: ","px;\n  width: ","px;\n\n  @media (max-width: 1200px) {\n    left: ","px;\n    top: ","px;\n    width: ","px;\n  }\n\n  @media (max-width: 992px) {\n    left: ","px;\n    top: ","px;\n    width: ","px;\n  }\n\n  @media (max-width: 576px) {\n    left: ","px;\n    top: ","px;\n    width: ","px;\n  }\n"]);return Q=function(){return n},n}function V(){var n=Object(r.a)(["\n  display: grid;\n  grid-template-columns: repeat(",", 1fr);\n  grid-row-gap: 1px;\n  grid-column-gap: 1px;\n  margin: auto;\n"]);return V=function(){return n},n}var X=35,Y=45,_=50,nn=60,en=22,tn=30,rn=40,an=c.b.div(V(),function(n){return n.width}),on=Object(c.b)(an)(Q(),function(n){return n.center.x*nn},function(n){return n.center.y*nn},function(n){return n.width*nn},function(n){return n.center.x*_},function(n){return n.center.y*_},function(n){return n.width*_},function(n){return n.center.x*Y},function(n){return n.center.y*Y},function(n){return n.width*Y},function(n){return n.center.x*X},function(n){return n.center.y*X},function(n){return n.width*X}),cn=c.b.div(K(),function(n){return n.x},function(n){return n.y},function(n){var e=n.val;return m[e]},function(n){return n.isDragging?.3:1},rn,tn,en),ln=Object(c.b)(cn)(q(),nn,nn,_,_,Y,Y,X,X),un=o.a.memo(function(n){var e=n.element,t=n.drag,r=n.isDragging,i=n.isDragPreview,c=Object(a.useState)({x:0,y:0}),l=Object(f.a)(c,2),u=l[0],d=l[1],s=Object(a.useState)({x:0,y:0}),p=Object(f.a)(s,2),m=p[0],v=p[1];return Object(a.useEffect)(function(){var n,t={x:e[0].x,y:e[0].y},r={x:e[0].x,y:e[0].y},a=F(e);try{for(a.s();!(n=a.n()).done;){var o=n.value;t={x:o.x>t.x?t.x:o.x,y:o.y>t.y?t.y:o.y},r={x:o.x<t.x?t.x:o.x,y:o.y<t.y?t.y:o.y}}}catch(i){a.e(i)}finally{a.f()}v(t),d(r)},[e]),i?o.a.createElement(on,{width:u.x-m.x+1,center:m},e.map(function(n,e){return o.a.createElement(ln,{key:e,x:n.x-m.x+1,y:n.y-m.y+1,val:n.val,isDragging:r})})):o.a.createElement(an,{width:u.x-m.x+1,center:m,ref:t},e.map(function(n,e){return o.a.createElement(cn,{key:e,x:n.x-m.x+1,y:n.y-m.y+1,val:n.val,isDragging:r})}))});function dn(){var n=Object(r.a)(["\n  position: fixed;\n  pointer-events: none;\n  z-index: 100;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n"]);return dn=function(){return n},n}var fn=c.b.div(dn());function sn(n){if(!n)return{display:"none"};var e=n.x,t=n.y,r="translate(".concat(e,"px, ").concat(t,"px)");return{transform:r,WebkitTransform:r}}var pn=o.a.memo(function(){var n=Object(a.useContext)(E).draggableElements,e=Object($.a)(function(n){return{item:n.getItem(),itemType:n.getItemType(),currentOffset:n.getSourceClientOffset(),isDragging:n.isDragging()}}),t=e.isDragging,r=e.item,i=e.currentOffset;return t&&0!==n.length&&"undefined"!==typeof r.index?o.a.createElement(fn,null,o.a.createElement("div",{style:sn(i)},o.a.createElement("div",null,o.a.createElement(un,{element:n[r.index],isDragging:t,isDragPreview:!0})))):null}),mn=t(48),vn=t(22),gn=o.a.memo(function(n){var e=n.element,t=n.index,r=n.setHover,i=Object(mn.a)({item:{type:"ELEMENT",index:t},end:function(){r(0,0,-1)},collect:function(n){return{isDragging:n.isDragging()}}}),c=Object(f.a)(i,3),l=c[0].isDragging,u=c[1],d=c[2];return Object(a.useEffect)(function(){d(Object(vn.a)(),{captureDraggingState:!0})},[]),o.a.createElement(un,{element:e,drag:u,isDragging:l})});function bn(){var n=Object(r.a)(["\n  @media (max-width: 768px) {\n    display: none;\n  }\n"]);return bn=function(){return n},n}function xn(){var n=Object(r.a)(["\n  margin-top: 15px;\n  margin-bottom: 15px;\n  width: 100%;\n  text-align: center;\n  user-select: none;\n\n  & p {\n    margin-bottom: 0;\n    margin-top: 10px;\n    font-size: 25pt;\n    line-height: 25pt;\n\n    @media (max-width: 768px) {\n      margin-top: 0;\n      font-size: 18pt;\n      line-height: 18pt;\n    }\n\n    @media (min-width: 992px) {\n      font-size: 40pt;\n      line-height: 40pt;\n    }\n  }\n"]);return xn=function(){return n},n}function yn(){var n=Object(r.a)(["\n  position: relative;\n  width: 100%;\n  display: grid;\n\n  @media (max-width: 768px) {\n    grid-template-columns: repeat(",", 1fr);\n    grid-column-gap: 10px;\n    min-height: 125px;\n  }\n\n  @media (min-width: 769px) {\n    height: 80%;\n    grid-template-rows: repeat(",", 1fr);\n    grid-row-gap: 10px;\n    justify-content: center;\n  }\n"]);return yn=function(){return n},n}function hn(){var n=Object(r.a)(["\n  position: relative;\n  width: 100%;\n  height: 97%;\n  margin-top: auto;\n  margin-bottom: auto;\n  background-color: ",";\n  border-radius: 0 10px 10px 0;\n\n  @media (max-width: 768px) {\n    width: 90%;\n    left: 5%;\n    top: 0;\n    height: 100%;\n    grid-column: 1 / 3;\n    border-radius: 0 0 5px 5px;\n    padding: 7px;\n  }\n"]);return hn=function(){return n},n}var wn=c.b.div(hn(),"#D9DCE2"),En=c.b.div(yn(),3,3),On=c.b.div(xn()),jn=Object(c.b)(On)(bn()),kn=function(n){var e=Object(a.useContext)(E),t=e.draggableElements,r=e.score;return o.a.createElement(wn,null,o.a.createElement(jn,null,"SCORE",o.a.createElement("p",null,r)),o.a.createElement(En,null,o.a.createElement(pn,null),t.map(function(e,t){return o.a.createElement(gn,{key:t,index:t,element:e,setHover:n.setHover})})))};function Sn(){var n=Object(r.a)(["\n  margin-top: 0;\n  font-size: 11pt;\n  margin-bottom: 5px;\n\n  @media (min-width: 769px) {\n    display: none;\n  }\n"]);return Sn=function(){return n},n}function An(){var n=Object(r.a)(["\n  width: 40%;\n  height: 100%;\n  left: 30%;\n  position: relative;\n  grid-column: 1 / 3;\n  grid-row: 1;\n  background-color: ",";\n  border-radius: 5px 5px 0 0;\n  color: #555;\n  padding: 5px 25px 5px 25px;\n  font-size: 14pt;\n  z-index: 0;\n\n  @media (min-width: 769px) {\n    display: none;\n  }\n"]);return An=function(){return n},n}var Dn=c.b.div(An(),"#D9DCE2"),Cn=Object(c.b)(On)(Sn()),Tn=function(){var n=Object(a.useContext)(E).score;return o.a.createElement(Dn,null,o.a.createElement(Cn,null,"SCORE",o.a.createElement("p",null,n)))};function In(n){if("undefined"===typeof Symbol||null==n[Symbol.iterator]){if(Array.isArray(n)||(n=function(n,e){if(!n)return;if("string"===typeof n)return zn(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);"Object"===t&&n.constructor&&(t=n.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return zn(n,e)}(n))){var e=0,t=function(){};return{s:t,n:function(){return e>=n.length?{done:!0}:{done:!1,value:n[e++]}},e:function(n){throw n},f:t}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,o=!0,i=!1;return{s:function(){r=n[Symbol.iterator]()},n:function(){var n=r.next();return o=n.done,n},e:function(n){i=!0,a=n},f:function(){try{o||null==r.return||r.return()}finally{if(i)throw a}}}}function zn(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function Mn(){var n=Object(r.a)(["\n  cursor: pointer;\n  grid-column: 1 / 3;\n  width: 100%;\n  margin-top: 25px;\n  padding: 13px;\n  background-color: rgb(254, 254, 254);\n  border: solid 1px #8c95a6;\n  color: #8c95a6;\n  border-radius: 10px;\n  font-size: 1.3rem;\n  font-weight: 600;\n\n  &:hover {\n    background-color: #84a9ac;\n    color: white;\n  }\n\n  @media (max-width: 768px) {\n    position: relative;\n    left: 5%;\n    width: 90%;\n  }\n"]);return Mn=function(){return n},n}function Pn(){var n=Object(r.a)(["\n  position: relative;\n  border: 1px solid ",";\n  display: grid;\n  grid-template-columns: repeat(",", 1fr);\n  grid-row-gap: 1px;\n  grid-column-gap: 1px;\n"]);return Pn=function(){return n},n}function Rn(){var n=Object(r.a)(["\n  position: relative;\n  top: 10px;\n  width: 85%;\n  left: 7.5%;\n  display: grid;\n  grid-template-columns: 80% 20%;\n\n  @media (min-width: 1200px) {\n    top: 25px;\n    width: 65%;\n    left: 17.5%;\n  }\n\n  @media (min-width: 1600px) {\n    width: 55%;\n    left: 22.5%;\n  }\n"]);return Rn=function(){return n},n}var Un=c.b.div(Rn()),Wn=c.b.div(Pn(),"#74D8C2",3),Bn=c.b.button(Mn()),Nn=function(){var n=Array(9).fill(0),e=Object(a.useState)(y()),t=Object(f.a)(e,2),r=t[0],i=t[1],c=Object(a.useState)(n),l=Object(f.a)(c,2),u=l[0],d=l[1],s=Object(a.useContext)(E),p=s.board,m=s.draggableElements,v=s.firedScoreAnimation,g=s.resetGame;Object(a.useEffect)(function(){d(function(n){return n.map(function(n,e){return e===3*v.yBlock+v.xBlock?v.addScore:n})})},[v]);var b=Object(a.useCallback)(function(){confirm("Do you really want to start a new game?")&&g()},[]),x=Object(a.useCallback)(function(n,e,t){var r,a=t>=0?m[t]:[],o=y(),c=!0,l=In(a);try{for(l.s();!(r=l.n()).done;){var u=r.value;void 0!==p[e+u.y]&&void 0!==p[e+u.y][n+u.x]?(o[e+u.y][n+u.x]=1,0!==p[e+u.y][n+u.x]&&(c=!1)):c=!1}}catch(d){l.e(d)}finally{l.f()}c||(o=o.map(function(n){return n.map(function(n){return 0!==n?-1*n:0})})),i(o)},[p,m]),h=Object(a.useCallback)(function(n,e){var t=[],a=3*e+n;return w(n,e,function(n,e){t.push(o.a.createElement(L,{key:"".concat(n).concat(e),x:n,y:e,hover:r[e][n],onHover:x}))}),o.a.createElement(Wn,{key:a},t,u[a]>0&&o.a.createElement(D,{score:u[a],onAnimationEnd:function(){return d(function(n){return n.map(function(n,e){return e===a?0:n})})}}))},[r,x,u]),O=Object(a.useCallback)(function(){for(var n=[],e=0;e<3;e++)for(var t=0;t<3;t++)n.push(h(t,e));return n},[h]);return o.a.createElement(Un,null,o.a.createElement(Tn,null),o.a.createElement(R,null,O()),o.a.createElement(kn,{setHover:x}),o.a.createElement(Bn,{onClick:function(){return b()}},"Reset Game"))},Hn={backends:[{backend:d.a,transition:l.b},{backend:u.a,options:{enableMouseEvents:!0},preview:!0,transition:l.c}]},Jn=function(){return o.a.createElement(l.a,{options:Hn},o.a.createElement(O,null,o.a.createElement(Nn,null)))};function Gn(){var n=Object(r.a)(["\n  position: relative;\n  top: 40px;\n  width: 85%;\n  left: 7.5%;\n  text-align: justify;\n\n  @media (min-width: 1200px) {\n    top: 75px;\n    width: 65%;\n    left: 17.5%;\n  }\n\n  @media (min-width: 1600px) {\n    width: 55%;\n    left: 22.5%;\n  }\n\n  & p {\n    margin-bottom: 40px;\n  }\n"]);return Gn=function(){return n},n}var Ln=c.b.div(Gn()),$n=function(){return o.a.createElement(Ln,null,o.a.createElement("h3",null,"Tetrisodoku"),o.a.createElement("p",null,"Tetrisodoku is a game combining the famous game Tetris and Sodoku. With each move you can chose between three Tetris tiles which you can drag and drop anywhere on the game board. Once you completely fill one of the marked squares on the gameboard, the blocks disappear and make room for new tiles to place. On top of that you will be credited the respective score. The darker the color of the Tetris blocks, the more points you will receive. Chose wiseley where to place your tiles as the game is over when none of the tiles can be placed on the board any more."),o.a.createElement("h3",null,"Source code"),o.a.createElement("p",null,"This game is a little fun project written in Typescript and React. If you are interested in the source code please visit the"," ",o.a.createElement("a",{href:"https://github.com/MuellerMarius/tetrisudoku"},"Github repository"),". I would be happy if you leave a comment or suggestion for improvement! Thanks and stay healthy!"))},Fn=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Zn(n,e){navigator.serviceWorker.register(n).then(function(n){n.onupdatefound=function(){var t=n.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),e&&e.onUpdate&&e.onUpdate(n)):(console.log("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(n)))})}}).catch(function(n){console.error("Error during service worker registration:",n)})}function qn(){var n=Object(r.a)(["\n  body {\n    background: #fefefe;\n    background: linear-gradient(0deg, rgba(254,254,254,1) 60%, rgba(20,40,51,0.75) 60%);\n    background-repeat: no-repeat;\n    font-family: 'Noto Sans TC', sans-serif;\n    font-size: 12pt;\n    color: #323232;\n\n    @media (max-width: 700px) {\n      background: #fefefe;  \n      background: linear-gradient(0deg, rgba(254,254,254,1) 70%, rgba(20,40,51,0.75) 70%);\n      background-repeat: no-repeat;\n    }\n\n    @media (max-width: 400px) {\n      background: #fefefe;  \n      background: linear-gradient(0deg, rgba(254,254,254,1) 80%, rgba(20,40,51,0.75) 80%);\n      background-repeat: no-repeat;\n      font-size: 11pt;\n    }\n  }\n  * {\n    box-sizing: border-box;\n  }\n"]);return qn=function(){return n},n}var Kn=Object(c.a)(qn());function Qn(){return a.createElement("main",null,a.createElement(Kn,null),a.createElement(Jn,null),a.createElement($n,null))}var Vn=document.getElementById("root");Object(i.render)(a.createElement(Qn,null),Vn),function(n){if("serviceWorker"in navigator){if(new URL("/tetrisudoku",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/tetrisudoku","/service-worker.js");Fn?(function(n,e){fetch(n,{headers:{"Service-Worker":"script"}}).then(function(t){var r=t.headers.get("content-type");404===t.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then(function(n){n.unregister().then(function(){window.location.reload()})}):Zn(n,e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e,n),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):Zn(e,n)})}}()}},[[33,2,1]]]);
//# sourceMappingURL=main.0cc05395.chunk.js.map
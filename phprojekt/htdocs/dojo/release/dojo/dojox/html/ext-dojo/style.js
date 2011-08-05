/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.html.ext-dojo.style"]||(dojo._hasResource["dojox.html.ext-dojo.style"]=!0,dojo.provide("dojox.html.ext-dojo.style"),dojo.experimental("dojox.html.ext-dojo.style"),dojo.mixin(dojox.html["ext-dojo"].style,{supportsTransform:!0,_toPx:function(l){var n=dojo.style,j=this._conversion;if(typeof l==="number")return l+"px";else if(l.toLowerCase().indexOf("px")!=-1)return l;!j.parentNode&&dojo.place(j,dojo.body());n(j,"margin",l);return n(j,"margin")},init:function(){var l=dojo.style,
n=dojo.doc.documentElement.style,j=dojox.html["ext-dojo"].style;dojo.style=function(c,b,g){var m=dojo.byId(c),n=b=="transform",A=b=="transformOrigin",w=arguments.length;w==3&&(n?j.setTransform(m,g,!0):A?j.setTransformOrigin(m,g):l(c,b,g));if(w==2)return n?j.getTransform(c):A?j.getTransformOrigin(c):l(c,b)};for(var b=0,g=["WebkitT","MozT","OT","t"];b<g.length;b++){if(typeof n[g[b]+"ransform"]!=="undefined")this.tPropertyName=g[b]+"ransform";if(typeof n[g[b]+"ransformOrigin"]!=="undefined")this.toPropertyName=
g[b]+"ransformOrigin"}if(this.tPropertyName)this.setTransform=function(b,f){return dojo.style(b,this.tPropertyName,f)},this.getTransform=function(b){return dojo.style(b,this.tPropertyName)};else if(dojo.isIE)this.setTransform=this._setTransformFilter,this.getTransform=this._getTransformFilter;this.toPropertyName?(this.setTransformOrigin=function(b,f){return dojo.style(b,this.toPropertyName,f)},this.getTransformOrigin=function(b){return dojo.style(b,this.toPropertyName)}):dojo.isIE?(this.setTransformOrigin=
this._setTransformOriginFilter,this.getTransformOrigin=this._getTransformOriginFilter):this.supportsTransform=!1;this._conversion=dojo.create("div",{style:{position:"absolute",top:"-100px",left:"-100px",fontSize:0,width:"0",backgroundPosition:"50% 50%"}})},_notSupported:function(){console.warn("Sorry, this browser doesn't support transform and transform-origin")},_setTransformOriginFilter:function(l,n){for(var j=dojo.trim(n).replace(" top"," 0").replace("left ","0 ").replace(" center","50%").replace("center ",
"50% ").replace(" bottom"," 100%").replace("right ","100% ").replace(/\s+/," ").split(" "),b=dojo.byId(l),g=this.getTransform(b),c=!0,f=0;f<j.length;f++)c=c&&/^0|(\d+(%|px|pt|in|pc|mm|cm))$/.test(j[f]),j[f].indexOf("%")==-1&&(j[f]=this._toPx(j[f]));c&&j.length&&!(j.length>2)&&(dojo.attr(b,"dojo-transform-origin",j.join(" ")),g&&this.setTransform(l,g))},_getTransformOriginFilter:function(l){return dojo.attr(l,"dojo-transform-origin")||"50% 50%"},_setTransformFilter:function(l,n){var j=n.replace(/\s/g,
""),b=dojo.byId(l),g=j.split(")"),c=1,f=1,j=dojo.hasAttr,q=dojo.attr,m=Math.PI,D=Math.cos,A=Math.sin,w=Math.tan,o=Math.max,r=Math.min,x=Math.abs,y=m/180,z=m/200,d="",d="",d=[],s=0,u=0,v=0,B=0,p=0,k=0,c=0,c=1,h=f=0,e=1,t=0,i=0,a=[c,f,h,e,t,i],u=!1,m=dojo.style,C=m(b,"position")=="absolute"?"absolute":"relative",p=m(b,"width")+m(b,"paddingLeft")+m(b,"paddingRight"),s=m(b,"height")+m(b,"paddingTop")+m(b,"paddingBottom"),v=this._toPx;!j(b,"dojo-transform-origin")&&this.setTransformOrigin(b,"50% 50%");
k=0;for(B=g.length;k<B;k++){d=(d=g[k].match(/matrix|rotate|scaleX|scaleY|scale|skewX|skewY|skew|translateX|translateY|translate/))?d[0]:"";switch(d){case "matrix":d=g[k].replace(/matrix\(|\)/g,"");i=d.split(",");c=a[0]*i[0]+a[1]*i[2];f=a[0]*i[1]+a[1]*i[3];h=a[2]*i[0]+a[3]*i[2];e=a[2]*i[1]+a[3]*i[3];t=a[4]+i[4];i=a[5]+i[5];break;case "rotate":d=g[k].replace(/rotate\(|\)/g,"");c=d.indexOf("deg")!=-1?y:d.indexOf("grad")!=-1?z:1;c*=parseFloat(d);e=A(c);d=D(c);c=a[0]*d+a[1]*e;f=-a[0]*e+a[1]*d;h=a[2]*d+
a[3]*e;e=-a[2]*e+a[3]*d;break;case "skewX":d=g[k].replace(/skewX\(|\)/g,"");c=d.indexOf("deg")!=-1?y:d.indexOf("grad")!=-1?z:1;e=w(parseFloat(d)*c);c=a[0];f=a[0]*e+a[1];h=a[2];e=a[2]*e+a[3];break;case "skewY":d=g[k].replace(/skewY\(|\)/g,"");c=d.indexOf("deg")!=-1?y:d.indexOf("grad")!=-1?z:1;e=w(parseFloat(d)*c);c=a[0]+a[1]*e;f=a[1];h=a[2]+a[3]*e;e=a[3];break;case "skew":d=g[k].replace(/skew\(|\)/g,"");h=d.split(",");h[1]=h[1]||"0";c=h[0].indexOf("deg")!=-1?y:h[0].indexOf("grad")!=-1?z:1;f=h[1].indexOf("deg")!=
-1?y:h[1].indexOf("grad")!=-1?z:1;e=w(parseFloat(h[0])*c);h=w(parseFloat(h[1])*f);c=a[0]+a[1]*h;f=a[0]*e+a[1];h=a[2]+a[3]*h;e=a[2]*e+a[3];break;case "scaleX":d=parseFloat(g[k].replace(/scaleX\(|\)/g,""))||1;c=a[0]*d;f=a[1];h=a[2]*d;e=a[3];break;case "scaleY":d=parseFloat(g[k].replace(/scaleY\(|\)/g,""))||1;c=a[0];f=a[1]*d;h=a[2];e=a[3]*d;break;case "scale":d=g[k].replace(/scale\(|\)/g,"");e=d.split(",");e[1]=e[1]||e[0];c=a[0]*e[0];f=a[1]*e[1];h=a[2]*e[0];e=a[3]*e[1];break;case "translateX":d=parseInt(g[k].replace(/translateX\(|\)/g,
""))||1;c=a[0];f=a[1];h=a[2];e=a[3];(t=v(d))&&q(b,"dojo-transform-matrix-tx",t);break;case "translateY":d=parseInt(g[k].replace(/translateY\(|\)/g,""))||1;c=a[0];f=a[1];h=a[2];e=a[3];(i=v(d))&&q(b,"dojo-transform-matrix-ty",i);break;case "translate":d=g[k].replace(/translate\(|\)/g,""),c=a[0],f=a[1],h=a[2],e=a[3],i=d.split(","),i[0]=parseInt(v(i[0]))||0,i[1]=parseInt(v(i[1]))||0,t=i[0],i=i[1],t&&q(b,"dojo-transform-matrix-tx",t),i&&q(b,"dojo-transform-matrix-ty",i)}a=[c,f,h,e,t,i]}g=r(p*c+s*f,r(r(p*
c,s*f),0));r=r(p*h+s*e,r(r(p*h,s*e),0));v=-g;B=-r;if(dojo.isIE<8)b.style.zoom="1",C!="absolute"&&(r=m(l.parentNode,"width"),g=x(p*c),x=x(s*f),o=o(g+x,o(o(x,g),0)),v-=(o-p)/2-(r>o?0:(o-r)/2));else if(dojo.isIE==8)m(b,"zIndex")=="auto"&&(b.style.zIndex="0");try{u=!!b.filters.item("DXImageTransform.Microsoft.Matrix")}catch(E){u=!1}u?(b.filters.item("DXImageTransform.Microsoft.Matrix").M11=c,b.filters.item("DXImageTransform.Microsoft.Matrix").M12=f,b.filters.item("DXImageTransform.Microsoft.Matrix").M21=
h,b.filters.item("DXImageTransform.Microsoft.Matrix").M22=e,b.filters.item("DXImageTransform.Microsoft.Matrix").filterType="bilinear",b.filters.item("DXImageTransform.Microsoft.Matrix").Dx=0,b.filters.item("DXImageTransform.Microsoft.Matrix").Dy=0,b.filters.item("DXImageTransform.Microsoft.Matrix").sizingMethod="auto expand"):b.style.filter+=" progid:DXImageTransform.Microsoft.Matrix(M11="+c+",M12="+f+",M21="+h+",M22="+e+",FilterType='bilinear',Dx=0,Dy=0,sizingMethod='auto expand')";t=parseInt(q(b,
"dojo-transform-matrix-tx")||"0");i=parseInt(q(b,"dojo-transform-matrix-ty")||"0");o=q(b,"dojo-transform-origin").split(" ");for(k=0;k<2;k++)o[k]=o[k]||"50%";p=o[0].toString().indexOf("%")!=-1?p*parseInt(o[0])*0.01:o[0];k=o[1].toString().indexOf("%")!=-1?s*parseInt(o[1])*0.01:o[1];j(b,"dojo-startX")?s=parseInt(q(b,"dojo-startX")):(s=parseInt(m(b,"left")),q(b,"dojo-startX",C=="absolute"?s:"0"));j(b,"dojo-startY")?u=parseInt(q(b,"dojo-startY")):(u=parseInt(m(b,"top")),q(b,"dojo-startY",C=="absolute"?
u:"0"));m(b,{position:C,left:s-parseInt(v)+parseInt(p)-((parseInt(p)-t)*c+(parseInt(k)-i)*f)+"px",top:u-parseInt(B)+parseInt(k)-((parseInt(p)-t)*h+(parseInt(k)-i)*e)+"px"})},_getTransformFilter:function(l){try{var n=dojo.byId(l).filters.item(0);return"matrix("+n.M11+", "+n.M12+", "+n.M21+", "+n.M22+", "+(dojo.attr(l,"dojo-transform-tx")||"0")+", "+(dojo.attr(l,"dojo-transform-ty")||"0")+")"}catch(j){return"matrix(1, 0, 0, 1, 0, 0)"}},setTransform:function(){this._notSupported()},setTransformOrigin:function(){this._notSupported()}}),
dojox.html["ext-dojo"].style.init());
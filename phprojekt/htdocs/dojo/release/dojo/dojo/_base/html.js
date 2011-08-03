/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojo._base.html"]){dojo._hasResource["dojo._base.html"]=!0;dojo.provide("dojo._base.html");dojo.require("dojo._base.lang");try{document.execCommand("BackgroundImageCache",!1,!0)}catch(e){}dojo.byId=dojo.isIE?function(d,h){if(typeof d!="string")return d;var m=h||dojo.doc,n=m.getElementById(d);if(n&&(n.attributes.id.value==d||n.id==d))return n;else{m=m.all[d];if(!m||m.nodeName)m=[m];for(var p=0;n=m[p++];)if(n.attributes&&n.attributes.id&&n.attributes.id.value==d||n.id==d)return n}}:
function(d,h){return(typeof d=="string"?(h||dojo.doc).getElementById(d):d)||null};(function(){var d=dojo,h=d.byId,m=null,n;d.addOnWindowUnload(function(){m=null});dojo._destroyElement=dojo.destroy=function(a){a=h(a);try{var c=a.ownerDocument;if(!m||n!=c)m=c.createElement("div"),n=c;m.appendChild(a.parentNode?a.parentNode.removeChild(a):a);m.innerHTML=""}catch(b){}};dojo.isDescendant=function(a,c){try{a=h(a);for(c=h(c);a;){if(a==c)return!0;a=a.parentNode}}catch(b){}return!1};dojo.setSelectable=function(a,
c){a=h(a);if(d.isMozilla)a.style.MozUserSelect=c?"":"none";else if(d.isKhtml||d.isWebKit)a.style.KhtmlUserSelect=c?"auto":"none";else if(d.isIE){var b=a.unselectable=c?"":"on";d.query("*",a).forEach("item.unselectable = '"+b+"'")}};var p=function(a,c){var b=c.parentNode;b&&b.insertBefore(a,c)};dojo.place=function(a,c,b){c=h(c);typeof a=="string"&&(a=/^\s*</.test(a)?d._toDom(a,c.ownerDocument):h(a));if(typeof b=="number"){var f=c.childNodes;!f.length||f.length<=b?c.appendChild(a):p(a,f[b<0?0:b])}else switch(b){case "before":p(a,
c);break;case "after":b=a;(f=c.parentNode)&&(f.lastChild==c?f.appendChild(b):f.insertBefore(b,c.nextSibling));break;case "replace":c.parentNode.replaceChild(a,c);break;case "only":d.empty(c);c.appendChild(a);break;case "first":if(c.firstChild){p(a,c.firstChild);break}default:c.appendChild(a)}return a};dojo.boxModel="content-box";if(d.isIE)d.boxModel=document.compatMode=="BackCompat"?"border-box":"content-box";var l;l=d.isWebKit?function(a){var c;if(a.nodeType==1){var b=a.ownerDocument.defaultView;
c=b.getComputedStyle(a,null);if(!c&&a.style)a.style.display="",c=b.getComputedStyle(a,null)}return c||{}}:d.isIE?function(a){return a.nodeType==1?a.currentStyle:{}}:function(a){return a.nodeType==1?a.ownerDocument.defaultView.getComputedStyle(a,null):{}};dojo.getComputedStyle=l;d._toPixelValue=d.isIE?function(a,c){if(!c)return 0;if(c=="medium")return 4;if(c.slice&&c.slice(-2)=="px")return parseFloat(c);with(a){var b=style.left,f=runtimeStyle.left;runtimeStyle.left=currentStyle.left;try{style.left=
c,c=style.pixelLeft}catch(d){c=0}style.left=b;runtimeStyle.left=f}return c}:function(a,c){return parseFloat(c)||0};var k=d._toPixelValue,s=function(a,c){try{return a.filters.item("DXImageTransform.Microsoft.Alpha")}catch(b){return c?{}:null}};dojo._getOpacity=d.isIE<9?function(a){try{return s(a).Opacity/100}catch(c){return 1}}:function(a){return l(a).opacity};dojo._setOpacity=d.isIE<9?function(a,c){var b=c*100,f=c==1;a.style.zoom=f?"":1;if(s(a))s(a,1).Opacity=b;else{if(f)return c;a.style.filter+=
" progid:DXImageTransform.Microsoft.Alpha(Opacity="+b+")"}s(a,1).Enabled=!f;a.nodeName.toLowerCase()=="tr"&&d.query("> td",a).forEach(function(a){d._setOpacity(a,c)});return c}:function(a,c){return a.style.opacity=c};var w={left:!0,top:!0},F=/margin|padding|width|height|max|min|offset/,G=function(a,c,b){c=c.toLowerCase();if(d.isIE){if(b=="auto"){if(c=="height")return a.offsetHeight;if(c=="width")return a.offsetWidth}if(c=="fontweight")switch(b){case 700:return"bold";default:return"normal"}}c in w||
(w[c]=F.test(c));return w[c]?k(a,b):b},o=d.isIE?"styleFloat":"cssFloat",H={cssFloat:o,styleFloat:o,"float":o};dojo.style=function(a,c,b){var f=h(a),g=arguments.length,i=c=="opacity",c=H[c]||c;if(g==3)return i?d._setOpacity(f,b):f.style[c]=b;if(g==2&&i)return d._getOpacity(f);i=l(f);if(g==2&&typeof c!="string"){for(var j in c)d.style(a,j,c[j]);return i}return g==1?i:G(f,c,i[c]||f.style[c])};dojo._getPadExtents=function(a,c){var b=c||l(a),f=k(a,b.paddingLeft),d=k(a,b.paddingTop);return{l:f,t:d,w:f+
k(a,b.paddingRight),h:d+k(a,b.paddingBottom)}};dojo._getBorderExtents=function(a,c){var b=c||l(a),f=b.borderLeftStyle!="none"?k(a,b.borderLeftWidth):0,d=b.borderTopStyle!="none"?k(a,b.borderTopWidth):0;return{l:f,t:d,w:f+(b.borderRightStyle!="none"?k(a,b.borderRightWidth):0),h:d+(b.borderBottomStyle!="none"?k(a,b.borderBottomWidth):0)}};dojo._getPadBorderExtents=function(a,c){var b=c||l(a),f=d._getPadExtents(a,b),b=d._getBorderExtents(a,b);return{l:f.l+b.l,t:f.t+b.t,w:f.w+b.w,h:f.h+b.h}};dojo._getMarginExtents=
function(a,c){var b=c||l(a),f=k(a,b.marginLeft),g=k(a,b.marginTop),i=k(a,b.marginRight),j=k(a,b.marginBottom);d.isWebKit&&b.position!="absolute"&&(i=f);return{l:f,t:g,w:f+i,h:g+j}};dojo._getMarginBox=function(a,c){var b=c||l(a),f=d._getMarginExtents(a,b),g=a.offsetLeft-f.l,i=a.offsetTop-f.t,j=a.parentNode;if(d.isMoz){var h=parseFloat(b.left),b=parseFloat(b.top);!isNaN(h)&&!isNaN(b)?(g=h,i=b):j&&j.style&&(h=l(j),h.overflow!="visible"&&(j=d._getBorderExtents(j,h),g+=j.l,i+=j.t))}else if((d.isOpera||
d.isIE>7&&!d.isQuirks)&&j)j=d._getBorderExtents(j),g-=j.l,i-=j.t;return{l:g,t:i,w:a.offsetWidth+f.w,h:a.offsetHeight+f.h}};dojo._getMarginSize=function(a,c){var a=h(a),b=d._getMarginExtents(a,c||l(a)),f=a.getBoundingClientRect();return{w:f.right-f.left+b.w,h:f.bottom-f.top+b.h}};dojo._getContentBox=function(a,c){var b=c||l(a),f=d._getPadExtents(a,b),b=d._getBorderExtents(a,b),g=a.clientWidth,i;g?(i=a.clientHeight,b.w=b.h=0):(g=a.offsetWidth,i=a.offsetHeight);d.isOpera&&(f.l+=b.l,f.t+=b.t);return{l:f.l,
t:f.t,w:g-f.w-b.w,h:i-f.h-b.h}};dojo._getBorderBox=function(a,c){var b=c||l(a),f=d._getPadExtents(a,b),b=d._getContentBox(a,b);return{l:b.l-f.l,t:b.t-f.t,w:b.w+f.w,h:b.h+f.h}};dojo._setBox=function(a,c,b,f,d,i){i=i||"px";a=a.style;if(!isNaN(c))a.left=c+i;if(!isNaN(b))a.top=b+i;if(f>=0)a.width=f+i;if(d>=0)a.height=d+i};dojo._isButtonTag=function(a){return a.tagName=="BUTTON"||a.tagName=="INPUT"&&(a.getAttribute("type")||"").toUpperCase()=="BUTTON"};dojo._usesBorderBox=function(a){var c=a.tagName;return d.boxModel==
"border-box"||c=="TABLE"||d._isButtonTag(a)};dojo._setContentSize=function(a,c,b,f){d._usesBorderBox(a)&&(f=d._getPadBorderExtents(a,f),c>=0&&(c+=f.w),b>=0&&(b+=f.h));d._setBox(a,NaN,NaN,c,b)};dojo._setMarginBox=function(a,c,b,f,g,i){var h=i||l(a),i=d._usesBorderBox(a)?I:d._getPadBorderExtents(a,h);if(d.isWebKit&&d._isButtonTag(a)){var k=a.style;if(f>=0&&!k.width)k.width="4px";if(g>=0&&!k.height)k.height="4px"}h=d._getMarginExtents(a,h);f>=0&&(f=Math.max(f-i.w-h.w,0));g>=0&&(g=Math.max(g-i.h-h.h,
0));d._setBox(a,c,b,f,g)};var I={l:0,t:0,w:0,h:0};dojo.marginBox=function(a,c){var b=h(a),f=l(b);return!c?d._getMarginBox(b,f):d._setMarginBox(b,c.l,c.t,c.w,c.h,f)};dojo.contentBox=function(a,c){var b=h(a),f=l(b);return!c?d._getContentBox(b,f):d._setContentSize(b,c.w,c.h,f)};dojo._docScroll=function(){var a=d.global;return"pageXOffset"in a?{x:a.pageXOffset,y:a.pageYOffset}:(a=d.isQuirks?d.doc.body:d.doc.documentElement,{x:d._fixIeBiDiScrollLeft(a.scrollLeft||0),y:a.scrollTop||0})};dojo._isBodyLtr=
function(){return"_bodyLtr"in d?d._bodyLtr:d._bodyLtr=(d.body().dir||d.doc.documentElement.dir||"ltr").toLowerCase()=="ltr"};dojo._getIeDocumentElementOffset=function(){var a=d.doc.documentElement;if(d.isIE<8){var c=a.getBoundingClientRect(),b=c.left,c=c.top;d.isIE<7&&(b+=a.clientLeft,c+=a.clientTop);return{x:b<0?0:b,y:c<0?0:c}}else return{x:0,y:0}};dojo._fixIeBiDiScrollLeft=function(a){var c=d.isIE;if(c&&!d._isBodyLtr()){var b=d.isQuirks,f=b?d.doc.body:d.doc.documentElement;c==6&&!b&&d.global.frameElement&&
f.scrollHeight>f.clientHeight&&(a+=f.clientLeft);return c<8||b?a+f.clientWidth-f.scrollWidth:-a}return a};dojo._abs=dojo.position=function(a,c){var a=h(a),b=d.body(),f=b.parentNode,g=a.getBoundingClientRect(),g={x:g.left,y:g.top,w:g.right-g.left,h:g.bottom-g.top};d.isIE?(f=d._getIeDocumentElementOffset(),g.x-=f.x+(d.isQuirks?b.clientLeft+b.offsetLeft:0),g.y-=f.y+(d.isQuirks?b.clientTop+b.offsetTop:0)):d.isFF==3&&(b=l(f),g.x-=k(f,b.marginLeft)+k(f,b.borderLeftWidth),g.y-=k(f,b.marginTop)+k(f,b.borderTopWidth));
c&&(b=d._docScroll(),g.x+=b.x,g.y+=b.y);return g};dojo.coords=function(a,c){var b=h(a),f=l(b),f=d._getMarginBox(b,f),b=d.position(b,c);f.x=b.x;f.y=b.y;return f};var x={"class":"className","for":"htmlFor",tabindex:"tabIndex",readonly:"readOnly",colspan:"colSpan",frameborder:"frameBorder",rowspan:"rowSpan",valuetype:"valueType"},t={classname:"class",htmlfor:"for",tabindex:"tabIndex",readonly:"readOnly"},z={innerHTML:1,className:1,htmlFor:d.isIE,value:1},y=function(a,c){var b=a.getAttributeNode&&a.getAttributeNode(c);
return b&&b.specified};dojo.hasAttr=function(a,c){var b=c.toLowerCase();return z[x[b]||c]||y(h(a),t[b]||c)};var u={},J=0,A=dojo._scopeName+"attrid",K={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};dojo.attr=function(a,c,b){var a=h(a),f=arguments.length;if(f==2&&typeof c!="string"){for(var g in c)d.attr(a,g,c[g]);return a}var i=c.toLowerCase();g=x[i]||c;var j=z[g],i=t[i]||c;if(f==3){if(g=="style"&&typeof b!="string")d.style(a,b);else if(g=="innerHTML")d.isIE&&a.tagName.toLowerCase()in
K?(d.empty(a),a.appendChild(d._toDom(b,a.ownerDocument))):a[g]=b;else if(d.isFunction(b)){f=d.attr(a,A);f||(f=J++,d.attr(a,A,f));u[f]||(u[f]={});if(j=u[f][g])d.disconnect(j);else try{delete a[g]}catch(k){}u[f][g]=d.connect(a,g,b)}else j||typeof b=="boolean"?a[g]=b:a.setAttribute(i,b);return a}b=a[g];return j&&typeof b!="undefined"?b:g!="href"&&(typeof b=="boolean"||d.isFunction(b))?b:y(a,i)?a.getAttribute(i):null};dojo.removeAttr=function(a,c){h(a).removeAttribute(t[c.toLowerCase()]||c)};dojo.getNodeProp=
function(a,c){var a=h(a),b=c.toLowerCase(),f=x[b]||c;if(f in a&&f!="href")return a[f];b=t[b]||c;return y(a,b)?a.getAttribute(b):null};dojo.create=function(a,c,b,f){var g=d.doc;if(b)b=h(b),g=b.ownerDocument;typeof a=="string"&&(a=g.createElement(a));c&&d.attr(a,c);b&&d.place(a,b,f);return a};d.empty=d.isIE?function(a){for(var a=h(a),c;c=a.lastChild;)d.destroy(c)}:function(a){h(a).innerHTML=""};var q={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table",
"tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},L=/<\s*([\w\:]+)/,B={},M=0,C="__"+d._scopeName+"ToDomId",v;for(v in q)if(q.hasOwnProperty(v))o=q[v],o.pre=v=="option"?'<select multiple="multiple">':"<"+o.join("><")+">",o.post="</"+o.reverse().join("></")+">";d._toDom=function(a,c){var c=c||d.doc,b=c[C];b||(c[C]=b=++M+"",B[b]=c.createElement("div"));a+="";var f=a.match(L),g=f?f[1].toLowerCase():"",b=B[b];if(f&&q[g]){f=
q[g];b.innerHTML=f.pre+a+f.post;for(f=f.length;f;--f)b=b.firstChild}else b.innerHTML=a;if(b.childNodes.length==1)return b.removeChild(b.firstChild);for(g=c.createDocumentFragment();f=b.firstChild;)g.appendChild(f);return g};dojo.hasClass=function(a,c){return(" "+h(a).className+" ").indexOf(" "+c+" ")>=0};var N=/\s+/,D=[""],r={},E=function(a){return typeof a=="string"||a instanceof String?a.indexOf(" ")<0?(D[0]=a,D):a.split(N):a||""};dojo.addClass=function(a,c){var a=h(a),c=E(c),b=a.className,f,b=
b?" "+b+" ":" ";f=b.length;for(var d=0,i=c.length,j;d<i;++d)(j=c[d])&&b.indexOf(" "+j+" ")<0&&(b+=j+" ");f<b.length&&(a.className=b.substr(1,b.length-2))};dojo.removeClass=function(a,c){var a=h(a),b;if(c!==void 0){c=E(c);b=" "+a.className+" ";for(var f=0,g=c.length;f<g;++f)b=b.replace(" "+c[f]+" "," ");b=d.trim(b)}else b="";a.className!=b&&(a.className=b)};dojo.replaceClass=function(a,c,b){a=h(a);r.className=a.className;dojo.removeClass(r,b);dojo.addClass(r,c);if(a.className!==r.className)a.className=
r.className};dojo.toggleClass=function(a,c,b){b===void 0&&(b=!d.hasClass(a,c));d[b?"addClass":"removeClass"](a,c)}})()};
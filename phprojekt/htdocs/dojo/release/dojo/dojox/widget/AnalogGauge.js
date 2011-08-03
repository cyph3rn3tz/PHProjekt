/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.widget.AnalogGauge"]||(dojo._hasResource["dojox.widget.AnalogGauge"]=!0,dojo.provide("dojox.widget.AnalogGauge"),dojo.require("dojox.gfx"),dojo.require("dojox.widget.gauge._Gauge"),dojo.experimental("dojox.widget.AnalogGauge"),dojo.declare("dojox.widget.gauge.AnalogLineIndicator",[dojox.widget.gauge._Indicator],{_getShapes:function(){return[this._gauge.surface.createLine({x1:0,y1:-this.offset,x2:0,y2:-this.length-this.offset}).setStroke({color:this.color,width:this.width})]},
draw:function(a){if(this.shapes)this._move(a);else{if(this.text)this._gauge.surface.rawNode.removeChild(this.text),this.text=null;a=this._gauge._getAngle(Math.min(Math.max(this.value,this._gauge.min),this._gauge.max));this.color=this.color||"#000000";this.length=this.length||this._gauge.radius;this.width=this.width||1;this.offset=this.offset||0;this.highlight=this.highlight||"#D0D0D0";if(this.shapes=this._getShapes(this._gauge,this))for(var b=0;b<this.shapes.length;b++)if(this.shapes[b].setTransform([{dx:this._gauge.cx,
dy:this._gauge.cy},dojox.gfx.matrix.rotateg(a)]),this.hover&&this.shapes[b].getEventSource().setAttribute("hover",this.hover),this.onDragMove&&!this.noChange)this._gauge.connect(this.shapes[b].getEventSource(),"onmousedown",this._gauge.handleMouseDown),this.shapes[b].getEventSource().style.cursor="pointer";if(this.label){var c=this.length+this.offset,d=this._gauge._getRadians(a),b=this._gauge.cx+(c+5)*Math.sin(d),c=this._gauge.cy-(c+5)*Math.cos(d),d="start",e=Math.abs(a);a<=-10&&(d="end");e<10&&(d=
"middle");a="bottom";e>90&&(a="top");this.text=this._gauge.drawText(""+this.label,b,c,d,a,this.color,this.font)}this.currentValue=this.value}},_move:function(a){var b=Math.min(Math.max(this.value,this._gauge.min),this._gauge.max),c=this.currentValue;if(a){var a=this._gauge._getAngle(b),d;for(d in this.shapes)this.shapes[d].setTransform([{dx:this._gauge.cx,dy:this._gauge.cy},dojox.gfx.matrix.rotateg(a)]),this.hover&&this.shapes[d].getEventSource().setAttribute("hover",this.hover)}else c!=b&&(d=new dojo.Animation({curve:[c,
b],duration:this.duration,easing:this.easing}),dojo.connect(d,"onAnimate",dojo.hitch(this,function(a){for(var b in this.shapes)this.shapes[b].setTransform([{dx:this._gauge.cx,dy:this._gauge.cy},dojox.gfx.matrix.rotateg(this._gauge._getAngle(a))]),this.hover&&this.shapes[b].getEventSource().setAttribute("hover",this.hover);this.currentValue=a})),d.play())}}),dojo.declare("dojox.widget.AnalogGauge",dojox.widget.gauge._Gauge,{startAngle:-90,endAngle:90,cx:0,cy:0,radius:0,_defaultIndicator:dojox.widget.gauge.AnalogLineIndicator,
startup:function(){this.getChildren&&dojo.forEach(this.getChildren(),function(a){a.startup()});this.startAngle=Number(this.startAngle);this.endAngle=Number(this.endAngle);this.cx=Number(this.cx);if(!this.cx)this.cx=this.width/2;this.cy=Number(this.cy);if(!this.cy)this.cy=this.height/2;this.radius=Number(this.radius);if(!this.radius)this.radius=Math.min(this.cx,this.cy)-25;this._oppositeMiddle=(this.startAngle+this.endAngle)/2+180;this.inherited(arguments)},_getAngle:function(a){return(a-this.min)/
(this.max-this.min)*(this.endAngle-this.startAngle)+this.startAngle},_getValueForAngle:function(a){a>this._oppositeMiddle&&(a-=360);return(a-this.startAngle)*(this.max-this.min)/(this.endAngle-this.startAngle)+this.min},_getRadians:function(a){return a*Math.PI/180},_getDegrees:function(a){return a*180/Math.PI},draw:function(){var a;if(this._rangeData){for(a=0;a<this._rangeData.length;a++)this.drawRange(this._rangeData[a]);this._img&&this.image.overlay&&this._img.moveToFront()}if(this._indicatorData)for(a=
0;a<this._indicatorData.length;a++)this._indicatorData[a].draw()},drawRange:function(a){var b;if(a.shape)this.surface.remove(a.shape),a.shape=null;var c,d;if(a.low==this.min&&a.high==this.max&&this.endAngle-this.startAngle==360)b=this.surface.createCircle({cx:this.cx,cy:this.cy,r:this.radius});else{c=this._getRadians(this._getAngle(a.low));d=this._getRadians(this._getAngle(a.high));var e=this.cx+this.radius*Math.sin(c),g=this.cy-this.radius*Math.cos(c),h=this.cx+this.radius*Math.sin(d),i=this.cy-
this.radius*Math.cos(d),f=0;d-c>Math.PI&&(f=1);b=this.surface.createPath();a.size?b.moveTo(this.cx+(this.radius-a.size)*Math.sin(c),this.cy-(this.radius-a.size)*Math.cos(c)):b.moveTo(this.cx,this.cy);b.lineTo(e,g);b.arcTo(this.radius,this.radius,0,f,1,h,i);a.size&&(b.lineTo(this.cx+(this.radius-a.size)*Math.sin(d),this.cy-(this.radius-a.size)*Math.cos(d)),b.arcTo(this.radius-a.size,this.radius-a.size,0,f,0,this.cx+(this.radius-a.size)*Math.sin(c),this.cy-(this.radius-a.size)*Math.cos(c)));b.closePath()}dojo.isArray(a.color)||
dojo.isString(a.color)?(b.setStroke({color:a.color}),b.setFill(a.color)):a.color.type?(c=this._getRadians(this._getAngle(a.low)),d=this._getRadians(this._getAngle(a.high)),a.color.x1=this.cx+this.radius*Math.sin(c)/2,a.color.x2=this.cx+this.radius*Math.sin(d)/2,a.color.y1=this.cy-this.radius*Math.cos(c)/2,a.color.y2=this.cy-this.radius*Math.cos(d)/2,b.setFill(a.color),b.setStroke({color:a.color.colors[0].color})):(b.setStroke({color:"green"}),b.setFill("green"),b.getEventSource().setAttribute("class",
a.color.style));a.hover&&b.getEventSource().setAttribute("hover",a.hover);a.shape=b},getRangeUnderMouse:function(a){var b=null,c=dojo.coords(this.gaugeContent),d=a.clientX-c.x,a=a.clientY-c.y;if(Math.sqrt((a-this.cy)*(a-this.cy)+(d-this.cx)*(d-this.cx))<this.radius&&(d=this._getValueForAngle(this._getDegrees(Math.atan2(a-this.cy,d-this.cx)+Math.PI/2)),this._rangeData))for(a=0;a<this._rangeData.length&&!b;a++)Number(this._rangeData[a].low)<=d&&Number(this._rangeData[a].high)>=d&&(b=this._rangeData[a]);
return b},_dragIndicator:function(a,b){var c=dojo.coords(a.gaugeContent),c=a._getDegrees(Math.atan2(b.clientY-c.y-a.cy,b.clientX-c.x-a.cx)+Math.PI/2),c=a._getValueForAngle(c),c=Math.min(Math.max(c,a.min),a.max);a._drag.value=a._drag.currentValue=c;a._drag.onDragMove(a._drag);a._drag.draw(!0);dojo.stopEvent(b)}}));
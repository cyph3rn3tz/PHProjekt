/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["dojox.grid.cells.tree"])dojo._hasResource["dojox.grid.cells.tree"]=!0,dojo.provide("dojox.grid.cells.tree"),dojo.require("dojox.grid.cells"),dojox.grid.cells.TreeCell={formatAggregate:function(a,d,c){var b=this.grid,a=b.aggregator?b.aggregator.getForCell(this,d,a,d===this.level?"cnt":this.parentCell.aggregate):this.value||this.defaultValue;return this._defaultFormat(a,[a,d-this.level,c,this])},formatIndexes:function(a,d){var c=this.grid.edit.info,b=this.get?this.get(a[0],d,
a):this.value||this.defaultValue;return this.editable&&(this.alwaysEditing||c.rowIndex==a[0]&&c.cell==this)?this.formatEditing(b,a[0],a):this._defaultFormat(b,[b,a[0],a,this])},getOpenState:function(a){var d=this.grid,c=d.store,b=null;c.isItem(a)&&(b=a,a=c.getIdentity(a));if(!this.openStates)this.openStates={};if(typeof a!="string"||!(a in this.openStates))this.openStates[a]=d.getDefaultOpenState(this,b);return this.openStates[a]},formatAtLevel:function(a,d,c,b,g,f){dojo.isArray(a)||(a=[a]);var e=
"";if(c>this.level||c===this.level&&b)f.push("dojoxGridSpacerCell"),c===this.level&&f.push("dojoxGridTotalCell"),e="<span></span>";else if(c<this.level)f.push("dojoxGridSummaryCell"),e='<span class="dojoxGridSummarySpan">'+this.formatAggregate(d,c,a)+"</span>";else{b="";if(this.isCollapsable)b=this.grid.store,e="",b.isItem(d)&&(e=b.getIdentity(d)),f.push("dojoxGridExpandoCell"),b='<span dojoType="dojox.grid._Expando" level="'+c+'" class="dojoxGridExpando"" toggleClass="'+g+'" itemId="'+e+'" cellIdx="'+
this.index+'"></span>';e=b+this.formatIndexes(a,d)}this.grid.focus.cell&&this.index==this.grid.focus.cell.index&&a.join("/")==this.grid.focus.rowIndex&&f.push(this.grid.focus.focusClass);return e}};
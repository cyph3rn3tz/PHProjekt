//>>built
define("dijit/layout/LinkPane",["./ContentPane","../_TemplatedMixin","dojo/_base/declare"],function(a,b,c){return c("dijit.layout.LinkPane",[a,b],{templateString:'<div class="dijitLinkPane" data-dojo-attach-point="containerNode"></div>',postMixInProperties:function(){this.srcNodeRef&&(this.title+=this.srcNodeRef.innerHTML);this.inherited(arguments)},_fillContent:function(){}})});
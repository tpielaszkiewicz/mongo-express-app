/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./LabelEnablement","sap/ui/base/Object","sap/ui/performance/trace/Interaction","sap/base/util/uid","sap/ui/util/ActivityDetection","sap/ui/thirdparty/jquery","sap/base/security/encodeXML","sap/base/security/encodeCSS","sap/base/assert","sap/ui/performance/Measurement","sap/base/Log","sap/base/util/extend","./InvisibleRenderer","./Patcher"],function(e,t,r,n,i,s,a,o,l,u,f,d,c,p){"use strict";var h=["renderControl","cleanupControlWithoutRendering","accessibilityState","icon"];var g=["write","writeEscaped","writeAcceleratorKey","writeControlData","writeElementData","writeAttribute","writeAttributeEscaped","addClass","writeClasses","addStyle","writeStyles","writeAccessibilityState","writeIcon","translate","getConfiguration","getHTML"];var m=["openStart","voidStart","attr","class","style","openEnd","voidEnd","text","unsafeHtml","close"];var y=["render","flush","destroy"];function v(){var e=this,n,o,d,C,I,E,A="",S=false,P,R="",T={},N={};this._setFocusHandler=function(e){l(e&&t.isA(e,"sap.ui.core.FocusHandler"),"oFocusHandler must be an sap.ui.core.FocusHandler");n=e};function x(){o=e.aBuffer=[];d=e.aRenderedControls=[];C=e.aStyleStack=[{}];P=undefined;S=false;A=""}function M(e,t){l(e&&typeof e=="string"&&/^[a-z_][a-zA-Z0-9_\-]*$/.test(e),"The "+t+" name provided '"+e+"' is not valid; it must contain alphanumeric characters, hyphens or underscores")}function H(e){l(A,"There is no open tag; '"+e+"' must not be called without an open tag")}function _(e){var t=e===undefined?!A:e;l(t,"There is an open tag; '"+A+"' tag has not yet ended with '"+(S?"voidEnd":"openEnd")+"'")}function B(e){M(e,"attr");l(e!="class"&&e!="style","Attributes 'class' and 'style' must not be written, instead use dedicated 'class' or 'style' method")}function O(e){l(typeof e=="string"&&!/\s/.test(e)&&arguments.length===1,"Method 'class' must be called with exactly one class name")}function j(e){l(e&&typeof e=="string"&&!/\s/.test(e),"Method 'style' must be called with a non-empty string name")}this.write=function(e){l(typeof e==="string"||typeof e==="number","sText must be a string or number");o.push.apply(o,arguments);return this};this.writeEscaped=function(e,t){if(e!=null){e=a(String(e));if(t){e=e.replace(/&#xa;/g,"<br>")}o.push(e)}return this};this.writeAttribute=function(e,t){l(typeof e==="string","sName must be a string");l(typeof t==="string"||typeof t==="number"||typeof t==="boolean","value must be a string, number or boolean");o.push(" ",e,'="',t,'"');return this};this.writeAttributeEscaped=function(e,t){l(typeof e==="string","sName must be a string");o.push(" ",e,'="',a(String(t)),'"');return this};this.addStyle=function(e,t){l(typeof e==="string","sName must be a string");if(t!=null&&t!=""){l(typeof t==="string"||typeof t==="number","value must be a string or number");var r=C[C.length-1];if(!r.aStyle){r.aStyle=[]}r.aStyle.push(e+": "+t+";")}return this};this.writeStyles=function(){var e=C[C.length-1];if(e.aStyle&&e.aStyle.length){this.writeAttribute("style",e.aStyle.join(" "))}e.aStyle=null;return this};this.addClass=function(e){if(e){l(typeof e==="string","sName must be a string");var t=C[C.length-1];if(!t.aClasses){t.aClasses=[]}t.aClasses.push(e)}return this};this.writeClasses=function(e){l(!e||typeof e==="boolean"||t.isA(e,"sap.ui.core.Element"),"oElement must be empty, a boolean, or an sap.ui.core.Element");var r=C[C.length-1];var n;if(e){n=e.aCustomStyleClasses}else if(e===false){n=[]}else{n=r.aCustomStyleClasses}if(r.aClasses||n){var i=[].concat(r.aClasses||[],n||[]);if(i.length){this.writeAttribute("class",i.join(" "))}}if(!e){r.aCustomStyleClasses=null}r.aClasses=null;return this};this.openStart=function(e,t){M(e,"tag");_();A=e;this.write("<"+e);if(t){if(typeof t=="string"){this.attr("id",t)}else{this.writeElementData(t)}}return this};this.openEnd=function(e){H("openEnd");_(!S);l(e===undefined||e===true,"The private parameter bExludeStyleClasses must be true or omitted!");A="";this.writeClasses(e===true?false:undefined);this.writeStyles();this.write(">");return this};this.close=function(e){M(e,"tag");_();this.write("</"+e+">");return this};this.voidStart=function(e,t){this.openStart(e,t);S=true;return this};this.voidEnd=function(e){H("voidEnd");_(S||!A);S=false;A="";this.writeClasses(e?false:undefined);this.writeStyles();this.write(">");return this};this.unsafeHtml=function(e){_();this.write(e);return this};this.text=function(e){_();this.writeEscaped(e);return this};this.attr=function(e,t){B(e);this.writeAttributeEscaped(e,t);return this};this.class=function(e){if(e){O.apply(this,arguments);this.addClass(a(e))}return this};this.style=function(e,t){j(e);this.addStyle(e,t);return this};this.accessibilityState=this.writeAccessibilityState;this.icon=this.writeIcon;N.openStart=function(e,t){M(e,"tag");_();A=e;if(!t){p.openStart(e)}else if(typeof t=="string"){p.openStart(e,t)}else{p.openStart(e,t.getId());D(this,t)}return this};N.voidStart=function(e,t){this.openStart(e,t);S=true;return this};N.attr=function(e,t){B(e);H("attr");p.attr(e,t);return this};N.class=function(e){if(e){O.apply(this,arguments);H("class");p.class(e)}return this};N.style=function(e,t){j(e);H("style");p.style(e,t);return this};N.openEnd=function(e){if(e!==true){var t=C[C.length-1];var r=t.aCustomStyleClasses;if(r){r.forEach(p.class,p);t.aCustomStyleClasses=null}}H("openEnd");_(!S);l(e===undefined||e===true,"The private parameter bExludeStyleClasses must be true or omitted!");A="";p.openEnd();return this};N.voidEnd=function(e){if(!e){var t=C[C.length-1];var r=t.aCustomStyleClasses;if(r){r.forEach(p.class,p);t.aCustomStyleClasses=null}}H("voidEnd");_(S||!A);S=false;A="";p.voidEnd();return this};N.text=function(e){_();if(e!=null){p.text(e)}return this};N.unsafeHtml=function(e){_();p.unsafeHtml(e);return this};N.close=function(e){M(e,"tag");_();p.close(e);return this};function U(e){E=true;try{var t=new s.Event("BeforeRendering");t.srcControl=e;e._handleEvent(t)}finally{E=false}}this.cleanupControlWithoutRendering=function(e){l(!e||t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control or empty");if(!e){return}var r=e.getDomRef();if(r){U(e);v.preserveContent(r,false,false);if(!r.hasAttribute(w)){e.bOutput=false}}};this.renderControl=function(e){l(!e||t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control or empty");if(!e){return this}if(!I){I=[]}if(I&&I.length>0){u.pause(I[0]+"---renderControl")}else if(e.getParent()&&e.getParent().getMetadata().getName()=="sap.ui.core.UIArea"){u.pause(e.getParent().getId()+"---rerender")}I.unshift(e.getId());u.start(e.getId()+"---renderControl","Rendering of "+e.getMetadata().getName(),["rendering","control"]);U(e);u.pause(e.getId()+"---renderControl");var r;var i=e.getMetadata();var a=e.getVisible();if(a){r=i.getRenderer()}else{var h=i.getProperty("visible");var g=h&&h._oParent&&h._oParent.getName()=="sap.ui.core.Control";r=g?c:i.getRenderer()}u.resume(e.getId()+"---renderControl");var m=e.aBindParameters,y;if(m&&m.length>0&&(y=e.getDomRef())){var b=s(y);for(var w=0;w<m.length;w++){var E=m[w];b.off(E.sEventType,E.fnProxy)}}if(r&&typeof r.render==="function"){if(o.length){P=false}else if(P===undefined){y=e.getDomRef();if(!y&&!a){y=document.getElementById(c.createInvisiblePlaceholderId(e))}if(y&&v.getApiVersion(r)==2&&!v.isPreservedContent(y)){n&&n.storePatchingControlFocusInfo(y);p.setRootNode(y);P=true}else{P=false}}else if(!R&&P){if(v.getApiVersion(r)!=2){R=e.getId();P=false}}var A={};if(e.aCustomStyleClasses&&e.aCustomStyleClasses.length>0){A.aCustomStyleClasses=e.aCustomStyleClasses}C.push(A);if(P){var S=p.getCurrentNode();r.render(N,e);if(p.getCurrentNode()==S){p.unsafeHtml("",e.getId());e.bOutput=false}else{e.bOutput=true}}else{var D=o.length;r.render(T,e);e.bOutput=o.length!==D}C.pop();if(R&&R===e.getId()){p.unsafeHtml(o.join(""),R);R="";P=true;o=[]}}else{f.error("The renderer for class "+i.getName()+" is not defined or does not define a render function! Rendering of "+e.getId()+" will be skipped!")}d.push(e);if(e.getUIArea&&e.getUIArea()){e.getUIArea()._onControlRendered(e)}if(r===c){e.bOutput="invisible"}u.end(e.getId()+"---renderControl");I.shift();if(I&&I.length>0){u.resume(I[0]+"---renderControl")}else if(e.getParent()&&e.getParent().getMetadata().getName()=="sap.ui.core.UIArea"){u.resume(e.getParent().getId()+"---rerender")}return this};this.getHTML=function(e){l(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");var r=o;var n=o=this.aBuffer=[];this.renderControl(e);o=this.aBuffer=r;return n.join("")};function L(e){var t,r=d.length;for(t=0;t<r;t++){d[t]._sapui_bInAfterRenderingPhase=true}E=true;try{for(t=0;t<r;t++){var i=d[t];if(i.bOutput&&i.bOutput!=="invisible"){var a=new s.Event("AfterRendering");a.srcControl=i;u.start(i.getId()+"---AfterRendering","AfterRendering of "+i.getMetadata().getName(),["rendering","after"]);i._handleEvent(a);u.end(i.getId()+"---AfterRendering")}}}finally{for(t=0;t<r;t++){delete d[t]._sapui_bInAfterRenderingPhase}E=false}try{n.restoreFocus(e)}catch(e){f.warning("Problems while restoring the focus after rendering: "+e,null)}for(t=0;t<r;t++){var i=d[t],o=i.aBindParameters,l;if(o&&o.length>0&&(l=i.getDomRef())){var c=s(l);for(var p=0;p<o.length;p++){var h=o[p];c.on(h.sEventType,h.fnProxy)}}}}function k(e,t){var r;if(!P){r=n&&n.getControlFocusInfo();e(o.join(""))}else{r=n&&n.getPatchingControlFocusInfo();p.reset()}L(r);x();i.refresh();if(t){t()}}this.flush=function(e,t,n){l(typeof e==="object"&&e.ownerDocument==document,"oTargetDomNode must be a DOM element");var i=r.notifyAsyncStep();if(!t&&typeof n!=="number"&&!n){v.preserveContent(e)}k(function(t){for(var r=0;r<d.length;r++){var i=d[r].getDomRef();if(i&&!v.isPreservedContent(i)){if(v.isInlineTemplate(i)){s(i).empty()}else{s(i).remove()}}}if(typeof n==="number"){if(n<=0){s(e).prepend(t)}else{var a=s(e).children().eq(n-1);if(a.length===1){a.after(t)}else{s(e).append(t)}}}else if(!n){s(e).html(t)}else{s(e).append(t)}},i)};this.render=function(e,n){l(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be a control");l(typeof n==="object"&&n.ownerDocument==document,"oTargetDomNode must be a DOM element");if(E){f.error("Render must not be called within Before or After Rendering Phase. Call ignored.",null,this);return}var i=r.notifyAsyncStep();x();this.renderControl(e);k(function(t){if(e&&n){var r=e.getDomRef();if(!r||v.isPreservedContent(r)){r=document.getElementById(c.createInvisiblePlaceholderId(e))||document.getElementById(b.Dummy+e.getId())}var i=r&&r.parentNode!=n;var a=function(){var e=s(n);if(n.innerHTML==""){e.html(t)}else{e.append(t)}};if(i){if(!v.isPreservedContent(r)){if(v.isInlineTemplate(r)){s(r).empty()}else{s(r).remove()}}if(t){a()}}else{if(t){if(r){if(v.isInlineTemplate(r)){s(r).html(t)}else{s(r).replaceWith(t)}}else{a()}}else{if(v.isInlineTemplate(r)){s(r).empty()}else{if(!e.getParent()||!e.getParent()._onChildRerenderedEmpty||!e.getParent()._onChildRerenderedEmpty(e,r)){s(r).remove()}}}}}},i)};this.destroy=function(){x()};var F={};h.forEach(function(e){T[e]=N[e]=F[e]=this[e]},this);m.forEach(function(e){T[e]=F[e]=this[e]},this);g.forEach(function(e){T[e]=F[e]=this[e]},this);y.forEach(function(e){F[e]=this[e]},this);this.getRendererInterface=function(){return T};this.getInterface=function(){return F};x()}v.prototype.getConfiguration=function(){return sap.ui.getCore().getConfiguration()};v.prototype.translate=function(e){};v.prototype.writeAcceleratorKey=function(){return this};v.prototype.writeControlData=function(e){l(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");this.writeElementData(e);return this};v.prototype.writeElementData=function(e){l(e&&t.isA(e,"sap.ui.core.Element"),"oElement must be an sap.ui.core.Element");this.attr("id",e.getId());D(this,e);return this};v.prototype.writeAccessibilityState=function(r,n){if(!sap.ui.getCore().getConfiguration().getAccessibility()){return this}if(arguments.length==1&&!t.isA(r,"sap.ui.core.Element")){n=r;r=null}var i={};if(r!=null){var s=r.getMetadata();var a=function(e,t,n){var a=s.getProperty(e);if(a&&r[a._sGetter]()===n){i[t]="true"}};var o=function(t,n){var a=s.getAssociation(t);if(a&&a.multiple){var o=r[a._sGetter]();if(t=="ariaLabelledBy"){var l=e.getReferencingLabels(r);var u=l.length;if(u){var f=[];for(var d=0;d<u;d++){if(o.indexOf(l[d])<0){f.push(l[d])}}o=f.concat(o)}}if(o.length>0){i[n]=o.join(" ")}}};a("editable","readonly",false);a("enabled","disabled",false);a("visible","hidden",false);if(e.isRequired(r)){i["required"]="true"}a("selected","selected",true);a("checked","checked",true);o("ariaDescribedBy","describedby");o("ariaLabelledBy","labelledby")}if(n){var l=function(e){var t=typeof e;return e===null||t==="number"||t==="string"||t==="boolean"};var u={};var f,d,c;for(f in n){d=n[f];if(l(d)){u[f]=d}else if(typeof d==="object"&&l(d.value)){c="";if(d.append&&(f==="describedby"||f==="labelledby")){c=i[f]?i[f]+" ":""}u[f]=c+d.value}}Object.assign(i,u)}if(t.isA(r,"sap.ui.core.Element")&&r.getParent()&&r.getParent().enhanceAccessibilityState){r.getParent().enhanceAccessibilityState(r,i)}for(var p in i){if(i[p]!=null&&i[p]!==""){this.attr(p==="role"?p:"aria-"+p,i[p])}}return this};v.prototype.writeIcon=function(e,t,r){var i=sap.ui.requireSync("sap/ui/core/IconPool"),s=i.isIconURI(e),a=false,l,u,c,p,h;if(typeof t==="string"){t=[t]}if(s){u=i.getIconInfo(e);if(!u){f.error("An unregistered icon: "+e+" is used in sap.ui.core.RenderManager's writeIcon method.");return this}if(!t){t=[]}t.push("sapUiIcon");if(!u.suppressMirroring){t.push("sapUiIconMirrorInRTL")}}if(s){this.openStart("span")}else{this.voidStart("img")}if(Array.isArray(t)){t.forEach(function(e){this.class(e)},this)}if(s){c={"data-sap-ui-icon-content":u.content,role:"presentation",title:u.text||null};this.style("font-family","'"+o(u.fontFamily)+"'")}else{c={role:"presentation",alt:"",src:e}}r=d(c,r);if(!r.id){r.id=n()}if(s){p=r.alt||r.title||u.text||u.name;h=r.id+"-label";if(r["aria-labelledby"]){a=true;r["aria-labelledby"]+=" "+h}else if(!r.hasOwnProperty("aria-label")){r["aria-label"]=p}}if(typeof r==="object"){for(l in r){if(r.hasOwnProperty(l)&&r[l]!==null){this.attr(l,r[l])}}}if(s){this.openEnd();if(a){this.openStart("span");this.style("display","none");this.attr("id",h);this.openEnd();this.text(p);this.close("span")}this.close("span")}else{this.voidEnd()}return this};v.prototype.getRenderer=function(e){l(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");return v.getRenderer(e)};var b=v.RenderPrefixes={Invisible:c.PlaceholderPrefix,Dummy:"sap-ui-dummy-",Temporary:"sap-ui-tmp-"};v.getRenderer=function(e){l(e&&t.isA(e,"sap.ui.core.Control"),"oControl must be an sap.ui.core.Control");return e.getMetadata().getRenderer()};v.forceRepaint=function(e){var t=e?window.document.getElementById(e):null;var r=typeof e=="string"?t:e;if(r){f.debug("forcing a repaint for "+(r.id||String(r)));var n=r.style.display;var i=document.activeElement;r.style.display="none";r.offsetHeight;r.style.display=n;if(document.activeElement!==i&&i){i.focus()}}};v.createInvisiblePlaceholderId=function(e){return c.createInvisiblePlaceholderId(e)};var C="sap-ui-preserve",I="sap-ui-static",w="data-sap-ui-preserve",E="data-sap-ui-area";function A(){var e=s(document.getElementById(C));if(e.length===0){e=s("<div></div>",{"aria-hidden":"true",id:C}).addClass("sapUiHidden").addClass("sapUiForcedHidden").css("width","0").css("height","0").css("overflow","hidden").appendTo(document.body)}return e}function S(e){s("<div></div>",{id:b.Dummy+e.id}).addClass("sapUiHidden").insertBefore(e)}var P=[];v.attachPreserveContent=function(e,t){v.detachPreserveContent(e);P.push({fn:e,context:t})};v.detachPreserveContent=function(e){P=P.filter(function(t){return t.fn!==e})};v.preserveContent=function(e,t,r,n){l(typeof e==="object"&&e.ownerDocument==document,"oRootNode must be a DOM element");P.forEach(function(t){t.fn.call(t.context||v,{domNode:e})});var i=A();function a(t){while(t&&t!=e&&t.parentNode){t=t.parentNode;if(t.hasAttribute(w)){return true}if(t.hasAttribute("data-sap-ui")){break}}}function o(e,t,r){if(e===t){return true}for(var n=t.getParent();n;n=n.isA("sap.ui.core.UIComponent")?n.oContainer:n.getParent()){if(n.isA("sap.ui.core.Control")){if(!n.getVisible()){return false}var i=n.getDomRef();if(i&&!i.contains(r)){return false}}if(n===e){return true}}}function f(t){if(t.id===C||t.id===I){return}var l=t.getAttribute(w);if(l){if(n){var u=sap.ui.getCore().byId(l);if(u&&o(n,u,t)){return}}if(t===e||a(t)){S(t)}i.append(t)}else if(r&&t.id){v.markPreservableContent(s(t),t.id);i.append(t);return}if(!t.hasAttribute(E)){var d=t.firstChild;while(d){t=d;d=d.nextSibling;if(t.nodeType===1){f(t)}}}}u.start(e.id+"---preserveContent","preserveContent for "+e.id,["rendering","preserve"]);if(t){f(e)}else{s(e).children().each(function(e,t){f(t)})}u.end(e.id+"---preserveContent")};v.findPreservedContent=function(e){l(typeof e==="string","sId must be a string");var t=A(),r=t.children("["+w+"='"+e.replace(/(:|\.)/g,"\\$1")+"']");return r};v.markPreservableContent=function(e,t){e.attr(w,t)};v.isPreservedContent=function(e){return e&&e.getAttribute(w)&&e.parentNode&&e.parentNode.id==C};v.getPreserveAreaRef=function(){return A()[0]};var R="data-sap-ui-template";v.markInlineTemplate=function(e){e.attr(R,"")};v.isInlineTemplate=function(e){return e&&e.hasAttribute(R)};v.getApiVersion=function(e){if(e.hasOwnProperty("apiVersion")){return e.apiVersion}return 1};function D(e,t){var r=t.getId();e.attr("data-sap-ui",r);t.getCustomData().forEach(function(r){var n=r._checkWriteToDom(t);if(n){e.attr(n.key.toLowerCase(),n.value)}});var n=t.getDragDropConfig().some(function(e){return e.isDraggable(t)});if(!n){var i=t.getParent();if(i&&i.getDragDropConfig){n=i.getDragDropConfig().some(function(e){return e.isDraggable(t)})}}if(n){e.attr("draggable","true");e.attr("data-sap-ui-draggable","true")}return this}return v},true);
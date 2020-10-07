/*!
 * jQuery UI Widget 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
(function(t,e){var i=0,n=Array.prototype.slice,s=t.cleanData;t.cleanData=function(e){for(var i=0,n;(n=e[i])!=null;i++){try{t(n).triggerHandler("remove")}catch(t){}}s(e)};t.widget=function(e,i,n){var s,o,r,a,u={},d=e.split(".")[0];e=e.split(".")[1];s=d+"-"+e;if(!n){n=i;i=t.Widget}t.expr[":"][s.toLowerCase()]=function(e){return!!t.data(e,s)};t[d]=t[d]||{};o=t[d][e];r=t[d][e]=function(t,e){if(!this._createWidget){return new r(t,e)}if(arguments.length){this._createWidget(t,e)}};t.extend(r,o,{version:n.version,_proto:t.extend({},n),_childConstructors:[]});a=new i;a.options=t.widget.extend({},a.options);t.each(n,function(e,n){if(!t.isFunction(n)){u[e]=n;return}u[e]=function(){var t=function(){return i.prototype[e].apply(this,arguments)},s=function(t){return i.prototype[e].apply(this,t)};return function(){var e=this._super,i=this._superApply,o;this._super=t;this._superApply=s;o=n.apply(this,arguments);this._super=e;this._superApply=i;return o}}()});r.prototype=t.widget.extend(a,{widgetEventPrefix:o?a.widgetEventPrefix||e:e},u,{constructor:r,namespace:d,widgetName:e,widgetFullName:s});if(o){t.each(o._childConstructors,function(e,i){var n=i.prototype;t.widget(n.namespace+"."+n.widgetName,r,i._proto)});delete o._childConstructors}else{i._childConstructors.push(r)}t.widget.bridge(e,r)};t.widget.extend=function(i){var s=n.call(arguments,1),o=0,r=s.length,a,u;for(;o<r;o++){for(a in s[o]){u=s[o][a];if(s[o].hasOwnProperty(a)&&u!==e){if(t.isPlainObject(u)){i[a]=t.isPlainObject(i[a])?t.widget.extend({},i[a],u):t.widget.extend({},u)}else{i[a]=u}}}}return i};t.widget.bridge=function(i,s){var o=s.prototype.widgetFullName||i;t.fn[i]=function(r){var a=typeof r==="string",u=n.call(arguments,1),d=this;r=!a&&u.length?t.widget.extend.apply(null,[r].concat(u)):r;if(a){this.each(function(){var n,s=t.data(this,o);if(!s){return t.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+r+"'")}if(!t.isFunction(s[r])||r.charAt(0)==="_"){return t.error("no such method '"+r+"' for "+i+" widget instance")}n=s[r].apply(s,u);if(n!==s&&n!==e){d=n&&n.jquery?d.pushStack(n.get()):n;return false}})}else{this.each(function(){var e=t.data(this,o);if(e){e.option(r||{})._init()}else{t.data(this,o,new s(r,this))}})}return d}};t.Widget=function(){};t.Widget._childConstructors=[];t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:false,create:null},_createWidget:function(e,n){n=t(n||this.defaultElement||this)[0];this.element=t(n);this.uuid=i++;this.eventNamespace="."+this.widgetName+this.uuid;this.options=t.widget.extend({},this.options,this._getCreateOptions(),e);this.bindings=t();this.hoverable=t();this.focusable=t();if(n!==this){t.data(n,this.widgetFullName,this);this._on(true,this.element,{remove:function(t){if(t.target===n){this.destroy()}}});this.document=t(n.style?n.ownerDocument:n.document||n);this.window=t(this.document[0].defaultView||this.document[0].parentWindow)}this._create();this._trigger("create",null,this._getCreateEventData());this._init()},_getCreateOptions:t.noop,_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){this._destroy();this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName));this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled");this.bindings.unbind(this.eventNamespace);this.hoverable.removeClass("ui-state-hover");this.focusable.removeClass("ui-state-focus")},_destroy:t.noop,widget:function(){return this.element},option:function(i,n){var s=i,o,r,a;if(arguments.length===0){return t.widget.extend({},this.options)}if(typeof i==="string"){s={};o=i.split(".");i=o.shift();if(o.length){r=s[i]=t.widget.extend({},this.options[i]);for(a=0;a<o.length-1;a++){r[o[a]]=r[o[a]]||{};r=r[o[a]]}i=o.pop();if(arguments.length===1){return r[i]===e?null:r[i]}r[i]=n}else{if(arguments.length===1){return this.options[i]===e?null:this.options[i]}s[i]=n}}this._setOptions(s);return this},_setOptions:function(t){var e;for(e in t){this._setOption(e,t[e])}return this},_setOption:function(t,e){this.options[t]=e;if(t==="disabled"){this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!e).attr("aria-disabled",e);this.hoverable.removeClass("ui-state-hover");this.focusable.removeClass("ui-state-focus")}return this},enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_on:function(e,i,n){var s,o=this;if(typeof e!=="boolean"){n=i;i=e;e=false}if(!n){n=i;i=this.element;s=this.widget()}else{i=s=t(i);this.bindings=this.bindings.add(i)}t.each(n,function(n,r){function a(){if(!e&&(o.options.disabled===true||t(this).hasClass("ui-state-disabled"))){return}return(typeof r==="string"?o[r]:r).apply(o,arguments)}if(typeof r!=="string"){a.guid=r.guid=r.guid||a.guid||t.guid++}var u=n.match(/^(\w+)\s*(.*)$/),d=u[1]+o.eventNamespace,l=u[2];if(l){s.delegate(l,d,a)}else{i.bind(d,a)}})},_off:function(t,e){e=(e||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace;t.unbind(e).undelegate(e)},_delay:function(t,e){function i(){return(typeof t==="string"?n[t]:t).apply(n,arguments)}var n=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e);this._on(e,{mouseenter:function(e){t(e.currentTarget).addClass("ui-state-hover")},mouseleave:function(e){t(e.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e);this._on(e,{focusin:function(e){t(e.currentTarget).addClass("ui-state-focus")},focusout:function(e){t(e.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(e,i,n){var s,o,r=this.options[e];n=n||{};i=t.Event(i);i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase();i.target=this.element[0];o=i.originalEvent;if(o){for(s in o){if(!(s in i)){i[s]=o[s]}}}this.element.trigger(i,n);return!(t.isFunction(r)&&r.apply(this.element[0],[i].concat(n))===false||i.isDefaultPrevented())}};t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(n,s,o){if(typeof s==="string"){s={effect:s}}var r,a=!s?e:s===true||typeof s==="number"?i:s.effect||i;s=s||{};if(typeof s==="number"){s={duration:s}}r=!t.isEmptyObject(s);s.complete=o;if(s.delay){n.delay(s.delay)}if(r&&t.effects&&t.effects.effect[a]){n[e](s)}else if(a!==e&&n[a]){n[a](s.duration,s.easing,o)}else{n.queue(function(i){t(this)[e]();if(o){o.call(n[0])}i()})}}})})(jQuery);
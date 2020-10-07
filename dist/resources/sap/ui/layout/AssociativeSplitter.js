/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Splitter","./SplitterRenderer","sap/base/Log","sap/ui/layout/SplitterLayoutData"],function(e,t,i,s){"use strict";var a=e.extend("sap.ui.layout.AssociativeSplitter",{metadata:{associations:{associatedContentAreas:{type:"sap.ui.core.Control",multiple:true,singularName:"associatedContentArea"}}},renderer:t});a.prototype.init=function(){e.prototype.init.call(this);this._keyListeners={increase:this._onKeyboardResize.bind(this,"inc",1),decrease:this._onKeyboardResize.bind(this,"dec",1),increaseMore:this._onKeyboardResize.bind(this,"incMore",2),decreaseMore:this._onKeyboardResize.bind(this,"decMore",2),max:this._onKeyboardResize.bind(this,"max",1),min:this._onKeyboardResize.bind(this,"min",1)};this._enableKeyboardListeners()};a.prototype.addAssociatedContentArea=function(e){this._ensureLayoutData(e);return this.addAssociation("associatedContentAreas",e)};a.prototype._enableKeyboardListeners=function(){e.prototype._enableKeyboardListeners.call(this);this.onsaprightmodifiers=this._keyListeners.increase;this.onsapleftmodifiers=this._keyListeners.decrease;this.onsapupmodifiers=this._keyListeners.decrease;this.onsapdownmodifiers=this._keyListeners.increase;this.onsapright=this._keyListeners.increaseMore;this.onsapdown=this._keyListeners.increaseMore;this.onsapleft=this._keyListeners.decreaseMore;this.onsapup=this._keyListeners.decreaseMore;this.onsapend=this._keyListeners.max;this.onsaphome=this._keyListeners.min;this._keyboardEnabled=true};a.prototype._getContentAreas=function(){var e=this.getAssociatedContentAreas()||[];var t=this.getContentAreas();var i=e.map(function(e){return sap.ui.getCore().byId(e)}).filter(function(e){return e});return t.concat(i)};a.prototype.ondblclick=function(e){var t=this.getId(),i,s;if(!(e.target.contains(this._oLastDOMclicked)&&this._oLastDOMclicked.id.indexOf(t+"-splitbar")>-1)){return}i=parseInt(this._oLastDOMclicked.id.substr((t+"-splitbar-").length));s=this._getContentAreas()[i];s._currentPosition=this.getCalculatedSizes()[i];s._lastPosition=s._lastPosition||s._currentPosition;if(s._currentPosition===s._lastPosition){this._resizeContents(i,this.getCalculatedSizes()[i]*-1,true)}else{this._resizeContents(i,s._lastPosition,true);s._lastPosition=null}};a.prototype._resizeContents=function(e,t,s){var a,n,r,o,l,h,c,u,p,d,_,f,g,y,z,S,v=parseFloat(this._move.c1Size).toFixed(5),b=parseFloat(this._move.c2Size).toFixed(5),L=parseFloat(v),C=parseFloat(b);if(isNaN(t)){i.warning("Splitter: Received invalid resizing values - resize aborted.");return}a=this._getContentAreas();n=a[e].getLayoutData();r=a[e+1].getLayoutData();o=n.getSize();l=r.getSize();h=this.$("content-"+e);c=this.$("content-"+(e+1));u=L+t;p=C-t;d=parseInt(n.getMinSize());_=parseInt(r.getMinSize());f=this.getOrientation();g=f==="Horizontal"?this.$().width():this.$().height();if(u<d){S=d-u;t+=S;u=d;p-=S}else if(p<_){S=_-p;t-=S;p=_;u-=S}if(s){if(o==="auto"&&l!=="auto"){z=this._pxToPercent(p,g);r.setSize(z)}else if(o!=="auto"&&l==="auto"){y=this._pxToPercent(u,g);n.setSize(y)}else{y=this._pxToPercent(u,g);z=this._pxToPercent(p,g);n.setSize(y);r.setSize(z)}}else{y=this._pxToPercent(u,g);z=this._pxToPercent(p,g);h.css(this._sizeType,y);c.css(this._sizeType,z)}};a.prototype._pxToPercent=function(e,t){return e*100/t+"%"};a.prototype._recalculateSizes=function(){var e,t,s,a,n,r,o;var l=[];var h=this._getContentAreas();var c=this.getOrientation();var u=[];var p=[];var d=[];for(e=0;e<h.length;++e){s=h[e].getLayoutData();t=s?s.getSize():"auto";l.push(t)}var _=this._calculateAvailableContentSize(l)+1;this._calculatedSizes=[];for(e=0;e<l.length;++e){t=l[e];if(t.indexOf("px")>-1){r=parseInt(t);_-=r;this._calculatedSizes[e]=r}else if(t.indexOf("%")>-1){d.push(e)}else if(t==="auto"){s=h[e].getLayoutData();if(s&&parseInt(s.getMinSize())!==0){p.push(e)}else{u.push(e)}}else{i.error("Illegal size value: "+l[e])}}var f=false;if(_<0){f=true;_=0}var g=_;_=c==="Horizontal"?this.$().width():this.$().height();var y=d.length;for(e=0;e<y;++e){n=d[e];if(y===1&&h.length===1){a=_}else{a=parseFloat(l[n])/100*_;o=parseInt(h[n].getLayoutData().getMinSize());if(a<o){a=o}}this._calculatedSizes[n]=a;g-=a}_=g;if(_<0){f=true;_=0}a=Math.floor(_/(p.length+u.length),0);var z=p.length;for(e=0;e<z;++e){n=p[e];o=parseInt(h[n].getLayoutData().getMinSize());if(o>a){this._calculatedSizes[n]=o;_-=o}else{this._calculatedSizes[n]=a;_-=a}}if(_<0){f=true;_=0}g=_;var S=u.length;a=Math.floor(_/S,0);for(e=0;e<S;++e){n=u[e];this._calculatedSizes[n]=a;g-=a}if(f){i.info("[Splitter] The set sizes and minimal sizes of the splitter contents are bigger "+"than the available space in the UI.")}this._calculatedSizes=this._calculatedSizes};a.prototype._ensureAllSplittersCollapsed=function(e){var t=this._getContentAreas();var i=false;for(var a=0;a<t.length;a++){var n=t[a].getLayoutData().getSize().slice(0,-2);if(n==="0"||n==="au"){i=true;continue}else if(a===t.length-1&&i){this._getContentAreas()[e+1].setLayoutData(new s({size:"100%"}))}}};a.prototype.containsControl=function(e){var t=this._getContentAreas(),i,s;for(s=0;s<t.length;s++){i=t[s];if(i.isA("sap.ui.layout.AssociativeSplitter")){if(i.containsControl(e)){return true}}else{if(i.getId()===e){return true}}}};return a});
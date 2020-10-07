/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/EventProvider","sap/base/assert"],function(e,t){"use strict";var n=e.extend("sap.ui.model.SelectionModel",{constructor:function(t){e.apply(this);this.iSelectionMode=t||n.SINGLE_SELECTION;this.aSelectedIndices=[];this.iLeadIndex=-1;this.fnSort=function(e,t){return e-t};this.fnSortReverse=function(e,t){return t-e}}});n.SINGLE_SELECTION=0;n.MULTI_SELECTION=1;n.prototype.getSelectionMode=function(){return this.iSelectionMode};n.prototype.setSelectionMode=function(e){this.iSelectionMode=e||n.SINGLE_SELECTION};n.prototype.isSelectedIndex=function(e){return this.aSelectedIndices.indexOf(e)!==-1};n.prototype.getLeadSelectedIndex=function(){return this.iLeadIndex};n.prototype.setLeadSelectedIndex=function(e){t(typeof e==="number","iLeadIndex must be an integer");this.setSelectionInterval(e,e);return this};n.prototype.getMinSelectionIndex=function(){if(this.aSelectedIndices.length>0){var e=this.aSelectedIndices.sort(this.fnSort);return e[0]}else{return-1}};n.prototype.getMaxSelectionIndex=function(){if(this.aSelectedIndices.length>0){var e=this.aSelectedIndices.sort(this.fnSortReverse);return e[0]}else{return-1}};n.prototype.getSelectedIndices=function(){var e=this.aSelectedIndices.sort(this.fnSort);return e};n.prototype.setSelectionInterval=function(e,i){t(typeof e==="number","iFromIndex must be an integer");t(typeof i==="number","iToIndex must be an integer");if(this.iSelectionMode===n.SINGLE_SELECTION){e=i}var r=Math.min(e,i);var s=Math.max(e,i);var a=this.aSelectedIndices.slice();var o={};var d=[];for(var h=0;h<a.length;h++){o[a[h]]=true;if(a[h]<e||a[h]>i){d.push(a[h])}}var c=[];for(var u=r;u<=s;u++){c.push(u);if(!o[u]){d.push(u)}}this._update(c,i,d);return this};n.prototype.addSelectionInterval=function(e,i){t(typeof e==="number","iFromIndex must be an integer");t(typeof i==="number","iToIndex must be an integer");if(this.iSelectionMode===n.SINGLE_SELECTION){return this.setSelectionInterval(e,i)}var r=Math.min(e,i);var s=Math.max(e,i);var a=[];var o=this.aSelectedIndices;for(var d=r;d<=s;d++){if(o.indexOf(d)===-1){o.push(d);a.push(d)}}this._update(o,s,a);return this};n.prototype.moveSelectionInterval=function(e,n){t(typeof e==="number","iFromIndex must be an integer");t(typeof n==="number","iToIndex must be an integer");var i=[];var r=this.aSelectedIndices;var s=this.iLeadIndex;for(var a=0;a<r.length;a++){var o=r[a];if(o>=e){i.push(r[a]);r[a]+=n;i.push(r[a]);if(o===this.iLeadIndex){s+=n}}}this._update(r,s,i);return this};n.prototype.removeSelectionInterval=function(e,i){t(typeof e==="number","iFromIndex must be an integer");t(typeof i==="number","iToIndex must be an integer");if(this.iSelectionMode===n.SINGLE_SELECTION){e=i}var r=Math.min(e,i);var s=Math.max(e,i);var a=[];var o=this.aSelectedIndices;var d=this.iLeadIndex;for(var h=r;h<=s;h++){var c=o.indexOf(h);if(c>-1){o.splice(c,1);a.push(h)}if(h===this.iLeadIndex){d=-1}}this._update(o,d,a);return this};n.prototype.sliceSelectionInterval=function(e,n){t(typeof e==="number","iFromIndex must be an integer");t(typeof n==="number","iToIndex must be an integer");var i=Math.min(e,n);var r=Math.max(e,n);var s=[];var a=[];var o=this.aSelectedIndices.slice(0);var d=this.aSelectedIndices;var h=this.iLeadIndex;var c=r-i+1;for(var u=r;u>=i;u--){var f=d.indexOf(u);if(f>-1){d.splice(f,1);a.push(u)}if(u===this.iLeadIndex){h=-1}}for(var u=0;u<d.length;u++){var l=d[u];if(l>=i){var p=d[u]-c;if(l===h){h=p}d[u]=p;if(o.indexOf(p)===-1){s.push(p)}}}for(var I=0;I<a.length;I++){var u=o[o.length-1-I];if(s.indexOf(u)===-1){s.push(u)}}for(var I=0;I<a.length;I++){if(d.indexOf(a[I])===-1&&s.indexOf(a[I])===-1){s.push(a[I])}}this._update(d,h,s);return this};n.prototype.clearSelection=function(){if(this.aSelectedIndices.length>0||this.iLeadIndex!==-1){this._update([],-1,this.aSelectedIndices.slice())}return this};n.prototype.attachSelectionChanged=function(e,t,n){this.attachEvent("selectionChanged",e,t,n);return this};n.prototype.detachSelectionChanged=function(e,t){this.detachEvent("selectionChanged",e,t);return this};n.prototype.fireSelectionChanged=function(e){this.fireEvent("selectionChanged",e);return this};n.prototype._update=function(e,t,n,i){var r={rowIndices:n&&n.sort(this.fnSort),selectAll:i};this.aSelectedIndices=e;r.oldIndex=this.iLeadIndex;if(this.iLeadIndex!==t){this.iLeadIndex=t;r.leadIndex=this.iLeadIndex}if(n.length>0||typeof r.leadIndex!=="undefined"){this.fireSelectionChanged(r)}};n.prototype.selectAll=function(e){t(typeof e==="number","iToIndex must be an integer");var n=this.aSelectedIndices.slice();var i={};var r=[];var s=[];var a=0;for(a=0;a<n.length;a++){i[n[a]]=true;if(n[a]>e){r.push(n[a])}}for(a=0;a<=e;a++){s.push(a);if(!i[a]){r.push(a)}}this._update(s,0,r,true);return this};return n});
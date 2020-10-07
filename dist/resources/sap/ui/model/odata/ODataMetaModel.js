/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/BindingMode","sap/ui/base/BindingParser","sap/ui/model/Context","sap/ui/base/ManagedObject","sap/ui/model/ClientContextBinding","sap/ui/model/FilterProcessor","sap/ui/model/json/JSONModel","sap/ui/model/json/JSONListBinding","sap/ui/model/json/JSONPropertyBinding","sap/ui/model/json/JSONTreeBinding","sap/ui/model/MetaModel","./_ODataMetaModelUtils","sap/ui/performance/Measurement","sap/base/Log","sap/ui/thirdparty/jquery"],function(t,e,n,i,o,r,a,s,l,p,d,u,y,h,c){"use strict";var f="sap.ui.model.odata.ODataMetaModel",g=[f],m=f+"/load",O=/^((\/dataServices\/schema\/\d+)\/(?:complexType|entityType)\/\d+)\/property\/\d+$/;var v=s.extend("sap.ui.model.odata.ODataMetaListBinding"),M=i.extend("sap.ui.model.odata._resolver",{metadata:{properties:{any:"any"}}});v.prototype.applyFilter=function(){var t=this,e=r.combineFilters(this.aFilters,this.aApplicationFilters);this.aIndices=r.apply(this.aIndices,e,function(e,n){return n==="@sapui.name"?e:t.oModel.getProperty(n,t.oList[e])},this.mNormalizeCache);this.iLength=this.aIndices.length};var b=d.extend("sap.ui.model.odata.ODataMetaModel",{constructor:function(e,n,i){var o=this;function r(){var t;if(o.bDestroyed){throw new Error("Meta model already destroyed")}y.average(m,"",g);t=JSON.parse(JSON.stringify(e.getServiceMetadata()));o.oModel=new a(t);o.oModel.setDefaultBindingMode(o.sDefaultBindingMode);u.merge(n?n.getAnnotationsData():{},t,o);y.end(m)}i=i||{};d.apply(this);this.oModel=null;this.mContext2Promise={};this.sDefaultBindingMode=t.OneTime;this.oLoadedPromise=i.annotationsLoadedPromise?i.annotationsLoadedPromise.then(r):new Promise(function(t,e){r();t()});this.oMetadata=e;this.oODataModelInterface=i;this.mQueryCache={};this.mQName2PendingRequest={};this.oResolver=undefined;this.mSupportedBindingModes={OneTime:true}}});b.prototype._getObject=function(t,i){var o=i,r,a,s,l,p,d,u,y=t||"",c;if(!i||i instanceof n){y=this.resolve(t||"",i);if(!y){h.error("Invalid relative path w/o context",t,f);return null}}if(y.charAt(0)==="/"){o=this.oModel._getObject("/");y=y.slice(1)}u="/";p=o;while(y){d=undefined;r=undefined;if(y.charAt(0)==="["){try{c=e.parseExpression(y,1);l=c.at;if(y.length===l+1||y.charAt(l+1)==="/"){r=c.result;d=y.slice(0,l+1);y=y.slice(l+2)}}catch(t){if(!(t instanceof SyntaxError)){throw t}}}if(d===undefined){l=y.indexOf("/");if(l<0){d=y;y=""}else{d=y.slice(0,l);y=y.slice(l+1)}}if(!p){if(h.isLoggable(h.Level.WARNING,f)){h.warning("Invalid part: "+d,"path: "+t+", context: "+(i instanceof n?i.getPath():i),f)}break}if(r){if(o===i){h.error("A query is not allowed when an object context has been given",t,f);return null}if(!Array.isArray(p)){h.error("Invalid query: '"+u+"' does not point to an array",t,f);return null}a=u+d;d=this.mQueryCache[a];if(d===undefined){this.oResolver=this.oResolver||new M({models:this.oModel});for(s=0;s<p.length;s+=1){this.oResolver.bindObject(u+s);this.oResolver.bindProperty("any",r);try{if(this.oResolver.getAny()){this.mQueryCache[a]=d=s;break}}finally{this.oResolver.unbindProperty("any");this.oResolver.unbindObject()}}}}p=p[d];u=u+d+"/"}return p};b.prototype._mergeMetadata=function(t){var e=this.getODataEntityContainer(),n=u.getChildAnnotations(t.annotations,e.namespace+"."+e.name,true),i=e.entitySet.length,o=this.oModel.getObject("/dataServices/schema"),r=this;t.entitySets.forEach(function(n){var i,a,s=n.entityType,l=s.slice(0,s.lastIndexOf("."));if(!r.getODataEntitySet(n.name)){e.entitySet.push(JSON.parse(JSON.stringify(n)));if(!r.getODataEntityType(s)){i=r.oMetadata._getEntityTypeByName(s);a=u.getSchema(o,l);a.entityType.push(JSON.parse(JSON.stringify(i)));u.visitParents(a,t.annotations,"entityType",u.visitEntityType,a.entityType.length-1)}}});u.visitChildren(e.entitySet,n,"EntitySet",o,null,i)};b.prototype._sendBundledRequest=function(){var t=this.mQName2PendingRequest,e=Object.keys(t),n=this;if(!e.length){return}this.mQName2PendingRequest={};e=e.sort();e.forEach(function(t,n){e[n]=encodeURIComponent(t)});this.oODataModelInterface.addAnnotationUrl("$metadata?sap-value-list="+e.join(",")).then(function(e){var i;n._mergeMetadata(e);for(i in t){try{t[i].resolve(e)}catch(e){t[i].reject(e)}}},function(e){var n;for(n in t){t[n].reject(e)}})};b.prototype.bindContext=function(t,e,n){return new o(this,t,e,n)};b.prototype.bindList=function(t,e,n,i,o){return new v(this,t,e,n,i,o)};b.prototype.bindProperty=function(t,e,n){return new l(this,t,e,n)};b.prototype.bindTree=function(t,e,n,i){return new p(this,t,e,n,i)};b.prototype.destroy=function(){d.prototype.destroy.apply(this,arguments);return this.oModel&&this.oModel.destroy.apply(this.oModel,arguments)};b.prototype.getMetaContext=function(t){var e,n,i,o,r,a,s,l,p;function d(t){var e=t.indexOf("(");return e>=0?t.slice(0,e):t}if(!t){return null}l=t.split("/");if(l[0]!==""){throw new Error("Not an absolute path: "+t)}l.shift();s=d(l[0]);n=this.getODataEntitySet(s);if(n){p=n.entityType}else{o=this.getODataFunctionImport(s);if(o){if(l.length===1){r=this.getODataFunctionImport(s,true)}p=o.returnType;if(p.lastIndexOf("Collection(",0)===0){p=p.slice(11,-1)}}else{throw new Error("Entity set or function import not found: "+s)}}l.shift();while(l.length){i=this.getODataEntityType(p);if(i){a=d(l[0]);e=this.getODataAssociationEnd(i,a)}else{i=this.getODataComplexType(p)}if(e){p=e.type;if(e.multiplicity==="1"&&a!==l[0]){throw new Error("Multiplicity is 1: "+l[0])}l.shift()}else{r=this.getODataProperty(i,l,true);if(l.length){throw new Error("Property not found: "+l.join("/"))}break}}r=r||this.getODataEntityType(p,true);return this.createBindingContext(r)};b.prototype.getODataAssociationEnd=function(t,e){var n=t?u.findObject(t.navigationProperty,e):null,i=n?u.getObject(this.oModel,"association",n.relationship):null,o=i?u.findObject(i.end,n.toRole,"role"):null;return o};b.prototype.getODataAssociationSetEnd=function(t,e){var n,i=null,o=this.getODataEntityContainer(),r=t?u.findObject(t.navigationProperty,e):null;if(o&&r){n=u.findObject(o.associationSet,r.relationship,"association");i=n?u.findObject(n.end,r.toRole,"role"):null}return i};b.prototype.getODataComplexType=function(t,e){return u.getObject(this.oModel,"complexType",t,e)};b.prototype.getODataEntityContainer=function(t){var e=t?undefined:null,n=this.oModel.getObject("/dataServices/schema");if(n){n.forEach(function(n,i){var o=u.findIndex(n.entityContainer,"true","isDefaultEntityContainer");if(o>=0){e=t?"/dataServices/schema/"+i+"/entityContainer/"+o:n.entityContainer[o];return false}});if(!e&&n.length===1&&n[0].entityContainer&&n[0].entityContainer.length===1){e=t?"/dataServices/schema/0/entityContainer/0":n[0].entityContainer[0]}}return e};b.prototype.getODataEntitySet=function(t,e){return u.getFromContainer(this.getODataEntityContainer(),"entitySet",t,e)};b.prototype.getODataEntityType=function(t,e){return u.getObject(this.oModel,"entityType",t,e)};b.prototype.getODataFunctionImport=function(t,e){var n=t&&t.indexOf("/")>=0?t.split("/"):undefined,i=n?u.getObject(this.oModel,"entityContainer",n[0]):this.getODataEntityContainer();return u.getFromContainer(i,"functionImport",n?n[1]:t,e)};b.prototype.getODataProperty=function(t,e,n){var i,o=Array.isArray(e)?e:[e],r=null,a;while(t&&o.length){i=u.findIndex(t.property,o[0]);if(i<0){break}o.shift();r=t.property[i];a=t.$path+"/property/"+i;if(o.length){t=this.getODataComplexType(r.type)}}return n?a:r};b.prototype.getODataValueLists=function(t){var e=false,n,i=t.getPath(),o=this.mContext2Promise[i],r=this;if(o){return o}n=O.exec(i);if(!n){throw new Error("Unsupported property context with path "+i)}o=new Promise(function(o,a){var s=t.getObject(),l,p=u.getValueLists(s);if(!(""in p)&&s["sap:value-list"]&&r.oODataModelInterface.addAnnotationUrl){e=true;l=r.oModel.getObject(n[2]).namespace+"."+r.oModel.getObject(n[1]).name;r.mQName2PendingRequest[l+"/"+s.name]={resolve:function(t){c.extend(s,(t.annotations.propertyAnnotations[l]||{})[s.name]);p=u.getValueLists(s);if(c.isEmptyObject(p)){a(new Error("No value lists returned for "+i))}else{delete r.mContext2Promise[i];o(p)}},reject:a};setTimeout(r._sendBundledRequest.bind(r),0)}else{o(p)}});if(e){this.mContext2Promise[i]=o}return o};b.prototype.getProperty=function(){return this._getObject.apply(this,arguments)};b.prototype.isList=function(){return this.oModel.isList.apply(this.oModel,arguments)};b.prototype.loaded=function(){return this.oLoadedPromise};b.prototype.refresh=function(){throw new Error("Unsupported operation: ODataMetaModel#refresh")};b.prototype.setLegacySyntax=function(t){if(t){throw new Error("Legacy syntax not supported by ODataMetaModel")}};b.prototype.setProperty=function(){throw new Error("Unsupported operation: ODataMetaModel#setProperty")};return b});
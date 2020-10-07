/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/test/_OpaLogger","sap/ui/thirdparty/jquery","sap/ui/test/selectors/_ControlSelectorValidator","sap/ui/test/selectors/_selectors"],function(e,t,n,r,o){"use strict";var i=e.extend("sap.ui.test.selectors._ControlSelectorGenerator");var a=t.getLogger("sap.ui.test.selectors._ControlSelectorGenerator");i._generate=function(e){var t=i._getOrderedGenerators(e.settings);var n=e.includeAll?i._executeAllPlainGenerators(t,e):i._executeTopPlainGenerator(t,e);return n.catch(function(t){if(e.shallow){return Promise.reject(t)}else{return i._generateHierarchicalUp(e.control).catch(function(){return i._generateHierarchicalDown(e.control)}).then(function(t){var n=i._filterUnique(t,e);return e.includeAll?n:n[0]})}})};var u=20;var c=10;i.setParams=function(e){if(e.maxDepth&&Number.isInteger(e.maxDepth)&&e.maxDepth>0){i._maxDepth=e.maxDepth}if(e.maxWidth&&Number.isInteger(e.maxWidth)&&e.maxWidth>0){i._maxWidth=e.maxWidth}};i.resetParams=function(e){i._maxDepth=u;i._maxWidth=c};i.resetParams();i._executeAllPlainGenerators=function(e,t){return Promise.all(e.map(function(e){return i._executeGenerator(e,t)})).then(function(e){e=e.filter(function(e){return e&&!n.isEmptyObject(e)&&(!n.isArray(e)||e.length)});if(e.length){a.debug("The matching "+(t.multiple?"non-unique":"unique")+" selectors are: "+JSON.stringify(e));return e}else{return Promise.reject(new Error("Could not generate a selector for control "+t.control))}})};i._executeTopPlainGenerator=function(e,t,n){n=n||0;if(n===e.length){return Promise.reject(new Error("Could not generate a selector for control "+t.control))}return i._executeGenerator(e[n],t).then(function(r){if(r.length){a.debug("The top priority "+(t.multiple?"non-unique":"unique")+" selector is: "+JSON.stringify(r[0]));return r[0]}else{return i._executeTopPlainGenerator(e,t,n+1)}})};i._executeGenerator=function(e,t){return i._getValidationRootSelector(e,t).then(function(n){return i._getAncestorSelector(e,t).then(function(r){var o=e.generate(t.control,r,n);return i._filterUnique(o,t.validationRoot,t.multiple)})})};i._getValidationRootSelector=function(e,t){t=t||{};return new Promise(function(n,r){if(t.shallow||!e._isValidationRootRequired()){n(null)}else{var o=e._getValidationRoot(t.control);if(o){return i._generateUniqueSelectorInSubtree(t.control,o).then(function(e){n(e)}).catch(function(e){r(e)})}else{n(null)}}})};i._getAncestorSelector=function(e,t){t=t||{};return new Promise(function(n,r){if(t.shallow||!e._isAncestorRequired()){n(null)}else{var o=e._getAncestor(t.control);if(o){return i._generate({control:o}).then(function(e){n(e)}).catch(function(e){a.debug("Could not generate selector for ancestor "+o+". Error: "+e);n(null)})}else{n(null)}}})};i._generateHierarchicalUp=function(e){return i._generateUniqueAncestorSelector(e).then(function(t){return i._generateUniqueSelectorInSubtree(e,t.ancestor).then(function(e){return n.extend({},e,{ancestor:t.selector})})})};i._generateHierarchicalDown=function(e){return i._generate({control:e,shallow:true,multiple:true}).then(function(t){return i._generateUniqueDescendantSelector(e).then(function(e){return n.extend({},t,{descendant:e})})})};i._generateUniqueDescendantSelector=function(e,t){return new Promise(function(r,o){t=t||0;if(t>=i._maxDepth){o(new Error("Could not generate selector for descendant of "+e+". Exceeded limit of "+i._maxDepth+" levels"))}else{var a=Object.keys(e.mAggregations).filter(function(t){var r=e.mAggregations[t];return r&&(n.isArray(r)&&r.length||r.getMetadata&&r.getMetadata().getName())}).map(function(t){var r=e.mAggregations[t];return n.isArray(r)?r.slice(0,i._maxWidth):r}).reduce(function(e,t){return e.concat(t)},[]);return i._generateUniqueSelectorForChild(a).then(function(e){r(e)}).catch(function(){return i._callGenerateUniqueDescendant(a,t+1).then(function(e){r(e)}).catch(function(e){o(e)})})}})};i._callGenerateUniqueDescendant=function(e,t,n){n=n||0;if(n>=e.length){return Promise.reject(new Error("Could not generate unique selector for descendant at level "+t))}return i._generateUniqueDescendantSelector(e[n],t).then(function(e){return e}).catch(function(){return i._callGenerateUniqueDescendant(e,t,n+1)})};i._generateUniqueSelectorForChild=function(e,t){t=t||0;if(t>=e.length){return Promise.reject()}return i._generate({control:e[t],shallow:true}).then(function(e){return e}).catch(function(n){return i._generateUniqueSelectorForChild(e,t+1)})};i._generateUniqueAncestorSelector=function(e,t,n){t=t||e.getParent();n=n||0;var r=n>=i._maxDepth;if(!t||r){return Promise.reject(new Error("Could not generate unique selector for ancestor of "+e+(r?". Exceeded limit of "+i._maxDepth+" levels":"")))}return i._generate({control:t,shallow:true}).then(function(e){return{ancestor:t,selector:e}}).catch(function(r){a.debug("Could not generate selector for ancestor "+t+". Error: "+r);return i._generateUniqueAncestorSelector(e,t.getParent(),n+1)})};i._generateUniqueSelectorInSubtree=function(e,t){return i._generate({control:e,validationRoot:t,shallow:true})};i._filterUnique=function(e,t,o){var i=[];var a=new r(t,o);if(n.isArray(e)){e.forEach(function(e){if(n.isArray(e)){e.forEach(function(e){if(a._validate(e)){i.push(e)}})}else if(a._validate(e)){i.push(e)}})}else if(a._validate(e)){i.push(e)}return i};i._getOrderedGenerators=function(e){var t=["globalID","viewID","labelFor","bindingPath","properties","dropdownItem","tableRowItem","controlType"];if(e&&e.preferViewId){var n=t[0];t[0]=t[1];t[1]=n}return t.map(function(e){return o[e]})};return i});
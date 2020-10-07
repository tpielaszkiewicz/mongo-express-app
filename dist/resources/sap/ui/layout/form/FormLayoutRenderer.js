/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/theming/Parameters","sap/ui/layout/library","sap/ui/layout/form/Form"],function(e,t,r,i){"use strict";var a=e.TitleLevel;var n=r.BackgroundDesign;var o={apiVersion:2};o.render=function(e,t){var r=t.getParent();if(r&&r instanceof i){this.renderForm(e,t,r)}};o.renderForm=function(e,r,i){var a=i.getToolbar();e.openStart("div",r);e.class(this.getMainClass());if(a){e.class("sapUiFormToolbar")}this.addBackgroundClass(e,r);e.openEnd();var n;if(!a){n=t.get("sap.ui.layout.FormLayout:_sap_ui_layout_FormLayout_FormTitleSize")}this.renderHeader(e,a,i.getTitle(),undefined,false,n,i.getId());this.renderContainers(e,r,i);e.close("div")};o.getMainClass=function(){return"sapUiFormLayout"};o.addBackgroundClass=function(e,t){var r=t.getBackgroundDesign();if(r!=n.Transparent){e.class("sapUiFormBackgr"+r)}};o.renderContainers=function(e,t,r){var i=r.getVisibleFormContainers();for(var a=0,n=i.length;a<n;a++){var o=i[a];this.renderContainer(e,t,o)}};o.renderContainer=function(e,t,r){var i=r.getExpandable();var n=r.getToolbar();var o=r.getTitle();e.openStart("section",r);e.class("sapUiFormContainer");if(n){e.class("sapUiFormContainerToolbar")}else if(o){e.class("sapUiFormContainerTitle")}if(r.getTooltip_AsString()){e.attr("title",r.getTooltip_AsString())}this.writeAccessibilityStateContainer(e,r);e.openEnd();this.renderHeader(e,n,o,r._oExpandButton,i,a.H4,r.getId());if(i){e.openStart("div",r.getId()+"-content");if(!r.getExpanded()){e.style("display","none")}e.openEnd()}var l=r.getVisibleFormElements();for(var s=0,d=l.length;s<d;s++){var g=l[s];this.renderElement(e,t,g)}if(i){e.close("div")}e.close("section")};o.renderElement=function(e,t,r){var i=r.getLabelControl();e.openStart("div",r);e.class("sapUiFormElement");if(i){e.class("sapUiFormElementLbl")}e.openEnd();if(i){e.renderControl(i)}var a=r.getFieldsForRendering();if(a&&a.length>0){for(var n=0,o=a.length;n<o;n++){var l=a[n];e.renderControl(l)}}e.close("div")};o.renderTitle=function(e,r,i,n,o,l){if(r){var s=t.get("sap.ui.layout.FormLayout:_sap_ui_layout_FormLayout_FormSubTitleSize");if(o){s=o}if(typeof r!=="string"&&r.getLevel()!=a.Auto){s=r.getLevel()}if(typeof r!=="string"){e.openStart(s.toLowerCase(),r);if(r.getTooltip_AsString()){e.attr("title",r.getTooltip_AsString())}if(r.getEmphasized()){e.class("sapUiFormTitleEmph")}}else{e.openStart(s,l+"--title")}e.class("sapUiFormTitle");e.class("sapUiFormTitle"+s);e.openEnd();if(n&&i){e.renderControl(i)}if(typeof r==="string"){r.split(/\n/).forEach(function(t,r){if(r>0){e.voidStart("br").voidEnd()}e.text(t)})}else{var d=r.getIcon();if(d){var g=[];var f={title:null};f["id"]=r.getId()+"-ico";e.icon(d,g,f)}r.getText().split(/\n/).forEach(function(t,r){if(r>0){e.voidStart("br").voidEnd()}e.text(t)})}e.close(s.toLowerCase())}};o.renderHeader=function(e,t,r,i,a,n,o){if(t){e.renderControl(t)}else{this.renderTitle(e,r,i,a,n,o)}};o.writeAccessibilityStateContainer=function(e,t){var i={};var a=t.getTitle();var n=t.getToolbar();if(n){if(!t.getAriaLabelledBy()||t.getAriaLabelledBy().length==0){var o=r.form.FormHelper.getToolbarTitle(n);i["labelledby"]={value:o,append:true}}}else if(a){var l="";if(typeof a=="string"){l=t.getId()+"--title"}else{l=a.getId()}i["labelledby"]={value:l,append:true}}if(i["labelledby"]||t.getAriaLabelledBy().length>0){i["role"]="form"}e.accessibilityState(t,i)};return o},true);
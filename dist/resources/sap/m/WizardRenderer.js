/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.render=function(e,t){this.startWizard(e,t);this.renderProgressNavigator(e,t);this.renderWizardSteps(e,t);this.endWizard(e)};e.startWizard=function(e,t){var r=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("WIZARD_LABEL");e.openStart("div",t).class("sapMWizard").class("sapMWizardBg"+t.getBackgroundDesign()).style("width",t.getWidth()).style("height",t.getHeight()).accessibilityState({label:r}).openEnd()};e.renderProgressNavigator=function(e,t){e.renderControl(t.getAggregation("_progressNavigator"))};e.renderWizardSteps=function(e,t){e.openStart("section",t.getId()+"-step-container").class("sapMWizardStepContainer").openEnd();var r=this._getStepsRenderingOrder(t);r.forEach(e.renderControl,e);e.close("section")};e.endWizard=function(e){e.close("div")};e._getStepsRenderingOrder=function(e){if(!e.getEnableBranching()){return e.getSteps()}var t=e.getSteps().slice(),r,n,i,s;var a=function(e,r,n){var i=sap.ui.getCore().byId(e);if(t.indexOf(i)<t.indexOf(n)){var s=t.indexOf(i),a=t[s];t[s]=n;t[r]=a;r=0}return r};for(r=0;r<t.length;r++){n=t[r];s=n.getSubsequentSteps();if(s.length<1&&n.getNextStep()){s=[n.getNextStep()]}for(i=0;i<s.length;i++){r=a(s[i],r,n)}}return t};return e},true);
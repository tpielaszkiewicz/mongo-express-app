/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.getCore().loadLibrary("sap.ui.unified");sap.ui.define(["./library","sap/ui/core/Control","./Button","./Dialog","./NavContainer","./List","./Page","./MenuListItem","sap/ui/unified/Menu","sap/ui/unified/MenuItem","sap/ui/Device","sap/ui/core/EnabledPropagator","sap/ui/thirdparty/jquery","sap/ui/core/Popup"],function(t,e,i,n,s,o,r,a,u,g,l,p,h,m){"use strict";var d=m.Dock;var _=t.ListType;var I=t.ListMode;var f=e.extend("sap.m.Menu",{metadata:{interfaces:["sap.ui.core.IContextMenu"],library:"sap.m",properties:{title:{type:"string",group:"Misc",defaultValue:null}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.MenuItem",multiple:true,singularName:"item",bindable:"bindable"},_dialog:{type:"sap.m.Dialog",multiple:false,visibility:"hidden"},_menu:{type:"sap.ui.unified.Menu",multiple:false,visibility:"hidden"}},events:{itemSelected:{parameters:{item:{type:"sap.m.MenuItem"}}},closed:{}}},renderer:null});p.call(f.prototype);f.UNIFIED_MENU_ITEMS_ID_SUFFIX="-unifiedmenu";f.UNFIFIED_MENU_ITEMS_PROPS=g.getMetadata().getAllProperties();f.LIST_ITEMS_ID_SUFFIX="-menuinnerlist";f.MENU_LIST_ITEMS_PROPS=a.getMetadata().getAllProperties();f.prototype.init=function(){if(l.system.phone){this._initDialog()}this._bIsInitialized=false};f.prototype.exit=function(){if(this._navContainerId){this._navContainerId=null}if(this._bIsInitialized){this._bIsInitialized=null}if(this._getMenu()&&this._getMenu().getPopup()){this._getMenu().getPopup().detachClosed(this._menuClosed,this)}};f.prototype.invalidate=function(){};f.prototype.setTitle=function(t){var e=this._getNavContainer();this.setProperty("title",t,true);if(e&&e.getPages().length){e.getPages()[0].setTitle(t)}return this};f.prototype.openBy=function(t,e,i,n,s){if(l.system.phone){this._openDialog()}else{if(!this._bIsInitialized){this._initAllMenuItems();this._bIsInitialized=true}if(!i){i=d.BeginTop}if(!n){n=d.BeginBottom}if(!s){s="0 -2"}this._getMenu().open(e,t,i,n,t,s)}};f.prototype.close=function(){if(l.system.phone){this._getDialog().close()}else{this._getVisualParent().close()}};f.prototype._initDialog=function(){var t=new n({showHeader:false,stretch:true,content:this._initNavContainer(),buttons:[this._initCloseButton()]});t.addStyleClass("sapMRespMenuDialog");t.removeStyleClass("sapUiPopupWithPadding");this.setAggregation("_dialog",t,true);t.attachAfterClose(this._menuClosed,this)};f.prototype._getDialog=function(){return this.getAggregation("_dialog")};f.prototype._openDialog=function(){if(!this._bIsInitialized){this._initAllPages();this._bIsInitialized=true}this._getNavContainer().to(this._getNavContainer().getPages()[0]);this._getDialog().open()};f.prototype._initAllMenuItems=function(){this._initMenuForItems(this.getItems())};f.prototype._setCustomEnhanceAccStateFunction=function(t){this._fnEnhanceUnifiedMenuAccState=t};f.prototype._initMenuForItems=function(t,e){var i=new u;i._setCustomEnhanceAccStateFunction(this._fnEnhanceUnifiedMenuAccState);i.isCozy=this._isMenuCozy.bind(this,i);this.addStyleClass("sapMMenu");i.aCustomStyleClasses=this.aCustomStyleClasses;i.mCustomStyleClassMap=this.mCustomStyleClassMap;t.forEach(function(t){this._addVisualMenuItemFromItem(t,i)}.bind(this));if(e){e.setSubmenu(i)}else{i.getPopup().attachClosed(this._menuClosed,this);this.setAggregation("_menu",i,true)}i.attachItemSelect(this._handleMenuItemSelect,this)};f.prototype._menuClosed=function(){this.fireClosed()};f.prototype._getMenu=function(){return this.getAggregation("_menu")};f.prototype._initCloseButton=function(){var t=sap.ui.getCore().getLibraryResourceBundle("sap.m");return new i({text:t.getText("MENU_CLOSE"),press:c.bind(this)})};function c(){this._getDialog().close()}f.prototype._initNavContainer=function(){var t=new s;this._navContainerId=t.getId();return t};f.prototype._getNavContainer=function(){return sap.ui.getCore().byId(this._navContainerId)};f.prototype._initAllPages=function(){this._initPageForParent(this)};f.prototype._initPageForParent=function(t){var e=t.getItems(),i=t instanceof f,n=i?t.getTitle():t.getText(),s=new o({mode:I.None}),a=new r({title:n,showNavButton:!i,content:s});if(!i){this._setBackButtonTooltipForPageWithParent(t,a)}a.attachNavButtonPress(function(){this._getNavContainer().back()},this);this._getNavContainer().addPage(a);e.forEach(function(t){this._addListItemFromItem(t,a)},this);this._updateListInset(s);s.attachEvent("itemPress",this._handleListItemPress,this);return a};f.prototype._handleListItemPress=function(t){var e=t.getParameter("listItem"),i=sap.ui.getCore().byId(e.getMenuItem()),n=i._getVisualChild();if(n){this._getNavContainer().to(n)}else{this._getDialog().close();this.fireItemSelected({item:i})}i.firePress()};f.prototype._setBackButtonTooltipForPageWithParent=function(t,e){var i=t.getParent(),n=sap.ui.getCore().getLibraryResourceBundle("sap.m"),s;s=i instanceof f?i.getTitle():i.getText();s=n.getText("MENU_PAGE_BACK_BUTTON")+" "+s;e.setNavButtonTooltip(s)};f.prototype._createMenuListItemFromItem=function(t){return new a({id:this._generateListItemId(t.getId()),type:_.Active,icon:t.getIcon(),title:t.getText(),startsSection:t.getStartsSection(),menuItem:t,tooltip:t.getTooltip(),visible:t.getVisible()})};f.prototype._createVisualMenuItemFromItem=function(t){var e=new g({id:this._generateUnifiedMenuItemId(t.getId()),icon:t.getIcon(),text:t.getText(),startsSection:t.getStartsSection(),tooltip:t.getTooltip(),visible:t.getVisible(),enabled:t.getEnabled()}),i,n=t.getCustomData();for(i=0;i<n.length;i++){t._addCustomData(e,n[i])}return e};f.prototype._addVisualMenuItemFromItem=function(t,e,i){var n=this._createVisualMenuItemFromItem(t);t._setVisualParent(e);t._setVisualControl(n);var s=["aggregationChanged","propertyChanged"];s.forEach(function(e){var i="_on"+e.slice(0,1).toUpperCase()+e.slice(1);t.attachEvent(e,this[i],this)},this);if(t.getItems().length!==0){this._initMenuForItems(t.getItems(),n);t._setVisualChild(t.getItems()[0]._getVisualParent())}if(i===undefined){e.addItem(n)}else{e.insertItem(n,i)}};f.prototype._addListItemFromItem=function(t,e,i){var n=this._createMenuListItemFromItem(t),s=e.getContent()[0];t._setVisualParent(e);t._setVisualControl(n);var o=["aggregationChanged","propertyChanged"];o.forEach(function(e){var i="_on"+e.slice(0,1).toUpperCase()+e.slice(1);t.attachEvent(e,this[i],this)},this);if(t.getItems().length!==0){this._initPageForParent(t);t._setVisualChild(t.getItems()[0]._getVisualParent())}if(i===undefined){s.addItem(n)}else{s.insertItem(n,i)}s.rerender()};f.prototype._connectVisualItem=function(t,e,i){if(!e||sap.ui.getCore().byId(t._getVisualControl())){return}if(l.system.phone){this._addListItemFromItem(t,e,i);var n=e.getContent()[0];this._updateListInset(n)}else{this._addVisualMenuItemFromItem(t,e,i)}};f.prototype._updateListInset=function(t){var e=false,i="sapMListIcons",n=t.getItems();for(var s=0;s<n.length;s++){if(n[s].getIcon()){e=true;break}}if(e){t.addStyleClass(i)}else{t.removeStyleClass(i)}};f.prototype._handleMenuItemSelect=function(t){var e=t.getParameter("item"),i;if(!e){return}i=this._findMenuItemByUnfdMenuItem(e);if(i&&!i.getItems().length){this.fireItemSelected({item:i})}if(i){i.firePress()}};f.prototype._generateListItemId=function(t){return t+f.LIST_ITEMS_ID_SUFFIX};f.prototype._generateUnifiedMenuItemId=function(t){return t+f.UNIFIED_MENU_ITEMS_ID_SUFFIX};f.prototype._findMenuItemByUnfdMenuItem=function(t){var e=[],i=t,n,s,o;do{e.push(i.getId());i=i.getParent().getParent()}while(i instanceof g);n=this.getItems();do{s=e.pop();for(o=0;o<n.length;o++){if(n[o]._getVisualControl()===s){if(e.length===0){return n[o]}else{n=n[o].getItems();break}}}}while(e.length);return null};f.prototype._isMenuCozy=function(t){if(!t.bCozySupported){return false}if(t.hasStyleClass("sapUiSizeCozy")){return true}if(y(t.oOpenerRef)){return true}return false};function y(t){if(!t){return false}t=t.$?t.$():h(t);var e=t.closest(".sapUiSizeCompact,.sapUiSizeCondensed,.sapUiSizeCozy");return!e.hasClass("sapUiSizeCompact")&&!e.hasClass("sapUiSizeCondensed")||e.hasClass("sapUiSizeCozy")}f.prototype.addAggregation=function(t,i,n){e.prototype.addAggregation.apply(this,arguments);if(t==="items"){this._connectVisualItem(i,this._getVisualParent())}return this};f.prototype.insertAggregation=function(t,i,n,s){e.prototype.insertAggregation.apply(this,arguments);if(t==="items"){this._connectVisualItem(i,this._getVisualParent(),n)}return this};f.prototype.removeAggregation=function(t,i,n){var s=e.prototype.removeAggregation.apply(this,arguments);if(t==="items"){this._removeVisualItem(s)}return s};f.prototype.removeAllAggregation=function(t,i){var n=e.prototype.removeAllAggregation.apply(this,arguments);if(t==="items"){for(var s=0;s<n.length;s++){this._removeVisualItem(n[s])}}return n};f.prototype._removeVisualItem=function(t,e){var i=sap.ui.getCore().byId(t._getVisualControl()),n;if(i){n=i.getParent();n.removeItem(i);if(l.system.phone){this._removeSubPageForItem(t);if(n.getItems().length===0){if(e){e._setVisualChild(null);sap.ui.getCore().byId(e._getVisualControl()).rerender()}}if(n){n.rerender()}}}};f.prototype.destroyAggregation=function(t,i){if(t==="items"){for(var n=0;n<this.getItems().length;n++){this._removeVisualItem(this.getItems()[n])}}return e.prototype.destroyAggregation.apply(this,arguments)};f.prototype._removeSubPageForItem=function(t,e){var i;if(!e){for(var n=0;n<t.getItems().length;n++){this._removeSubPageForItem(t.getItems()[n])}}if(t._getVisualChild()){i=sap.ui.getCore().byId(t._getVisualChild());if(this._getNavContainer()&&i){this._getNavContainer().removePage(i)}!!i&&i.destroy()}};f.prototype._getVisualParent=function(){var t=this._getNavContainer(),e=this._getMenu();if(t&&t.getPages().length){return t.getPages()[0]}else{return e}};f.prototype._onPropertyChanged=function(t){var e=t.getParameter("propertyKey"),i=t.getParameter("propertyValue"),n=l.system.phone?f.MENU_LIST_ITEMS_PROPS:f.UNFIFIED_MENU_ITEMS_PROPS,s=l.system.phone?this._generateListItemId:this._generateUnifiedMenuItemId,o;if(l.system.phone&&e==="text"){e="title"}if(!n[e]){return}o=s(t.getSource().getId());if(o){sap.ui.getCore().byId(o).setProperty(e,i);if(l.system.phone&&this._getDialog().isOpen()){this._getDialog().close()}}};f.prototype._onAggregationChanged=function(t){var e=t.getParameter("aggregationName");switch(e){case"items":this._onItemsAggregationChanged(t);break;case"tooltip":this._onTooltipAggregationChanged(t);break}};f.prototype._onTooltipAggregationChanged=function(t){var e=t.getSource()._getVisualControl(),i=t.getParameter("methodName"),n=t.getParameter("methodParams"),s;if(!e){return}s=sap.ui.getCore().byId(e);if(i==="set"){s.setTooltip(n.item)}if(i==="destroy"){s.destroyTooltip()}};f.prototype._onItemsAggregationChanged=function(t){var e=t.getSource(),i=t.getParameter("methodName"),n=t.getParameter("methodParams"),s;if(i==="add"||i==="insert"){if(i==="insert"){s=n.index}this._addOrInsertItem(e,n.item,s)}if(i==="remove"){this._removeVisualItem(n.item,e)}if(i==="removeall"){for(var o=0;o<n.items.length;o++){this._removeVisualItem(n.items[o],e)}}if(i==="destroy"){this._destroyItem(e)}};f.prototype._addOrInsertItem=function(t,e,i){var n;if(t._getVisualChild()){this._connectVisualItem(e,sap.ui.getCore().byId(t._getVisualChild()),i)}else{if(l.system.phone){this._initPageForParent(t);t._setVisualChild(t.getItems()[0]._getVisualParent());n=sap.ui.getCore().byId(t._getVisualControl());n.rerender()}else{this._initMenuForItems(t.getItems(),sap.ui.getCore().byId(t._getVisualControl()));t._setVisualChild(t.getItems()[0]._getVisualParent())}}};f.prototype._destroyItem=function(t){var e=sap.ui.getCore().byId(t._getVisualControl());if(e&&e.setMenuItem){e.setMenuItem(null)}this._removeSubPageForItem(t,true);t._setVisualChild(null);if(e&&e.setMenuItem){e.rerender();e.setMenuItem(t)}};f.prototype.getDomRefId=function(){if(l.system.phone){return this._getDialog().getId()}else{return this._getMenu().getId()}};f.prototype.openAsContextMenu=function(t,e){if(l.system.phone){this._openDialog()}else{if(!this._bIsInitialized){this._initAllMenuItems();this._bIsInitialized=true}this._getMenu().openAsContextMenu(t,e)}};["addStyleClass","removeStyleClass","toggleStyleClass"].forEach(function(t){f.prototype[t]=function(i,n){var s=this._getDialog();e.prototype[t].apply(this,arguments);if(s){s[t].apply(s,arguments)}return this}});return f});
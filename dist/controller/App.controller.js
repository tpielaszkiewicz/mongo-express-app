sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,o,i){"use strict";return e.extend("sap.ui.demo.todo.controller.App",{onInit:function(){this.aSearchFilters=[];this.aTabFilters=[]},addTodo:function(){fetch("/api/tutorials",{method:"GET",headers:new Headers({Authorization:"Basic "+btoa("tpielaszkiewicz:lubaczow1")})}).then(e=>e.json()).then(e=>{console.log("Tutorials are listed below:");console.log(e)});var e=this.getView().getModel();var t=e.getProperty("/todos").map(function(e){return Object.assign({},e)});t.push({title:e.getProperty("/newTodo"),completed:false});e.setProperty("/todos",t);e.setProperty("/newTodo","")},clearCompleted:function(){var e=this.getView().getModel();var t=e.getProperty("/todos").map(function(e){return Object.assign({},e)});var o=t.length;while(o--){var i=t[o];if(i.completed){t.splice(o,1)}}e.setProperty("/todos",t)},updateItemsLeftCount:function(){var e=this.getView().getModel();var t=e.getProperty("/todos")||[];var o=t.filter(function(e){return e.completed!==true}).length;e.setProperty("/itemsLeftCount",o)},onSearch:function(e){var t=this.getView().getModel();this.aSearchFilters=[];var r=e.getSource().getValue();if(r&&r.length>0){t.setProperty("/itemsRemovable",false);var s=new o("title",i.Contains,r);this.aSearchFilters.push(s)}else{t.setProperty("/itemsRemovable",true)}this._applyListFilters()},onFilter:function(e){this.aTabFilters=[];var t=e.getParameter("item").getKey();switch(t){case"active":this.aTabFilters.push(new o("completed",i.EQ,false));break;case"completed":this.aTabFilters.push(new o("completed",i.EQ,true));break;case"all":default:}this._applyListFilters()},_applyListFilters:function(){var e=this.byId("todoList");var t=e.getBinding("items");t.filter(this.aSearchFilters.concat(this.aTabFilters),"todos")}})});
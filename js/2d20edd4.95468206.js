(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d20edd4"],{b0d4:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-page",{staticClass:"cm-page"},[n("q-list",{staticClass:"q-px-xs q-py-xs check-list-list"},t._l(t.templateList,function(t){return n("TemplateItem",{key:t.id,attrs:{to:"/templates/"+t.id,value:t}})}),1)],1)},i=[],s=(n("8e6e"),n("8a81"),n("ac6a"),n("cadf"),n("06db"),n("456d"),n("55dd"),n("c47a")),c=n.n(s),a=n("2f62"),l=n("11ec"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-slide-item",{on:{left:t.edit,right:t.remove},scopedSlots:t._u([{key:"left",fn:function(){return[n("q-icon",{attrs:{name:"mdi-pencil"}})]},proxy:!0},{key:"right",fn:function(){return[n("q-icon",{attrs:{name:"mdi-delete"}})]},proxy:!0}])},[n("q-item",{staticClass:"q-pa-none check-list-item",class:"check-list-item--pending",attrs:{to:t.to}},[n("q-item-section",{staticClass:"check-list-item__side",attrs:{side:"",top:""}},[n("q-icon",{staticClass:"check-list-item__checkmark",attrs:{name:"mdi-file-outline"}})],1),n("q-item-section",{staticClass:"check-list-item__main"},[n("q-item-label",{staticClass:"check-list-item__overline",attrs:{overline:""}},[t._v("\n        "+t._s(t.tags)+"\n      ")]),n("q-item-label",{staticClass:"check-list-item__title text-h6"},[t._v("\n        "+t._s(t.value.title)+"\n      ")]),n("q-item-label",{staticClass:"check-list-item__meta",attrs:{caption:""}},[n("q-icon",{staticClass:"q-mr-xs",attrs:{size:"16px",name:"mdi-check-all"}}),n("span",[t._v(t._s(t.state.itemCount))])],1)],1)],1)],1)},u=[],p=n("3a34");function m(t,e){var n=Object.keys(t);return Object.getOwnPropertySymbols&&n.push.apply(n,Object.getOwnPropertySymbols(t)),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?m(n,!0).forEach(function(e){c()(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):m(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var d={name:"TemplateItem",props:{value:{type:Object,required:!0},to:{type:String,default:""}},computed:{tags:function(){return"".concat(this.value.tags.reduce(function(t,e){return"".concat(t,"#").concat(e," ")},"")," ")},state:function(){return p["a"].listStates(this.value)}},methods:f({},Object(a["b"])(["deleteTemplate"]),{edit:function(t){var e=t.reset;e(),this.$router.push("/templates/".concat(this.value.id,"?enableEdit=1"))},remove:function(t){var e=this,n=t.reset;n(),this.$q.dialog({title:"Delete Template?",message:"This cannot be undone!",ok:{label:"Delete",color:"negative",flat:!0},cancel:!0,className:"dialog-flat"}).onOk(function(){e.deleteTemplate(e.value)})}})},b=d,O=n("2877"),h=Object(O["a"])(b,o,u,!1,null,null,null),y=h.exports;function v(t,e){var n=Object.keys(t);return Object.getOwnPropertySymbols&&n.push.apply(n,Object.getOwnPropertySymbols(t)),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n}function g(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?v(n,!0).forEach(function(e){c()(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):v(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var j={name:"Templates",components:{TemplateItem:y},computed:g({},Object(a["d"])(["templates"]),{templateList:function(){var t=Object(l["a"])(!0,[],this.templates);return t.sort(function(t,e){return t.title>e.title?1:t.title<e.title?-1:0})}})},_=j,k=Object(O["a"])(_,r,i,!1,null,null,null);e["default"]=k.exports}}]);
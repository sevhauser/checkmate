(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0dacf5"],{"6cd6":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-page",{staticClass:"cm-page"},[r("q-list",{staticClass:"q-px-xs q-py-xs check-list-list"},t._l(t.tagList,function(t){return r("TagItem",{key:t,attrs:{tag:t}})}),1)],1)},a=[],c=(r("8e6e"),r("8a81"),r("ac6a"),r("cadf"),r("06db"),r("456d"),r("55dd"),r("c47a")),o=r.n(c),i=r("2f62"),s=r("11ec"),l=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-slide-item",{on:{left:t.edit,right:t.remove},scopedSlots:t._u([{key:"left",fn:function(){return[r("q-icon",{attrs:{name:"mdi-pencil"}})]},proxy:!0},{key:"right",fn:function(){return[r("q-icon",{attrs:{name:"mdi-delete"}})]},proxy:!0}])},[r("q-item",{staticClass:"check-list-item"},[r("q-item-section",{attrs:{side:""}},[r("q-icon",{attrs:{name:"mdi-tag"}})],1),r("q-item-section",{staticClass:"text-h6"},[t._v("\n      #"+t._s(t.tag)+"\n    ")])],1)],1)},p=[];function u(t,e){var r=Object.keys(t);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(t)),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r}function g(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?u(r,!0).forEach(function(e){o()(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):u(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var f={name:"TagItem",props:{tag:{type:String,required:!0}},methods:g({},Object(i["b"])(["updateTag","deleteTag"]),{edit:function(t){var e=this,r=t.reset;r(),this.$q.dialog({title:"Edit Tag",prompt:{model:this.tag},cancel:!0,className:"dialog-flat"}).onOk(function(t){e.updateTag({oldTag:e.tag,newTag:t})})},remove:function(t){var e=this,r=t.reset;r(),this.$q.dialog({title:"Delete Tag?",message:"This cannot be undone!",ok:{label:"Delete",color:"negative",flat:!0},cancel:!0,className:"dialog-flat"}).onOk(function(){e.deleteTag(e.tag)})}})},d=f,O=r("2877"),b=Object(O["a"])(d,l,p,!1,null,null,null),m=b.exports;function y(t,e){var r=Object.keys(t);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(t)),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r}function h(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?y(r,!0).forEach(function(e){o()(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):y(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var j={name:"Tags",components:{TagItem:m},computed:h({},Object(i["d"])(["tags"]),{tagList:function(){var t=Object(s["a"])([],this.tags);return t.sort()}})},w=j,v=Object(O["a"])(w,n,a,!1,null,null,null);e["default"]=v.exports}}]);
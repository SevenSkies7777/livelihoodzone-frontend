(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{"919n":function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var o=n("LvDl"),s=n("8Y7J"),r=n("7ZA2");let i=(()=>{class t{constructor(t){this._authConfig=t}isActionAllowed(t,e){const n=Object(o.get)(JSON.parse(localStorage.getItem("organization")),"org_type"),s=Object(o.get)(JSON.parse(localStorage.getItem("organization")),"organization"),r=JSON.parse(this._authConfig.getUser());if(Object(o.isUndefined)(e))return Object(o.indexOf)(t,n)>=0;{const i=Object(o.find)(r.organizations,{organization:s},null);return(Object(o.indexOf)(e,i.group_name)>=0||Object(o.isNull)(i.group))&&Object(o.indexOf)(t,n)>=0}}}return t.\u0275fac=function(e){return new(e||t)(s.Yb(r.a))},t.\u0275prov=s.Kb({token:t,factory:t.\u0275fac}),t})()},lk0u:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var o=n("8Y7J"),s=n("iInd");let r=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Ib({type:t,selectors:[["page-container"]],decls:1,vars:0,template:function(t,e){1&t&&o.Pb(0,"router-outlet")},directives:[s.l],styles:[""]}),t})()},o0n2:function(t,e,n){"use strict";n.r(e),n.d(e,"SportsCategoriesModule",(function(){return f}));var o=n("iInd"),s=n("5HBU"),r=n("RT2w"),i=n("lk0u"),a=n("8Y7J"),c=n("IjP4"),l=n("l51w");const p=[{path:"",component:i.a,children:[{path:"",redirectTo:"list",pathMatch:"full"},{path:"list",component:(()=>{class t{constructor(){this.headers=[{title:"Title"},{title:"Description"},{title:"Actions"}],this.topActions=[{btnText:"CREATE",status:"primary",action:"inline",conf:{context:"Sports Category",store:"sports-categories",btnText:"SAVE"}}],this.rows=[{key:"name",type:"string"},{key:"description",type:"string"}],this.actions=[{btnText:"EDIT",status:"accent",icon:!1,disableStatus:"FINISHED",action:"inline",modalConf:{store:"sports-categories",titleKey:"title",context:"Sports Categories",btnText:"SAVE"}}]}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=a.Ib({type:t,selectors:[["sports-catgeories-list"]],decls:5,vars:7,consts:[["title","Sports Categories"],[1,"w-100-p","d-flex","px-5"],["title","Listing","store","sports-categories",1,"w-100-p",3,"headers","no-card","has-action","topActions","hasSearch","actions","rows"]],template:function(t,e){1&t&&(a.Ub(0,"div"),a.Pb(1,"page-header",0),a.Tb(),a.Ub(2,"div",1),a.Ub(3,"div",1),a.Pb(4,"dynamic-table",2),a.Tb(),a.Tb()),2&t&&(a.Bb(4),a.nc("headers",e.headers)("no-card",!1)("has-action",!0)("topActions",e.topActions)("hasSearch",!0)("actions",e.actions)("rows",e.rows))},directives:[c.a,l.a],styles:["[_nghost-%COMP%]{\n            width: 100%;\n        }"]}),t})()}]}];let u=(()=>{class t{}return t.\u0275mod=a.Mb({type:t}),t.\u0275inj=a.Lb({factory:function(e){return new(e||t)},imports:[[o.k.forChild(p)],o.k]}),t})();var d=n("2l/B"),b=n("5wFq");let f=(()=>{class t{}return t.\u0275mod=a.Mb({type:t}),t.\u0275inj=a.Lb({factory:function(e){return new(e||t)},imports:[[r.a,o.k,b.a,s.a,d.a,u]]}),t})()}}]);
//# sourceMappingURL=18-es2015.261bc38868894e3c8ac6.js.map
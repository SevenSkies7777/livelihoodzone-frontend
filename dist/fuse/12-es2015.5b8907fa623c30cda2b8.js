(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"919n":function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var o=n("LvDl"),i=n("8Y7J"),a=n("7ZA2");let s=(()=>{class t{constructor(t){this._authConfig=t}isActionAllowed(t,e){const n=Object(o.get)(JSON.parse(localStorage.getItem("organization")),"org_type"),i=Object(o.get)(JSON.parse(localStorage.getItem("organization")),"organization"),a=JSON.parse(this._authConfig.getUser());if(Object(o.isUndefined)(e))return Object(o.indexOf)(t,n)>=0;{const s=Object(o.find)(a.organizations,{organization:i},null);return(Object(o.indexOf)(e,s.group_name)>=0||Object(o.isNull)(s.group))&&Object(o.indexOf)(t,n)>=0}}}return t.\u0275fac=function(e){return new(e||t)(i.Yb(a.a))},t.\u0275prov=i.Kb({token:t,factory:t.\u0275fac}),t})()},DIkt:function(t,e,n){"use strict";n.r(e),n.d(e,"AllowancesModule",(function(){return f}));var o=n("iInd"),i=n("5HBU"),a=n("2l/B"),s=n("5wFq"),c=n("RT2w"),r=n("lk0u"),l=n("8Y7J"),u=n("IjP4"),p=n("l51w");const d=[{path:"",component:r.a,children:[{path:"",redirectTo:"list",pathMatch:"full"},{path:"list",component:(()=>{class t{constructor(){this.headers=[{title:"Ttile"},{title:"Rates"},{title:"Description"},{title:"Action"}],this.topActions=[{btnText:"CREATE",status:"primary",action:"inline",conf:{context:"Allowance",store:"allowances",btnText:"SAVE"}}],this.rows=[{key:"name",type:"string"},{key:"amount",type:"currency"},{key:"description",type:"string"}],this.actions=[{btnText:"EDIT",status:"accent",icon:!1,disableStatus:"FINISHED",action:"inline",modalConf:{store:"allowances",titleKey:"title",context:"Allowances",btnText:"SAVE"}}]}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=l.Ib({type:t,selectors:[["allowances-list"]],decls:5,vars:7,consts:[["title","Allowances"],[1,"w-100-p","d-flex","px-5"],["title","Listing","store","allowances",1,"w-100-p",3,"headers","no-card","has-action","topActions","hasSearch","actions","rows"]],template:function(t,e){1&t&&(l.Ub(0,"div"),l.Pb(1,"page-header",0),l.Tb(),l.Ub(2,"div",1),l.Ub(3,"div",1),l.Pb(4,"dynamic-table",2),l.Tb(),l.Tb()),2&t&&(l.Bb(4),l.nc("headers",e.headers)("no-card",!1)("has-action",!0)("topActions",e.topActions)("hasSearch",!0)("actions",e.actions)("rows",e.rows))},directives:[u.a,p.a],styles:["[_nghost-%COMP%]{\n            width: 100%;\n        }"]}),t})()}]}];let b=(()=>{class t{}return t.\u0275mod=l.Mb({type:t}),t.\u0275inj=l.Lb({factory:function(e){return new(e||t)},imports:[[o.k.forChild(d)],o.k]}),t})(),f=(()=>{class t{}return t.\u0275mod=l.Mb({type:t}),t.\u0275inj=l.Lb({factory:function(e){return new(e||t)},imports:[[c.a,o.k,b,s.a,i.a,a.a]]}),t})()},lk0u:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var o=n("8Y7J"),i=n("iInd");let a=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Ib({type:t,selectors:[["page-container"]],decls:1,vars:0,template:function(t,e){1&t&&o.Pb(0,"router-outlet")},directives:[i.l],styles:[""]}),t})()}}]);
//# sourceMappingURL=12-es2015.5b8907fa623c30cda2b8.js.map
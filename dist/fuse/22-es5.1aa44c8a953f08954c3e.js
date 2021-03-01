!function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{JU10:function(a,n,i){"use strict";i.r(n),i.d(n,"BudgetsModule",(function(){return k}));var o,r,s,c=i("iInd"),d=i("SVse"),l=i("5HBU"),u=i("RT2w"),p=i("/vS9"),g=i("jDA0"),b=i("lk0u"),y=i("LvDl"),f=i("8Y7J"),h=i("IjP4"),m=i("l51w"),w=((o=function(){function a(e){t(this,a),this._router=e,this.headers=[{title:"Organization"},{title:"Applied Total"},{title:"Approved Total"},{title:"Financial Year"},{title:"Status"},{title:"Actions"}],this.rows=[{key:"organization",type:"nested",fieldType:"nested_string",primaryField:"organization_data.name"},{key:"total",type:"currency"},{key:"actual_total",type:"currency"},{key:"financial_year",type:"nested",fieldType:"nested_range",primaryField:"financial_year_data.starts_on",secondaryField:"financial_year_data.ends_on"},{key:"status",type:"status"}],this.actions=[{btnText:"MANAGE",status:"accent",icon:!1,disableStatus:"FINISHED",action:"tabDetails",modalConf:{qParam:"organization",link:"/budgets/details",queryParams:{current:1,step:1}}}],this.pageHeaderActions=[{btnText:"ADD NEW",status:"accent",icon:!0,bpType:["GOVERNMENT_AGENCY","PROFESSIONAL_SPORTPERSON","SPORTS_ORGANIZATION","MINISTRY"],roles:["Admin","Budget Reviewer","Ministry Approver"],modalConf:{link:"/budgets/add",queryParams:{current:1,step:1}}}]}var n,i,o;return n=a,(i=[{key:"pageHeadeAction",value:function(t){var e=Object(y.get)(JSON.parse(localStorage.getItem("organization")),"organization",null);this._router.navigate(["/budgets/add"],{queryParams:{current:1,organization:e}})}}])&&e(n.prototype,i),o&&e(n,o),a}()).\u0275fac=function(t){return new(t||o)(f.Ob(c.g))},o.\u0275cmp=f.Ib({type:o,selectors:[["budgets-list"]],decls:5,vars:8,consts:[["title","Calendar of Events",3,"actions","navigate"],[1,"w-100-p","d-flex","px-5"],["title","Listing","store","organization-budgets",1,"w-100-p",3,"addOrg","headers","no-card","has-action","hasSearch","actions","rows"]],template:function(t,e){1&t&&(f.Ub(0,"div"),f.Ub(1,"page-header",0),f.cc("navigate",(function(t){return e.pageHeadeAction(t)})),f.Tb(),f.Tb(),f.Ub(2,"div",1),f.Ub(3,"div",1),f.Pb(4,"dynamic-table",2),f.Tb(),f.Tb()),2&t&&(f.Bb(1),f.nc("actions",e.pageHeaderActions),f.Bb(3),f.nc("addOrg",!0)("headers",e.headers)("no-card",!1)("has-action",!0)("hasSearch",!0)("actions",e.actions)("rows",e.rows))},directives:[h.a,m.a],styles:["[_nghost-%COMP%]{\n            width: 100%;\n        }"]}),o),v=i("nH2V"),T=i("RDeM"),A=[{path:"",component:b.a,children:[{path:"",redirectTo:"list",pathMatch:"full"},{path:"list",component:w},{path:"add",component:T.a,data:{stepsKey:"budget",context:"Calendar of Events",listRoute:"/budgets"}},{path:"details",component:v.a,data:{store:"organization-budget",endPoint:"organization-budgets",listRoute:"/budgets"}}]}],_=((r=function e(){t(this,e)}).\u0275mod=f.Mb({type:r}),r.\u0275inj=f.Lb({factory:function(t){return new(t||r)},imports:[[c.k.forChild(A)],c.k]}),r),O=i("2l/B"),S=i("5wFq"),k=((s=function e(){t(this,e)}).\u0275mod=f.Mb({type:s}),s.\u0275inj=f.Lb({factory:function(t){return new(t||s)},imports:[[u.a,d.c,c.k,S.a,l.a,O.a,p.a,g.a,_]]}),s)}}])}();
//# sourceMappingURL=22-es5.1aa44c8a953f08954c3e.js.map
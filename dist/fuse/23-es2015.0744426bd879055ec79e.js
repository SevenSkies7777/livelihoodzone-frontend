(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{gAby:function(t,n,r){"use strict";r.r(n),r.d(n,"MyOrganizationModule",(function(){return g}));var a=r("iInd"),e=r("5HBU"),i=r("RT2w"),o=r("/vS9"),s=r("lk0u"),c=r("LvDl"),d=r("8Y7J"),u=r("SVse"),p=r("nH2V");function h(t,n){1&t&&(d.Ub(0,"div",1),d.Pb(1,"tabbed-wrapper"),d.Tb())}const l=[{path:"",component:s.a,children:[{path:"",redirectTo:"details",pathMatch:"full"},{path:"details",component:(()=>{class t{constructor(t,n){this._router=t,this._route=n}idParamChecker(){this._route.queryParams.subscribe(t=>{c.isUndefined(t.id)?this._router.navigate(["/my-organization/details"],{queryParams:{id:this.orgId}}):this.showTabs=!0})}ngOnInit(){this.orgId=JSON.parse(localStorage.getItem("organization")).organization,this.idParamChecker()}}return t.\u0275fac=function(n){return new(n||t)(d.Ob(a.g),d.Ob(a.a))},t.\u0275cmp=d.Ib({type:t,selectors:[["my-organization-wrapper"]],decls:1,vars:1,consts:[["class","w-100-p",4,"ngIf"],[1,"w-100-p"]],template:function(t,n){1&t&&d.Kc(0,h,2,0,"div",0),2&t&&d.nc("ngIf",n.showTabs)},directives:[u.t,p.a],styles:["[_nghost-%COMP%] {\n                width: 100%;\n            }"]}),t})(),data:{store:"organization",endPoint:"organizations"}}]}];let b=(()=>{class t{}return t.\u0275mod=d.Mb({type:t}),t.\u0275inj=d.Lb({factory:function(n){return new(n||t)},imports:[[a.k.forChild(l)],a.k]}),t})(),g=(()=>{class t{}return t.\u0275mod=d.Mb({type:t}),t.\u0275inj=d.Lb({factory:function(n){return new(n||t)},imports:[[i.a,a.k,e.a,o.a,b]]}),t})()}}]);
//# sourceMappingURL=23-es2015.0744426bd879055ec79e.js.map
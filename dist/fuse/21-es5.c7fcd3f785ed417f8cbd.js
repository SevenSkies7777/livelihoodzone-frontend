!function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function i(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"0xq/":function(e,a,n){"use strict";n.r(a),n.d(a,"ApplicationsModule",(function(){return Y}));var c=n("iInd"),o=n("s7LF"),l=n("iELJ"),r=n("e6WT"),s=n("Dxy4"),b=n("Tj54"),d=n("pu8Q"),p=n("Q2Ze"),u=n("5HBU"),f=n("RT2w"),g=n("/vS9"),y=n("jDA0"),h=n("lk0u"),v=n("LvDl"),m=n("buby"),T=n("8Y7J"),O=n("SVse"),_=n("f5Zh");function U(t,e){if(1&t&&(T.Ub(0,"th"),T.Mc(1),T.Tb()),2&t){var i=e.$implicit;T.Bb(1),T.Oc(" ",null==i?null:i.label," ")}}function k(t,e){if(1&t&&(T.Ub(0,"div"),T.Mc(1),T.Tb()),2&t){var i=T.gc().$implicit,a=T.gc(2).$implicit;T.Bb(1),T.Oc(" ",a[i.key]," ")}}function M(t,e){if(1&t&&(T.Ub(0,"div"),T.Mc(1),T.hc(2,"currency"),T.Tb()),2&t){var i=T.gc().$implicit,a=T.gc(2).$implicit;T.Bb(1),T.Oc(" ",T.jc(2,1,a[i.key],"Kshs ")," ")}}function A(t,e){if(1&t&&(T.Ub(0,"div"),T.Mc(1),T.hc(2,"date"),T.Tb()),2&t){var i=T.gc().$implicit,a=T.gc(2).$implicit;T.Bb(1),T.Oc(" ",T.jc(2,1,a[i.key],"dd-MM-yyyy")," ")}}function P(t,e){if(1&t&&(T.Ub(0,"div",23),T.Mc(1),T.Tb()),2&t){var i=T.gc(2).$implicit;T.Bb(1),T.Oc(" ",i.label,":\xa0 ")}}function w(t,e){if(1&t&&(T.Ub(0,"div",21),T.Kc(1,P,2,1,"div",22),T.Ub(2,"div"),T.Mc(3),T.Tb(),T.Tb()),2&t){var i=T.gc().$implicit,a=T.gc(2).$implicit,n=T.gc();T.Bb(1),T.nc("ngIf",i.label),T.Bb(2),T.Oc(" ",n.getNested(a,i.key)," ")}}function C(t,e){if(1&t&&(T.Ub(0,"div"),T.Ub(1,"span"),T.hc(2,"lowercase"),T.Mc(3),T.hc(4,"removeUnderscore"),T.hc(5,"uppercase"),T.Tb(),T.Tb()),2&t){var i=T.gc().$implicit,a=T.gc(2).$implicit;T.Bb(1),T.Eb("badge ",T.ic(2,4,a[i.key])," py-1 py-2"),T.Bb(2),T.Oc(" ",T.ic(4,6,T.ic(5,8,a[i.key]))," ")}}function B(t,e){if(1&t&&(T.Ub(0,"div",19),T.Kc(1,k,2,1,"div",12),T.Kc(2,M,3,4,"div",12),T.Kc(3,A,3,4,"div",12),T.Kc(4,w,4,2,"div",20),T.Kc(5,C,6,10,"div",12),T.Tb()),2&t){var i=e.$implicit;T.Bb(1),T.nc("ngIf","string"===i.type),T.Bb(1),T.nc("ngIf","currency"===i.type),T.Bb(1),T.nc("ngIf","date"===i.type),T.Bb(1),T.nc("ngIf","nested"===i.type),T.Bb(1),T.nc("ngIf","status"===i.type)}}function S(t,e){if(1&t&&(T.Ub(0,"td",17),T.Kc(1,B,6,5,"div",18),T.Tb()),2&t){var i=e.$implicit;T.Bb(1),T.nc("ngForOf",i.fields)}}function I(t,e){if(1&t){var i=T.Vb();T.Ub(0,"tr"),T.Kc(1,S,2,1,"td",15),T.Ub(2,"td",11),T.Ub(3,"button",16),T.cc("click",(function(){T.Ac(i);var t=e.$implicit;return T.gc().selectActivity(t)})),T.Mc(4,"SELECT"),T.Tb(),T.Tb(),T.Tb()}if(2&t){var a=T.gc();T.Bb(1),T.nc("ngForOf",a.tableConfigs)}}function x(t,e){if(1&t&&(T.Ub(0,"tr"),T.Ub(1,"td"),T.Ub(2,"div",24),T.Pb(3,"mat-spinner",25),T.Tb(),T.Tb(),T.Tb()),2&t){var i=T.gc();T.Bb(1),T.Cb("colspan",i.tableConfigs.length+1)}}function F(t,e){if(1&t&&(T.Ub(0,"tr"),T.Ub(1,"td"),T.Ub(2,"div",26),T.Ub(3,"div",27),T.Ub(4,"mat-icon",28),T.Mc(5,"folder_open"),T.Tb(),T.Tb(),T.Ub(6,"div",29),T.Mc(7," There are no approved activities. "),T.Tb(),T.Ub(8,"div",30),T.Mc(9," Once you have an approved budget with approved activities, the activities will "),T.Pb(10,"br"),T.Mc(11," appear here and you can use them to make an application. "),T.Tb(),T.Tb(),T.Tb(),T.Tb()),2&t){var i=T.gc();T.Bb(1),T.Cb("colspan",i.tableConfigs.length+1)}}var z,R,E,j,N=((z=function(){function e(i,a){t(this,e),this._dataLayer=i,this._dialogRef=a,this.list=[],this.tableConfigs=[{label:"Title",fields:[{type:"string",key:"title"}]},{label:"Activity Date",fields:[{type:"date",key:"activity_date"}]},{label:"Applied Amount",fields:[{type:"currency",key:"total"}]},{label:"Approved Amount",fields:[{type:"currency",key:"actual_total"}]},{label:"Status",fields:[{type:"status",key:"status"}]}]}return i(e,[{key:"getNested",value:function(t,e){return Object(v.get)(t,e,null)}},{key:"getActivities",value:function(){var t=this,e={current_org_id:this.organization,status:"SASDEF_APPROVED",limit:1e3};this.loading=!0,this._dataLayer.list("organization-budget-activities",e).subscribe((function(e){t.list=e.results,t.loading=!1}),(function(e){t.loading=!1,console.log(e)}))}},{key:"selectActivity",value:function(t){this.closeDialog(t)}},{key:"getACtivityStatus",value:function(t){if(t.applications.length)return t.applications.forEach((function(t){parseFloat(t.amount_requested)})),parseFloat(t.estimated_amount),!1}},{key:"setAppliedAmount",value:function(t){if(t.applications.length){var e=0;return t.applications.forEach((function(t){e+=parseFloat(t.amount_requested)})),e}return 0}},{key:"closeDialog",value:function(t){this._dialogRef.close(t)}},{key:"ngOnInit",value:function(){var t=JSON.parse(localStorage.getItem("organization"));this.organization=Object(v.get)(t,"organization",null),this.getActivities()}}]),e}()).\u0275fac=function(t){return new(t||z)(T.Ob(m.a),T.Ob(l.g))},z.\u0275cmp=T.Ib({type:z,selectors:[["activity-selection-dialog"]],features:[T.Ab([m.a])],decls:26,vars:4,consts:[["mat-dialog-title","",1,"font-size-14"],[1,"d-flex","align-items-center","mb-n3"],[1,"flex-fill"],[1,"search-form"],[1,"full-width"],["type","search","matInput","","placeholder","Search activity..."],["matSuffix","",1,"font-size-14"],[1,"mat-typography"],[1,"table"],[1,"thead-light"],[4,"ngFor","ngForOf"],[2,"width","1px"],[4,"ngIf"],["align","end",1,"pb-20","border-top","pt-8"],["mat-button","","mat-dialog-close","","cdkFocusInitial",""],["class","pb-1 align-middle",4,"ngFor","ngForOf"],["mat-raised-button","","color","defualt",3,"click"],[1,"pb-1","align-middle"],["class","pb-1",4,"ngFor","ngForOf"],[1,"pb-1"],["class","d-flex",4,"ngIf"],[1,"d-flex"],["class","text-muted",4,"ngIf"],[1,"text-muted"],[1,"d-flex","justify-content-center","py-16"],["diameter","40"],[1,"d-flex","flex-column","justify-content-center","py-16"],[1,"text-center"],[1,"font-size-100","w-100-p"],[1,"pt-16","text-center","font-size-18","pb-3"],[1,"pt-8","text-center","font-size-14","text-muted"]],template:function(t,e){1&t&&(T.Ub(0,"div",0),T.Ub(1,"div",1),T.Ub(2,"div",2),T.Mc(3,"Activities"),T.Tb(),T.Ub(4,"div"),T.Ub(5,"form",3),T.Ub(6,"mat-form-field",4),T.Ub(7,"mat-label"),T.Mc(8,"Search"),T.Tb(),T.Pb(9,"input",5),T.Ub(10,"mat-icon",6),T.Mc(11,"search"),T.Tb(),T.Tb(),T.Tb(),T.Tb(),T.Tb(),T.Tb(),T.Ub(12,"mat-dialog-content",7),T.Ub(13,"div"),T.Ub(14,"table",8),T.Ub(15,"thead",9),T.Ub(16,"tr"),T.Kc(17,U,2,1,"th",10),T.Pb(18,"th",11),T.Tb(),T.Tb(),T.Ub(19,"tbody"),T.Kc(20,I,5,1,"tr",10),T.Kc(21,x,4,1,"tr",12),T.Kc(22,F,12,1,"tr",12),T.Tb(),T.Tb(),T.Tb(),T.Tb(),T.Ub(23,"mat-dialog-actions",13),T.Ub(24,"button",14),T.Mc(25,"CLOSE"),T.Tb(),T.Tb()),2&t&&(T.Bb(17),T.nc("ngForOf",e.tableConfigs),T.Bb(3),T.nc("ngForOf",e.list),T.Bb(1),T.nc("ngIf",e.loading),T.Bb(1),T.nc("ngIf",!e.loading&&!e.list.length))},directives:[l.h,o.F,o.s,o.t,p.c,p.g,r.b,b.a,p.i,l.e,O.s,O.t,l.c,s.b,l.d,d.b],pipes:[O.d,O.f,O.p,_.a,O.G],styles:['[_nghost-%COMP%]    {font-family:RobotoDraft,Roboto,"Helvetica Neue, Helvetica, Arial",sans-serif;font-style:normal;font-weight:300;display:flex;flex-direction:column;width:100%}[_nghost-%COMP%]     .badge.open, [_nghost-%COMP%]     .badge.pending{background-color:#ffc107;color:#212529}[_nghost-%COMP%]     .badge.assigned, [_nghost-%COMP%]     .badge.rationalized{background-color:#2196f3;color:#fff}[_nghost-%COMP%]     .badge.cancelled{background-color:#dc3545;color:#fff}[_nghost-%COMP%]     .badge.inactive, [_nghost-%COMP%]     .badge.overdue{background-color:#343a40;color:#fff}[_nghost-%COMP%]     .badge.accepted, [_nghost-%COMP%]     .badge.active, [_nghost-%COMP%]     .badge.approved, [_nghost-%COMP%]     .badge.completed, [_nghost-%COMP%]     .badge.sasdef_approved, [_nghost-%COMP%]     .badge.submitted{background-color:#28a745;color:#fff}']}),z),D=n("IjP4"),$=n("l51w"),K=((R=function(){function e(i,a){t(this,e),this._router=i,this._dialog=a,this.headers=[{title:"Organization"},{title:"Applied Amount"},{title:"Required By"},{title:"Financial Year"},{title:"Status"},{title:"Actions"}],this.rows=[{key:"organization",type:"nested",fieldType:"nested_string",primaryField:"organization_data.name"},{key:"amount_requested",type:"currency"},{key:"date_requested",type:"date"},{key:"financial_year",type:"nested",fieldType:"nested_range",primaryField:"financial_year_data.starts_on",secondaryField:"financial_year_data.ends_on"},{key:"status",type:"status"}],this.actions=[{btnText:"MANAGE",status:"accent",icon:!1,disableStatus:"FINISHED",action:"tabDetails",modalConf:{qParam:"organization",link:"/applications/details",queryParams:{current:2,step:1}}}],this.pageHeaderActions=[{btnText:"APPLY FUNDS",status:"accent",icon:!0,bpType:["GOVERNMENT_AGENCY","PROFESSIONAL_SPORTPERSON","SPORTS_ORGANIZATION","MINISTRY"],roles:["Admin","Representative","Budget Reviewer","Ministry Approver"],modalConf:{link:"/applications/add",queryParams:{current:1,step:1}}}]}return i(e,[{key:"openDialog",value:function(){var t=this;this._dialog.open(N,{data:{context:"Application"},width:"75%"}).afterClosed().subscribe((function(e){Object(v.isObject)(e)&&t._router.navigate(["/applications/add"],{queryParams:Object.assign({current:1},{activity:e.id,budget:e.org_budget,organization:e.organization,amount:e.actual_total,activity_date:e.activity_date})})}))}},{key:"pageHeadeAction",value:function(t){Object(v.get)(JSON.parse(localStorage.getItem("organization")),"organization",null),this.openDialog()}}]),e}()).\u0275fac=function(t){return new(t||R)(T.Ob(c.g),T.Ob(l.b))},R.\u0275cmp=T.Ib({type:R,selectors:[["applications-list"]],decls:5,vars:8,consts:[["title","Applications",3,"actions","navigate"],[1,"w-100-p","d-flex","px-5"],["title","Listing","store","applications",1,"w-100-p",3,"addOrg","headers","no-card","has-action","hasSearch","actions","rows"]],template:function(t,e){1&t&&(T.Ub(0,"div"),T.Ub(1,"page-header",0),T.cc("navigate",(function(t){return e.pageHeadeAction(t)})),T.Tb(),T.Tb(),T.Ub(2,"div",1),T.Ub(3,"div",1),T.Pb(4,"dynamic-table",2),T.Tb(),T.Tb()),2&t&&(T.Bb(1),T.nc("actions",e.pageHeaderActions),T.Bb(3),T.nc("addOrg",!0)("headers",e.headers)("no-card",!1)("has-action",!0)("hasSearch",!0)("actions",e.actions)("rows",e.rows))},directives:[D.a,$.a],styles:["[_nghost-%COMP%]{\n            width: 100%;\n        }"]}),R),L=n("nH2V"),q=n("RDeM"),H=[{path:"",component:h.a,children:[{path:"",redirectTo:"list",pathMatch:"full"},{path:"list",component:K},{path:"add",component:q.a,data:{stepsKey:"application",context:"Application",listRoute:"/applications"}},{path:"details",component:L.a,data:{store:"application",endPoint:"applications",listRoute:"/applications"}}]}],J=((E=function e(){t(this,e)}).\u0275mod=T.Mb({type:E}),E.\u0275inj=T.Lb({factory:function(t){return new(t||E)},imports:[[c.k.forChild(H)],c.k]}),E),G=n("2l/B"),V=n("5wFq"),Y=((j=function e(){t(this,e)}).\u0275mod=T.Mb({type:j}),j.\u0275inj=T.Lb({factory:function(t){return new(t||j)},imports:[[f.a,c.k,o.z,l.f,r.c,s.c,b.b,p.e,u.a,V.a,G.a,g.a,y.a,d.a,J]]}),j)}}])}();
//# sourceMappingURL=21-es5.c7fcd3f785ed417f8cbd.js.map
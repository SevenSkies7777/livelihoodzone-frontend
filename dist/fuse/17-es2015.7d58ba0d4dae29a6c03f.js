(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"919n":function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var i=n("LvDl"),o=n("8Y7J"),a=n("7ZA2");let r=(()=>{class t{constructor(t){this._authConfig=t}isActionAllowed(t,e){const n=Object(i.get)(JSON.parse(localStorage.getItem("organization")),"org_type"),o=Object(i.get)(JSON.parse(localStorage.getItem("organization")),"organization"),a=JSON.parse(this._authConfig.getUser());if(Object(i.isUndefined)(e))return Object(i.indexOf)(t,n)>=0;{const r=Object(i.find)(a.organizations,{organization:o},null);return(Object(i.indexOf)(e,r.group_name)>=0||Object(i.isNull)(r.group))&&Object(i.indexOf)(t,n)>=0}}}return t.\u0275fac=function(e){return new(e||t)(o.Yb(a.a))},t.\u0275prov=o.Kb({token:t,factory:t.\u0275fac}),t})()},lk0u:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var i=n("8Y7J"),o=n("iInd");let a=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=i.Ib({type:t,selectors:[["page-container"]],decls:1,vars:0,template:function(t,e){1&t&&i.Pb(0,"router-outlet")},directives:[o.l],styles:[""]}),t})()},wBjc:function(t,e,n){"use strict";n.r(e),n.d(e,"OrganizationJoinRequests",(function(){return b}));var i=n("iInd"),o=n("5HBU"),a=n("RT2w"),r=n("2l/B"),s=n("5wFq"),c=n("lk0u"),l=n("8Y7J"),u=n("IjP4"),d=n("l51w");const p=[{path:"",component:c.a,children:[{path:"",redirectTo:"list",pathMatch:"full"},{path:"list",component:(()=>{class t{constructor(){this.headers=[{title:"Requsted by"},{title:"Organization"},{title:"Requested on"},{title:"Status"},{title:"Actions"}],this.topActions=[],this.rows=[{key:"requester_name",type:"string"},{key:"organization",type:"nested",fieldType:"nested_string",primaryField:"organization_data.name"},{key:"requested_on",type:"date"},{key:"review_state",type:"status"}],this.actions=[{btnText:"APPROVE",status:"success",icon:!1,action:"modal",modalConf:{disableStatus:["APPROVED","REJECTED"],store:"organization-join-requests",titleKey:"title",title:"Approve Join Request",action:"approve",description:"Kindly confirm that you would indeed like to approve\n                    the user to join this organization. The user will be able to view \n                    information associated with the following organization.",btnText:"APPROVE"}},{btnText:"REJECT",status:"warn",icon:!1,action:"modal",modalConf:{disableStatus:["APPROVED","REJECTED"],store:"organization-join-requests",titleKey:"title",title:"Reject Join Request",action:"reject",description:"Kindly confirm that you would indeed like to reject\n                    the user to join this organization. Once rejected the user will\n                    not be able to view or perform any actions for the following organization",btnText:"REJECT"}}]}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=l.Ib({type:t,selectors:[["organization-join-requests"]],decls:5,vars:8,consts:[["title","Organization Join Requests"],[1,"w-100-p","d-flex","px-5"],["title","Listing","store","organization-join-requests",1,"w-100-p",3,"headers","no-card","addOrg","has-action","topActions","hasSearch","actions","rows"]],template:function(t,e){1&t&&(l.Ub(0,"div"),l.Pb(1,"page-header",0),l.Tb(),l.Ub(2,"div",1),l.Ub(3,"div",1),l.Pb(4,"dynamic-table",2),l.Tb(),l.Tb()),2&t&&(l.Bb(4),l.nc("headers",e.headers)("no-card",!1)("addOrg",!0)("has-action",!0)("topActions",e.topActions)("hasSearch",!0)("actions",e.actions)("rows",e.rows))},directives:[u.a,d.a],styles:["[_nghost-%COMP%]{\n            width: 100%;\n        }"]}),t})()}]}];let f=(()=>{class t{}return t.\u0275mod=l.Mb({type:t}),t.\u0275inj=l.Lb({factory:function(e){return new(e||t)},imports:[[i.k.forChild(p)],i.k]}),t})(),b=(()=>{class t{}return t.\u0275mod=l.Mb({type:t}),t.\u0275inj=l.Lb({factory:function(e){return new(e||t)},imports:[[a.a,i.k,s.a,o.a,r.a,f]]}),t})()}}]);
//# sourceMappingURL=17-es2015.7d58ba0d4dae29a6c03f.js.map
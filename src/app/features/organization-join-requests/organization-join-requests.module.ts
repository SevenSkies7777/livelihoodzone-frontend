import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { HttpModule } from '../../services/http/http.module';

import { DynamicTableModule }  from '@fuse/components/dynamic-table/dynamic-table.module';
import { PageHeaderModule } from '@fuse/components/page-header/page-header.module';

import { 
    OrganizationJoinRequestsRoutingModule 
} from './organization-join-requests-routing.module';

import { 
    OrganizationJoinRequestsList 
} from './organization-join-requests-list/organization-join-requests-list.component';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        PageHeaderModule,
        FuseSharedModule,
        DynamicTableModule,
        OrganizationJoinRequestsRoutingModule,
    ],
    declarations: [
        OrganizationJoinRequestsList,
    ],
})

export class OrganizationJoinRequests {}
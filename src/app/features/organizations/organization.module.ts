import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { HttpModule } from '../../services/http/http.module';
import { 
    StepperWrapperModule
} from '@fuse/components/stepper-wrapper/stepper-wrapper.module';
import { TabbedWrapperModule } from '@fuse/components/tabbed-wrapper/tabbed-wrapper.module';
import {
    OrganizationRoutingModule
} from './organization-routing.module';

import { DynamicTableModule } from '../../../@fuse/components/dynamic-table/dynamic-table.module';
import { PageHeaderModule } from '../../../@fuse/components/page-header/page-header.module';

import { OrganizationsList } from './organization-list/organization-list.component';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        PageHeaderModule,
        FuseSharedModule,
        DynamicTableModule,
        StepperWrapperModule,
        TabbedWrapperModule,
        OrganizationRoutingModule,
    ],
    declarations: [
        OrganizationsList
    ],
})

export class OrganizationModule {}
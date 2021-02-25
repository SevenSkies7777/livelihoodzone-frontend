import { NgModule }  from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { HttpModule } from '../../services/http/http.module';
import { 
    TabbedWrapperModule 
}  from '@fuse/components/tabbed-wrapper/tabbed-wrapper.module';
import {
    MyOrganizationRoutingModule
} from './my-organization-routing.module';

import { 
    MyOrganizationWrapper 
} from './my-organization-wrapper/my-organization.wrapper.component';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        FuseSharedModule,
        TabbedWrapperModule,
        MyOrganizationRoutingModule
    ],
    declarations: [
        MyOrganizationWrapper,
    ]
})

export class MyOrganizationModule {}
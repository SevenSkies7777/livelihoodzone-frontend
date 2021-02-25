import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { 
    PageContainerComponent 
} from '@fuse/components/page-container/page-container.component';
import {
    MyOrganizationWrapper
} from './my-organization-wrapper/my-organization.wrapper.component';
const routes: Routes = [
    {
        path: '',
        component: PageContainerComponent,
        children: [
            { path: '', redirectTo: 'details', pathMatch: 'full' },
            { 
                path: 'details', 
                component: MyOrganizationWrapper,
                data: {
                    store: 'organization',
                    endPoint: 'organizations',
                }
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports : [RouterModule],
})

export class MyOrganizationRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { 
    PageContainerComponent 
} from '@fuse/components/page-container/page-container.component';
import {
    OrganizationsList
} from './organization-list/organization-list.component';
import {
    MainWrapperComponent
} from '@fuse/components/tabbed-wrapper/components/main-wrapper/main-wrapper.component';
import { MainStepperWrapperComponent } from '@fuse/components/stepper-wrapper/components/main-wrapper/main-wrapper.component';

const routes: Routes = [
    {
        path: '',
        component: PageContainerComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: OrganizationsList },
            { 
                path: 'details', 
                component: MainWrapperComponent,
                data: {
                    store: 'organization',
                    endPoint: 'organizations',
                    listRoute: '/organizations',
                }
            },
            { 
                path: 'add', 
                component: MainStepperWrapperComponent,
                data: {
                    stepsKey: 'organization',
                    context: 'Organization',
                    listRoute: '/organizations'
                }
            },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports : [RouterModule],
})

export class OrganizationRoutingModule {}
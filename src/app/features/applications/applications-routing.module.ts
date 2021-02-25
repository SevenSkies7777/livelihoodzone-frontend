import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { 
    PageContainerComponent 
} from '@fuse/components/page-container/page-container.component';
import { ApplicationsList } from './applications-list/applications-list.component';
import { 
    MainWrapperComponent 
} from '@fuse/components/tabbed-wrapper/components/main-wrapper/main-wrapper.component';
import {
    MainStepperWrapperComponent
} from '@fuse/components/stepper-wrapper/components/main-wrapper/main-wrapper.component';

const routes: Routes = [
    {
        path: '',
        component: PageContainerComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: ApplicationsList },
            {
                path: 'add',
                component: MainStepperWrapperComponent,
                data: {
                    stepsKey: 'application',
                    context: 'Application',
                    listRoute: '/applications',
                }
            },
            { 
                path: 'details',
                component: MainWrapperComponent,
                data: {
                    store: 'application',
                    endPoint: 'applications',
                    listRoute: '/applications'
                }
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports : [RouterModule],
})

export class ApplicationsRoutingModule {}
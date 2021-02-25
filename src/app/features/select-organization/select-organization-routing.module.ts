import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageContainerComponent } from '@fuse/components/page-container/page-container.component';

import { ListOrganizationComponent } from './list-organizations/list-organizations.component';
import { SearchOrganizationComponent } from './search-organization/search-organization.component';
import { AddOrganizationComponent } from './add-organization/add-organization.component';

const routes: Routes = [
    {
        path: '',
        component: PageContainerComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: ListOrganizationComponent },
            { path: 'search', component: SearchOrganizationComponent },
            { 
                path: 'add', 
                component: AddOrganizationComponent,
                data: {
                    stepsKey: 'organization',
                    context: 'Organization',
                    listRoute: '/select-organization'
                }
            },
        ],
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class SelectOrganizationRoutingModule {}
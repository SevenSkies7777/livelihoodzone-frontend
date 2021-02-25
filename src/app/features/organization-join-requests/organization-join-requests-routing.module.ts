import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { 
    PageContainerComponent 
} from '@fuse/components/page-container/page-container.component';
import { 
    OrganizationJoinRequestsList 
}  from './organization-join-requests-list/organization-join-requests-list.component';
const routes: Routes = [
    {
        path: '',
        component: PageContainerComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: OrganizationJoinRequestsList },
        ],
    },
]

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class OrganizationJoinRequestsRoutingModule {}
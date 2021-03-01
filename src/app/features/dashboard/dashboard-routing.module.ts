import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { 
    PageContainerComponent 
} from '@fuse/components/page-container/page-container.component';
import { DashboardWrapper }  from './dashboard-wrapper/dashboard-wrapper.component';


const routes: Routes = [
    {
        path: '',
        component: PageContainerComponent,
        children: [
            { path: '', redirectTo: 'labor', pathMatch: 'full' },
            { path: 'labor', component: DashboardWrapper },
            { path: 'income', component: DashboardWrapper },
        ],
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports : [RouterModule],
})

export class DashboardRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { 
    PageContainerComponent 
} from '@fuse/components/page-container/page-container.component';
import { BudgetsList } from './budgets-list/budgets-list.component';
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
            { path: 'list', component: BudgetsList },
            {
                path: 'add',
                component: MainStepperWrapperComponent,
                data: {
                    stepsKey: 'budget',
                    context: 'Calendar of Events',
                    listRoute: '/budgets'
                }
            },
            {
                path: 'details',
                component: MainWrapperComponent,
                data: {
                    store: 'organization-budget',
                    endPoint: 'organization-budgets',
                    listRoute: '/budgets',
                }
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports : [RouterModule],
})

export class BudgetsRoutingModule {}
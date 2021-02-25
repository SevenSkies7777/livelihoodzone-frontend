import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageContainerComponent } from '@fuse/components/page-container/page-container.component';
import { FinancialYearsList } from './financial-years-list/financial-year-list.component';

const routes: Routes = [
    {
        path: '',
        component: PageContainerComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: FinancialYearsList },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FinancialYearsRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { 
    PageContainerComponent 
} from '@fuse/components/page-container/page-container.component';
import { DashboardWrapper }  from './dashboard-wrapper/dashboard-wrapper.component';
import { ReportWrapperComponent } from './reports-wrapper/reports-wrapper.component';

const stateObj = (path, title) => { 
    return { 
        path,  
        data: { title, context: path }, 
        component: ReportWrapperComponent } 
    };

const routes: Routes = [
    {
        path: '',
        component: PageContainerComponent,
        children: [
            { 
                path: '', 
                redirectTo: 'labor', 
                pathMatch: 'full' 
            },
            stateObj('labor', 'Labor Patterns'),
            stateObj('migration', 'Migration Patterns'),
            stateObj('livestock-ownership', 'Livestock Ownership'),
            stateObj('income', 'Main Income Source'),
            stateObj('hunger', 'Hunger Patterns'),
            stateObj('hazard', 'Hazards'),
            stateObj('expenditure', 'Expenditure Patterns'),
            stateObj('crop-production', 'Crop Production'),
            stateObj('crop-contribution', 'Crop Income Contribution'),
            stateObj('economic-activities', 'Economic Activity Contribution'),
            { 
                path: 'income', 
                component: ReportWrapperComponent 
            },
        ],
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports : [RouterModule],
})

export class DashboardRoutingModule {}
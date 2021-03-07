import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { HttpModule } from '../../services/http/http.module';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule }  from '@angular/material/progress-bar';

import {
    DashboardRoutingModule
} from './dashboard-routing.module';

import { DashboardWrapper } from './dashboard-wrapper/dashboard-wrapper.component';
import { ReportWrapperComponent } from './reports-wrapper/reports-wrapper.component';
import { PageHeaderModule } from '@fuse/components/page-header/page-header.module';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        ChartsModule,
        
        MatCardModule,
        MatIconModule,
        MatProgressBarModule,

        FuseSharedModule,
        DashboardRoutingModule,
        PageHeaderModule,
    ],
    declarations: [
        DashboardWrapper,
        ReportWrapperComponent,
    ],
})

export class DashboardModule {}
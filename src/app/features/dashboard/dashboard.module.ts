import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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
import { MapWrapperComponent } from './map-wrapper/map-wrapper.component';
import { SharedBarChartComponent } from './components/bar-charts/bar-chart.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DynamicFormModule } from '@fuse/components';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RawDataComponent } from './raw-data/raw-data.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        CommonModule,
        ChartsModule,
        ReactiveFormsModule,
        FormsModule,
        DynamicFormModule,
        NgSelectModule,
        NgxChartsModule,

        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatProgressBarModule,
        MatTooltipModule,

        FuseSharedModule,
        DashboardRoutingModule,
        PageHeaderModule,
    ],
    declarations: [
        DashboardWrapper,
        MapWrapperComponent,
        ReportWrapperComponent,
        RawDataComponent,
        SharedBarChartComponent,
    ],
})

export class DashboardModule {}
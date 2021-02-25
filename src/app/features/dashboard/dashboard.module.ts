import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { HttpModule } from '../../services/http/http.module';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule }  from '@angular/material/progress-bar';

import {
    DashboardRoutingModule
} from './dashboard-routing.module';

import { DashboardWrapper } from './dashboard-wrapper/dashboard-wrapper.component';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        ChartsModule,
        MatIconModule,
        FuseSharedModule,
        MatProgressBarModule,
        DashboardRoutingModule
    ],
    declarations: [
        DashboardWrapper
    ],
})

export class DashboardModule {}
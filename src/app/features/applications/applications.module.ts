import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FuseSharedModule } from '@fuse/shared.module';
import { HttpModule } from '../../services/http/http.module';
import { TabbedWrapperModule } from '@fuse/components/tabbed-wrapper/tabbed-wrapper.module';
import { StepperWrapperModule } from '@fuse/components/stepper-wrapper/stepper-wrapper.module';
import {
    ApplicationsRoutingModule
} from './applications-routing.module'; 
import { DynamicTableModule } from '../../../@fuse/components/dynamic-table/dynamic-table.module';
import { PageHeaderModule } from '../../../@fuse/components/page-header/page-header.module';

import { ApplicationsList } from './applications-list/applications-list.component';
import { 
    ActivitySelectionDialog
} from './activity-selection-dialog/activity-selection-dialog.component';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        FuseSharedModule,
        PageHeaderModule,
        DynamicTableModule,
        TabbedWrapperModule,
        StepperWrapperModule,
        MatProgressSpinnerModule,
        ApplicationsRoutingModule,
    ],
    declarations: [
        ApplicationsList,
        ActivitySelectionDialog,
    ]
})

export class ApplicationsModule {}
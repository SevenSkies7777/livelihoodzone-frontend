import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule }  from '@angular/forms';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NgSelectModule } from '@ng-select/ng-select';

import { FuseSharedModule } from '@fuse/shared.module';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { HttpModule } from '../../services/http/http.module';
import { DynamicTableModule } from '@fuse/components/dynamic-table/dynamic-table.module';
import { DynamicFormModule } from '@fuse/components/dynamic-form/dynamic-form.module';
import { 
    StepperWrapperModule
} from '@fuse/components/stepper-wrapper/stepper-wrapper.module';
import { 
    SelectOrganizationRoutingModule 
} from './select-organization-routing.module';

import { 
    ListOrganizationComponent 
} from './list-organizations/list-organizations.component';
import { 
    SearchOrganizationComponent 
} from './search-organization/search-organization.component';
import {
    PreselectOrganizationDialog
} from './preselect-dialog/preselect-dialog.component';
import {
    AddOrganizationComponent
} from './add-organization/add-organization.component';
import { 
    JoinRequestDialogComponent
 } from './join-request-dialog/join-request-dialog.component';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        CommonModule,
        FormsModule,
        MatListModule,
        MatIconModule,
        MatInputModule,

        NgSelectModule,
        MatButtonModule,
        FuseSharedModule,
        FusePipesModule,
        MatDividerModule,
        MatMenuModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatToolbarModule,
        
        DynamicFormModule,
        DynamicTableModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        StepperWrapperModule,
        SelectOrganizationRoutingModule,
    ],
    declarations: [
        AddOrganizationComponent,
        ListOrganizationComponent,
        SearchOrganizationComponent,
        PreselectOrganizationDialog,
        JoinRequestDialogComponent,
    ],
})

export class SelectOrganizationModule {}
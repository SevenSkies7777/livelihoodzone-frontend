import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }  from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { HttpModule } from '../../../app/services/http/http.module';
import { DynamicTableModule } from '../dynamic-table/dynamic-table.module';
import { DynamicFormModule } from '@fuse/components/dynamic-form/dynamic-form.module';

import { TabbedWrapperService } from './services/tabbed-wrapper.service';

import { MainWrapperComponent } from './components/main-wrapper/main-wrapper.component';
import { MainDialogComponent } from './components/main-dialog/main-dialog.component';
import { AuditTrailComponent } from './components/audit-trail/audit-trail.component';
import { ActivitySummaryComponent } from './components/activity-summary/activity-summary.component';
import { HeaderAttachmentsComponent } from './components/header-attachments/header-attachments.component';
import { OrganizationSummaryComponent } from './components/organization-summary/organization-summary.component';
import { TabbedInlinedList } from './components/tabbed-inline-list/tabbed-inline-list.component';
import { AttachmentsListing } from './components/attachments-listing/attachments-listing.component';
import { ApplicationMEComponent } from './components/application-me/application-me.component';
import { NestedTabbedInlineList } from './components/nested-inline-list/nested-inline-list.component';
import { NestedListModule } from './components/nested-list/nested-list.module';
import { NestedInlineDialog } from './components/nested-inline-list/nested-inline-dialog/nested-inline-dialog.component';
import { AttachmentDialog } from './components/attachments-listing/attachment-dialog/attachment-dialog.component';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        CommonModule,
        MatIconModule,
        MatTabsModule,
        MatCardModule,
        MatListModule,
        MatMenuModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        FusePipesModule,
        MatSnackBarModule,
        DynamicFormModule,
        DynamicTableModule,
        MatExpansionModule,
        FormsModule,
        FuseSharedModule,
        ReactiveFormsModule,
        NestedListModule,
        MatProgressSpinnerModule,
    ],
    declarations: [
        TabbedInlinedList,
        AttachmentsListing,
        MainWrapperComponent,
        MainDialogComponent,
        AuditTrailComponent,
        ActivitySummaryComponent,
        OrganizationSummaryComponent,
        HeaderAttachmentsComponent,
        ApplicationMEComponent,
        NestedTabbedInlineList,
        NestedInlineDialog,
        AttachmentDialog,
    ],
    exports: [
        TabbedInlinedList,
        AttachmentsListing,
        MainWrapperComponent,
        MainDialogComponent,
        AuditTrailComponent,
        ActivitySummaryComponent,
        OrganizationSummaryComponent,
        HeaderAttachmentsComponent,
        ApplicationMEComponent,
        NestedTabbedInlineList,
        NestedInlineDialog,
        AttachmentDialog,
    ],
    providers: [
        TabbedWrapperService
    ],
})

export class TabbedWrapperModule {}
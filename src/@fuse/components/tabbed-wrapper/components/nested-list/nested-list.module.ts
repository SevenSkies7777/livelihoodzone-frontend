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

import { HttpModule } from 'app/services/http/http.module';
import { DynamicTableModule } from '@fuse/components/dynamic-table/dynamic-table.module';
import { DynamicFormModule } from '@fuse/components/dynamic-form/dynamic-form.module';

import { NestedListComponent } from './nested-list.component';
import { NesteMainDialogComponent } from './nested-main-dialog/nested-main-dialog.component';
import { 
    NestedTotalsSummaryComponent 
} from './nested-totals-summary/nested-totals-summary.component';
import { NestedCrudReviewDialog } from './nested-crud-review-dialog/nested-crud-review-dialog.component';

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
        MatProgressSpinnerModule,
    ],
    declarations: [
        NestedListComponent,
        NestedCrudReviewDialog,
        NesteMainDialogComponent,
        NestedTotalsSummaryComponent,
    ],
    exports: [
        NestedListComponent,
        NestedCrudReviewDialog,
        NesteMainDialogComponent,
        NestedTotalsSummaryComponent,
    ],
    entryComponents: [
        NesteMainDialogComponent,
        NestedCrudReviewDialog,
    ],
    providers: []
})

export class NestedListModule {

}
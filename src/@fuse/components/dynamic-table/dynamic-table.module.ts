import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { HttpModule } from '../../../app/services/http/http.module';
import { DynamicFormModule } from '@fuse/components/dynamic-form/dynamic-form.module';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu'
import { MatCheckboxModule } from '@angular/material/checkbox';

import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { DynamicTableDialog } from './components/dynamic-table-dialog/dynamic-table-dialog.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NestedStringComponent } from './components/nested-string/nested-string.component';
import { InlineReadonlyComponent } from './components/inline-readonly/inline-readonly.component';
import { InlineReadOnlyDialog } from './components/inline-readonly-dialog/inline-readonly-dialog.component';
import { CompactLineDetailsComponent } from './components/compact-line-details/compact-line-details.component';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        CommonModule,
        FormsModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatSnackBarModule,
        MatDialogModule,
        MatMenuModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NgSelectModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        DynamicFormModule,
        ReactiveFormsModule,
        FusePipesModule,
    ],
    declarations: [
        DynamicTableComponent,
        PaginationComponent,
        NestedStringComponent,
        DynamicTableDialog,
        InlineReadonlyComponent,
        InlineReadOnlyDialog,
        CompactLineDetailsComponent,
    ],
    exports: [
        DynamicTableComponent,
        PaginationComponent,
        NestedStringComponent,
        DynamicTableDialog,
        InlineReadonlyComponent,
        InlineReadOnlyDialog,
        CompactLineDetailsComponent,
    ],
    entryComponents: [
        InlineReadOnlyDialog,
    ]
})

export class DynamicTableModule {}
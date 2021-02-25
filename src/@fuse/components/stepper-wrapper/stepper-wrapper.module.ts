import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule }  from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { HttpModule } from '../../../app/services/http/http.module';
import { 
    DynamicFormModule 
} from '@fuse/components/dynamic-form/dynamic-form.module';
import { 
    DynamicTableModule
} from '@fuse/components/dynamic-table/dynamic-table.module';

import { StepperWrapperService } from './services/stepper-wrapper.service';

import { MainStepperWrapperComponent } from './components/main-wrapper/main-wrapper.component';
import { FormWrapperComponent }  from './components/form-wrapper/form-wrapper.component';
import { ListWrapperComponent } from './components/list-wrapper/list-wrapper.component';
import { AttachmentsWrapper } from './components/attachments-wrapper/attachments-wrapper.component';
import { InlineListWrapper } from './components/inline-list-wrapper/inline-list-wrapper.component';
import { NestedInlineList } from './components/nested-inline-list/nested-inline-list.component';
import { NestedListModule } from '../tabbed-wrapper/components/nested-list/nested-list.module';
import { AttachmentWrapperDialog } from './components/attachments-wrapper/attachment-wrapper-dialog/attachment-wrapper-dialog.component';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatMenuModule,
        MatButtonModule,
        DynamicFormModule,
        DynamicTableModule,
        ReactiveFormsModule,
        NestedListModule,
        MatProgressSpinnerModule,
    ],
    declarations: [
        InlineListWrapper,
        AttachmentsWrapper,
        FormWrapperComponent,
        ListWrapperComponent,
        NestedInlineList,
        AttachmentWrapperDialog,
        MainStepperWrapperComponent,
    ],
    exports: [
        InlineListWrapper,
        AttachmentsWrapper,
        FormWrapperComponent,
        ListWrapperComponent,
        NestedInlineList,
        AttachmentWrapperDialog,
        MainStepperWrapperComponent,
    ],
    providers: [
        StepperWrapperService
    ],
})

export class StepperWrapperModule {

}
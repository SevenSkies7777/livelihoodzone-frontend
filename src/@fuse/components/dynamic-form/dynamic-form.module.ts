import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
// import { FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule }  from '@angular/material/datepicker';

import { FormWrapperComponent } from './components/form-wrapper/form-wrapper.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormTextareaComponent } from './components/form-textarea/form-textarea.component';
import { FormDatePickerComponent } from './components/form-datepicker/form-datepicker.component';
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { NgSelectFormFieldControlDirective } from './components/form-select/ng-select.directive';
import { FormSelectDialogComponent } from './components/form-select/form-select-dialog/form-select-dialog.component';
import { FileUploadComponent } from './components/form-upload/form-upload.component';
import { ProgressComponent } from './components/form-upload/progress/progress.component';
;

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        // FormsModule,
        NgSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatCheckboxModule,
        MatDatepickerModule,
        FormlyModule.forRoot({ 
            extras: { lazyRender: true },
            validationMessages: [
                { name: 'required', message: 'This field is required' },
            ],
            types: [
                { name: 'input', component: FormInputComponent },
                { name: 'select', component: FormSelectComponent },
                { name: 'checkbox', component: FormCheckboxComponent },
                { name: 'textarea', component: FormTextareaComponent },
                { name: 'datepicker', component: FormDatePickerComponent },
            ],
        }),
    ],
    declarations: [
        FormInputComponent,
        FormTextareaComponent,
        FormWrapperComponent,
        FormCheckboxComponent,
        FormDatePickerComponent,
        FormSelectComponent,
        FormSelectDialogComponent,
        FileUploadComponent,
        ProgressComponent,
        NgSelectFormFieldControlDirective,
    ],
    exports: [
        FormInputComponent,
        FormWrapperComponent,
        FormCheckboxComponent,
        FormDatePickerComponent,
        FormSelectComponent,
        FileUploadComponent,
        ProgressComponent,
        FormSelectDialogComponent,
        NgSelectFormFieldControlDirective,
    ],
})

export class DynamicFormModule {}
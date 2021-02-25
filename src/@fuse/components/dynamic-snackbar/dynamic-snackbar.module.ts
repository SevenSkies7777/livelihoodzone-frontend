import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DynamicSnackBarComponent } from './dynamic-snackbar.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatSnackBarModule,
    ],
    declarations: [
        DynamicSnackBarComponent,
    ],
    providers: []
})

export class DynamicSnackbarModule {}
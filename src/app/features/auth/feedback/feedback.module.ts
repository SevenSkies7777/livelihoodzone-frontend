import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FuseSharedModule } from '@fuse/shared.module';

import { FeedbackComponent } from './feedback.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FuseSharedModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
    ],
    declarations: [
        // FeedbackComponent
    ]
})

export class FeedBackModule {

}
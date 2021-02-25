import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseSharedModule } from '@fuse/shared.module';
import { EmailVerificationRoutingModule } from './email-verification-routing.module';

import { EmailVerificationComponent } from './email-verification.component';

@NgModule({
    imports: [
        RouterModule,
        MatIconModule,
        MatButtonModule,
        FuseSharedModule,
        MatProgressSpinnerModule,
        EmailVerificationRoutingModule
    ],
    declarations: [
        EmailVerificationComponent
    ],
})

export class EmailVerificationModule {}
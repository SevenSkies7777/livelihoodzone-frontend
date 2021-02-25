import { NgModule } from '@angular/core';

import { AuthModule } from './auth/auth.module';
import { EmailVerificationModule } from './email-verification/email-verification.module';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
    imports: [
        AuthModule,
        FuseSharedModule,
        EmailVerificationModule,
    ],
    exports: [],
})

export class FeaturesModule {}
import { NgModule } from  '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FuseSharedModule } from '@fuse/shared.module';
import { DynamicFormModule } from '@fuse/components/dynamic-form/dynamic-form.module';
import { AuthRoutingModule } from './auth-routing.module';
import { FeedBackModule } from './feedback/feedback.module';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ComplaintDialogComponent } from './complaint-dialog/complaint-dialog.component';
// auth services
import { AuthenticationService } from '../../services/authenticate.service';
import { Authorization } from '../../services/authorization.service';
import { DataLayerUtils } from '../../services/datalayer.utils.service';
import { HomePageService } from '../../services/home-page.service';
import { CompleteService }  from '../../services/login.service';
import { ConfigAuthUrl } from '../../services/oauth2.service';
import { Session } from '../../services/session.service';
import { Setup } from '../../services/setup.service';

const AuthServices = [AuthenticationService, 
    Authorization, DataLayerUtils, HomePageService,
    CompleteService, ConfigAuthUrl, Session, Setup
]

@NgModule({
    imports: [
        RouterModule,
        ReactiveFormsModule,
        DynamicFormModule,
        AuthRoutingModule,
        FuseSharedModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        FeedBackModule,
    ],
    declarations: [
        SignInComponent,
        SignUpComponent,
        FeedbackComponent,
        ComplaintDialogComponent,
    ],
    entryComponents: [
        ComplaintDialogComponent
    ],
    providers: [...AuthServices],
})

export class AuthModule {

}
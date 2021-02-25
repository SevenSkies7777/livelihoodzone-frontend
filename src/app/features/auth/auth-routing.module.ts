import { RouterModule, Routes } from  '@angular/router';
import { NgModule } from '@angular/core';

import { PageContainerComponent } from '@fuse/components/page-container/page-container.component';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
    {
        path: '',
        component: PageContainerComponent,
        children: [
            { path: '', redirectTo: 'signin', pathMatch: 'full' },
            { path: 'signin', component: SignInComponent },
            { path: 'signup', component: SignUpComponent },
            { path: 'feedback', component: FeedbackComponent },
        ],
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class AuthRoutingModule {}
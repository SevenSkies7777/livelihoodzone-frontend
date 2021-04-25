import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import * as moment from 'moment';

const routes: Routes = [
    {
        path: 'sample',
        loadChildren: () => import('./main/sample/sample.module')
            .then(m => m.SampleModule),
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module')
            .then(m => m.DashboardModule),
    },
    {
        path: 'users',
        loadChildren: () => import('./features/users/users.module')
            .then(m => m.UsersModule)
    },
    {
        path: 'counties',
        loadChildren: () => import('./features/counties/counties.module')
            .then(m => m.CountiesModule)
    },
    {
        path: 'livelihoodzones',
        loadChildren: () => import('./features/livelihoodzones/livelihoodzones.module')
            .then(m => m.LivelihoodzonesModule)
    },
    {
        path: 'questionnaires',
        loadChildren: () => import('./features/questionnaires/questionnaire.module')
            .then(m => m.QuestionnaireModule)
    },
    {
        path: 'organizations',
        loadChildren: () => import('./features/organizations/organization.module')
            .then(m => m.OrganizationModule),
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.module')
            .then(m => m.AuthModule),
    },
    {
        path: 'verification',
        loadChildren: () => import('./features/email-verification/email-verification.module')
            .then(m => m.EmailVerificationModule),
    },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth' },
];

const config: ExtraOptions = {
    useHash: false,
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
})

export class AppRoutingModule {}
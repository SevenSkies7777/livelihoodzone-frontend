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
        path: 'applications',
        loadChildren: () => import('./features/applications/applications.module')
            .then(m => m.ApplicationsModule),
    },
    {
        path: 'budgets',
        loadChildren: () => import('./features/budgets/budgets.module')
            .then(m => m.BudgetsModule),
    },
    {
        path: 'organizations',
        loadChildren: () => import('./features/organizations/organization.module')
            .then(m => m.OrganizationModule),
    },
    {
        path: 'sports-categories',
        loadChildren: () => import('./features/sports-categories/sports-categories.module')
            .then(m => m.SportsCategoriesModule),
    },
    {
        path: 'billable-items',
        loadChildren: () => import('./features/billable-items/billable-items.module')
            .then(m => m.BillableItemsModule),
    },
    {
        path: 'allowances',
        loadChildren: () => import('./features/allowances/allowances.module')
            .then(m => m.AllowancesModule),
    },
    {
        path: 'organization-join-requests',
        loadChildren: () => import('./features/organization-join-requests/organization-join-requests.module')
            .then(m => m.OrganizationJoinRequests),
    },
    {
        path: 'document-types',
        loadChildren: () => import('./features/document-types/document-types.module')
            .then(m => m.DocumentTypesModule),
    },
    {
        path: 'financial-years',
        loadChildren: () => import('./features/financial-years/financial-years.module')
            .then(m => m.FinancialYearsModule),
    },
    {
        path: 'my-organization',
        loadChildren: () => import('./features/my-organization/my-organization.module')
            .then(m => m.MyOrganizationModule),
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
    {
        path: 'select-organization',
        loadChildren: () => import('./features/select-organization/select-organization.module')
            .then(m => m.SelectOrganizationModule),
    },
    {
        path: 'crm',
        loadChildren: () => import('./features/CRM/crm.module')
            .then(m => m.CRMModule),
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
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageContainerComponent } from '@fuse/components/page-container/page-container.component';
import { CrmTabbedWrappercomponent } from './crm-tabbed-wrapper/crm-tabbed-wrapper.component';
import { ComplaintsListing } from './complaints-listing/complaints-listing.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactGroupsListComponent } from './contact-groups-list/contact-groups-list.component';
import { EmailGroupsListComponent } from './email-groups-list/email-groups-list.component';
import { NewsLettersComponent } from './news-letters/news-letters.component';
import { CommunicationsComponent } from './communications-list/communications-list.component';

const routes: Routes = [
    {
        path: '',
        component: CrmTabbedWrappercomponent,
        children: [
            { path: '', redirectTo: 'complaints', pathMatch: 'full' },
            { path: 'complaints', component: ComplaintsListing },
            { path: 'contacts', component: ContactsListComponent },
            { path: 'contact-groups', component: ContactGroupsListComponent },
            { path: 'email-groups', component: EmailGroupsListComponent },
            { path: 'news-letters', component: NewsLettersComponent },
            { path: 'communications', component: CommunicationsComponent },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class CRMRoutingModule {}
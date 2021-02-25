import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FuseSharedModule } from '@fuse/shared.module';
import { PageContainerModule } from '@fuse/components';
import { HttpModule } from 'app/services/http/http.module';
import { CRMRoutingModule } from './crm-routing.module';

import { CrmTabbedWrappercomponent } from './crm-tabbed-wrapper/crm-tabbed-wrapper.component';
import { PageHeaderModule } from '@fuse/components/page-header/page-header.module';
import { ComplaintsListing } from './complaints-listing/complaints-listing.component';
import { DynamicTableModule } from '@fuse/components/dynamic-table/dynamic-table.module';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactGroupsListComponent } from './contact-groups-list/contact-groups-list.component';
import { EmailGroupsListComponent } from './email-groups-list/email-groups-list.component';
import { NewsLettersComponent } from './news-letters/news-letters.component';
import { CommunicationsComponent } from './communications-list/communications-list.component';


@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        RouterModule,
        FuseSharedModule,

        MatTabsModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,

        PageHeaderModule,
        DynamicTableModule,
        PageContainerModule,
        CRMRoutingModule,
    ],
    declarations: [
        CrmTabbedWrappercomponent,
        ContactsListComponent,
        ContactGroupsListComponent,
        EmailGroupsListComponent,
        ComplaintsListing,
        CommunicationsComponent,
        NewsLettersComponent,
    ]
})

export class CRMModule {}
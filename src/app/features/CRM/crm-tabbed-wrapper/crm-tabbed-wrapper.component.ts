import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Component({
    selector: 'crm-wrapper',
    templateUrl: 'crm-tabbed-wrapper.component.html',
    styleUrls: ['crm-tabbed-wrapper.component.scss'],
})

export class CrmTabbedWrappercomponent {
    links: Array<any> = [
        {
            link: '/crm/complaints',
            label: 'Complaints',
        },
        {
            link: '/crm/contacts',
            label: 'Contacts',
        },
        {
            link: '/crm/contact-groups',
            label: 'Contact Groups',
        },
        {
            link: '/crm/email-groups',
            label: 'Email Groups',
        },
        {
            link: '/crm/communications',
            label: 'Communications',
        },
        {
            link: '/crm/news-letters',
            label: 'News Letters',
        },
    ];
    background: ThemePalette = 'primary';
    menuActions = [{}];

    constructor() {}

}
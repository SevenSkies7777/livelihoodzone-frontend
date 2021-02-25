import { Component, Input } from '@angular/core';

@Component({
    selector: 'organization-summary',
    templateUrl: 'organization-summary.component.html',
})

export class OrganizationSummaryComponent {
    @Input() organization;

    gridConf: Array<any> = [
        { title: 'Name', key: 'name' },
        { title: 'Phone #', key: 'phone_number' },
        { title: 'Email', key: 'email' },
        { title: 'Organization Type', key: 'org_type_code' },
    ]
}
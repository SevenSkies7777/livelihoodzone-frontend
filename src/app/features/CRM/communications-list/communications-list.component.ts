import { Component } from '@angular/core';

@Component({
    selector: 'communications',
    styles: [
        `:host{ width: 100% }`,
    ],
    template: `
        <div class="w-100-p d-flex px-0">
            <div class="w-100-p d-flex px-0">
                <dynamic-table title="Listing"
                class="w-100-p"
                [headers]="headers" [no-card]="true"
                [has-action]="true" store="communications"
                [hasSearch]="true" 
                [actions]="actions" [rows]="rows">
                </dynamic-table>
            </div>
        </div>
    `,
})

export class CommunicationsComponent {
    headers: Array<any> = [
        { title: 'Type' },
        { title: 'Subject' },
        { title: 'Status' },
    ];

    menuActions = [{}];

    rows: Array<any> = [
        { key: 'type', type: 'string' },
        { key: 'subject', type: 'string' },
        { key: 'status', type: 'status' },
    ];

    actions: Array<any> = [
        {
            btnText: 'RESEND',
            status: 'accent',
            icon: false,
            modalConf: {
                store: 'communicaitons',
                titleKey: 'type',
                context: 'Communication',
                btnText: 'SEND',
            }
        }
    ];
}
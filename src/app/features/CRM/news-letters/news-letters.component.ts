import { Component } from '@angular/core';

@Component({
    selector: 'news-letters',
    styles: [
        `:host{ width: 100% }`,
    ],
    template: `
        <div class="w-100-p d-flex px-0">
            <div class="w-100-p d-flex px-0">
                <dynamic-table title="Listing"
                class="w-100-p"
                [headers]="headers" [no-card]="true"
                [has-action]="true" store="news-letters"
                [hasSearch]="true"
                [actions]="actions" [rows]="rows">
                </dynamic-table>
            </div>
        </div>
    `,
})

export class NewsLettersComponent {
    headers: Array<any> = [
        { title: 'Title' },
        { title: 'Subject' },
    ];

    rows: Array<any> = [
        { key: 'title', type: 'string' },
        { key: 'subject', type: 'string' },
    ];

    actions: Array<any> = [
        {
            btnText: 'EMAIL NEWS-LETTER',
            status: 'accent',
            icon: false,
            modalConf: {
                store: 'news-letters',
                titleKey: 'title',
                context: 'News Letter',
                btnText: 'SEND',
            }
        }
    ];
}
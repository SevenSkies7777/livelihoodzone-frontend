import { Component }  from '@angular/core';

@Component({
    selector: 'organization-join-requests',
    styles: [
        `:host{
            width: 100%;
        }`,
    ],
    template: `
        <div><page-header title="Organization Join Requests"></page-header></div>
        <div class="w-100-p d-flex px-5">
            <div class="w-100-p d-flex px-5">
                <dynamic-table title="Listing"
                class="w-100-p"
                [headers]="headers" [no-card]="false" [addOrg]="true"
                [has-action]="true" store="organization-join-requests"
                [topActions]="topActions" [hasSearch]="true"
                [actions]="actions" [rows]="rows">
                </dynamic-table>
            </div>
        </div>
    `,
})

export class OrganizationJoinRequestsList {
    headers: Array<any> = [
        { title: 'Requsted by' },
        { title: 'Organization' },
        { title: 'Requested on'},
        { title: 'Status' },
        { title: 'Actions' }
    ];

    topActions: Array<any> = [];

    rows: Array<any> = [
        { key: 'requester_name', type: 'string' },
        { 
            key: 'organization', 
            type: 'nested' ,
            fieldType: 'nested_string',
            primaryField: 'organization_data.name',
        },
        { key: 'requested_on', type: 'date' },
        { key: 'review_state', type: 'status' }
    ];

    actions:Array<any> = [
        {
            btnText: 'APPROVE',
            status: 'success',
            icon: false,
            action: 'modal',
            modalConf: {
                disableStatus: ['APPROVED', 'REJECTED'],
                store: 'organization-join-requests',
                titleKey: 'title',
                title: 'Approve Join Request',
                action: 'approve',
                description: `Kindly confirm that you would indeed like to approve
                    the user to join this organization. The user will be able to view 
                    information associated with the following organization.`,
                btnText: 'APPROVE',
            }
        },
        {
            btnText: 'REJECT',
            status: 'warn',
            icon: false,
            action: 'modal',
            modalConf: {
                disableStatus: ['APPROVED', 'REJECTED'],
                store: 'organization-join-requests',
                titleKey: 'title',
                title: 'Reject Join Request',
                action: 'reject',
                description: `Kindly confirm that you would indeed like to reject
                    the user to join this organization. Once rejected the user will
                    not be able to view or perform any actions for the following organization`,
                btnText: 'REJECT',
            }
        },
    ];
}
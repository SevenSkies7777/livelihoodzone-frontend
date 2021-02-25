import { Component, Input, OnInit  } from '@angular/core';

@Component({
    selector: 'compact-line',
    template: `
        <div class="d-flex">
            <div *ngIf="config?.fieldType === 'nested_string'" >
                <div *ngIf="item?.item_data">
                    {{ item?.item_data.name }} 
                </div>
                <div *ngIf="item?.allowance_data">
                    {{ item?.allowance_data.name }} 
                </div>
                <div *ngIf="config?.context === 'attendees' &&
                item.member_data"
                class="font-size-13">
                    <span class="text-muted font-size-13">For</span>
                    {{ item?.member_data.user_name }}
                </div>
                <div *ngIf="config?.context === 'allowances'"
                class="font-size-13">
                    {{ item?.head_count }}&nbsp;
                    <span class="text-muted font-size-13">Attendees</span>
                </div>
                <div class="pt-1 d-flex" *ngIf="item?.quantity">
                    <div class="font-size-13 text-muted">
                        {{ item?.quantity | number: '1.0' }}
                    </div>
                    <div class="font-size-13 pl-1">@</div>
                    <div class="font-size-13 pl-2 text-muted">
                        {{ item?.unit_price | currency: 'Kshs '}}
                    </div>
                </div>
                <div class="pt-1 d-flex" *ngIf="item?.allowance_data">
                    <div class="font-size-13 text-muted">
                        {{ item?.days | number: '1.0' }} day(s)
                    </div>
                    <div class="font-size-13 pl-1">@</div>
                    <div class="font-size-13 pl-2 text-muted">
                        {{ item?.unit_price || 
                            item?.allowance_data.amount | currency: 'Kshs '}}
                    </div>
                </div>
            </div>
            <div *ngIf="config?.fieldType === 'nested_totals'">
                <div class="d-flex">
                    <div class="font-size-13 text-muted pr-1">Rationalized:</div> 
                    <div> {{ item?.rationalized_total || 0 | currency: 'Kshs ' }}</div>
                </div>
                <div class="d-flex">
                    <div class="font-size-13 text-muted pr-20">Approved:</div> 
                    <div>{{ item?.actual_total || 0 | currency: 'Kshs '}}</div>
                </div>
            </div>
            <div *ngIf="config?.fieldType === 'nested_status_total'">
                <div class="d-flex">
                    <div> {{ item?.total || 0 | currency: 'Kshs ' }}</div>
                </div>
                <div class="d-flex">
                    <div>
                        <span class="badge {{ item?.status | lowercase }}">
                            {{item?.status | removeUnderscore }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Start of member details -->
            
            <div *ngIf="config?.fieldType === 'nested_member'" >
                <div *ngIf="!item?.member" class="d-flex">
                    <div class="pt-0">
                        <mat-icon class="font-size-16 text-danger
                        mb-n3 mr-n2">
                            error_outline
                        </mat-icon>
                    </div>
                    <div class="text-muted">Provide member</div>
                </div>
                <div *ngIf="item?.member_data"
                    class="font-size-13 mt-n1">
                        <span class="text-muted font-size-13">For</span>
                        {{ item?.member_data.user_name }}
                </div>
                <div class="pt-1 d-flex pl-2 mt-n1" *ngIf="item?.allowance_data">
                    <div class="font-size-13 text-muted">
                        {{ item?.days | number: '1.0' }} day(s)
                    </div>
                    <div class="font-size-13 pl-1">@</div>
                    <div class="font-size-13 pl-2 text-muted">
                        {{ item?.unit_price || 
                            item?.allowance_data.amount | currency: 'Kshs '}}
                    </div>
                </div>
            </div>
            <!-- End of member details -->

            <!-- Activity line details -->
            <div *ngIf="config?.fieldType === 'activity_details'">
                <div *ngIf="item?.budget_activity_item_data">
                    <div>
                        <span class="text-muted font-size-13 font-weight-500"> Total:&nbsp;</span>
                        {{ item?.budget_activity_item_data?.actual_total | currency: 'Kshs '}}
                    </div>
                </div>
                <div *ngIf="!item?.budget_activity_item_data">
                    <mat-icon>remove</mat-icon>
                </div>
                <div *ngIf="item?.budget_activity_item_data">
                    <div class="pt-1 d-flex" *ngIf="item?.budget_activity_item_data.quantity">
                        <div class="font-size-13 text-muted">
                            {{ item?.budget_activity_item_data.quantity | number: '1.0' }}
                        </div>
                        <div class="font-size-13 pl-1">@</div>
                        <div class="font-size-13 pl-2 text-muted">
                            {{ item?.budget_activity_item_data.actual_price | currency: 'Kshs '}}
                        </div>
                    </div>
                    <div class="pt-1 d-flex" *ngIf="item?.budget_activity_item_data.allowance_data">
                        <div class="font-size-13 text-muted">
                            {{ item?.budget_activity_item_data.days | number: '1.0' }} day(s)
                        </div>
                        <div class="font-size-13 pl-1">@</div>
                        <div class="font-size-13 pl-2 text-muted">
                            {{ item?.budget_activity_item_data.unit_price || 
                                item?.budget_activity_item_data.allowance_data.actual_amount | currency: 'Kshs '}}
                        </div>
                    </div>
                </div>
            </div>
            <!-- End of activity line details -->
        </div>
    `,
    styleUrls: ['compact-line-details.component.scss',
        '../dynamic-table/dynamic-table.component.scss'],
})

export class CompactLineDetailsComponent implements OnInit {
    @Input() item: any;
    @Input() config: any;

    ngOnInit() {}
}
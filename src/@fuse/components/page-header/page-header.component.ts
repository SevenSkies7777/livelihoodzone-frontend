import { Component, EventEmitter, Input, Output, OnInit }  from '@angular/core';

import { AuthCheckerService } from 'app/services/auth-checkers.service';
import { has } from 'lodash';

@Component({
    selector: 'page-header',
    styleUrls: ['./page-header.component.scss'],
    template: `
        <div class="cont d-flex"
        [class.less-margin]="actions['length'] > 0">
            <div class="flex-fill">
                <span class="title pl-16">{{ title }}</span>
            </div>
            <div class="d-flex justify-content-end pr-20"
            *ngIf="actions['length'] > 0">
                <span *ngFor="let act of actions">
                    <button mat-raised-button class="pl-3" 
                    (click)="navigationAction(act)"
                    *ngIf="allowedCheckers(act)">
                        <mat-icon>add</mat-icon>
                        &nbsp;{{ act.btnText }}
                    </button>
                </span>
            </div>
            <div class="d-flex justify-content-end pr-24"
            *ngIf="menuActions['length'] > 0">
                <span>
                    <button mat-raised-button class="pr-2"
                    [matMenuTriggerFor]="menu">
                        SEND MESSAGE
                        <mat-icon class="mt-n1">keyboard_arrow_down</mat-icon>
                    </button>
                    <mat-menu #menu="matMenu">
                        <button mat-menu-item class="pr-16"
                        (click)="navigationAction('transportation_event')">
                            <mat-icon>email</mat-icon>
                            <span>SEND EMAIL</span>
                        </button>
                        <mat-divider></mat-divider>
                        <button mat-menu-item class="pr-16"
                        (click)="navigationAction('attendance')">
                            <mat-icon>message</mat-icon>
                            <span>SEND SMS</span>
                        </button>
                    </mat-menu>
                </span>
            </div>
        </div>
    `,
    providers: [AuthCheckerService],
})

export class PageHeaderComponent implements OnInit {
    @Input () title: string = '';
    @Input() actions: Array<any> = [];
    @Input() menuActions: Array<any> = [];

    @Output() navigate = new EventEmitter();

    constructor(private _authCheckerServ: AuthCheckerService) {}

    navigationAction(action) {
        this.navigate.emit(action);
    }

    allowedCheckers(act) {
        if (has(act, 'bpType')) {
            return this._authCheckerServ.isActionAllowed(act.bpType, act.roles);
        } else {
            return true;
        }
    }

    ngOnInit() {}
}
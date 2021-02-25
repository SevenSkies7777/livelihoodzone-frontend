import { Component, OnInit, Inject } from '@angular/core';

import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'dynamic-snackbar',
    styleUrls: ['dynamic-snackbar.component.scss'],
    template: `
        <div fxLayout="row" class="d-flex snack-container box-{{getIcon.type | lowercase }} ">
            <div> <mat-icon> {{getIcon.icon}} </mat-icon></div>
            <div class="flex-fill pl-2 pr-16"> <span> {{ data.message }} </span> </div>
            <div class="snack-container-icon"> 
                <mat-icon class="hover-pointer"
                (click)="closeSnackBar()">close</mat-icon>
            </div>
        </div>`,
})

export class DynamicSnackBarComponent implements OnInit {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

    get getIcon() {
        switch (this.data.snackType) {
            case 'success':
                return { type: this.data.snackType, icon: 'check_circle' };
            case 'error':
                return { type: this.data.snackType, icon: 'error' };
            case 'warn':
                return { type: this.data.snackType, icon: 'warning' };
            case 'info':
                return { type: this.data.snackType, icon: 'info' };
        }
    }

    closeSnackBar() {
        this.data.snackBar.dismiss();
    }

    ngOnInit() {}
}
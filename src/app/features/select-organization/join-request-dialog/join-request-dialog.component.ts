import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataLayerService } from 'app/services/http/dataLayer.service';

@Component({
    selector: 'join-request-dialog',
    templateUrl: 'join-request-dialog.component.html',
    styleUrls: ['join-request-dialog.component.scss'],
    providers: [DataLayerService],
})

export class JoinRequestDialogComponent {
    loading: boolean;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<JoinRequestDialogComponent>,
        private _dataLayer: DataLayerService) {}

    closeDialog(arg?) {
        this.dialogRef.close(arg);
    }

    requestToJoin() {
        const postParams = {
            requester: this.data.user.id,
            organization: this.data.organization.id,
        }
        this.loading = true;
        this._dataLayer.create('organization-join-requests', postParams)
            .subscribe(resp => {
                this.closeDialog('refresh');
                this.loading = false;
                const msg = 'Request to join organization sent successfully';
                this._dataLayer.openDynamicSnackBar(msg, 'success');
            }, err => {
                console.log(err);
                this.loading = false;
                const errMsg = 'An error occurred when requesting to join. Try again';
                this._dataLayer.openDynamicSnackBar(errMsg, 'error');
            });
    }
}
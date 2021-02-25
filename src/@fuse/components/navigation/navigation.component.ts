import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { each, get, has, indexOf, isUndefined } from 'lodash';

@Component({
    selector       : 'fuse-navigation',
    templateUrl    : './navigation.component.html',
    styleUrls      : ['./navigation.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseNavigationComponent implements OnInit
{
    @Input()
    layout = 'vertical';

    @Input()
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    /**
     * Org checker to hide and show menu entries base on org type
     */
    orgChecker() {
        const organization = JSON.parse(localStorage.getItem('organization'));
        const permsArray = [
            {
                id: 'organizations',
                bpType: ['SASDEF'],
            },
            {
                id: 'sports-categories',
                bpType: ['SASDEF'],
            },
            {
                id: 'billable-items',
                bpType: ['SASDEF'],
            },
            {
                id: 'allowances',
                bpType: ['SASDEF'],
            },
            {
                id: 'document-types',
                bpType: ['SASDEF'],
            },
            {
                id: 'financial-years',
                bpType: ['SASDEF'],
            },
            {
                id: 'crm',
                bpType: ['SASDEF'],
            },
        ]
        if (!isUndefined(organization)) {
            const orgType = get(organization, 'org_type', null);
            each(permsArray, navItem => {
                if (indexOf(navItem.bpType, orgType) >= 0) {
                    this._fuseNavigationService.updateNavigationItem(navItem.id, {
                        hidden: false,
                    });
                } else {
                    this._fuseNavigationService.updateNavigationItem(navItem.id, {
                        hidden: true,
                    });
                }
            });
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();

        // Subscribe to the current navigation changes
        this._fuseNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.orgChecker();
                // Load the navigation
                this.navigation = this._fuseNavigationService.getCurrentNavigation();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to navigation item
        merge(
            this._fuseNavigationService.onNavigationItemAdded,
            this._fuseNavigationService.onNavigationItemUpdated,
            this._fuseNavigationService.onNavigationItemRemoved
        ).pipe(takeUntil(this._unsubscribeAll))
         .subscribe(() => {

             // Mark for check
             this._changeDetectorRef.markForCheck();
         });
    }
}

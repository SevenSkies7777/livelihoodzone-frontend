import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { HttpModule } from '../../services/http/http.module';

import { BillableItemsRoutingModule } from './billable-items-routing.module';
import { DynamicTableModule } from '../../../@fuse/components/dynamic-table/dynamic-table.module';
import { PageHeaderModule } from '../../../@fuse/components/page-header/page-header.module';

import { BillableItemsList } from './billable-items-list/billable-items-list.component';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        PageHeaderModule,
        FuseSharedModule,
        DynamicTableModule,
        BillableItemsRoutingModule
    ],
    declarations: [
        BillableItemsList
    ],
})

export class BillableItemsModule {}
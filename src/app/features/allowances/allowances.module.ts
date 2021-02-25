import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';

import { DynamicTableModule } from '@fuse/components/dynamic-table/dynamic-table.module';
import  { PageHeaderModule } from '@fuse/components/page-header/page-header.module';
import { HttpModule } from 'app/services/http/http.module';
import { AllowancesRoutingModule } from './allowances-routing.module';
import { AllowancesListComponent } from './allowances-list/allowances-list.component';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        AllowancesRoutingModule,
        PageHeaderModule,
        FuseSharedModule,
        DynamicTableModule,
    ],
    declarations: [
        AllowancesListComponent,
    ]
})

export class AllowancesModule {}
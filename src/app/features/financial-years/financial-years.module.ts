import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { HttpModule } from '../../services/http/http.module';

import { FinancialYearsRoutingModule } from './financial-years-routing.module';
import { DynamicTableModule } from '../../../@fuse/components/dynamic-table/dynamic-table.module';
import { PageHeaderModule } from '../../../@fuse/components/page-header/page-header.module';
import { FinancialYearsList } from './financial-years-list/financial-year-list.component';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        PageHeaderModule,
        FuseSharedModule,
        DynamicTableModule,
        FinancialYearsRoutingModule,
    ],
    declarations: [
        FinancialYearsList,
    ],
})

export class FinancialYearsModule {}
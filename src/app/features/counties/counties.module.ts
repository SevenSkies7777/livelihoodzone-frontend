import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from '@fuse/components/page-header/page-header.module';
import { PageContainerModule } from '@fuse/components';
import { DynamicTableModule } from '@fuse/components/dynamic-table/dynamic-table.module';
import { CountiesList } from './counties-list/counties-list.component';
import { CountiesRoutingModule } from './counties-routing.module';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        DynamicTableModule,
        PageContainerModule,
        CountiesRoutingModule,
    ],
    declarations: [
        CountiesList
    ]
})

export class CountiesModule {}
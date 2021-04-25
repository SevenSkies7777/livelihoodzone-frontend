import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivelihoodzonesList } from './livelihoodzones-list/livelihoodzones-list.component';
import { LivelihoodzonesRoutingModule } from './livelihoodzones-routing.module';
import { PageHeaderModule } from '@fuse/components/page-header/page-header.module';
import { PageContainerModule } from '@fuse/components';
import { DynamicTableModule } from '@fuse/components/dynamic-table/dynamic-table.module';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        DynamicTableModule,
        PageContainerModule,
        LivelihoodzonesRoutingModule,
    ],
    declarations: [
        LivelihoodzonesList
    ]
})

export class LivelihoodzonesModule {}
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { HttpModule } from '../../services/http/http.module';

import { DocumentTypesRoutingModule } from './document-types-routing.module';
import { DynamicTableModule } from '../../../@fuse/components/dynamic-table/dynamic-table.module';
import { PageHeaderModule } from '../../../@fuse/components/page-header/page-header.module';
import { DocumentTypesList } from './document-types-list/document-types-list.component';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        PageHeaderModule,
        FuseSharedModule,
        DynamicTableModule,
        DocumentTypesRoutingModule,
    ],
    declarations: [
        DocumentTypesList
    ],
})

export class DocumentTypesModule {}
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { HttpModule } from '../../services/http/http.module';
import { 
    SportsCategoriesRoutingModule 
} from './sports-categories-routing.module';
import { DynamicTableModule } from '../../../@fuse/components/dynamic-table/dynamic-table.module';
import { PageHeaderModule } from '../../../@fuse/components/page-header/page-header.module';

import { SportsCategoriesList } from './sports-categories-list/sports-categories-list.component';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        PageHeaderModule,
        FuseSharedModule,
        DynamicTableModule,
        SportsCategoriesRoutingModule
    ],
    declarations: [
        SportsCategoriesList
    ],
})

export class SportsCategoriesModule {}
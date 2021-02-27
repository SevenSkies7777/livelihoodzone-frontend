import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { HttpModule } from '../../services/http/http.module';
import { DynamicTableModule } from '../../../@fuse/components/dynamic-table/dynamic-table.module';
import { PageHeaderModule } from '../../../@fuse/components/page-header/page-header.module';
import { UsersList } from './users-list/users-list.component';
import { UsersRoutingModule } from './users-roting.module';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        PageHeaderModule,
        FuseSharedModule,
        DynamicTableModule,
        UsersRoutingModule,
    ],
    declarations: [
        UsersList
    ],
})

export class UsersModule {}
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FuseSharedModule } from '@fuse/shared.module';
import { HttpModule } from '../../services/http/http.module';
import { TabbedWrapperModule } from '@fuse/components/tabbed-wrapper/tabbed-wrapper.module';
import { 
    StepperWrapperModule 
} from '@fuse/components/stepper-wrapper/stepper-wrapper.module';
import {
    BudgetsRoutingModule
} from './budgets-routing.module';
import { DynamicTableModule } from '../../../@fuse/components/dynamic-table/dynamic-table.module';
import { PageHeaderModule } from '../../../@fuse/components/page-header/page-header.module';
import { BudgetsList } from './budgets-list/budgets-list.component';

@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        RouterModule,
        PageHeaderModule,
        FuseSharedModule,
        DynamicTableModule,
        TabbedWrapperModule,
        StepperWrapperModule,
        BudgetsRoutingModule,
    ],
    declarations: [
        BudgetsList
    ],
})

export class BudgetsModule {}
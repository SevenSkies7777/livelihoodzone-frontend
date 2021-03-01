import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { FuseSharedModule } from '@fuse/shared.module';
import { HttpModule } from '../../services/http/http.module';
import { DynamicTableModule } from '../../../@fuse/components/dynamic-table/dynamic-table.module';
import { PageHeaderModule } from '../../../@fuse/components/page-header/page-header.module';

import { QuestionnaireRoutingModule } from './questionnaire-routing.module';

import { QuestionnaireList } from './questionnaire-list/questionnaire-list.component';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        MatCardModule,
        MatIconModule,
        PageHeaderModule,
        FuseSharedModule,
        DynamicTableModule,
        QuestionnaireRoutingModule,
    ],
    declarations: [
        QuestionnaireList,
    ],
})

export class QuestionnaireModule {}
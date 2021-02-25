import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule }  from '@angular/material/button';
import { MatIconModule }  from  '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule }  from '@angular/material/divider';
import { PageHeaderComponent } from './page-header.component';

@NgModule({
    declarations: [
        PageHeaderComponent
    ],
    exports: [
        PageHeaderComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatDividerModule,
        MatMenuModule,
    ]
})
export class PageHeaderModule
{
}
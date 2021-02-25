import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageContainerComponent } from './page-container.component';

@NgModule({
    declarations: [
        PageContainerComponent
    ],
    exports: [
        PageContainerComponent
    ],
    imports: [
        RouterModule,
    ]
})
export class PageContainerModule
{
}

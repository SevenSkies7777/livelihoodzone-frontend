import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { 
    PageContainerComponent 
} from '@fuse/components/page-container/page-container.component';
import {
    SportsCategoriesList
} from './sports-categories-list/sports-categories-list.component';
const routes: Routes = [
    {
        path: '',
        component: PageContainerComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: SportsCategoriesList },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports : [RouterModule],
})

export class SportsCategoriesRoutingModule {}
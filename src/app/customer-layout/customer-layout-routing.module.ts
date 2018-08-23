import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerLayoutComponent } from './customer-layout.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerLayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'prefix' },
           
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerLayoutRoutingModule {} 
import { AuthGuard } from './admin/login/guard/auth.guard';
import { LoginComponent } from './admin/login/login.component';

import { LayoutsComponent } from './admin/layouts/layouts.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home/home.component';

const routes: Routes = [
  {
    path:'admin-login',
    component:LoginComponent,
    loadChildren:()=>import('./admin/login/login.module').then(x=>x.LoginModule)
  },
  {
    path: 'admin', component: LayoutsComponent,
    canActivateChild:[AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        loadChildren: () => import('./admin/home/home.module').then(m => m.HomeModule)
      }
      
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

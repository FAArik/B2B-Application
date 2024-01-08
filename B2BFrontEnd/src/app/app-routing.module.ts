import { AuthGuard } from './admin/login/guard/auth.guard';
import { LoginComponent } from './admin/login/login.component';

import { LayoutsComponent } from './admin/layouts/layouts.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { ProductsComponent } from './admin/products/products.component';
import { ProductImageComponent } from './admin/products/product-image/product-image.component';
import { PriceListsComponent } from './admin/price-lists/price-lists.component';
import { PriceListsModule } from './admin/price-lists/price-lists.module';
import { PriceListDetailComponent } from './admin/price-lists/price-list-detail/price-list-detail.component';
import { CustomersComponent } from './admin/customers/customers.component';

const routes: Routes = [
  {
    path: 'admin-login',
    component: LoginComponent,
    loadChildren: () => import('./admin/login/login.module').then(x => x.LoginModule)
  },
  {
    path: 'admin', component: LayoutsComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        loadChildren: () => import('./admin/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            component: ProductsComponent,
            loadChildren: () => import('./admin/products/products.module').then(x => x.ProductsModule)
          },
          {
            path: ':id/product-image',
            component: ProductImageComponent,
            loadChildren: () => import('./admin/products/product-image/product-image.module').then(m => m.ProductImageModule)
          }],

      },
      {
        path: 'price-lists',
        children: [
          {
            path: '',
            component: PriceListsComponent,
            loadChildren: () => import('./admin/price-lists/price-lists.module').then(m => m.PriceListsModule)
          },
          {
            path: ':id',
            component: PriceListDetailComponent,
            loadChildren: () => import('./admin/price-lists/price-list-detail/price-list-detail.module').then(m => m.PriceListDetailsModule)
          }],
      },
      {
        path: 'customers',
        children: [
          {
            path: '',
            component: CustomersComponent,
            loadChildren: () => import('./admin/customers/customers.module').then(m => m.CustomersModule)
          }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

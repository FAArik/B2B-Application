import { AuthGuard } from './admin/login/guard/auth.guard';
import { AdminLoginComponent } from './admin/login/login.component';

import { AdminLayoutsComponent } from './admin/layouts/layouts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './admin/products/products.component';
import { ProductImageComponent } from './admin/products/product-image/product-image.component';
import { PriceListsComponent } from './admin/price-lists/price-lists.component';
import { PriceListDetailComponent } from './admin/price-lists/price-list-detail/price-list-detail.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { OrderDetailComponent } from './admin/orders/order-detail/order-detail.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { HomeComponent } from './ui/home/home.component';
import { DetailComponent } from './ui/home/detail/detail.component';
import { OrderComponent } from './ui/order/order.component';
import { BasketComponent } from './ui/basket/basket.component';
import { LoginComponent } from './ui/login/login.component';
import { LayoutsComponent } from './ui/layouts/layouts.component';

const routes: Routes = [
  {
    path: 'admin-login',
    component: AdminLoginComponent,
    loadChildren: () => import('./admin/login/login.module').then(x => x.AdminLoginModule)
  },
  {
    path: '',
    component: AdminLayoutsComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            component: OrdersComponent,
            loadChildren: () => import('./admin/orders/orders.module').then(m => m.OrdersModule)
          },
          {
            path: 'order-detail/:id',
            component: OrderDetailComponent,
            loadChildren: () => import('./admin/orders/order-detail/order-detail.module').then(m => m.OrderDetailModule)
          }
        ]
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
      },
      {
        path: 'profile',
        component: ProfileComponent,
        loadChildren: () => import('./admin/profile/profile.module').then(m => m.ProfileModule)
      }

    ]
  },
  {
    path: 'ui',
    component: LayoutsComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        loadChildren: () => import("./ui/home/home.module").then(m => m.HomeModule)
      },
      {
        path: 'detail/:id',
        component: DetailComponent,
        loadChildren: () => import("./ui/home/detail/detail.module").then(m => m.DetailModule)
      },
      {
        path: 'order',
        component: OrderComponent,
        loadChildren: () => import("./ui/order/order.module").then(m => m.OrderModule)
      },
      {
        path: 'order-detail/:id',
        component: OrderDetailComponent,
        loadChildren: () => import("./ui/order/order-detail/order-detail.module").then(m => m.OrderDetailModule)
      },
      {
        path: 'basket',
        component: BasketComponent,
        loadChildren: () => import("./ui/basket/basket.module").then(m => m.BasketModule)
      },
      {
        path: 'login',
        component: LoginComponent,
        loadChildren: () => import("./ui/login/login.module").then(m => m.LoginModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

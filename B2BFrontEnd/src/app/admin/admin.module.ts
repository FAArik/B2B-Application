import { AdminLoginModule } from './login/login.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from './layouts/layouts.module';
import { ProductsModule } from './products/products.module';
import { PriceListsModule } from './price-lists/price-lists.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ProfileModule } from './profile/profile.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutsModule,
    AdminLoginModule,
    ProductsModule,
    PriceListsModule,
    CustomersModule,
    OrdersModule,
    ProfileModule
  ],
  exports: [
    LayoutsModule,
    AdminLoginModule,
    ProductsModule,
    PriceListsModule,
    CustomersModule,
    OrdersModule,
    ProfileModule
  ]
})
export class AdminModule { }

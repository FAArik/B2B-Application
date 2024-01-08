import { LoginModule } from './login/login.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsModule } from './layouts/layouts.module';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { PriceListsModule } from './price-lists/price-lists.module';
import { CustomersComponent } from './customers/customers.component';
import { CustomersModule } from './customers/customers.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    LayoutsModule,
    LoginModule,
    ProductsModule,
    PriceListsModule,
    CustomersModule
  ],
  exports: [
    HomeModule,
    LayoutsModule,
    LoginModule,
    PriceListsModule
  ]
})
export class AdminModule { }

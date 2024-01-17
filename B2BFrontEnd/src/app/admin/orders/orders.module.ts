import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrderPipe } from './pipe/order.pipe';
import { FormsModule } from '@angular/forms';
import { OrderDetailModule } from './order-detail/order-detail.module';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent
  }
]

@NgModule({
  declarations: [
    OrdersComponent,
    OrderPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    OrderDetailModule
  ], exports: [
    OrdersComponent,
    OrderDetailModule
  ]
})
export class OrdersModule { }

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from './order-detail.component';
import { FormsModule } from '@angular/forms';
import { OrderDetailPipe } from './pipe/order-detail.pipe';

const routes: Routes = [{
  path: '',
  component: OrderDetailComponent
}]


@NgModule({
  declarations: [
    OrderDetailComponent,
    OrderDetailPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [
    OrderDetailComponent
  ]
})
export class OrderDetailModule { }

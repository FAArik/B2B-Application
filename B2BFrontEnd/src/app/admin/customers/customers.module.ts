import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { CustomerPipe } from './pipe/customer.pipe';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent
  }
]

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    SweetAlert2Module,
    RouterModule.forChild(routes)
  ],
  exports: [
    CustomersComponent,
  ]
})
export class CustomersModule { }

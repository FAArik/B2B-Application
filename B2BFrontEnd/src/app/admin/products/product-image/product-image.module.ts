import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductImageComponent } from './product-image.component';
import { RouterModule, Routes } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const routes: Routes = [{
  path: '', component: ProductImageComponent
}]

@NgModule({
  declarations: [
    ProductImageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SweetAlert2Module
  ],
  exports: [
    ProductImageComponent
  ]
})
export class ProductImageModule { }

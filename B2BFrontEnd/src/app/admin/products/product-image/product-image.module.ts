import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductImageComponent } from './product-image.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '', component: ProductImageComponent
}]

@NgModule({
  declarations: [
    ProductImageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProductImageComponent
  ]
})
export class ProductImageModule { }

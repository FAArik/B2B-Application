import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceListsComponent } from './price-lists.component';
import { RouterModule, Routes } from '@angular/router';
import { PricelistpipePipe } from './pipe/pricelist.pipe';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PriceListDetailsModule } from './price-list-detail/price-list-detail.module';


const routes: Routes = [{
  path: '',
  component: PriceListsComponent
}]

@NgModule({
  declarations: [
    PriceListsComponent,
    PricelistpipePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SweetAlert2Module,
    PriceListDetailsModule
  ],
  exports: [
    PriceListsComponent,
    PriceListDetailsModule
  ]
})
export class PriceListsModule { }

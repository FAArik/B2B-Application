import { FooterModule } from './footer/footer.module';
import { AsideModule } from './aside/aside.module';
import { NavbarModule } from './navbar/navbar.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './layouts.component';


const routes: Routes = [
  {
    path: '', component: LayoutsComponent
  }
]

@NgModule({
  declarations: [
    LayoutsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavbarModule,
    AsideModule,
     FooterModule
  ],
  exports: [
    LayoutsComponent
  ]
})
export class LayoutsModule { }

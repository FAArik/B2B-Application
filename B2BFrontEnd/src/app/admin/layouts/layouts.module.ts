import { AsideModule } from './aside/aside.module';
import { NavbarModule } from './navbar/navbar.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutsComponent } from './layouts.component';
import { FooterComponent } from './footer/footer.component';


const routes: Routes = [
  {
    path: '', component: AdminLayoutsComponent
  }
]

@NgModule({
  declarations: [
    AdminLayoutsComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavbarModule,
    AsideModule
  ],
  exports: [
    AdminLayoutsComponent
  ]
})
export class LayoutsModule { }

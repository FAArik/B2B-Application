import { AdminDecodeService } from './../../admin/login/service/admin-decode.service';
import { UiproductService } from './service/uiproduct.service';
import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';
import { UiProductModel } from './model/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private productService: UiproductService,
     private errorService: ErrorService, private decodeService: AdminDecodeService) { }

  products: UiProductModel[] = [];
  customerId: number = 0;
  filterText: string = "";


  ngOnInit(): void {
    this.customerId = this.decodeService.getCustomerId();
    this.getList();
  }


  getList() {
    this.productService.getList(this.customerId).subscribe((res: any) => {
      this.products = res.data;
    }, (err) => {
      this.errorService.errorHandler(err)
    })
  }

}

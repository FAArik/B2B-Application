import { Component, OnInit } from '@angular/core';
import { ProductService } from './service/product.service';
import { ErrorService } from 'src/app/services/error.service';
import { ProductModel } from './model/product.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private helperService: HelperService
  ) { }
  products: ProductModel[] = [];

  updproduct: ProductModel = new ProductModel();

  filterText: string = "";
  ngOnInit(): void {
    this.getlist()
  }

  exportExcel() {
    let element = document.getElementById("excel-table");
    let title = "Ürünler";
    this.helperService.exportExcel(element, title);
  }

  getlist() {
    this.productService.getList().subscribe((res: any) => {
      this.products = res.data;
    }, (err) => {
      this.errorService.errorHandler(err)
    })
  }
  delete(product: ProductModel) {
    this.productService.delete(product).subscribe((res: any) => {
      this.toastr.info(res.message)
      this.getlist()
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }
  add(productName: NgForm) {
    let newproduct: ProductModel = new ProductModel();
    newproduct.name = productName.value.productName
    newproduct.id = 0;
    this.productService.add(newproduct).subscribe((res: any) => {
      this.toastr.success(res.message)
      this.getlist()
      productName.resetForm();
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }
  getProduct(updateproduct: ProductModel) {
    this.productService.getById(updateproduct.id).subscribe((res: any) => {
      this.updproduct = res.data
    }, (err) => {
      this.errorService.errorHandler(err)
    });
  }
  update() {
    this.productService.update(this.updproduct).subscribe((res: any) => {
      this.toastr.success(res.message)
      this.getlist()
      document.getElementById("productEditModalCloseBtn").click()
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }


}

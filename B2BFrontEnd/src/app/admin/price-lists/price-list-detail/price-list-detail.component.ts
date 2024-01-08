import { ProductService } from './../../products/service/product.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { HelperService } from 'src/app/services/helper.service';
import { PriceListDetailService } from './service/price-list-detail.service';
import { Component, OnInit } from '@angular/core';
import { PriceListDetailModel } from './model/price-list-details.model';
import { ProductModel } from '../../products/model/product.model';

@Component({
  selector: 'app-price-list-detail',
  templateUrl: './price-list-detail.component.html',
  styleUrls: ['./price-list-detail.component.scss']
})
export class PriceListDetailComponent implements OnInit {

  constructor(
    private PriceListDetailService: PriceListDetailService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private helperService: HelperService,
    private ActivatedRoute: ActivatedRoute,
    private ProductService: ProductService
  ) { }

  products: ProductModel[] = [];
  pricelists: PriceListDetailModel[] = [];
  updPriceListDetail: PriceListDetailModel = new PriceListDetailModel();
  filterText: string = "";
  pricelistId: number = 0;
  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((res: any) => {
      this.pricelistId = res.id
      this.getlist()
      this.getProductList();
    })
  }

  exportExcel() {
    let element = document.getElementById("excel-table");
    let title = "Fiyat listeleri";
    this.helperService.exportExcel(element, title);
  }

  getlist() {
    this.PriceListDetailService.getList(this.pricelistId).subscribe((res: any) => {
      this.pricelists = res.data;   
    }, (err) => {
      this.errorService.errorHandler(err)
    })
  }
  getProductList() {
    this.ProductService.getList().subscribe((res: any) => {
      this.products = res.data;
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }
  delete(pricelistDetail: PriceListDetailModel) {
    this.PriceListDetailService.delete(pricelistDetail).subscribe((res: any) => {
      this.toastr.info(res.message)
      this.getlist()
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }
  add(addForm: NgForm) {
    let pricelistDetail: PriceListDetailModel = new PriceListDetailModel();
    pricelistDetail.productId = addForm.value.productId;
    pricelistDetail.price=addForm.value.price
    pricelistDetail.priceListId=this.pricelistId;
    pricelistDetail.id=0;
    console.log(addForm);
    
    
    this.PriceListDetailService.add(pricelistDetail).subscribe((res: any) => {
      this.toastr.success(res.message)
      this.getlist()
      addForm.resetForm();
    }, (err) => {
      console.log(err);
      this.errorService.errorHandler(err);
    })
  }
  getPriceListDetail(pricelistDetail: PriceListDetailModel) {
    this.PriceListDetailService.getById(pricelistDetail.id).subscribe((res: any) => {
      this.updPriceListDetail = res.data
    }, (err) => {
      this.errorService.errorHandler(err)
    });
  }
  update(pricelistdetail:PriceListDetailModel) {
    this.PriceListDetailService.update(pricelistdetail).subscribe((res: any) => {
      this.toastr.success(res.message)
      this.getlist()
    }, (err) => {   
      this.errorService.errorHandler(err);
    })
  }

}

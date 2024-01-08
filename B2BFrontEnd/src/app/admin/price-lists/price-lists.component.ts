import { Component, OnInit } from '@angular/core';
import { PriceListModel } from './model/pricelist.model';
import { PricelistService } from './service/pricelist.service';
import { ErrorService } from 'src/app/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-price-lists',
  templateUrl: './price-lists.component.html',
  styleUrls: ['./price-lists.component.scss']
})
export class PriceListsComponent implements OnInit {

  constructor(
    private priceListService: PricelistService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private helperService: HelperService
  ) { }

  pricelists: PriceListModel[] = [];
  updpricelist: PriceListModel = new PriceListModel();
  filterText: string = "";
  ngOnInit(): void {
    this.getlist()
  }

  exportExcel() {
    let element = document.getElementById("excel-table");
    let title = "Fiyat listeleri";
    this.helperService.exportExcel(element, title);
  }

  getlist() {
    this.priceListService.getList().subscribe((res: any) => {
      this.pricelists = res.data;
    }, (err) => {
      this.errorService.errorHandler(err)
    })
  }
  delete(priceList: PriceListModel) {
    this.priceListService.delete(priceList).subscribe((res: any) => {
      this.toastr.info(res.message)
      this.getlist()
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }
  add(Name: NgForm) {
    let newpricelist: PriceListModel = new PriceListModel();
    newpricelist.name = Name.value.Name
    newpricelist.id = 0;
    this.priceListService.add(newpricelist).subscribe((res: any) => {
      this.toastr.success(res.message)
      this.getlist()
      Name.resetForm();
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }
  getPriceList(updatepriceList: PriceListModel) {
    this.priceListService.getById(updatepriceList.id).subscribe((res: any) => {
      this.updpricelist = res.data
    }, (err) => {
      this.errorService.errorHandler(err)
    });
  }
  update() {
    this.priceListService.update(this.updpricelist).subscribe((res: any) => {
      this.toastr.success(res.message)
      this.getlist()
      document.getElementById("EditModalCloseBtn").click()
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }
}

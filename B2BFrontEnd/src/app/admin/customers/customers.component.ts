import { PriceListModel } from './../price-lists/model/pricelist.model';
import { PricelistService } from './../price-lists/service/pricelist.service';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from './service/customer.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { HelperService } from 'src/app/services/helper.service';
import { CustomerModel } from './model/customer.model';
import { CustomerRelationship } from './model/customer-relationship.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {


  constructor(
    private customerService: CustomerService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private helperService: HelperService,
    private priceListService: PricelistService
  ) { }

  customers: CustomerModel[] = [];
  updcustomer: CustomerModel = new CustomerModel();
  filterText: string = "";
  priceLists: PriceListModel[] = [];
  ngOnInit(): void {
    this.getList()
    this.getPriceList()
  }

  exportExcel() {
    let element = document.getElementById("excel-table");
    let title = "Müşteri listesi";
    this.helperService.exportExcel(element, title);
  }

  getList() {
    this.customerService.getList().subscribe((res: any) => {
      this.customers = res.data;
    }, (err) => {
      this.errorService.errorHandler(err)
    })
  }
  getPriceList() {
    this.priceListService.getList().subscribe((res: any) => {
      this.priceLists = res.data;
    }, (err) => {
      this.errorService.errorHandler(err)
    })
  }
  delete(customer: CustomerModel) {
    this.customerService.delete(customer).subscribe((res: any) => {
      this.toastr.info(res.message)
      this.getList()
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }
  add(Form: NgForm) {
    let newCustomer: CustomerModel = new CustomerModel();
    newCustomer.name = Form.value.name
    newCustomer.email = Form.value.email
    newCustomer.password = Form.value.password
    newCustomer.id = 0;
    this.customerService.add(newCustomer).subscribe((res: any) => {
      this.toastr.success(res.message)
      this.getList()
      Form.resetForm();
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }
  getCustomer(updatecustomer: CustomerModel) {
    this.customerService.getById(updatecustomer.id).subscribe((res: any) => {
      this.updcustomer = res.data
    }, (err) => {
      this.errorService.errorHandler(err)
    });
  }
  update() {
    this.customerService.update(this.updcustomer).subscribe((res: any) => {
      this.toastr.success(res.message)
      this.getList()
      document.getElementById("EditModalCloseBtn").click()
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }
  changePassword(password: any) {
    var customer = new CustomerModel();
    customer.id = this.updcustomer.id;
    customer.password = password.value;
    this.customerService.changePasswordByAdminPanel(customer).subscribe((res: any) => {
      this.toastr.success(res.message)
      this.getList()
      document.getElementById("EditPasswordModalCloseBtn").click()
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }
  updateRelationShip() {
    let model: CustomerRelationship = new CustomerRelationship();
    model.customerId = this.updcustomer.id;
    model.priceListId = this.updcustomer.priceListId;
    model.discount = this.updcustomer.discount;
    this.customerService.updateRelationship(model).subscribe((res: any) => {
      this.toastr.success(res.message)
      this.getList()
      document.getElementById("EditRelationshipModalCloseBtn").click()
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }
}

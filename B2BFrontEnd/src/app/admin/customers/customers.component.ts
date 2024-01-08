import { Component, OnInit } from '@angular/core';
import { CustomerService } from './service/customer.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { HelperService } from 'src/app/services/helper.service';
import { CustomerModel } from './model/customer.model';

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
    private helperService: HelperService
  ) { }

  customers: CustomerModel[] = [];
  updcustomer: CustomerModel = new CustomerModel();
  filterText: string = "";
  ngOnInit(): void {
    this.getlist()
  }

  exportExcel() {
    let element = document.getElementById("excel-table");
    let title = "Müşteri listesi";
    this.helperService.exportExcel(element, title);
  }

  getlist() {
    this.customerService.getList().subscribe((res: any) => {
      this.customers = res.data;
    }, (err) => {
      this.errorService.errorHandler(err)
    })
  }
  delete(customer: CustomerModel) {
    this.customerService.delete(customer).subscribe((res: any) => {
      this.toastr.info(res.message)
      this.getlist()
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
      this.getlist()
      Form.resetForm();
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }
  getPriceList(updatecustomer: CustomerModel) {
    this.customerService.getById(updatecustomer.id).subscribe((res: any) => {
      this.updcustomer = res.data
    }, (err) => {
      this.errorService.errorHandler(err)
    });
  }
  update() {
    this.customerService.update(this.updcustomer).subscribe((res: any) => {
      this.toastr.success(res.message)
      this.getlist()
      document.getElementById("EditModalCloseBtn").click()
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }

}

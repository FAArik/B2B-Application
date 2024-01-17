import { Component, OnInit } from '@angular/core';
import { OrderModel } from './model/order.model';
import { OrderService } from './service/order.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private helperService: HelperService
  ) { }

  orders: OrderModel[] = [];
  updorder: OrderModel = new OrderModel();
  filterText: string = "";
  statusText: string = "Tümü";
  ngOnInit(): void {
    this.getlist()
  }

  exportExcel() {
    let element = document.getElementById("excel-table");
    let title = "Siparişler listeleri";
    this.helperService.exportExcel(element, title);
  }

  getlist() {
    this.orderService.getList().subscribe((res: any) => {
      this.orders = res.data;
    }, (err) => {
      this.errorService.errorHandler(err)
    })
  }
  
  update(order:OrderModel,status:string) {
    order.status=status;
    this.orderService.update(order).subscribe((res: any) => {
      this.toastr.success(res.message)
      this.getlist()
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }

}

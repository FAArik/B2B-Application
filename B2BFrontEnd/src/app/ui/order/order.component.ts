import { Component, OnInit } from '@angular/core';
import { OrderService } from './service/order.service';
import { AdminDecodeService } from 'src/app/admin/login/service/admin-decode.service';
import { ErrorService } from 'src/app/services/error.service';
import { OrderModel } from './model/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private decode: AdminDecodeService,
    private errorService: ErrorService) { }

  orders: OrderModel[] = [];
  customerId: number = 0;
  filterText: string = '';

  ngOnInit(): void {
    this.getCustomerId() 
  }
  getCustomerId() {
    this.customerId = this.decode.getCustomerId();
    this.getlist()
  }
  getlist() {
    this.orderservice.getListDto(this.customerId).subscribe((res: any) => {
      this.orders = res.data;
    }, (err: any) => {
      this.errorService.errorHandler(err)
    });
  }
  delete(order:OrderModel) {
    this.orderservice.delete(order).subscribe((res: any) => {
      this.getlist()
    }, (err: any) => {
      this.errorService.errorHandler(err)
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { OrderDetailModel } from './model/order-detail.model';
import { OrderModel } from '../model/order.model';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
import { OrderService } from '../service/order.service';
import { OrderDetailService } from './service/order-detail.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private orderdetailService: OrderDetailService, private errorService: ErrorService, private orderservice: OrderService) { }
  orderId: number = 0;
  orderdetails: OrderDetailModel[] = [];
  order: OrderModel = new OrderModel();
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      this.orderId = res.id
      this.getlist()
      this.getorder()
    })
  }

  getlist() {
    this.orderdetailService.getList(this.orderId).subscribe((res: any) => {
      this.orderdetails = res.data;
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }
  getorder() {
    this.orderservice.getById(this.orderId).subscribe((res: any) => {
      this.order = res.data;
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }

}

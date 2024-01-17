import { ErrorService } from './../../../services/error.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OrderDetailService } from './service/order-detail.service';
import { OrderDetailModel } from './model/order-detail.model';
import { OrderService } from '../service/order.service';
import { OrderModel } from '../model/order.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private orderdetailService: OrderDetailService, private errorService: ErrorService, private orderservice: OrderService) { }
  orderId: number = 0;
  orderdetails: OrderDetailModel[]=[];
  order: OrderModel=new OrderModel();
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      this.orderId = res.id
      this.getlist()
      this.getorder()
    })
  }

  getlist() {
    this.orderdetailService.getList(this.orderId).subscribe((res: any) => {
      console.log(res);
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

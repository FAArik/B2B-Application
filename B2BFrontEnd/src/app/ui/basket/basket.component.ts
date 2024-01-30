import { OrderService } from './../../ui/order/service/order.service';
import { ErrorService } from 'src/app/services/error.service';
import { Component, OnInit } from '@angular/core';
import { BasketService } from './service/basket.service';
import { ToastrService } from 'ngx-toastr';
import { BasketModel } from './model/basket.model';
import { AdminDecodeService } from 'src/app/admin/login/service/admin-decode.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(private basketService: BasketService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private decodeService: AdminDecodeService,
    private orderService: OrderService) { }

  baskets: BasketModel[] = [];
  customerId: number = 0;
  total: number = 0;
  ngOnInit(): void {
    this.customerId = this.decodeService.getCustomerId();
    this.getList();
  }
  
  delete(basket: BasketModel) {
    this.basketService.delete(basket).subscribe((res: any) => {
      this.toastr.success("Ürün başarıyla sepetten silindi!")
      this.getList();
    }, (err: any) => {
      this.errorService.errorHandler(err)
    })
  }

  getList() {
    this.basketService.getList(this.customerId).subscribe((res: any) => {
      this.baskets = res.data;
      this.setTotal()
    }, (err) => {
      this.errorService.errorHandler(err)
    })
  }
  setTotal() {
    this.total = 0;
    this.baskets.forEach(p => {
      this.total += p.total;
    })
  }
  createOrder() {
    this.orderService.add(this.customerId).subscribe((res: any) => {
      this.toastr.success("Sipariş başarıyla oluşturuldu");
      this.getList();
    }, (err: any) => {
      this.errorService.errorHandler(err);
    })
  }
}

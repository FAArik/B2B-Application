import { Inject, Injectable } from '@angular/core';
import { OrderModel } from '../model/order.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    @Inject("apiUrl") private apiUrl: string,
    private http: HttpClient
  ) { }

  getList() {
    let api = this.apiUrl + "orders/GetListDto";
    return this.http.get(api);
  }
  getById(id: number) {
    let api = this.apiUrl + "orders/GetByIdDto/" + id;
    return this.http.get(api);
  }
  update(orders: OrderModel) {
    let api = this.apiUrl + "orders/update"
    return this.http.post(api, orders);
  }

}

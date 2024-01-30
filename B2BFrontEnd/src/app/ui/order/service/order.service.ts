import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OrderModel } from '../model/order.model';

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
  getListDto(customerId: number) {
    let api = this.apiUrl + "orders/GetListByCustomerIdDto/" + customerId;
    return this.http.get(api);
  }
  getById(id: number) {
    let api = this.apiUrl + "orders/GetByIdDto/" + id;
    return this.http.get(api);
  }
  add(customerId: number) {
    let api = this.apiUrl + "orders/add/" + customerId
    return this.http.get(api);
  }
  update(orders: OrderModel) {
    let api = this.apiUrl + "orders/update"
    return this.http.post(api, orders);
  }
  delete(order:OrderModel){
    let api = this.apiUrl + "orders/delete"
    return this.http.post(api, order);
  }


}

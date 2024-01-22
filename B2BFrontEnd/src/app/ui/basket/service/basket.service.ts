import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BasketModel } from '../model/basket.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(
    @Inject("apiUrl") private apiUrl: string,
    private http: HttpClient
  ) { }


  add(basket: BasketModel) {
    let api = this.apiUrl + "baskets/add";
    return this.http.post(api, basket);
  }

  getList(customerId: number) {
    let api = this.apiUrl + "baskets/GetListByCustomerId/" + customerId;
    return this.http.get(api);
  }

  delete(basket: BasketModel) {
    let api = this.apiUrl + "baskets/delete";
    return this.http.post(api, basket);
  }
}

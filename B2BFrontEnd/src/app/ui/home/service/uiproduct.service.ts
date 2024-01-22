import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiproductService {

  constructor(
    @Inject("apiUrl") private apiUrl: string,
    private http: HttpClient
  ) { }


  getList(customerId: number) {
    let api = this.apiUrl + "products/GetProductList/" +customerId;
    return this.http.get(api);
  }
}

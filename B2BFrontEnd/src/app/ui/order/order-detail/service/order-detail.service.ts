import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(
    @Inject("apiUrl") private apiUrl: string,
    private http: HttpClient
  ) { }

  getList(orderId: number) {
    let api = this.apiUrl + "orderdetails/GetListDto/" + orderId;
    return this.http.get(api);
  }
}

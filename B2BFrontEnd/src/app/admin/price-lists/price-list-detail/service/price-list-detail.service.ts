import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PriceListDetailModel } from '../model/price-list-details.model';

@Injectable({
  providedIn: 'root'
})
export class PriceListDetailService {

  constructor(
    @Inject("apiUrl") private apiUrl: string,
    private http: HttpClient
  ) { }

  getList(priceListDetailId: number) {
    let api = this.apiUrl + "pricelistdetails/GetListDto/" + priceListDetailId;
    return this.http.get(api);
  }
  delete(pricelistdetail: PriceListDetailModel) {
    let api = this.apiUrl + "pricelistdetails/delete"
    return this.http.post(api, pricelistdetail);
  }
  add(pricelistdetail: PriceListDetailModel) {
    let api = this.apiUrl + "PriceListDetails/Add"
    return this.http.post(api, pricelistdetail);
  }
  update(pricelistdetail: PriceListDetailModel) {
    let api = this.apiUrl + "pricelistdetails/update"
    return this.http.post(api, pricelistdetail);
  }
  getById(id: number) {
    let api = this.apiUrl + "pricelistdetails/getbyid/" + id
    return this.http.get(api);
  }
}

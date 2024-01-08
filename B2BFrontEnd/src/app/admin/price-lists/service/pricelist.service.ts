import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PriceListModel } from '../model/pricelist.model';

@Injectable({
  providedIn: 'root'
})
export class PricelistService {

  constructor(
    @Inject("apiUrl") private apiUrl: string,
    private http: HttpClient
  ) { }

  getList() {
    let api = this.apiUrl + "pricelists/GetList";
    return this.http.get(api);
  }
  delete(pricelist: PriceListModel) {
    let api = this.apiUrl + "pricelists/delete"
    return this.http.post(api, pricelist);
  }
  add(pricelist: PriceListModel) {
    let api = this.apiUrl + "pricelists/add"
    return this.http.post(api, pricelist);
  }
  update(pricelist: PriceListModel) {
    let api = this.apiUrl + "pricelists/update"
    return this.http.post(api, pricelist);
  }
  getById(id: number) {
    let api = this.apiUrl + "pricelists/getbyid/" + id
    return this.http.get(api);
  }

}

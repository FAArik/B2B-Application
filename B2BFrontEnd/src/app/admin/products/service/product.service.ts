import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ProductModel } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    @Inject("apiUrl") private apiUrl: string,
    private http: HttpClient
  ) { }

  getList() {
    let api = this.apiUrl + "products/GetList";
    return this.http.get(api);
  }
  delete(product: ProductModel) {
    let api = this.apiUrl + "products/delete"
    return this.http.post(api, product);
  }
  add(product: ProductModel) {
    let api = this.apiUrl + "products/add"
    return this.http.post(api, product);
  }
  update(product: ProductModel) {
    let api = this.apiUrl + "products/update"
    return this.http.post(api, product);
  }
  getById(id: number) {
    let api = this.apiUrl + "products/getbyid/" + id
    return this.http.get(api);
  }
}

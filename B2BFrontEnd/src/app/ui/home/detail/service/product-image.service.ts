import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  constructor(
    @Inject("apiUrl") private apiUrl: string,
    private http: HttpClient
  ) { }

  getList(productId: number) {
    let api = this.apiUrl + "ProductImages/GetListByProductId/" + productId
    return this.http.get(api);
  }
}

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ProductImageModel } from '../model/product-image.model';

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
  add(formData: any) {
    let api = this.apiUrl + "ProductImages/add/"
    return this.http.post(api, formData);
  }
  delete(productImage: ProductImageModel) {
    let api = this.apiUrl + "ProductImages/delete"
    return this.http.post(api, productImage)
  }
  setMain(productId: number) {
    let api = this.apiUrl + "ProductImages/SetMainImage/" + productId
    return this.http.get(api)
  }
}

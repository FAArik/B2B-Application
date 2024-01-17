import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CustomerModel } from '../model/customer.model';
import { CustomerRelationship } from '../model/customer-relationship.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    @Inject("apiUrl") private apiUrl: string,
    private http: HttpClient
  ) { }
  getById(id: number) {
    let api = this.apiUrl + "customers/getbyid/" + id
    return this.http.get(api);
  }
  getDtoById(id: number) {
    let api = this.apiUrl + "customers/getdtobyid/" + id
    return this.http.get(api);
  }
  getList() {
    let api = this.apiUrl + "customers/GetList";
    return this.http.get(api);
  }
  delete(customer: CustomerModel) {
    let api = this.apiUrl + "customers/delete"
    return this.http.post(api, customer);
  }
  add(customer: CustomerModel) {
    let api = this.apiUrl + "customers/add"
    return this.http.post(api, customer);
  }
  update(customer: CustomerModel) {
    let api = this.apiUrl + "customers/update"
    return this.http.post(api, customer);
  }
  updateRelationship(customerRelationship: CustomerRelationship) {
    let api = this.apiUrl + "customerRelationships/update"
    return this.http.post(api, customerRelationship);
  }
  changePasswordByAdminPanel(customer: CustomerModel) { 
    let api = this.apiUrl + "customers/ChangePasswordByAdminPanel"
    return this.http.post(api, customer);
  }
}

import { ErrorService } from './../../../services/error.service';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UiLoginModel } from '../model/uilogin.model';

@Injectable({
  providedIn: 'root'
})
export class UiauthService {

  constructor(@Inject("apiUrl") private apiUrl: string, private http: HttpClient, private router: Router, private errorService: ErrorService) { }

  isAuth(): boolean {
    if (localStorage.getItem("token")) {
      return true;
    }
    return false;
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/ui"]);
  }
  login(loginForm: NgForm) {
    let api = this.apiUrl + "auth/CustomerLogin"
    let model: UiLoginModel = new UiLoginModel();
    model.email = loginForm.value.email;
    model.password = loginForm.value.password;
    this.http.post(api, model).subscribe((res: any) => {
      localStorage.setItem("token", res.data.customerAccessToken);
      this.router.navigate(['/ui'])
    }, (err) => {
      this.errorService.errorHandler(err);
    })
  }
}

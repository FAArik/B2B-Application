import { AdminloginModel } from './../models/adminLogin.model';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AdminToken } from '../models/adminToken.model';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  adminToken: AdminToken
  constructor(
    @Inject("apiUrl") private apiUrl: string,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private errorService: ErrorService) { }

  isAuthenticated() {
    if (localStorage.getItem("adminToken")) {
      return true
    }
    return false
  }
  login(adminLoginModel: AdminloginModel) {
    let api = this.apiUrl + "auth/userlogin";
    this.http.post(api, adminLoginModel).subscribe((res: any) => {
      this.adminToken = res.data;
      localStorage.setItem("adminToken", this.adminToken.adminAccessToken);
      this.router.navigateByUrl("/");
      this.toastr.success("Giriş başarılı")
    }, (err) => {
      this.errorService.errorHandler(err)
    })
  }
  logout() {
    localStorage.removeItem("adminToken");
    this.router.navigateByUrl("/admin-login")
    this.toastr.info("Çıkış başarılı")
  }
}

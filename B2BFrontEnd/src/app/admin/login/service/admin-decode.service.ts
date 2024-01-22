import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminRoleModel } from '../models/adminRole.model';

@Injectable({
  providedIn: 'root'
})
export class AdminDecodeService {

  jwtHelper: JwtHelperService = new JwtHelperService();
  roles: AdminRoleModel[] = [];
  constructor() { }

  getUserId(): number {
    let decode = this.jwtHelper.decodeToken(localStorage.getItem("adminToken"))
    var userId = Object.keys(decode).filter(p => p.endsWith("/nameidentifier"))[0];
    return +decode[userId];
  }

  getUserName(): string {
    let decode = this.jwtHelper.decodeToken(localStorage.getItem("adminToken"))
    var userName = Object.keys(decode).filter(p => p.endsWith("/name"))[0];
    return decode[userName];
  }

  getUserRoles() {
    this.roles = [];
    let decode = this.jwtHelper.decodeToken(localStorage.getItem("adminToken"))
    var userRoles = Object.keys(decode).filter(p => p.endsWith("/role"));
    userRoles.forEach(element => {
      let adminRole = new AdminRoleModel();
      adminRole.role = element;
      this.roles.push(adminRole)
    });

    return this.roles;
  };
  getCustomerId(): number {
    if(localStorage.getItem("token")){
      let decode = this.jwtHelper.decodeToken(localStorage.getItem("token"))
      var userId = Object.keys(decode).filter(p => p.endsWith("/nameidentifier"))[0];
      return +decode[userId];
    }
    return 0;
  }
  
  getCustomerName(): string {
    let decode = this.jwtHelper.decodeToken(localStorage.getItem("token"))
    var userName = Object.keys(decode).filter(p => p.endsWith("/name"))[0];
    return decode[userName];
  }
}


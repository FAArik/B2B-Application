import { Component, OnInit } from '@angular/core';
import { AdminloginModel } from './models/adminLogin.model';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  AdminloginModel: AdminloginModel;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(loginForm: any) {
    this.AdminloginModel = loginForm;
    this.authService.login(this.AdminloginModel)
  }

}

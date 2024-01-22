import { NgForm } from '@angular/forms';
import { UiauthService } from './service/uiauth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private uiAuth: UiauthService) { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
    this.uiAuth.login(loginForm);
  }

}

import { UiauthService } from './../../login/service/uiauth.service';
import { AfterContentChecked, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,AfterContentChecked {

  constructor(private auth: UiauthService) { }

  isAuth: boolean = false;
  ngOnInit(): void {
    
  }
  ngAfterContentChecked(): void {
    this.isAuth = this.auth.isAuth();
  }

  logout() {
    this.auth.logout();
  }

}

import { AdminDecodeService } from './../../login/service/admin-decode.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  userName: string;
  constructor(private AdminDecode: AdminDecodeService) { }

  ngOnInit(): void {
    this.userName = this.AdminDecode.getUserName();
  }

}

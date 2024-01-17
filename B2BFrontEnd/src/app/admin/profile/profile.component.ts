import { AuthService } from './../login/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './service/user.service';
import { UserModel } from './model/user.model';
import { AdminDecodeService } from '../login/service/admin-decode.service';
import { NgForm } from '@angular/forms';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private toastrService: ToastrService,
    private userService: UserService,
    private decodeService: AdminDecodeService,
    private authService: AuthService,
    private errorService: ErrorService) { }

  userId: number = 0;
  username: string = "";

  ngOnInit(): void {
    this.getUserId();
    this.getUserName();
  }

  getUserId() {
    this.userId = this.decodeService.getUserId();
  }
  getUserName() {
    this.username = this.decodeService.getUserName();
  }

  update(updateForm: NgForm) {
    let user: UserModel = new UserModel();
    user.id = this.userId,
      user.name = this.username;
    user.password = updateForm.value.password;
    user.newPassword = updateForm.value.newPassword;

    this.userService.update(user).subscribe((res) => {
      this.toastrService.info("Kullanıcı bilgileri güncellendi tekrar giriş yapmalısınız!");
      this.authService.logout();
    }, (err) => {
      this.errorService.errorHandler(err)
    })
  }
}


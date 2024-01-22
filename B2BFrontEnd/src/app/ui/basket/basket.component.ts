import { ErrorService } from 'src/app/services/error.service';
import { Component, OnInit } from '@angular/core';
import { BasketService } from './service/basket.service';
import { ToastrService } from 'ngx-toastr';
import { BasketModel } from './model/basket.model';
import { AdminDecodeService } from 'src/app/admin/login/service/admin-decode.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(private basketService: BasketService, private errorService: ErrorService, private toastr: ToastrService, private decodeService: AdminDecodeService) { }

  baskets: BasketModel[] = [];
  customerId: number = 0;

  ngOnInit(): void {
    this.customerId = this.decodeService.getCustomerId();
    this.getList();
  }

  getList() {
    this.basketService.getList(this.customerId).subscribe((res: any) => {
      this.baskets = res.data;
    }, (err) => {
      this.errorService.errorHandler(err)
    })
  }
}

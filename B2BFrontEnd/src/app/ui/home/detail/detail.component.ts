import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { UiauthService } from '../../login/service/uiauth.service';
import { ActivatedRoute } from '@angular/router';
import { ProductImageService } from './service/product-image.service';
import { ProductImageModel } from './model/productImage.model';
import { ErrorService } from 'src/app/services/error.service';
import { UiProductModel } from 'src/app/ui/home/model/product.model';
import { AdminDecodeService } from 'src/app/admin/login/service/admin-decode.service';
import { UiproductService } from '../service/uiproduct.service';
import { BasketModel } from '../../basket/model/basket.model';
import { BasketService } from '../../basket/service/basket.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private auth: UiauthService,
    private activatedRoute: ActivatedRoute,
    private productImageService: ProductImageService,
    private errorService: ErrorService,
    private productService: UiproductService,
    private decodeService: AdminDecodeService,
    private basketService: BasketService,
    private ToastrService: ToastrService) { }

  productImages: ProductImageModel[] = [];
  products: UiProductModel[] = [];
  product: UiProductModel = new UiProductModel();

  isAuth: boolean = false;
  productId: number = 0;
  customerId: number = 0;
  quantity: number = 1;

  ngOnInit(): void {
    this.isAuth = this.auth.isAuth();
    this.activatedRoute.params.subscribe((res: any) => {
      this.productId = res.id
      this.productImageService.getList(this.productId).subscribe((res: any) => {
        this.productImages = res.data;
      }, (err) => {
        this.errorService.errorHandler(err);
      });
    })
    this.customerId = this.decodeService.getCustomerId();
    this.getList();
  }


  getList() {
    this.productService.getList(this.customerId).subscribe((res: any) => {
      this.products = res.data;
      this.product = this.products.filter(p => p.id == this.productId)[0];
    })
  }

  addBasket() {
    let model: BasketModel = new BasketModel();
    model.customerId = this.customerId;
    model.id = 0;
    model.price = (this.product.discount > 0 ? (this.product.price * (100 - this.product.discount)) / 100 : this.product.price)
    model.quantity = this.quantity;
    model.productId = this.product.id;

    this.basketService.add(model).subscribe((res: any) => {
      this.ToastrService.success("Ürün sepete başarıyla eklendi")
      this.quantity = 1;
    }, (err) => {
      this.errorService.errorHandler(err);
    })

  }

}

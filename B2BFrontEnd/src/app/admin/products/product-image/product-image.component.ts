import { ErrorService } from './../../../services/error.service';
import { ActivatedRoute } from '@angular/router';
import { ProductImageService } from './service/product-image.service';
import { Component, OnInit } from '@angular/core';
import { ProductImageModel } from './model/product-image.model';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent implements OnInit {
  fileimages: any[] = []
  productImages: ProductImageModel[] = [];
  productId: number = 0;
  constructor(private productImageService: ProductImageService, private activatedroute: ActivatedRoute, private ErrorService: ErrorService) { }

  ngOnInit(): void {
    this.activatedroute.params.subscribe((res: any) => {
      this.productId = res.id;
      this.getList();
    })

  }

  getList() {
    this.productImageService.getList(this.productId).subscribe((res: any) => {
      this.productImages = res.data;
      console.log(this.productImages);

    }, (err) => {
      this.ErrorService.errorHandler(err)
    })
  }

  uploadImage() {
    if (this.fileimages.length == 0) {

    }
    else {
      let formData = new FormData();
      formData.append("productId", this.productId.toString());
      for (let i = 0; i < this.fileimages.length; i++) {
        formData.append("images", this.fileimages[i], this.fileimages[i].fileName)
      }
      this.productImageService.add(formData).subscribe((res: any) => {
        this.getList()
      }, (err) => {
        this.ErrorService.errorHandler(err)
      })

      this.productImageService.getList
    }
  }

  getImages(event: any) {
    this.fileimages = event.target.files;

  }

  deleteImage(productImage: ProductImageModel) {
    this.productImageService.delete(productImage).subscribe((res) => {
      this.getList()
    }, (err) => {
      this.ErrorService.errorHandler(err)
    })
  }

  setMainImage(productId: number) {
    this.productImageService.setMain(productId).subscribe((res) => {
      this.getList()
    }, (err) => {
      this.ErrorService.errorHandler(err)
    })
  }
}

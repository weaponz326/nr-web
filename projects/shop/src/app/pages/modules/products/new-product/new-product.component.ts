import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ProductFormComponent } from '../product-form/product-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
// import { ProductsApiService } from 'projects/shop/src/app/services/modules-api/products-api/products-api.service';

// import { Product } from 'projects/shop/src/app/models/modules/products/products.model';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    // private productsApi: ProductsApiService,
  ) { }

  @ViewChild('productFormComponentReference', { read: ProductFormComponent, static: false }) productForm!: ProductFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  navHeading: any[] = [
    { text: "New Product", url: "/home/products/new-product" },
  ];

  storageBasePath = "/shop/" + this.customCookie.getCookie('shop_id') + "/module_products/";

  isProductSaving = false;

  ngOnInit(): void {
    this.getNewProductCodeConfig();
  }

  postProduct(){
    console.log('u are saving a new product');

    var data = {
      account: this.customCookie.getCookie('shop_id') as string,
      product_code: this.productForm.productForm.controls.productCode.value as string,
      product_name: this.productForm.productForm.controls.productName.value as string,
      description: this.productForm.productForm.controls.description.value as string,
      price: this.productForm.productForm.controls.price.value as number,
      product_category: this.productForm.productForm.controls.productCategory.value as string,
    }

    console.log(data);
    this.isProductSaving = true;

    // this.productsApi.postProduct(data)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       sessionStorage.setItem('shop_product_id', res.id);

    //       if(this.productForm.photo.isImageChanged){
    //         this.putProductImage();
    //       }
    //       else{
    //         this.router.navigateByUrl('/home/products/view-product');                    
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.isProductSaving = false;
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  putProductImage(){
    // this.productsApi.putProductPhoto(this.productForm.photo.image)
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);
    //       this.router.navigateByUrl('/home/products/view-product');                    
    //     },
    //     error: (err) => {
    //       console.log(err);          
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

  getNewProductCodeConfig(){
    // this.productsApi.getNewProductCodeConfig()
    //   .subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       this.productForm.productForm.controls.productCode.disable();

    //       if(res.code)
    //         this.productForm.productForm.controls.productCode.setValue(res.code);
    //       else
    //         this.productForm.productForm.controls.productCode.enable();
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.connectionToast.openToast();
    //     }
    //   })
  }

}

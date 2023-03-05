import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ProductFormComponent } from '../product-form/product-form.component';
import { ConnectionToastComponent } from 'projects/personal/src/app/components/module-utilities/connection-toast/connection-toast.component'
import { DeleteModalOneComponent } from 'projects/personal/src/app/components/module-utilities/delete-modal-one/delete-modal-one.component'

import { environment } from 'projects/shop/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { ProductsApiService } from 'projects/shop/src/app/services/modules-api/products-api/products-api.service';
// import { ProductsPrintService } from 'projects/shop/src/app/services/printing/products-print/products-print.service';

import { Product } from 'projects/shop/src/app/models/modules/products/products.model';


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  constructor(
    private router: Router,
    private customCookie: CustomCookieService,
    private productsApi: ProductsApiService,
    // private productsPrint: ProductsPrintService,
  ) { }

  @ViewChild('productFormComponentReference', { read: ProductFormComponent, static: false }) productForm!: ProductFormComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  @ViewChild('deleteModalComponentReference', { read: DeleteModalOneComponent, static: false }) deleteModal!: DeleteModalOneComponent;

  navHeading: any[] = [
    { text: "All Products", url: "/home/products/all-products" },
    { text: "View Product", url: "/home/products/view-product" },
  ];

  productData: any;

  isProductLoading = false;
  isProductSaving = false;
  isProductDeleting = false;

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(){
    this.isProductLoading = true;

    this.productsApi.getProduct()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.productData = res;
          this.isProductLoading = false;

          this.productForm.productForm.controls.productCode.setValue(this.productData.product_code);
          this.productForm.productForm.controls.productName.setValue(this.productData.product_name);
          this.productForm.productForm.controls.description.setValue(this.productData.description);
          this.productForm.productForm.controls.price.setValue(this.productData.price);
          this.productForm.productForm.controls.productCategory.setValue(this.productData.product_category);

          if (this.productData.product_image != null)
            this.productForm.productImage.imgSrc = environment.apiUrl.slice(0, -1) + this.productData.product_image;
        },
        error: (err) => {
          console.log(err);
          this.isProductLoading = false;
          this.connectionToast.openToast();
        }
      })
  }

  putProduct(){
    console.log('u are saving a new product');

    var data: Product = {
      account: this.customCookie.getCookie('shop_id') as string,
      product_code: this.productForm.productForm.controls.productCode.value as string,
      product_name: this.productForm.productForm.controls.productName.value as string,
      description: this.productForm.productForm.controls.description.value as string,
      price: this.productForm.productForm.controls.price.value as number,
      product_category: this.productForm.productForm.controls.productCategory.value as string,
    }

    console.log(data);
    this.isProductSaving = true;

    this.productsApi.putProduct(data)
      .subscribe({
        next: (res) => {
          console.log(res);

          if(this.productForm.productImage.isImageChanged){
            this.putProductImage();
          }
          else{
            this.isProductSaving = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.isProductSaving = false;
          this.connectionToast.openToast();
        }
      })
  }

  confirmDelete(){
    this.deleteModal.openModal();
  }

  deleteProduct(){
    this.isProductDeleting = true;

    this.productsApi.deleteProduct()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isProductDeleting = false;
          this.router.navigateByUrl('/home/products/all-product');
        },
        error: (err) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isProductDeleting = false;
        }
      })
  }

  putProductImage(){
    this.productsApi.putProductPhoto(this.productForm.productImage.image)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.isProductSaving = false;
        },
        error: (err) => {
          console.log(err);          
          this.connectionToast.openToast();
        }
      })
  }

  onPrint(){
    console.log("lets start printing...");
    // this.productsPrint.printViewProduct();
  }

}

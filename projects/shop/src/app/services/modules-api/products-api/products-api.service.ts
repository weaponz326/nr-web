import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/shop/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
  ) { }

  productsUrl = environment.apiUrl + 'shop-modules/products/';

  // products

  // create and get all product belonging to user

  public getAccountProduct(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.productsUrl + "product?account=" + this.customCookie.getCookie('shop_id')
      + "&page=" + page
      + "&size=" + size
      + "&producting=" + sortField, this.authHeaders.headers);
  }

  public postProduct(product: any): Observable<any>{
    return this.http.post(this.productsUrl + "product/", product, this.authHeaders.headers);
  }

  public getProduct(): Observable<any>{
    return this.http.get(this.productsUrl + "product/" + sessionStorage.getItem('shop_product_id'), this.authHeaders.headers);
  }

  public putProduct(product: any): Observable<any>{
    return this.http.put(this.productsUrl + "product/" + sessionStorage.getItem('shop_product_id'), product, this.authHeaders.headers);
  }

  public deleteProduct(): Observable<any>{
    return this.http.delete(this.productsUrl + "product/" + sessionStorage.getItem('shop_product_id'), this.authHeaders.headers);
  }

  public putProductPhoto(photo: File) {
    let formParams = new FormData();
    formParams.append('product_image', photo);
    formParams.append('account', this.customCookie.getCookie('shop') as string);
    return this.http.put(this.productsUrl + "product/" + sessionStorage.getItem('shop_product_id'), formParams, this.authHeaders.headers)
  }

  // config

  public getProductCodeConfig(): Observable<any>{
    return this.http.get(this.productsUrl + "config/product-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  public putProductCodeConfig(product: any): Observable<any>{
    return this.http.put(this.productsUrl + "config/product-code/" + this.customCookie.getCookie('shop_id'), product, this.authHeaders.headers);
  }

  public getNewProductCodeConfig(): Observable<any>{
    return this.http.get(this.productsUrl + "config/new-product-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

}

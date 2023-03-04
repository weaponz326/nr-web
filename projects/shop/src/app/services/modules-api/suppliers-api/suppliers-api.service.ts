import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/shop/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class SuppliersApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  suppliersUrl = environment.apiUrl + 'shop-modules/suppliers/';

  // create and get all supplier belonging to user

  public getAccountSupplier(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.suppliersUrl + "supplier?account=" + this.customCookie.getCookie('shop_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postSupplier(supplier: any): Observable<any>{
    return this.http.post(this.suppliersUrl + "supplier/", supplier, this.authHeaders.headers);
  }

  public getSupplier(): Observable<any>{
    return this.http.get(this.suppliersUrl + "supplier/" + sessionStorage.getItem('shop_supplier_id'), this.authHeaders.headers);
  }

  public putSupplier(supplier: any): Observable<any>{
    return this.http.put(this.suppliersUrl + "supplier/" + sessionStorage.getItem('shop_supplier_id'), supplier, this.authHeaders.headers);
  }

  public deleteSupplier(): Observable<any>{
    return this.http.delete(this.suppliersUrl + "supplier/" + sessionStorage.getItem('shop_supplier_id'), this.authHeaders.headers);
  }

  // public patchTotal(totalData: any): Observable<any>{
  //   return this.http.patch(this.suppliersUrl + "supplier/" + sessionStorage.getItem('shop_id'), totalData, this.authHeaders.headers);
  // }

  // supplier products

  public getSupplierSupplierProduct(): Observable<any>{
    return this.http.get(this.suppliersUrl + "supplier-product?supplier=" + sessionStorage.getItem('shop_supplier_id'), this.authHeaders.headers);
  }

  public postSupplierProduct(product: any): Observable<any>{
    return this.http.post(this.suppliersUrl + "supplier-product/", product, this.authHeaders.headers);
  }

  public getSupplierProduct(productId: any): Observable<any>{
    return this.http.get(this.suppliersUrl + "supplier-product/" + productId, this.authHeaders.headers);
  }

  public putSupplierProduct(productId: any, productData: any): Observable<any>{
    return this.http.put(this.suppliersUrl + "supplier-product/" + productId, productData, this.authHeaders.headers);
  }

  public deleteSupplierProduct(productId: any): Observable<any>{
    return this.http.delete(this.suppliersUrl + "supplier-product/" + productId, this.authHeaders.headers);
  }

  // config

  public getSupplierCodeConfig(): Observable<any>{
    return this.http.get(this.suppliersUrl + "config/supplier-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  public putSupplierCodeConfig(supplier: any): Observable<any>{
    return this.http.put(this.suppliersUrl + "config/supplier-code/" + this.customCookie.getCookie('shop_id'), supplier, this.authHeaders.headers);
  }

  public getNewSupplierCodeConfig(): Observable<any>{
    return this.http.get(this.suppliersUrl + "config/new-supplier-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  // dashboard

  public getSupplierCount(): Observable<any>{
    return this.http.get(this.suppliersUrl + "dashboard/supplier-count?account=" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  public getSupplierAnnotate(): Observable<any>{
    return this.http.get(this.suppliersUrl + "dashboard/supplier-annotate?account=" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

}

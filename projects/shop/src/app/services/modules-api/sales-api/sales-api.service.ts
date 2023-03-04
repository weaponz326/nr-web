import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/shop/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class SalesApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  salesUrl = environment.apiUrl + 'shop-modules/sales/';

  // sales

  public getAccountSales(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.salesUrl + "sales?account=" + this.customCookie.getCookie('shop_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postSales(sales: any): Observable<any>{
    return this.http.post(this.salesUrl + "sales/", sales, this.authHeaders.headers);
  }

  public putSales(id: any, data: any): Observable<any>{
    return this.http.put(this.salesUrl + "sales/" + id, data, this.authHeaders.headers);
  }

  public deleteSales(id: any): Observable<any>{
    return this.http.delete(this.salesUrl + "sales/" + id, this.authHeaders.headers);
  }

  // config

  public getSalesCodeConfig(): Observable<any>{
    return this.http.get(this.salesUrl + "config/sales-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  public putSalesCodeConfig(data: any): Observable<any>{
    return this.http.put(this.salesUrl + "config/sales-code/" + this.customCookie.getCookie('shop_id'), data, this.authHeaders.headers);
  }

  public getNewSalesCodeConfig(): Observable<any>{
    return this.http.get(this.salesUrl + "config/new-sales-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  // dashboard

  public getSalesCount(): Observable<any>{
    return this.http.get(this.salesUrl + "dashboard/sales-count?account=" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

}

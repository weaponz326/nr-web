import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/restaurant/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class KitchenStockApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  kitchenStockUrl = environment.apiUrl + 'restaurant-modules/kitchen-stock/';

  // items

  public getAccountStockItem(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.kitchenStockUrl + "stock-item?account=" + this.customCookie.getCookie('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postStockItem(item: any): Observable<any>{
    return this.http.post(this.kitchenStockUrl + "stock-item/", item, this.authHeaders.headers);
  }

  public putStockItem(id: any, data: any): Observable<any>{
    return this.http.put(this.kitchenStockUrl + "stock-item/" + id, data, this.authHeaders.headers);
  }

  public deleteStockItem(id: any): Observable<any>{
    return this.http.delete(this.kitchenStockUrl + "stock-item/" + id, this.authHeaders.headers);
  }

  // config

  public getStockItemCodeConfig(): Observable<any>{
    return this.http.get(this.kitchenStockUrl + "config/stock-item-code/" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

  public putStockItemCodeConfig(data: any): Observable<any>{
    return this.http.put(this.kitchenStockUrl + "config/stock-item-code/" + this.customCookie.getCookie('restaurant_id'), data, this.authHeaders.headers);
  }

  public getNewStockItemCodeConfig(): Observable<any>{
    return this.http.get(this.kitchenStockUrl + "config/new-stock-item-code/" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

  // dashboard

  public getStockItemCount(): Observable<any>{
    return this.http.get(this.kitchenStockUrl + "dashboard/stock-item-count?account=" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

  public getOutOfStockCount(): Observable<any>{
    return this.http.get(this.kitchenStockUrl + "dashboard/out-of-stock-count?account=" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

}

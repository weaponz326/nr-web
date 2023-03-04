import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/shop/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class PurchasingApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  purchasingUrl = environment.apiUrl + 'shop-modules/purchasing/';

  // create and get all purchasing belonging to user

  public getAccountPurchasing(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.purchasingUrl + "purchasing?account=" + this.customCookie.getCookie('shop_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postPurchasing(purchasing: any): Observable<any>{
    return this.http.post(this.purchasingUrl + "purchasing/", purchasing, this.authHeaders.headers);
  }

  public getPurchasing(): Observable<any>{
    return this.http.get(this.purchasingUrl + "purchasing/" + sessionStorage.getItem('shop_purchasing_id'), this.authHeaders.headers);
  }

  public putPurchasing(purchasing: any): Observable<any>{
    return this.http.put(this.purchasingUrl + "purchasing/" + sessionStorage.getItem('shop_purchasing_id'), purchasing, this.authHeaders.headers);
  }

  public deletePurchasing(): Observable<any>{
    return this.http.delete(this.purchasingUrl + "purchasing/" + sessionStorage.getItem('shop_purchasing_id'), this.authHeaders.headers);
  }

  public patchTotal(totalData: any): Observable<any>{
    return this.http.patch(this.purchasingUrl + "purchasing/" + sessionStorage.getItem('shop_id'), totalData, this.authHeaders.headers);
  }

  // purchasing items

  public getPurchasingItem(): Observable<any>{
    return this.http.get(this.purchasingUrl + "purchasing-item?purchasing=" + sessionStorage.getItem('shop_purchasing_id'), this.authHeaders.headers);
  }

  public postItem(item: any): Observable<any>{
    return this.http.post(this.purchasingUrl + "purchasing-item/", item, this.authHeaders.headers);
  }

  public getItem(itemId: any): Observable<any>{
    return this.http.get(this.purchasingUrl + "purchasing-item/" + itemId, this.authHeaders.headers);
  }

  public putItem(itemId: any, itemData: any): Observable<any>{
    return this.http.put(this.purchasingUrl + "purchasing-item/" + itemId, itemData, this.authHeaders.headers);
  }

  public deleteItem(itemId: any): Observable<any>{
    return this.http.delete(this.purchasingUrl + "purchasing-item/" + itemId, this.authHeaders.headers);
  }

  // config

  public getPurchasingCodeConfig(): Observable<any>{
    return this.http.get(this.purchasingUrl + "config/purchasing-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  public putPurchasingCodeConfig(purchasing: any): Observable<any>{
    return this.http.put(this.purchasingUrl + "config/purchasing-code/" + this.customCookie.getCookie('shop_id'), purchasing, this.authHeaders.headers);
  }

  public getNewPurchasingCodeConfig(): Observable<any>{
    return this.http.get(this.purchasingUrl + "config/new-purchasing-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  // dashboard

  public getPurchasingCount(): Observable<any>{
    return this.http.get(this.purchasingUrl + "dashboard/purchasing-count?account=" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  public getPurchasingAnnotate(): Observable<any>{
    return this.http.get(this.purchasingUrl + "dashboard/purchasing-annotate?account=" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

}

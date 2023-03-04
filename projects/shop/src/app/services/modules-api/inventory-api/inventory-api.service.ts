import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/shop/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class InventoryApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  inventoryUrl = environment.apiUrl + 'shop-modules/inventory/';

  // inventory

  public getAccountInventory(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.inventoryUrl + "inventory?account=" + this.customCookie.getCookie('shop_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postInventory(inventory: any): Observable<any>{
    return this.http.post(this.inventoryUrl + "inventory/", inventory, this.authHeaders.headers);
  }

  public putInventory(id: any, data: any): Observable<any>{
    return this.http.put(this.inventoryUrl + "inventory/" + id, data, this.authHeaders.headers);
  }

  public deleteInventory(id: any): Observable<any>{
    return this.http.delete(this.inventoryUrl + "inventory/" + id, this.authHeaders.headers);
  }

  // config

  public getInventoryCodeConfig(): Observable<any>{
    return this.http.get(this.inventoryUrl + "config/inventory-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  public putInventoryCodeConfig(data: any): Observable<any>{
    return this.http.put(this.inventoryUrl + "config/inventory-code/" + this.customCookie.getCookie('shop_id'), data, this.authHeaders.headers);
  }

  public getNewInventoryCodeConfig(): Observable<any>{
    return this.http.get(this.inventoryUrl + "config/new-inventory-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  // dashboard

  public getInventoryCount(): Observable<any>{
    return this.http.get(this.inventoryUrl + "dashboard/inventory-count?account=" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

}

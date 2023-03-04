import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/shop/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class PayablesApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  payablesUrl = environment.apiUrl + 'shop-modules/payables/';

  // payables

  public getAccountPayable(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.payablesUrl + "payable?account=" + this.customCookie.getCookie('shop_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postPayable(payable: any): Observable<any>{
    return this.http.post(this.payablesUrl + "payable/", payable, this.authHeaders.headers);
  }

  public putPayable(id: any, data: any): Observable<any>{
    return this.http.put(this.payablesUrl + "payable/" + id, data, this.authHeaders.headers);
  }

  public deletePayable(id: any): Observable<any>{
    return this.http.delete(this.payablesUrl + "payable/" + id, this.authHeaders.headers);
  }

  // config

  public getPayableCodeConfig(): Observable<any>{
    return this.http.get(this.payablesUrl + "config/payable-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  public putPayableCodeConfig(data: any): Observable<any>{
    return this.http.put(this.payablesUrl + "config/payable-code/" + this.customCookie.getCookie('shop_id'), data, this.authHeaders.headers);
  }

  public getNewPayableCodeConfig(): Observable<any>{
    return this.http.get(this.payablesUrl + "config/new-payable-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  // dashboard

  public getPayableCount(): Observable<any>{
    return this.http.get(this.payablesUrl + "dashboard/payable-count?account=" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }
  
}

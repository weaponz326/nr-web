import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/shop/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class ReceivablesApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  receivablesUrl = environment.apiUrl + 'shop-modules/receivables/';

  // receivables

  public getAccountReceivable(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.receivablesUrl + "receivable?account=" + this.customCookie.getCookie('shop_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postReceivable(receivable: any): Observable<any>{
    return this.http.post(this.receivablesUrl + "receivable/", receivable, this.authHeaders.headers);
  }

  public putReceivable(id: any, data: any): Observable<any>{
    return this.http.put(this.receivablesUrl + "receivable/" + id, data, this.authHeaders.headers);
  }

  public deleteReceivable(id: any): Observable<any>{
    return this.http.delete(this.receivablesUrl + "receivable/" + id, this.authHeaders.headers);
  }

  // config

  public getReceivableCodeConfig(): Observable<any>{
    return this.http.get(this.receivablesUrl + "config/receivable-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  public putReceivableCodeConfig(data: any): Observable<any>{
    return this.http.put(this.receivablesUrl + "config/receivable-code/" + this.customCookie.getCookie('shop_id'), data, this.authHeaders.headers);
  }

  public getNewReceivableCodeConfig(): Observable<any>{
    return this.http.get(this.receivablesUrl + "config/new-receivable-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  // dashboard

  public getReceivableCount(): Observable<any>{
    return this.http.get(this.receivablesUrl + "dashboard/receivable-count?account=" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }
  
}

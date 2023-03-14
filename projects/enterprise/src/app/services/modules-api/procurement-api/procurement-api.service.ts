import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/enterprise/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class ProcurementApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  procurementUrl = environment.apiUrl + 'enterprise-modules/procurement/';

  // procurement

  public getAccountProcurement(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.procurementUrl + "procurement?account=" + this.customCookie.getCookie('enterprise_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postProcurement(procurement: any): Observable<any>{
    return this.http.post(this.procurementUrl + "procurement/", procurement, this.authHeaders.headers);
  }

  public getProcurement(): Observable<any>{
    return this.http.get(this.procurementUrl + "procurement/" + sessionStorage.getItem('enterprise_procurement_id'), this.authHeaders.headers);
  }

  public putProcurement(procurement: any): Observable<any>{
    return this.http.put(this.procurementUrl + "procurement/" + sessionStorage.getItem('enterprise_procurement_id'), procurement, this.authHeaders.headers);
  }

  public deleteProcurement(): Observable<any>{
    return this.http.delete(this.procurementUrl + "procurement/" + sessionStorage.getItem('enterprise_procurement_id'), this.authHeaders.headers);
  }

  // order review

  public postOrderReview(orderReview: any): Observable<any>{
    return this.http.post(this.procurementUrl + "order-review/", orderReview, this.authHeaders.headers);
  }

  public getOrderReview(): Observable<any>{
    return this.http.get(this.procurementUrl + "order-review/" + sessionStorage.getItem('enterprise_procurement_id'), this.authHeaders.headers);
  }

  public putOrderReview(orderReview: any): Observable<any>{
    return this.http.put(this.procurementUrl + "order-review/" + sessionStorage.getItem('enterprise_procurement_id'), orderReview, this.authHeaders.headers);
  }

  public deleteOrderReview(): Observable<any>{
    return this.http.delete(this.procurementUrl + "order-review/" + sessionStorage.getItem('enterprise_procurement_id'), this.authHeaders.headers);
  }

  // config

  public getProcurementCodeConfig(): Observable<any>{
    return this.http.get(this.procurementUrl + "config/procurement-code/" + this.customCookie.getCookie('enterprise_id'), this.authHeaders.headers);
  }

  public putProcurementCodeConfig(procurement: any): Observable<any>{
    return this.http.put(this.procurementUrl + "config/procurement-code/" + this.customCookie.getCookie('enterprise_id'), procurement, this.authHeaders.headers);
  }

  public getNewProcurementCodeConfig(): Observable<any>{
    return this.http.get(this.procurementUrl + "config/new-procurement-code/" + this.customCookie.getCookie('enterprise_id'), this.authHeaders.headers);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { environment } from 'projects/shop/src/environments/environment';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class PaymentsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  paymentsUrl = environment.apiUrl + 'shop-modules/payments/';

  // payments

  public getAccountPayment(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.paymentsUrl + "payment?account=" + this.customCookie.getCookie('shop_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postPayment(payment: any): Observable<any>{
    return this.http.post(this.paymentsUrl + "payment/", payment, this.authHeaders.headers);
  }

  public getPayment(): Observable<any>{
    return this.http.get(this.paymentsUrl + "payment/" + sessionStorage.getItem('shop_payment_id'), this.authHeaders.headers);
  }

  public putPayment(payment: any): Observable<any>{
    return this.http.put(this.paymentsUrl + "payment/" + sessionStorage.getItem('shop_payment_id'), payment, this.authHeaders.headers);
  }

  public deletePayment(): Observable<any>{
    return this.http.delete(this.paymentsUrl + "payment/" + sessionStorage.getItem('shop_payment_id'), this.authHeaders.headers);
  }

  // config

  public getPaymentCodeConfig(): Observable<any>{
    return this.http.get(this.paymentsUrl + "config/payment-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  public putPaymentCodeConfig(payment: any): Observable<any>{
    return this.http.put(this.paymentsUrl + "config/payment-code/" + this.customCookie.getCookie('shop_id'), payment, this.authHeaders.headers);
  }

  public getNewPaymentCodeConfig(): Observable<any>{
    return this.http.get(this.paymentsUrl + "config/new-payment-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  // dashboard

  public getPaymentCount(): Observable<any>{
    return this.http.get(this.paymentsUrl + "dashboard/payment-count?account=" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  public getPaymentTotal(): Observable<any>{
    return this.http.get(this.paymentsUrl + "dashboard/payment-total?account=" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  public getPaymentAnnotate(): Observable<any>{
    return this.http.get(this.paymentsUrl + "dashboard/payment-annotate?account=" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

}

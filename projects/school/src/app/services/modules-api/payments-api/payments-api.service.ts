import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/school/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';


@Injectable({
  providedIn: 'root'
})
export class PaymentsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
    private activeTerm: ActiveTermService
  ) { }

  paymentsUrl = environment.apiUrl + 'school-modules/payments/';

  // payments

  // create and get all payment belonging to user

  public getAccountPayment(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.paymentsUrl + "payment?account=" + this.customCookie.getCookie('school_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postPayment(payment: any): Observable<any>{
    return this.http.post(this.paymentsUrl + "payment/", payment, this.authHeaders.headers);
  }

  public getPayment(): Observable<any>{
    return this.http.get(this.paymentsUrl + "payment/" + sessionStorage.getItem('school_payment_id'), this.authHeaders.headers);
  }

  public putPayment(payment: any): Observable<any>{
    return this.http.put(this.paymentsUrl + "payment/" + sessionStorage.getItem('school_payment_id'), payment, this.authHeaders.headers);
  }

  public deletePayment(): Observable<any>{
    return this.http.delete(this.paymentsUrl + "payment/" + sessionStorage.getItem('school_payment_id'), this.authHeaders.headers);
  }

  // config

  public getPaymentCodeConfig(): Observable<any>{
    return this.http.get(this.paymentsUrl + "config/payment-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  public putPaymentCodeConfig(payment: any): Observable<any>{
    return this.http.put(this.paymentsUrl + "config/payment-code/" + this.customCookie.getCookie('school_id'), payment, this.authHeaders.headers);
  }

  public getNewPaymentCodeConfig(): Observable<any>{
    return this.http.get(this.paymentsUrl + "config/new-payment-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  // dashboard

}

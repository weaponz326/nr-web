import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { environment } from 'projects/restaurant/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService
  ) { }

  paymentsUrl = environment.apiUrl + 'restaurant-modules/payments/';

  // payments

  public getAccountPayment(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.paymentsUrl + "payment?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postPayment(payment: any): Observable<any>{
    return this.http.post(this.paymentsUrl + "payment/", payment, this.authHeaders.headers);
  }

  public getPayment(): Observable<any>{
    return this.http.get(this.paymentsUrl + "payment/" + sessionStorage.getItem('restaurant_payment_id'), this.authHeaders.headers);
  }

  public putPayment(payment: any): Observable<any>{
    return this.http.put(this.paymentsUrl + "payment/" + sessionStorage.getItem('restaurant_payment_id'), payment, this.authHeaders.headers);
  }

  public deletePayment(): Observable<any>{
    return this.http.delete(this.paymentsUrl + "payment/" + sessionStorage.getItem('restaurant_payment_id'), this.authHeaders.headers);
  }

  // config

  public getPaymentCodeConfig(): Observable<any>{
    return this.http.get(this.paymentsUrl + "config/payment-code/" + localStorage.getItem('restaurant_id'), this.authHeaders.headers);
  }

  public putPaymentCodeConfig(payment: any): Observable<any>{
    return this.http.put(this.paymentsUrl + "config/payment-code/" + localStorage.getItem('restaurant_id'), payment, this.authHeaders.headers);
  }

  public getNewPaymentCodeConfig(): Observable<any>{
    return this.http.get(this.paymentsUrl + "config/new-payment-code/" + localStorage.getItem('restaurant_id'), this.authHeaders.headers);
  }

  // dashboard

  public getPaymentCount(): Observable<any>{
    return this.http.get(this.paymentsUrl + "dashboard/payment-count?account=" + localStorage.getItem('restaurant_id'), this.authHeaders.headers);
  }

  public getPaymentTotal(): Observable<any>{
    return this.http.get(this.paymentsUrl + "dashboard/payment-total?account=" + localStorage.getItem('restaurant_id'), this.authHeaders.headers);
  }

  public getPaymentAnnotate(): Observable<any>{
    return this.http.get(this.paymentsUrl + "dashboard/payment-annotate?account=" + localStorage.getItem('restaurant_id'), this.authHeaders.headers);
  }

}

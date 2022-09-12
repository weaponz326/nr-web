import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/personal/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsApiService {

  constructor(
    private http: HttpClient,
  ) { }

  restaurantApi = environment.restaurantApi;

  // payments

  public getAccountPayment(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.restaurantApi + "module-payments/payment?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField);
  }

  public postPayment(payment: any): Observable<any>{
    return this.http.post(this.restaurantApi + "module-payments/payment/", payment);
  }

  public getPayment(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-payments/payment/" + sessionStorage.getItem('restaurant_payment_id'));
  }

  public putPayment(payment: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-payments/payment/" + sessionStorage.getItem('restaurant_payment_id'), payment);
  }

  public deletePayment(): Observable<any>{
    return this.http.delete(this.restaurantApi + "module-payments/payment/" + sessionStorage.getItem('restaurant_payment_id'));
  }

  // dashboard

  public getPaymentCount(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-payments/dashboard/payment-count?account=" + localStorage.getItem('restaurant_id'));
  }

  public getPaymentTotal(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-payments/dashboard/payment-total?account=" + localStorage.getItem('restaurant_id'));
  }

  public getPaymentAnnotate(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-payments/dashboard/payment-annotate?account=" + localStorage.getItem('restaurant_id'));
  }

}

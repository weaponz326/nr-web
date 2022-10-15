import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/restaurant/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class CustomersApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  customersUrl = environment.apiUrl + 'restaurant-modules/customers/';

  // customers

  public getAccountCustomer(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.customersUrl + "customer?account=" + this.customCookie.getCookie('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postCustomer(customer: any): Observable<any>{
    return this.http.post(this.customersUrl + "customer/", customer, this.authHeaders.headers);
  }

  public getCustomer(): Observable<any>{
    return this.http.get(this.customersUrl + "customer/" + sessionStorage.getItem('restaurant_customer_id'), this.authHeaders.headers);
  }

  public putCustomer(customer: any): Observable<any>{
    return this.http.put(this.customersUrl + "customer/" + sessionStorage.getItem('restaurant_customer_id'), customer, this.authHeaders.headers);
  }

  public deleteCustomer(): Observable<any>{
    return this.http.delete(this.customersUrl + "customer/" + sessionStorage.getItem('restaurant_customer_id'), this.authHeaders.headers);
  }

  // config

  public getCustomerCodeConfig(): Observable<any>{
    return this.http.get(this.customersUrl + "config/customer-code/" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

  public putCustomerCodeConfig(customer: any): Observable<any>{
    return this.http.put(this.customersUrl + "config/customer-code/" + this.customCookie.getCookie('restaurant_id'), customer, this.authHeaders.headers);
  }

  public getNewCustomerCodeConfig(): Observable<any>{
    return this.http.get(this.customersUrl + "config/new-customer-code/" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }
  
  // dashboard

  public getCustomerCount(): Observable<any>{
    return this.http.get(this.customersUrl + "dashboard/customer-count?account=" + this.customCookie.getCookie('restaurant_id'), this.authHeaders.headers);
  }

}

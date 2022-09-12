import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/personal/src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class CustomersApiService {

  constructor(
    private http: HttpClient,
  ) { }

  restaurantApi = environment.restaurantApi;

  // customers

  public getAccountCustomer(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.restaurantApi + "module-customers/customer?account=" + localStorage.getItem('restaurant_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField);
  }

  public postCustomer(customer: any): Observable<any>{
    return this.http.post(this.restaurantApi + "module-customers/customer/", customer);
  }

  public getCustomer(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-customers/customer/" + sessionStorage.getItem('restaurant_customer_id'));
  }

  public putCustomer(customer: any): Observable<any>{
    return this.http.put(this.restaurantApi + "module-customers/customer/" + sessionStorage.getItem('restaurant_customer_id'), customer);
  }

  public deleteCustomer(): Observable<any>{
    return this.http.delete(this.restaurantApi + "module-customers/customer/" + sessionStorage.getItem('restaurant_customer_id'));
  }

  // dashboard

  public getCustomerCount(): Observable<any>{
    return this.http.get(this.restaurantApi + "module-customers/dashboard/customer-count?account=" + localStorage.getItem('restaurant_id'));
  }

}

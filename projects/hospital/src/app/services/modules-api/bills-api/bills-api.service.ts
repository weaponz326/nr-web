import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/hospital/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class BillsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
  ) { }

  billsUrl = environment.apiUrl + 'hospital-modules/bills/';

  // bills

  // create and get all bill belonging to user

  public getAccountBill(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.billsUrl + "bill?account=" + this.customCookie.getCookie('hospital_id')
      + "&page=" + page
      + "&size=" + size
      + "&billing=" + sortField, this.authHeaders.headers);
  }

  public postBill(bill: any): Observable<any>{
    return this.http.post(this.billsUrl + "bill/", bill, this.authHeaders.headers);
  }

  public getBill(): Observable<any>{
    return this.http.get(this.billsUrl + "bill/" + sessionStorage.getItem('hospital_bill_id'), this.authHeaders.headers);
  }

  public putBill(bill: any): Observable<any>{
    return this.http.put(this.billsUrl + "bill/" + sessionStorage.getItem('hospital_bill_id'), bill, this.authHeaders.headers);
  }

  public deleteBill(): Observable<any>{
    return this.http.delete(this.billsUrl + "bill/" + sessionStorage.getItem('hospital_bill_id'), this.authHeaders.headers);
  }

  // config

  public getBillCodeConfig(): Observable<any>{
    return this.http.get(this.billsUrl + "config/bill-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

  public putBillCodeConfig(bill: any): Observable<any>{
    return this.http.put(this.billsUrl + "config/bill-code/" + this.customCookie.getCookie('hospital_id'), bill, this.authHeaders.headers);
  }

  public getNewBillCodeConfig(): Observable<any>{
    return this.http.get(this.billsUrl + "config/new-bill-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

}

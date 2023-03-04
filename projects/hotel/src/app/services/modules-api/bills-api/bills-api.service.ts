import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/hotel/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class BillsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  billsUrl = environment.apiUrl + 'hotel-modules/bills/';

  // create and get all bill belonging to user

  public getAccountBill(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.billsUrl + "bill?account=" + this.customCookie.getCookie('hotel_id')
      + "&page=" + page
      + "&size=" + size
      + "&billing=" + sortField, this.authHeaders.headers);
  }

  public postBill(bill: any): Observable<any>{
    return this.http.post(this.billsUrl + "bill/", bill, this.authHeaders.headers);
  }

  public getBill(): Observable<any>{
    return this.http.get(this.billsUrl + "bill/" + sessionStorage.getItem('hotel_bill_id'), this.authHeaders.headers);
  }

  public putBill(bill: any): Observable<any>{
    return this.http.put(this.billsUrl + "bill/" + sessionStorage.getItem('hotel_bill_id'), bill, this.authHeaders.headers);
  }

  public deleteBill(): Observable<any>{
    return this.http.delete(this.billsUrl + "bill/" + sessionStorage.getItem('hotel_bill_id'), this.authHeaders.headers);
  }

  // checkin bill

  public getBillCheckinCharge(): Observable<any>{
    return this.http.get(this.billsUrl + "checkin-charge?bill=" + sessionStorage.getItem('hotel_bill_id'), this.authHeaders.headers);
  }

  public postCheckinCharge(item: any): Observable<any>{
    return this.http.post(this.billsUrl + "checkin-charge/", item, this.authHeaders.headers);
  }

  public getCheckinCharge(itemId: any): Observable<any>{
    return this.http.get(this.billsUrl + "checkin-charge/" + itemId, this.authHeaders.headers);
  }

  public putCheckinCharge(itemId: any, itemData: any): Observable<any>{
    return this.http.put(this.billsUrl + "checkin-charge/" + itemId, itemData, this.authHeaders.headers);
  }

  public deleteCheckinCharge(itemId: any): Observable<any>{
    return this.http.delete(this.billsUrl + "checkin-charge/" + itemId, this.authHeaders.headers);
  }

  // services bill

  public getBillServiceCharge(): Observable<any>{
    return this.http.get(this.billsUrl + "service-charge?bill=" + sessionStorage.getItem('hotel_bill_id'), this.authHeaders.headers);
  }

  public postServiceCharge(item: any): Observable<any>{
    return this.http.post(this.billsUrl + "service-charge/", item, this.authHeaders.headers);
  }

  public getServiceCharge(itemId: any): Observable<any>{
    return this.http.get(this.billsUrl + "service-charge/" + itemId, this.authHeaders.headers);
  }

  public putServiceCharge(itemId: any, itemData: any): Observable<any>{
    return this.http.put(this.billsUrl + "service-charge/" + itemId, itemData, this.authHeaders.headers);
  }

  public deleteServiceCharge(itemId: any): Observable<any>{
    return this.http.delete(this.billsUrl + "service-charge/" + itemId, this.authHeaders.headers);
  }

  // config

  public getBillCodeConfig(): Observable<any>{
    return this.http.get(this.billsUrl + "config/bill-code/" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

  public putBillCodeConfig(bill: any): Observable<any>{
    return this.http.put(this.billsUrl + "config/bill-code/" + this.customCookie.getCookie('hotel_id'), bill, this.authHeaders.headers);
  }

  public getNewBillCodeConfig(): Observable<any>{
    return this.http.get(this.billsUrl + "config/new-bill-code/" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

  // dashboard

  public getBillCount(): Observable<any>{
    return this.http.get(this.billsUrl + "dashboard/bill-count?account=" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

  public getBillAnnotate(): Observable<any>{
    return this.http.get(this.billsUrl + "dashboard/bill-annotate?account=" + this.customCookie.getCookie('hotel_id'), this.authHeaders.headers);
  }

}

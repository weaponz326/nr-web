import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/shop/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class InvoiceApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  invoiceUrl = environment.apiUrl + 'shop-modules/invoice/';

  // create and get all invoice belonging to user

  public getAccountInvoice(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.invoiceUrl + "invoice?account=" + this.customCookie.getCookie('shop_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postInvoice(invoice: any): Observable<any>{
    return this.http.post(this.invoiceUrl + "invoice/", invoice, this.authHeaders.headers);
  }

  public getInvoice(): Observable<any>{
    return this.http.get(this.invoiceUrl + "invoice/" + sessionStorage.getItem('shop_invoice_id'), this.authHeaders.headers);
  }

  public putInvoice(invoice: any): Observable<any>{
    return this.http.put(this.invoiceUrl + "invoice/" + sessionStorage.getItem('shop_invoice_id'), invoice, this.authHeaders.headers);
  }

  public deleteInvoice(): Observable<any>{
    return this.http.delete(this.invoiceUrl + "invoice/" + sessionStorage.getItem('shop_invoice_id'), this.authHeaders.headers);
  }

  public patchTotal(totalData: any): Observable<any>{
    return this.http.patch(this.invoiceUrl + "invoice/" + sessionStorage.getItem('shop_id'), totalData, this.authHeaders.headers);
  }

  // invoice items

  public getInvoiceItem(): Observable<any>{
    return this.http.get(this.invoiceUrl + "invoice-item?invoice=" + sessionStorage.getItem('shop_invoice_id'), this.authHeaders.headers);
  }

  public postItem(item: any): Observable<any>{
    return this.http.post(this.invoiceUrl + "invoice-item/", item, this.authHeaders.headers);
  }

  public getItem(itemId: any): Observable<any>{
    return this.http.get(this.invoiceUrl + "invoice-item/" + itemId, this.authHeaders.headers);
  }

  public putItem(itemId: any, itemData: any): Observable<any>{
    return this.http.put(this.invoiceUrl + "invoice-item/" + itemId, itemData, this.authHeaders.headers);
  }

  public deleteItem(itemId: any): Observable<any>{
    return this.http.delete(this.invoiceUrl + "invoice-item/" + itemId, this.authHeaders.headers);
  }

  // config

  public getInvoiceCodeConfig(): Observable<any>{
    return this.http.get(this.invoiceUrl + "config/invoice-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  public putInvoiceCodeConfig(invoice: any): Observable<any>{
    return this.http.put(this.invoiceUrl + "config/invoice-code/" + this.customCookie.getCookie('shop_id'), invoice, this.authHeaders.headers);
  }

  public getNewInvoiceCodeConfig(): Observable<any>{
    return this.http.get(this.invoiceUrl + "config/new-invoice-code/" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  // dashboard

  public getInvoiceCount(): Observable<any>{
    return this.http.get(this.invoiceUrl + "dashboard/invoice-count?account=" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

  public getInvoiceAnnotate(): Observable<any>{
    return this.http.get(this.invoiceUrl + "dashboard/invoice-annotate?account=" + this.customCookie.getCookie('shop_id'), this.authHeaders.headers);
  }

}

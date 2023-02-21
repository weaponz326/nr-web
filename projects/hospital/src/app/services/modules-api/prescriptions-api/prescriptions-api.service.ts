import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/hospital/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class PrescriptionsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  prescriptionsUrl = environment.apiUrl + 'hospital-modules/prescriptions/';

  // create and get all prescriptions belonging to user

  public getAccountPrescription(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.prescriptionsUrl + "prescription?account=" + this.customCookie.getCookie('hospital_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postPrescription(prescription: any): Observable<any>{
    return this.http.post(this.prescriptionsUrl + "prescription/", prescription, this.authHeaders.headers);
  }

  public getPrescription(): Observable<any>{
    return this.http.get(this.prescriptionsUrl + "prescription/" + sessionStorage.getItem('hospital_prescription_id'), this.authHeaders.headers);
  }

  public putPrescription(prescription: any): Observable<any>{
    return this.http.put(this.prescriptionsUrl + "prescription/" + sessionStorage.getItem('hospital_prescription_id'), prescription, this.authHeaders.headers);
  }

  public deletePrescription(): Observable<any>{
    return this.http.delete(this.prescriptionsUrl + "prescription/" + sessionStorage.getItem('hospital_prescription_id'), this.authHeaders.headers);
  }

  // public patchTotal(totalData: any): Observable<any>{
  //   return this.http.patch(this.prescriptionsUrl + "prescription/" + sessionStorage.getItem('hospital_id'), totalData, this.authHeaders.headers);
  // }

  // prescription items

  public getPrescriptionItem(): Observable<any>{
    return this.http.get(this.prescriptionsUrl + "prescription-item?prescription=" + sessionStorage.getItem('hospital_prescription_id'), this.authHeaders.headers);
  }

  public postItem(item: any): Observable<any>{
    return this.http.post(this.prescriptionsUrl + "prescription-item/", item, this.authHeaders.headers);
  }

  public getItem(itemId: any): Observable<any>{
    return this.http.get(this.prescriptionsUrl + "prescription-item/" + itemId, this.authHeaders.headers);
  }

  public putItem(itemId: any, itemData: any): Observable<any>{
    return this.http.put(this.prescriptionsUrl + "prescription-item/" + itemId, itemData, this.authHeaders.headers);
  }

  public deleteItem(itemId: any): Observable<any>{
    return this.http.delete(this.prescriptionsUrl + "prescription-item/" + itemId, this.authHeaders.headers);
  }

  // config

  public getPrescriptionCodeConfig(): Observable<any>{
    return this.http.get(this.prescriptionsUrl + "config/prescription-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

  public putPrescriptionCodeConfig(prescription: any): Observable<any>{
    return this.http.put(this.prescriptionsUrl + "config/prescription-code/" + this.customCookie.getCookie('hospital_id'), prescription, this.authHeaders.headers);
  }

  public getNewPrescriptionCodeConfig(): Observable<any>{
    return this.http.get(this.prescriptionsUrl + "config/new-prescription-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

  // dashboard

  public getPrescriptionCount(): Observable<any>{
    return this.http.get(this.prescriptionsUrl + "dashboard/prescription-count?account=" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

  public getPrescriptionAnnotate(): Observable<any>{
    return this.http.get(this.prescriptionsUrl + "dashboard/prescription-annotate?account=" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

}

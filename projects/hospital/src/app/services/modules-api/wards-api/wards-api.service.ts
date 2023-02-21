import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/hospital/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class WardsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
  ) { }

  wardsUrl = environment.apiUrl + 'hospital-modules/wards/';

  // wards

  public getAccountWard(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.wardsUrl + "ward?account=" + this.customCookie.getCookie('hospital_id')
      + "&page=" + page
      + "&size=" + size
      + "&orderinging=" + sortField, this.authHeaders.headers);
  }

  public postWard(ward: any): Observable<any>{
    return this.http.post(this.wardsUrl + "ward/", ward, this.authHeaders.headers);
  }

  public getWard(): Observable<any>{
    return this.http.get(this.wardsUrl + "ward/" + sessionStorage.getItem('hospital_ward_id'), this.authHeaders.headers);
  }

  public putWard(ward: any): Observable<any>{
    return this.http.put(this.wardsUrl + "ward/" + sessionStorage.getItem('hospital_ward_id'), ward, this.authHeaders.headers);
  }

  public deleteWard(): Observable<any>{
    return this.http.delete(this.wardsUrl + "ward/" + sessionStorage.getItem('hospital_ward_id'), this.authHeaders.headers);
  }

  // ward patients

  public getWardWardPatient(): Observable<any>{
    return this.http.get(this.wardsUrl + "ward-patient?ward=" + sessionStorage.getItem('hospital_ward_id'), this.authHeaders.headers);
  }

  public postWardPatient(patient: any): Observable<any>{
    return this.http.post(this.wardsUrl + "ward-patient/", patient, this.authHeaders.headers);
  }

  public getWardPatient(patientId: any): Observable<any>{
    return this.http.get(this.wardsUrl + "ward-patient/" + patientId, this.authHeaders.headers);
  }

  public putWardPatient(patientId: any, patientData: any): Observable<any>{
    return this.http.put(this.wardsUrl + "ward-patient/" + patientId, patientData, this.authHeaders.headers);
  }

  public deleteWardPatient(patientId: any): Observable<any>{
    return this.http.delete(this.wardsUrl + "ward-patient/" + patientId, this.authHeaders.headers);
  }

  // config

  public getWardCodeConfig(): Observable<any>{
    return this.http.get(this.wardsUrl + "config/ward-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

  public putWardCodeConfig(ward: any): Observable<any>{
    return this.http.put(this.wardsUrl + "config/ward-code/" + this.customCookie.getCookie('hospital_id'), ward, this.authHeaders.headers);
  }

  public getNewWardCodeConfig(): Observable<any>{
    return this.http.get(this.wardsUrl + "config/new-ward-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

}

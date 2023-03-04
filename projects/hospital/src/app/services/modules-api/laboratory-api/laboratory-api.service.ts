import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/hospital/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class LaboratoryApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
  ) { }

  laboratoryUrl = environment.apiUrl + 'hospital-modules/laboratory/';

  // laboratory

  // create and get all laboratory belonging to user

  public getAccountLab(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.laboratoryUrl + "lab?account=" + this.customCookie.getCookie('hospital_id')
      + "&page=" + page
      + "&size=" + size
      + "&laboratorying=" + sortField, this.authHeaders.headers);
  }

  public postLab(lab: any): Observable<any>{
    return this.http.post(this.laboratoryUrl + "lab/", lab, this.authHeaders.headers);
  }

  public getLab(): Observable<any>{
    return this.http.get(this.laboratoryUrl + "lab/" + sessionStorage.getItem('hospital_lab_id'), this.authHeaders.headers);
  }

  public putLab(lab: any): Observable<any>{
    return this.http.put(this.laboratoryUrl + "lab/" + sessionStorage.getItem('hospital_lab_id'), lab, this.authHeaders.headers);
  }

  public deleteLab(): Observable<any>{
    return this.http.delete(this.laboratoryUrl + "lab/" + sessionStorage.getItem('hospital_lab_id'), this.authHeaders.headers);
  }

  // config

  public getLabCodeConfig(): Observable<any>{
    return this.http.get(this.laboratoryUrl + "config/lab-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

  public putLabCodeConfig(laboratory: any): Observable<any>{
    return this.http.put(this.laboratoryUrl + "config/lab-code/" + this.customCookie.getCookie('hospital_id'), laboratory, this.authHeaders.headers);
  }

  public getNewLabCodeConfig(): Observable<any>{
    return this.http.get(this.laboratoryUrl + "config/new-lab-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

}

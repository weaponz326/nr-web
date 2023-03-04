import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/hospital/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class AdmissionsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
  ) { }

  admissionsUrl = environment.apiUrl + 'hospital-modules/admissions/';

  // admissions

  // create and get all admission belonging to user

  public getAccountAdmission(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.admissionsUrl + "admission?account=" + this.customCookie.getCookie('hospital_id')
      + "&page=" + page
      + "&size=" + size
      + "&admissioning=" + sortField, this.authHeaders.headers);
  }

  public postAdmission(admission: any): Observable<any>{
    return this.http.post(this.admissionsUrl + "admission/", admission, this.authHeaders.headers);
  }

  public getAdmission(): Observable<any>{
    return this.http.get(this.admissionsUrl + "admission/" + sessionStorage.getItem('hospital_admission_id'), this.authHeaders.headers);
  }

  public putAdmission(admission: any): Observable<any>{
    return this.http.put(this.admissionsUrl + "admission/" + sessionStorage.getItem('hospital_admission_id'), admission, this.authHeaders.headers);
  }

  public deleteAdmission(): Observable<any>{
    return this.http.delete(this.admissionsUrl + "admission/" + sessionStorage.getItem('hospital_admission_id'), this.authHeaders.headers);
  }

  // config

  public getAdmissionCodeConfig(): Observable<any>{
    return this.http.get(this.admissionsUrl + "config/admission-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

  public putAdmissionCodeConfig(admission: any): Observable<any>{
    return this.http.put(this.admissionsUrl + "config/admission-code/" + this.customCookie.getCookie('hospital_id'), admission, this.authHeaders.headers);
  }

  public getNewAdmissionCodeConfig(): Observable<any>{
    return this.http.get(this.admissionsUrl + "config/new-admission-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

}

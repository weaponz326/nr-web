import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/hospital/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class DiagnosisApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
  ) { }

  diagnosisUrl = environment.apiUrl + 'hospital-modules/diagnosis/';

  // diagnosis

  // create and get all diagnosis belonging to user

  public getAccountDiagnosis(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.diagnosisUrl + "diagnosis?account=" + this.customCookie.getCookie('hospital_id')
      + "&page=" + page
      + "&size=" + size
      + "&diagnosising=" + sortField, this.authHeaders.headers);
  }

  public postDiagnosis(diagnosis: any): Observable<any>{
    return this.http.post(this.diagnosisUrl + "diagnosis/", diagnosis, this.authHeaders.headers);
  }

  public getDiagnosis(): Observable<any>{
    return this.http.get(this.diagnosisUrl + "diagnosis/" + sessionStorage.getItem('hospital_diagnosis_id'), this.authHeaders.headers);
  }

  public putDiagnosis(diagnosis: any): Observable<any>{
    return this.http.put(this.diagnosisUrl + "diagnosis/" + sessionStorage.getItem('hospital_diagnosis_id'), diagnosis, this.authHeaders.headers);
  }

  public deleteDiagnosis(): Observable<any>{
    return this.http.delete(this.diagnosisUrl + "diagnosis/" + sessionStorage.getItem('hospital_diagnosis_id'), this.authHeaders.headers);
  }

  // diagnosis detail

  public getDiagnosisDetail(): Observable<any>{
    return this.http.get(this.diagnosisUrl + "diagnosis-report/" + sessionStorage.getItem('hospital_diagnosis_id'), this.authHeaders.headers);
  }

  public putDiagnosisDetail(diagnosis: any): Observable<any>{
    return this.http.put(this.diagnosisUrl + "diagnosis-report/" + sessionStorage.getItem('hospital_diagnosis_id'), diagnosis, this.authHeaders.headers);
  }

  public deleteDiagnosisDetail(): Observable<any>{
    return this.http.delete(this.diagnosisUrl + "diagnosis-report/" + sessionStorage.getItem('hospital_diagnosis_id'), this.authHeaders.headers);
  }

  // config

  public getDiagnosisCodeConfig(): Observable<any>{
    return this.http.get(this.diagnosisUrl + "config/diagnosis-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

  public putDiagnosisCodeConfig(diagnosis: any): Observable<any>{
    return this.http.put(this.diagnosisUrl + "config/diagnosis-code/" + this.customCookie.getCookie('hospital_id'), diagnosis, this.authHeaders.headers);
  }

  public getNewDiagnosisCodeConfig(): Observable<any>{
    return this.http.get(this.diagnosisUrl + "config/new-diagnosis-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

}

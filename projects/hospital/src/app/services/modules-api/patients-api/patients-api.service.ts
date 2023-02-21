import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/hospital/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class PatientsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
  ) { }

  patientsUrl = environment.apiUrl + 'hospital-modules/patients/';

  // patients

  // create and get all patient belonging to user

  public getAccountPatient(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.patientsUrl + "patient?account=" + this.customCookie.getCookie('hospital_id')
      + "&page=" + page
      + "&size=" + size
      + "&patienting=" + sortField, this.authHeaders.headers);
  }

  public postPatient(patient: any): Observable<any>{
    return this.http.post(this.patientsUrl + "patient/", patient, this.authHeaders.headers);
  }

  public getPatient(): Observable<any>{
    return this.http.get(this.patientsUrl + "patient/" + sessionStorage.getItem('hospital_patient_id'), this.authHeaders.headers);
  }

  public putPatient(patient: any): Observable<any>{
    return this.http.put(this.patientsUrl + "patient/" + sessionStorage.getItem('hospital_patient_id'), patient, this.authHeaders.headers);
  }

  public deletePatient(): Observable<any>{
    return this.http.delete(this.patientsUrl + "patient/" + sessionStorage.getItem('hospital_patient_id'), this.authHeaders.headers);
  }

  public putPatientPhoto(photo: File) {
    let formParams = new FormData();
    formParams.append('photo', photo);
    formParams.append('account', this.customCookie.getCookie('hospital') as string);
    return this.http.put(this.patientsUrl + "patient/" + sessionStorage.getItem('hospital_patient_id'), formParams, this.authHeaders.headers)
  }

  // config

  public getPatientCodeConfig(): Observable<any>{
    return this.http.get(this.patientsUrl + "config/patient-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

  public putPatientCodeConfig(patient: any): Observable<any>{
    return this.http.put(this.patientsUrl + "config/patient-code/" + this.customCookie.getCookie('hospital_id'), patient, this.authHeaders.headers);
  }

  public getNewPatientCodeConfig(): Observable<any>{
    return this.http.get(this.patientsUrl + "config/new-patient-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

}

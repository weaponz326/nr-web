import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/hospital/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class DoctorsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
  ) { }

  doctorsUrl = environment.apiUrl + 'hospital-modules/doctors/';

  // doctors

  // create and get all doctor belonging to user

  public getAccountDoctor(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.doctorsUrl + "doctor?account=" + this.customCookie.getCookie('hospital_id')
      + "&page=" + page
      + "&size=" + size
      + "&doctoring=" + sortField, this.authHeaders.headers);
  }

  public postDoctor(doctor: any): Observable<any>{
    return this.http.post(this.doctorsUrl + "doctor/", doctor, this.authHeaders.headers);
  }

  public getDoctor(): Observable<any>{
    return this.http.get(this.doctorsUrl + "doctor/" + sessionStorage.getItem('hospital_doctor_id'), this.authHeaders.headers);
  }

  public putDoctor(doctor: any): Observable<any>{
    return this.http.put(this.doctorsUrl + "doctor/" + sessionStorage.getItem('hospital_doctor_id'), doctor, this.authHeaders.headers);
  }

  public deleteDoctor(): Observable<any>{
    return this.http.delete(this.doctorsUrl + "doctor/" + sessionStorage.getItem('hospital_doctor_id'), this.authHeaders.headers);
  }

  public putDoctorPhoto(photo: File) {
    let formParams = new FormData();
    formParams.append('photo', photo);
    formParams.append('account', this.customCookie.getCookie('hospital') as string);
    return this.http.put(this.doctorsUrl + "doctor/" + sessionStorage.getItem('hospital_doctor_id'), formParams, this.authHeaders.headers)
  }

  // config

  public getDoctorCodeConfig(): Observable<any>{
    return this.http.get(this.doctorsUrl + "config/doctor-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

  public putDoctorCodeConfig(doctor: any): Observable<any>{
    return this.http.put(this.doctorsUrl + "config/doctor-code/" + this.customCookie.getCookie('hospital_id'), doctor, this.authHeaders.headers);
  }

  public getNewDoctorCodeConfig(): Observable<any>{
    return this.http.get(this.doctorsUrl + "config/new-doctor-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

}

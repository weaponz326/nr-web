import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/hospital/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class NursesApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
  ) { }

  nursesUrl = environment.apiUrl + 'hospital-modules/nurses/';

  // nurses

  // create and get all nurse belonging to user

  public getAccountNurse(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.nursesUrl + "nurse?account=" + this.customCookie.getCookie('hospital_id')
      + "&page=" + page
      + "&size=" + size
      + "&nurseing=" + sortField, this.authHeaders.headers);
  }

  public postNurse(nurse: any): Observable<any>{
    return this.http.post(this.nursesUrl + "nurse/", nurse, this.authHeaders.headers);
  }

  public getNurse(): Observable<any>{
    return this.http.get(this.nursesUrl + "nurse/" + sessionStorage.getItem('hospital_nurse_id'), this.authHeaders.headers);
  }

  public putNurse(nurse: any): Observable<any>{
    return this.http.put(this.nursesUrl + "nurse/" + sessionStorage.getItem('hospital_nurse_id'), nurse, this.authHeaders.headers);
  }

  public deleteNurse(): Observable<any>{
    return this.http.delete(this.nursesUrl + "nurse/" + sessionStorage.getItem('hospital_nurse_id'), this.authHeaders.headers);
  }

  public putNursePhoto(photo: File) {
    let formParams = new FormData();
    formParams.append('photo', photo);
    formParams.append('account', this.customCookie.getCookie('hospital') as string);
    return this.http.put(this.nursesUrl + "nurse/" + sessionStorage.getItem('hospital_nurse_id'), formParams, this.authHeaders.headers)
  }

  // config

  public getNurseCodeConfig(): Observable<any>{
    return this.http.get(this.nursesUrl + "config/nurse-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

  public putNurseCodeConfig(nurse: any): Observable<any>{
    return this.http.put(this.nursesUrl + "config/nurse-code/" + this.customCookie.getCookie('hospital_id'), nurse, this.authHeaders.headers);
  }

  public getNewNurseCodeConfig(): Observable<any>{
    return this.http.get(this.nursesUrl + "config/new-nurse-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

}

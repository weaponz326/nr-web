import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/hospital/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class DrugsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
  ) { }

  drugsUrl = environment.apiUrl + 'hospital-modules/drugs/';

  // drugs

  // create and get all drugs belonging to user

  public getAccountDrug(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.drugsUrl + "drug?account=" + this.customCookie.getCookie('hospital_id')
      + "&page=" + page
      + "&size=" + size
      + "&druging=" + sortField, this.authHeaders.headers);
  }

  public postDrug(drug: any): Observable<any>{
    return this.http.post(this.drugsUrl + "drug/", drug, this.authHeaders.headers);
  }

  public getDrug(): Observable<any>{
    return this.http.get(this.drugsUrl + "drug/" + sessionStorage.getItem('hospital_drug_id'), this.authHeaders.headers);
  }

  public putDrug(drug: any): Observable<any>{
    return this.http.put(this.drugsUrl + "drug/" + sessionStorage.getItem('hospital_drug_id'), drug, this.authHeaders.headers);
  }

  public deleteDrug(): Observable<any>{
    return this.http.delete(this.drugsUrl + "drug/" + sessionStorage.getItem('hospital_drug_id'), this.authHeaders.headers);
  }

  // config

  public getDrugCodeConfig(): Observable<any>{
    return this.http.get(this.drugsUrl + "config/drug-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

  public putDrugCodeConfig(drug: any): Observable<any>{
    return this.http.put(this.drugsUrl + "config/drug-code/" + this.customCookie.getCookie('hospital_id'), drug, this.authHeaders.headers);
  }

  public getNewDrugCodeConfig(): Observable<any>{
    return this.http.get(this.drugsUrl + "config/new-drug-code/" + this.customCookie.getCookie('hospital_id'), this.authHeaders.headers);
  }

}

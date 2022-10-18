import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/school/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { ActiveTermService } from 'projects/school/src/app/services/active-term/active-term.service';


@Injectable({
  providedIn: 'root'
})
export class ParentsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
    private activeTerm: ActiveTermService
  ) { }

  parentsUrl = environment.apiUrl + 'school-modules/parents/';

  // parents

  // create and get all parent belonging to user

  public getAccountParent(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.parentsUrl + "parent?account=" + this.customCookie.getCookie('school_id')
      + "&page=" + page
      + "&size=" + size
      + "&parenting=" + sortField, this.authHeaders.headers);
  }

  public postParent(parent: any): Observable<any>{
    return this.http.post(this.parentsUrl + "parent/", parent, this.authHeaders.headers);
  }

  public getParent(): Observable<any>{
    return this.http.get(this.parentsUrl + "parent/" + sessionStorage.getItem('school_parent_id'), this.authHeaders.headers);
  }

  public putParent(parent: any): Observable<any>{
    return this.http.put(this.parentsUrl + "parent/" + sessionStorage.getItem('school_parent_id'), parent, this.authHeaders.headers);
  }

  public deleteParent(): Observable<any>{
    return this.http.delete(this.parentsUrl + "parent/" + sessionStorage.getItem('school_parent_id'), this.authHeaders.headers);
  }

  public putParentPhoto(photo: File) {
    let formParams = new FormData();
    formParams.append('photo', photo);
    formParams.append('account', this.customCookie.getCookie('school_id') as string);
    return this.http.put(this.parentsUrl + "parent/" + sessionStorage.getItem('school_parent_id'), formParams, this.authHeaders.headers)
  }

  // parent wards

  // parent wards

  public getParentParentWard(): Observable<any>{
    return this.http.get(this.parentsUrl + "parent-ward?parent=" + sessionStorage.getItem('school_parent_id'), this.authHeaders.headers);
  }

  public postParentWard(ward: any): Observable<any>{
    return this.http.post(this.parentsUrl + "parent-ward/", ward, this.authHeaders.headers);
  }

  public getParentWard(wardId: any): Observable<any>{
    return this.http.get(this.parentsUrl + "parent-ward/" + wardId, this.authHeaders.headers);
  }

  public putParentWard(wardId: any, wardData: any): Observable<any>{
    return this.http.put(this.parentsUrl + "parent-ward/" + wardId, wardData, this.authHeaders.headers);
  }

  public deleteParentWard(wardId: any): Observable<any>{
    return this.http.delete(this.parentsUrl + "parent-ward/" + wardId, this.authHeaders.headers);
  }

  // config

  public getParentCodeConfig(): Observable<any>{
    return this.http.get(this.parentsUrl + "config/parent-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  public putParentCodeConfig(parent: any): Observable<any>{
    return this.http.put(this.parentsUrl + "config/parent-code/" + this.customCookie.getCookie('school_id'), parent, this.authHeaders.headers);
  }

  public getNewParentCodeConfig(): Observable<any>{
    return this.http.get(this.parentsUrl + "config/new-parent-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  // dashboard

}

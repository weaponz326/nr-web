import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/association/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';

@Injectable({
  providedIn: 'root'
})
export class MembersApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
  ) { }

  membersUrl = environment.apiUrl + 'association-modules/members/';

  // members

  // create and get all member belonging to user

  public getAccountMember(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.membersUrl + "member?account=" + this.customCookie.getCookie('association_id')
      + "&page=" + page
      + "&size=" + size
      + "&membering=" + sortField, this.authHeaders.headers);
  }

  public postMember(member: any): Observable<any>{
    return this.http.post(this.membersUrl + "member/", member, this.authHeaders.headers);
  }

  public getMember(): Observable<any>{
    return this.http.get(this.membersUrl + "member/" + sessionStorage.getItem('association_member_id'), this.authHeaders.headers);
  }

  public putMember(member: any): Observable<any>{
    return this.http.put(this.membersUrl + "member/" + sessionStorage.getItem('association_member_id'), member, this.authHeaders.headers);
  }

  public deleteMember(): Observable<any>{
    return this.http.delete(this.membersUrl + "member/" + sessionStorage.getItem('association_member_id'), this.authHeaders.headers);
  }

  public putMemberPhoto(photo: File) {
    let formParams = new FormData();
    formParams.append('photo', photo);
    formParams.append('account', this.customCookie.getCookie('association') as string);
    return this.http.put(this.membersUrl + "member/" + sessionStorage.getItem('association_member_id'), formParams, this.authHeaders.headers)
  }

  // config

  public getMemberCodeConfig(): Observable<any>{
    return this.http.get(this.membersUrl + "config/member-code/" + this.customCookie.getCookie('association_id'), this.authHeaders.headers);
  }

  public putMemberCodeConfig(member: any): Observable<any>{
    return this.http.put(this.membersUrl + "config/member-code/" + this.customCookie.getCookie('association_id'), member, this.authHeaders.headers);
  }

  public getNewMemberCodeConfig(): Observable<any>{
    return this.http.get(this.membersUrl + "config/new-member-code/" + this.customCookie.getCookie('association_id'), this.authHeaders.headers);
  }

}

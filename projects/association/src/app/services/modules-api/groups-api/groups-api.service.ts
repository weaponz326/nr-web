import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/association/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class GroupsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
  ) { }

  groupsUrl = environment.apiUrl + 'association-modules/groups/';

  // groups

  public getAccountGroup(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.groupsUrl + "group?account=" + this.customCookie.getCookie('association_id')
      + "&page=" + page
      + "&size=" + size
      + "&orderinging=" + sortField, this.authHeaders.headers);
  }

  public postGroup(group: any): Observable<any>{
    return this.http.post(this.groupsUrl + "group/", group, this.authHeaders.headers);
  }

  public getGroup(): Observable<any>{
    return this.http.get(this.groupsUrl + "group/" + sessionStorage.getItem('association_group_id'), this.authHeaders.headers);
  }

  public putGroup(group: any): Observable<any>{
    return this.http.put(this.groupsUrl + "group/" + sessionStorage.getItem('association_group_id'), group, this.authHeaders.headers);
  }

  public deleteGroup(): Observable<any>{
    return this.http.delete(this.groupsUrl + "group/" + sessionStorage.getItem('association_group_id'), this.authHeaders.headers);
  }

  // group members

  public getGroupGroupMember(): Observable<any>{
    return this.http.get(this.groupsUrl + "group-member?group=" + sessionStorage.getItem('association_group_id'), this.authHeaders.headers);
  }

  public postGroupMember(member: any): Observable<any>{
    return this.http.post(this.groupsUrl + "group-member/", member, this.authHeaders.headers);
  }

  public getGroupMember(memberId: any): Observable<any>{
    return this.http.get(this.groupsUrl + "group-member/" + memberId, this.authHeaders.headers);
  }

  public putGroupMember(memberId: any, memberData: any): Observable<any>{
    return this.http.put(this.groupsUrl + "group-member/" + memberId, memberData, this.authHeaders.headers);
  }

  public deleteGroupMember(memberId: any): Observable<any>{
    return this.http.delete(this.groupsUrl + "group-member/" + memberId, this.authHeaders.headers);
  }

  // config

  public getGroupCodeConfig(): Observable<any>{
    return this.http.get(this.groupsUrl + "config/group-code/" + this.customCookie.getCookie('association_id'), this.authHeaders.headers);
  }

  public putGroupCodeConfig(group: any): Observable<any>{
    return this.http.put(this.groupsUrl + "config/group-code/" + this.customCookie.getCookie('association_id'), group, this.authHeaders.headers);
  }

  public getNewGroupCodeConfig(): Observable<any>{
    return this.http.get(this.groupsUrl + "config/new-group-code/" + this.customCookie.getCookie('association_id'), this.authHeaders.headers);
  }

  // dashboard

}

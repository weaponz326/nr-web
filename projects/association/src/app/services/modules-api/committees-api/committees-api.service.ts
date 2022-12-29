import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/association/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class CommitteesApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  committeesUrl = environment.apiUrl + 'association-modules/committees/';

  // committees

  public getAccountCommittee(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.committeesUrl + "committee?account=" + this.customCookie.getCookie('association_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postCommittee(committee: any): Observable<any>{
    return this.http.post(this.committeesUrl + "committee/", committee, this.authHeaders.headers);
  }

  public getCommittee(): Observable<any>{
    return this.http.get(this.committeesUrl + "committee/" + sessionStorage.getItem('association_committee_id'), this.authHeaders.headers);
  }

  public putCommittee(committee: any): Observable<any>{
    return this.http.put(this.committeesUrl + "committee/" + sessionStorage.getItem('association_committee_id'), committee, this.authHeaders.headers);
  }

  public deleteCommittee(): Observable<any>{
    return this.http.delete(this.committeesUrl + "committee/" + sessionStorage.getItem('association_committee_id'), this.authHeaders.headers);
  }

  // committee members

  public getCommitteeCommitteeMember(): Observable<any>{
    return this.http.get(this.committeesUrl + "committee-member?committee=" + sessionStorage.getItem('association_committee_id'), this.authHeaders.headers);
  }

  public postCommitteeMember(member: any): Observable<any>{
    return this.http.post(this.committeesUrl + "committee-member/", member, this.authHeaders.headers);
  }

  public getCommitteeMember(memberId: any): Observable<any>{
    return this.http.get(this.committeesUrl + "committee-member/" + memberId, this.authHeaders.headers);
  }

  public putCommitteeMember(memberId: any, memberData: any): Observable<any>{
    return this.http.put(this.committeesUrl + "committee-member/" + memberId, memberData, this.authHeaders.headers);
  }

  public deleteCommitteeMember(memberId: any): Observable<any>{
    return this.http.delete(this.committeesUrl + "committee-member/" + memberId, this.authHeaders.headers);
  }

  // config

  public getCommitteeCodeConfig(): Observable<any>{
    return this.http.get(this.committeesUrl + "config/committee-code/" + this.customCookie.getCookie('association_id'), this.authHeaders.headers);
  }

  public putCommitteeCodeConfig(committee: any): Observable<any>{
    return this.http.put(this.committeesUrl + "config/committee-code/" + this.customCookie.getCookie('association_id'), committee, this.authHeaders.headers);
  }

  public getNewCommitteeCodeConfig(): Observable<any>{
    return this.http.get(this.committeesUrl + "config/new-committee-code/" + this.customCookie.getCookie('association_id'), this.authHeaders.headers);
  }
  
  // dashboard

  
}

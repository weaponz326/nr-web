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
export class SectionsApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
    private activeTerm: ActiveTermService
  ) { }

  sectionsUrl = environment.apiUrl + 'school-modules/sections/';

  // sections

  public getAccountSection(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.sectionsUrl + "section?account=" + this.customCookie.getCookie('school_id')
      + "&page=" + page
      + "&size=" + size
      + "&orderinging=" + sortField, this.authHeaders.headers);
  }

  public postSection(section: any): Observable<any>{
    return this.http.post(this.sectionsUrl + "section/", section, this.authHeaders.headers);
  }

  public getSection(): Observable<any>{
    return this.http.get(this.sectionsUrl + "section/" + sessionStorage.getItem('school_section_id'), this.authHeaders.headers);
  }

  public putSection(section: any): Observable<any>{
    return this.http.put(this.sectionsUrl + "section/" + sessionStorage.getItem('school_section_id'), section, this.authHeaders.headers);
  }

  public deleteSection(): Observable<any>{
    return this.http.delete(this.sectionsUrl + "section/" + sessionStorage.getItem('school_section_id'), this.authHeaders.headers);
  }

  // section students

  public getSectionSectionStudent(): Observable<any>{
    return this.http.get(this.sectionsUrl + "section-student?section=" + sessionStorage.getItem('school_section_id'), this.authHeaders.headers);
  }

  public postSectionStudent(student: any): Observable<any>{
    return this.http.post(this.sectionsUrl + "section-student/", student, this.authHeaders.headers);
  }

  public getSectionStudent(studentId: any): Observable<any>{
    return this.http.get(this.sectionsUrl + "section-student/" + studentId, this.authHeaders.headers);
  }

  public putSectionStudent(studentId: any, studentData: any): Observable<any>{
    return this.http.put(this.sectionsUrl + "section-student/" + studentId, studentData, this.authHeaders.headers);
  }

  public deleteSectionStudent(studentId: any): Observable<any>{
    return this.http.delete(this.sectionsUrl + "section-student/" + studentId, this.authHeaders.headers);
  }

  // config

  public getSectionCodeConfig(): Observable<any>{
    return this.http.get(this.sectionsUrl + "config/section-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  public putSectionCodeConfig(section: any): Observable<any>{
    return this.http.put(this.sectionsUrl + "config/section-code/" + this.customCookie.getCookie('school_id'), section, this.authHeaders.headers);
  }

  public getNewSectionCodeConfig(): Observable<any>{
    return this.http.get(this.sectionsUrl + "config/new-section-code/" + this.customCookie.getCookie('school_id'), this.authHeaders.headers);
  }

  // dashboard

}

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
export class ClassesApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
    private activeTerm: ActiveTermService
  ) { }

  classUrl = environment.apiUrl + 'school-modules/classes/';

  // classes

  // create and get all classes belonging to an account

  public getAccountClass(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.classUrl + "class?account=" + this.customCookie.getCookie('school_id')
      + "&page=" + page
      + "&size=" + size
      + "&orderinging=" + sortField, this.authHeaders.headers);
  }

  public postClass(clase: any): Observable<any>{
    return this.http.post(this.classUrl + "class/", clase, this.authHeaders.headers);
  }

  public getClass(): Observable<any>{
    return this.http.get(this.classUrl + "class/" + sessionStorage.getItem('school_class_id'), this.authHeaders.headers);
  }

  public putClass(clase: any): Observable<any>{
    return this.http.put(this.classUrl + "class/" + sessionStorage.getItem('school_class_id'), clase, this.authHeaders.headers);
  }

  public deleteClass(): Observable<any>{
    return this.http.delete(this.classUrl + "class/" + sessionStorage.getItem('school_class_id'), this.authHeaders.headers);
  }

  // class students

  public getClassClassStudent(): Observable<any>{
    return this.http.get(this.classUrl + "class-student?class=" + sessionStorage.getItem('school_class_id'), this.authHeaders.headers);
  }

  public postClassStudent(student: any): Observable<any>{
    return this.http.post(this.classUrl + "class-student/", student, this.authHeaders.headers);
  }

  public getClassStudent(studentId: any): Observable<any>{
    return this.http.get(this.classUrl + "class-student/" + studentId, this.authHeaders.headers);
  }

  public putClassStudent(studentId: any, studentData: any): Observable<any>{
    return this.http.put(this.classUrl + "class-student/" + studentId, studentData, this.authHeaders.headers);
  }

  public deleteClassStudent(studentId: any): Observable<any>{
    return this.http.delete(this.classUrl + "class-student/" + studentId, this.authHeaders.headers);
  }

  // create and get all departmentes belonging to an account

  public getAccountDepartment(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.classUrl + "department?account=" + this.customCookie.getCookie('school_id')
      + "&page=" + page
      + "&size=" + size
      + "&orderinging=" + sortField, this.authHeaders.headers);
  }

  public postDepartment(clase: any): Observable<any>{
    return this.http.post(this.classUrl + "department/", clase, this.authHeaders.headers);
  }

  public getDepartment(): Observable<any>{
    return this.http.get(this.classUrl + "department/" + sessionStorage.getItem('school_department_id'), this.authHeaders.headers);
  }

  public putDepartment(clase: any): Observable<any>{
    return this.http.put(this.classUrl + "department/" + sessionStorage.getItem('school_department_id'), clase, this.authHeaders.headers);
  }

  public deleteDepartment(): Observable<any>{
    return this.http.delete(this.classUrl + "department/" + sessionStorage.getItem('school_department_id'), this.authHeaders.headers);
  }

  // department classs

  public getDepartmentDepartmentClass(): Observable<any>{
    return this.http.get(this.classUrl + "department-class?department=" + sessionStorage.getItem('school_department_id'), this.authHeaders.headers);
  }

  public postDepartmentClass(clase: any): Observable<any>{
    return this.http.post(this.classUrl + "department-class/", clase, this.authHeaders.headers);
  }

  public getDepartmentClass(classId: any): Observable<any>{
    return this.http.get(this.classUrl + "department-class/" + classId, this.authHeaders.headers);
  }

  public putDepartmentClass(classId: any, classData: any): Observable<any>{
    return this.http.put(this.classUrl + "department-class/" + classId, classData, this.authHeaders.headers);
  }

  public deleteDepartmentClass(classId: any): Observable<any>{
    return this.http.delete(this.classUrl + "department-class/" + classId, this.authHeaders.headers);
  }

}

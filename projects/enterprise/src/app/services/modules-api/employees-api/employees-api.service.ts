import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/enterprise/src/environments/environment';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeesApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService,
  ) { }

  employeesUrl = environment.apiUrl + 'enterprise-modules/employees/';

  // employees

  // create and get all employee belonging to user

  public getAccountEmployee(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.employeesUrl + "employee?account=" + this.customCookie.getCookie('enterprise_id')
      + "&page=" + page
      + "&size=" + size
      + "&employeeing=" + sortField, this.authHeaders.headers);
  }

  public postEmployee(employee: any): Observable<any>{
    return this.http.post(this.employeesUrl + "employee/", employee, this.authHeaders.headers);
  }

  public getEmployee(): Observable<any>{
    return this.http.get(this.employeesUrl + "employee/" + sessionStorage.getItem('enterprise_employee_id'), this.authHeaders.headers);
  }

  public putEmployee(employee: any): Observable<any>{
    return this.http.put(this.employeesUrl + "employee/" + sessionStorage.getItem('enterprise_employee_id'), employee, this.authHeaders.headers);
  }

  public deleteEmployee(): Observable<any>{
    return this.http.delete(this.employeesUrl + "employee/" + sessionStorage.getItem('enterprise_employee_id'), this.authHeaders.headers);
  }

  public putEmployeePhoto(photo: File) {
    let formParams = new FormData();
    formParams.append('photo', photo);
    formParams.append('account', this.customCookie.getCookie('enterprise') as string);
    return this.http.put(this.employeesUrl + "employee/" + sessionStorage.getItem('enterprise_employee_id'), formParams, this.authHeaders.headers)
  }

  // config

  public getEmployeeCodeConfig(): Observable<any>{
    return this.http.get(this.employeesUrl + "config/employee-code/" + this.customCookie.getCookie('enterprise_id'), this.authHeaders.headers);
  }

  public putEmployeeCodeConfig(employee: any): Observable<any>{
    return this.http.put(this.employeesUrl + "config/employee-code/" + this.customCookie.getCookie('enterprise_id'), employee, this.authHeaders.headers);
  }

  public getNewEmployeeCodeConfig(): Observable<any>{
    return this.http.get(this.employeesUrl + "config/new-employee-code/" + this.customCookie.getCookie('enterprise_id'), this.authHeaders.headers);
  }

}

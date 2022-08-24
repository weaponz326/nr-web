import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from '../../auth/auth-headers/auth-headers.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService
  ) { }

  personalUrl = environment.personalUrl;

  // budget

  public getUserBudgets(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.personalUrl + "module-budget/budget?user=" + localStorage.getItem('personal_id')
      + "&page=" + page
      + "&siz=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getBudget(): Observable<any>{
    return this.http.get(this.personalUrl + "module-budget/budget/" + sessionStorage.getItem('personal_budget_id'), this.authHeaders.headers);
  }

  public postBudget(budget: any): Observable<any>{
    return this.http.post(this.personalUrl + "module-budget/budget/", budget, this.authHeaders.headers);
  }

  public putBudget(budget: any): Observable<any>{
    return this.http.put(this.personalUrl + "module-budget/budget/" + sessionStorage.getItem('personal_budget_id'), budget, this.authHeaders.headers);
  }

  public deleteBudget(): Observable<any>{
    return this.http.delete(this.personalUrl + "module-budget/budget/" + sessionStorage.getItem('personal_budget_id'), this.authHeaders.headers);
  }

  // income

  public getBudgetIncome(): Observable<any>{
    return this.http.get(this.personalUrl + "module-budget/income?budget=" + sessionStorage.getItem('personal_budget_id'), this.authHeaders.headers);
  }

  public getIncome(incomeId: any): Observable<any>{
    return this.http.get(this.personalUrl + "module-budget/income/=" + incomeId, this.authHeaders.headers);
  }

  public postIncome(income: any): Observable<any>{
    return this.http.post(this.personalUrl + "module-budget/income/", income, this.authHeaders.headers);
  }

  public putIncome(income: any, incomeId: any): Observable<any>{
    return this.http.put(this.personalUrl + "module-budget/income/" + incomeId, income, this.authHeaders.headers);
  }

  public deleteIncome(incomeId: any): Observable<any>{
    return this.http.delete(this.personalUrl + "module-budget/income/" + incomeId, this.authHeaders.headers);
  }

  // expenditure

  public getBudgetExpenditure(): Observable<any>{
    return this.http.get(this.personalUrl + "module-budget/expenditure?budget=" + sessionStorage.getItem('personal_budget_id'), this.authHeaders.headers);
  }

  public getExpenditure(expenditureId: any): Observable<any>{
    return this.http.get(this.personalUrl + "module-budget/expenditure/=" + expenditureId, this.authHeaders.headers);
  }

  public postExpenditure(expenditure: any): Observable<any>{
    return this.http.post(this.personalUrl + "module-budget/expenditure/", expenditure, this.authHeaders.headers);
  }

  public putExpenditure(expenditure: any, expenditureId: any): Observable<any>{
    return this.http.put(this.personalUrl + "module-budget/expenditure/" + expenditureId, expenditure, this.authHeaders.headers);
  }

  public deleteExpenditure(expenditureId: any): Observable<any>{
    return this.http.delete(this.personalUrl + "module-budget/expenditure/" + expenditureId, this.authHeaders.headers);
  }

}

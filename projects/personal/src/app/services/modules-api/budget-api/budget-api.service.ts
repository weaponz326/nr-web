import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from '../../auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class BudgetApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  budgetUrl = environment.apiUrl + 'personal-modules/budget/';

  // budget

  public getUserBudgets(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.budgetUrl + "budget?user=" + this.customCookie.getCookie('personal_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getBudget(): Observable<any>{
    return this.http.get(this.budgetUrl + "budget/" + sessionStorage.getItem('personal_budget_id'), this.authHeaders.headers);
  }

  public postBudget(budget: any): Observable<any>{
    return this.http.post(this.budgetUrl + "budget/", budget, this.authHeaders.headers);
  }

  public putBudget(budget: any): Observable<any>{
    return this.http.put(this.budgetUrl + "budget/" + sessionStorage.getItem('personal_budget_id'), budget, this.authHeaders.headers);
  }

  public deleteBudget(): Observable<any>{
    return this.http.delete(this.budgetUrl + "budget/" + sessionStorage.getItem('personal_budget_id'), this.authHeaders.headers);
  }

  // income

  public getBudgetIncome(): Observable<any>{
    return this.http.get(this.budgetUrl + "income?budget=" + sessionStorage.getItem('personal_budget_id'), this.authHeaders.headers);
  }

  public getIncome(incomeId: any): Observable<any>{
    return this.http.get(this.budgetUrl + "income/=" + incomeId, this.authHeaders.headers);
  }

  public postIncome(income: any): Observable<any>{
    return this.http.post(this.budgetUrl + "income/", income, this.authHeaders.headers);
  }

  public putIncome(income: any, incomeId: any): Observable<any>{
    return this.http.put(this.budgetUrl + "income/" + incomeId, income, this.authHeaders.headers);
  }

  public deleteIncome(incomeId: any): Observable<any>{
    return this.http.delete(this.budgetUrl + "income/" + incomeId, this.authHeaders.headers);
  }

  // expenditure

  public getBudgetExpenditure(): Observable<any>{
    return this.http.get(this.budgetUrl + "expenditure?budget=" + sessionStorage.getItem('personal_budget_id'), this.authHeaders.headers);
  }

  public getExpenditure(expenditureId: any): Observable<any>{
    return this.http.get(this.budgetUrl + "expenditure/=" + expenditureId, this.authHeaders.headers);
  }

  public postExpenditure(expenditure: any): Observable<any>{
    return this.http.post(this.budgetUrl + "expenditure/", expenditure, this.authHeaders.headers);
  }

  public putExpenditure(expenditure: any, expenditureId: any): Observable<any>{
    return this.http.put(this.budgetUrl + "expenditure/" + expenditureId, expenditure, this.authHeaders.headers);
  }

  public deleteExpenditure(expenditureId: any): Observable<any>{
    return this.http.delete(this.budgetUrl + "expenditure/" + expenditureId, this.authHeaders.headers);
  }

  // dashboard

  public getBudgetCount(): Observable<any>{
    return this.http.get(this.budgetUrl + "dashboard/budget-count?user=" + this.customCookie.getCookie('personal_id'), this.authHeaders.headers);
  }

  public getIncomeTotal(): Observable<any>{
    return this.http.get(this.budgetUrl + "dashboard/income-total?user=" + this.customCookie.getCookie('personal_id'), this.authHeaders.headers);
  }

  public getExpenditureTotal(): Observable<any>{
    return this.http.get(this.budgetUrl + "dashboard/expenditure-total?user=" + this.customCookie.getCookie('personal_id'), this.authHeaders.headers);
  }

}

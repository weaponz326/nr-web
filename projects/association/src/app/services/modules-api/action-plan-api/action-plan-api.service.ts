import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { environment } from 'projects/association/src/environments/environment'
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class ActionPlanApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  actionPlanUrl = environment.apiUrl + 'association-modules/action-plan/';

  // action plan

  public getAccountActionPlan(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.actionPlanUrl + "action-plan?account=" + this.customCookie.getCookie('association_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField, this.authHeaders.headers);
  }

  public postActionPlan(actionPlan: any): Observable<any>{
    return this.http.post(this.actionPlanUrl + "action-plan/", actionPlan, this.authHeaders.headers);
  }

  public getActionPlan(): Observable<any>{
    return this.http.get(this.actionPlanUrl + "action-plan/" + sessionStorage.getItem('association_action_plan_id'), this.authHeaders.headers);
  }

  public putActionPlan(actionPlan: any): Observable<any>{
    return this.http.put(this.actionPlanUrl + "action-plan/" + sessionStorage.getItem('association_action_plan_id'), actionPlan, this.authHeaders.headers);
  }

  public deleteActionPlan(): Observable<any>{
    return this.http.delete(this.actionPlanUrl + "action-plan/" + sessionStorage.getItem('association_action_plan_id'), this.authHeaders.headers);
  }

  // plan step

  public getPlanStep(): Observable<any>{
    return this.http.get(this.actionPlanUrl + "plan-step?action_plan=" + sessionStorage.getItem('association_action_plan_id'), this.authHeaders.headers);
  }

  public getStep(stepId: any): Observable<any>{
    return this.http.get(this.actionPlanUrl + "plan-step/=" + stepId, this.authHeaders.headers);
  }

  public postStep(step: any): Observable<any>{
    return this.http.post(this.actionPlanUrl + "plan-step/", step, this.authHeaders.headers);
  }

  public putStep(step: any, stepId: any): Observable<any>{
    return this.http.put(this.actionPlanUrl + "plan-step/" + stepId, step, this.authHeaders.headers);
  }

  public deleteStep(stepId: any): Observable<any>{
    return this.http.delete(this.actionPlanUrl + "plan-step/" + stepId, this.authHeaders.headers);
  }

  // config

  public getActionPlanCodeConfig(): Observable<any>{
    return this.http.get(this.actionPlanUrl + "config/action-plan-code/" + this.customCookie.getCookie('association_id'), this.authHeaders.headers);
  }

  public putActionPlanCodeConfig(plan: any): Observable<any>{
    return this.http.put(this.actionPlanUrl + "config/action-plan-code/" + this.customCookie.getCookie('association_id'), plan, this.authHeaders.headers);
  }

  public getNewActionPlanCodeConfig(): Observable<any>{
    return this.http.get(this.actionPlanUrl + "config/new-action-plan-code/" + this.customCookie.getCookie('association_id'), this.authHeaders.headers);
  }

}

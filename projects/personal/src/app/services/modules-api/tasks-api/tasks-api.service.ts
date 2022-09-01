import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from '../../auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class TasksApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService
  ) { }

  personalApi = environment.personalApi;

  // task group

  public getUserTaskGroups(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.personalApi + "module-tasks/task-group?user=" + localStorage.getItem('personal_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getTaskGroup(): Observable<any>{
    return this.http.get(this.personalApi + "module-tasks/task-group/" + sessionStorage.getItem('personal_task_group_id'), this.authHeaders.headers);
  }

  public postTaskGroup(taskGroup: any): Observable<any>{
    return this.http.post(this.personalApi + "module-tasks/task-group/", taskGroup, this.authHeaders.headers);
  }

  public putTaskGroup(taskGroup: any): Observable<any>{
    return this.http.put(this.personalApi + "module-tasks/task-group/" + sessionStorage.getItem('personal_task_group_id'), taskGroup, this.authHeaders.headers);
  }

  public deleteTaskGroup(): Observable<any>{
    return this.http.delete(this.personalApi + "module-tasks/task-group/" + sessionStorage.getItem('personal_task_group_id'), this.authHeaders.headers);
  }

  // task items

  public getUserTaskItems(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.personalApi + "module-tasks/all-task-item?user=" + localStorage.getItem('personal_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getTaskGroupSchedules(): Observable<any>{
    return this.http.get(this.personalApi + "module-tasks/task-item?calendar=" + sessionStorage.getItem('personal_task_group_id'), this.authHeaders.headers);
  }

  public getSchedule(taskItemId: any): Observable<any>{
    return this.http.get(this.personalApi + "module-tasks/task-item/=" + taskItemId, this.authHeaders.headers);
  }

  public postSchedule(schedule: any): Observable<any>{
    return this.http.post(this.personalApi + "module-tasks/task-item/", schedule, this.authHeaders.headers);
  }

  public putSchedule(schedule: any, taskItemId: any): Observable<any>{
    return this.http.put(this.personalApi + "module-tasks/task-item/" + taskItemId, schedule, this.authHeaders.headers);
  }

  public deleteSchedule(taskItemId: any): Observable<any>{
    return this.http.delete(this.personalApi + "module-tasks/task-item/" + taskItemId, this.authHeaders.headers);
  }

  // dashboard

  public getTaskGroupCount(): Observable<any>{
    return this.http.get(this.personalApi + "module-tasks/dashboard/task-group-count?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public getTaskItemCount(): Observable<any>{
    return this.http.get(this.personalApi + "module-tasks/dashboard/task-item-count?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public getAllToDoCount(): Observable<any>{
    return this.http.get(this.personalApi + "module-tasks/dashboard/all-todo-count?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public getTaskGroupAnnotate(): Observable<any>{
    return this.http.get(this.personalApi + "module-tasks/dashboard/task-group-annotate?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public getTaskItemAnnotate(): Observable<any>{
    return this.http.get(this.personalApi + "module-tasks/dashboard/task-item-annotate?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

}

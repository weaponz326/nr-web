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

  tasksUrl = environment.apiUrl + 'personal-modules/tasks/';

  // task group

  public getUserTaskGroups(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.tasksUrl + "task-group?user=" + localStorage.getItem('personal_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getTaskGroup(): Observable<any>{
    return this.http.get(this.tasksUrl + "task-group/" + sessionStorage.getItem('personal_task_group_id'), this.authHeaders.headers);
  }

  public postTaskGroup(taskGroup: any): Observable<any>{
    return this.http.post(this.tasksUrl + "task-group/", taskGroup, this.authHeaders.headers);
  }

  public putTaskGroup(taskGroup: any): Observable<any>{
    return this.http.put(this.tasksUrl + "task-group/" + sessionStorage.getItem('personal_task_group_id'), taskGroup, this.authHeaders.headers);
  }

  public deleteTaskGroup(): Observable<any>{
    return this.http.delete(this.tasksUrl + "task-group/" + sessionStorage.getItem('personal_task_group_id'), this.authHeaders.headers);
  }

  // task items

  public getUserTaskItems(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.tasksUrl + "all-task-item?user=" + localStorage.getItem('personal_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getTaskGroupTaskItems(): Observable<any>{
    return this.http.get(this.tasksUrl + "task-item?task_group=" + sessionStorage.getItem('personal_task_group_id'), this.authHeaders.headers);
  }

  public getTaskItem(taskItemId: any): Observable<any>{
    return this.http.get(this.tasksUrl + "task-item/=" + taskItemId, this.authHeaders.headers);
  }

  public postTaskItem(taskItem: any): Observable<any>{
    return this.http.post(this.tasksUrl + "task-item/", taskItem, this.authHeaders.headers);
  }

  public putTaskItem(taskItem: any, taskItemId: any): Observable<any>{
    return this.http.put(this.tasksUrl + "task-item/" + taskItemId, taskItem, this.authHeaders.headers);
  }

  public deleteTaskItem(taskItemId: any): Observable<any>{
    return this.http.delete(this.tasksUrl + "task-item/" + taskItemId, this.authHeaders.headers);
  }

  // dashboard

  public getTaskGroupCount(): Observable<any>{
    return this.http.get(this.tasksUrl + "dashboard/task-group-count?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public getTaskItemCount(): Observable<any>{
    return this.http.get(this.tasksUrl + "dashboard/task-item-count?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public getAllToDoCount(): Observable<any>{
    return this.http.get(this.tasksUrl + "dashboard/all-todo-count?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public getTaskGroupAnnotate(): Observable<any>{
    return this.http.get(this.tasksUrl + "dashboard/task-group-annotate?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public getTaskItemAnnotate(): Observable<any>{
    return this.http.get(this.tasksUrl + "dashboard/task-item-annotate?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from 'projects/personal/src/app/services/auth/auth-headers/auth-headers.service';
import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class FilesApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService,
    private customCookie: CustomCookieService
  ) { }

  filesUrl = environment.apiUrl + 'enterprise-modules/files/';

  // folders

  public getAccountFolders(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.filesUrl + "folder?account=" + this.customCookie.getCookie('enterprise_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getFolder(): Observable<any>{
    return this.http.get(this.filesUrl + "folder/" + sessionStorage.getItem('enterprise_folder_id'), this.authHeaders.headers);
  }

  public postFolder(folder: any): Observable<any>{
    return this.http.post(this.filesUrl + "folder/", folder, this.authHeaders.headers);
  }

  public putFolder(folder: any): Observable<any>{
    return this.http.put(this.filesUrl + "folder/" + sessionStorage.getItem('enterprise_folder_id'), folder, this.authHeaders.headers);
  }

  public deleteFolder(): Observable<any>{
    return this.http.delete(this.filesUrl + "folder/" + sessionStorage.getItem('enterprise_folder_id'), this.authHeaders.headers);
  }

  // files

  public getAllFolderFiles(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.filesUrl + "all-file?folder=" + this.customCookie.getCookie('enterprise_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getFolderFiles(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.filesUrl + "file?folder=" + sessionStorage.getItem('enterprise_folder_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getFile(fileId: any): Observable<any>{
    return this.http.get(this.filesUrl + "file/=" + fileId, this.authHeaders.headers);
  }

  public postFile(file: any): Observable<any>{
    return this.http.post(this.filesUrl + "file/", file, this.authHeaders.headers);
  }

  public putFile(file: any, fileId: any): Observable<any>{
    return this.http.put(this.filesUrl + "file/" + fileId, file, this.authHeaders.headers);
  }

  public deleteFile(fileId: any): Observable<any>{
    return this.http.delete(this.filesUrl + "file/" + fileId, this.authHeaders.headers);
  }

}

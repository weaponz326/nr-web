import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/personal/src/environments/environment';
import { Observable } from 'rxjs';
import { AuthHeadersService } from '../../auth/auth-headers/auth-headers.service';

@Injectable({
  providedIn: 'root'
})
export class NotesApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService
  ) { }

  personalUrl = environment.personalUrl;

  // notes

  public getUserNotes(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.personalUrl + "module-notes/note?user=" + localStorage.getItem('personal_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getNote(): Observable<any>{
    return this.http.get(this.personalUrl + "module-notes/note/" + sessionStorage.getItem('personal_note_id'), this.authHeaders.headers);
  }

  public postNote(note: any): Observable<any>{
    return this.http.post(this.personalUrl + "module-notes/note/", note, this.authHeaders.headers);
  }

  public putNote(note: any, noteId: any): Observable<any>{
    return this.http.put(this.personalUrl + "module-notes/note/" + noteId, note, this.authHeaders.headers);
  }

  public deleteNote(noteId: any): Observable<any>{
    return this.http.delete(this.personalUrl + "module-notes/note/" + noteId, this.authHeaders.headers);
  }

  public getSearch(search: any): Observable<any>{
    return this.http.get(this.personalUrl + "module-notes/dashboard/note-search?search=" + search, this.authHeaders.headers);
  }

  // dashboard

  public getNoteCount(): Observable<any>{
    return this.http.get(this.personalUrl + "module-notes/dashboard/note-count?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public getNoteAnnotate(): Observable<any>{
    return this.http.get(this.personalUrl + "module-notes/dashboard/note-annotate?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

}

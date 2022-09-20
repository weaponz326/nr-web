import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'projects/personal/src/environments/environment';
import { AuthHeadersService } from '../../auth/auth-headers/auth-headers.service';


@Injectable({
  providedIn: 'root'
})
export class NotesApiService {

  constructor(
    private http: HttpClient,
    private authHeaders: AuthHeadersService
  ) { }

  notesUrl = environment.apiUrl + 'personal-modules/notes/';

  // notes

  public getUserNotes(page: any, size: any, sortField: any): Observable<any>{
    return this.http.get(this.notesUrl + "note?user=" + localStorage.getItem('personal_id')
      + "&page=" + page
      + "&size=" + size
      + "&ordering=" + sortField,
      this.authHeaders.headers);
  }

  public getNote(): Observable<any>{
    return this.http.get(this.notesUrl + "note/" + sessionStorage.getItem('personal_note_id'), this.authHeaders.headers);
  }

  public postNote(note: any): Observable<any>{
    return this.http.post(this.notesUrl + "note/", note, this.authHeaders.headers);
  }

  public putNote(note: any, noteId: any): Observable<any>{
    return this.http.put(this.notesUrl + "note/" + noteId, note, this.authHeaders.headers);
  }

  public deleteNote(noteId: any): Observable<any>{
    return this.http.delete(this.notesUrl + "note/" + noteId, this.authHeaders.headers);
  }

  public getSearch(search: any): Observable<any>{
    return this.http.get(this.notesUrl + "note-search?search=" + search, this.authHeaders.headers);
  }

  // dashboard

  public getNoteCount(): Observable<any>{
    return this.http.get(this.notesUrl + "dashboard/note-count?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

  public getNoteAnnotate(): Observable<any>{
    return this.http.get(this.notesUrl + "dashboard/note-annotate?user=" + localStorage.getItem('personal_id'), this.authHeaders.headers);
  }

}

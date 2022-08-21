import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthHeadersService {

  constructor() { }

  token = new HttpHeaders()
    .set('Authorization', "Bearer " + localStorage.getItem('auth_token'));

  headers = { 'headers': this.token };
  
}

import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthHeadersService {

  constructor() { }

  token = new HttpHeaders()
    .set('Authorization', "Token " + localStorage.getItem('token'));

  headers = { 'headers': this.token };
  
}

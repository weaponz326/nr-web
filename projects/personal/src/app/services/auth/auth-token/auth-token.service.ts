import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor() { }
  
  token = new HttpHeaders()
    .set('Authorization', "Bearer " + localStorage.getItem('auth_token'));

  headers = { 'headers': this.token };

}

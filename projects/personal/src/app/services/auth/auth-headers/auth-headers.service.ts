import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CustomCookieService } from 'projects/application/src/app/services/custom-cookie.service';


@Injectable({
  providedIn: 'root'
})
export class AuthHeadersService {

  constructor(private customCookie: CustomCookieService) { }

  token = new HttpHeaders()
    .set('Authorization', "Token " + this.customCookie.getCookie('token'));

  headers = { 'headers': this.token };
  
}

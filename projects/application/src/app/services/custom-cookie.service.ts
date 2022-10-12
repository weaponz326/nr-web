import { Injectable } from '@angular/core';

import * as Cookie from 'js-cookie';


@Injectable({
  providedIn: 'root'
})
export class CustomCookieService {

  constructor() { }

  setCookie(name: any, value: any){
    // dev
    Cookie.set(name, value);

    // // prod
    // Cookie.set(name, value, { domain: 'netrink.com' });
  }

  getCookie(name: any){
    return Cookie.get(name);
  }

  removeCookies(){
    // dev
    Cookie.remove('token');
    Cookie.remove('personal_id');
    Cookie.remove('restaurant_id');
    Cookie.remove('school_id');

    // // prod
    // Cookie.remove('token', { domain: 'netrink.com' });
    // Cookie.remove('personal_id', { domain: 'netrink.com' });
    // Cookie.remove('restaurant_id', { domain: 'netrink.com' });
    // Cookie.remove('school_id', { domain: 'netrink.com' });
  }

}

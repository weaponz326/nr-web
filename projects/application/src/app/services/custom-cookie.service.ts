import { Injectable } from '@angular/core';

import Cookies from 'js-cookie';


@Injectable({
  providedIn: 'root'
})
export class CustomCookieService {

  constructor() { }

  setCookie(name: any, value: any){
    // dev
    Cookies.set(name, value);

    // // prod
    // Cookies.set(name, value, { domain: 'netrink.com' });
  }

  getCookie(name: any){
    return Cookies.get(name);
  }

  removeCookies(){
    // dev
    Cookies.remove('token');
    Cookies.remove('personal_id');
    Cookies.remove('restaurant_id');
    Cookies.remove('school_id');

    // // prod
    // Cookies.remove('token', { domain: 'netrink.com' });
    // Cookies.remove('personal_id', { domain: 'netrink.com' });
    // Cookies.remove('restaurant_id', { domain: 'netrink.com' });
    // Cookies.remove('school_id', { domain: 'netrink.com' });
  }

}

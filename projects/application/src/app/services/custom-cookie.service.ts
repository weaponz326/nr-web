import { Injectable } from '@angular/core';

import Cookies from 'js-cookie';


@Injectable({
  providedIn: 'root'
})
export class CustomCookieService {

  constructor() { }

  setCookie(name: any, value: any){
    // // dev
    // Cookies.set(name, value);

    // prod
    Cookies.set(name, value, { domain: 'netrink.com' });
  }

  getCookie(name: any){
    return Cookies.get(name);
  }

  removeCookie(name: any){
    // // dev
    // Cookies.remove(name);

    // prod
    Cookies.remove(name, { domain: 'netrink.com' });
  }

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SettingsGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let settingsAccess = JSON.parse(localStorage.getItem('schoolUserAccess') as string).settings_access;

    if (settingsAccess){
      return true;
    }
    else{
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    let settingsAccess = JSON.parse(localStorage.getItem('schoolUserAccess') as string).settings_access;

    if (settingsAccess){
      return true;
    }
    else{
      return false;
    }
  }

}

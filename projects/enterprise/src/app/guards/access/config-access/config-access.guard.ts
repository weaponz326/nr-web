import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConfigAccessGuard implements CanActivate {
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    let accessLevel = JSON.parse(localStorage.getItem('enterpriseUserAccess') as string).access_level;

    if (accessLevel != "Staff"){
      return true;
    }
    else{
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
    let accessLevel = JSON.parse(localStorage.getItem('enterpriseUserAccess') as string).access_level;

    if (accessLevel != "Staff"){
      return true;
    }
    else{
      return false;
    }
  }
  
}

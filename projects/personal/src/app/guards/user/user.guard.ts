import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  
  constructor(private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!!localStorage.getItem('personal_id')){
      this.router.navigateByUrl('/home');
      return false;
    }
    else{
      return true;
    }
  }
  
}

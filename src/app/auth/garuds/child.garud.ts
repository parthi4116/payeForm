import { Injectable } from '@angular/core';
import {  CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root', // Makes the guard available throughout the app
})
export class ChildGuard implements  CanActivateChild {
  constructor(private authService: AuthService) {}


  canActivateChild(  childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
    const currentUser =  localStorage.getItem("userName")&&localStorage.getItem("userPwd")

    if (currentUser) {
       return true;
    }

    this.authService.logout();
    return false;
  }



}

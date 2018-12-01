import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService, GoogleLoginProvider } from "angular4-social-login";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  //private loggedIn;

  constructor(
    public socialAuthService: AuthService,
    private router: Router
  ) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.socialAuthService.authState.map((user) => {
        if(user != null){
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      });
      
  }

}

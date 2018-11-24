import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService, GoogleLoginProvider } from "angular4-social-login";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  private loggedIn;

  constructor(
    public socialAuthService: AuthService,
    private router: Router
  ) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      this.socialAuthService.authState.subscribe((user) => {
        console.log("USER ES " + user)
        this.loggedIn = (user != null);
      });

      if (!this.loggedIn) {
        console.log("LOGGED IN ES "+ this.loggedIn)
        this.router.navigate(['']);
        return false;
      }
      
      console.log("EL AUTH STATE NO ES NULL")
      console.log("EL AUTH STATE es " + this.socialAuthService.authState)
      return true;
  }

}

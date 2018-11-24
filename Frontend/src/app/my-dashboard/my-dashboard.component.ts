import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from "angular4-social-login";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit {
  urlTorneos: string = 'http://localhost:3000/api/torneos/'; 
  torneos;
  showLogin : Boolean = true;
  user: SocialUser;

  constructor(private http: HttpClient,
    private guard: AuthGuard,
    private route: ActivatedRoute ) {}


  public signinWithGoogle () {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  
    this.guard.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => { //on success
         localStorage.setItem("token",userData.authToken);
      }
    );
  }

  signOut(){
    this.guard.socialAuthService.signOut();
    console.log( this.guard.socialAuthService.authState);
    localStorage.removeItem("token");
  }

  ngOnInit() {
    this.http.get(this.urlTorneos).subscribe(data => {
      this.torneos = data;
    });

    this.guard.socialAuthService.authState.subscribe((user) => {
      console.log("USER ES " + user + " en dashboard")
      this.showLogin = (user == null);
      this.user = user;
    });


  }

}

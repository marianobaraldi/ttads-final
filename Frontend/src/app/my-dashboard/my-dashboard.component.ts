import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from "angular4-social-login";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit {

  showLogin : Boolean = true;
  urlUserPhoto;
  email;

  constructor( private socialAuthService: AuthService,
    private router: Router,
    private route: ActivatedRoute ) {}

  nuevoTorneo(){
    
  }
  
  public signinWithGoogle () {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => { //on success
         localStorage.setItem("token",userData.authToken);
         this.showLogin = false;
         localStorage.setItem("url_photo",userData.photoUrl);
         this.urlUserPhoto = userData.photoUrl;
         localStorage.setItem("email",userData.email);
         this.email = userData.email;
      } //TODO handle error
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => { 

      if(!(localStorage.getItem('token') == null)){//TODO:check if its a valid token (?)

        this.showLogin = false;
        this.urlUserPhoto = localStorage.getItem('url_photo');
        this.email = localStorage.getItem('email');
      }
    }) 
  }

}

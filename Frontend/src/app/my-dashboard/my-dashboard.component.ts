import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from "angular4-social-login";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit {
  urlTorneos: string = 'http://localhost:3000/api/torneos/'; 
  torneos;
  showLogin : Boolean = true;
  urlUserPhoto;
  email;

  constructor(private http: HttpClient,
    private socialAuthService: AuthService,
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
    this.http.get(this.urlTorneos).subscribe(data => {
      this.torneos = data;
    });

    this.route.params.subscribe(params => { 

      if(!(localStorage.getItem('token') == null)){//TODO:check if its a valid token (?)

        this.showLogin = false;
        this.urlUserPhoto = localStorage.getItem('url_photo');
        this.email = localStorage.getItem('email');
      }
    }) 
  }

}

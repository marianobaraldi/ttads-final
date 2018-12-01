import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GoogleLoginProvider, SocialUser } from "angular4-social-login";
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showLogin : Boolean = true;
  user: SocialUser;
  @Output() loginChange = new EventEmitter();

  constructor(private guard: AuthGuard) { }


  public signinWithGoogle () {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.guard.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => { 
         localStorage.setItem("token",userData.authToken);
         this.loginChange.emit(true);         
      }
    );
  }

  signOut(){
    this.guard.socialAuthService.signOut().then(() =>{
      localStorage.removeItem("token");
      this.loginChange.emit(false);
    });
  }


  ngOnInit() {
    this.guard.socialAuthService.authState.subscribe((user) => {
      this.showLogin = (user == null);
      this.user = user;
      this.loginChange.emit(!this.showLogin);
    });
  }

}

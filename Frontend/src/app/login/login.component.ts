import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef  } from '@angular/core';
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

  constructor(private guard: AuthGuard,
    private cd: ChangeDetectorRef) { }


  public signinWithGoogle () {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.guard.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => { 
         localStorage.setItem("token",userData.authToken);
         this.showLogin = false;
         this.user = userData;
         this.loginChange.emit(true);   
         this.refresh();      
      }
    );
  }

  signOut(){
    this.guard.socialAuthService.signOut().then(() =>{
      localStorage.removeItem("token");
      this.showLogin = true;
      this.user = null;
      this.loginChange.emit(false);
      this.refresh();   
    });
  }


  ngOnInit() {
    this.guard.socialAuthService.authState.subscribe((user) => {
      this.showLogin = (user == null);
      this.user = user;
      this.loginChange.emit(!this.showLogin);
    });
  }

  refresh() {
    this.cd.detectChanges();
  }

}

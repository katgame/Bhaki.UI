import { Component, NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
import { CommonModule } from '@angular/common';
import { TokenStorageService } from './services/token-storage.service';

const form = new FormGroup({
  password: new FormControl({ value: '', disabled: false }, [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
});

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  public fields = {
    email: 'email',
    password: 'password',
  }
  login = '';
  password = '';
  isLoggedIn = false;
  isLoginFailed = false;
  erroMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthenticationService, 
    private tokenStorage: TokenStorageService, 
    private router: Router ) {}
    public loginForm = form;
  ngOnInit(){
    //checking if the token is already set i.e user already logged in 
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  //logging into the app
  onLoginClick(args) {
    //check if the logging in form is filled correctly
    if (this.loginForm.valid) {
      return;
    }

    //using the authentication service to authenticate the user
    this.authService.login({username: this.loginForm.value.email , password: this.loginForm.value.password}).subscribe(
      data => {
        if (data == null){
          this.isLoginFailed = true;
         console.log("Incorrect Username/Password.")
        } else {
          console.log(data);
          this.tokenStorage.saveToken(data.result.token);
         // this.tokenStorage.saveToken(data.accessToken.token);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          this.router.navigate(['/home']);
        }

      },
      err => {
        this.isLoginFailed = true;
        console.log("Incorrect Username/Password.")
      }
    );
  }

}


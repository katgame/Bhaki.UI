import { Component, NgModule } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";

import { AuthenticationService } from "./services/authentication.service";
import { BehaviorSubject } from "rxjs";
import { CommonModule } from "@angular/common";
import { HostService } from "app/service/bhaki-service";
import { SpinnerOverlayService } from "./../spinner/spinner-overlay.service";
import { TokenStorageService } from "./services/token-storage.service";

const form = new FormGroup({
  email: new FormControl("", [
    Validators.required,
    Validators.email,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
  ]),

  password: new FormControl({ value: "", disabled: false }, [
    Validators.required,
  ]),
});

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  public submitted = false;
  hideSpinner = true;
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public fields = {
    email: "email",
    password: "password",
  };
  isLoggedIn = false;
  isLoginFailed = false;
  erroMessage = "";
  roles: string[] = [];

  constructor(
    private authService: HostService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}
  public loginForm = form;
  login = "";
  password = "";

  ngOnInit() {
    //checking if the token is already set i.e user already logged in
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.showSpinner.subscribe((res) => {
      this.hideSpinner = res;
    });
  }

  onLogin() {
    this.showSpinner.next(true);

    if (!this.loginForm.valid) {
      return;
    }

    this.authService
      .login({
        username: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe(
        (data) => {
          if (data == null) {
            this.isLoginFailed = true;
          } else {
            this.showSpinner.next(false);

            this.tokenStorage.saveToken(data.token.token);
            this.tokenStorage.saveUser(data.userDetails);

            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.roles = data.userDetails.role;
            if(this.roles.includes('Admin') === true) { 
              this.router.navigate(["dashboard"]);
            } else {
              this.router.navigate(["registration"]);
            }
           
          }
        },
        (err) => {
          this.showSpinner.next(false);
          this.isLoginFailed = true;
        }
      );
  }
}

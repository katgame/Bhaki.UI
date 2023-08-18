import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';//global variable for the storage name for our authentication token
const USER_KEY = 'auth-user';//global variable for the storage name for our authenticated user

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(
    private router: Router) { }

  //logging out the user and clearing the stored session
  logOut() {
    window.sessionStorage.clear();
    this.router.navigate(['/login-form']);
  }

  //saving the authentication token in the session storage
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  //get the stored authentication token from the session storage
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  //saving the authenticated user in the session storage
  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  //get the stored authenticated user from the session storage
  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}

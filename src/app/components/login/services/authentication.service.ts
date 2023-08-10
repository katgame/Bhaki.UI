import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
};

@Injectable({ 
    providedIn: 'root' 
})
export class AuthenticationService {
    authBase: string;

    constructor(
        private http: HttpClient, 
        private router: Router,) {
            this.authBase = environment.bhakiApi
        }

    //sending the request to the api
    login(credentials): Observable<any> {

        console.log(credentials);
        return this.http.post(this.authBase + 'api/Authentication/login-user', {
            username: credentials.username,
            password: credentials.password
        }, httpOptions)
    }

    //profile function to navigate to user profile
    profile() {
        this.router.navigate(['/profile']);
    }

}
import {HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { throwError } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private token: TokenStorageService,private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authReq = req;
        const token = this.token.getToken();
        if (token != null) {
            authReq = req.clone({ headers: req.headers.set('Accept', 'application/json') });
            authReq = req.clone({ headers: req.headers.set('content-type', 'application/json') });
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
        }
        return next.handle(authReq).pipe(
            map((event: any) => {
              return event;
            }),
            catchError((error: any, caught: any) => {
              switch (error.status) {
                case 400:
                  break;
                case 401:
                  this.router.navigate(['login-form']);
                  break;
                case 404:
                
                  break;
                default:
                 
                  break;
              }
              return throwError(() => new Error('The Error'));
            })
          );
        
    }
}

export const authInterceptorProviders = [
    { provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
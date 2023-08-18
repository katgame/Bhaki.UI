import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Host } from './models/host';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from './models/service';
import { Tenant } from './models/tenant';
import { environment } from 'environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'  })
};
@Injectable({
  providedIn: 'root'
})
export class HostService {

  private hostService: string;
  constructor(private httpClient: HttpClient, 
   ) {
    this.hostService = environment.bhakiApi
  }

  //HOst Session
  public createRegitration(request: any): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.post(this.hostService + 'api/Registration/add-registration', request, httpOptions);
  }

  
  public getBranches(): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.get(this.hostService + 'api/Branch/get-all-branches', httpOptions);
  }

  public getBranchesForDashBoard(): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.get(this.hostService + 'api/Branch/get-all-branches-for-report', httpOptions);
  }

  public getDashBoard(): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.get(this.hostService + 'api/Registration/get-dashboard', httpOptions);
  }
  public getBranchRegistrationsByRangeAndBranch(startdate: any, enddate: any, branchId : any): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.get(this.hostService + 'api/Registration/get-all-registrations-by-date-branchId/'+ startdate + '/' + enddate + '/' + branchId, httpOptions);
  }

  public getAllRegistrations(): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.get(this.hostService + 'api/Registration/get-all-registrations', httpOptions);
  }

  
  public getAllRegistrationsByBranch( branchId : any): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.get(this.hostService + 'api/Registration/get-all-registrations-by-branch-id/' + branchId, httpOptions);
  }

  public getAllRegistrationsByRange(start: any, end: any): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.get(this.hostService + 'api/Registration/get-all-registrations-by-date/{start}/{end}' , httpOptions);
  }
  public getCourses(): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.get(this.hostService + 'api/Course/get-all-courses', httpOptions);
  }
  public login(credentials): Observable<any> {

    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.post(this.hostService + 'api/Authentication/login-user', {
        email: credentials.username,
        password: credentials.password
    }, httpOptions)
}
}

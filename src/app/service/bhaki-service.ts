import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Host } from './models/host';
import { Injectable } from '@angular/core';
import { Service } from './models/service';
import { environment } from 'environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin' : '*'  })
};
@Injectable({
  providedIn: 'root'
})
export class HostService {

  private hostService: string;
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private httpClient: HttpClient, 
   ) {
    this.hostService = environment.bhakiApi
  }

  //HOst Session
  public createRegitration(request: any): Observable<any> {
    this.showSpinner.next(true);
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

  public getRegistrationDetails(registrationNumber): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.get(this.hostService + 'api/Registration/get-registration-details/' +registrationNumber , httpOptions);
  }
  public addBranch(branch: any): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.post(this.hostService + 'api/Branch/add-branch',branch, httpOptions);
  }
  public updateBranch(branch: any): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.put(this.hostService + 'api/Branch/update-branch',branch, httpOptions);
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

  public registerUser(userInfo: any): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.post(this.hostService + 'api/Authentication/register-user', userInfo, httpOptions);
  }

  public deleteUser(userId: string): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.delete(this.hostService + 'api/Authentication/delete-user/'+ userId, httpOptions);
  }
  public enableUser(userId: string): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.put(this.hostService + 'api/Authentication/enable-user/'+ userId, httpOptions);
  }


  public getUserRoles(): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.get(this.hostService + 'api/Authentication/get-user-roles', httpOptions);
  }
  public getAllUsers(): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.get(this.hostService + 'api/Authentication/all-user', httpOptions);
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
  public getCourses(branchId): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.get(this.hostService + 'api/Course/get-all-courses/' + branchId, httpOptions);
  }

  public addCourse(course: any): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.post(this.hostService + 'api/Course/add-course',course, httpOptions);
  }
  public updateCourses(course: any): Observable<any> {
    const headers = {
      ['Access-Control-Allow-Origin']: '*'
    };
    return this.httpClient.put(this.hostService + 'api/Course/update-course',course, httpOptions);
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

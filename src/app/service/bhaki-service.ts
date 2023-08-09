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
    return this.httpClient.post(this.hostService + 'Registration/create', request, httpOptions);
  }
 
}

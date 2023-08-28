import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { HostService } from 'app/service/bhaki-service';

@Component({
  selector: 'app-registration-find',
  templateUrl: './registration-view.component.html',
  styleUrls: ['./registration-view.component.css']
})
export class ViewRegistrationComponent implements OnInit {
  showResults:boolean = false
  result : any;
  registrationNumber: any;
  idDocument: any;
  hideSpinner = true;
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor(private bhakiService: HostService, private _sanitizer: DomSanitizer,private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.registrationNumber = params['id'];
    });
   }

  ngOnInit() {
    this.showSpinner.subscribe((res) => {
      this.hideSpinner = res;
    });
    this.getRegistrationDetails(this.registrationNumber);
  }

  getRegistrationDetails(registrationNumber : any) {
    this.showSpinner.next(true);
    this.bhakiService.getRegistrationDetails(registrationNumber).subscribe({
      next: (res) => {
        this.showSpinner.next(false);
          this.result = res;
          if(res.registration.student.idDocument) {
            this.idDocument = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
            + res.registration.student.idDocument);
          }
       
      },
      error: () => {
        this.showSpinner.next(false);
      },
    }
    );
  }

  search() {
    console.log('searching')
    this.showResults = true
  }
}

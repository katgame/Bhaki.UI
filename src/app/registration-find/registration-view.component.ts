import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { HostService } from 'app/service/bhaki-service';
import { saveAs } from 'file-saver';

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
  constructor(private bhakiService: HostService, private _sanitizer: DomSanitizer,private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.registrationNumber = params['id'];
    });
   }

  ngOnInit() {
    this.getRegistrationDetails(this.registrationNumber);
  }

  getRegistrationDetails(registrationNumber : any) {
    this.bhakiService.getRegistrationDetails(registrationNumber).subscribe({
      next: (res) => {
          this.result = res;
          if(res.registration.student.idDocument) {
            this.idDocument = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
            + res.registration.student.idDocument);
          }
       
      },
      error: () => {
      },
    }
    );
  }

  search() {
    console.log('searching')
    this.showResults = true
  }
}

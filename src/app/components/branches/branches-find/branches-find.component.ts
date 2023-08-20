import * as Chartist from 'chartist';

import { Component, OnInit } from '@angular/core';

import { HostService } from 'app/service/bhaki-service';

@Component({
  selector: 'app-registration-find',
  templateUrl: './registration-find.component.html',
  styleUrls: ['./registration-find.component.css']
})
export class FindRegistrationComponent implements OnInit {
  showResults:boolean = false
reportsForm: any;
  constructor() { }

  ngOnInit() {
  }
  search() {
    console.log('searching')
    this.showResults = true
  }
}

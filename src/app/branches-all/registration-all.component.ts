import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-all',
  templateUrl: './registration-all.component.html',
  styleUrls: ['./registration-all.component.css']
})
export class AllRegistrationComponent implements OnInit {
  showResults:boolean = false
  constructor() { }

  ngOnInit() {
  }
  search() {
    console.log('searching')
    this.showResults = true
  }
}

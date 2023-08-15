import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-find',
  templateUrl: './registration-find.component.html',
  styleUrls: ['./registration-find.component.css']
})
export class FindRegistrationComponent implements OnInit {
  showResults:boolean = false
  constructor() { }

  ngOnInit() {
  }
  search() {
    console.log('searching')
    this.showResults = true
  }
}

import { Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HostService } from 'app/service/bhaki-service';

@Component({
  selector: 'app-branches-all',
  templateUrl: './branches-all.component.html',
  styleUrls: ['./branches-all.component.css']
})
export class AllBranchesComponent implements OnInit {
  showResults:boolean = false;
  Branch: any = [];
  hideSpinner = true;
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  constructor(private bhakiService: HostService) { 
    this.getBranches();
  }
  getBranches() {
    this.showSpinner.next(true);
    this.bhakiService.getBranchesForDashBoard().subscribe({
      next: (res) => {
        this.showSpinner.next(false);
          this.Branch = res;
      },
      error: (err) => {
        this.showSpinner.next(false);
      console.log(err);
      },
    }
    );
  }

  ngOnInit() {
    this.showSpinner.subscribe((res) => {
      this.hideSpinner = res;
    });
  }
  search() {
    console.log('searching')
    this.showResults = true
  }
}

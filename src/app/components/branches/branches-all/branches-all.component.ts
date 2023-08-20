import { Component, OnInit } from '@angular/core';

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
  constructor(private bhakiService: HostService) { 
    this.getBranches();
  }
  getBranches() {
    this.bhakiService.getBranchesForDashBoard().subscribe({
      next: (res) => {
          this.Branch = res;
          console.log(res);
      },
      error: (err) => {
      console.log(err);
      },
    }
    );
  }

  ngOnInit() {
  }
  search() {
    console.log('searching')
    this.showResults = true
  }
}

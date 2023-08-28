import * as Chartist from 'chartist';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { HostService } from 'app/service/bhaki-service';
import { NotificationService } from 'app/service/notificationService';

const form = new FormGroup({
  name: new FormControl({ value: '', disabled: false }, [Validators.required]),
  description: new FormControl({ value: '', disabled: false }, [Validators.required]),

});
@Component({
  selector: 'app-branch-edit',
  templateUrl: './branches-edit.component.html',
  styleUrls: ['./branches-edit.component.css']
})
export class BranchesEditComponent implements OnInit {
  showResults:boolean = false
  name= '';
  description = '';
  price = '';
Branch: any = [];
selectedBranch : any;
hideSpinner = true;
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
public fields = {
  name: 'name',
  description: 'description'

};
  constructor(private bhakiService: HostService, private notify: NotificationService) { 
    this.getBranches();
  }
  public branchForm = form;
  getBranches() {
    this.showSpinner.next(true);
    this.bhakiService.getBranches().subscribe({
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
  Save() {
     if(!this.branchForm.valid) {return;}
     const branch = {
      name: this.branchForm.value.name,
      description:  this.branchForm.value.description,
      price : 0
     }
     this.showSpinner.next(true);
     this.bhakiService.addBranch( branch).subscribe({
      next: (res) => {
        this.showSpinner.next(false);
        this.notify.showNotification('bottom','center', 'Branch has been successfully added' , 'success');
        window.location.reload();
        
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

  validateBranchSelection(branch: any) {
    this.selectedBranch = branch;
    this.name= branch.name;
    this.description= branch.description;
    this.price = branch.price;
  }
  search() {
    console.log('searching')
    this.showResults = true
  }

  Update() {
    if(this.name === '' || this.description === '') {
      this.notify.showNotification('bottom','center', 'Please check your details' , 'danger');
    }  else {
      if(this.branchForm.value.name != '' && this.branchForm.value.name != null && this.branchForm.value.name != undefined ) {
        this.selectedBranch.name = this.branchForm.value.name;
      } else {
        this.selectedBranch.name = this.name;
      }
      if(this.branchForm.value.description  != '' && this.branchForm.value.description != null && this.branchForm.value.description != undefined ) {
        this.selectedBranch.description = this.branchForm.value.description;
      } else {
        this.selectedBranch.description = this.description;
      }
      this.showSpinner.next(true);
      this.bhakiService.updateBranch( this.selectedBranch).subscribe({
        next: (res) => {
          this.showSpinner.next(false);
          this.notify.showNotification('bottom','center', 'Branch has been successfully updated' , 'success');
          window.location.reload();
          
        },
        error: (err) => {
          this.showSpinner.next(false);
        console.log(err);
        },
      }
      );
    }
    
  }
}

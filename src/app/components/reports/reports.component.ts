import * as uuid from 'uuid';

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { HostService } from 'app/service/bhaki-service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../login/services/token-storage.service';

declare var $: any;


const form = new FormGroup({
  startDate: new FormControl({ value: '', disabled: false }, [Validators.required]),
  endDate: new FormControl({ value: '', disabled: false }, [Validators.required]),
  branch: new FormControl({ value: '', disabled: false }, [Validators.required]),
  dateRange: new FormControl({ value: '', disabled: false }),

});

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator: MatPaginator;
  dataSource :MatTableDataSource<any>;
  displayedColumns: string[] = ['registrationNo', 'studentName', 'registrationDate', 'registeredBy', 'courseName', 'branchName'];
  

  Branch: any = [];
  selectedBranch: any;
  enableFilters = true;
  enableDate = false;
  dateRangeChecked = false;
  userInfo: any;
  results : any;
  public fields = {
    startDate: 'startDate',
    endDate: 'endDate',
    branch: 'branch',
    dateRange : 'dateRange'

  };
  constructor(private bhakiService: HostService, private tokenService: TokenStorageService,private router: Router) {
    this.getBranches();
    this.userInfo = this.tokenService.getUser();
    this.reportsForm.disable();
    this.enableFilters = false;
   // this.fileInput.nativeElement.value = null;
   }
   public reportsForm = form;
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
   }
  getBranches() {
    this.bhakiService.getBranches().subscribe({
      next: (res) => {
          this.Branch = res;
      },
      error: (err) => {
      console.log(err);
      },
    }
    );
  }
  selection(id: any) {
    this.router.navigate(['view-registration', id.registrationNumber]);
  }
  enableDateRange(enable: boolean) {
    if(!enable) {
        this.reportsForm.controls['startDate'].disable();
        this.reportsForm.controls['endDate'].disable();
        this.enableDate = false;
      }
    else {
      this.reportsForm.controls['startDate'].enable();
      this.reportsForm.controls['endDate'].enable();
      this.enableDate = true;
    }
  }
  dateRangeChange(value : any) {
    this.enableDateRange(value);
  }

  filterChange(value : any) {
    if(value) {
      this.enableFilters = false;
      this.reportsForm.disable();
      this.dateRangeChecked = true;
    }
  else {
    this.enableFilters = true;
    this.reportsForm.enable();
    this.enableDateRange(false);
    this.dateRangeChecked = false;
  }
    console.log(value);
  }
  getBranchRegistrations(branchId) {
    this.bhakiService.getAllRegistrationsByBranch(branchId).subscribe({
      next: (res) => {
          this.Branch = res;
      },
      error: (err) => {
        console.log(err);
      },
    }
    );
  } 

  Search() {
    this.results = [];
    if(this.enableFilters) { 
      if(this.enableDate) {
        if(!this.reportsForm.valid)
        {
          return;
        } else {
          this.bhakiService.getBranchRegistrationsByRangeAndBranch( this.reportsForm.value.startDate, this.reportsForm.value.endDate,  this.selectedBranch.id).subscribe({
            next: (res) => {
              this.results = res;
              if(res) {
                this.dataSource = new MatTableDataSource(res); 
                this.dataSource.paginator = this.paginator;
              }
            },
            error: (err) => {
              console.log(err);
            },
          }
          );
        }
      } else {
        if(this.reportsForm.controls['branch'].valid) {
          this.bhakiService.getAllRegistrationsByBranch(this.selectedBranch.id).subscribe({
            next: (res) => {
              this.results = res;
              if(res) {
                this.dataSource = new MatTableDataSource(res); 
                this.dataSource.paginator = this.paginator;
              }
            },
            error: (err) => {
              console.log(err);
            },
          }
          );
        } else {
          return;
        }
      }
    }else {
      this.getAllRegistration();
    }
  
   
  }

  getAllRegistration() {
    this.bhakiService.getAllRegistrations().subscribe({
      next: (res) => {
          this.results = res;
          if(res) {
            this.dataSource = new MatTableDataSource(res); 
            this.dataSource.paginator = this.paginator;
          }
      },
      error: () => {
        //this.store.dispatch(esimActions.setLoading({ loading: false }));
       // this.router.navigate(['activate-fallout']);
      },
    }
    );
  }

  validateBranchSelection(branch: any) {

    this.selectedBranch = branch;

  }
 
  showNotification(from, align, message, colorType){
    const type = ['','info','success','warning','danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: message

    },{
        type: colorType,
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}
}

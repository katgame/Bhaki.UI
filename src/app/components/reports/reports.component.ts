import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { BehaviorSubject } from "rxjs";
import { HostService } from "app/service/bhaki-service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Registration } from "app/service/models/Registration";
import { Router } from "@angular/router";

const form = new FormGroup({
  startDate: new FormControl({ value: "", disabled: false }, [
    Validators.required,
  ]),
  endDate: new FormControl({ value: "", disabled: false }, [
    Validators.required,
  ]),
  branch: new FormControl({ value: "", disabled: false }, [
    Validators.required,
  ]),
  dateRange: new FormControl({ value: "", disabled: false }),
  idNumber: new FormControl({ value: "", disabled: false }),
});

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}
@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"],
})
export class ReportsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    "registrationNo",
    "studentName",
    "registrationDate",
    "createdDate",
    "registeredBy",
    "courseName",
    "branchName",
    "idNumber"
  ];
  //displayedColumns = ['id', 'name', 'progress', 'color'];

  Branch: any = [];
  selectedBranch: any;
  enableFilters = true;
  enableDate = false;
  dateRangeChecked = false;
  userInfo: any;
  results: any;
  allBaranchChecked = true;
  hideSpinner = true;
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public fields = {
    startDate: "startDate",
    endDate: "endDate",
    branch: "branch",
    dateRange: "dateRange",
    idNumber : "idNumber"
  };
  dataSource: MatTableDataSource<Registration>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bhakiService: HostService, private router: Router) {
    this.getBranches();
    this.reportsForm.disable();
    this.reportsForm.controls["idNumber"].enable();
    this.enableFilters = false;

    // this.dataSource = new MatTableDataSource(users);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  public reportsForm = form;
  ngOnInit() {
    this.showSpinner.subscribe((res) => {
      this.hideSpinner = res;
    });

   
  //  this.getAllRegistration();
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  getBranches() {
    this.showSpinner.next(true);
    this.bhakiService.getBranches().subscribe({
      next: (res) => {
        this.Branch = res;
        this.showSpinner.next(false);
      },
      error: (err) => {
        console.log(err);
        this.showSpinner.next(false);
      },
    });
  }
  selection(id: any) {
    this.router.navigate(["view-registration", id.registrationNumber]);
  }
  enableDateRange(enable: boolean) {
    if (!enable) {
      this.reportsForm.controls["startDate"].disable();
      this.reportsForm.controls["endDate"].disable();
      this.enableDate = false;
    } else {
      this.reportsForm.controls["startDate"].enable();
      this.reportsForm.controls["endDate"].enable();
      this.enableDate = true;
    }
  }
  dateRangeChange(value: any) {
    this.enableDateRange(value);
  }

  filterChange(value: any) {
    if (value) {
      this.enableFilters = false;
      this.reportsForm.disable();
      this.dateRangeChecked = true;
    } else {
      this.enableFilters = true;
      this.reportsForm.enable();
      this.enableDateRange(false);
      this.dateRangeChecked = false;
    }
  }
  getBranchRegistrations(branchId) {
    this.showSpinner.next(true);
    this.bhakiService.getAllRegistrationsByBranch(branchId).subscribe({
      next: (res) => {
        this.Branch = res;
        this.showSpinner.next(false);
      },
      error: (err) => {
        console.log(err);
        this.showSpinner.next(false);
      },
    });
  }

  Search() {
    this.showSpinner.next(true);
    if (this.enableFilters) {
      this.allBaranchChecked = false;
      if (this.enableDate) {
        if (!this.reportsForm.valid) {
          return;
        } else {
          
          this.bhakiService
            .getBranchRegistrationsByRangeAndBranch(
              this.reportsForm.value.startDate,
              this.reportsForm.value.endDate,
              this.selectedBranch.id
            )
            .subscribe({
              next: (res) => {
                this.showSpinner.next(false);

                if (res) {
                  this.updateData(res);
                }
              },
              error: (err) => {
                this.showSpinner.next(false);
                console.log(err);
              },
            });
        }
      } else {
        if (this.reportsForm.controls["branch"].valid) {
          this.bhakiService
            .getAllRegistrationsByBranch(this.selectedBranch.id)
            .subscribe({
              next: (res) => {
                this.showSpinner.next(false);

                if (res) {
                  this.updateData(res);
                }
              },
              error: (err) => {
                this.showSpinner.next(false);
                console.log(err);
              },
            });
        } else {
          return;
        }
      }
    } else {
      this.allBaranchChecked = true;
      this.getAllRegistration();
    }
  }
  updateData(data) {
    this.results = data;
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: Registration, filter: string) => data.student.idNumber.indexOf(filter) != -1;
    
  }

  getAllRegistration() {
   // this.showSpinner.next(true);
    this.bhakiService.getAllRegistrations().subscribe({
      next: (res) => {
       this.showSpinner.next(false);

        if (res) {
          this.updateData(res);
        }
      },
      error: (err) => {
        this.showSpinner.next(false);
        console.log(err);
        //this.notify.showNotification()
      },
    });
  }

  getAllRegistrationIdNumber() {
    // this.showSpinner.next(true);
     const id = this.reportsForm.value.idNumber;
     this.bhakiService.getAllRegistrationsByIDNumber(id).subscribe({
       next: (res) => {
        this.showSpinner.next(false);
 
         if (res) {
           this.updateData(res);
         }
       },
       error: (err) => {
         this.showSpinner.next(false);
         console.log(err);
         //this.notify.showNotification()
       },
     });
   }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  validateBranchSelection(branch: any) {
    this.selectedBranch = branch;
  }
}

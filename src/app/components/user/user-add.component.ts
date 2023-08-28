import * as uuid from 'uuid';

import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HostService } from 'app/service/bhaki-service';
import { SpinnerOverlayService } from '../spinner/spinner-overlay.service';
import { TokenStorageService } from '../login/services/token-storage.service';

declare var $: any;


const form = new FormGroup({
  userName: new FormControl({ value: '', disabled: false }, [Validators.required]),
  email: new FormControl({ value: '', disabled: false }, [Validators.required]),
  password: new FormControl({ value: '', disabled: false }, [Validators.required]),
  confirmPassword: new FormControl({ value: '', disabled: false }, [Validators.required]),
  role: new FormControl({ value: '', disabled: false }),
  branch: new FormControl({ value: '', disabled: false }),

});

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  Branch: any = [];
  Role: any = [];
  selectedBranch: any;
  selectedRole: any;
  userInfo: any;
  results : any;
  public fields = {
    password: 'password',
    confirmPassword: 'confirmPassword',
    userName: 'userName',
    email: 'email',
    role: 'role',
    branch : 'branch'

  };
  private subscription: Subscription;  
  hideSpinner = true;
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private bhakiService: HostService, private spinner:SpinnerOverlayService, private tokenService: TokenStorageService) {

    this.getBranches();
    this.getAllUsers();
    this.getRoles();
    this.userInfo = this.tokenService.getUser();
   }
   public userForm = form;
  ngOnInit() {
    this.showSpinner.subscribe((res) => {
      this.hideSpinner = res;
    });
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
    }
    );
  }

  getRoles() {
    this.showSpinner.next(true);
    this.bhakiService.getUserRoles().subscribe({
      next: (res) => {
          this.Role = res;
          this.showSpinner.next(false);
      },
      error: (err) => {
      console.log(err);
      this.showSpinner.next(false);
      },
    }
    );
  }

 getAllUsers() {
  this.showSpinner.next(true);
  this.bhakiService.getAllUsers().subscribe({
    next: (res) => {
      this.showSpinner.next(false);
      this.results = res;
    },
    error: (err) => {
      this.showSpinner.next(false);
      console.log(err);
    },
  }
  );
 }

  SaveUser() {
   if(!this.userForm.valid) { return ;}
   if(this.userForm.value.password !== this.userForm.value.confirmPassword) {
    this.showNotification('bottom','center', 'Passwords dont match' , 'danger');
    return;
   }
    const user = {
    "userName": this.userForm.value.userName,
    "email": this.userForm.value.email,
    "password": this.userForm.value.password,
    "role": this.selectedRole.name,
    "branchId": this.selectedBranch.id
    }
    this.showSpinner.next(true);
      this.bhakiService.registerUser(user).subscribe({
            next: (res) => {
              this.showSpinner.next(false);
              this.showNotification('bottom','center', 'User succesfully added' , 'success');
              this.getAllUsers();
            } ,
            error: (err) => {
              this.showSpinner.next(false);
              console.log(err);
            }, 
          }
          );
      
  }

  DeleteUser(user: any) {
    this.showSpinner.next(true);
    this.bhakiService.deleteUser(user).subscribe({
      next: (res) => {
        this.getAllUsers();
        this.showNotification('bottom','center', 'User succesfully deleted' , 'success');
        this.showSpinner.next(false);
      },
      error: (err) => {
        console.log(err);
        this.showNotification('bottom','center', 'User could not be deleted' , 'danger');
        this.showSpinner.next(false);
      },
    }
    );
  }
  EnableUser(user: any) {
    this.showSpinner.next(true);
    this.bhakiService.enableUser(user).subscribe({
      next: (res) => {
        this.getAllUsers();
        this.showNotification('bottom','center', 'User succesfully enabled' , 'success');
        this.showSpinner.next(false);
      },
      error: (err) => {
        console.log(err);
        this.showNotification('bottom','center', 'User could not be enabled' , 'danger');
        this.showSpinner.next(false);
      },
    }
    );
  }
  validateBranchSelection(branch: any) {

    this.selectedBranch = branch;

  }
  validateRole(role: any) {
    this.selectedRole = role;
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

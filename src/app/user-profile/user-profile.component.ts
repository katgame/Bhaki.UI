import * as uuid from 'uuid';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HostService } from 'app/service/bhaki-service';
import { TokenStorageService } from './../components/login/services/token-storage.service';

declare var $: any;


const IdExpress =
  /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/;
const form = new FormGroup({
  idNumber: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(IdExpress), Validators.min(13), Validators.maxLength(13)]),
  cellphone: new FormControl({ value: '', disabled: false }, [Validators.required]),
  firstName: new FormControl({ value: '', disabled: false }, [Validators.required]),
  lastName: new FormControl({ value: '', disabled: false }, [Validators.required]),
  email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
  course: new FormControl({ value: '', disabled: false }, [Validators.required]),
  amountPaid: new FormControl({ value: '', disabled: false }, [Validators.required]),
  outstandingAmount: new FormControl({ value: '', disabled: true }, [Validators.required]),
  streetAddress: new FormControl({ value: '', disabled: false }, [Validators.required]),
  line1: new FormControl({ value: '', disabled: false }, [Validators.required]),
  line2: new FormControl({ value: '', disabled: false }, [Validators.required]),
  city: new FormControl({ value: '', disabled: false }, [Validators.required]),
  postalCode: new FormControl({ value: '', disabled: false }, [Validators.required]),
  idDocument: new FormControl({ value: '', disabled: false }, [Validators.required]),
  branch: new FormControl({ value: '', disabled: false }, [Validators.required]),

});

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  private base64textString:String="";
  documentFile: any;
  Course: any = [];
  Branch: any = [];
  selectedBranch: any;
  outstandingAmount: any;
  userInfo: any;
  public fields = {
    idNumber: 'idNumber',
    cellphone: 'cellphone',
    postalCode: 'postalCode',
    city: 'city',
    line2: 'line2',
    line1: 'line1',
    streetAddress: 'streetAddress',
    outstandingAmount: 'outstandingAmount',
    amountPaid: 'amountPaid',
    email: 'email',
    lastName: 'lastName',
    firstName: 'firstName',
    course: 'course',
    idDocument: 'idDocument',
    branch : 'branch',

  };
  constructor(private bhakiService: HostService, private tokenService: TokenStorageService) {
    this.getBranches();
    this.getCourses();
    this.userInfo = this.tokenService.getUser();
   // this.fileInput.nativeElement.value = null;
   }
  public registrationForm = form;
  ngOnInit() {
  }
  createRegistration() {

    if(!this.registrationForm.valid) {  this.showNotification('bottom','center', 'Please complete all information', 'danger' );
    return;}
    const courseId = this.Course.filter(x => x.name === this.registrationForm.value.course)[0].id;
    const request = {
      branchId:  this.selectedBranch.id,
      courseId:  courseId,
      name :	this.registrationForm.value.firstName,
      surname	:	this.registrationForm.value.lastName,
      idNumber	:	this.registrationForm.value.idNumber,
      idDocument	:	this.documentFile,
      emailAddress	:	this.registrationForm.value.email,
      cellphone	:	this.registrationForm.value.cellphone,
      courseName	:	this.registrationForm.value.course,
      amountPaid	:	this.registrationForm.value.amountPaid,
      balance	:	this.outstandingAmount,
      createdBy: this.userInfo.id,
      address :	{
        id	:	uuid.v4(),
        streetName	:	this.registrationForm.value.streetAddress,
        line1	:	this.registrationForm.value.line1,
        line2	:	this.registrationForm.value.line2,
        city	:	this.registrationForm.value.city,
        postalCode :	this.registrationForm.value.postalCode,
      }
      }

    this.bhakiService.createRegitration(request).subscribe({
      next: (res) => {
        this.showNotification('bottom','center', 'Your registration was successful </b> registration number :' + res , 'success');
      },
      error: () => {
        //this.store.dispatch(esimActions.setLoading({ loading: false }));
       // this.router.navigate(['activate-fallout']);
      },
    }
    );
  }

  getBranches() {
    this.bhakiService.getBranches().subscribe({
      next: (res) => {
          this.Branch = res;
      },
      error: () => {
        //this.store.dispatch(esimActions.setLoading({ loading: false }));
       // this.router.navigate(['activate-fallout']);
      },
    }
    );
  }

  getOustandingAmount() {
    const amountPaid = this.registrationForm.value.amountPaid;
    const coursePrice = this.Course.filter(x => x.name === this.registrationForm.value.course)[0].price;
    this.outstandingAmount = Number(coursePrice) - Number(amountPaid);
  } 

  getCourses() {
    this.bhakiService.getCourses().subscribe({
      next: (res) => {
          this.Course = res;
      },
      error: () => {
        //this.store.dispatch(esimActions.setLoading({ loading: false }));
       // this.router.navigate(['activate-fallout']);
      },
    }
    );
  }

  validateBranchSelection(branch: any) {
    if (this.registrationForm.get('branch')?.value) {
      this.selectedBranch = branch;
      if(branch.id !== this.userInfo.branchId) {
        this.showNotification('bottom','center', 'Please note: The branch selected is not the branch you are registered to.' , 'warning');
      }
    }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
           this.base64textString= btoa(binaryString);
           this.documentFile = btoa(binaryString);
           console.log(btoa(binaryString));
   }
  
  onFileSelect(event: any) {
    var files = event.target.files;
    var file = files[0];
  
  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
  }
  uploadImage(componentId, image) {
    const formData: FormData = new FormData();
    formData.append('Image', image, image.name);
    formData.append('ComponentId', componentId);
 //   return this.http.post('/api/dashboard/UploadImage', formData);
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

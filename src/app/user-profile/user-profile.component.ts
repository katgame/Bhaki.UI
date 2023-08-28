import * as uuid from "uuid";

import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { BehaviorSubject } from "rxjs";
import { HostService } from "app/service/bhaki-service";
import { NotificationService } from "app/service/notificationService";
import { SpinnerOverlayService } from "./../components/spinner/spinner-overlay.service";
import { TokenStorageService } from "./../components/login/services/token-storage.service";

declare var $: any;

const IdExpress =
  /^(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/;
const form = new FormGroup({
  idNumber: new FormControl({ value: "", disabled: false }, [
    Validators.required,
    Validators.pattern(IdExpress),
    Validators.min(13),
    Validators.maxLength(13),
  ]),
  cellphone: new FormControl({ value: "", disabled: false }, [
    Validators.required,
  ]),
  firstName: new FormControl({ value: "", disabled: false }, [
    Validators.required,
  ]),
  lastName: new FormControl({ value: "", disabled: false }, [
    Validators.required,
  ]),
  email: new FormControl("", [
    Validators.required,
    Validators.email,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
  ]),
  course: new FormControl({ value: "", disabled: false }, [
    Validators.required,
  ]),
  amountPaid: new FormControl({ value: "", disabled: false }, [
    Validators.required,
  ]),
  outstandingAmount: new FormControl({ value: "", disabled: true }, [
    Validators.required,
  ]),
  streetAddress: new FormControl({ value: "", disabled: false }, [
    Validators.required,
  ]),
  line1: new FormControl({ value: "", disabled: false }),
  line2: new FormControl({ value: "", disabled: false }),
  city: new FormControl({ value: "", disabled: false }, [Validators.required]),
  postalCode: new FormControl({ value: "", disabled: false }, [
    Validators.required,
  ]),
  idDocument: new FormControl({ value: "", disabled: false }),

});

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  @ViewChild("fileInput") fileInput: ElementRef;
  loading = false;
  private base64textString: String = "";
  documentFile: any;
  Course: any = [];
  Branch: any = [];
  selectedBranch: any;
  outstandingAmount: any;
  userInfo: any;
  public fields = {
    idNumber: "idNumber",
    cellphone: "cellphone",
    postalCode: "postalCode",
    city: "city",
    line2: "line2",
    line1: "line1",
    streetAddress: "streetAddress",
    outstandingAmount: "outstandingAmount",
    amountPaid: "amountPaid",
    email: "email",
    lastName: "lastName",
    firstName: "firstName",
    course: "course",
    idDocument: "idDocument",
  };
  hideSpinner = true;
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private bhakiService: HostService,
    private notify: NotificationService,
    private tokenService: TokenStorageService,
    private spinner: SpinnerOverlayService
  ) {
   
    this.disableEditFields(false);
    this.userInfo = this.tokenService.getUser();
    this.getCourses(this.userInfo.branchId);
    this.loading = true;
  }
  public registrationForm = form;
  ngOnInit() {
    this.showSpinner.subscribe((res) => {
      this.hideSpinner = res;
    });
  }
  numbersValidation(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  }
  console(data) {
    console.log(data);
  }
  createRegistration() {

    try {
      if (!this.registrationForm.valid) {
        this.showNotification(
          "bottom",
          "center",
          "Please complete all information",
          "danger"
        );
        return;
      }
      const courseId = this.Course.filter(
        (x) => x.name === this.registrationForm.value.course
      )[0].id;
      const request = {
        branchId: this.userInfo.branchId,
        courseId: courseId,
        name: this.registrationForm.value.firstName,
        surname: this.registrationForm.value.lastName,
        idNumber: this.registrationForm.value.idNumber,
        idDocument: this.documentFile,
        emailAddress: this.registrationForm.value.email,
        cellphone: this.registrationForm.value.cellphone,
        courseName: this.registrationForm.value.course,
        amountPaid: this.registrationForm.value.amountPaid,
        balance: this.outstandingAmount,
        createdBy: this.userInfo.id,
        address: {
          id: uuid.v4(),
          streetName: this.registrationForm.value.streetAddress,
          line1: this.registrationForm.value.line1,
          line2: this.registrationForm.value.line2,
          city: this.registrationForm.value.city,
          postalCode: this.registrationForm.value.postalCode,
        },
      };
      this.showSpinner.next(true);
      this.bhakiService.createRegitration(request).subscribe({
        next: (res) => {
          this.showSpinner.next(false);
          this.registrationForm.reset();
          this.showNotification(
            "bottom",
            "center",
            "Your registration was successful </b> registration number :" + res,
            "success"
          );
        },
        error: () => {
          this.showSpinner.next(false);
        },
      });
    } catch (err) {
      this.showSpinner.next(false);
      this.showNotification(
        "bottom",
        "center",
        "Please complete all information",
        "danger"
      );
      window.location.reload();
    }
  }


  disableEditFields(enable: boolean) {
    if (!enable) {
      this.registrationForm.controls["firstName"].disable();
      this.registrationForm.controls["lastName"].disable();
      this.registrationForm.controls["idNumber"].disable();
      this.registrationForm.controls["email"].disable();
      this.registrationForm.controls["cellphone"].disable();

      this.registrationForm.controls["course"].disable();
      this.registrationForm.controls["amountPaid"].disable();
      this.registrationForm.controls["streetAddress"].disable();
      this.registrationForm.controls["city"].disable();

      this.registrationForm.controls["line1"].disable();
      this.registrationForm.controls["line2"].disable();
      this.registrationForm.controls["postalCode"].disable();
      this.registrationForm.controls["idDocument"].disable();
    } else {
      this.registrationForm.controls["firstName"].enable();
      this.registrationForm.controls["lastName"].enable();
      this.registrationForm.controls["idNumber"].enable();
      this.registrationForm.controls["email"].enable();
      this.registrationForm.controls["cellphone"].enable();

      this.registrationForm.controls["course"].enable();
      this.registrationForm.controls["amountPaid"].enable();
      this.registrationForm.controls["streetAddress"].enable();
      this.registrationForm.controls["city"].enable();

      this.registrationForm.controls["line1"].enable();
      this.registrationForm.controls["line2"].enable();
      this.registrationForm.controls["postalCode"].enable();
      this.registrationForm.controls["idDocument"].enable();
    }
  }
  getOustandingAmount() {
   
    const amountPaid = this.registrationForm.value.amountPaid;
    const coursePrice = this.Course.filter(
      (x) => x.name === this.registrationForm.value.course
    )[0].price;
    if(this.registrationForm.value.amountPaid > coursePrice) {
      this.registrationForm.controls["amountPaid"].setValue('');
      this.outstandingAmount = 0;
      this.notify.showNotification(
        "bottom",
        "center",
        "Amount Paid can not be greater than the course price",
        "danger"
      );
    } else {
      this.outstandingAmount = Number(coursePrice) - Number(amountPaid);
    }
   
  }
  textValidation(event: any): boolean {
    const charCode = event.keyCode;
    return (
      (charCode > 64 && charCode < 91) ||
      (charCode > 96 && charCode < 123) ||
      charCode == 8
    );
  }
  getCourses(branchId) {
    this.showSpinner.next(true);
    this.bhakiService.getCourses(branchId).subscribe({
      next: (res) => {
        this.showSpinner.next(false);
        if (res.length > 0) {
          this.Course = res;
          this.disableEditFields(true);
        } else {
          this.notify.showNotification(
            "bottom",
            "center",
            "No courses available, Please contact your admin to load courses for your branch",
            "danger"
          );
        }
      },
      error: () => {
        this.showSpinner.next(false);
        this.notify.showNotification(
          "bottom",
          "center",
          "No Course available for this branch",
          "danger"
        );
      },
    });
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.documentFile = btoa(binaryString);
  }

  onFileSelect(event: any) {
    var files = event.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }
  uploadImage(componentId, image) {
    const formData: FormData = new FormData();
    formData.append("Image", image, image.name);
    formData.append("ComponentId", componentId);
    //   return this.http.post('/api/dashboard/UploadImage', formData);
  }
  showNotification(from, align, message, colorType) {
    const type = ["", "info", "success", "warning", "danger"];

    const color = Math.floor(Math.random() * 4 + 1);

    $.notify(
      {
        icon: "notifications",
        message: message,
      },
      {
        type: colorType,
        timer: 4000,
        placement: {
          from: from,
          align: align,
        },
        template:
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          "</div>" +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          "</div>",
      }
    );
  }
}

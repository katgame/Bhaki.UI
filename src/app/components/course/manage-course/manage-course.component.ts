import * as Chartist from "chartist";

import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { BehaviorSubject } from "rxjs";
import { HostService } from "app/service/bhaki-service";
import { NotificationService } from "app/service/notificationService";
import { TokenStorageService } from "app/components/login/services/token-storage.service";

const Updateform = new FormGroup({
  name: new FormControl({ value: "", disabled: false }, [Validators.required]),
  description: new FormControl({ value: "", disabled: false }, [
    Validators.required,
  ]),
  courseDuration: new FormControl({ value: "", disabled: false }, [
    Validators.required,
  ]),
  price: new FormControl({ value: "", disabled: false }, [Validators.required]),
  course: new FormControl({ value: "", disabled: false }, [
    Validators.required,
  ]),
});

const Saveform = new FormGroup({
  name: new FormControl({ value: "", disabled: false }, [Validators.required]),
  description: new FormControl({ value: "", disabled: false }, [
    Validators.required,
  ]),
  courseDuration: new FormControl({ value: "", disabled: false }, [
    Validators.required,
  ]),
  price: new FormControl({ value: "", disabled: false }, [Validators.required]),
});
@Component({
  selector: "app-manage-course",
  templateUrl: "./manage-course.component.html",
  styleUrls: ["./manage-course.component.css"],
})
export class ManageCourseComponent implements OnInit {
  showResults: boolean = false;
  name = "";
  description = "";
  courseDuration = "";
  price = "";
  Course: any = [];
  userInfo: any;
  selectedCourse: any;
  public fields = {
    name: "name",
    description: "description",
    courseDuration: "courseDuration",
    price: "price",
    course: "course",
  };
  hideSpinner = true;
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private bhakiService: HostService,
    private notify: NotificationService,
    private tokenService: TokenStorageService
  ) {
    this.disableEditFields(false);
    this.getBranches();
    this.userInfo = this.tokenService.getUser();
  }
  public courseUpdateForm = Updateform;
  public courseSaveForm = Saveform;
  selectedBranch: any;
  Branch: any = [];
  getCourse(branchId) {
    this.bhakiService.getCourses(branchId).subscribe({
      next: (res) => {
        if (res.length > 0) {
          this.Course = res;
          this.disableEditFields(true);
        } else {
          this.notify.showNotification(
            "bottom",
            "center",
            "No Course available for this branch",
            "warning"
          );
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {
    this.showSpinner.subscribe((res) => {
      this.hideSpinner = res;
    });
  }

  validateBranchSelection(branch: any) {
    this.courseUpdateForm.reset();
    this.disableEditFields(false);
    this.selectedBranch = branch;
    this.getCourse(this.selectedBranch.id);
  }
  getBranches() {
    this.showSpinner.next(true);
    this.bhakiService.getBranches().subscribe({
      next: (res) => {
        this.showSpinner.next(false);
        this.Branch = res;
      },
      error: (err) => {
        console.log(err);
        this.showSpinner.next(false);
      },
    });
  }

  Save() {
    if (!this.selectedBranch) {
      this.notify.showNotification(
        "bottom",
        "center",
        "Please select a branch from above",
        "danger"
      );
      return;
    }
    if (!this.courseSaveForm.valid) {
      return;
    }
    
    const course = {
      name: this.courseSaveForm.value.name,
      description: this.courseSaveForm.value.description,
      price: this.courseSaveForm.value.price,
      courseDuration: this.courseSaveForm.value.courseDuration,
      branchId: this.selectedBranch.id,
    };
    this.showSpinner.next(true);
    this.bhakiService.addCourse(course).subscribe({
      next: (res) => {
        this.showSpinner.next(false);
        this.notify.showNotification(
          "bottom",
          "center",
          "Course has been successfully added",
          "success"
        );
        window.location.reload();
      },
      error: (err) => {
        this.showSpinner.next(false);
        console.log(err);
      },
    });
  }

  disableEditFields(enable: boolean) {
    if (!enable) {
      this.courseUpdateForm.controls["name"].disable();
      this.courseUpdateForm.controls["course"].disable();
      this.courseUpdateForm.controls["description"].disable();
      this.courseUpdateForm.controls["courseDuration"].disable();
      this.courseUpdateForm.controls["price"].disable();
    } else {
      this.courseUpdateForm.controls["course"].enable();
      this.courseUpdateForm.controls["name"].enable();
      this.courseUpdateForm.controls["description"].enable();
      this.courseUpdateForm.controls["courseDuration"].enable();
      this.courseUpdateForm.controls["price"].enable();
    }
  }
  validateCourseSelection(course: any) {
    this.selectedCourse = course;
    this.name = course.name;
    this.description = course.description;
    this.courseDuration = course.courseDuration;
    this.price = course.price;
  }

  Update() {
    if (this.name === "" || this.description === "") {
      this.notify.showNotification(
        "bottom",
        "center",
        "Please check your details",
        "danger"
      );
    } else {
      if (
        this.courseUpdateForm.value.name != "" &&
        this.courseUpdateForm.value.name != null &&
        this.courseUpdateForm.value.name != undefined
      ) {
        this.selectedCourse.name = this.courseUpdateForm.value.name;
      } else {
        this.selectedCourse.name = this.name;
      }
      if (
        this.courseUpdateForm.value.description != "" &&
        this.courseUpdateForm.value.description != null &&
        this.courseUpdateForm.value.description != undefined
      ) {
        this.selectedCourse.description =
          this.courseUpdateForm.value.description;
      } else {
        this.selectedCourse.description = this.description;
      }
      if (
        this.courseUpdateForm.value.courseDuration != "" &&
        this.courseUpdateForm.value.courseDuration != null &&
        this.courseUpdateForm.value.courseDuration != undefined
      ) {
        this.selectedCourse.courseDuration =
          this.courseUpdateForm.value.courseDuration;
      } else {
        this.selectedCourse.courseDuration = this.courseDuration;
      }

      if (
        this.courseUpdateForm.value.price != "" &&
        this.courseUpdateForm.value.price != null &&
        this.courseUpdateForm.value.price != undefined
      ) {
        this.selectedCourse.price = this.courseUpdateForm.value.price;
      } else {
        this.selectedCourse.price = this.price;
      }
      this.showSpinner.next(true);
      this.bhakiService.updateCourses(this.selectedCourse).subscribe({
        next: (res) => {
          this.showSpinner.next(false);
          this.notify.showNotification(
            "bottom",
            "center",
            "Course has been successfully updated",
            "success"
          );
          window.location.reload();
        },
        error: (err) => {
          this.showSpinner.next(false);
          console.log(err);
        },
      });
    }
  }
}

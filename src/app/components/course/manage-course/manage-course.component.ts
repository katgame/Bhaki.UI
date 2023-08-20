import * as Chartist from 'chartist';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { HostService } from 'app/service/bhaki-service';
import { NotificationService } from 'app/service/notificationService';

const form = new FormGroup({
  name: new FormControl({ value: '', disabled: false }, [Validators.required]),
  description: new FormControl({ value: '', disabled: false }, [Validators.required]),
  courseDuration: new FormControl({ value: '', disabled: false }, [Validators.required]),
  additionalDescription: new FormControl({ value: '', disabled: false }, [Validators.required]),
  firearm: new FormControl({ value: '', disabled: false }, [Validators.required]),
  grade: new FormControl({ value: '', disabled: false }, [Validators.required]),
  price: new FormControl({ value: '', disabled: false }, [Validators.required]),

});
@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css']
})
export class ManageCourseComponent implements OnInit {
  showResults:boolean = false
  name= '';
  description = '';
  courseDuration = '';
  additionalDescription= '';
  firearm = '';
  grade = '';
  price = '';
Course: any = [];
selectedCourse : any;
public fields = {
  name: 'name',
  description: 'description',
  courseDuration : 'courseDuration',
  additionalDescription: 'additionalDescription',
  firearm : 'firearm',
  grade : 'grade',
  price : 'price'
};
  constructor(private bhakiService: HostService, private notify: NotificationService) { 
    this.getCourse();
  }
  public courseForm = form;
  getCourse() {
    this.bhakiService.getCourses().subscribe({
      next: (res) => {
          this.Course = res;
        
      },
      error: (err) => {
      console.log(err);
      },
    }
    );
  }
  Save() {
     if(!this.courseForm.valid) {return;}
     const course = {
      name: this.courseForm.value.name,
      description:  this.courseForm.value.description,
      price :  this.courseForm.value.price,
      courseDuration :  this.courseForm.value.courseDuration,
      additionalDescription :  this.courseForm.value.additionalDescription,
      firearm :  this.courseForm.value.firearm,
      grade :  this.courseForm.value.grade
     }
     this.bhakiService.addCourse(course).subscribe({
      next: (res) => {
        this.notify.showNotification('bottom','center', 'Course has been successfully added' , 'success');
        window.location.reload();
        
      },
      error: (err) => {
      console.log(err);
      },
    }
    );
  }
  ngOnInit() {
   
  }

  validateCourseSelection(course: any) {
    this.courseForm.clearValidators();
    this.selectedCourse = course;
     this.name= course.name;
     this.description= course.description;
     this.courseDuration = course.courseDuration;
     this.additionalDescription= course.additionalDescription;
     this.firearm= course.firearm;
     this.price = course.price;
     this.grade= course.grade;
  }
  search() {
    console.log('searching')
    this.showResults = true
  }

  Update() {
    if(this.name === '' || this.description === '') {
      this.notify.showNotification('bottom','center', 'Please check your details' , 'danger');
    }  else {
      if(this.courseForm.value.name != '') {
        this.selectedCourse.name = this.courseForm.value.name;
      } else {
        this.selectedCourse.name = this.name;
      }
      if(this.courseForm.value.description != '') {
        this.selectedCourse.description = this.courseForm.value.description;
      } else {
        this.selectedCourse.description = this.description;
      }
      if(this.courseForm.value.courseDuration != '') {
        this.selectedCourse.courseDuration = this.courseForm.value.courseDuration;
      } else {
        this.selectedCourse.courseDuration = this.courseDuration;
      }
      if(this.courseForm.value.additionalDescription != '') {
        this.selectedCourse.additionalDescription = this.courseForm.value.additionalDescription;
      } else {
        this.selectedCourse.additionalDescription = this.additionalDescription;
      }
      if(this.courseForm.value.firearm != '') {
        this.selectedCourse.firearm = this.courseForm.value.firearm;
      } else {
        this.selectedCourse.firearm = this.firearm;
      }
      if(this.courseForm.value.grade != '') {
        this.selectedCourse.grade = this.courseForm.value.grade;
      } else {
        this.selectedCourse.grade = this.grade;
      }
      if(this.courseForm.value.price != '') {
        this.selectedCourse.price = this.courseForm.value.price;
      } else {
        this.selectedCourse.price = this.price;
      }

      this.bhakiService.updateCourses( this.selectedCourse).subscribe({
        next: (res) => {
          this.notify.showNotification('bottom','center', 'Course has been successfully updated' , 'success');
          window.location.reload();
          
        },
        error: (err) => {
        console.log(err);
        },
      }
      );
    }
    
  }
}

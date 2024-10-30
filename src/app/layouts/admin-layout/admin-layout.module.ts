import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { AllBranchesComponent } from 'app/components/branches/branches-all/branches-all.component';
import { BranchesEditComponent } from 'app/components/branches/branches-edit/branches-edit.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { LoginFormComponent } from 'app/components/login/login-form.component';
import { ManageCourseComponent } from 'app/components/course/manage-course/manage-course.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { ReportsComponent } from 'app/components/reports/reports.component';
import { RouterModule } from '@angular/router';
import { SpinnerOverlayService } from './../../components/spinner/spinner-overlay.service';
import { UserAddComponent } from 'app/components/user/user-add.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ViewRegistrationComponent } from 'app/registration-find/registration-view.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [

    DashboardComponent,
    UserProfileComponent,
    ReportsComponent,
    LoginFormComponent,
    AllBranchesComponent,
    UserAddComponent,
    BranchesEditComponent,
    ManageCourseComponent,
    ViewRegistrationComponent
  ],
  providers: [SpinnerOverlayService]
})

export class AdminLayoutModule {} 

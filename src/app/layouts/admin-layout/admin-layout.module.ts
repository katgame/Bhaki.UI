import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { AllBranchesComponent } from 'app/components/branches/branches-all/branches-all.component';
import { BranchesEditComponent } from 'app/components/branches/branches-edit/branches-edit.component';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { IconsComponent } from '../../icons/icons.component';
import { LoginFormComponent } from 'app/components/login/login-form.component';
import { ManageCourseComponent } from 'app/components/course/manage-course/manage-course.component';
import { MapsComponent } from '../../maps/maps.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ReportsComponent } from 'app/components/reports/reports.component';
import { RouterModule } from '@angular/router';
import { SpinnerOverlayService } from './../../components/spinner/spinner-overlay.service';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UserAddComponent } from 'app/components/user/user-add.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

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
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    ReportsComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    LoginFormComponent,
    AllBranchesComponent,
    UserAddComponent,
    BranchesEditComponent,
    ManageCourseComponent
  ],
  providers: [SpinnerOverlayService]
})

export class AdminLayoutModule {} 

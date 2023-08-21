import { AllBranchesComponent } from 'app/components/branches/branches-all/branches-all.component';
import { AllRegistrationComponent } from 'app/registration-all/registration-all.component';
import { BranchesEditComponent } from 'app/components/branches/branches-edit/branches-edit.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { LoginFormComponent } from 'app/components/login/login-form.component';
import { ManageCourseComponent } from 'app/components/course/manage-course/manage-course.component';
import { ReportsComponent } from '../../components/reports/reports.component';
import { Routes } from '@angular/router';
import { UserAddComponent } from 'app/components/user/user-add.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ViewRegistrationComponent } from 'app/registration-find/registration-view.component';

export const AdminLayoutRoutes: Routes = [
 
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'reports',      component: ReportsComponent },
    { path: 'view-registration/:id',      component: ViewRegistrationComponent },
    { path: 'all-registrations',      component: AllRegistrationComponent },
    { path: 'registration',   component: UserProfileComponent },
    { path: 'login',  component: LoginFormComponent },
    { path: 'branches',       component: AllBranchesComponent },
    { path: 'add-user',       component: UserAddComponent },
    { path: 'edit-branch',       component: BranchesEditComponent },
    { path: 'manage-course',       component: ManageCourseComponent },
];

import { AllBranchesComponent } from 'app/components/branches/branches-all/branches-all.component';
import { AllRegistrationComponent } from 'app/registration-all/registration-all.component';
import { BranchesEditComponent } from 'app/components/branches/branches-edit/branches-edit.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { FindBranchComponent } from 'app/components/branches/branch-find/branch-find.component';
import { IconsComponent } from '../../icons/icons.component';
import { LoginFormComponent } from 'app/components/login/login-form.component';
import { ManageCourseComponent } from 'app/components/course/manage-course/manage-course.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ReportsComponent } from '../../components/reports/reports.component';
import { Routes } from '@angular/router';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UserAddComponent } from 'app/components/user/user-add.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ViewRegistrationComponent } from 'app/registration-find/registration-view.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: FindBranchComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'reports',      component: ReportsComponent },
    { path: 'view-registration/:id',      component: ViewRegistrationComponent },
    { path: 'all-registrations',      component: AllRegistrationComponent },
    { path: 'find-branch',      component: FindBranchComponent },
    { path: 'registration',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'login',  component: LoginFormComponent },
    { path: 'courses',        component: NotificationsComponent },
    { path: 'branches',       component: AllBranchesComponent },
    { path: 'add-user',       component: UserAddComponent },
    { path: 'edit-branch',       component: BranchesEditComponent },
    { path: 'manage-course',       component: ManageCourseComponent },
];

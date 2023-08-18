import { AddBranchComponent } from 'app/branch-add/branch-add.component';
import { AllRegistrationComponent } from 'app/registration-all/registration-all.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { FindBranchComponent } from 'app/branch-find/branch-find.component';
import { FindRegistrationComponent } from 'app/registration-find/registration-find.component';
import { IconsComponent } from '../../icons/icons.component';
import { LoginFormComponent } from 'app/components/login/login-form.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ReportsComponent } from '../../components/reports/reports.component';
import { Routes } from '@angular/router';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

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
    { path: 'find-registration',      component: FindRegistrationComponent },
    { path: 'all-registrations',      component: AllRegistrationComponent },
    { path: 'add-branch',      component: AddBranchComponent },
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
    { path: 'branches',       component: UpgradeComponent },
];

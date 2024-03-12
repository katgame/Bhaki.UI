import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './components/login/guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, } from '@angular/common';
import { LoginFormComponent } from './components/login/login-form.component';
import { NgModule } from '@angular/core';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [ AuthGuard ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
  }, {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [ AuthGuard ],
    children: [{
      path: '',
      loadChildren:  './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

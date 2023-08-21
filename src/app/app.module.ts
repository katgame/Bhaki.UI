import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthInterceptor } from './components/login/services/auth.intercepter';
import { AuthenticationService } from './components/login/services/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HostService } from './service/bhaki-service';
import { NgModule } from '@angular/core';
import { NotificationService } from './service/notificationService';
import { RouterModule } from '@angular/router';
import { SpinnerOverlayService } from './components/spinner/spinner-overlay.service';
import { TokenStorageService } from './components/login/services/token-storage.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    ReactiveFormsModule ,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,

  ],
  providers: [HostService,SpinnerOverlayService, NotificationService, AuthenticationService,TokenStorageService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

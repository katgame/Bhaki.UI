import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthInterceptor } from './components/login/services/auth.intercepter';
import { AuthenticationService } from './components/login/services/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HostService } from './service/bhaki-service';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NgModule } from '@angular/core';
import { NotificationService } from './service/notificationService';
import { NotificationsComponent } from './notifications/notifications.component';
import { RouterModule } from '@angular/router';
import { TokenStorageService } from './components/login/services/token-storage.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,

  ],
  providers: [HostService, NotificationService, AuthenticationService,TokenStorageService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

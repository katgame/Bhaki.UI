import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { TokenStorageService } from '../login/services/token-storage.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/registration', title: 'Registration',  icon:'person', class: '' },
     { path: '/reports', title: 'Reports',  icon:'content_paste', class: '' },
    { path: '/branches', title: 'Branches',  icon:'store', class: '' },
    { path: '/manage-course', title: 'Courses',  icon:'school', class: '' },
    { path: '/add-user', title: 'Users',  icon:'person', class: '' },

    // { path: '/table-lists', title: 'Reports',  icon:'content_paste', class: '' },
    
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    //  { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  userInfo: any;
  constructor(private tokenService: TokenStorageService, private route: Router) {
    this.userInfo = this.tokenService.getUser();
   }

  ngOnInit() {
    this.menuItems = [];
   console.log(this.userInfo.role);
   if(this.userInfo.role.includes('Admin') === true) {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
   } else {
    ROUTES.forEach(route => {
        console.log(route);
        if(route.title === 'Registration') {
          this.menuItems.push(route);
          this.route.navigate([route.path]);
        }
      });
   }
   
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}

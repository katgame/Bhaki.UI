import * as Chartist from 'chartist';

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { BehaviorSubject } from 'rxjs';
import { HostService } from 'app/service/bhaki-service';
import { NotificationService } from './../service/notificationService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit  {
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;

  Branch: any = [];
  Dashboard: any = [];
  results : any;
  displayedColumns: string[] = ['registrationNo', 'studentName', 'registrationDate', 'registeredBy', 'courseName', 'branchName'];
  hideSpinner = true;
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  dataSource :MatTableDataSource<any>;
  constructor(private bhakiService: HostService,private router: Router, private notify: NotificationService) { 
    this.getBranches();
    this.getDashboard();
    this.getAllRegistration();
  }

  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
  }
  getAllRegistration() {
    this.showSpinner.next(true);
    this.bhakiService.getAllRegistrations().subscribe({
      
      next: (res) => {
        this.showSpinner.next(false);
          this.results = res;
          if(res) {
          
            this.dataSource = new MatTableDataSource(res); 
            this.dataSource.paginator = this.paginator;
          }
      },
      error: () => {
        this.showSpinner.next(false);
      
          //this.notify.showNotification()
      },
    }
    );
  }

  selection(id: any) {
    this.router.navigate(['view-registration', id.registrationNumber]);
  }
  regitrationPresent(value: any) : boolean{
    if(value === null) { return false;}  else {return true;}
   

  }
  getBranches() {
    this.showSpinner.next(true);
    this.bhakiService.getBranchesForDashBoard().subscribe({
      next: (res) => {
          this.Branch = res;
          this.showSpinner.next(false);
       
      },
      error: (err) => {
        this.showSpinner.next(false);
      
      },
    }
    );
  }

  getDashboard() {
    this.showSpinner.next(true);
    this.bhakiService.getDashBoard().subscribe({
      next: (res) => {
          this.Dashboard = res;
          this.setLastWeekStats(res.lastWeekStats);
          this.seCureentWeekStats(res.currentWeekStats);
          this.showSpinner.next(false);
        
      },
      error: (err) => {
        this.showSpinner.next(false);
        
      },
    }
    );
  }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };

  setLastWeekStats(data) {
      /* ----------==========     Daily Registrations Chart initialization For Documentation    ==========---------- */

      const dataDailyRegistrationChart: any = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
          data
        ]
    };

   const optionsDailyRegistrationChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    }

    var dailyRegistrationChart = new Chartist.Line('#dailyRegistrationChart', dataDailyRegistrationChart, optionsDailyRegistrationChart);

    this.startAnimationForLineChart(dailyRegistrationChart);

  }

  seCureentWeekStats(data) {
    /* ----------==========     Daily Registrations Chart initialization For Documentation    ==========---------- */

    const dataDailyRegistrationChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        data
      ]
  };

 const optionsDailyRegistrationChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
  }

  var dailyRegistrationChart = new Chartist.Line('#currentRegistrationChart', dataDailyRegistrationChart, optionsDailyRegistrationChart);

  this.startAnimationForLineChart(dailyRegistrationChart);

}
  ngOnInit() {
    this.showSpinner.subscribe((res) => {

      this.hideSpinner = res;
}
);
      /* ----------==========     Monthly registrations Chart initialization    ==========---------- */

      var dataMonthlyRegistrationChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionsMonthlyRegistrationChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var MonthlyRegistrationChart = new Chartist.Bar('#MonthlyRegistrationChart', dataMonthlyRegistrationChart, optionsMonthlyRegistrationChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(MonthlyRegistrationChart);
  }

}

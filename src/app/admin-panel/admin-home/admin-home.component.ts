import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { AddService } from 'src/app/add.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent {
  constructor(private addService: AddService) { }
  chart: any = [];
  Label: string[] = ['Ready for service', 'Service in progress', 'Ready for delivery', 'Delivered'];
  // monthLabel: string[] = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  dayData: number[] = [];
  // filterValue: string = '';
  readyForService: number = 0;
  pendingService: number = 0;
  readyForDelivery: number = 0;
  completedService: number = 0;
  data: any = [];
  filteredData:any=[];
  
  ngOnInit() {
    this.addService.getVehicleService().subscribe((res: any) => {
      this.data = res;
      this.countByStatus();
      this.generateChart();
    });
  }

  countByStatus() {
    this.readyForService = this.data.filter((x: any) => x.status === 'Ready for service').length;
    console.log('Number of required:', this.readyForService);
    this.pendingService = this.data.filter((x: any) => x.status === 'Service in progress').length;
    console.log('Number of required:', this.pendingService);
    this.readyForDelivery = this.data.filter((x: any) => x.status === 'Ready for delivery').length;
    console.log('Number of required:', this.readyForDelivery);
    this.completedService = this.data.length;
    console.log('Number of required:', this.completedService);
    this.dayData=[this.readyForService,this.pendingService,this.readyForDelivery];
  }
  generateChart() {
    this.chart = document.getElementById('myChart');
    new Chart(this.chart, {
      type: 'bar',
      data: {
        // labels: ['Jan','Feb','Mar','April','May','June','July','Aug','Sep','Oct','Nov','Dec'],
        labels: this.Label,
        datasets: [{
          label: '# of services',
          data: this.dayData,
          // data: ['10','20','30','40','50'],
          backgroundColor: 'brown',
          borderColor: 'black',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  updateChart() {
    // alert(this.filterValue);
    // console.log('filter value', this.filterValue)
    // if (this.filterValue === 'Month') {
    //   this.Label = this.monthLabel;
    //   console.log(this.Label);
    //   this.generateChart();
    // }
  }

  filterDataByToday() {
    const today = new Date().toISOString().split('T')[0];
    if(this.data.status==='Ready for service'){
      this.filteredData = this.data.filter((item: any) => item.appointment_date.split('T')[0] === today);
      this.readyForService = this.filteredData.filter((x: any) => x.status === 'Ready for service').length;
    }else if(this.data.status==='Service in progress'){
      this.filteredData = this.data.filter((item: any) => item.status_change_date.split('T')[0] === today);
      this.pendingService = this.filteredData.filter((x: any) => x.status === 'Service in progress').length;
    }else if(this.data.status==='Ready for delivery'){
      this.filteredData = this.data.filter((item: any) => item.status_change_date.split('T')[0] === today);
      this.pendingService = this.filteredData.filter((x: any) => x.status === 'Ready for delivery').length;
    }
  }

  filterDataByThisWeek() {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay())).toISOString().split('T')[0];
    const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6)).toISOString().split('T')[0];
    if(this.data.status==='Ready for service'){
      this.filteredData = this.data.filter((item: any) => item.appointment_date.split('T')[0] >=
      firstDayOfWeek && item.appointment_date.split('T')[0] <= lastDayOfWeek);
    this.readyForService = this.filteredData.filter((x: any) => x.status === 'Ready for service').length;
    }else if(this.data.status==='Service in progress'){
      this.filteredData = this.data.filter((item: any) => item.status_change_date.split('T')[0] >=
      firstDayOfWeek && item.appointment_date.split('T')[0] <= lastDayOfWeek);
    this.readyForService = this.filteredData.filter((x: any) => x.status === 'Service in progress').length;
    }else if(this.data.status==='Ready for delivery'){
      this.filteredData = this.data.filter((item: any) => item.status_change_date.split('T')[0]>=
      firstDayOfWeek && item.appointment_date.split('T')[0] <= lastDayOfWeek);
    this.readyForService = this.filteredData.filter((x: any) => x.status === 'Service in progress').length;
    }
  }

  filterDataByThisMonth() {
    this.filteredData = this.data.filter((item: any) => new Date(item.appointment_date).getMonth() === new Date().getMonth());
    this.readyForService = this.filteredData.filter((x: any) => x.status === 'Ready for service').length;
  }
  filterDataByThisYear() {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0];
    console.log(startOfYear);
    const endOfYear = new Date(today.getFullYear(), 11, 31).toISOString().split('T')[0];
    console.log(endOfYear);
    // return this.data.filter((obj: any) => obj.appointment_date >= startOfYear && obj.dateField <= endOfYear);
    this.filteredData = this.data.filter((item: any) => item.appointment_date.split('T')[0] >=
      startOfYear && item.appointment_date.split('T')[0] <= endOfYear);
    console.log(this.filteredData);
    this.readyForService = this.filteredData.filter((x: any) => x.status === 'Ready for service').length;
  }
  filterBYDatWeekMonthYear(value: any) {
    switch (value) {
      case 'Today':
        this.filterDataByToday();
        break;
      case 'Week':
        this.filterDataByThisWeek();
        break;
      case 'Month':
        this.filterDataByThisMonth();
        break;
      case 'Year':
        this.filterDataByThisYear();
        break;
      default:
        // Handle default case
        break;
    }
  }
}




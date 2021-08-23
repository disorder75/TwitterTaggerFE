import { Component, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animation';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { StatsService } from '../services/stats.service';
import { Observable, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(), expand()
  ]  
})
export class StatsComponent implements OnInit {


  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  barChartLabels: Label[] = ['Politics', 'Economy', 'Welfare', 'Tourism', 'Instruction', 'Covid19', 'Science', 'Sport', 'People', 'Abroad', 'Not classified topic'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Today topics' }
  ];
  
  timeInterval: Subscription;


  constructor(private statsService: StatsService) { 
  }

  ngOnInit(): void {
    this.updateChart();
    this.timeInterval= interval(15000).subscribe((x =>{this.updateChart(); }));
  }

  ngOnDestroy(): void {
    if (this.timeInterval)
      this.timeInterval.unsubscribe();
  }

  updateChart() {
    const tmpStats = this.statsService.getStats();
    if (tmpStats) {
      console.log("updating charts...");
      console.log("stats:" + JSON.stringify(tmpStats));
      this.barChartData = [
        { data: this.statsService.getArrayStats(), 
          label: 'Today topics' 
        }
      ];
      // let clone = JSON.parse(JSON.stringify(this.barChartData));
      // clone[0].data = tmpStats;
      // this.barChartData = clone;
    }
  }

  
}

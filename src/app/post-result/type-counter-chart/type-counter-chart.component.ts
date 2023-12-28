import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { RatingType } from '../../models/rating-type';

@Component({
  selector: 'app-type-counter-chart',
  templateUrl: './type-counter-chart.component.html',
  styleUrls: ['./type-counter-chart.component.scss']
})
export class TypeCounterChartComponent implements OnInit {
  @Input() types: RatingType[];
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[] ;

  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    layout: {
      padding: 30
    },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        ticks: {
          fontSize: 15,
          fontColor: '#aaa',
          minRotation: 90,
          padding: 12
        },
        gridLines: {
          drawOnChartArea: false,
          color: 'gray',
          lineWidth: 3,
          drawTicks: false,
          offsetGridLines: true

      }
    }],
    yAxes: [{
        display: false,
        gridLines: {
            drawOnChartArea: false,
            drawTicks: false
        },

    }]
    },

  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#1da1f3',
      backgroundColor: '#be3365' // 'rgba(255,0,0,0.3)',
    },
  ];

  public lineChartLegend = true;
  public lineChartType = 'bar';
  public lineChartPlugins = [];
  constructor() { }

  ngOnInit() {
    this.types = this.types.sort((n1, n2) => parseInt(n1.id, 0) - parseInt(n2.id, 0));
    this.prepareTheChart();
  }

  prepareTheChart() {
    this.lineChartData = [
      {
        data: this.types.map(t => {return t.counter; }),
        label: 'Count per Label',
        barThickness: 25,
        hoverBackgroundColor:  '#be3365'
    }
    ];

    this.lineChartLabels = this.types.map(t => t.name);
  }

}

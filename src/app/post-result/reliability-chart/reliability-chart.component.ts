import { AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-reliability-chart',
  templateUrl: './reliability-chart.component.html',
  styleUrls: ['./reliability-chart.component.scss']
})
export class ReliabilityChartComponent implements AfterViewInit {
  @Input() data: number;
  @ViewChild('charRef', {static: false}) charRef: ElementRef;
  constructor(private zone: NgZone) { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create(this.charRef.nativeElement, am4charts.GaugeChart);
      chart.innerRadius = -15;

      const axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
      axis.min = 0;
      axis.max = 100;
      axis.strictMinMax = true;
      axis.numberFormatter.numberFormat = '#a';
      axis.renderer.inside = true;
      axis.renderer.radius = am4core.percent(97);
      axis.renderer.labels.template.radius = 35;
      axis.renderer.hiddenState.properties.endAngle = 180;
      
      // const ds = new am4core.DropShadowFilter();
      // ds.blur = 10;
      // ds.opacity = 0.5;
      // axis.filters.push(ds)

      axis.renderer.grid.template.disabled = true;
      axis.renderer.labels.template.disabled = true;

      const rangeMin = axis.axisRanges.create();
      rangeMin.value = axis.min;
      rangeMin.label.text = 'Unreliable';
     // rangeMin.label.rotation = -90;
      rangeMin.label.paddingTop = 30;


      const rangeMax = axis.axisRanges.create();
      rangeMax.value = axis.max;
      rangeMax.label.text = 'Reliable';
      // rangeMax.label.rotation = 90;
      rangeMax.label.paddingTop = 30;

      const rangeMid = axis.axisRanges.create();
      rangeMid.value = axis.max / 2 ;
      rangeMid.label.text = 'Arguable';

      const gradient = new am4core.LinearGradient();
      gradient.stops.push({color: am4core.color('#d0202e')});
      gradient.stops.push({color: am4core.color('#F7941D')});
      gradient.stops.push({color: am4core.color('#009444')});
      axis.renderer.line.stroke = gradient;
      axis.renderer.line.strokeWidth = 15;
      // axis.renderer.line.strokeLinecap = "round";
      axis.renderer.line.strokeOpacity = 1;

      // const hand = chart.hands.push(new am4charts.ClockHand());
      // hand.radius = am4core.percent(80);
      // hand.startWidth = 10;
      // hand.pin.radius = 8;
      // hand.parent.zIndex = 100;
      // hand.pin.disabled = true;
      const hand = chart.hands.push(new am4charts.ClockHand());
      hand.radius = am4core.percent(60);
      hand.startWidth = 14;
      hand.pin.radius = 7;
      hand.parent.zIndex = 100;
      hand.showValue(this.data);

      setInterval(() => {
        hand.showValue(this.data, 1000, am4core.ease.cubicOut);
    }, 2000);
    });


  }

}

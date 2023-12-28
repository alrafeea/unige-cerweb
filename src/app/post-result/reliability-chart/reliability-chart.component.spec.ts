/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReliabilityChartComponent } from './reliability-chart.component';

describe('ReliabilityChartComponent', () => {
  let component: ReliabilityChartComponent;
  let fixture: ComponentFixture<ReliabilityChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReliabilityChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReliabilityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCounterChartComponent } from './type-counter-chart.component';

describe('TypeCounterChartComponent', () => {
  let component: TypeCounterChartComponent;
  let fixture: ComponentFixture<TypeCounterChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeCounterChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeCounterChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertValidateComponent } from './expert-validate.component';

describe('ExpertValdiateComponent', () => {
  let component: ExpertValidateComponent;
  let fixture: ComponentFixture<ExpertValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpertValidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbededLoaderComponent } from './embeded-loader.component';

describe('EmbededLoaderComponent', () => {
  let component: EmbededLoaderComponent;
  let fixture: ComponentFixture<EmbededLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbededLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbededLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpByEmailComponent } from './signup-by-email.component';

describe('SignUpByEmailComponent', () => {
  let component: SignUpByEmailComponent;
  let fixture: ComponentFixture<SignUpByEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpByEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpByEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

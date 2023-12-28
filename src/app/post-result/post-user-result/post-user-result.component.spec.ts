import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostUserResultComponent } from './post-user-result.component';

describe('PostUserResultComponent', () => {
  let component: PostUserResultComponent;
  let fixture: ComponentFixture<PostUserResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostUserResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostUserResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostExpertResultComponent } from './post-expert-result.component';

describe('PostExpertResultComponent', () => {
  let component: PostExpertResultComponent;
  let fixture: ComponentFixture<PostExpertResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostExpertResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostExpertResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

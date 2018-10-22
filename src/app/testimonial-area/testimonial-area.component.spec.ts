import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialAreaComponent } from './testimonial-area.component';

describe('TestimonialAreaComponent', () => {
  let component: TestimonialAreaComponent;
  let fixture: ComponentFixture<TestimonialAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

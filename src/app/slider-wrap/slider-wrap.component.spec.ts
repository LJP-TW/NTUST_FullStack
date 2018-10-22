import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderWrapComponent } from './slider-wrap.component';

describe('SliderWrapComponent', () => {
  let component: SliderWrapComponent;
  let fixture: ComponentFixture<SliderWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TToBSliderAreaComponent } from './t-to-b-slider-area.component';

describe('TToBSliderAreaComponent', () => {
  let component: TToBSliderAreaComponent;
  let fixture: ComponentFixture<TToBSliderAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TToBSliderAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TToBSliderAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToActionAreaComponent } from './call-to-action-area.component';

describe('CallToActionAreaComponent', () => {
  let component: CallToActionAreaComponent;
  let fixture: ComponentFixture<CallToActionAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallToActionAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallToActionAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

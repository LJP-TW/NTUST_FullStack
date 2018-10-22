import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionAreaComponent } from './promotion-area.component';

describe('PromotionAreaComponent', () => {
  let component: PromotionAreaComponent;
  let fixture: ComponentFixture<PromotionAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

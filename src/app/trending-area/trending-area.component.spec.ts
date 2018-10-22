import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingAreaComponent } from './trending-area.component';

describe('TrendingAreaComponent', () => {
  let component: TrendingAreaComponent;
  let fixture: ComponentFixture<TrendingAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

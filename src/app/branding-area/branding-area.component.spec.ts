import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandingAreaComponent } from './branding-area.component';

describe('BrandingAreaComponent', () => {
  let component: BrandingAreaComponent;
  let fixture: ComponentFixture<BrandingAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandingAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandingAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

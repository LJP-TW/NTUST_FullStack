import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAreaComponent } from './nav-area.component';

describe('NavAreaComponent', () => {
  let component: NavAreaComponent;
  let fixture: ComponentFixture<NavAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

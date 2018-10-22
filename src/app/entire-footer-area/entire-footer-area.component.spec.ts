import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntireFooterAreaComponent } from './entire-footer-area.component';

describe('EntireFooterAreaComponent', () => {
  let component: EntireFooterAreaComponent;
  let fixture: ComponentFixture<EntireFooterAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntireFooterAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntireFooterAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

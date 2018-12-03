import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumerHelpComponent } from './costumer-help.component';

describe('CostumerHelpComponent', () => {
  let component: CostumerHelpComponent;
  let fixture: ComponentFixture<CostumerHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostumerHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostumerHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

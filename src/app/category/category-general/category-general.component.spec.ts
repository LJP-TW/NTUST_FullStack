import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryGeneralComponent } from './category-general.component';

describe('CategoryGeneralComponent', () => {
  let component: CategoryGeneralComponent;
  let fixture: ComponentFixture<CategoryGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

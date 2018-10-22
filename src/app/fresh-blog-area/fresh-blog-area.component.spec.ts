import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshBlogAreaComponent } from './fresh-blog-area.component';

describe('FreshBlogAreaComponent', () => {
  let component: FreshBlogAreaComponent;
  let fixture: ComponentFixture<FreshBlogAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreshBlogAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreshBlogAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

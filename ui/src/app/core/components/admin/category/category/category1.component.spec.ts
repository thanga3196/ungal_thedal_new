import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Category1Component } from './category1.component';

describe('CategoryComponent', () => {
  let component: Category1Component;
  let fixture: ComponentFixture<Category1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Category1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Category1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

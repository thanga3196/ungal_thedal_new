import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekDaysSearchComponent } from './week-days-search.component';

describe('WeekDaysSearchComponent', () => {
  let component: WeekDaysSearchComponent;
  let fixture: ComponentFixture<WeekDaysSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekDaysSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekDaysSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

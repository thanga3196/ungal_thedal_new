import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictSearchComponent } from './district-search.component';

describe('DistrictSearchComponent', () => {
  let component: DistrictSearchComponent;
  let fixture: ComponentFixture<DistrictSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

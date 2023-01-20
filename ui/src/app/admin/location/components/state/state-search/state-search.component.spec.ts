import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateSearchComponent } from './state-search.component';

describe('StateSearchComponent', () => {
  let component: StateSearchComponent;
  let fixture: ComponentFixture<StateSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

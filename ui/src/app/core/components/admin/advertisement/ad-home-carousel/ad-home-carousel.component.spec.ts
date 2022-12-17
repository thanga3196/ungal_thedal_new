import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdHomeCarouselComponent } from './ad-home-carousel.component';

describe('AdHomeCarouselComponent', () => {
  let component: AdHomeCarouselComponent;
  let fixture: ComponentFixture<AdHomeCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdHomeCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdHomeCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

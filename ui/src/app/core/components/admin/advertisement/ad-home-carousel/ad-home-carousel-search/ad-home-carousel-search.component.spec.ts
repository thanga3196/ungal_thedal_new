import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdHomeCarouselSearchComponent } from './ad-home-carousel-search.component';

describe('AdHomeCarouselSearchComponent', () => {
  let component: AdHomeCarouselSearchComponent;
  let fixture: ComponentFixture<AdHomeCarouselSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdHomeCarouselSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdHomeCarouselSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

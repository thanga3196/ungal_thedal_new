import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaSearchComponent } from './social-media-search.component';

describe('SocialMediaSearchComponent', () => {
  let component: SocialMediaSearchComponent;
  let fixture: ComponentFixture<SocialMediaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialMediaSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialMediaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

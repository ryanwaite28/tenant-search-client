import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeListingPageComponent } from './home-listing-page.component';

describe('HomeListingPageComponent', () => {
  let component: HomeListingPageComponent;
  let fixture: ComponentFixture<HomeListingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeListingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

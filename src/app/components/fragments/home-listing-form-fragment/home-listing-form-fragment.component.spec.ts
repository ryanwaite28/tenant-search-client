import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeListingFormFragmentComponent } from './home-listing-form-fragment.component';

describe('HomeListingFormFragmentComponent', () => {
  let component: HomeListingFormFragmentComponent;
  let fixture: ComponentFixture<HomeListingFormFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeListingFormFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeListingFormFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

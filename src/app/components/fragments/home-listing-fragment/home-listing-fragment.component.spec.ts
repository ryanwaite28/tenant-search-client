import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeListingFragmentComponent } from './home-listing-fragment.component';

describe('HomeListingFragmentComponent', () => {
  let component: HomeListingFragmentComponent;
  let fixture: ComponentFixture<HomeListingFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeListingFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeListingFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

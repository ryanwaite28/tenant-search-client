import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeListingFragmentComponent } from './user-home-listing-fragment.component';

describe('UserHomeListingFragmentComponent', () => {
  let component: UserHomeListingFragmentComponent;
  let fixture: ComponentFixture<UserHomeListingFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHomeListingFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHomeListingFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

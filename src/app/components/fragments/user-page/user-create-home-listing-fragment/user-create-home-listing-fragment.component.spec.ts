import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreateHomeListingFragmentComponent } from './user-create-home-listing-fragment.component';

describe('UserCreateHomeListingFragmentComponent', () => {
  let component: UserCreateHomeListingFragmentComponent;
  let fixture: ComponentFixture<UserCreateHomeListingFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCreateHomeListingFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateHomeListingFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

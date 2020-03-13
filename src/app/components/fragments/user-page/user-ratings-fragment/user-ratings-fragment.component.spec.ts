import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRatingsFragmentComponent } from './user-ratings-fragment.component';

describe('UserRatingsFragmentComponent', () => {
  let component: UserRatingsFragmentComponent;
  let fixture: ComponentFixture<UserRatingsFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRatingsFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRatingsFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

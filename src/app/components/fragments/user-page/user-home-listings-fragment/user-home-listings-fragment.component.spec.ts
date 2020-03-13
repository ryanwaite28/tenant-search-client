import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeListingsFragmentComponent } from './user-home-listings-fragment.component';

describe('UserHomeListingsFragmentComponent', () => {
  let component: UserHomeListingsFragmentComponent;
  let fixture: ComponentFixture<UserHomeListingsFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHomeListingsFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHomeListingsFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

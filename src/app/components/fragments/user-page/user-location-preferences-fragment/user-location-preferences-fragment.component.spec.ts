import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLocationPreferencesFragmentComponent } from './user-location-preferences-fragment.component';

describe('UserLocationPreferencesFragmentComponent', () => {
  let component: UserLocationPreferencesFragmentComponent;
  let fixture: ComponentFixture<UserLocationPreferencesFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLocationPreferencesFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLocationPreferencesFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

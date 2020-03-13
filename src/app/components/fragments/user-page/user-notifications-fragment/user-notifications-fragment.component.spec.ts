import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotificationsFragmentComponent } from './user-notifications-fragment.component';

describe('UserNotificationsFragmentComponent', () => {
  let component: UserNotificationsFragmentComponent;
  let fixture: ComponentFixture<UserNotificationsFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNotificationsFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNotificationsFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

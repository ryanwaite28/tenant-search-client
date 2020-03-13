import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMessagesFragmentComponent } from './user-messages-fragment.component';

describe('UserMessagesFragmentComponent', () => {
  let component: UserMessagesFragmentComponent;
  let fixture: ComponentFixture<UserMessagesFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMessagesFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMessagesFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

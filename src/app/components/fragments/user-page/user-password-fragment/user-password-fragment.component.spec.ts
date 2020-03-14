import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPasswordFragmentComponent } from './user-password-fragment.component';

describe('UserPasswordFragmentComponent', () => {
  let component: UserPasswordFragmentComponent;
  let fixture: ComponentFixture<UserPasswordFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPasswordFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPasswordFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIconFragmentComponent } from './user-icon-fragment.component';

describe('UserIconFragmentComponent', () => {
  let component: UserIconFragmentComponent;
  let fixture: ComponentFixture<UserIconFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIconFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIconFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

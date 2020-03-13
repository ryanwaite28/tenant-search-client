import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeRequestsFragmentComponent } from './user-home-requests-fragment.component';

describe('UserHomeRequestsFragmentComponent', () => {
  let component: UserHomeRequestsFragmentComponent;
  let fixture: ComponentFixture<UserHomeRequestsFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHomeRequestsFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHomeRequestsFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTenantRequestsFragmentComponent } from './user-tenant-requests-fragment.component';

describe('UserTenantRequestsFragmentComponent', () => {
  let component: UserTenantRequestsFragmentComponent;
  let fixture: ComponentFixture<UserTenantRequestsFragmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTenantRequestsFragmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTenantRequestsFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

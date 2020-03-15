import { TestBed } from '@angular/core/testing';

import { TenantRequestsService } from './tenant-requests.service';

describe('TenantRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TenantRequestsService = TestBed.get(TenantRequestsService);
    expect(service).toBeTruthy();
  });
});

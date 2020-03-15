import { TestBed } from '@angular/core/testing';

import { HomeListingsRequestsService } from './home-listings-requests.service';

describe('HomeListingsRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeListingsRequestsService = TestBed.get(HomeListingsRequestsService);
    expect(service).toBeTruthy();
  });
});

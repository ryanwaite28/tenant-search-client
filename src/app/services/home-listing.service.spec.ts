import { TestBed } from '@angular/core/testing';

import { HomeListingService } from './home-listing.service';

describe('HomeListingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeListingService = TestBed.get(HomeListingService);
    expect(service).toBeTruthy();
  });
});

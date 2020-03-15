import { TestBed } from '@angular/core/testing';

import { HomeListingsService } from './home-listings.service';

describe('HomeListingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeListingsService = TestBed.get(HomeListingsService);
    expect(service).toBeTruthy();
  });
});

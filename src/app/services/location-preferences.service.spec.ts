import { TestBed } from '@angular/core/testing';

import { LocationPreferencesService } from './location-preferences.service';

describe('LocationPreferencesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationPreferencesService = TestBed.get(LocationPreferencesService);
    expect(service).toBeTruthy();
  });
});

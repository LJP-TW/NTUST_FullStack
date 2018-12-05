import { TestBed } from '@angular/core/testing';

import { CustomerHelpService } from './customer-help.service';

describe('CustomerHelpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerHelpService = TestBed.get(CustomerHelpService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ProductDataBaseService } from './product-data-base.service';

describe('ProductDataBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductDataBaseService = TestBed.get(ProductDataBaseService);
    expect(service).toBeTruthy();
  });
});

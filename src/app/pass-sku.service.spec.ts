import { TestBed, inject } from '@angular/core/testing';

import { PassSkuService } from './pass-sku.service';

describe('PassSkuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassSkuService]
    });
  });

  it('should be created', inject([PassSkuService], (service: PassSkuService) => {
    expect(service).toBeTruthy();
  }));
});

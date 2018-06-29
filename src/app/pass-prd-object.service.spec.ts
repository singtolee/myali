import { TestBed, inject } from '@angular/core/testing';

import { PassPrdObjectService } from './pass-prd-object.service';

describe('PassPrdObjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassPrdObjectService]
    });
  });

  it('should be created', inject([PassPrdObjectService], (service: PassPrdObjectService) => {
    expect(service).toBeTruthy();
  }));
});

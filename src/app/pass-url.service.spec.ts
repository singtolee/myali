import { TestBed, inject } from '@angular/core/testing';

import { PassUrlService } from './pass-url.service';

describe('PassUrlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassUrlService]
    });
  });

  it('should be created', inject([PassUrlService], (service: PassUrlService) => {
    expect(service).toBeTruthy();
  }));
});

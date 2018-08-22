import { TestBed, inject } from '@angular/core/testing';

import { ApiUrlsHistoryService } from './api-urls-history.service';

describe('ApiUrlsHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiUrlsHistoryService]
    });
  });

  it('should be created', inject([ApiUrlsHistoryService], (service: ApiUrlsHistoryService) => {
    expect(service).toBeTruthy();
  }));
});

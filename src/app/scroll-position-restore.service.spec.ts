import { TestBed, inject } from '@angular/core/testing';

import { ScrollPositionRestoreService } from './scroll-position-restore.service';

describe('ScrollPositionRestoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScrollPositionRestoreService]
    });
  });

  it('should be created', inject([ScrollPositionRestoreService], (service: ScrollPositionRestoreService) => {
    expect(service).toBeTruthy();
  }));
});

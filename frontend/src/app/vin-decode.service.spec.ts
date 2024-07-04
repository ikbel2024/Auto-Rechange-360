import { TestBed } from '@angular/core/testing';

import { VinDecodeService } from './vin-decode.service';

describe('VinDecodeService', () => {
  let service: VinDecodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinDecodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

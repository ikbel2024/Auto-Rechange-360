import { TestBed } from '@angular/core/testing';

import { GarageCategoryService } from './garage-category.service';

describe('GarageCategoryService', () => {
  let service: GarageCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarageCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { KnnService } from './knn.service';

describe('KnnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KnnService = TestBed.get(KnnService);
    expect(service).toBeTruthy();
  });
});

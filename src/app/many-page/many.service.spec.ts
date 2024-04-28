import { TestBed } from '@angular/core/testing';

import { ManyService } from './many.service';

describe('ManyService', () => {
  let service: ManyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

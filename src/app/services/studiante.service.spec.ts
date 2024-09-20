import { TestBed } from '@angular/core/testing';

import { StudianteService } from './studiante.service';

describe('StudianteService', () => {
  let service: StudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

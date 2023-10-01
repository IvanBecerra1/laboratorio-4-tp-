import { TestBed } from '@angular/core/testing';

import { SComunicacionService } from './s-comunicacion.service';

describe('SComunicacionService', () => {
  let service: SComunicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SComunicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

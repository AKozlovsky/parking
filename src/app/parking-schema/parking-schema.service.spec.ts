import { TestBed } from '@angular/core/testing';

import { ParkingSchemaService } from './parking-schema.service';

describe('ParkingSchemaService', () => {
  let service: ParkingSchemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingSchemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

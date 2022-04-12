import { TestBed } from '@angular/core/testing';

import { GymslotService } from './gymslot.service';

describe('GymslotService', () => {
  let service: GymslotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GymslotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

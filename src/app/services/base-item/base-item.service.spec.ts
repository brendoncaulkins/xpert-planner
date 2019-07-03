import { TestBed } from '@angular/core/testing';

import { BaseItemService } from './base-item.service';

describe('BaseItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseItemService = TestBed.get(BaseItemService);
    expect(service).toBeTruthy();
  });
});

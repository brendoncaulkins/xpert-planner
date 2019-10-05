import { TestBed, async, inject } from '@angular/core/testing';

import { UnsavedDataGuard } from './unsaved-data.guard';

describe('UnsavedDataGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsavedDataGuard]
    });
  });

  it('should ...', inject([UnsavedDataGuard], (guard: UnsavedDataGuard) => {
    expect(guard).toBeTruthy();
  }));
});

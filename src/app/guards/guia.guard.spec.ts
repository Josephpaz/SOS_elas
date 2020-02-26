import { TestBed, async, inject } from '@angular/core/testing';

import { GuiaGuard } from './guia.guard';

describe('GuiaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuiaGuard]
    });
  });

  it('should ...', inject([GuiaGuard], (guard: GuiaGuard) => {
    expect(guard).toBeTruthy();
  }));
});

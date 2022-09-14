import { TestBed } from '@angular/core/testing';

import { ViewStockItemGuard } from './view-stock-item.guard';

describe('ViewStockItemGuard', () => {
  let guard: ViewStockItemGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ViewStockItemGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

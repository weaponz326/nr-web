import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingPage } from './purchasing.page';

describe('PurchasingPage', () => {
  let component: PurchasingPage;
  let fixture: ComponentFixture<PurchasingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasingPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

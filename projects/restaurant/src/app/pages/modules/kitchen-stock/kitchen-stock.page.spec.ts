import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenStockPage } from './kitchen-stock.page';

describe('KitchenStockPage', () => {
  let component: KitchenStockPage;
  let fixture: ComponentFixture<KitchenStockPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitchenStockPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitchenStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

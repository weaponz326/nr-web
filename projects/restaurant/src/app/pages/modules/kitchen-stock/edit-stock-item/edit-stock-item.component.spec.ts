import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStockItemComponent } from './edit-stock-item.component';

describe('EditStockItemComponent', () => {
  let component: EditStockItemComponent;
  let fixture: ComponentFixture<EditStockItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStockItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStockItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

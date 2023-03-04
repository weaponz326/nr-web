import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivablesPage } from './receivables.page';

describe('ReceivablesPage', () => {
  let component: ReceivablesPage;
  let fixture: ComponentFixture<ReceivablesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivablesPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivablesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

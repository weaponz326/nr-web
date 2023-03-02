import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayablesPage } from './payables.page';

describe('PayablesPage', () => {
  let component: PayablesPage;
  let fixture: ComponentFixture<PayablesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayablesPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayablesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

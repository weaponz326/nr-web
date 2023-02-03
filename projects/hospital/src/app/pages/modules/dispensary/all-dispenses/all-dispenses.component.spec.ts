import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDispensesComponent } from './all-dispenses.component';

describe('AllDispensesComponent', () => {
  let component: AllDispensesComponent;
  let fixture: ComponentFixture<AllDispensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDispensesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDispensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

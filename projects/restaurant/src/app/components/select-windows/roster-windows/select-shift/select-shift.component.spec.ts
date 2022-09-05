import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectShiftComponent } from './select-shift.component';

describe('SelectShiftComponent', () => {
  let component: SelectShiftComponent;
  let fixture: ComponentFixture<SelectShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

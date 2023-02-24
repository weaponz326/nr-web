import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStaffComponent } from './select-staff.component';

describe('SelectStaffComponent', () => {
  let component: SelectStaffComponent;
  let fixture: ComponentFixture<SelectStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

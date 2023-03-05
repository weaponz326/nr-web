import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSheetComponent } from './select-sheet.component';

describe('SelectSheetComponent', () => {
  let component: SelectSheetComponent;
  let fixture: ComponentFixture<SelectSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectHousekeepingComponent } from './select-housekeeping.component';

describe('SelectHousekeepingComponent', () => {
  let component: SelectHousekeepingComponent;
  let fixture: ComponentFixture<SelectHousekeepingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectHousekeepingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectHousekeepingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectClaseComponent } from './select-clase.component';

describe('SelectClaseComponent', () => {
  let component: SelectClaseComponent;
  let fixture: ComponentFixture<SelectClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectClaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

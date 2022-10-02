import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateFormComponent } from './activate-form.component';

describe('ActivateFormComponent', () => {
  let component: ActivateFormComponent;
  let fixture: ComponentFixture<ActivateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

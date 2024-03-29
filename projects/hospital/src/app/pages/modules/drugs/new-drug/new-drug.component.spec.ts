import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDrugComponent } from './new-drug.component';

describe('NewDrugComponent', () => {
  let component: NewDrugComponent;
  let fixture: ComponentFixture<NewDrugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDrugComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

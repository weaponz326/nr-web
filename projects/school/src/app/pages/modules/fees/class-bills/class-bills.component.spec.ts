import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassBillsComponent } from './class-bills.component';

describe('ClassBillsComponent', () => {
  let component: ClassBillsComponent;
  let fixture: ComponentFixture<ClassBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassBillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

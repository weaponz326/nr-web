import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryPage } from './laboratory.page';

describe('LaboratoryPage', () => {
  let component: LaboratoryPage;
  let fixture: ComponentFixture<LaboratoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

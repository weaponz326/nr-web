import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensaryPage } from './dispensary.page';

describe('DispensaryPage', () => {
  let component: DispensaryPage;
  let fixture: ComponentFixture<DispensaryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispensaryPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispensaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

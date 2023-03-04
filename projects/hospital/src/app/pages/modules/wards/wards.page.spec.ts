import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardsPage } from './wards.page';

describe('WardsPage', () => {
  let component: WardsPage;
  let fixture: ComponentFixture<WardsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WardsPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

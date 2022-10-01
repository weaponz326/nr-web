import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesPage } from './fees.page';

describe('FeesPage', () => {
  let component: FeesPage;
  let fixture: ComponentFixture<FeesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeesPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

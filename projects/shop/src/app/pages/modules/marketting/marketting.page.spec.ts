import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkettingPage } from './marketting.page';

describe('MarkettingPage', () => {
  let component: MarkettingPage;
  let fixture: ComponentFixture<MarkettingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkettingPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

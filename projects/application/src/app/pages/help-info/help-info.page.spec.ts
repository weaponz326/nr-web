import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpInfoPage } from './help-info.page';

describe('HelpInfoPage', () => {
  let component: HelpInfoPage;
  let fixture: ComponentFixture<HelpInfoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpInfoPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterPage } from './roster.page';

describe('RosterPage', () => {
  let component: RosterPage;
  let fixture: ComponentFixture<RosterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RosterPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RosterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestsPage } from './guests.page';

describe('GuestsPage', () => {
  let component: GuestsPage;
  let fixture: ComponentFixture<GuestsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestsPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

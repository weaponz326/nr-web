import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalitiesPage } from './legalities.page';

describe('LegalitiesPage', () => {
  let component: LegalitiesPage;
  let fixture: ComponentFixture<LegalitiesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalitiesPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

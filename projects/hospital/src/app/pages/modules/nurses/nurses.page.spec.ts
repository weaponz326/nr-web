import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursesPage } from './nurses.page';

describe('NursesPage', () => {
  let component: NursesPage;
  let fixture: ComponentFixture<NursesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NursesPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

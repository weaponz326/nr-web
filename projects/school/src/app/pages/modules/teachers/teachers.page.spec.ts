import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersPage } from './teachers.page';

describe('TeachersPage', () => {
  let component: TeachersPage;
  let fixture: ComponentFixture<TeachersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachersPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

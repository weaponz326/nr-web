import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutivesPage } from './executives.page';

describe('ExecutivesPage', () => {
  let component: ExecutivesPage;
  let fixture: ComponentFixture<ExecutivesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutivesPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutivesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

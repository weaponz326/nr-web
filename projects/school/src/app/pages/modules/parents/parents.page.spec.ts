import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsPage } from './parents.page';

describe('ParentsPage', () => {
  let component: ParentsPage;
  let fixture: ComponentFixture<ParentsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentsPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

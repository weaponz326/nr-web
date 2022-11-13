import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteesPage } from './committees.page';

describe('CommitteesPage', () => {
  let component: CommitteesPage;
  let fixture: ComponentFixture<CommitteesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitteesPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitteesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

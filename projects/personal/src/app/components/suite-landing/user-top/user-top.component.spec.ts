import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTopComponent } from './user-top.component';

describe('UserTopComponent', () => {
  let component: UserTopComponent;
  let fixture: ComponentFixture<UserTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

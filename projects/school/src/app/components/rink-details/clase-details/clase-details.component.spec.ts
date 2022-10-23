import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseDetailsComponent } from './clase-details.component';

describe('ClaseDetailsComponent', () => {
  let component: ClaseDetailsComponent;
  let fixture: ComponentFixture<ClaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaseDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

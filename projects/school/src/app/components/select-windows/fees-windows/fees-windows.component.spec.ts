import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesWindowsComponent } from './fees-windows.component';

describe('FeesWindowsComponent', () => {
  let component: FeesWindowsComponent;
  let fixture: ComponentFixture<FeesWindowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeesWindowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeesWindowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

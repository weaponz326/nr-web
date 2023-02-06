import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabAttachmentsComponent } from './lab-attachments.component';

describe('LabAttachmentsComponent', () => {
  let component: LabAttachmentsComponent;
  let fixture: ComponentFixture<LabAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabAttachmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

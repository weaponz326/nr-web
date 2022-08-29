import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsDownloadComponent } from './apps-download.component';

describe('AppsDownloadComponent', () => {
  let component: AppsDownloadComponent;
  let fixture: ComponentFixture<AppsDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppsDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

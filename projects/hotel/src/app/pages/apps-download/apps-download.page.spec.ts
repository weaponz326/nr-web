import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsDownloadPage } from './apps-download.page';

describe('AppsDownloadPage', () => {
  let component: AppsDownloadPage;
  let fixture: ComponentFixture<AppsDownloadPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppsDownloadPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppsDownloadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

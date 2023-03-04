import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsPage } from './assets.page';

describe('AssetsPage', () => {
  let component: AssetsPage;
  let fixture: ComponentFixture<AssetsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleHomePage } from './module-home.page';

describe('ModuleHomePage', () => {
  let component: ModuleHomePage;
  let fixture: ComponentFixture<ModuleHomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleHomePage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

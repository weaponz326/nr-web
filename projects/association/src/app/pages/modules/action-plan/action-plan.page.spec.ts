import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanPage } from './action-plan.page';

describe('ActionPlanPage', () => {
  let component: ActionPlanPage;
  let fixture: ComponentFixture<ActionPlanPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionPlanPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

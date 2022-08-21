import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalTwoComponent } from './delete-modal-two.component';

describe('DeleteModalTwoComponent', () => {
  let component: DeleteModalTwoComponent;
  let fixture: ComponentFixture<DeleteModalTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteModalTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteModalTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

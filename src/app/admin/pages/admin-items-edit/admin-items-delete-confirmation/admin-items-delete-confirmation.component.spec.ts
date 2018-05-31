import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminItemsDeleteConfirmationComponent } from './admin-items-delete-confirmation.component';

describe('AdminItemsDeleteConfirmationComponent', () => {
  let component: AdminItemsDeleteConfirmationComponent;
  let fixture: ComponentFixture<AdminItemsDeleteConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminItemsDeleteConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminItemsDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

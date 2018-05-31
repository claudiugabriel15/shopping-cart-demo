import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminItemTypesDeleteConfirmationComponent } from './admin-item-types-delete-confirmation.component';

describe('AdminItemTypesDeleteConfirmationComponent', () => {
  let component: AdminItemTypesDeleteConfirmationComponent;
  let fixture: ComponentFixture<AdminItemTypesDeleteConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminItemTypesDeleteConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminItemTypesDeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

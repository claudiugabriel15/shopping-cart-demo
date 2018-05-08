import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminItemsEditComponent } from './admin-items-edit.component';

describe('AdminItemsEditComponent', () => {
  let component: AdminItemsEditComponent;
  let fixture: ComponentFixture<AdminItemsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminItemsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminItemsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

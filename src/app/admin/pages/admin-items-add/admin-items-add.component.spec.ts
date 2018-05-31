import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminItemsAddComponent } from './admin-items-add.component';

describe('AdminItemsAddComponent', () => {
  let component: AdminItemsAddComponent;
  let fixture: ComponentFixture<AdminItemsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminItemsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminItemsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

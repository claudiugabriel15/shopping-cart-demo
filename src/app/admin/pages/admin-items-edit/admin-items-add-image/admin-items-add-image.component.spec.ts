import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminItemsAddImageComponent } from './admin-items-add-image.component';

describe('AdminItemsAddImageComponent', () => {
  let component: AdminItemsAddImageComponent;
  let fixture: ComponentFixture<AdminItemsAddImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminItemsAddImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminItemsAddImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

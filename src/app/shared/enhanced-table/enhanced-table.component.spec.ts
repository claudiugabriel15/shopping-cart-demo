import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnhancedTableComponent } from './enhanced-table.component';

describe('EnhancedTableComponent', () => {
  let component: EnhancedTableComponent;
  let fixture: ComponentFixture<EnhancedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnhancedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnhancedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

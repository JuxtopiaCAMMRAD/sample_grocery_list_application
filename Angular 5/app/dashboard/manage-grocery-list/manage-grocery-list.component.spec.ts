import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGroceryListComponent } from './manage-grocery-list.component';

describe('ManageGroceryListComponent', () => {
  let component: ManageGroceryListComponent;
  let fixture: ComponentFixture<ManageGroceryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageGroceryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGroceryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

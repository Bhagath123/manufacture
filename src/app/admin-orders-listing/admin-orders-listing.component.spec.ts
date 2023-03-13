import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersListingComponent } from './admin-orders-listing.component';

describe('AdminOrdersListingComponent', () => {
  let component: AdminOrdersListingComponent;
  let fixture: ComponentFixture<AdminOrdersListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrdersListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

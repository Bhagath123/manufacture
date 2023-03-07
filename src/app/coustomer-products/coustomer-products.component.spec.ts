import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoustomerProductsComponent } from './coustomer-products.component';

describe('CoustomerProductsComponent', () => {
  let component: CoustomerProductsComponent;
  let fixture: ComponentFixture<CoustomerProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoustomerProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoustomerProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

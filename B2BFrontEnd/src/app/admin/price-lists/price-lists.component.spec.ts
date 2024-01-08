import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListsComponent } from './price-lists.component';

describe('PriceListsComponent', () => {
  let component: PriceListsComponent;
  let fixture: ComponentFixture<PriceListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

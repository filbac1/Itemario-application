import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceMovementChartComponent } from './price-movement-chart.component';

describe('PriceMovementChartComponent', () => {
  let component: PriceMovementChartComponent;
  let fixture: ComponentFixture<PriceMovementChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PriceMovementChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriceMovementChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

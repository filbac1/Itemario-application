import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultianalysisComponent } from './multianalysis.component';

describe('MultianalysisComponent', () => {
  let component: MultianalysisComponent;
  let fixture: ComponentFixture<MultianalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultianalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultianalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

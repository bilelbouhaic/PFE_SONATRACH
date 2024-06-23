import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPrixExpComponent } from './chart-prix-exp.component';

describe('ChartPrixExpComponent', () => {
  let component: ChartPrixExpComponent;
  let fixture: ComponentFixture<ChartPrixExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartPrixExpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartPrixExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

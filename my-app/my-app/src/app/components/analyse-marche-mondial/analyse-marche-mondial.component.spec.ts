import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyseMarcheMondialComponent } from './analyse-marche-mondial.component';

describe('AnalyseMarcheMondialComponent', () => {
  let component: AnalyseMarcheMondialComponent;
  let fixture: ComponentFixture<AnalyseMarcheMondialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalyseMarcheMondialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalyseMarcheMondialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

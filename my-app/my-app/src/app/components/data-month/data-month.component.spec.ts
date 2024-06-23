import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMonthComponent } from './data-month.component';

describe('DataMonthComponent', () => {
  let component: DataMonthComponent;
  let fixture: ComponentFixture<DataMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataMonthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

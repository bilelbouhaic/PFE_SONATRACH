import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataYearComponent } from './data-year.component';

describe('DataYearComponent', () => {
  let component: DataYearComponent;
  let fixture: ComponentFixture<DataYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataYearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

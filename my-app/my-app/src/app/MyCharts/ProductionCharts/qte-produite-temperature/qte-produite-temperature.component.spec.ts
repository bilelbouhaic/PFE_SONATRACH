import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QteProduiteTemperatureComponent } from './qte-produite-temperature.component';

describe('QteProduiteTemperatureComponent', () => {
  let component: QteProduiteTemperatureComponent;
  let fixture: ComponentFixture<QteProduiteTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QteProduiteTemperatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QteProduiteTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

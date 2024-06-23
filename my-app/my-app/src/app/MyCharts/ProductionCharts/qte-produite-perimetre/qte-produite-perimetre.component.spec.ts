import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QteProduitePerimetreComponent } from './qte-produite-perimetre.component';

describe('QteProduitePerimetreComponent', () => {
  let component: QteProduitePerimetreComponent;
  let fixture: ComponentFixture<QteProduitePerimetreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QteProduitePerimetreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QteProduitePerimetreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

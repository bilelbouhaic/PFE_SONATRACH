import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QteProduiteProduitComponent } from './qte-produite-produit.component';

describe('QteProduiteProduitComponent', () => {
  let component: QteProduiteProduitComponent;
  let fixture: ComponentFixture<QteProduiteProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QteProduiteProduitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QteProduiteProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

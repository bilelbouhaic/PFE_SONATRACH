import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTarifTransComponent } from './popup-tarif-trans.component';

describe('PopupTarifTransComponent', () => {
  let component: PopupTarifTransComponent;
  let fixture: ComponentFixture<PopupTarifTransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupTarifTransComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupTarifTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupImposRemuComponent } from './popup-impos-remu.component';

describe('PopupImposRemuComponent', () => {
  let component: PopupImposRemuComponent;
  let fixture: ComponentFixture<PopupImposRemuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupImposRemuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupImposRemuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

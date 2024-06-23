import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTauxChComponent } from './popup-taux-ch.component';

describe('PopupTauxChComponent', () => {
  let component: PopupTauxChComponent;
  let fixture: ComponentFixture<PopupTauxChComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupTauxChComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupTauxChComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

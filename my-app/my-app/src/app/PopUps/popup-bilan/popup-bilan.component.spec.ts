import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupBilanComponent } from './popup-bilan.component';

describe('PopupBilanComponent', () => {
  let component: PopupBilanComponent;
  let fixture: ComponentFixture<PopupBilanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupBilanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupBilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

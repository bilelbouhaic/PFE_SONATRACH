import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRdvComponent } from './popup-rdv.component';

describe('PopupRdvComponent', () => {
  let component: PopupRdvComponent;
  let fixture: ComponentFixture<PopupRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupRdvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

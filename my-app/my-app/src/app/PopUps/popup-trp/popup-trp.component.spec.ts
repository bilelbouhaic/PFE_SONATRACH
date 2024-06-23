import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTrpComponent } from './popup-trp.component';

describe('PopupTrpComponent', () => {
  let component: PopupTrpComponent;
  let fixture: ComponentFixture<PopupTrpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupTrpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupTrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

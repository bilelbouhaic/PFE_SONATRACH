import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupQteGazComponent } from './popup-qte-gaz.component';

describe('PopupQteGazComponent', () => {
  let component: PopupQteGazComponent;
  let fixture: ComponentFixture<PopupQteGazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupQteGazComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupQteGazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

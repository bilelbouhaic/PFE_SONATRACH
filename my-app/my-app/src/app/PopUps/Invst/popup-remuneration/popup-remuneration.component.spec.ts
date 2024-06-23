import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRemunerationComponent } from './popup-remuneration.component';

describe('PopupRemunerationComponent', () => {
  let component: PopupRemunerationComponent;
  let fixture: ComponentFixture<PopupRemunerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupRemunerationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupRemunerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

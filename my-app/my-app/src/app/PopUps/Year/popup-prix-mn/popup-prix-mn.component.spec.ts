import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPrixMNComponent } from './popup-prix-mn.component';

describe('PopupPrixMNComponent', () => {
  let component: PopupPrixMNComponent;
  let fixture: ComponentFixture<PopupPrixMNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupPrixMNComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupPrixMNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

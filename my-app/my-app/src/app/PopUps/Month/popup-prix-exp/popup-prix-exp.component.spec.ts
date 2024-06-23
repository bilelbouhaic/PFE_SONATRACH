import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPrixExpComponent } from './popup-prix-exp.component';

describe('PopupPrixExpComponent', () => {
  let component: PopupPrixExpComponent;
  let fixture: ComponentFixture<PopupPrixExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupPrixExpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupPrixExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

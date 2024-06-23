import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupInvstComponent } from './popup-invst.component';

describe('PopupInvstComponent', () => {
  let component: PopupInvstComponent;
  let fixture: ComponentFixture<PopupInvstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupInvstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupInvstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

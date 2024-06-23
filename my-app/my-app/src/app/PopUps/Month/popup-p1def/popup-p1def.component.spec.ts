import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupP1defComponent } from './popup-p1def.component';

describe('PopupP1defComponent', () => {
  let component: PopupP1defComponent;
  let fixture: ComponentFixture<PopupP1defComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupP1defComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupP1defComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

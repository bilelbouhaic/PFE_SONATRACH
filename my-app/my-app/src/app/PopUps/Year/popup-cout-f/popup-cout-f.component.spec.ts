import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCoutFComponent } from './popup-cout-f.component';

describe('PopupCoutFComponent', () => {
  let component: PopupCoutFComponent;
  let fixture: ComponentFixture<PopupCoutFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupCoutFComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupCoutFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

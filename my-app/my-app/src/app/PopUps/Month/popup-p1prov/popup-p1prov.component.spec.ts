import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupP1provComponent } from './popup-p1prov.component';

describe('PopupP1provComponent', () => {
  let component: PopupP1provComponent;
  let fixture: ComponentFixture<PopupP1provComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupP1provComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupP1provComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

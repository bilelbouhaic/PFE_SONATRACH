import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupQteprodComponent } from './popup-qteprod.component';

describe('PopupQteprodComponent', () => {
  let component: PopupQteprodComponent;
  let fixture: ComponentFixture<PopupQteprodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupQteprodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupQteprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

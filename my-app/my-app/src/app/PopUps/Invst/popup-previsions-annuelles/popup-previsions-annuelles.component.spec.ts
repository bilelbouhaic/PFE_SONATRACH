import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPrevisionsAnnuellesComponent } from './popup-previsions-annuelles.component';

describe('PopupPrevisionsAnnuellesComponent', () => {
  let component: PopupPrevisionsAnnuellesComponent;
  let fixture: ComponentFixture<PopupPrevisionsAnnuellesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupPrevisionsAnnuellesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupPrevisionsAnnuellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

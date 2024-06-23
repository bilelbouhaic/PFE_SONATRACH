import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerimetreRentableComponent } from './perimetre-rentable.component';

describe('PerimetreRentableComponent', () => {
  let component: PerimetreRentableComponent;
  let fixture: ComponentFixture<PerimetreRentableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerimetreRentableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerimetreRentableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

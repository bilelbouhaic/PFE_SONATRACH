import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerimetreTaxeComponent } from './perimetre-taxe.component';

describe('PerimetreTaxeComponent', () => {
  let component: PerimetreTaxeComponent;
  let fixture: ComponentFixture<PerimetreTaxeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerimetreTaxeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerimetreTaxeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

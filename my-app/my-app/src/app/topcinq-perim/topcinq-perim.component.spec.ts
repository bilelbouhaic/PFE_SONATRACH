import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopcinqPerimComponent } from './topcinq-perim.component';

describe('TopcinqPerimComponent', () => {
  let component: TopcinqPerimComponent;
  let fixture: ComponentFixture<TopcinqPerimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopcinqPerimComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopcinqPerimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

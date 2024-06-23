import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartNbVenduComponent } from './chart-nb-vendu.component';

describe('ChartNbVenduComponent', () => {
  let component: ChartNbVenduComponent;
  let fixture: ComponentFixture<ChartNbVenduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartNbVenduComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartNbVenduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

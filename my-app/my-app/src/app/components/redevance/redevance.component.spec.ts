import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedevanceComponent } from './redevance.component';

describe('RedevanceComponent', () => {
  let component: RedevanceComponent;
  let fixture: ComponentFixture<RedevanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RedevanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedevanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

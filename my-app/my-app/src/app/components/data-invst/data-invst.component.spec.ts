import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInvstComponent } from './data-invst.component';

describe('DataInvstComponent', () => {
  let component: DataInvstComponent;
  let fixture: ComponentFixture<DataInvstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataInvstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataInvstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

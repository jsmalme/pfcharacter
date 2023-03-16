import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightCapacityComponent } from './weight-capacity.component';

describe('WeightCapacityComponent', () => {
  let component: WeightCapacityComponent;
  let fixture: ComponentFixture<WeightCapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeightCapacityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeightCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

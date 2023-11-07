import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollResultComponent } from './roll-result.component';

describe('RollResultComponent', () => {
  let component: RollResultComponent;
  let fixture: ComponentFixture<RollResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RollResultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RollResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalDisplayComponent } from './total-display.component';

describe('TotalDisplayComponent', () => {
  let component: TotalDisplayComponent;
  let fixture: ComponentFixture<TotalDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TotalDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

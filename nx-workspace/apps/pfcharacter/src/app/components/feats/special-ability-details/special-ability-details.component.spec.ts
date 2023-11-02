import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialAbilityDetailsComponent } from './special-ability-details.component';

describe('SpecialAbilityDetailsComponent', () => {
  let component: SpecialAbilityDetailsComponent;
  let fixture: ComponentFixture<SpecialAbilityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecialAbilityDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpecialAbilityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

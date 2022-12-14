import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatComponent } from './combat.component';

describe('OffenseComponent', () => {
  let component: CombatComponent;
  let fixture: ComponentFixture<CombatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

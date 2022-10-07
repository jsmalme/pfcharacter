import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModDisplayComponent } from './mod-display.component';

describe('ModDisplayComponent', () => {
  let component: ModDisplayComponent;
  let fixture: ComponentFixture<ModDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

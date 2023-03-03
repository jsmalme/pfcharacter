import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcItemsComponent } from './ac-items.component';

describe('AcItemsComponent', () => {
  let component: AcItemsComponent;
  let fixture: ComponentFixture<AcItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcItemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

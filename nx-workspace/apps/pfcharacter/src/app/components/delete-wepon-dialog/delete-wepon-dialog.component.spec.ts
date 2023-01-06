import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWeponDialogComponent } from './delete-wepon-dialog.component';

describe('DeleteWeponDialogComponent', () => {
  let component: DeleteWeponDialogComponent;
  let fixture: ComponentFixture<DeleteWeponDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteWeponDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteWeponDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

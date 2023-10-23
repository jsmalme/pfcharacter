import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteItemDialogComponent } from './delete-wepon-dialog.component';

describe('DeleteWeponDialogComponent', () => {
  let component: DeleteItemDialogComponent;
  let fixture: ComponentFixture<DeleteItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteItemDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

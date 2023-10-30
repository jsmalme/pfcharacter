import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'nx-workspace-delete-wepon-dialog',
  templateUrl: './delete-wepon-dialog.component.html',
  styleUrls: ['./delete-wepon-dialog.component.scss'],
})
export class DeleteItemDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }
  ) { }
}

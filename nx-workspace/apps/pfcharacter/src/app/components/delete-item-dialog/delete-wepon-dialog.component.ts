import { MatSelectModule } from '@angular/material/select';
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Spell } from 'libs/character-classes/spells';

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

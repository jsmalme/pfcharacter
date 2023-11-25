import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nx-workspace-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  @Input() title: string | null;
  @Input() message: string | null;
}

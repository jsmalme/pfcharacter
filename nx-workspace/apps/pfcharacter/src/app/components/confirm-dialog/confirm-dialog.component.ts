import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nx-workspace-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  @Input() title: string | undefined;
  @Input() message: string | undefined;
}

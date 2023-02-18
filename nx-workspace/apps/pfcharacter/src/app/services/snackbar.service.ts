import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  horizontal: MatSnackBarHorizontalPosition = 'center';
  vertical: MatSnackBarVerticalPosition = 'bottom';
  constructor(
    private snackBar: MatSnackBar,
  ) { }

  openSnackBar(message: string){
    this.snackBar.open(message, 'OK', {
      horizontalPosition: this.horizontal,
      verticalPosition: this.vertical
    });
  }
}

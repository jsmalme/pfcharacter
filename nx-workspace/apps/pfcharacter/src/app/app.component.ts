import { SnackbarService } from './services/snackbar.service';
import { RollComponent } from './components/roll/roll.component';
import { CharacterDataService } from './services/character-data.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'nx-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pfcharacter';

  constructor(private store: CharacterDataService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.store.loadCharacter();
  }

  openRollDialog() {
    this.snackbar.openFromComponent(RollComponent, {
      panelClass: ['roll-snackbar']
    });
  }
}

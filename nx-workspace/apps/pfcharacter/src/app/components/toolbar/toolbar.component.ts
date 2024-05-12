/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { DrawerExpansionService } from '../../services/drawer-expansion.service';
import { CharacterDataService } from '../../services/character-data.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RollComponent } from '../roll/roll.component';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  isCharacterLoaded$ = this.store.isCharacterLoaded$;

  constructor(
    private sidenav: DrawerExpansionService,
    private store: CharacterDataService,
    private router: Router,
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) { }

  toggleSidenav() {
    this.sidenav.sideNavOpen$.next(!this.sidenav.sideNavOpen$.value);
  }

  navigateToCharacterList() {
    this.store.clearCharacter();
    this.router.navigate(['/characters']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.store.clearCharacter();
    this.authService.logOut();
    this.router.navigate(['']);
  }

  openRollDialog() {
    this.snackbar.openFromComponent(RollComponent, {
      panelClass: ['roll-snackbar']
    });
  }
}

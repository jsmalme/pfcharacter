import { RollComponent } from './components/roll/roll.component';
import { CharacterDataService } from './services/character-data.service';
import { Component, OnInit } from '@angular/core';
import { DrawerExpansionService } from './services/drawer-expansion.service';
import { AuthService } from './services/auth.service';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'nx-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pfcharacter';
  sidenavOpened = false;
  loggedInUser$ = this.auth.loggedInUser$.asObservable();

  constructor(private store: CharacterDataService,
    private snackbar: MatSnackBar,
    private sidenav: DrawerExpansionService,
    private auth: AuthService) { }

  ngOnInit() {
    this.sidenav.sideNavOpen$.subscribe((state: boolean) => {
      this.sidenavOpened = state;
    });
  }

  closeSidenav() {
    this.sidenav.sideNavOpen$.next(false);
  }

  openRollDialog() {
    this.snackbar.openFromComponent(RollComponent, {
      panelClass: ['roll-snackbar']
    });
  }
}

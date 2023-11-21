/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { DrawerExpansionService } from '../../services/drawer-expansion.service';
import { CharacterDataService } from '../../services/character-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  isCharacterLoaded$ = new Observable<boolean>();

  constructor(
    private sidenav: DrawerExpansionService,
    private store: CharacterDataService
  ) { }

  ngOnInit(): void {
    this.isCharacterLoaded$ = this.store.isCharacterLoaded$;
  }

  toggleSidenav() {
    console.log(!this.sidenav.sideNavOpen$.value);
    this.sidenav.sideNavOpen$.next(!this.sidenav.sideNavOpen$.value);
  }
}

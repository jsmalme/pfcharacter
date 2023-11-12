/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { DrawerExpansionService } from '../../services/drawer-expansion.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    private sidenav: DrawerExpansionService
  ) { }

  ngOnInit(): void { }

  toggleSidenav() {
    console.log(!this.sidenav.sideNavOpen$.value);
    this.sidenav.sideNavOpen$.next(!this.sidenav.sideNavOpen$.value);
  }
}

import { CharacterDataService } from './services/character-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nx-workspace-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pfcharacter';

  constructor(private store: CharacterDataService) { }

  ngOnInit() {
    this.store.loadCharacter();
  }
}

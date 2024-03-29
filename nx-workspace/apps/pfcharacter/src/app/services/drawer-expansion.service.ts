import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerExpansionService {
  public spellDrawerStatus: Record<number, boolean> = {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false
  };

  public featDrawerStatus: Record<string, boolean> | null = null;
  public specialAbilityDrawerStatus: Record<string, boolean> | null = null;
  public sideNavOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}

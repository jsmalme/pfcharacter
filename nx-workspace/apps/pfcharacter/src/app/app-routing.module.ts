import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbilitiesComponent } from './components/abilities/abilities.component';
import { GeneralComponent } from './components/general/general.component';
import { CombatComponent } from './components/combat/combat.component';

const appRoutes: Routes = [
  { path: 'general', component: GeneralComponent },
  { path: 'abilities', component: AbilitiesComponent},
  { path: 'combat', component: CombatComponent}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

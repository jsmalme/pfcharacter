import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbilitiesComponent } from './components/abilities/abilities.component';
import { GeneralComponent } from './components/general/general.component';
import { CombatComponent } from './components/combat/combat.component';
import { SkillsComponent } from './components/skills/skills.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { SpellsComponent } from './components/spells/spells.component';
import { FeatsComponent } from './components/feats/feats.component';
import { SummaryComponent } from './components/summary/summary.component';

const appRoutes: Routes = [
  { path: 'general', component: GeneralComponent },
  { path: 'abilities', component: AbilitiesComponent },
  { path: 'combat', component: CombatComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'equipment', component: EquipmentComponent },
  { path: 'spells', component: SpellsComponent },
  { path: 'feats', component: FeatsComponent },
  { path: 'summary', component: SummaryComponent }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

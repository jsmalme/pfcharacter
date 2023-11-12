import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbilitiesComponent } from './components/abilities/abilities.component';
import { GeneralComponent } from './components/general/general.component';
import { CombatComponent } from './components/combat/combat.component';
import { SkillsComponent } from './components/skills/skills.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { SpellsComponent } from './components/spells/spells.component';
import { FeatsComponent } from './components/feats/feats.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService as AuthGuard } from './services/auth-gaurd.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'logout', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'general', component: GeneralComponent, canActivate: [AuthGuard] },
  { path: 'abilities', component: AbilitiesComponent, canActivate: [AuthGuard] },
  { path: 'combat', component: CombatComponent, canActivate: [AuthGuard] },
  { path: 'skills', component: SkillsComponent, canActivate: [AuthGuard] },
  { path: 'equipment', component: EquipmentComponent, canActivate: [AuthGuard] },
  { path: 'spells', component: SpellsComponent, canActivate: [AuthGuard] },
  { path: 'feats', component: FeatsComponent, canActivate: [AuthGuard] }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

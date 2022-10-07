import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbilitiesComponent } from './components/abilities/abilities.component';
import { GeneralComponent } from './components/general/general.component';
import { OffenseComponent } from './components/offense/offense.component';

const appRoutes: Routes = [
  { path: 'general', component: GeneralComponent },
  { path: 'abilities', component: AbilitiesComponent},
  { path: 'offense', component: OffenseComponent}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

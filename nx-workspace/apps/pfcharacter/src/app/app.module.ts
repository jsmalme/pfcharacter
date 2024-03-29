import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { A11yModule } from '@angular/cdk/a11y';


//components
import { AbilitiesComponent } from './components/abilities/abilities.component';
import { GeneralComponent } from './components/general/general.component';
import { ModDisplayComponent } from './components/mod-display/mod-display.component';
import { CombatComponent } from './components/combat/combat.component';
import { WeaponComponent } from './components/weapon/weapon.component';
import { TotalDisplayComponent } from './components/total-display/total-display.component';
import { DeleteItemDialogComponent } from './components/delete-item-dialog/delete-wepon-dialog.component';
import { SkillsComponent } from './components/skills/skills.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { GearComponent } from './components/equipment/gear/gear.component';
import { AcItemsComponent } from './components/equipment/ac-items/ac-items.component';
import { MoneyComponent } from './components/equipment/money/money.component';
import { WeightCapacityComponent } from './components/equipment/weight-capacity/weight-capacity.component';
import { GearItemComponent } from './components/equipment/gear-item/gear-item.component';
import { AcListItemComponent } from './components/equipment/ac-list-item/ac-list-item.component';
import { SpellsComponent } from './components/spells/spells.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SpellDetailsComponent } from './components/spells/spell-details/spell-details.component';
import { FeatsComponent } from './components/feats/feats.component';
import { FeatListComponent } from './components/feats/feat-list/feat-list.component';
import { SpecialAbilitiesComponent } from './components/feats/special-abilities/special-abilities.component';
import { FeatDetailsComponent } from './components/feats/feat-details/feat-details.component';
import { SpecialAbilityDetailsComponent } from './components/feats/special-ability-details/special-ability-details.component';
import { LoginComponent } from './components/login/login.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RollComponent } from './components/roll/roll.component';
import { RollResultComponent } from './components/roll-result/roll-result.component';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from './services/auth-gaurd.service';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { InterceptorService } from './services/interceptor.service';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterListItemComponent } from './components/character-list/character-list-item/character-list-item.component';
import { CharacterComponent } from './components/character/character.component';

@NgModule({
  declarations: [
    AppComponent,
    AbilitiesComponent,
    GeneralComponent,
    ModDisplayComponent,
    CombatComponent,
    WeaponComponent,
    TotalDisplayComponent,
    DeleteItemDialogComponent,
    SkillsComponent,
    EquipmentComponent,
    GearComponent,
    AcItemsComponent,
    MoneyComponent,
    WeightCapacityComponent,
    GearItemComponent,
    AcListItemComponent,
    SpellsComponent,
    ConfirmDialogComponent,
    SpellDetailsComponent,
    FeatsComponent,
    FeatListComponent,
    SpecialAbilitiesComponent,
    FeatDetailsComponent,
    SpecialAbilityDetailsComponent,
    LoginComponent,
    ToolbarComponent,
    RollComponent,
    RollResultComponent,
    CreateAccountComponent,
    CharacterListComponent,
    CharacterListItemComponent,
    CharacterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatCardModule,
    MatTooltipModule,
    MatTableModule,
    MatGridListModule,
    LayoutModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSortModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatExpansionModule,
    DragDropModule,
    MatChipsModule,
    FormsModule,
    MatMenuModule,
    A11yModule,
    MatAutocompleteModule
  ],
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

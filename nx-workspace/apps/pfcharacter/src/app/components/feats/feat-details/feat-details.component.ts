/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Feat, FeatTypeEnum } from 'libs/character-classes/feats-abilities';
import { DeleteItemDialogComponent } from '../../delete-item-dialog/delete-wepon-dialog.component';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { CharacterService } from '../../../services/character-http.service';

@Component({
  selector: 'app-feat-details',
  templateUrl: './feat-details.component.html',
  styleUrls: ['./feat-details.component.scss'],
})
export class FeatDetailsComponent implements OnInit {
  filteredOptions = new Observable<Feat[]>();
  featTypes = Object.values(FeatTypeEnum);
  featForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    benefit: ['', [Validators.required, Validators.maxLength(5000)]],
    type: [FeatTypeEnum.general],
    prerequisites: ['', Validators.maxLength(100)],
  });

  constructor(
    private characterService: CharacterService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FeatDetailsComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { feat: Feat, isNew: boolean }
  ) { }

  ngOnInit(): void {
    if (!this.data.isNew) {
      this.featForm.controls.name.disable();
      this.featForm.patchValue(this.data.feat);
    }

    if (this.data.isNew) {
      this.featForm.controls.name.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((value) => {
        if (value && value.length > 0) {
          this.filteredOptions = this.characterService.filterFeats(value);
        }
      });
    }
  }

  save() {
    if (!this.featForm.valid) {
      return;
    }
    this.dialogRef.close(this.featForm.value);
  }

  delete() {
    this.dialog.open(DeleteItemDialogComponent, {
      data: { title: 'Delete Feat', message: `Are you sure you want remove ${this.featForm.controls.name.value} from your feat list?` }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close({ delete: true });
      }
    });
  }

  featSelected(feat: Feat) {
    if (!Object.values(FeatTypeEnum).includes(feat.type)) {
      feat.type = FeatTypeEnum.other;
    }
    this.featForm.patchValue({
      benefit: feat.benefit,
      type: feat.type,
      prerequisites: feat.prerequisites,
    });
  }
}

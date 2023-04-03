import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
const materialsArray = [
  MatFormFieldModule,
  MatIconModule,
  MatAutocompleteModule,
  MatInputModule,
  MatProgressSpinnerModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialsArray
  ],
  exports: [
    materialsArray
  ]
})
export class MaterialModule { }

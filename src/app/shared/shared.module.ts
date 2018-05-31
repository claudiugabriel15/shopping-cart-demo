import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AddressFormComponent } from './components/address-form/address-form.component';
import { EnhancedTableComponent } from './components/enhanced-table/enhanced-table.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { RatingStarsComponent } from './components/rating-stars/rating-stars.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import {
  MatPaginatorModule, MatCardModule, MatMenuModule,
  MatFormFieldModule, MatAutocompleteModule, MatToolbarModule,
  MatButtonModule, MatInputModule, MatIconModule,
  MatTableModule, MatSelectModule,
} from '@angular/material';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    FlexLayoutModule,
    NgbModule,
    RouterModule,
  ],
  declarations: [
    AddressFormComponent,
    EnhancedTableComponent,
    ItemCardComponent,
    MainNavbarComponent,
    RatingStarsComponent,
  ],
  exports: [
    AddressFormComponent,
    EnhancedTableComponent,
    ItemCardComponent,
    MainNavbarComponent,
    RatingStarsComponent,
    FlexLayoutModule,
    MatButtonModule,
  ]
})
export class SharedModule { }

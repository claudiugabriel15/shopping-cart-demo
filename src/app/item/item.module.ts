import {
  AuthGuardService,
  RatingService,
  FirebaseTypeService,
  FirebaseItemService,
 } from './../core/services/services';

import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ItemsComponent } from './pages/items/items.component';
import { ItemComponent } from './pages/item/item.component';
import { MatExpansionModule, MatInputModule, MatIconModule, MatListModule, MatRadioModule,
  MatCheckboxModule, MatGridListModule, MatProgressSpinnerModule } from '@angular/material';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

const ITEM_ROUTES = [
  {
    path: 'items',
    component: ItemsComponent
  },
  {
    path: 'items/:id',
    component: ItemComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(
      ITEM_ROUTES
    ),

    SharedModule,

    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatGridListModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    ItemsComponent,
    ItemComponent
  ],
  providers: [
    FirebaseItemService,
    FirebaseTypeService,
    RatingService,
    NgbRatingConfig,
  ]
})
export class ItemModule { }

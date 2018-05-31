import {
  AuthGuardService,
  LocationService,
} from '../core/services/services';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { MatTabsModule } from '@angular/material';
import { RouterModule } from '@angular/router';

const SHOPPING_CART_ROUTES = [
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [ AuthGuardService ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(
      SHOPPING_CART_ROUTES
    ),
    MatTabsModule,
  ],
  declarations: [
    CheckoutComponent,
    ShoppingCartComponent,
  ],
  providers: [
    LocationService
  ]
})
export class ShopModule { }

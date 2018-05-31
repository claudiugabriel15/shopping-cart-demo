import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { OrdersComponent } from './pages/orders/orders.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';

import {
  AuthGuardService,
  FirebaseOrdersService,
} from '../core/services/services';
import { FormsModule } from '@angular/forms';
import { MatTabsModule, MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

const MY_ROUTES = [
  {
    path: 'my/orders',
    component: OrdersComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'my/orders/:id',
    component: OrderDetailsComponent,
    canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(
      MY_ROUTES
    ),
    FormsModule,
    SharedModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule
  ],
  declarations: [
    OrdersComponent,
    OrderDetailsComponent
  ],
  providers: [
    FirebaseOrdersService
  ]
})
export class MyModule { }

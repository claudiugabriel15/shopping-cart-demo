import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminGuardService } from '../core/services/admin-guard.service';
import { AuthGuardService } from '../core/services/auth-guard.service';

// tslint:disable-next-line:max-line-length
import { AdminItemsDeleteConfirmationComponent } from './pages/admin-items-edit/admin-items-delete-confirmation/admin-items-delete-confirmation.component';
// tslint:disable-next-line:max-line-length
import { AdminItemTypesDeleteConfirmationComponent } from './pages/admin-types/admin-item-types-delete-confirmation/admin-item-types-delete-confirmation.component';
import { AdminItemsAddImageComponent } from './pages/admin-items-edit/admin-items-add-image/admin-items-add-image.component';
import { AdminItemsComponent } from './pages/admin-items/admin-items.component';
import { AdminItemsAddComponent } from './pages/admin-items-add/admin-items-add.component';
import { AdminItemsEditComponent } from './pages/admin-items-edit/admin-items-edit.component';
import { AdminTypesComponent } from './pages/admin-types/admin-types.component';
import { AdminOrdersComponent } from './pages/admin-orders/admin-orders.component';
import { AdminOrderDetailsComponent } from './pages/admin-order-details/admin-order-details.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import {
  MatFormFieldModule, MatSelectModule, MatIconModule,
  MatTabsModule, MatGridListModule, MatProgressSpinnerModule,
  MatDialogModule, MatInputModule,
} from '@angular/material';

const ADMIN_ROUTES = [
  {
    path: 'admin/items',
    component: AdminItemsComponent,
    canActivate: [ AuthGuardService, AdminGuardService ]
  },
  {
    path: 'admin/items/add',
    component: AdminItemsAddComponent,
    canActivate: [ AuthGuardService, AdminGuardService ]
  },
  {
    path: 'admin/items/:id',
    component: AdminItemsEditComponent,
    canActivate: [ AuthGuardService, AdminGuardService ]
  },
  {
    path: 'admin/types',
    component: AdminTypesComponent,
    canActivate: [ AuthGuardService, AdminGuardService ]
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [ AuthGuardService, AdminGuardService ]
  },
  {
    path: 'admin/orders/:id',
    component: AdminOrderDetailsComponent,
    canActivate: [ AuthGuardService, AdminGuardService ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(
      ADMIN_ROUTES
    ),
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatTabsModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
  ],
  declarations: [
    AdminItemsComponent,
    AdminItemsAddComponent,
    AdminItemsEditComponent,
    AdminOrderDetailsComponent,
    AdminOrdersComponent,
    AdminTypesComponent,
    AdminItemsDeleteConfirmationComponent,
    AdminItemTypesDeleteConfirmationComponent,
    AdminItemsAddImageComponent,
  ],
  entryComponents: [
    AdminItemsDeleteConfirmationComponent,
    AdminItemTypesDeleteConfirmationComponent,
    AdminItemsAddImageComponent,
  ],
  providers: [
    AdminGuardService,
    AuthGuardService
  ],
})
export class AdminModule { }

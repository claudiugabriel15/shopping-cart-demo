import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { AdminModule } from '../admin/admin.module';
import { ItemModule } from '../item/item.module';
import { MyModule } from '../my/my.module';
import { ShopModule } from '../shop/shop.module';
import { SharedModule } from './../shared/shared.module';

import {
  AdminGuardService,
  AuthGuardService,
  FirebaseUserService,
  AlertService,
  FirebaseShoppingCartService,
} from './services/services';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule, MatIconModule, MatSnackBarModule } from '@angular/material';

const CORE_ROUTES = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'my',
    loadChildren: '../my/my.module#MyModule',
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'admin',
    loadChildren: '../admin/admin.module#AdminModule',
    canActivate: [ AuthGuardService, AdminGuardService ]
  },
  {
    path: 'item',
    loadChildren: '../item/item.module#ItemModule'
  },
  {
    path: 'shop',
    loadChildren: '../shop/shop.module#ShopModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    AdminModule,
    MyModule,
    ItemModule,
    ShopModule,
    SharedModule,
    RouterModule.forRoot(CORE_ROUTES),

    NgbModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
  ],
  providers: [
    FirebaseUserService,
    FirebaseShoppingCartService,
    AlertService,
  ]
})
export class CoreModule { }

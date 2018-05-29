import { isDevMode, APP_INITIALIZER } from '@angular/core';
import { AlertService } from './services/alert.service';
import { FirebaseUserService } from './services/firebase-user.service';
import { FirebaseShoppingCartService } from './services/firebase-shopping-cart.service';
import { AdminGuardService } from './services/admin-guard.service';

// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

// Angular Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FlexLayoutModule } from '@angular/flex-layout';

// Firebase modules
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

// Bootstrap
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Components
import { AppComponent } from './app.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './success/success.component';
import { AdminItemsComponent } from './admin/admin-items/admin-items.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './my/orders/orders.component';
import { LoginService } from './services/login.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AdminItemsEditComponent } from './admin/admin-items-edit/admin-items-edit.component';
import { FormsModule } from '@angular/forms';
import { AdminItemsAddComponent } from './admin/admin-items-add/admin-items-add.component';
import { FirebaseItemService } from './services/firebase-item.service';

// tslint:disable-next-line:max-line-length
import { AdminItemsDeleteConfirmationComponent } from './admin/admin-items-edit/admin-items-delete-confirmation/admin-items-delete-confirmation.component';
import { AdminTypesComponent } from './admin/admin-types/admin-types.component';
import { FirebaseTypeService } from './services/firebase-type.service';
// tslint:disable-next-line:max-line-length
import { AdminItemTypesDeleteConfirmationComponent } from './admin/admin-types/admin-item-types-delete-confirmation/admin-item-types-delete-confirmation.component';

// Shared components
import { ItemCardComponent } from './shared/item-card/item-card.component';
import { EnhancedTableComponent } from './shared/enhanced-table/enhanced-table.component';
import { AddressFormComponent } from './shared/address-form/address-form.component';
import { RatingStarsComponent } from './shared/rating-stars/rating-stars.component';

// Environment
import { environment } from '../environments/environment';
import { Config } from '../config/config';
import { AccountComponent } from './my/account/account/account.component';
import { FirebaseOrdersService } from './services/firebase-orders.service';
import { LocationService } from './services/location.service';
import { OrderDetailsComponent } from './my/order-details/order-details.component';
import { AdminOrderDetailsComponent } from './admin/admin-order-details/admin-order-details.component';
import { RatingService } from './services/rating.service';
import { ItemComponent } from './item/item.component';
import { AdminItemsAddImageComponent } from './admin/admin-items-edit/admin-items-add-image/admin-items-add-image.component';
import { SidebarService } from './services/sidebar.service';

const APP_ROUTES = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'items',
    component: ItemsComponent
  },
  {
    path: 'items/:id',
    component: ItemComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent
  },
  {
    path: 'my/account',
    component: AccountComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'my/orders',
    component: OrdersComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'my/orders/:id',
    component: OrderDetailsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'success',
    component: SuccessComponent,
    canActivate: [ AuthGuardService ]
  },
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
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

export function initConfig(config: Config) {
  return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent,
    MainNavbarComponent,
    ShoppingCartComponent,
    NotFoundComponent,
    HomeComponent,
    ItemsComponent,
    CheckoutComponent,
    SuccessComponent,
    AdminItemsComponent,
    AdminOrdersComponent,
    LoginComponent,
    OrdersComponent,
    AdminItemsEditComponent,
    AdminItemsAddComponent,
    ItemCardComponent,
    AdminItemsDeleteConfirmationComponent,
    AdminTypesComponent,
    AdminItemTypesDeleteConfirmationComponent,
    EnhancedTableComponent,
    AccountComponent,
    AddressFormComponent,
    OrderDetailsComponent,
    AdminOrderDetailsComponent,
    ItemComponent,
    AdminItemsAddImageComponent,
    RatingStarsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      APP_ROUTES
    ),
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule,

    // Angular Material
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatListModule,
    MatGridListModule,
    MatTooltipModule,
    MatDividerModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatExpansionModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatCheckboxModule,

    // Flex Modules
    FlexLayoutModule,

    // Firebase modules
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  entryComponents: [
    AdminItemsDeleteConfirmationComponent,
    AdminItemTypesDeleteConfirmationComponent,
    AdminItemsAddImageComponent,
  ],
  providers: [
    Config,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [Config],
      multi: true,
    },
    NgbCarouselConfig,
    NgbRatingConfig,
    AngularFireAuth,
    LoginService,
    AlertService,
    AdminGuardService,
    AuthGuardService,
    LocationService,
    FirebaseUserService,
    FirebaseItemService,
    FirebaseTypeService,
    FirebaseShoppingCartService,
    FirebaseOrdersService,
    RatingService,
    SidebarService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

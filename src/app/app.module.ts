
import {
  SidebarService,
  LoginService,
} from './core/services/services';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

// Environment
import { environment } from '../environments/environment';
import { Config } from '../config/config';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { MatSidenavModule, MatDividerModule, MatListModule } from '@angular/material';

export function initConfig(config: Config) {
  return () => config.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpModule,
    HttpClientModule,

    // Firebase modules
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,

    // Angular Material
    MatSidenavModule,
    MatDividerModule,
    MatListModule,

    SharedModule,
    CoreModule,
  ],
  providers: [
    Config,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [Config],
      multi: true,
    },
    SidebarService,
    LoginService,
    AngularFireAuth,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

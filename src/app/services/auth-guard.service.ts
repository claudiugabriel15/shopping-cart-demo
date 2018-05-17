import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private  router: Router,
     private loginService: LoginService,
     private alertService: AlertService
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.loginService.userData$.map(
      user => {
        if (user) {
          return true;
        } else {
          this.router.navigateByUrl('login');
          this.alertService.errorAlert('You must login in order take this action');
          return false;
        }
      }
    );
  }

}

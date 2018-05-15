import { AlertService } from './alert.service';
import { FirebaseUserService } from './firebase-user.service';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Router, CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService,
    private firebaseUserService: FirebaseUserService,
    private alertService: AlertService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.firebaseUserService.isAdmin$.take(1).map(
      isAdmin => {
        if (isAdmin) {
          return true;
        } else {
          this.router.navigateByUrl('login');
          this.alertService.errorAlert('User not authorized');
          return false;
        }
      }
    );
  }
}

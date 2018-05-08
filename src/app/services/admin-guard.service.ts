import { FirebaseUserService } from './firebase-user.service';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Router, CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { QueryParams } from '@firebase/database/dist/esm/src/core/view/QueryParams';

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(
    private  router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private firebaseUserService: FirebaseUserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.firebaseUserService.isAdmin$.map(
      isAdmin => {
        if (isAdmin) {
          return true;
        } else {
          const toUrl = state.url;
          this.router.navigate(['login'], {
            queryParams: { returnUrl: toUrl }
          });
          return false;
        }
      }
    );
  }
}

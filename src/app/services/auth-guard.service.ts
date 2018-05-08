import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private  router: Router, private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.loginService.userData$.map(
      user => {
        if (user) {
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

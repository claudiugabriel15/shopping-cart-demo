import { FirebaseShoppingCartService } from './../services/firebase-shopping-cart.service';
import { FirebaseUserService } from './../services/firebase-user.service';
import { LoginService } from './../services/login.service';
import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent {
  authState: any;
  loggedUser$: Observable<any>;
  isAdmin: any;
  itemQuantity: Observable<number>;

  constructor(
    public loginService: LoginService,
    public firebaseUserService: FirebaseUserService,
    public firebaseShoppingCartService: FirebaseShoppingCartService) {
      this.loggedUser$ = loginService.userData$;
      this.firebaseUserService.isAdmin().subscribe(
        isAdmin => {
          this.isAdmin = isAdmin;
        });
      this.itemQuantity = firebaseShoppingCartService.getAllItemQuantity();
    }

  logout() {
    this.loginService.signOut();
  }
}
